---
title: Web Audio API & Responding to Text
published_at: 2025-04-17
snippet: Week 7a
disable_html_sanitization: true
allow_math: true
---

# Sound design for my AT2 in a chaotic aesthetic register.

To make the sound design for my AT2 function within a chaotic aesthetic register, I chose earthquake sounds. These earthquakes are naturally chaotic, and they are destructive. By using this sound, I aimed to create a feeling of disturbance that matches my jelly like visuals.

Sonicly, chaos means randomness or loudness, wildness. However, pleasing sounds involve a balance between unpredictability and underlying order, this is what makes the sound use effective complexity. Earthquake sounds reflect this well, as they are wild, yet they follow natural patterns and rhythms. This makes them feel natural and alive, not just a static noise.

Structure in sound is often shaped by repetition, rhythm, and frequency. With earthquakes, structure comes from the rumbling lows, the sudden cracks or shakes, and the way these elements rise and fall. This shapes how we hear motion in the piece, syncing with the jiggling movement of the jelly.
Noise is typically understood as sound without a clear structure or purpose. In this case, the earthquake sound draws the line between noise and meaning. It’s not music, but it’s not pure static either. Its ambiguity adds to the zany and chaotic feel of the piece.

Voice is an interesting category because it carries human presence. However, my piece doesn’t feature a voice. Yet movement of the jelly and the earthquake sounds might suggest an indirect expression, a voiceless form of communication.

De-familiarisation, as described by Natalie Loveless, is about making the familiar strange so we can notice it in new ways. In sound design, this means using everyday sounds but placing them in unexpected contexts. For example, the MyNoise Jungle generator turns natural ambience into something wild when increasing or decreasing the sound, defamiliarising the peaceful forest. The Pink Trombone voice simulator separates the mechanics of voice from language, making the human voice feel alien. In How to Kill a Zombie, the voice interactions intensify as you click the voice recording, creating an unnatural voice. These tools help us hear the world differently, making sounds strange to make them meaningful.

# implementing interactive sound experiment.

<!DOCTYPE html>
<html>
<head>
  <title>Chaotic Earthquake Sound</title>
  <style>
    button {
      background-color: #e0f7ff;          /* light blue background */
      color: #0077aa;                     /* darker blue text */
      border: 2px solid #0077aa;          /* blue outline */
      border-radius: 8px;
      padding: 10px 20px;
      font-size: 16px;
      cursor: pointer;
      transition: background-color 0.3s, transform 0.2s;
      margin: 10px;
    }
    button:hover {
      background-color: #c2f0ff;          /* lighter blue on hover */
      transform: scale(1.05);             /* slight zoom effect */
    }

  </style>
</head>
<body>
  <h2>Click to Start or Stop Rumble</h2>
  <button onclick="startSound()">Start Sound</button>
  <button onclick="stopSound()">Stop Sound</button>

  <script>
    let audioCtx;
    let source, gainNode, filter;
    let animationId;
    let isPlaying = false;

    async function startSound() {
      if (isPlaying) return;
      isPlaying = true;

      audioCtx = new (window.AudioContext || window.webkitAudioContext)();

      const response = await fetch('rumble.mp3');
      const arrayBuffer = await response.arrayBuffer();
      const audioBuffer = await audioCtx.decodeAudioData(arrayBuffer);

      source = audioCtx.createBufferSource();
      source.buffer = audioBuffer;
      source.loop = true;

      gainNode = audioCtx.createGain();
      filter = audioCtx.createBiquadFilter();
      filter.type = 'lowpass';

      source.connect(filter);
      filter.connect(gainNode);
      gainNode.connect(audioCtx.destination);

      source.start();

      modulateChaos(audioCtx.currentTime);
    }

    function stopSound() {
      if (!isPlaying) return;
      isPlaying = false;

      if (source) {
        source.stop();
        source.disconnect();
      }

      if (animationId) {
        cancelAnimationFrame(animationId);
      }

      if (audioCtx) {
        audioCtx.close();
      }
    }

    function modulateChaos(startTime) {
      function schedule() {
        const t = audioCtx.currentTime - startTime;
        const chaos = Math.sin((t / 24) * 2 * Math.PI);

        const freq = 500 + chaos * 1000;
        const volume = 0.2 + chaos * 0.3;

        filter.frequency.setTargetAtTime(freq, audioCtx.currentTime, 0.1);
        gainNode.gain.setTargetAtTime(volume, audioCtx.currentTime, 0.1);

        if (isPlaying) {
          animationId = requestAnimationFrame(schedule);
        }
      }

      schedule();
    }
  </script>
</body>
</html>

CSS that styles the buttons and adds the soft blue colour scheme. I added an on-hover feature that slightly zooms in using `transform: scale(1.05)`. This makes the transition hover effect feel smooth.

```js
button {
  background-color: #e0f7ff;
  color: #0077aa;
  border: 2px solid #0077aa;
  border-radius: 8px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s;
  margin: 10px;
}
button:hover {
  background-color: #c2f0ff;
  transform: scale(1.05);
}
```

This shows a heading and two buttons. When you click Start, it runs the `startSound()` function. When you click Stop, it runs `stopSound()`.

```js
<h2>Click to Start or Stop Rumble</h2>
<button onclick="startSound()">Start Sound</button>
<button onclick="stopSound()">Stop Sound</button>
```

These are the main variables.
`audioCtx` is your audio engine.
`source` plays the earthquake sound (`rumble.mp3`).
`gainNode` controls the volume.
`filter` shapes the sound with a low-pass effect.
`animationId` tracks the animation loop.
`isPlaying` stops the sound from starting more than once.

```js
let audioCtx;
let source, gainNode, filter;
let animationId;
let isPlaying = false;
```

Start button function

```js
async function startSound() {
  if (isPlaying) return;
  isPlaying = true;
```

Prevents re-triggering if already playing.

```js
audioCtx = new (window.AudioContext || window.webkitAudioContext)();
```

Creates a new audio context — needed to play sound on the web.

```js
const response = await fetch("rumble.mp3");
const arrayBuffer = await response.arrayBuffer();
const audioBuffer = await audioCtx.decodeAudioData(arrayBuffer);
```

Fetches and decodes your rumble.mp3 file so the browser can play it.

```js
source = audioCtx.createBufferSource();
source.buffer = audioBuffer;
source.loop = true;
```

Creates a sound source that loops the rumble.

```js
gainNode = audioCtx.createGain();
filter = audioCtx.createBiquadFilter();
filter.type = "lowpass";
```

`gainNode`: controls loudness.

`filter`: makes the sound smoother or more muffled.

```js
source.connect(filter);
filter.connect(gainNode);
gainNode.connect(audioCtx.destination);
```

Connects everything together and finally to your speakers.

```js
source.start();
modulateChaos(audioCtx.currentTime);
```

Stop Button Function, Stops the sound, stops the animation, and closes the audio context.

```js
function stopSound() {
  if (!isPlaying) return;
  isPlaying = false;

  if (source) {
    source.stop();
    source.disconnect();
  }

  if (animationId) {
    cancelAnimationFrame(animationId);
  }

  if (audioCtx) {
    audioCtx.close();
  }
}
```

Chaos Modulation

```js
function modulateChaos(startTime) {
  function schedule() {
    const t = audioCtx.currentTime - startTime;
    const chaos = Math.sin((t / 24) * 2 * Math.PI);
```

Every frame, calculates a sinusoidal value that repeats every 24 seconds.

```js
const freq = 500 + chaos * 1000;
const volume = 0.2 + chaos * 0.3;
```

Uses the wave to ahake up the filter frequency (tone) and/or shake up the volume.

```js
filter.frequency.setTargetAtTime(freq, audioCtx.currentTime, 0.1);
gainNode.gain.setTargetAtTime(volume, audioCtx.currentTime, 0.1);
```

Smoothly updates the sound properties to keep it from sounding jumpy.Loops the modulation while sound is playing.

```js
    if (isPlaying) {
      animationId = requestAnimationFrame(schedule);
    }
  }
  schedule();
}
```

# references

Mozilla Developer Network. (n.d.). Web Audio API. MDN Web Docs. Retrieved May 3, 2025, from https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API

Mozilla Developer Network. (n.d.). AudioContext. MDN Web Docs. Retrieved May 3, 2025, from https://developer.mozilla.org/en-US/docs/Web/API/AudioContext

Mozilla Developer Network. (n.d.). AudioBufferSourceNode. MDN Web Docs. Retrieved May 3, 2025, from https://developer.mozilla.org/en-US/docs/Web/API/AudioBufferSourceNode

Mozilla Developer Network. (n.d.). GainNode. MDN Web Docs. Retrieved May 3, 2025, from https://developer.mozilla.org/en-US/docs/Web/API/GainNode

Mozilla Developer Network. (n.d.). BiquadFilterNode. MDN Web Docs. Retrieved May 3, 2025, from https://developer.mozilla.org/en-US/docs/Web/API/BiquadFilterNode

Mozilla Developer Network. (n.d.). CSS Transitions. MDN Web Docs. Retrieved May 3, 2025, from https://developer.mozilla.org/en-US/docs/Web/CSS/transition

Mozilla Developer Network. (n.d.). :hover. MDN Web Docs. Retrieved May 3, 2025, from https://developer.mozilla.org/en-US/docs/Web/CSS/:hover

OpenAI. (2023). ChatGPT (Mar 14 version) [Large language model]. https://chat.openai.com/

<div style="height: 100px;"></div>
