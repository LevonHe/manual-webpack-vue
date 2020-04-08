<template>
  <div id="table-edit">
    <custom-create-header :header="createHeader.header" :btns="createHeader.btns"></custom-create-header>
    <div class="table-box">
      <el-table :data="source">
        <el-table-column :label="$t('tableEdit.name')">
          <template slot-scope="scope">
            <span v-if="!scope.row.isEdit">{{scope.row.name}}</span>
            <el-input v-else v-model="scope.row.name" placeholder="Enter name."></el-input>
          </template>
        </el-table-column>
        <el-table-column :label="$t('tableEdit.id')">
          <template slot-scope="scope">
            <span>{{scope.row.id}}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('tableEdit.address')">
          <template slot-scope="scope">
            <span v-if="!scope.row.isEdit">{{scope.row.address}}</span>
            <el-input v-else v-model="scope.row.address" placeholder="Enter address."></el-input>
          </template>
        </el-table-column>
        <el-table-column :label="$t('tableEdit.createdAt')">
          <template slot-scope="scope">
            <span>{{scope.row.createdAt || '--'}}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('tableEdit.updatedAt')">
          <template slot-scope="scope">
            <span>{{scope.row.updatedAt || '--'}}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('common.operation')">
          <template slot-scope="scope">
            <el-button
              v-if="!scope.row.isEdit"
              size="mini"
              @click="handleEdit(scope.row.id)"
            >{{$t('common.edit')}}</el-button>
            <el-button
              v-if="!scope.row.isEdit"
              size="mini"
              type="danger"
              @click="handleDelete(scope.row.id)"
            >{{$t('common.delete')}}</el-button>
            <el-button
              v-if="scope.row.isEdit"
              size="mini"
              type="primary"
              @click="handleSave(scope.row)"
            >{{$t('common.save')}}</el-button>
            <el-button
              v-if="scope.row.isEdit"
              size="mini"
              @click="handleCancel(scope.row.id)"
            >{{$t('common.cancel')}}</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
import * as _ from 'lodash';
import CustomCreateHeader from '@/components/customCreateHeader/index.vue';
export default {
  name: 'user',
  components: {
    CustomCreateHeader,
  },
  data() {
    return {
      source: [],
      sourceCache: [],
      createHeader: {
        header: {
          title: this.$t('tableEdit.title'),
          helpTip: {
            content: this.$t('tableEdit.helpTip'),
            position: 'top-start',
          },
        },
        btns: [
          {
            id: 'createTable',
            text: this.$t('tableEdit.createTable'),
            icon: 'el-icon-plus',
            click: (e) => {
              if (e) e.preventDefault();
              console.log('create table editing.');
            },
          },
        ],
      },
    };
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      this.source = [
        {
          id: '1',
          name: 'Lily',
          address: 'shenzhen',
          createdAt: 1585989287805,
          updatedAt: null,
          isEdit: false,
        },
        {
          id: '2',
          name: 'Luly',
          address: 'guangzhou',
          createdAt: 1585989287805,
          updatedAt: null,
          isEdit: false,
        },
        {
          id: '3',
          name: 'Jim',
          address: 'beijing',
          createdAt: 1585989287805,
          updatedAt: null,
          isEdit: false,
        },
      ];
    },
    processSourceCache() {
      if (this.source.length === 0 || this.source.every((s) => !s.isEdit)) {
        this.sourceCache = [];
        return;
      }
      if (this.sourceCache.length === 0) {
        this.sourceCache = _.cloneDeep(this.source);
        return;
      }
      this.source.forEach((e) => {
        if (!e.isEdit) {
          this.sourceCache = this.sourceCache.map((item) => {
            if (item.id === e.id) {
              return e;
            }
            return item;
          });
        }
      });
    },
    handleEdit: _.debounce(
      function(id) {
        if (!id) return;
        this.source = _.cloneDeep(this.source).map((item) => {
          if (item.id === id) {
            return {
              ...item,
              isEdit: true,
            };
          }
          return item;
        });
        this.processSourceCache();
      },
      300,
      { leading: true, trailing: false }
    ),
    handleDelete: _.debounce(
      function(id) {
        this.source = this.source.filter((item) => item.id !== id);
        this.processSourceCache();
      },
      300,
      { leading: true, trailing: false }
    ),
    handleSave: _.debounce(
      function(row) {
        this.source = this.source.map((item) => {
          if (item.id === row.id) {
            return {
              ...row,
              updatedAt: new Date().getTime(),
              isEdit: false,
            };
          }
          return item;
        });
        this.processSourceCache();
      },
      300,
      { leading: true, trailing: false }
    ),
    handleCancel: _.debounce(
      function(id) {
        _.cloneDeep(this.sourceCache).every((t) => {
          if (t.id === id) {
            this.source = _.cloneDeep(this.source).map((s) => {
              if (s.id === t.id) {
                return {
                  ...t,
                  isEdit: false,
                };
              }
              return s;
            });
            this.processSourceCache();
            return false;
          }
          return true;
        });
      },
      300,
      { leading: true, trailing: false }
    ),
  },
};
</script>
<style lang="less" scoped>
#table-edit {
  height: 100%;
  .table-box {
    padding: 10px;
    background-color: #fff;
  }
}
</style>