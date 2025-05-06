let t = 0;
let jellyTrail = [];
let rumbleSound;
let isActive = false; // One flag for both sound and spawning

function preload() {
  getAudioContext().suspend(); // Ensure audio context starts suspended
  rumbleSound = loadSound('earthquake.mp3'); // Load the background sound
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  setAttributes('alpha', true);
  noStroke();
  colorMode(RGB, 255);

  userStartAudio().then(() => {
    if (rumbleSound && rumbleSound.isLoaded()) {
      rumbleSound.setLoop(true);
      rumbleSound.setVolume(0.4); // Adjust volume
    }
  });
}

function draw() {
  let bgColor = map(sin(t * 1.0), -1, 1, 10, 50);
  background(bgColor);

  ambientLight(120);
  spotLight(255, 255, 255, 300, -300, 300, -1, 1, -1, PI / 3, 2);
  spotLight(255, 255, 255, -300, 300, 300, 1, -1, -1, PI / 3, 2);

  drawRainbowWeb();

  noStroke();
  for (let i = 0; i < jellyTrail.length; i++) {
    let p = jellyTrail[i];

    push();
    let zJiggle = sin(p.time * 0.7) * 10;
    translate(p.x, p.y, p.z + zJiggle);
    let sizeJiggle = 1 + random(-0.1, 0.1);

    fill(255, 0, 0, 100);
    specularMaterial(255, 105, 180);
    shininess(160);
    scale(1, sizeJiggle, 1);
    box(20);
    pop();

    p.time += 0.03;
  }

  t += 0.01;
}

function spawnJellyRecursively(count) {
  if (count >= 200 || !isActive) return;

  let x = random(-width / 2, width / 2);
  let y = random(-height / 2, height / 2);
  let z = random(-500, 500);

  jellyTrail.push({ x: x, y: y, z: z, time: t, life: 0 });

  setTimeout(() => {
    spawnJellyRecursively(count + 1);
  }, 50);
}

function drawRainbowWeb() {
  for (let i = 0; i < jellyTrail.length; i++) {
    for (let j = i + 1; j < jellyTrail.length; j++) {
      let pi = jellyTrail[i];
      let pj = jellyTrail[j];
      let d = dist(pi.x, pi.y, pi.z, pj.x, pj.y, pj.z);

      if (d < 300) {
        let avgX = (pi.x + pj.x) / 2;
        let avgY = (pi.y + pj.y) / 2;
        let angle = atan2(avgY, avgX);
        if (angle < 0) angle += TWO_PI;

        let t = map(angle, 0, TWO_PI, 0, 5);

        let colorStops = [
          color(255, 0, 0),
          color(255, 165, 0),
          color(255, 255, 0),
          color(0, 255, 0),
          color(0, 0, 255)
        ];

        let indexA = floor(t) % 5;
        let indexB = (indexA + 1) % 5;
        let amt = t - indexA;

        let c = lerpColor(colorStops[indexA], colorStops[indexB], amt);
        let softC = lerpColor(c, color(255, 255, 255), 0.4);

        stroke(softC.levels[0], softC.levels[1], softC.levels[2], 120);
        line(pi.x, pi.y, pi.z, pj.x, pj.y, pj.z);
      }
    }
  }
}

function mousePressed() {
  isActive = !isActive;

  // Toggle sound
  if (isActive) {
    rumbleSound.play();
    spawnJellyRecursively(0); // Start spawning
  } else {
    rumbleSound.stop(); // Stop sound
    // Spawning stops because isActive becomes false and blocks new jelly
  }
}
