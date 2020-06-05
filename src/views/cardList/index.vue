<template>
  <div id="cardList">
    <custom-create-header :header="createHeader.header" :btns="createHeader.btns"></custom-create-header>
    <div class="card-list">
      <status-card
        v-for="item in list"
        :key="item.id"
        :entity="item"
        :columnNumber="4"
        :showStatus="true"
        statusKey="status"
      >
        <template v-slot:name>
          <a @click="titleClick(item)">{{ item.nameText || item.name }}</a>
        </template>
        <template v-slot:identifier>{{ `ID: ${item.id}` }}</template>
        <template v-slot:identifierCopy>
          <el-tooltip effect="dark" :content="tip" placement="top">
            <i
              class="el-icon-document-copy id-copy"
              v-clipboard:copy="item.id"
              v-clipboard:success="onCopy"
              v-clipboard:error="onError"
            ></i>
          </el-tooltip>
        </template>
        <template v-slot:btns>
          <a
            v-for="btn in dropBtns"
            :key="btn.text"
            @click="btn.click(item)"
            class="levon-btn"
            :class="{ 'btn-delete-forbid': btn.disabled }"
            >{{ btn.text }}</a
          >
        </template>
        <template v-slot:form>
          <el-row class="status-card-row" :gutter="10">
            <el-col class="status-card-row-label" :span="8">{{ $t('common.createdAt') + ':' }}</el-col>
            <el-col class="status-card-row-value" :span="16">{{ item.createdAt }}</el-col>
          </el-row>
          <el-row class="status-card-row" :gutter="10">
            <el-col class="status-card-row-label" :span="8">{{ $t('common.updatedAt') + ':' }}</el-col>
            <el-col class="status-card-row-value" :span="16">{{ item.updatedAt }}</el-col>
          </el-row>
          <el-row class="status-card-row" :gutter="10">
            <el-col class="status-card-row-label" :span="8">{{ $t('common.description') + ':' }}</el-col>
            <el-col class="status-card-row-value" :span="16">{{ item.description }}</el-col>
          </el-row>
        </template>
      </status-card>
    </div>
  </div>
</template>
<script>
import StatusCard from '@/components/status-card/index.vue';
import CustomCreateHeader from '@/components/customCreateHeader/index.vue';
export default {
  name: 'cardList',
  components: {
    StatusCard,
    CustomCreateHeader,
  },
  data() {
    return {
      createHeader: {
        header: {
          title: this.$t('cardList.title'),
          helpTip: {
            content: this.$t('cardList.helpTip'),
            position: 'top-start',
          },
        },
        btns: [
          {
            id: 'createCard',
            text: this.$t('cardList.createCard'),
            icon: 'el-icon-plus',
            click: (e) => {
              if (e) e.preventDefault();
              console.log('create card list.');
            },
          },
        ],
      },
      tip: 'Copy',
      list: [
        {
          id: '1234567890',
          name: '测试11111111111111',
          createdAt: '2020/4/13 09:23:45',
          updatedAt: '2020/4/13 13:56:56',
          description: '测试测试测试测试测试',
          status: 'OK',
        },
        {
          id: '1234567891',
          name: '测试22222222222222',
          createdAt: '2020/4/13 09:23:45',
          updatedAt: '2020/4/13 13:56:56',
          description: '测试测试测试测试测试',
          status: 'WARN',
        },
        {
          id: '1234567892',
          name: '测试33333333333333',
          createdAt: '2020/4/13 09:23:45',
          updatedAt: '2020/4/13 13:56:56',
          description: '测试测试测试测试测试',
          status: 'OK',
        },
        {
          id: '1234567893',
          name: '测试44444444444444',
          createdAt: '2020/4/13 09:23:45',
          updatedAt: '2020/4/13 13:56:56',
          description: '测试测试测试测试测试',
          status: 'ERROR',
        },
        {
          id: '1234567894',
          name: '测试55555555555555',
          createdAt: '2020/4/13 09:23:45',
          updatedAt: '2020/4/13 13:56:56',
          description: '测试测试测试测试测试',
          status: 'WARN',
        },
      ],
      dropBtns: [
        {
          text: '编辑',
          icon: '',
          click: (e) => {
            console.log(e);
          },
        },
        {
          text: '删除',
          icon: '',
          click: (e) => {
            console.log(e);
          },
        },
      ],
    };
  },
  methods: {
    titleClick(entity) {
      console.log(entity);
    },
    onCopy() {
      const _this = this;
      this.tip = 'Copied';
      setTimeout(() => {
        this.tip = 'Copy';
      }, 2000);
    },
    onError() {
      console.log('Failed to copy.');
    },
  },
};
</script>
<style lang="less" scoped>
#cardList {
  height: 100%;
  .id-copy {
    cursor: pointer;
  }
  .status-card-row {
    height: 28px;
    line-height: 28px;
    font-size: 12px;
    .status-card-row-label {
      color: #999;
      text-align: right;
      padding: 0 5px;
      display: inline-block;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .status-card-row-value {
      padding: 0 5px;
      display: inline-block;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
}
</style>
