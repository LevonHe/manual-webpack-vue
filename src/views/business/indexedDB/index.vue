<template>
  <div class="textIndexedDB">
    <div class="clearfix mb-20">
      <div class="pull-left">
        <el-input
          placeholder="输入查询参数"
          class="width-360 vertical-middle"
          v-model="searchValue"
          size="medium"
          clearable
          @keyup.enter.native="fetchList"
          @clear="fetchList"
        >
          <el-select class="width-130" v-model="searchType" slot="prepend">
            <el-option label="Key" value="itemKey"></el-option>
          </el-select>
          <el-button slot="append" icon="el-icon-search" @click="fetchList"></el-button>
        </el-input>
      </div>
      <div class="pull-right">
        <el-button size="medium" type="primary" @click="handleAdd">添加</el-button>
      </div>
    </div>
    <el-table :data="list" style="width: 100%">
      <el-table-column prop="id" label="ID"></el-table-column>
      <el-table-column prop="itemKey" label="Key"></el-table-column>
      <el-table-column prop="itemValue" label="Value"></el-table-column>
      <el-table-column fixed="right" label="操作" width="370">
        <template slot-scope="scope">
          <a class="fe-a-btn" @click="handleEdit(scope.row)">编辑</a>
          <a class="fe-a-btn" @click="handleDelete(scope.row)">删除</a>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import * as _ from 'lodash';
import DeleteModal from './deleteModal.vue';
import AddModal from './addModal.vue';

export default {
  name: 'textIndexedDB',
  data() {
    return {
      list: [],
      searchType: 'itemKey',
      searchValue: '',
    };
  },
  methods: {
    ...mapActions('business/main', ['getList', 'getItemById']),
    fetchList() {
      const params = {
        itemKey: this.searchValue,
      };
      this.getList(params)
        .then((res) => {
          if (!res || !res.data || res.data.length === 0) {
            this.list = [];
            return;
          }
          this.list = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    handleAdd: _.debounce(
      function () {
        const winData = {
          oper: 'create',
        };
        this.$modal.show('添加项目', AddModal, winData, '640px', this.fetchList);
      },
      300,
      { leading: true, trailing: false }
    ),
    handleEdit: _.debounce(
      function (item) {
        this.getItemById(item.id)
          .then((res) => {
            if (!res || !res.id) {
              return;
            }
            const winData = {
              oper: 'edit',
              item: res,
            };
            this.$modal.show('编辑项目', AddModal, winData, '640px', this.fetchList);
          })
          .catch((err) => {
            console.log(err);
          });
      },
      300,
      { leading: true, trailing: false }
    ),
    handleDelete: _.debounce(
      function (item) {
        const winData = {
          list: [_.cloneDeep(item)],
          text: {
            title: '确定对以下项目进行删除操作吗？',
            tip: '删除后数据将无法恢复',
          },
        };
        this.$modal.show('删除项目', DeleteModal, winData, '550px', this.fetchList);
      },
      300,
      { leading: true, trailing: false }
    ),
  },
  mounted() {
    this.fetchList();
  },
};
</script>
