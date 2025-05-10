---
title: Faller p5.js
published_at: 2025-04-02
snippet: In class
disable_html_sanitization: true
allow_math: true
---

<script src="./scripts/p5.js"></script>

<canvas id="p5_example"></canvas>

<script>
    const cnv = document.getElementById ("p5_example")
    const w = cnv.parentNode.scrollWidth
    const h = w * 9 / 16


    // declaring a variable and assigning to it, an empty object
const faller  = {}

// declaring a variable and assigning to it, an empty array
const fallers = []
let bg

function setup() {
 createCanvas (w, h, P2D, cnv)//this is to make it fullscreen
  noStroke ()// to ensure there is no stroke
  colorMode (HSB)//enableing different colours
   // Assigning an array of two randomly generated colors to the faller object.
  faller.colours = [ rand_col (), rand_col () ]
  // Defining starting points for the animation, where elements will begin falling from.
  faller.start_points = [
    { x: 0, y: height / 2 },
    { x: 0, y: 0 },
    { x: width / 4, y: 0 },
    { x: width / 2, y: 0 },
    { x: width * 3 / 4, y: 0 },
    { x: width, y: 0 },
    { x: width, y: height / 2 },
  ]
  faller.end_points = []// Empty array to store end points for faller animation.
  for (let i = 1; i < 8; i++) {// Looping 7 times to define end points where falling motion will stop.
    faller.end_points.push ({
      x: i * width / 8,// End X positions evenly spaced across the width.
      y: height// End Y positions always at the bottom of the screen.
    })
  }  // Creating an array of 7 randomly generated curve values for animation smoothness.
  faller.curves = new Array (7).fill ().map (rand_curve)
  faller.phase  = 0 // Initializing phase to 0, which will be used to control animation progression.
    // Creating a copy of the faller object and adding it to the fallers array.
  fallers.push (Object.assign ({}, faller))
    // Assign a random color to the background.
  bg = rand_col ()
}

function draw() {
   // Set the background color.
  background (bg)
   // Every 40 frames, create a new faller and update background color.
  if (frameCount % 40 == 0) {
    const new_faller = Object.assign ({}, faller)
    new_faller.colours = [ bg, rand_col () ] // The new faller gets a new color combination.
    new_faller.curves = new Array (7).fill ().map (rand_curve) // Generate new curves for smooth animation variation.
    // Reverse the fallers array, add the new faller, and reverse back.
    fallers.reverse ()
    fallers.push (new_faller)
    fallers.reverse ()
    bg = rand_col () // Assign a new random background color.
  }
  
  const redundant = [] // Array to store indices of fallers that have finished their animation.
  
  fallers.forEach ((f, i) => {// Iterate through each faller in the fallers array.
    colorMode (RGB)// Switch to RGB mode for color interpolation.
    fill (lerpColor (f.colours[0], f.colours[1], f.phase)) // Set the fill color by blending between the two colors based on phase progression.
    beginShape ()  // Begin drawing the shape.
    vertex (0, height) // Start at the bottom-left corner of the canvas.
      // Loop through each start point and calculate its position using phase.
    f.start_points.forEach ((s, i) => {
      const p = find_point (s, f.end_points[i], f.phase ** f.curves[i])
      vertex (p.x, p.y)
    })  // End at the bottom-right corner of the canvas.
    vertex (width, height)
    endShape ()
    f.phase += 0.008
    if (f.phase > 1) redundant.push (i)
  })
  //unsure
  redundant.forEach (n => fallers.splice (n, 1))
  
}
//function for the start and end points based on the phase
function find_point (start, end, phase) {
  const delt = {
    x: end.x - start.x,//calculating the x distance
    y: end.y - start.y//calculating the y distance
  } // Calculate new position based on phase.
  const x = start.x + delt.x * phase
  const y = start.y + delt.y * phase
  return { x, y }
}

// Function to generate a random color in HSB mode.
function rand_col () {
  colorMode (HSB)
  const h = floor (random () * 360)// Random hue between 0 and 360.
  return color (h, 100, 100)
}
// Function to generate a random curve value to control animation smoothness.
function rand_curve () {
  return random () * 2 + 1// Returns a random value between 1 and 3.
}
</script>

<div style="height: 100px;"></div>
