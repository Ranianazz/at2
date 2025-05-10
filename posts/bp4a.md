---
title: Canvas API, Recursion, & Effective Complexity
published_at: 2025-03-25
snippet: Week 4a
disable_html_sanitization: true
allow_math: true
---

# Exploring Three Visual Compositions Using the p5.js Editor.

<iframe id="sketch" src="https://editor.p5js.org/Ranianazz/full/mDjByF8sv"></iframe>

<script type="module">

    const iframe  = document.getElementById ("sketch")
    iframe.width  = iframe.parentNode.scrollWidth
    iframe.height = iframe.width * 9 / 16 + 42

</script>

```js
let x = 0;
let y = 0;

function setup() {
  createCanvas(640, 360);
  background(0);
  colorMode(HSB, 360, 100, 100);
}

function draw() {
  for (let i = 0; i < 300; i++) {
    drawPoint();
    nextPoint();
  }
}

function drawPoint(i) {
  // Generate hue using y position for color variety
  let hue = map(y, 0, 10, 120, 360); // You can tweak this range
  stroke(hue, 80, 100); // Saturation and brightness fixed
  strokeWeight(1.5);

  let px = map(x, -2.182, 2.6558, 0, width);
  let py = map(y, 0, 9.9983, height, 0);

  point(px, py);
}

function nextPoint() {
  let nextX;
  let nextY;
  let r = random(1);

  if (r < 0.01) {
    nextY = 0.16 * y;
    nextX = 0;
  } else if (r < 0.86) {
    nextX = 0.85 * x + 0.04 * y;
    nextY = -0.04 * x + 0.85 * y + 1.6;
  } else if (r < 0.93) {
    nextX = 0.2 * x + -0.26 * y;
    nextY = 0.23 * x + 0.22 * y + 1.6;
  } else {
    nextX = -0.15 * x + 0.28 * y;
    nextY = 0.26 * x + 0.24 * y + 0.44;
  }
  x = nextX;
  y = nextY;
}
```

To create this high compressibility sketch, I followed a step-by-step tutorial from The Coding Train. It involved a lot of math; however, after following the tutorial, the math began to make sense. I was inspired by how beautiful the rainbow fern looked. I searched for ways to add colour to it and discovered the `colorMode(HSB, 360, 100, 100)` function, which I thought would transform it into a rainbow fern. Unfortunately, it didn't work as expected, so I conducted further research and found that I also needed to change the stroke settings. I used `stroke(hue, 80, 100);` and `strokeWeight(1.5);` along with `let hue = map(y, 0, 10, 120, 360);`. After adjusting the draw function, I finally achieved the desired look.

<iframe id="sketch2" src="https://editor.p5js.org/Ranianazz/full/gWsmrYMGs"></iframe>

<script type="module">

    const iframe  = document.getElementById ("sketch2")
    iframe.width  = iframe.parentNode.scrollWidth
    iframe.height = iframe.width * 9 / 16 + 42

</script>

```js
let tree = [];
let leaves = [];

let count = 0;

function setup() {
  createCanvas(400, 400);
  let a = createVector(width / 2, height);
  let b = createVector(width / 2, height - 100);
  let root = new Branch(a, b);

  tree[0] = root;
}

function mousePressed() {
  for (let i = tree.length - 1; i >= 0; i--) {
    if (!tree[i].finished) {
      tree.push(tree[i].branchA());
      tree.push(tree[i].branchB());
    }
    tree[i].finished = true;
  }
  count++;

  if (count === 6) {
    for (var i = 0; i < tree.length; i++) {
      if (!tree[i].finished) {
        let leaf = tree[i].end.copy();
        leaves.push(leaf);
      }
    }
  }
}

function draw() {
  background(51);

  for (var i = 0; i < tree.length; i++) {
    tree[i].show();
    tree[i].jitter();
  }

  for (var i = 0; i < leaves.length; i++) {
    fill(255, 0, 100, 100);
    noStroke();
    ellipse(leaves[i].x, leaves[i].y, 8, 8);
    leaves[i].y += random(0, 2);
  }
}
```

I followed a step-by-step Coding Train tutorial to create this sketch. I consider it high effective complexity because it combines interactive growth (mousePressed) with structured branching and randomness in tree shapes and falling leaves.

<iframe id="sketch3" src="https://editor.p5js.org/Ranianazz/full/YgYiDt_yc"></iframe>

<script type="module">

    const iframe  = document.getElementById ("sketch3")
    iframe.width  = iframe.parentNode.scrollWidth
    iframe.height = iframe.width * 9 / 16 + 42

</script>

```js
let xoff = 0;

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background("pink");
  // let x = random(width);

  let x = map(noise(xoff), 0, 1, 0, width);

  xoff += 0.01;

  ellipse(x, 200, 24, 24);
}
```

I utilised another step-by-step tutorial to create this low-compressible sketch. The sketch uses Perlin noise to smoothly move a circle across the screen. I’d say it has low compressibility because it utilises noise to create an output that is predictable and simple—there’s structure, but little surprise or complexity.

# Philip Galanter perspective on genereative art

In my opinion, Philip Galanter’s article suggests that generative art is any art created using a system that operates autonomously. His notion that “structure is subjective and remains in the eye of the beholder” indicates that generative art can be broad enough to encompass both past and future expressions. It can serve as a subset of all art, adapting as artistic practices evolve over time. This perspective is useful because it allows for a wide range of interpretations and evolving forms within generative art.

# SABATO VISCONTI

In the artwork “Renders in the Time of COVID-19,” Sabato Visconti explores the intersection of digital glitch aesthetics and generative art. He combines structured elements with randomness to create a sense of Effective Complexity. The images rotate in a perfect circular motion, conveying stability and predictability. However, Visconti introduces randomness through varied colours and textures, making the visual effects seem unpredictable. The glitch effects further disrupt the images, adding a layer of chaos to the overall visual experience. The geometric contrasts between the rotation and the colours and textures result in high Effective Complexity. This piece is neither fully ordered nor completely chaotic, making it engaging and open to multiple interpretations.

<div style="height: 100px;"></div>
