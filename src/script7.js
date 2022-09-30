import './style.css';
import * as THREE from 'three';
import gsap from 'gsap';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

console.log('orbitControls', OrbitControls);

// Cursor
const cursor = {
  x: 0,
  y: 0,
};

window.addEventListener('mousemove', event => {
  cursor.x = event.clientX / sizes.width - 0.5;

  cursor.y = -(event.clientY / sizes.height - 0.5);
});

// Canvas
const canvas = document.querySelector('canvas.webgl');

// Scene
const scene = new THREE.Scene();

// Object
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// Sizes
const sizes = {
  width: 800,
  height: 600,
};

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 1, 1000);

// const acceptRatio = sizes.width / sizes.height;
// const camera = new THREE.OrthographicCamera(-1 * acceptRatio, 1 * acceptRatio, 1, -1, 1, 1000);

camera.position.z = 3;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
//  --- smooth animation
controls.enableDamping = true;
// controls.target.y = 1;
// controls.update();

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);

// Clock
const clock = new THREE.Clock();

const tick = () => {
  const elpasedTime = clock.getElapsedTime();

  // Update camera

  // ----
  // camera.position.x = Math.sin(cursor.x * Math.PI * 2) * 3;
  // camera.position.z = Math.cos(cursor.x * Math.PI * 2) * 3;
  // camera.position.y = cursor.y * 5;
  // camera.lookAt(mesh.position);

  // -----
  // camera.position.x = cursor.x * 10;
  // camera.position.y = cursor.y * 10;
  // camera.lookAt(mesh.position);

  // mesh.rotation.x = cursor.x;
  // mesh.rotation.y = cursor.y;

  // mesh.scale.x = cursor.x;
  // mesh.scale.y = cursor.y;

  // mesh.rotation.y = Math.sin(elpasedTime);
  // mesh.rotation.x = Math.cos(elpasedTime);
  // mesh.rotation.z = Math.sin(elpasedTime);

  // mesh.scale.z = Math.sin(elpasedTime);
  // mesh.scale.y = Math.cos(elpasedTime);

  // Update Controls
  controls.update();

  // render
  renderer.render(scene, camera);

  window.requestAnimationFrame(tick);
};

tick();
