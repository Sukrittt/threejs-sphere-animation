import "./style.css";
import * as THREE from "three";
import * as dat from "dat.gui";

//Loading
const textureLoader = new THREE.TextureLoader();
const normalTexture = textureLoader.load("/Textures/NormalMap.png");

// Debug
// const gui = new dat.GUI();

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

// Objects
const geometry = new THREE.SphereBufferGeometry(0.5, 64, 64);

// Materials

const material = new THREE.MeshStandardMaterial({
  metalness: 0.7,
  roughness: 0.2,
  normalMap: normalTexture,
}); //Material which is more realistic.
material.color = new THREE.Color(0x292929);

// Mesh
const sphere = new THREE.Mesh(geometry, material);
scene.add(sphere);

// Lights

//default light
const pointLight = new THREE.PointLight(0xffffff, 0.1);
pointLight.position.set(2, 3, 4);
scene.add(pointLight);

//red light
const pointLight2 = new THREE.PointLight(0xff0000, 2);
pointLight2.position.set(-1.86, 1, -1.65);
pointLight2.intensity = 10;

// const redLight = gui.addFolder("Red Light"); //folder creation for red light.

// redLight.add(pointLight2.position, "x");
// redLight.add(pointLight2.position, "y");
// redLight.add(pointLight2.position, "z");
// redLight.add(pointLight2, "intensity");

scene.add(pointLight2);

//blue light
const pointLight3 = new THREE.PointLight(0x17ebf1, 2);
pointLight3.position.set(1.4, -1.5, -1.6);
pointLight3.intensity = 7;

// const blueLight = gui.addFolder("Blue Light"); //folder creation for blue light.

// blueLight.add(pointLight3.position, "x");
// blueLight.add(pointLight3.position, "y");
// blueLight.add(pointLight3.position, "z");
// blueLight.add(pointLight3, "intensity");

const blueColor = { color: 0xff0000 };

// blueLight.addColor(blueColor, "color").onChange(() => {
//   pointLight3.color.set(blueColor.color);
// });

scene.add(pointLight3);

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.x = 0;
camera.position.y = 0;
camera.position.z = 2;
scene.add(camera);

// Controls
// const controls = new OrbitControls(camera, canvas)
// controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  alpha: true,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Animate
 */

//default mouse position
let mouseX = 0;
let mouseY = 0;

//default target position
let targetX = 0;
let targetY = 0;

//50% of the window's height and width
const windowHalfX = window.innerWidth / 2;
const windowHalfY = window.innerHeight / 2;

//for updating mouse position.
const animateOnMouseMove = (event) => {
  mouseX = event.clientX - windowHalfX; //mouse position on x-axis divided by 50% of screen width.
  mouseY = event.clientY - windowHalfY; //mouse position on y-axis divided by 50% of screen height.
};

document.addEventListener("mousemove", animateOnMouseMove);

const clock = new THREE.Clock();

const tick = () => {
  targetX = mouseX * 0.001;
  targetY = mouseY * 0.001;

  const elapsedTime = clock.getElapsedTime();

  // Update objects
  sphere.rotation.y = 0.5 * elapsedTime;

  sphere.rotation.x += 0.5 * (targetY - sphere.rotation.x);
  sphere.rotation.y += 0.15 * (targetX - sphere.rotation.y);
  sphere.position.z += -0.25 * (targetY - sphere.rotation.x);

  sphere.position.x = 0.0003 * mouseX;
  sphere.position.y = 0.0003 * -mouseY;

  // Update Orbital Controls
  // controls.update()

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
