<template>
  <div class="createModel">
    <div class="container" ref="container"></div>
  </div>
</template>

<script>
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

export default {
  components: {},

  data () {
    return {
      scene: null,
      camera: null,
      renderer: null,
      controls: null,
      textureLoader: null
    }
  },

  created () {},

  mounted () {
    this.init()
    this.animate()
  },

  methods: {
    init () {
      // 场景
      this.scene = new THREE.Scene()

      // 背景
      this.scene.background = new THREE.Color(0xaaaaaa)

      // 透视摄像机
      this.camera = new THREE.PerspectiveCamera(90, this.$refs.container.clientWidth / this.$refs.container.clientHeight, 0.1, 1000)
      this.camera.position.set(300, 300, 0)
      this.camera.lookAt(0, 0, 0)

      // 渲染函数
      this.renderer = new THREE.WebGLRenderer({
        antialias: true // 是否执行抗锯齿
      })
      this.renderer.setSize(this.$refs.container.clientWidth, this.$refs.container.clientHeight)
      this.$refs.container.appendChild(this.renderer.domElement)

      // 相机控制器
      this.controls = new OrbitControls(this.camera, this.renderer.domElement)

      // // 环境光  AmbientLight第二个参数为光照强度 范围 0-1 不写默认为1
      const light = new THREE.AmbientLight(0xffffff, 0.5)
      this.scene.add(light)

      // 创建纹理加载器
      this.textureLoader = new THREE.TextureLoader()

      // 加载地板
      this.createFloor()

      // 加载墙体
      this.createWall()
    },

    // 地板创建函数
    createFloor () {
      // 创建地板纹理
      const floorTexture = this.textureLoader.load('./img/floor.jpg')
      // 地板材质
      const floorMaterial = new THREE.MeshStandardMaterial({
        map: floorTexture,
        metalness: 0.2,
        roughness: 0.07,
        side: THREE.DoubleSide
      })
      // 地板几何体
      const floorGeometry = new THREE.BoxBufferGeometry(29.9, 2, 29.9)
      // 创建地板
      for (let i = 0; i < 12; i++) {
        for (let j = 0; j < 16; j++) {
          const floorMesh = new THREE.Mesh(floorGeometry, floorMaterial)
          floorMesh.position.set(-150 + i * 30, 0, -240 + j * 30)
          this.scene.add(floorMesh)
        }
      }
    },

    // 墙体创建函数
    createWall () {
      // 外墙
      const wallOutMaterial = new THREE.MeshLambertMaterial({ color: 0x00FFFF })
      const wallOutGeometry = new THREE.BoxGeometry(280, 120, 400)
      const wallOutMesh = new THREE.Mesh(wallOutGeometry, wallOutMaterial)
      wallOutMesh.position.set(0, 60, -14.95)
      this.scene.add(wallOutMesh)

      // 内墙
      const wallInnerMaterial = new THREE.MeshLambertMaterial({ color: 0x2D1BFF })
      const wallInnerGeometry = new THREE.BoxGeometry(270, 120, 390)
      const wallInnerMesh = new THREE.Mesh(wallInnerGeometry, wallInnerMaterial)
      wallInnerMesh.position.set(0, 60, -14.95)
      this.scene.add(wallInnerMesh)

      // 门
      const doorMaterial = new THREE.MeshLambertMaterial({ color: 0x2D1BFF })
      const doorGeometry = new THREE.BoxGeometry(18, 100, 70)
      const doorMesh = new THREE.Mesh(doorGeometry, doorMaterial)
      doorMesh.position.set(140.5, 50, 0)
      this.scene.add(doorMesh)
    },

    animate () {
      // 实时渲染动画，页面切换离开会停下，性能比较好
      requestAnimationFrame(this.animate)
      this.controls.update()
      this.renderer.render(this.scene, this.camera)
    }
  }
}
</script>

<style scoped lang="less">
.createModel {
  .container {
    height: 800px;
  }
}
</style>
