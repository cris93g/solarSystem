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
	camera.position.set(1, 50, -50);
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
	const mercuryMaterial = new THREE.MeshStandardMaterial({
		map: mercuryTexture
	});
	const mercuryMesh = new THREE.Mesh(geometry, mercuryMaterial);
	mercuryMesh.position.set(2.0, 1, 0);
	mercuryMesh.scale.setScalar(0.2);
	mercuryGroup.add(mercuryMesh);
	scene.add(mercuryGroup);
	//VENUS
	const venusGroup = new THREE.Mesh();
	const venusMaterial = new THREE.MeshStandardMaterial({
		roughness: 1,
		metalness: 0,
		map:venusTexture
	})
	const venusMesh = new THREE.Mesh(geometry,venusMaterial)
	venusMesh.position.set(3.0,2.5,3)
	venusMesh.scale.setScalar(.5)
	venusGroup.add(venusMesh)
	scene.add(venusGroup)

	//EARTH
	const earthGroup = new THREE.Mesh();
	const earthMaterial = new THREE.MeshStandardMaterial({
		roughness: 5,
        metalness: 0,
		map:earthTexture
	})
	const earthMesh = new THREE.Mesh(geometry,earthMaterial)
	earthMesh.position.set(4,5,10)
	earthMesh.scale.setScalar(0.7)
	earthGroup.add(earthMesh)
	scene.add(earthGroup)

	//MARS
	const marsGroup = new THREE.Mesh();
	const marsMaterial = new THREE.MeshStandardMaterial({
		roughness: 5,
        metalness: 0,
		map:marsTexture
	})
	const marsMesh = new THREE.Mesh(geometry,marsMaterial)
	marsMesh.position.set(10,8,10)
	marsMesh.scale.setScalar(0.35)
	marsGroup.add(marsMesh)
	scene.add(marsGroup)
	//Jupiter
	const jupiterGroup = new THREE.Mesh();
	const jupiterMaterial= new THREE.MeshStandardMaterial({
		map:jupiterTexture
	})
	const jupiterMesh = new THREE.Mesh(geometry,jupiterMaterial)
	jupiterMesh.position.set(11.5,9,12)
	jupiterMesh.scale.setScalar(3.0)
	jupiterGroup.add(jupiterMesh)
	scene.add(jupiterGroup)

	//SATURN
	const saturnGroup = new THREE.Mesh()
	const saturnMaterial = new THREE.MeshStandardMaterial({
		map:saturnTexture
	})
	const saturnMesh = new THREE.Mesh(geometry,saturnMaterial)
	saturnMesh.position.set(13,13,15)
	saturnMesh.scale.setScalar(2.5)
	saturnGroup.add(saturnMesh)
	scene.add(saturnGroup)

	//URANUS
	const uranusGroup = new THREE.Mesh()
	const uranusMaterial = new THREE.MeshStandardMaterial({
		map:uranusTexture
	})
	const uranusMesh = new THREE.Mesh(geometry,uranusMaterial)
	uranusMesh.position.set(16,15,16.5)
	uranusMesh.scale.setScalar(1.3)
	uranusGroup.add(uranusMesh)
	scene.add(uranusGroup)

	//NEPTUNE
	const neptuneGroup = new THREE.Mesh()
	const neptuneMaterial = new THREE.MeshStandardMaterial({
		map:neptuneTexture
	})
	const neptuneMesh = new THREE.Mesh(geometry,neptuneMaterial)
	neptuneMesh.position.set(18,17,18)
	neptuneMesh.scale.setScalar(1.2)
	neptuneGroup.add(neptuneMesh)
	scene.add(neptuneGroup)
	//LIGHTING
	const light = new THREE.PointLight('white', .3);
	light.position.set(1, 2, 0);
	sunMesh.add(light);
	// helpers
	scene.add(new THREE.GridHelper(5, 50));
	scene.add(new THREE.PointLightHelper(light,.5));
	let axesHelper = new THREE.AxesHelper(5);
	scene.add(axesHelper);

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
			venusGroup.rotation.y=time * 0.06
			earthMesh.rotation.y=time * 0.8;
			earthGroup.rotation.y= time * 0.055;
			marsMesh.rotation.y=time * 0.6;
			marsGroup.rotation.y= time * 0.05;
			jupiterMesh.rotation.y=time * 0.53;
			jupiterGroup.rotation.y=time * 0.03
			uranusMesh.rotation.y=time * 0.1;
			uranusGroup.rotation.y=time * 0.01
			neptuneMesh.rotation.y = time * 0.05;
			neptuneGroup.rotation.y = time * 0.008;
			saturnMesh.rotation.y= time * 0.09;
			saturnGroup.rotation.y = time * 0.009;
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
