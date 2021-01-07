<template>
  <div class="home">
    <div id="container">demo01</div>
  </div>
</template>

<script>
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import HelloWorld from '@/components/HelloWorld.vue';
import { error, log } from 'three';

export default {
  name: 'Home',
  components: {
    HelloWorld
  },
  data() {
    return {
      camera: null,
      scene: null,
      renderer: null,
      // 导入3D模型的分层数组
      objectLista: []
    };
  },
   methods: {
    init: function() {
      let container = document.getElementById("container");

      // 场景
      this.scene = new THREE.Scene();

      // 透视摄像机
      this.camera = new THREE.PerspectiveCamera(
        70,
        container.clientWidth / container.clientHeight,
        0.01,
        10
      );
      this.camera.position.z = 0.6;

      // 渲染函数
      this.renderer = new THREE.WebGLRenderer({ antialias: true });
      this.renderer.setSize(container.clientWidth, container.clientHeight);
      container.appendChild(this.renderer.domElement);

      // 地板
      this.camera.position.set(0.1, 0.2, 0.8)
      const ground = new THREE.Mesh(
        new THREE.PlaneBufferGeometry(9,9,1,1),
        new THREE.MeshPhongMaterial({color: 0xaaaaaa, shininess: 150})
      );
      ground.rotation.x = - Math.PI / 2  // rotates X/Y to X/Z
      ground.receiveShadow = true;
      this.scene.add(ground)

      // 摄像机控制器
      const controls = new OrbitControls(this.camera, this.renderer.domElement);
  

      // 光线投射
      const light = new THREE.AmbientLight(0xfffffff)
      this.scene.add(light)

      // 平行光
      const light1 = new THREE.DirectionalLight(0x66462a, 0.8);
      light1.position.set(10,10,5);
      this.scene.add(light1);

      // 定义场景背景颜色
      this.scene.background = new THREE.Color(0xeeeeee)
    },
    
    // 动画函数
    animate: function() {
      requestAnimationFrame(this.animate);
      this.renderer.render(this.scene, this.camera);
    },
  },
  mounted() {
    this.init();
    this.animate();
  }
};
</script>
<style lang="less" scoped>
#container {
  height: 700px;
}
</style>
