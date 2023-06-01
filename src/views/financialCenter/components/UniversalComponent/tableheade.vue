<template>
  <div class="radio-date">
    <div style="padding-left: 10px;font-weight: bold;font-size: 16px;">{{ headerData.name }}</div>
    <div>
      <el-radio-group v-model="currentTab" size="mini" @input="handelDateChange">
        <el-radio-button v-for="item in headerData.list" :key="item.label" :label="item.label">{{ item.text }}</el-radio-button>
        <el-radio-button v-if="isCustom" :label="0">
          <span @click="$refs.refCustomDate.focus()">自定义</span>
          <div style="display: inline-block;width: 0;height: 0;overflow: hidden;">
            <el-date-picker
              ref="refCustomDate" v-model="customDate" type="daterange"
              value-format="yyyy-MM-dd" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"
              @change="handelDatePickerChange"
            >
            </el-date-picker>
          </div>
        </el-radio-button>
      </el-radio-group>
    </div>
  </div>
</template>

<script>
export default {
  // eslint-disable-next-line vue/match-component-file-name
  name: 'TableHeader',
  props: {
    headerData: {
      type: Object,
      required: true
    },
    isCustom: {
      type: Boolean,
      default: false
    },
    defaultTab: {
      type: Number,
      default: 1
    }
  },
  data() {
    return {
      currentTab: '',
      customDate: ''
    }
  },
  created() {
    this.currentTab = this.defaultTab
  },
  methods: {
    handelDateChange(e) {
      this.$emit('tab-change', e)
    },
    handelDatePickerChange(e) {
      this.$emit('select-date', this.customDate)
    }
  }
}
</script>

<style lang="scss" scoped>
.radio-date {
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-top: 10px;

	/deep/ .el-radio-group {
		label {
			.el-radio-button__inner {
				border: 0;
			}
		}

		label.is-active {
			.el-radio-button__inner {
				color: #4D70FF;
				background-color: #f1f4ff;
				box-shadow: none;
			}
		}
	}
}
</style>
