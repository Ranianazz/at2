---
title: Intro to creative coding.
published_at: 2025-03-04
snippet: Week 1a
disable_html_sanitization: true
allow_math: true
---

# Homwork task 1

This post is a homework assignment that showcases my attempts at creating a grid of squares. First, I searched Google for guidance on how to create a grid of squares in p5.js. The search results led me to a YouTube tutorial that helped me understand the process.

I then came across some p5.js code, which I copied into my existing project. Unfortunately, this caused an error due to the placement of the code. To resolve this, I utilized ChatGPT to generate code that would accomplish what I needed. However, I felt unsatisfied with the result because it wasn't my own work.

Later, I asked Thomas for further guidance to help me understand JavaScript better. He spent significant time explaining the language in detail, which was helpful. However, since JavaScript is like learning a new language, it will take me some time to fully grasp the concepts.

For now, the two examples shown below are the completed homework tasks assigned to my class.

<iframe id="grid" src="https://editor.p5js.org/Ranianazz/full/2Lq-VjJKk"></iframe>

<script type="module">

    const iframe  = document.getElementById ("grid")
    iframe.width  = iframe.parentNode.scrollWidth
    iframe.height = iframe.width * 9 / 16 + 42

</script>

grid completed in class with thomas.

# chatGPT generaded grid

I utilized chatGPT to find a code that generated this image.

<iframe id="grid2" src="https://editor.p5js.org/Ranianazz/full/sy96UEP2Z"></iframe>

<script type="module">

    const iframe  = document.getElementById ("grid2")
    iframe.width  = iframe.parentNode.scrollWidth
    iframe.height = iframe.width * 9 / 16 + 42

</script>

# final grid created with Thoma's grid code.

<iframe id="grid3" src="https://editor.p5js.org/Ranianazz/full/tncd0ztq-"></iframe>

<script type="module">

    const iframe  = document.getElementById ("grid3")
    iframe.width  = iframe.parentNode.scrollWidth
    iframe.height = iframe.width * 9 / 16 + 42

</script>

The grid effect is achieved by setting a frame rate of 10 and applying random offsets to the x and y positions of each square, creating a jittery motion.

The end

<div style="height: 100px;"></div>
