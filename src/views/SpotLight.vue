<template>
  <div class="spotLight">
    <div id="container"></div>
  </div>
</template>

<script>
import * as THREE from "three";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

export default {
  data() {
    return {
      scene: null,
      camera: null,
      renderer: null,
      container:null,
      controls: null
    };
  },

  mounted() {
    this.init();
    this.animate();
  },

  methods: {
    init() {
      // 场景
      this.scene = new THREE.Scene()
      this.scene.background = new THREE.Color(0xB3CEFB);
      // 相机
      this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
      this.camera.position.set(10,10,10)
      this.camera.lookAt(0,0,0)
      // 渲染器
      this.renderer = new THREE.WebGLRenderer({
        alpha:true,
        antialias:true
      })
      this.renderer.enableShadow = true
      this.renderer.setPixelRatio(window.devicePixelRatio)
      this.renderer.setSize(window.innerWidth,window.innerHeight)

      // 立方体
      const geomertry = new THREE.BoxBufferGeometry(5,5,5)
      const material = new THREE.MeshStandardMaterial({color:'#ffffff'})
      const cube = new THREE.Mesh(geomertry,material)
      cube.position.set(0,2.5,0)
      console.log(cube)
      cube.receiveShadow=true
      cube.castShadow=true
      this.scene.add(cube)

      // floor
      const floorGeo = new THREE.PlaneBufferGeometry(1000,1000)
      const floorMat = new THREE.MeshPhongMaterial({color: 0xaaaaaa})
      const floor = new THREE.Mesh(floorGeo,floorMat)
      floor.receiveShadow = true
      floor.rotation.x = - Math.PI * 0.5
      this.scene.add(floor)

      // 环境光
      const ambient = new THREE.AmbientLight("#ffffff",0.5)
      this.scene.add(ambient)

      // spotLight
      const spotLight = new THREE.SpotLight("#ffffff")


      this.container = document.getElementById('container')
      this.container.appendChild(this.renderer.domElement)
      
      window.addEventListener('resize', this.onWindowResize, false);
    },
    animate() {
      requestAnimationFrame(this.animate)
      this.renderer.render(this.scene,this.camera)
    },
    onWindowResize () {
       // 相机纵横比重新设置
      camera.aspect = window.innerWidth / window.innerHeight;
      // 更新相机投影矩阵
      camera.updateProjectionMatrix();
      // 设置渲染器尺寸
      renderer.setSize(window.innerWidth, window.innerHeight);
    }
  }
};
</script>

<style scoped lang="less">
.spotLight {
  #container {
    height: 700px;
  }
}
</style>
