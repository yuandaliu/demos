<template>
  <div class="ball">
    <div class="container" ref="container"></div>
  </div>
</template>

<script>
import * as THREE from 'three'
import { AsciiEffect } from 'three/examples/jsm/effects/AsciiEffect'
import { TrackballControls } from 'three/examples/jsm/controls/TrackballControls'

export default {
  data() {
    return {
      camera: null, // 相机
      scene: null,  // 场景
      renderer: null,  // 渲染
      controls: null,  //  控制器
      effect: null, 
      sphere: null,  //  球
      plane: null,  //  面
      start: Date.now() 
    };
  },

  mounted() {
    this.init()
    this.animate()
  },

  methods: {
    init () {
      // 创建相机
      this.camera = new THREE.PerspectiveCamera(70, this.$refs.container.clientWidth / this.$refs.container.clientHeight, 0.1, 1000)
      this.camera.position.y = 150
      this.camera.position.z = 500

      // 创建场景
      this.scene = new THREE.Scene()
      this.scene.background = new THREE.Color(0, 0, 0)

      // 点光源1
      const pointLight1 = new THREE.PointLight(0xffffff)
      pointLight1.position.set(500, 500, 500)
      this.scene.add(pointLight1)

      // 点光源2 
      const pointLight2 = new THREE.PointLight(0xffffff, 0.25)
      pointLight2.position.set(-500, -500, -500)
      this.scene.add(pointLight2)

      // 创建球形几何体
      this.sphere = new THREE.Mesh(new THREE.SphereGeometry(200, 20, 10), new THREE.MeshPhongMaterial({flatShading: true}))
      this.scene.add(this.sphere)

      // 创建面
      this.plane = new THREE.Mesh(new THREE.PlaneGeometry(400, 400), new THREE.MeshBasicMaterial({color: 0xe0e0e0}))
      this.plane.position.y = -200
      this.plane.rotation.x = - Math.PI / 2
      this.scene.add(this.plane)

      // 渲染
      this.renderer = new THREE.WebGLRenderer()
      this.renderer.setSize(this.$refs.container.clientWidth, this.$refs.container.clientHeight)

      //  effect
      this.effect = new AsciiEffect(this.renderer, ' .:-+*=%@#', {invert: true})
      this.effect.setSize(this.$refs.container.clientWidth, this.$refs.container.clientHeight)
      this.effect.domElement.style.color = 'white'
      this.effect.domElement.style.backgroundColor = 'black'

      this.$refs.container.appendChild(this.effect.domElement)

      // 创建控制器
      this.controls = new TrackballControls(this.camera, this.effect.domElement)

      // 实时监听屏幕尺寸变化
      window.addEventListener('resize', this.onWindowResize)
    },

    // 屏幕尺寸变化调用函数
    onWindowResize () {
      this.camera.aspect = window.innerWidth / window.innerHeight
      this.camera.updateProjectionMatrix()

      this.renderer.setSize(window.innerWidth, window.innerHeight)
      this.effect.setSize(window.innerWidth, window.innerHeight)
    },

    // 动画
    animate () {
      requestAnimationFrame(this.animate)

      const timer = Date.now() - this.start

      this.sphere.position.y = Math.abs(Math.sin(timer * 0.002)) * 150
      this.sphere.rotation.x = timer * 0.0003
      this.sphere.rotation.z = timer * 0.0002

      this.controls.update()
      this.effect.render(this.scene, this.camera)
    }
  }
};
</script>

<style scoped lang="less">
.ball {
  .container {
    height: 700px;
  }
}
</style>
