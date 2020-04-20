<template>
  <div id="three">
    <custom-create-header :header="createHeader.header" :btns="createHeader.btns"></custom-create-header>
    <div class="three-box clearfix">
      <div class="name-box pull-left">
        <scroll
          ref="wrapper"
          :data="arrList"
          :listenScroll="true"
          :pullup="true"
          :pulldown="true"
          :beforeScroll="true"
          @setScroll="setScroll"
          @scroll="listenedScroll"
          @beforeScroll="beforeScroll"
          @scrollToEnd="scrollToEnd"
          @pulldown="pulldown"
        >
          <ul>
            <li v-for="(arr, index) in arrList" :key="index">
              <text-button :text="arr"></text-button>
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
      scroll: null,
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
      arrList: ['Dragon 2.5_fbx.fbx', 'Dragon_Baked_Actions_fbx_7.4_binary.fbx', 'teapot-claraio.json'],
    };
  },
  mounted() {},
  methods: {
    setScroll(scroll) {
      this.scroll = scroll;
    },
    scrollToEnd() {
      console.log('上滑到底了');
    },
    pulldown() {
      console.log('下拉到底了');
    },
    beforeScroll() {
      console.log('滚动之前');
    },
    listenedScroll(pos) {
      // console.log(pos);
    },
  },
};
</script>
<style lang="less" scoped>
#three {
  position: relative;
  height: 100%;
  .three-box {
    height: calc(100% - 93px);
    background-color: #fff;
    box-sizing: border-box;
    position: relative;
    padding: 10px;
  }
  .name-box {
    width: 300px;
    height: calc(100% - 93px) !important;
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