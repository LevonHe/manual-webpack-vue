<template>
  <div id="model">
    <div id="museum"></div>
    <div class="progress"></div>
  </div>
</template>
<script>
import * as THREE from 'three';
import { mapState, mapMutations } from 'vuex';
import * as _ from 'lodash';
import { TrackballControls } from 'three/examples/jsm/controls/TrackballControls';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';

export default {
  name: 'model',
  data() {
    return {
      container: null,
      renderer: null,
      camera: null,
      scene: null,
      trackballControls: null,
      progressBox: null,
      mixers: [], // fbx
      clock: null,
    };
  },
  computed: {
    ...mapState('cms/three', ['modelName', 'objReady']),
  },
  watch: {
    modelName: {
      handler(val) {
        this.loadModel(val);
      },
      immediate: true,
    },
  },
  mounted() {
    this.init();
    // this.loadFbx('/statics/Dragon_Baked_Actions_fbx_7.4_binary.fbx');
    // this.loadFbx('/statics/Dragon 2.5_fbx.fbx');
    // this.loadJson('/statics/teapot-claraio.json');
    this.animate();
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.onWindowResize, false);
  },
  methods: {
    ...mapMutations({
      OBJ_READY: 'cms/three/OBJ_READY',
    }),
    onWindowResize: _.debounce(
      function() {
        this.camera.aspect = this.container.clientWidth / this.container.clientHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
      },
      300,
      {
        leading: true,
        trailing: false,
      }
    ),
    init() {
      // container
      this.container = document.getElementById('museum');
      this.progressBox = document.querySelector('.progress');

      this.clock = new THREE.Clock();

      // scene
      this.scene = new THREE.Scene();

      // renderer
      this.renderer = new THREE.WebGLRenderer({
        antialias: true, // 反锯齿
        precision: 'highp', // 着色精度
        alpha: true, // 可设置透明背景
        premultipliedAlpha: false,
        stencil: false,
        preserveDrawingBuffer: true, // 保存绘图缓冲
      });
      this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
      this.renderer.setClearColor(0x000000, 0.7);
      this.renderer.setPixelRatio(window.devicePixelRatio); // 兼容高清屏幕
      this.container.appendChild(this.renderer.domElement);

      // camera
      this.camera = new THREE.PerspectiveCamera(45, this.container.clientWidth / this.container.clientHeight, 1, 10000);
      this.camera.position.set(0, 0, 150);
      this.camera.lookAt(this.scene.position);

      // controls
      this.trackballControls = new TrackballControls(this.camera, this.renderer.domElement);
      this.trackballControls.noRotate = false;
      this.trackballControls.rotateSpeed = 1;
      this.trackballControls.noPan = false;
      this.trackballControls.panSpeed = 0.1;
      this.trackballControls.noZoom = false;
      this.trackballControls.zoomSpeed = 0.5;
      this.trackballControls.minDistance = 50;
      this.trackballControls.maxDistance = 3000;

      // light
      const directionLight = new THREE.DirectionalLight(0xffffff, 1);
      directionLight.position.set(800, 400, 0);
      directionLight.position.multiplyScalar(0.6);
      const spotLight = new THREE.SpotLight(0xffffff);
      spotLight.position.set(-1200, 400, 800);
      spotLight.castShadow = true;
      this.scene.add(directionLight);
      this.scene.add(spotLight);

      window.addEventListener('resize', this.onWindowResize, false);
    },
    animate() {
      const delta = this.clock.getDelta();
      this.trackballControls && this.trackballControls.update(delta);
      if (this.mixers.length > 0) {
        this.mixers.forEach((mixer) => {
          mixer.update(delta);
        });
      }
      this.renderer && this.renderer.render(this.scene, this.camera);
      requestAnimationFrame(this.animate);
    },
    loadModel(name) {
      this.OBJ_READY(false);
      const oldModelList =
        this.scene && this.scene.children.filter((c) => c.type === 'Group' || c.type === 'Mesh' || c.type === 'Line');
      if (oldModelList && oldModelList.length > 0) {
        for (let i = 0; i < oldModelList.length; i += 1) {
          this.scene.remove(oldModelList[i]);
        }
      }
      this.progressBox && (this.progressBox.style.display = 'block') && (this.progressBox.innerHTML = '');
      // 重置轨迹控制球的设置
      this.trackballControls && this.trackballControls.reset();
      if (!name) {
        this.OBJ_READY(false);
        return;
      }
      if (name.includes('fbx')) {
        this.loadFbx(`/statics/${name}`);
      }
      if (name.includes('json')) {
        this.loadJson(`/statics/${name}`);
      }
    },
    loadObj(path) {
      new MTLLoader().setPath(path).load('machine.mtl', (materials) => {
        materials.preload();
        new OBJLoader()
          .setMaterials(materials)
          .setPath(path)
          .load(
            'machine.obj',
            (obj) => {
              this.scene.add(obj);
              this.OBJ_READY(true);
            },
            (xhr) => {
              const _this = this;
              if (xhr.lengthComputable) {
                const percentComplete = (xhr.loaded / xhr.total) * 100;
                const percent = Math.round(percentComplete);
                this.progressBox.innerHTML = percent + '%';
                if (percent >= 100) {
                  setTimeout(() => {
                    _this.progressBox.style.display = 'none';
                  }, 300);
                }
              } else {
                this.progressBox.innerHTML = 'loading...';
                setTimeout(() => {
                  _this.progressBox.style.display = 'none';
                }, 2300);
              }
            },
            (err) => {
              console.log('---obj load error---');
              console.log(err);
            }
          );
      });
    },
    loadFbx(path) {
      new FBXLoader().load(
        path,
        (object) => {
          if (object.animations && object.animations.length > 0) {
            object.mixer = new THREE.AnimationMixer(object);
            this.mixers.push(object.mixer);

            const action = object.mixer.clipAction(object.animations[0]);
            action.play();
          }

          object.traverse((child) => {
            if (child.isMesh) {
              child.castShadow = true;
              child.receiveShadow = true;
            }
          });

          if (path.includes('Dragon_Baked_Actions_fbx_7.4_binary.fbx')) {
            object.scale.set(0.01, 0.01, 0.01);
            object.position.set(0, -10, 0);
          }

          this.scene.add(object);
          this.OBJ_READY(true);
        },
        (xhr) => {
          const _this = this;
          if (xhr.lengthComputable) {
            const percentComplete = (xhr.loaded / xhr.total) * 100;
            const percent = Math.round(percentComplete);
            this.progressBox.innerHTML = percent + '%';
            if (percent >= 100) {
              setTimeout(() => {
                _this.progressBox.style.display = 'none';
              }, 300);
            }
          } else {
            this.progressBox.innerHTML = 'loading...';
            setTimeout(() => {
              _this.progressBox.style.display = 'none';
            }, 2300);
          }
        },
        (err) => {
          console.log('---obj load error---');
          console.log(err);
        }
      );
    },
    loadJson(path) {
      new THREE.ObjectLoader().load(
        path,
        (mesh) => {
          mesh.scale.set(15, 15, 15);
          this.scene.add(mesh);
          this.OBJ_READY(true);
        },
        (xhr) => {
          const _this = this;
          if (xhr.lengthComputable) {
            const percentComplete = (xhr.loaded / xhr.total) * 100;
            const percent = Math.round(percentComplete);
            this.progressBox.innerHTML = percent + '%';
            if (percent >= 100) {
              setTimeout(() => {
                _this.progressBox.style.display = 'none';
              }, 300);
            }
          } else {
            this.progressBox.innerHTML = 'loading...';
            setTimeout(() => {
              _this.progressBox.style.display = 'none';
            }, 500);
          }
        },
        (err) => {
          console.log('---obj load error---');
          console.log(err);
        }
      );
    },
  },
};
</script>
<style lang="less" scoped>
#model {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-color: #fff;
  #museum {
    width: 100%;
    height: 100%;
  }
  .progress {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.5);
    color: #fff;
    font-size: 30px;
    font-weight: bold;
    text-align: center;
    line-height: 600px;
  }
}
</style>