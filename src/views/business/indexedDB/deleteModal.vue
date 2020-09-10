<template>
  <div id="delete-modal">
    <el-dialog
      :title="options.title"
      :width="options.width || '600px'"
      :visible.sync="visible"
      :before-close="handleCancel"
      :close-on-click-modal="false"
    >
      <div>
        <div class="cms-delete-text">{{ title }}</div>
        <div class="cms-delete-tip">
          <i class="fa fa-exclamation-triangle" aria-hidden="true"></i>
          <span>{{ tip }}</span>
        </div>
        <div>
          <el-table :data="list" style="width: 100%">
            <el-table-column prop="id" label="ID"></el-table-column>
            <el-table-column prop="itemKey" label="Key"></el-table-column>
            <el-table-column prop="itemValue" label="Value"></el-table-column>
          </el-table>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="medium" @click="handleCancel">{{ $t('common.cancel') }}</el-button>
        <el-button size="medium" type="primary" @click="handleDelete">{{ $t('common.confirm') }}</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { mapActions } from 'vuex';
import * as _ from 'lodash';
import modalMixin from '@/plugins/modal/mixin.js';

export default {
  mixins: [modalMixin],
  name: 'userDeleteModal',
  data() {
    return {
      id: '',
      itemKey: '',
      title: '',
      tip: '',
      list: [],
    };
  },
  mounted() {
    const { list, text } = this.options.winData;
    this.list = list;
    this.title = text && text.title;
    this.tip = text && text.tip;
    this.id = list[0].id;
    this.itemKey = list[0].itemKey;
  },
  methods: {
    ...mapActions('business/main', ['deleteItem']),
    handleDelete() {
      this.deleteItem(this.id)
        .then((res) => {
          if (!res || !res.success) {
            this.$msg.error(`${this.itemKey} 删除失败`);
            return;
          }
          this.$msg.success(`${this.itemKey} 删除成功`);
          this.loading = false;
          this.handleConfirm();
        })
        .catch((err) => {
          this.loading = false;
          console.log(err);
        });
    },
  },
};
</script>
<style lang="less" scoped>
#delete-modal {
  .cms-delete-text {
    font-size: 16px;
    padding-left: 10px;
    margin-bottom: 10px;
  }
  .cms-delete-tip {
    padding-left: 10px;
    margin-bottom: 10px;
    i {
      color: #ffc71c;
      font-size: 26px;
      vertical-align: middle;
    }
    span {
      margin-left: 10px;
      color: #999;
      vertical-align: middle;
    }
  }
}
</style>
