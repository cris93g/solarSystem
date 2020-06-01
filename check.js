global.THREE = require('three');

// Include any additional ThreeJS examples below
require('three/examples/js/controls/OrbitControls');
const canvasSketch = require('canvas-sketch');

const settings = {
    //dimensions: 'A4',
    //orientation: 'landscape',
    //scaleToView: true,
    // Make the loop animated
    animate: true,
    // Get a WebGL canvas rather than 2D
    context: 'webgl'
};

const sketch = ({ context }) => {
    // Create a renderer
    const renderer = new THREE.WebGLRenderer({
        canvas: context.canvas
    });

    // WebGL background color
    renderer.setClearColor('black', 1);

    // Setup a camera
    const camera = new THREE.PerspectiveCamera(45, 1, 0.01, 100);
    camera.position.set(1, 8, -25);
    camera.lookAt(new THREE.Vector3());

    // Setup camera controller
    const controls = new THREE.OrbitControls(camera, context.canvas);

    // Setup your scene
    const scene = new THREE.Scene();

    // Setup a geometry
    const geometry = new THREE.SphereGeometry(1, 32, 16);

    const loader = new THREE.TextureLoader();
    const texture = loader.load('earth.jpg');
    const moonTexture = loader.load('moon.jpg');
    const marsTexture = loader.load('mars.jpg');
    const jupiterTexture = loader.load('jupiter.jpg');

    // Setup a material
    const material = new THREE.MeshStandardMaterial({
        roughness: 1,
        metalness: 0,
        //color: 'black',
        //MeshBasicMaterial: '#ff00ff',
        //wireframe: true,
        //flatShading: true
        map: texture
    });

    // Setup a mesh with geometry + material
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    //moon
    const moonGroup = new THREE.Group();
    const moonMaterial = new THREE.MeshStandardMaterial({
        roughness: 1,
        metalness: 0,
        //color: 'black',
        //MeshBasicMaterial: '#ff00ff',
        //wireframe: true,
        //flatShading: true

        map: moonTexture
    });
    const moonMesh = new THREE.Mesh(geometry, moonMaterial);
    moonMesh.position.set(1.5, 1, 0);
    moonMesh.scale.setScalar(0.25);
    moonGroup.add(moonMesh);

    scene.add(moonGroup);
    //mars
    const marsGroup = new THREE.Group();
    const marsMaterial = new THREE.MeshStandardMaterial({
        roughness: 5,
        metalness: 0,
        map: marsTexture
    });
    const marsMesh = new THREE.Mesh(geometry, marsMaterial);
    marsMesh.position.set(2.0, 3, 4);
    marsGroup.add(marsMesh);
    scene.add(marsGroup);
    //jupiter
    const jupiterGroup = new THREE.Group();
    const jupiterMaterial = new THREE.MeshStandardMaterial({
        roughness: 5,
        metalness: 0,
        map: jupiterTexture
    });
    const jupiterMesh = new THREE.Mesh(geometry, jupiterMaterial);
    jupiterMesh.position.set(8, 8, 1.5);
    jupiterMesh.scale.setScalar(2.0);
    jupiterGroup.add(jupiterMesh);
    scene.add(jupiterGroup);
    //lights
    const light = new THREE.PointLight('white', 1.5);
    light.position.set(1, 2, 0);
    moonGroup.add(light);
    //scene Helpers.
    scene.add(new THREE.GridHelper(5, 50));
    scene.add(new THREE.PointLightHelper(light, 0.1));
    let axesHelper = new THREE.AxesHelper(5);
    scene.add(axesHelper);
    // draw each frame
    return {
        // Handle resize events here
        resize({ pixelRatio, viewportWidth, viewportHeight }) {
            renderer.setPixelRatio(pixelRatio);
            renderer.setSize(viewportWidth, viewportHeight, false);
            camera.aspect = viewportWidth / viewportHeight;
            camera.updateProjectionMatrix();
        },
        // Update & render your scene here
        render({ time }) {
            //rotation
            mesh.rotation.y = time * 0.15;
            moonMesh.rotation.y = time * 0.075;
            moonGroup.rotation.y = time * 0.4;
            marsMesh.rotation.y = time * 0.09;
            marsGroup.rotation.y = time * 0.1;
            jupiterMesh.rotation.y = time * 0.06;
            jupiterGroup.rotation.y = time * 0.06;
            controls.update();
            renderer.render(scene, camera);
        },
        // Dispose of events & renderer for cleaner hot-reloading
        unload() {
            controls.dispose();
            renderer.dispose();
        }
    };
};

canvasSketch(sketch, settings);