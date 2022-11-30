import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

class SceneObjects {
  dom:HTMLElement;
  scene:THREE.Scene;
  renderer:THREE.WebGLRenderer;
  camera:THREE.PerspectiveCamera;
  ambient:THREE.AmbientLight;
  obtcontrols:OrbitControls;

  constructor(dom:HTMLElement,size:any) {

    this.dom = dom;

    this.scene = new THREE.Scene();
    
    this.ambient = new THREE.AmbientLight(0xffffff);
    this.scene.add(this.ambient);
    
    this.camera = new THREE.PerspectiveCamera(
        45,
        size.width / size.height,
        1,
        1000
    );
    
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setPixelRatio( window.devicePixelRatio );
    this.renderer.setSize(size.width, size.height);
    this.renderer.setClearColor(0xffffff, 1);
    this.dom.appendChild(this.renderer.domElement); 
    
    this.obtcontrols = new OrbitControls(this.camera, this.renderer.domElement)
    this.obtcontrols.minDistance = 1;
    this.obtcontrols.maxDistance = 100;
    this.obtcontrols.enablePan = false;
   
    window.addEventListener('resize', this.handleResize, false)
  }


  animate() {
    requestAnimationFrame(this.animate.bind(this));
    this.render()
  }

  render(){
    this.renderer.render(this.scene, this.camera);
  }

  handleResize = () => {
    const width = window.innerWidth
    const height = window.innerHeight
    this.camera.aspect = width / height
    this.camera.updateProjectionMatrix()
    this.renderer.setSize(width, height)
  }

  loadRoomBG(url){
    let sphereGeometry = new THREE.SphereGeometry(16, 50, 50);
    sphereGeometry.scale(16, 16, -16);
    const textureLoader = new THREE.TextureLoader(); 
    textureLoader.load(url, (texture:any)=> { 
        const material = new THREE.MeshBasicMaterial({ 
            map: texture,
        }); 
        const mesh = new THREE.Mesh(sphereGeometry, material); 
        this.scene.add(mesh); 
        this.animate(); 
    }) 
  }  
}

export {
    SceneObjects
} 