---
title: Three.js
published_at: 2025-04-04
snippet: Week 5b
disable_html_sanitization: true
allow_math: true
---

<div id="threejs-container" style="width: 100%; max-width: 960px; aspect-ratio: 16/9; margin: 2rem auto; border: 1px solid #ccc; box-shadow: 0 2px 8px rgba(0,0,0,0.1); border-radius: 8px; overflow: hidden;"></div>

<script type="importmap">
  {
    "imports": {
      "three": "/250408/build/three.module.js",
      "three/Jsm/": "/250408/jsm/"
    }
  }
</script>

<script type="module">
  import * as THREE from 'three';
  import { GLTFLoader } from 'three/Jsm/loaders/GLTFLoader.js';

  const container = document.getElementById('threejs-container');
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  const camera = new THREE.PerspectiveCamera(50, 16 / 9, 1, 10000);
  const scene = new THREE.Scene();

  camera.position.set(0, 150, 600);
  scene.background = new THREE.Color(0xffffff);

  renderer.setSize(container.clientWidth, container.clientHeight);
  container.appendChild(renderer.domElement);

  const light = new THREE.DirectionalLight(0xffffff, 2);
  light.position.set(1, 1, 1);
  scene.add(light);

  const loader = new GLTFLoader();
  loader.load('/250408/models/gltf/Horse.glb', (gltf) => {
    const model = gltf.scene;
    model.scale.set(1.5, 1.5, 1.5);
    scene.add(model);

    const mixer = new THREE.AnimationMixer(model);
    mixer.clipAction(gltf.animations[0]).play();

    let prevTime = Date.now();
    renderer.setAnimationLoop(() => {
      const time = Date.now();
      mixer.update((time - prevTime) * 0.001);
      prevTime = time;

      model.rotation.y += 0.005; // slow rotation
      renderer.render(scene, camera);
    });
  });

  window.addEventListener('resize', () => {
    const width = container.clientWidth;
    const height = container.clientHeight;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
  });
</script>

```js
<div
  id="threejs-container"
  style="
    width: 100%;               // Container takes full width of its parent 
    max-width: 960px;          // But it won’t get wider than 960px 
    aspect-ratio: 16/9;        // Keeps a 16:9 shape (like a widescreen video) 
    margin: 2rem auto;         // Adds space above/below and centers the box horizontally 
    border: 1px solid #ccc;    // Light gray border around the box 
    box-shadow: 0 2px 8px rgba(0,0,0,0.1); // Soft drop shadow for depth 
    border-radius: 8px;        // Rounded corners 
    overflow: hidden;          // Hides anything overflowing the box (like canvas edges) 
  "
></div>
```

I utilised the `<div>` element above to place the 3D horse model inside a styled container that keeps it neat and centered on the page. The container maintains a 16:9 aspect ratio, It’s styled with a light gray border, rounded corners, and a subtle drop shadow to give it a clean, modern appearance. The overflow: hidden property ensures that any part of the canvas that might extend beyond the box is clipped, keeping everything contained. This setup makes the 3D horse look polished and integrates smoothly into the blog layout.

<div style="height: 50px;"></div>

# Sabato Visconti

![alt text](/flower.gif)

Sabato Visconti's artworks convey a sense of distortion, transforming a beautiful flower into a chaotic, unrecognizable shape. This exemplifies post-digital art, where the real and surreal collide, challenging our perception of reality. Rather than presenting the true form of the flower, the artwork immerses it in a false reality, making it difficult to recognize its original beauty.

Under the hood, Sabato Visconti uses the `sin` function to generate sinusoids, which introduces rhythmic, wave-like distortions to the image data. These calculated distortions warp the polygons, bending and merging them into a rotational polynormal—an abstract, fluid form that resists traditional geometry. The result is a digital mutation, where structure and chaos blend, echoing the tension between organic beauty and algorithmic manipulation.

<div style="height: 100px;"></div>
