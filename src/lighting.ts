import * as THREE from 'three';

export function PowerOnLight(scene: THREE.Scene) {
	const amlight = new THREE.AmbientLight(0xffffff);
	scene.add(amlight);
	const light = new THREE.SpotLight(0xffffff, 0.6); // 0xffa95c
	light.castShadow = true;
	light.shadow.bias = -0.0001;
	light.shadow.mapSize.height = 1024 * 4;
	light.shadow.mapSize.width = 1024 * 4;
	scene.add(light);
	return light;
}
