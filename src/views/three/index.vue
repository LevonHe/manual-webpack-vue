<template>
  <div id="three">
    <custom-create-header :header="createHeader.header" :btns="createHeader.btns"></custom-create-header>
    <div class="three-box clearfix">
      <div class="name-box pull-left">
        <scroll>
          <ul>
            <li>
              <text-button text="Dragon 2.5_fbx.fbx"></text-button>
            </li>
            <li>
              <text-button text="Dragon_Baked_Actions_fbx_7.4_binary.fbx"></text-button>
            </li>
            <li>
              <text-button text="teapot-claraio.json"></text-button>
            </li>
          </ul>
        </scroll>
      </div>
      <div class="model-box pull-left">
        <model-element></model-element>
      </div>
    </div>
  </div>
</template>
<script>
import CustomCreateHeader from '@/components/customCreateHeader/index.vue';
import Scroll from '@/components/betterScroll/scroll.vue';
import ModelElement from './model.vue';
import TextButton from './textButton.vue';

export default {
  name: 'three',
  components: {
    CustomCreateHeader,
    Scroll,
    ModelElement,
    TextButton,
  },
  data() {
    return {
      createHeader: {
        header: {
          title: this.$t('three.title'),
          helpTip: {
            content: this.$t('three.helpTip'),
            position: 'top-start',
          },
        },
        btns: [
          {
            id: 'createThree',
            text: this.$t('three.createThree'),
            icon: 'el-icon-plus',
            click: (e) => {
              if (e) e.preventDefault();
              console.log('create three case.');
            },
          },
        ],
      },
    };
  },
  mounted() {},
  methods: {},
};
</script>
<style lang="less" scoped>
#three {
  position: relative;
  height: 100%;
  .three-box {
    height: 100%;
    min-width: 1250px;
    min-height: 600px;
    background-color: #fff;
    box-sizing: border-box;
    position: relative;
    padding: 10px;
  }
  .name-box {
    width: 300px;
    height: 100% !important;
    border: 1px solid #e4e4e4;
    border-radius: 3px;
    padding: 10px;
    box-sizing: border-box;
    position: relative;
    ul {
      margin: 0;
      padding: 0;
      li {
        margin: 0;
        padding: 0;
        list-style: none;
      }
    }
  }
  .model-box {
    width: calc(100% - 310px);
    height: 100% !important;
    margin-left: 10px;
    box-sizing: border-box;
  }
}
</style>