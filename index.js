import * as THREE from "three";
import { OrbitControls } from 'jsm/controls/OrbitControls.js';

import getStarfield from "./src/getStarfield.js";
import { getFresnelMat } from "./src/getFresnelMat.js";

const w = window.innerWidth;
const h = window.innerHeight;
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, w / h, 0.1, 1000);
camera.position.z = 3;
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(w, h);
document.body.appendChild(renderer.domElement);
// THREE.ColorManagement.enabled = true;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.outputColorSpace = THREE.LinearSRGBColorSpace;

const earthGroup = new THREE.Group();
earthGroup.rotation.z = -23.4 * Math.PI / 180;
scene.add(earthGroup);
new OrbitControls(camera, renderer.domElement);
const detail = 12;
const loader = new THREE.TextureLoader();
const geometry = new THREE.IcosahedronGeometry(1, detail);
const material = new THREE.MeshPhongMaterial({
  map: loader.load("./textures/00_earthmap1k.jpg"),
  specularMap: loader.load("./textures/02_earthspec1k.jpg"),
  bumpMap: loader.load("./textures/01_earthbump1k.jpg"),
  bumpScale: 0.04,
});
// material.map.colorSpace = THREE.SRGBColorSpace;
const earthMesh = new THREE.Mesh(geometry, material);
earthGroup.add(earthMesh);

const lightsMat = new THREE.MeshBasicMaterial({
  map: loader.load("./textures/03_earthlights1k.jpg"),
  blending: THREE.AdditiveBlending,
});
const lightsMesh = new THREE.Mesh(geometry, lightsMat);
earthGroup.add(lightsMesh);

const cloudsMat = new THREE.MeshStandardMaterial({
  map: loader.load("./textures/04_earthcloudmap.jpg"),
  transparent: true,
  opacity: 0.8,
  blending: THREE.AdditiveBlending,
  alphaMap: loader.load('./textures/05_earthcloudmaptrans.jpg'),
  // alphaTest: 0.3,
});
const cloudsMesh = new THREE.Mesh(geometry, cloudsMat);
cloudsMesh.scale.setScalar(1.003);
earthGroup.add(cloudsMesh);

const fresnelMat = getFresnelMat();
const glowMesh = new THREE.Mesh(geometry, fresnelMat);
glowMesh.scale.setScalar(1.01);
earthGroup.add(glowMesh);

const stars = getStarfield({ numStars: 2000 });
scene.add(stars);

const sunLight = new THREE.DirectionalLight(0xffffff, 2.0);
sunLight.position.set(-2, 0.5, 1.5);
scene.add(sunLight);

let rotationSPeed = 0.001;

function animate() {
  requestAnimationFrame(animate);
  if (earthSpinning) {
    earthMesh.rotation.y += 0.002 + rotationSPeed;
    lightsMesh.rotation.y += 0.002 + rotationSPeed;
    cloudsMesh.rotation.y += 0.0023 + rotationSPeed;
    glowMesh.rotation.y += 0.002 + rotationSPeed;
    stars.rotation.y -= 0.0002 + rotationSPeed;
  }

  if (madeinheaven) { //fixed
    rotationSPeed = rotationSPeed + 0.0001;
  }
  else if (gold1) {
    rotationSPeed = rotationSPeed - 0.0001;
  } else if (skipK && earthSpinning == true){
if (skip2 == false && earthSpinning == true ){ 
earthMesh.rotation.y += 0.5
lightsMesh.rotation.y += 0.5
cloudsMesh.rotation.y += 0.23
glowMesh.rotation.y += 0.5
stars.rotation.y += 2
console.log(earthMesh.rotation.y)
skip2 = true
}
  earthMesh.rotation.y += 0.002 + rotationSPeed;
  lightsMesh.rotation.y += 0.002 + rotationSPeed;
  cloudsMesh.rotation.y += 0.0023 + rotationSPeed;
  glowMesh.rotation.y += 0.002 + rotationSPeed;
  stars.rotation.y -= 0.0002 + rotationSPeed;
  }
  else {
    rotationSPeed = 0.001;
  }

if (jamiroquai && earthSpinning == true){
  earthMesh.rotation.x -= 0.002 + rotationSPeed;
  lightsMesh.rotation.y += 0.002 + rotationSPeed;
  cloudsMesh.rotation.x += 0.0023 + rotationSPeed;
  glowMesh.rotation.y -= 0.002 + rotationSPeed;
  stars.rotation.x += 0.0002 + rotationSPeed;
  earthMesh.rotation.y += 0.02 + rotationSPeed;
  lightsMesh.rotation.y += 0.02 + rotationSPeed;
  cloudsMesh.rotation.y += 0.023 + rotationSPeed;
  glowMesh.rotation.y += 0.02 + rotationSPeed;
  stars.rotation.y -= 0.002 + rotationSPeed;
  camera.rotation.z += 0.02 + rotationSPeed;
}

  renderer.render(scene, camera);

}

animate();

function handleWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}
window.addEventListener('resize', handleWindowResize, false);


