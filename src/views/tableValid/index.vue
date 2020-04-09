<template>
  <div id="table-valid">
    <custom-create-header :header="createHeader.header" :btns="createHeader.btns"></custom-create-header>
    <valid-table ref="validTable">
      <el-table :data="source">
        <el-table-column :label="$t('tableValid.key')">
          <template slot-scope="scope">
            <valid-input
              v-model="scope.row.key"
              :validation="keyValidation"
              prop="key"
              :placeholder="$t('tableValid.placeholder.key')"
              @blur="handleInputBlur"
            ></valid-input>
          </template>
        </el-table-column>
        <el-table-column :label="$t('tableValid.value')">
          <template slot-scope="scope">
            <valid-input
              v-model="scope.row.value"
              :validation="valueValidation"
              prop="value"
              :placeholder="$t('tableValid.placeholder.key')"
            ></valid-input>
          </template>
        </el-table-column>
        <el-table-column :label="$t('tableValid.type')">
          <template slot-scope="scope">
            <el-select size="medium" v-model="scope.row.type" placeholder="select type.">
              <el-option v-for="item in typeArr" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column align="right">
          <template slot="header">
            <span>
              <span style="margin-right: 5px;">{{ $t('common.operation') }}</span>
              <el-button type="primary" size="small" @click="handleAdd()">{{ $t('common.add') }}</el-button>
            </span>
          </template>
          <template slot-scope="scope">
            <el-button type="danger" size="small" @click="handleDelete(scope.row.key)">
              {{ $t('common.delete') }}
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </valid-table>
  </div>
</template>
<script>
import CustomCreateHeader from '@/components/customCreateHeader/index.vue';
import ValidTable from '@/components/valid-table/table.vue';
import ValidInput from '@/components/valid-table/input.vue';
export default {
  name: 'role',
  components: {
    CustomCreateHeader,
    ValidTable,
    ValidInput,
  },
  data() {
    const _this = this;
    return {
      source: [],
      keyValidation: [
        {
          required: true,
          message: this.$t('tableValid.invalid.keyRequired'),
          trigger: 'blur',
        },
        {
          validator: function(rule, value, callback) {
            const keyArr = _this.source.map((i) => i.key);
            if (keyArr.indexOf(value) !== keyArr.lastIndexOf(value)) {
              return callback(new Error(_this.$t('tableValid.invalid.keyRepeated')));
            }
            callback();
          },
          trigger: 'change',
        },
      ],
      valueValidation: [
        {
          required: true,
          message: this.$t('tableValid.invalid.valueRequired'),
          trigger: 'blur',
        },
      ],
      typeArr: [
        {
          label: 'Number',
          value: 'Number',
        },
        {
          label: 'String',
          value: 'String',
        },
        {
          label: 'Boolean',
          value: 'Boolean',
        },
      ],
      createHeader: {
        header: {
          title: this.$t('tableValid.title'),
          helpTip: {
            content: this.$t('tableValid.helpTip'),
            position: 'top-start',
          },
        },
        btns: [
          {
            id: 'createTable',
            text: this.$t('tableValid.createTable'),
            icon: 'el-icon-plus',
            click: (e) => {
              if (e) e.preventDefault();
              console.log('create table valid.');
            },
          },
        ],
      },
    };
  },
  methods: {
    handleAdd() {
      if (!this.source.length) {
        this.source.push({
          key: '',
          value: '',
          type: 'Number',
        });
        return;
      }
      // 全表单校验
      this.$refs.validTable.validate((valid) => {
        if (!valid) {
          return;
        }
        this.source.push({
          key: '',
          value: '',
          type: 'Number',
        });
      });
    },
    handleDelete(key) {
      this.source = this.source.filter((item) => item.key !== key);
    },
    handleInputBlur() {
      // blur触发时，进行联动输入框的校验
      this.$refs.validTable.validateField('key');
    },
  },
};
</script>
<style lang="less">
#table-valid {
  height: 100%;
  .el-table {
    overflow: visible;
    .el-table__body-wrapper {
      overflow: visible;
    }
    .cell {
      overflow: visible;
    }
  }
}
</style>
