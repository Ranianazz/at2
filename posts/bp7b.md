---
title: Chaos & Dysfunction - Revisiting Interaction
published_at: 2025-04-25
snippet: Week 7b
disable_html_sanitization: true
allow_math: true
---

# "Unlike the interesting, the zany really works against its constraints" — What does that mean?

In my opinion, McKenzie Wark is discussing Sianne Ngai’s definition of the zany as a feeling that is unpredictable. When she states that the zany "works against its constraints," she means that things that are zany don’t just work within systems; they can also push or break them. Whereas the interesting might accept those boundaries and stay within its systems (like a program). The zany resists limits and is unstable and chaotic. It's always doing too much or the wrong thing, in the best way.

# How are the chaotic and the zany similar?

They both can feel unpredictable and disruptive. Both the zany and chaotic can break expectations and can behave in ways we least expect; things won't behave in the way we think they will. Both zany and chaotic can overwhelm or surprise the viewer.

# How are they different?

Chaotic means to be random and unpredictable loud and wild, much like a loss of structure that is like a natural disaster or a glitch in the system.

however Zany has somewhat of an intention,that is exaggeration, and a performance, it has a chaotic presents but with a type of personality. reminds me of a clown juggling too many things at once then slipps on a banana peel: it’s not just disorder, it’s disorder in the spotlight, often funny or absurd.

# In what ways would you consider your AT2 to be zany?

My AT2 can be considered zany due to its chaotic yet structured design, which features jelly-like forms and web-like connections. The structure may seem unpredictable or playful, similar to zany art's tendency to push past norms and create unexpected patterns. Additionally, the inclusion of earthquake sounds makes the jelly's movement feel more realistic, adding a layer of sensory playfulness that fits within the zany aesthetic. It embraces randomness while still having an underlying structure, embodying the concept of zany as both chaotic and intentionally designed.

# What might be some ways to make your AT2 more zany?

To make my work more zany, I could add Unexpected interactive features that add quirky, playful elements that break the same jelly-like patterns, such as random mushrooms or falling trees a which could create an unexpected visual experience when the user least expects it, which could create a zany disruption.

# AT2 Accompaniment – Programming Concepts Used

This project is an interactive, generative 3D art piece that responds to user input by spawning jiggling jelly-like cubes connected in a chaotic, colorful web, with an earthquake sound to evoke the hidden energy of fungal life. Inspired by the article What Is It Like to Be A Fungus?, I wanted to express the idea that fungi are everywhere, pulsing beneath the surface, sometimes causing visible shifts in the world—like an earthquake.

Below, I describe how I used different programming concepts in this work.

# Variables

Variables are used to store the state of the program and reusable data:

` let t = 0;` — used to drive animation timing and background changes.

`let jellyTrail = [];` — stores all the jellies that are spawned.

`let rumbleSound;` — holds the loaded earthquake sound.

`let isActive = false;` — a boolean flag to track whether the sound and spawning are active.

# Iteration

Iteration is used to loop through arrays and update or draw multiple jelly cubes and connections:

```js
for (let i = 0; i < jellyTrail.length; i++) { ... }
```

In `draw()`, this loop animates each jelly object.
In `drawRainbowWeb()`, nested loops draw lines between pairs of jellies:

```js
 for (let i = 0; i < jellyTrail.length; i++) {
  for (let j = i + 1; j < jellyTrail.length; j++) {
    ...
  }
}
```

This creates a web of colored lines based on distance.

# Functions

Functions organize the code and perform specific tasks:

`preload()` loads the sound file.

`setup()` initializes the canvas and audio.

`draw()` runs every frame to render visuals.

`mousePressed()` toggles activity and starts sound/spawning.

`spawnJellyRecursively()` adds new jelly objects with recursion.

`drawRainbowWeb()` connects nearby jellies with colorful lines.

# Boolean Logic

Boolean logic is used to control whether things happen or not:

```js
if (isActive) {
  rumbleSound.play();
  spawnJellyRecursively(0);
} else {
  rumbleSound.stop();
}
```

Also:

```js
if (count >= 200 || !isActive) return;
```

This line ensures recursive spawning stops when the limit is reached or when the system is toggled off.

# Arrays

Arrays are used to store and manage all the jelly cubes:

```js
let jellyTrail = [];</pre>
```

Each jelly is an object with properties like `x, y, z,` and `time`, and is added using `jellyTrail.push(...)`.
This array is looped through in both the animation and the rainbow web drawing.

# Classes

My code does not define a custom class, but I used object literals like this:

```js
jellyTrail.push({ x: x, y: y, z: z, time: t, life: 0 });</pre>
```

This is similar to using classes but in a simplified way.

# Recursion

I used recursion to create a continuous jelly-spawning effect:

```js
function spawnJellyRecursively(count) {
  if (count >= 200 || !isActive) return;

  // Spawn a jelly...

  setTimeout(() => {
    spawnJellyRecursively(count + 1);
  }, 50);
}
```

This function calls itself with a delay, giving the feeling of an organic, growing system which is very appropriate for modeling fungal behavior.

# Artistic Choice: Earthquake Sound

I chose the sound of an earthquake because it complements the visual theme of jiggling jelly. Rather than using a literal or calm sound, I leaned into chaos as a creative principle. Inspired by What Is It Like to Be A Fungus?, I imagined fungi as not just passive decomposers but as powerful, disruptive forces hidden under the surface—like earthquakes.

The jellies jiggle as if reacting to an unseen tremor. The earthquake sound makes the invisible tension audible. It reminds us that fungi and mycelium networks can be subtle or destructive, shaping ecosystems in unpredictable ways. The chaotic aesthetic aligns with this theme.

# How the Work Responds to the Chosen Text

This piece responds to What Is It Like to Be A Fungus? by Merlin Sheldrake through a visual and sonic interpretation of fungal life. The jelly forms represent fungal bodies, connected by a dynamic web — a reference to the “wood-wide web” Sheldrake describes. As these jelly-fungi jiggle and grow, they mimic the unpredictable and hidden rhythms of fungal networks.

The earthquake sound enhances this concept, suggesting a powerful but unseen force shaking the environment. Just as fungi operate beneath the surface, shaping entire ecosystems, the sound makes the invisible energy behind the movement of the jelly feel present and real. This sonic addition gives meaning to the jiggling — turning a random motion into a narrative force that supports the ecological themes of the text.

# Why the Work Is Post-Digital

This project is post-digital in its use of code and interaction to explore organic, living systems. Inspired by post-digital artist Jess Herrington, whose work often explores squishy, surreal, and bodily forms through digital media, I used jelly-like geometry and soft motion to evoke a living, semi-physical quality. The work embraces imperfection, randomness, and touch-like visuals, rather than clean, machine-like aesthetics.

<div style="height: 100px;"></div>
