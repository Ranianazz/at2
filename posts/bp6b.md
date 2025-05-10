---
title: Shaders, Moiré, & the Demoscene
published_at: 2025-04-15
snippet: Week 6b
disable_html_sanitization: true
allow_math: true
---

<iframe id="sketch" src="https://editor.p5js.org/Ranianazz/full/BUxKnC-V6"></iframe>

<script type="module">

    const iframe  = document.getElementById ("sketch")
    iframe.width  = iframe.parentNode.scrollWidth
    iframe.height = iframe.width * 9 / 16 + 42

</script>

# WHAT IS IT LIKE TO BE A FUNGUS by Merlin Sheldrake

Three passages written by Merlin Sheldrake that sparked my curiosity.

“In simple terms, plants are
socially networked by fungi. This is what is meant by the “wood wide
web.”

“WHETHER IN FORESTS, labs, or kitchens, fungi have changed my understanding of how life happens”.

“To this day, new ecosystems on land are founded by fungi. When volcanic islands are made or glaciers retreat to reveal bare rock, lichens (pronounced LY ken)—a union of fungi and algae or bacteria—are the first organisms to establish themselves and to make the soil in which plants subsequently take root.”

These passages made me think about fungi as the hidden, colourful, and essential network that connects life. I wanted to display this by creating a colourful web, which represents different life forms or energies that connect. As merlin says fungi is in everything I thought could it be in jelly? When I discovered there is a fungus called ‘jelly fungi’, which inspired me to use "jelly" shapes at the points where the web meets, showing the soft, flexible, and lively nature of fungal connections.

Additionally, I was inspired by Jess Herrington’s artwork 'Jelly'. Her use of vibrant hot pink, jelly-like forms inspired me to include jelly elements at the connection points in my web to make the fungi network look more lively and organic.

I created my sketch using p5.js because I have been learning about it in class, so it felt like the fitting choice. I wanted to include shaders and thought I could make a jelly shader using a vertex shader, but when I made it 3d it looked more like slime. So instead, I used recursion to spawn and re-spawn the jelly at the points of the web. I made a function that calls itself to keep creating smaller jelly shapes at different points, which made the web feel more alive and random, kind of like how fungi actually grow and spread in real life.

<div style="height: 100px;"></div>
