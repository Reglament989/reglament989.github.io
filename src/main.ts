import './style.scss';
import * as THREE from 'three';
import { Bootstrap } from './bootstrap';
import discTexture from '../textures/disc.png';

let material: THREE.PointsMaterial | undefined;
let mouseX = 0,
	mouseY = 0;

let windowHalfX = window.innerWidth / 2;
let windowHalfY = window.innerHeight / 2;
const { scene, camera, render } = Bootstrap();

init();
animate();

function init() {
	const geometry = new THREE.BufferGeometry();
	const vertices = [];

	const sprite = new THREE.TextureLoader().load(discTexture);

	for (let i = 0; i < 3000; i++) {
		const x = 2000 * Math.random() - 1000;
		const y = 2000 * Math.random() - 1000;
		const z = 2000 * Math.random() - 1000;

		vertices.push(x, y, z);
	}

	geometry.setAttribute(
		'position',
		new THREE.Float32BufferAttribute(vertices, 3)
	);

	material = new THREE.PointsMaterial({
		size: 35,
		sizeAttenuation: true,
		map: sprite,
		alphaTest: 0.5,
		transparent: true,
	});
	material.color.setHSL(1.0, 0.3, 0.7);

	const particles = new THREE.Points(geometry, material);
	scene.add(particles);

	document.body.style.touchAction = 'none';
	document.body.addEventListener('pointermove', onPointerMove);
	// document.body.onscroll = onScroll;
	window.addEventListener('resize', onWindowResize);
	document.getElementById('body')!.style.display = 'block';
	document.getElementById('matrix')!.onclick = () =>
		window.open('https://matrix.to/#/@howtotakeusername:matrix.org', '_blank');
	document.getElementById('github')!.onclick = () =>
		window.open('https://github.com/Reglament989', '_blank');
	console.log('Fully inited.');
}

function onWindowResize() {
	windowHalfX = window.innerWidth / 2;
	windowHalfY = window.innerHeight / 2;

	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();

	render.setSize(window.innerWidth, window.innerHeight);
}

// function onScroll() {
// 	const t = document.body.getBoundingClientRect().top;
// 	camera.position.z = t * -0.01;
// 	camera.position.x = t * -0.0002;
// }

function onPointerMove(event: any) {
	if (event.isPrimary === false) return;

	mouseX = event.clientX - windowHalfX;
	mouseY = event.clientY - windowHalfY;
}

function animate() {
	requestAnimationFrame(animate);
	const time = Date.now() * 0.00005;

	camera.position.x += (mouseX - camera.position.x) * 0.05;
	camera.position.y += (-mouseY - camera.position.y) * 0.05;

	camera.lookAt(scene.position);

	const h = ((360 * (1.0 + time)) % 360) / 360;
	material!.color.setHSL(h, 0.5, 0.5);

	render.render(scene, camera);
}
