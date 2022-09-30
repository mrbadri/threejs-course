import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

// Canvas
const canvas = document.querySelector('canvas.webgl');

// Scene
const scene = new THREE.Scene();

// Object
// const geometry = new THREE.BoxGeometry(1, 1, 1, 2, 2, 2);

const geometry = new THREE.BufferGeometry();

const count = 100;
const positionArray = new Float32Array(count * 3 * 3);

for (let i = 0; i < count * 3 * 3; i++) {
  // // positionArray[i] = (Math.random() - 0.5) * 2;
  // if (i % 3 === 0) positionArray[i] = Math.sin(i) * Math.cos(i) * 5;
  // else positionArray[i] = Math.sin(i) * Math.cos(i) * 4;
  positionArray[i] = Math.sin(i) * 100;
}

const positionAttribute = new THREE.BufferAttribute(positionArray, 3);

geometry.setAttribute('position', positionAttribute);

// ? create triangle width float32Array ---
// const positionArray = new Float32Array([0, 0, 0, 0, 1, 0, 1, 0, 0]);

// const positionAttribute = new THREE.BufferAttribute(positionArray, 3);

// geometry.setAttribute('position', positionAttribute);

// positionArray[0] = 0;
// positionArray[1] = 0;
// positionArray[2] = 0;

// positionArray[3] = 0;
// positionArray[4] = 1;
// positionArray[5] = 0;

// positionArray[6] = 1;
// positionArray[7] = 0;
// positionArray[8] = 0;
// ? ---

const material = new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: true });
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// Sizes
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

// ? NEW CODES
window.addEventListener('resize', () => {
  // update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

window.addEventListener('dblclick', () => {
  const fullscreenElement = document.fullscreenElement || document.webkitFullscreenElement;

  if (!fullscreenElement) {
    if (canvas.requestFullscreen) {
      canvas.requestFullscreen();
    } else if (canvas.webkitRequestFullscreen) {
      canvas.webkitRequestFullscreen();
    }
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    }
  }
});

// ? ---

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 1, 1000);

camera.position.z = 3;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);

const tick = () => {
  // Update Controls
  controls.update();

  // render
  renderer.render(scene, camera);

  window.requestAnimationFrame(tick);
};

tick();

/**
 * triangle in boxGeometry
 * bufferGeometry
 * float32Array
 */
