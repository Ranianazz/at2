---
title: Experimenting with 3D.js
published_at: 2025-04-03
snippet: class experiment
disable_html_sanitization: true
allow_math: true
---

# class experiment

When working with three.js to import 3D models in a Deno environment, we encountered a variety of challenges that ultimately led us to discover the correct method for successfully uploading and rendering these models. Through a process of trial and error, we navigated multiple errors related to import paths, file formats, and dependency management. We learned about the importance of ensuring compatibility between the three.js version and the file type of the 3D model, as well as how to properly import modules in Deno's runtime. With these insights, we were able to streamline the process of integrating 3D models into our projects, enabling smoother development and more dynamic visual experiences.

<div id="three.js_container" style="width: 100%; max-width: 960px; aspect-ratio: 16/9; margin: 2rem auto; border: 1px solid #ccc; box-shadow: 0 2px 8px rgba(0,0,0,0.1); border-radius: 8px; overflow: hidden;"></div>

<!-- <script type="module">
    import * as THREE from "/250408/build/three.module.js"
    console.log (THREE)
    const container = document.getElementById ('three.js_container')
    const width = container.parentNode.scrollWidth
    const height = width * 9/16

</script> -->

<script type="importmap">
    {
        "imports": {
            "three": "/250408/build/three.module.js",
            "three/Jsm/": "./jsm/"
        }
    }
</script>

<script type="module">

    import * as THREE from 'three';
    import Stats from '/250408/jsm/libs/stats.module.js';
    import { GUI } from '/250408/jsm/libs/lil-gui.module.min.js';

    import { GLTFLoader } from '/250408/jsm/loaders/GLTFLoader.js';

    let container, stats, clock, gui, mixer, actions, activeAction, previousAction;
    let camera, scene, renderer, model, face;

    const api = { state: 'Walking' };

    init();

    function init() {

        //container = document.createElement( 'div' );
        const container = document.getElementById('three.js_container');
        const width = container.clientWidth;
        const height = container.clientHeight;

        // const canvasWidth = width;
        // const canvasHeight = height;

        // camera = new THREE.PerspectiveCamera( 45, width / height, 0.25, 100 );
        camera = new THREE.PerspectiveCamera( 45, width / height, 0.25, 100 );

        camera.position.set( - 5, 3, 10 );
        camera.lookAt( 0, 2, 0 );

        scene = new THREE.Scene();
        scene.background = new THREE.Color( 0xffffff );
        scene.fog = new THREE.Fog( 0xffffff, 20, 100 );

        clock = new THREE.Clock();

        // lights

        const hemiLight = new THREE.HemisphereLight( 0xffffff, 0x8d8d8d, 3 );
        hemiLight.position.set( 0, 20, 0 );
        scene.add( hemiLight );

        const dirLight = new THREE.DirectionalLight( 0xffffff, 3 );
        dirLight.position.set( 0, 20, 10 );
        scene.add( dirLight );

        // ground

        const mesh = new THREE.Mesh( new THREE.PlaneGeometry( 2000, 2000 ), new THREE.MeshPhongMaterial( { color: 0xcbcbcb, depthWrite: false } ) );
        mesh.rotation.x = - Math.PI / 2;
        scene.add( mesh );

        const grid = new THREE.GridHelper( 200, 40, 0x000000, 0x000000 );
        grid.material.opacity = 0.0;
        grid.material.transparent = true;
        scene.add( grid );

        // model

        const loader = new GLTFLoader();
        loader.load( '/250408/models/gltf/RobotExpressive/RobotExpressive.glb', function ( gltf ) {

            model = gltf.scene;
            scene.add( model );

            createGUI( model, gltf.animations );

        }, undefined, function ( e ) {

            console.error( e );

        } );

        renderer = new THREE.WebGLRenderer( { antialias: true } );
        renderer.setPixelRatio( window.devicePixelRatio );
        renderer.setSize(width, height);
        renderer.setAnimationLoop( animate );
        container.appendChild( renderer.domElement );

        function onWindowResize() {
        const width = container.clientWidth;
        const height = container.clientHeight;

        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height);
}

        // stats
        stats = new Stats();
        container.appendChild( stats.dom );

    }

    function createGUI( model, animations ) {

        const states = [ 'Idle', 'Walking', 'Running', 'Dance', 'Death', 'Sitting', 'Standing' ];
        const emotes = [ 'Jump', 'Yes', 'No', 'Wave', 'Punch', 'ThumbsUp' ];

        gui = new GUI();

        mixer = new THREE.AnimationMixer( model );

        actions = {};

        for ( let i = 0; i < animations.length; i ++ ) {

            const clip = animations[ i ];
            const action = mixer.clipAction( clip );
            actions[ clip.name ] = action;

            if ( emotes.indexOf( clip.name ) >= 0 || states.indexOf( clip.name ) >= 4 ) {

                action.clampWhenFinished = true;
                action.loop = THREE.LoopOnce;

            }

        }

        // states

        const statesFolder = gui.addFolder( 'States' );

        const clipCtrl = statesFolder.add( api, 'state' ).options( states );

        clipCtrl.onChange( function () {

            fadeToAction( api.state, 0.5 );

        } );

        statesFolder.open();

        // emotes

        const emoteFolder = gui.addFolder( 'Emotes' );

        function createEmoteCallback( name ) {

            api[ name ] = function () {

                fadeToAction( name, 0.2 );

                mixer.addEventListener( 'finished', restoreState );

            };

            emoteFolder.add( api, name );

        }

        function restoreState() {

            mixer.removeEventListener( 'finished', restoreState );

            fadeToAction( api.state, 0.2 );

        }

        for ( let i = 0; i < emotes.length; i ++ ) {

            createEmoteCallback( emotes[ i ] );

        }

        emoteFolder.open();

        // expressions

        face = model.getObjectByName( 'Head_4' );

        const expressions = Object.keys( face.morphTargetDictionary );
        const expressionFolder = gui.addFolder( 'Expressions' );

        for ( let i = 0; i < expressions.length; i ++ ) {

            expressionFolder.add( face.morphTargetInfluences, i, 0, 1, 0.01 ).name( expressions[ i ] );

        }

        activeAction = actions[ 'Walking' ];
        activeAction.play();

        expressionFolder.open();

    }

    function fadeToAction( name, duration ) {

        previousAction = activeAction;
        activeAction = actions[ name ];

        if ( previousAction !== activeAction ) {

            previousAction.fadeOut( duration );

        }

        activeAction
            .reset()
            .setEffectiveTimeScale( 1 )
            .setEffectiveWeight( 1 )
            .fadeIn( duration )
            .play();

    }

    function onWindowResize() {

        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();

        renderer.setSize( window.innerWidth, window.innerHeight );

    }

    //

    function animate() {

        const dt = clock.getDelta();

        if ( mixer ) mixer.update( dt );

        renderer.render( scene, camera );

        stats.update();

    }

</script>

For my class project, I chose a 3D robot model to work with, opting for it over the popular teapot model that most of my classmates selected. I found the robot to be quite charming. With the support of my peers and Thomas, I successfully uploaded the model, but I noticed that the original grid background remained and the model was too large for my needs. To fix this, I changed the background to white using the color `0xffffff` and resized the model accordingly.

Additionally, I revamped the code to wrap the 3D canvas in a styled `<div>`, ensuring it maintained a fixed aspect ratio of 16:9. I set a maximum width, centered the content, and added padding, a border, and a subtle box shadow to enhance its appearance. By utilizing the `loader.load()` functions, I was able to center the model within the scene. I also made edits to the `init()` function to size the render according to the container. These adjustments helped the canvas stand out visually from the surrounding text and ensured it was well-integrated into the overall content layout.

<div style="height: 100px;"></div>
