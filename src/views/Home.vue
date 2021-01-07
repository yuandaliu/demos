<template>
  <div class="home">
    <div id="container"></div>
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

      // 导入3d模型
      const loader = new GLTFLoader();
      loader.load('/model/camera.glb', (gltf) => {
        gltf.scene.scale.set(2,2,2)
        this.scene.add(gltf.scene)
      }),
      
      (error) => {
        console.error(error)
      }

      // 添加监听方法
      container.addEventListener('click', (event) => {
        // 保持原事件
        event.preventDefault();
        let selectedObject = null;
        // 获取射线得到的线路上的全部物体
        // layerX  layerY 元素设置了定位后是点击相对于元素的定位
        let intersects = this.getIntersects(event.layerX, event.layerY);
        // 分类
        if(intersects.length > 0) {
          // 得到全部物体  只选择线上的第一个
          let res = intersects.filter((res) => {
            // 过滤掉东西
            return res && res.object;
          })[0];
          if(res && res.object && res.object.name) {
            // 给物体染色
            if(res.object.name === "obj02") {
              selectedObject = res.object;
              selectedObject.material.color.set("#f00")
            } else if(res.object.name === "obj60") {
              selectedObject = res.object;
              selectedObject.material.color.set("#856d72")
            } else {
              selectedObject = res.object;
              selectedObject.material.color.set("#e9d7df")
            }
          }
        }
      }, false)
    },
    
    // 动画函数
    animate: function() {
      requestAnimationFrame(this.animate);
      this.renderer.render(this.scene, this.camera);
    },

    // 获取交叉对象
    getIntersects(x,y) {
      // 计算位置点
      const mouse = new THREE.Vector2()
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1
      // 计算raycaster
      const raycaster = new THREE.Raycaster()
      raycaster.setFromCamera(mouse, this.camera)
      // 获取raycaster直线和所有模型相交的数组集合
      const intersects = raycaster.intersectObjects(this.scene.children, true)
      return intersects
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
