import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import * as dat from 'dat.gui';
import gsap from 'gsap';

/**
 * Debug
 */
const gui = new dat.GUI({ closed: true, width: 400 });
// gui.hide();

const parameters = {
  color: 0xff0000,
  spin: () => {
    gsap.to(mesh.rotation, { duration: 1, y: mesh.rotation.y + 10 });
    // console.log('Here');
  },
};

gui.addColor(parameters, 'color').onChange(() => {
  material.color.set(parameters.color);
});

gui.add(parameters, 'spin');

/**
 * Texture
 */

const loadingManager = new THREE.LoadingManager();

loadingManager.onStart = () => {
  console.log('Start');
};

loadingManager.onProgress = () => {
  console.log('on progress');
};

loadingManager.onError = () => {
  console.log('on Error');
};

loadingManager.onLoad = () => {
  console.log('loaded');
};

const textureLoader = new THREE.TextureLoader(loadingManager);

const texture = textureLoader.load(
  // '/textures/door/color.jpg',
  // '/textures/checkerboard-1024x1024.png',
  // 'textures/checkerboard-8x8.png',
  'textures/minecraft.png',
  () => {
    console.log('loaded');
  },
  () => {
    console.log('in progress');
  },
  () => {
    console.log('Error');
  }
);

// texture.repeat.x = 2;
// texture.repeat.y = 3;

// texture.wrapS = THREE.RepeatWrapping;
// texture.wrapT = THREE.RepeatWrapping;

// texture.offset.x = 0.5;
// texture.offset.y = 0.5;

// texture.rotation = Math.PI / 4  ;
// texture.center.x = 0.5;
// texture.center.y = 0.5;

// texture.minFilter = THREE.NearestMipmapNearestFilter;

//  ! this is wonderfully
texture.generateMipmaps = false;
texture.minFilter = THREE.NearestFilter;
texture.magFilter = THREE.NearestFilter;

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl');

// Scene
const scene = new THREE.Scene();

// Object
const geometry = new THREE.BoxGeometry(10, 10, 10);
// const geometry = new THREE.SphereBufferGeometry(1, 32, 32);
// const geometry = new THREE.ConeBufferGeometry(1, 1, 32);
// const geometry = new THREE.TorusBufferGeometry(1, 0.35, 32 , 100);

console.log('UV:', geometry.attributes.uv);

const material = new THREE.MeshBasicMaterial({ map: texture });
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// Debug
// gui.add(mesh.position, 'y', -3, 3, 0.01);
gui.add(mesh.position, 'y').min(-3).max(3).step(0.01).name('Elevation');
gui.add(mesh, 'visible');
gui.add(mesh.material, 'wireframe');

// Sizes
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

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

  const geometry = new THREE.ConeBufferGeometry(1, 1, 32);
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

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 1, 1000);

camera.position.z = 15;
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
 * Debug UI
 */
