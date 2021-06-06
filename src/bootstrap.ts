import * as THREE from 'three';

export function Bootstrap() {
	const scene = new THREE.Scene();
	scene.fog = new THREE.FogExp2(0x000000, 0.001);

	const camera = new THREE.PerspectiveCamera(
		55,
		window.innerWidth / window.innerHeight,
		2,
		2000
	);
	camera.position.z = 1000;

	// RENDER
	const render = new THREE.WebGLRenderer();
	document.body.appendChild(render.domElement);
	render.setSize(window.innerWidth, window.innerHeight);
	render.setPixelRatio(window.devicePixelRatio);
	return { scene, camera, render };
}
