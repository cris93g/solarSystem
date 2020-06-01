// Ensure ThreeJS is in global scope for the 'examples/'
global.THREE = require('three');

// Include any additional ThreeJS examples below
require('three/examples/js/controls/OrbitControls');

const canvasSketch = require('canvas-sketch');

const settings = {
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
	renderer.setClearColor('#000', 1);

	// Setup a camera
	const camera = new THREE.PerspectiveCamera(50, 1, 0.01, 100);
	camera.position.set(1, 4, -15);
	camera.lookAt(new THREE.Vector3());

	// Setup camera controller
	const controls = new THREE.OrbitControls(camera, context.canvas);

	// Setup your scene
	const scene = new THREE.Scene();

	// Setup a geometry
	const geometry = new THREE.SphereGeometry(1, 32, 16);

	//assets come in
	const loader = new THREE.TextureLoader();
	const sunTexture = loader.load('./assets/sun.jpg');
	const earthTexture = loader.load('./assets/earth.jpg');
	const jupiterTexture = loader.load('./assets/jupiter.jpg');
	const marsTexture = loader.load('./assets/mars.jpg');
	const mercuryTexture = loader.load('./assets/mercury.jpg');
	const neptuneTexture = loader.load('./assets/neptune.jpg');
	const saturnTexture = loader.load('./assets/saturn.jpg');
	const uranusTexture = loader.load('./assets/uranus.jpg');
	const venusTexture = loader.load('./assets/venus.jpg');

	// Setup a material
	const material = new THREE.MeshBasicMaterial({
		roughness: 1,
		metalness: 0,
		map: sunTexture
	});

	// Setup a mesh with geometry + material
	const sunMesh = new THREE.Mesh(geometry, material);
	scene.add(sunMesh);
	//MERCURY
	const mercuryGroup = new THREE.Group();
	const mercuryMaterial = new THREE.MeshBasicMaterial({
		map: mercuryTexture
	});
	const mercuryMesh = new THREE.Mesh(geometry, mercuryMaterial);
	mercuryMesh.position.set(2.0, 1, 0);
	mercuryMesh.scale.setScalar(0.5);
	mercuryGroup.add(mercuryMesh);
	scene.add(mercuryGroup);
	//VENUS
	const venusGroup = new THREE.Mesh();
	const venusMaterial = new THREE.MeshBasicMaterial({
		roughness: 1,
		metalness: 0,
		map:venusTexture
	})
	const venusMesh = new THREE.Mesh(geometry,venusMaterial)
	venusMesh.position.set(3.0,2.5,3)
	venusMesh.scale.setScalar(.7)
	venusGroup.add(venusMesh)
	scene.add(venusGroup)

	//EARTH
	const earthGroup = new THREE.Mesh();
	const earthMaterial = new THREE.MeshBasicMaterial({
		map:earthTexture
	})
	const earthMesh = new THREE.Mesh(geometry,earthMaterial)
	earthMesh.position.set(4,5,10)
	earthGroup.add(earthMesh)
	scene.add(earthGroup)
	//LIGHTING
	// const light = new THREE.PointLight('yellow', 1.5);
	// light.position.set(1, 2, 0);
	// sunMesh.add(light);
	//helpers
	scene.add(new THREE.GridHelper(5, 50));
	//scene.add(new THREE.PointLightHelper(light,0.1));
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
			mercuryMesh.rotation.y=time * 0.05;
			mercuryGroup.rotation.y=time * 0.2;
			venusMesh.rotation.y=time * 0.6;
			venusGroup.rotation.y=time * 0.08
			earthMesh.rotation.y=time * 0.8;
			earthGroup.rotation.y= time * 0.065;
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
