<template>
  <div class="practice">
    <div id="container" ref="container"></div>
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
      cube: null
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
      this.camera.position.set(5, 5, 0)
      this.camera.lookAt(0, 0, 0)

      // 渲染函数
      this.renderer = new THREE.WebGLRenderer({
        antialias: true // 是否执行抗锯齿
      })
      // 开启渲染器渲染阴影的效果
      this.renderer.shadowMap.enabled = true
      this.renderer.shadowMap.type = THREE.PFCSoftShadowMap // 阴影类型
      this.renderer.setSize(this.$refs.container.clientWidth, this.$refs.container.clientHeight)
      this.$refs.container.appendChild(this.renderer.domElement)

      // 相机控制器
      const controls = new OrbitControls(this.camera, this.renderer.domElement)

      // // 立方体1
      // const geometry = new THREE.BoxGeometry()
      // const material = new THREE.MeshBasicMaterial({color:'#00ff00'});       // 材质  MeshBasicMaterial基础网格材质不受环境光颜色影响
      // this.cube = new THREE.Mesh(geometry, material)        // 构成物体的类 基类为Object3D
      // this.scene.add(this.cube)

      // 创建环境贴图
      const texture = new THREE.TextureLoader().load('images/tree.jpg')

      // 立方体2
      const geometry = new THREE.SphereGeometry(1, 32, 32)
      // 材质
      const material = new THREE.MeshStandardMaterial({
        color: '#ffffff',
        map: texture
      })
      this.cube = new THREE.Mesh(geometry, material) // 生成网格
      this.cube.castShadow = true // 对象是否渲染到阴影贴图中，默认值为false
      this.cube.position.y = 3 // 设置物体位置
      this.scene.add(this.cube)

      // // 环境光  AmbientLight第二个参数为光照强度 范围 0-1 不写默认为1
      const light = new THREE.AmbientLight(0xffffff, 0.5)
      this.scene.add(light)

      // 平行光   DirectionalLight第二个参数为光照强度 范围 0-1 不写默认为1
      const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5)
      directionalLight.position.set(10, 10, 10) // 平行光相对物体投射的源头位置
      directionalLight.castShadow = true // 开启平行光产生阴影的效果 默认是false
      directionalLight.target = this.cube
      this.scene.add(directionalLight)

      // 创建一个接受阴影的平面
      const planeGeometry = new THREE.PlaneBufferGeometry(20, 20, 32, 32)
      const planeMaterial = new THREE.MeshStandardMaterial({
        color: '#ffffff'
      })
      const plane = new THREE.Mesh(planeGeometry, planeMaterial)
      plane.rotation.x = -Math.PI / 2
      plane.receiveShadow = true // 开启平面接受投射阴影的效果
      this.scene.add(plane)
    },

    animate () {
      // 实时渲染动画，页面切换离开会停下，性能比较好
      requestAnimationFrame(this.animate)
      // // 为模型添加动画
      // this.cube.rotation.x += 0.01
      // this.cube.rotation.y += 0.01
      this.renderer.render(this.scene, this.camera)
    }
  }
}
</script>

<style scoped lang='less'>
.practice{
  #container{
    height: 700px;
  }
}
</style>
