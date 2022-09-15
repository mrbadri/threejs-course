import "./style.css";
import * as THREE from "three";

// Canvas
const canvas = document.querySelector("canvas.webgl");

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
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 3;
scene.add(camera);

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);

let time = Date.now();
let flag = true;

const tick = () => {
  // get delta time
  const currentTime = Date.now();
  const deltaTime = currentTime - time;
  time = currentTime;

  console.log("deltaTime:", deltaTime);

  // Update object
  mesh.rotation.y += 0.0075;
  mesh.rotation.z += 0.0075;
  mesh.rotation.x += 0.0075;

  // console.log("flag", flag, Math.round(mesh.position.x));

  // if (mesh.position.x < 2 && flag) {
  //   if (Math.round(mesh.position.x) == 2) {
  //     flag = false;
  //   }
  //   // mesh.position.x += 0.0075;
  //   // mesh.position.z += 0.01;
  //   mesh.scale.z += 0.01;
  //   mesh.scale.y -= 0.01;
  //   mesh.scale.x += 0.02;
  // } else {
  //   if (Math.round(mesh.position.x) == -2) flag = true;
  //   // mesh.position.x -= 0.0075;
  //   // mesh.position.z -= 0.01;
  // }

  // render
  renderer.render(scene, camera);

  window.requestAnimationFrame(tick);
};

tick();
