import * as THREE from 'three';

export function Stars(scene: THREE.Scene) {
	const geometry = new THREE.BufferGeometry();
	const vertices = [];

	const sprite = new THREE.TextureLoader().load('../textures/disc.png');
	for (let i = 0; i < 10000; i++) {
		const x = 2000 * Math.random() - 1000;
		const y = 2000 * Math.random() - 1000;
		const z = 2000 * Math.random() - 1000;

		vertices.push(x, y, z);
	}
	geometry.setAttribute(
		'position',
		new THREE.Float32BufferAttribute(vertices, 3)
	);

	const material = new THREE.PointsMaterial({
		size: 35,
		sizeAttenuation: true,
		map: sprite,
		alphaTest: 0.5,
		transparent: true,
	});
	material.color.setHSL(1.0, 0.3, 0.7);

	const particles = new THREE.Points(geometry, material);
	scene.add(particles);
	return material;
}
