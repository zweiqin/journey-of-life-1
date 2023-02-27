<template>
  <el-popover v-model="visible" width="780" trigger="click" placement="left">
    <div>
      <div class="erp-tml-custom-column" :style="{ width }">
        <div class="title">{{ title }}</div>
        <div class="erp-tml-custom-column__content">
          <div class="erp-tml-custom-column__left">
            <div class="top">
              <div class="left_title">选择列表字段</div>
              <div class="checkbox-group">
                <!-- <a-radio-group v-model="value" :options="plainOptions" @change="onChange" /> -->
                <el-button
                  v-for="item in plainOptions" :key="item.value" style="border:0;margin-right:8px" type="text"
                  @click="onChange(item.value)"
                >
                  {{ item.label }}
                </el-button>
              </div>
            </div>
            <div class="deep-check-group_wrapper">
              <TreeSelection :fields="fieldList" @change="change"></TreeSelection>
              <div class="scroll-mask"></div>
            </div>
          </div>
          <div class="erp-tml-custom-column__right">
            <div class="title">已选列表字段排序</div>
            <DraggableColumn v-model="list" @change="changeColumn(list)" @delete="deleteItem" />
          </div>
        </div>
      </div>
      <div class="erp-tml-custom-footer">
        <el-button :style="{ float: 'left' }" @click="resetDefault">恢复默认</el-button>
        <el-button key="back" @click="handleCancel">取消</el-button>
        <el-button key="submit" type="primary" @click="handleOk">确定</el-button>
      </div>
    </div>
    <el-button
      v-if="!Object.keys($slots).length" slot="reference" icon="el-icon-s-grid" style="margin-left:8px"
      @click="$emit('setting')"
    >
      自定义列
    </el-button>
    <slot></slot>
  </el-popover>
</template>

<script>
import TreeSelection from '@/components/TreeSelection'
import DraggableColumn from './components/DraggableColumn'
import CustomColumn from './custom-column'
const plainOptions = [{ label: '全选', value: 'all' }, { label: '取消全选', value: 'unCheck' }, { label: '反选', value: 'invert' }]
export default {
  name: 'CustomColumn',
  components: {
    TreeSelection,
    DraggableColumn
  },
  props: {
    title: { default: '自定义列设置' },
    width: String,
    bodyStyle: {
      default: () => ({
        padding: '0 0 0 16px'
      })
    },
    isRequest: {
      default: true
    }
  },
  data() {
    return {
      visible: false,
      value: '',
      fieldList: [],
      customColumn: null,
      list: [],
      plainOptions
    }
  },
  methods: {
    /* ----------------------------------------- 绑定方法 ----------------------------------------- */

    createFields(newFields) {
      const base = (newFields) => {
        const { columns, lastColumns, tableColumns } = this.customColumn = new CustomColumn(newFields)
        this.fieldList = columns
        this.list = lastColumns
        this.value = ''
        this.$emit('update-fields', tableColumns)
      }
      if (!this.visible) {
        if (this.isRequest) {
          // 需要组件内做API请求的， 可以把通用接口放到此处 TODO:
          setTimeout(() => {
            // newFields.sourceColumns = res.data.fields
            base(newFields)
          }, 100)
        } else {
          base(newFields)
        }
      }
    },
    onChange(val) {
      this.value = val
      this.checkChange(this.value)
    },
    handleOk() {
      const { data, tableColumns } = this.customColumn.save()
      const base = () => {
        this.$emit('update-fields', tableColumns)
        this.visible = false
      }
      return new Promise((resolve) => {
        if (this.isRequest) {
          // 需要组件内做API请求的， 可以把通用接口放到此处 TODO:
          // const params = {
          //   fields: data,
          //   field_key: this.customColumn.fieldKey
          // }
          setTimeout(() => {
            this.$emit('submit', { data })
            resolve()
          }, 100)
        } else {
          this.$emit('submit', { data, resolve })
        }
      }).then((_) => base())
    },
    handleCancel() {
      this.visible = false
    },
    resetDefault() {
      const { columns, lastColumns } = this.customColumn.resetDefault()
      this.fieldList = columns
      this.list = lastColumns
    },
    // 全选
    onCheckAllChange() {
      this.checkChange()
    },
    checkChange(type) {
      const flag = type === 'all' ? 2 : 1
      this.list = this.customColumn.setChecked(flag, type)
    },
    changeColumn() {
      this.customColumn.get(this.list)
    },
    change(item) {
      this.list = this.customColumn.update(item)
      this.value = ''
    },
    deleteItem(item) {
      this.customColumn.unCheck(item)
    }

    /* ----------------------------------------- 自定义方法 ----------------------------------------- */
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.erp-tml-custom-column {
	width: 750px;

	.title {
		padding: 12px 16px;
		font-size: 16px;
		color: #000;
		flex: 1;
	}

	&__content {
		display: flex;
		justify-content: space-between;
	}

	&__left {
		border-right: 1px solid #e9e9e9;
		flex: 1;

		.deep-check-group_wrapper {
			height: 320px;
			padding-left: 16px;
			overflow: hidden;

			&:hover {
				overflow-y: auto;
			}
		}

		.top {
			padding-left: 16px;
			height: 40px;
			display: flex;
			align-items: center;
			flex: 1;
			background-color: #fafafa;
			border: 1px solid #e8e8e8;
			border-right: 0;

			.left_title {
				font-size: 14px;
				color: rgba(0, 0, 0, 0.85);
				flex: 1;
				line-height: 24px;
			}
		}

		.checkbox-group {
			display: flex;
			align-items: center;
		}
	}

	&__right {
		width: 250px;

		.title {
			font-size: 14px;
			padding-left: 16px;
			height: 40px;
			color: rgba(0, 0, 0, 0.85);
			display: flex;
			align-items: center;
			flex: 1;
			background-color: #fafafa;
			border: 1px solid #e8e8e8;
			border-left: none;
		}
	}
}

.erp-tml-operate-button {
	width: 72px;
}

.erp-tml-custom-footer {
	padding: 10px;
	text-align: right;
	border-top: 1px solid #e8e8e8;
}
</style>
