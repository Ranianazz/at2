---
title: My cute sketch!
published_at: 2025-03-20
snippet: Week 3b
disable_html_sanitization: true
allow_math: true
---

# P5.js sketch an offering for my kindred spirit

Click for sound! have fun and create more bubbles.

<iframe id="sketch" src="https://editor.p5js.org/Ranianazz/full/YZT9VN_IB"></iframe>

<script type="module">

    const iframe  = document.getElementById ("sketch")
    iframe.width  = iframe.parentNode.scrollWidth
    iframe.height = iframe.width * 9 / 16 + 42

</script>

# Visuals, Sound & Interaction in My Sketch.

My visual aesthetic was inspired by capturing my kindred spirit's childhood memories, as we both used to play Pokémon when it was just a card game. I utilized a bright colour scheme to highlight Pikachu's iconic colours, emphasizing his adorable nature, and I incorporated this into a cat design. Thus, I created "Pikachu Cat," merging the two cutest creations in the world. I placed Pikachu Cat inside a rainbow bubble to add a playful element to the sketch.

This inspired the audio component, as I thought it would be fitting to use the sound of a bubble popping, given that Pikachu Cat is in a bubble.

Additionally, I decided to add more bubbles that bounce around the screen, creating a mesmerizing and fun little game for my kindred spirit to enjoy along with the sketch.

# How My Sketch Uses Core Coding Concepts.

The purpose of the variables in my sketch is to store and manage data that changes during program execution. I utilized these variables for the background image, the Pikachu cat image, the sound effect, and an array of circles. These are global variables declared at the top of the sketch.

To achieve the cute aesthetic of my sketch, I used several functions: `preload()` to load images, `setup()` to create the canvas and place the initial circle, `draw()` to update and render the circles, and `mousePressed()` to create new circles whenever the mouse is clicked. Additionally, I created functions like `addCircle()`, `updateCircle()`, and `drawCircle()` to manage the circles. The `playBounceSound()` function plays the bounce sound when necessary.

Interactions in the sketch are facilitated by a for loop within the `draw()` function, which iterates through all the circles in the circles array to update and draw each one.

I employed boolean logic to check if the sound is ready to play, which I achieved using the expression `if (popSound.isLoaded())` in the `playBounceSound()` function.

In my cute p5.js sketch, I used the circles array to store all the circle objects created. I utilized the `push` method to add new circles to this array, which is accessed and modified throughout the program's execution.

Since my sketch did not require a class, I did not use any for this project.

# Feedback

![alt text](joolie-feedback.png)

# Refrences

MouseClicked. (n.d.). https://p5js.org/reference/p5/mouseClicked/

Web Dev Simplified. (2021, August 10). Learn the DOM in 15 minutes [Video]. YouTube. https://www.youtube.com/watch?v=DEHsr4XicN8

Patt Vira. (2023, September 22). P5.js Coding Tutorial | Bouncing Ball [Video]. YouTube. https://www.youtube.com/watch?v=rp5xb3VxMt4

fill. (n.d.). https://p5js.org/reference/p5/fill/

Mozilla Developer Network. (n.d.). JavaScript guide: Working with objects. Retrieved from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Working_with_Objects

Mozilla Developer Network. (n.d.). JavaScript reference: Array. Retrieved from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array

Processing Foundation. (n.d.). p5.js reference. Retrieved from https://p5js.org/reference/

Shiffman, D. (n.d.). Creative coding: Media. Retrieved from https://creative-coding.decontextualize.com/media/

p5.js. (n.d.). p5: Object. p5.js. https://p5js.org/reference/p5/Object/

OpenAI. (2023). ChatGPT (Mar 14 version) [Large language model]. https://chat.openai.com/

Pixabay. (n.d.). Bubble sound effects. Retrieved from https://pixabay.com/sound-effects/search/bubble/

p5.js. (n.d.). Image: Background image. The p5.js Web Editor. https://editor.p5js.org/p5/sketches/Image:_Background_Image

<div style="height: 100px;"></div>
