import './style.css';
import * as THREE from 'three';

let tick;

const screenWidth = window.innerWidth;
const screenHeight = window.innerHeight;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(60, screenWidth / screenHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(screenWidth, screenHeight);
camera.position.setZ(15);
renderer.render(scene, camera);

const boxtexture = new THREE.TextureLoader().load('pendejo.jpg');
const boxnormal = new THREE.TextureLoader().load('nmap.jpg');
const box = new THREE.Mesh(
  new THREE.BoxGeometry(5, 5, 5, 1, 1, 1),
  new THREE.MeshStandardMaterial({
    map: boxtexture, 
    normalMap: boxnormal,
    color: 0xffffff, 
    wireframe: false
  }),
);

const pointlight = new THREE.PointLight(0xffffff, 2);
pointlight.position.set(5, 5, 5);
const ambientlight = new THREE.AmbientLight(0xffffff, 1);

scene.add(pointlight, ambientlight);
scene.add(box);

function animate(tick){
  requestAnimationFrame(animate);

  box.position.x = Math.sin(0.001 * (tick));
  box.position.y = Math.sin(0.00001 * (tick*300));

  box.rotation.x += 0.05;
  box.rotation.y += 0.005;
  box.rotation.z += 0.05;

  renderer.render(scene, camera);
}

animate(tick);