<template>
  <div id="add-modal">
    <el-dialog
      :title="options.title"
      :width="options.width || '600px'"
      :visible.sync="visible"
      :before-close="handleCancel"
      :close-on-click-modal="false"
    >
      <el-form
        v-loading="loading"
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="150px"
        class="demo-ruleForm"
        autocomplete="off"
        size="medium"
      >
        <el-form-item label="Key" prop="itemKey">
          <el-input class="width-300" v-model.trim="ruleForm.itemKey" placeholder="Key"></el-input>
        </el-form-item>
        <el-form-item label="Value" prop="itemValue">
          <el-input class="width-300" v-model.trim="ruleForm.itemValue" placeholder="Value"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size="medium" :disabled="loading" @click="handleCancel">取消</el-button>
        <el-button
          size="medium"
          :disabled="loading"
          type="primary"
          @click="submitForm('ruleForm')"
        >确定</el-button>
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
  name: 'addModal',
  data() {
    return {
      loading: false,
      ruleForm: {
        itemKey: '',
        itemValue: '',
      },
      rules: {
        itemKey: [{ required: true, message: 'Enter key.', trigger: 'change' }],
        itemValue: [{ required: true, message: 'Enter value.', trigger: 'change' }],
      },
    };
  },
  mounted() {
    const { oper, item } = this.options.winData;
    if (oper === 'edit') {
      this.ruleForm = {
        itemKey: item.itemKey,
        itemValue: item.itemValue,
      };
    }
  },
  methods: {
    ...mapActions('business/main', ['createItem', 'updateItem']),
    submitForm: _.debounce(
      function (formName) {
        this.$refs[formName].validate((valid) => {
          if (!valid) {
            return;
          }
          if (this.options.winData.oper === 'create') {
            this.create(this.ruleForm);
          } else if (this.options.winData.oper === 'edit') {
            this.update(this.options.winData.item.id, this.ruleForm);
          }
        });
      },
      300,
      {
        leading: true,
        trailing: false,
      }
    ),
    create(formData) {
      if (!formData) {
        return;
      }
      const param = {
        payload: formData,
      };
      this.loading = true;
      this.createItem(param)
        .then((res) => {
          if (!res || !res.success) {
            this.$msg.error(`${formData.itemKey} 添加失败`);
            return;
          }
          this.$msg.success(`${formData.itemKey} 添加成功`);
          this.loading = false;
          this.handleConfirm();
        })
        .catch((err) => {
          this.loading = false;
          console.log(err);
        });
    },
    update(id, formData) {
      if (!id || !formData) {
        return;
      }
      const param = {
        payload: formData,
        id,
      };
      this.loading = true;
      this.updateItem(param)
        .then((res) => {
          if (!res || !res.success) {
            this.$msg.error(`${formData.itemKey} 编辑失败`);
            return;
          }
          this.$msg.success(`${formData.itemKey} 编辑成功`);
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
<style lang="less">
#add-modal {
  .el-dialog__wrapper {
    .el-dialog__body {
      max-height: 500px;
      overflow: auto;
    }
  }
}
</style>
