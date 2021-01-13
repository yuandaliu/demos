<template>
  <div class="threeLight"></div>
</template>

<script>
import * as THREE from 'three'
import { TWEEN } from "three/examples/jsm/libs/tween.module.min.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

export default {
  components: {},

  data() {
    return {
      renderer: null,
      camera: null,
      scene: null,
      controls: null,
      matFloor: null,
      matBox: null,
      geoFloor: null,
      geoBox: null,
      mshFloor: null,
      mshBox: null,
      ambient: null,
      spotLight1: null,
      spotLight2: null,
      spotLight3: null,
      spotLight1: null,
      lightHelper1: null,
      lightHelper2: null,
      lightHelper3: null
    };
  },

  mounted() {
    this.init();
    this.render();
    this.animate();
  },

  methods: {
    init() {
      this.renderer = new THREE.WebGLRenderer();
      this.renderer.setPixelRatio(window.devicePixelRatio);

      this.camera = new THREE.PerspectiveCamera(35, window.innerWidth/window.innerHeight, 1, 2000);

      this.controls = new OrbitControls(this.camera, this.renderer.domElement);

      this.scene = new THREE.Scene();

      this.matFloor = new THREE.MeshPhongMaterial();
      this.matBox = new THREE.MeshPhongMaterial({color: 0xaaaaaa});

      this.geoFloor = new THREE.PlaneBufferGeometry(2000, 2000);
      this.geoBox = new THREE.BoxBufferGeometry(3, 1, 2);

      this.mshFloor = new THREE.Mesh(this.geoFloor, this.matFloor);
      this.mshFloor.rotation.x = - Math.PI * 0.5;
      this.mshBox = new THREE.Mesh(this.geoBox, this.matBox)

      this.ambient = new THREE.AmbientLight(0x111111);

      this.spotLight1 = this.createSpotlight(0xFF7F00);
      this.spotLight2 = this.createSpotlight(0x00FF7F);
      this.spotLight3 = this.createSpotlight(0x7F00FF);

      this.renderer.shadowMap.enabled = true;
      this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
      this.renderer.outputEncoding = THREE.sRGBEncoding;

      this.camera.position.set(46, 22, -21);

      this.spotLight1.position.set(15, 40, 45);
      this.spotLight2.position.set(0, 40, 35);
      this.spotLight3.position.set(-15, 40, 45);

      this.lightHelper1 = new THREE.SpotLightHelper(this.spotLight1);
      this.lightHelper2 = new THREE.SpotLightHelper(this.spotLight2);
      this.lightHelper3 = new THREE.SpotLightHelper(this.spotLight3);

      this.matFloor.color.set(0x888888);

      this.mshFloor.receiveShadow = true;
      this.mshFloor.position.set(0, -0.5, 0);

      this.mshBox.catShadow = true;
      this.mshBox.receiveShadow = true;
      this.mshBox.position.set(0, 5, 0);

      this.scene.add(this.mshFloor);
      this.scene.add(this.mshBox);
      this.scene.add(this.ambient);
      this.scene.add(this.spotLight1, this.spotLight2, this.spotLight3);
      this.scene.add(this.lightHelper1, this.lightHelper2, this.lightHelper3);

      document.body.appendChild(this.renderer.domElement);
      this.onResize();
      window.addEventListener('resize', this.onResize, false);

      this.controls.target.set(0, 7, 0);
      this.controls.maxPolarAngle = Math.PI / 2;
      this.controls.update();
    },

    createSpotlight(color) {
      const newObj = new THREE.SpotLight(color, 2);

      newObj.castShadow = true;
      newObj.angle = 0.3;
      newObj.penumbra = 0.2;
      newObj.decay = 2;
      newObj.distance = 50;

      return newObj;
    },

    onResize() {
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(window.innerWidth, window.innerHeight);
    },

    tween(light) {
      new TWEEN.Tween(light).to({
        angle: (Math.random() * 0.7) + 0.1,
        penumbra: Math.random() + 1
      }, Math.random() * 3000 + 2000).easing(TWEEN.Easing.Quadratic.Out).start();

      new TWEEN.Tween(light.position).to({
        x: (Math.random() * 30) - 15,
        y: (Math.random() * 10) + 15,
        z: (Math.random() * 30) - 15
      }, Math.random() * 3000 + 2000).easing(TWEEN.Easing.Quadratic.Out).start();
    },

    animate() {
      this.tween(this.spotLight1)
      this.tween(this.spotLight2)
      this.tween(this.spotLight3)

      setTimeout(this.animate, 5000);
    },

    render() {
      TWEEN.update();

      if(this.lightHelper1) this.lightHelper1.update();
      if(this.lightHelper2) this.lightHelper2.update();
      if(this.lightHelper3) this.lightHelper3.update();

      this.renderer.render(this.scene, this.camera);

      requestAnimationFrame(this.render);
    }
  }
};
</script>

<style scoped lang="less">
.threeLight{}
</style>
