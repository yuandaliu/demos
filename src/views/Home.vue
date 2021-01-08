<template>
  <div class="home">
    <div id="container"></div>
  </div>
</template>

<script>
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { error, Geometry, log } from 'three';
import Stats from 'three/examples/jsm/libs/stats.module';

export default {
  name: 'Home',
  components: {},
  data() {
    return {
      camera: null,
      camera2: null,
      camera2Helper: null,
      scene: null,
      renderer: null,
      mesh: null,
      activeCamera: null,
      activeHelper: null,
      cameraOrtho: null,
      cameraOrthoHelper: null,
      stats: null,
      cameraRig: null
    };
  },
   methods: {
    init: function() {
      let container = document.getElementById("container");

      // 场景
      this.scene = new THREE.Scene();

      // 透视摄像机一
      this.camera = new THREE.PerspectiveCamera(
        50,
        0.5*(container.clientWidth / container.clientHeight),
        0.01,
        10000
      );
      this.camera.position.z = 2500;

      // 透视相机二
      this.camera2 = new THREE.PerspectiveCamera(
        50,
        0.5*(container.clientWidth / container.clientHeight),
        150,
        1000
      );
      this.camera2Helper = new THREE.CameraHelper(this.camera2);
      this.scene.add(this.camera2Helper);


      // 渲染函数
      this.renderer = new THREE.WebGLRenderer({ antialias: true });
      this.renderer.setPixelRatio(window.devicePixelRatio);
      this.renderer.setSize(container.clientWidth, container.clientHeight);
      container.appendChild(this.renderer.domElement);
      this.renderer.autoClear = false;

      this.cameraOrtho = new THREE.OrthographicCamera(300 * (container.clientWidth / container.clientHeight) / -2, 300 * (container.clientWidth / container.clientHeight) / 2, 300, -300, 150, 1000);
      this.cameraOrthoHelper = new THREE.CameraHelper(this.cameraOrtho);
      this.scene.add(this.cameraOrthoHelper);

      this.activeCamera = this.camera2
      this.activeHelper = this.camera2Helper

      this.cameraOrtho.rotation.y = Math.PI;
      this.camera.rotation.y = Math.PI;

      this.cameraRig = new THREE.Group();
      this.cameraRig.add(this.camera);
      this.cameraRig.add(this.cameraOrtho);
      this.scene.add(this.cameraRig);

      this.mesh = new THREE.Mesh(
        new THREE.SphereBufferGeometry(100,16,8),
        new THREE.MeshBasicMaterial({color: 0xfffff, wireframe: true})
      );
      this.scene.add(this.mesh);

      const mesh2 = new THREE.Mesh(
        new THREE.SphereBufferGeometry(50,16,8),
        new THREE.MeshBasicMaterial({color: 0x00ff00, wireframe: true})
      );
      mesh2.position.y = 150;
      this.scene.add(mesh2);

      const mesh3 = new THREE.Mesh(
        new THREE.SphereBufferGeometry(5,16,8),
        new THREE.MeshBasicMaterial({color: 0x0000ff, wireframe: true})
      );
      mesh3.position.y = 150;
      this.scene.add(mesh3);

      const geometry = new THREE.BufferGeometry();
      const vertices = [];

      for (let i = 0; i < 1000; i++) {
        vertices.push(THREE.MathUtils.randFloatSpread(2000));  // x
        vertices.push(THREE.MathUtils.randFloatSpread(2000));  // y
        vertices.push(THREE.MathUtils.randFloatSpread(2000));  // z
      }

      geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));

      const particles = new THREE.Points(geometry, new THREE.PointsMaterial({color: 0x888888}));
      this.scene.add(particles);

      this.stats = new Stats();
      container.appendChild(this.stats.dom)

      // 监控函数
      document.addEventListener('keydown', onkeydown, false);
    },

    // 键盘按下函数
    onkeydown(event) {
      switch(event.keyCode) {
        case 79: 
          this.activeCamera = this.cameraOrtho;
          this.activeHelper = this.cameraOrthoHelper;
          break;

        case 80:
          this.activeCamera = this.camera2;
          this.activeHelper = this.camera2Helper;
          break;
      }
    },
    
    // 动画函数
    animate: function() {
      requestAnimationFrame(this.animate);
      this.renderer.render(this.scene, this.camera);

      const r = Date.now() * 0.0005;

			this.mesh.position.x = 700 * Math.cos( r );
			this.mesh.position.z = 700 * Math.sin( r );
			this.mesh.position.y = 700 * Math.sin( r );

			this.mesh.children[ 0 ].position.x = 70 * Math.cos( 2 * r );
			this.mesh.children[ 0 ].position.z = 70 * Math.sin( r );

			if ( activeCamera === cameraPerspective ) {

				this.cameraPerspective.fov = 35 + 30 * Math.sin( 0.5 * r );
				this.cameraPerspective.far = this.mesh.position.length();
				this.cameraPerspective.updateProjectionMatrix();

				this.cameraPerspectiveHelper.update();
				this.cameraPerspectiveHelper.visible = true;

				cameraOrthoHelper.visible = false;

			} else {

				this.cameraOrtho.far = this.mesh.position.length();
				this.cameraOrtho.updateProjectionMatrix();

				this.cameraOrthoHelper.update();
				this.cameraOrthoHelper.visible = true;

				this.cameraPerspectiveHelper.visible = false;

			}

			this.cameraRig.lookAt( this.mesh.position );

			this.renderer.clear();

			this.activeHelper.visible = false;

			this.renderer.setViewport( 0, 0, window.innerWidth / 2, window.innerHeight );
			this.renderer.render( this.scene, this.activeCamera );

			this.activeHelper.visible = true;

			this.renderer.setViewport( window.innerWidth / 2, 0, window.innerWidth / 2, window.innerHeight );
      this.renderer.render( this.scene, this.camera );
      
      this.stats.update();
    },
  },
  mounted() {
    this.init();
    this.animate();
  }
};
</script>
<style lang="less" scoped>
.home {
  #container {
    position: absolute;
    width: 100%;
    height: 100%;
  }
}
</style>
