<template>
  <div
    :style="{
      width: '100%',
      height: '100%'
    }"
  >
    <div style="display: flex;justify-content: center;align-items: center;height: 15%;">
      <span :style="{ fontSize: 24 * $root.dw + 'px', fontWeight: 'bold', color: '#2ECFF9' }">进销存管理</span>
    </div>
    <div style="display: flex;flex-direction: column;width: 100%;height: 85%;">
      <div
        style="display: flex;justify-content: space-between;width: 100%;margin-top: -6px;padding: 0 20px 20px;color: #2ECFF9;"
        :style="{ fontSize: 16 * $root.dw + 'px' }"
      >
        <div style="width: 50%;">
          <div style="display: flex;padding-bottom: 12px;">
            <div>库存管理</div>
            <div
              style="position: relative;top: 6px;left: 6px;width: 24px;height: 12px;border-top: 1px solid #1ac1de;border-right: 1px solid #1ac1de;"
            >
            </div>
          </div>
          <div style="width: 100%;">
            <!-- <el-progress :percentage="(2000 / inventoryQuantity) * 100" color="#ffd100" :format="(p) => inventoryQuantity * p / 100"></el-progress> -->
            <div style="display: flex;width: 100%;padding-bottom: 10px;">
              <div>入库数量</div>
              <div style="width: 50%;padding-top: 3px;margin-left: 15px;margin-right: 10px;">
                <el-progress
                  :show-text="false" :percentage="(2000 / inventoryQuantity) * 100" color="#ffd100"
                  :format="(p) => 2000" define-back-color="rgba(0, 0, 0, 0)" :stroke-width="7"
                ></el-progress>
              </div>
              <div style="color: #FFFFFF;">2000</div>
            </div>
            <div style="display: flex;width: 100%;padding-bottom: 10px;">
              <div>出库数量</div>
              <div style="width: 50%;padding-top: 3px;margin-left: 15px;margin-right: 10px;">
                <el-progress
                  :show-text="false" :percentage="(1024 / inventoryQuantity) * 100" color="#ffd100"
                  :format="(p) => 1024" define-back-color="rgba(0, 0, 0, 0)" :stroke-width="7"
                ></el-progress>
              </div>
              <div style="color: #FFFFFF;">1024</div>
            </div>
            <div style="display: flex;width: 100%;padding-bottom: 10px;">
              <div>剩余库存</div>
              <div style="width: 50%;padding-top: 3px;margin-left: 15px;margin-right: 10px;">
                <el-progress
                  :show-text="false" :percentage="(976 / inventoryQuantity) * 100" color="#ffd100"
                  :format="(p) => 976" define-back-color="rgba(0, 0, 0, 0)" :stroke-width="7"
                ></el-progress>
              </div>
              <div style="color: #FFFFFF;">976</div>
            </div>
          </div>
        </div>
        <div style="width: 50%;">
          <div style="display: flex;justify-content: flex-end;padding-bottom: 12px;">
            <div
              style="position: relative;top: 6px;right: 6px;width: 24px;height: 12px;border-top: 1px solid #1ac1de;border-left: 1px solid #1ac1de;"
            >
            </div>
            <div>单据管理</div>
          </div>
          <div style="width: 100%;">
            <div style="display: flex;justify-content: flex-end;width: 100%;padding-bottom: 10px;">
              <div style="color: #FFFFFF;">1000</div>
              <div style="width: 50%;padding-top: 3px;margin-left: 10px;margin-right: 15px;">
                <el-progress
                  style="transform: rotateY(180deg);" :show-text="false"
                  :percentage="(1000 / documentQuantity) * 100" color="#ffd100" :format="(p) => 1000"
                  define-back-color="rgba(0, 0, 0, 0)" :stroke-width="7"
                ></el-progress>
              </div>
              <div>采购数量</div>
            </div>
            <div style="display: flex;justify-content: flex-end;width: 100%;padding-bottom: 10px;">
              <div style="color: #FFFFFF;">2000</div>
              <div style="width: 50%;padding-top: 3px;margin-left: 10px;margin-right: 15px;">
                <el-progress
                  style="transform: rotateY(180deg);" :show-text="false"
                  :percentage="(2000 / documentQuantity) * 100" color="#ffd100" :format="(p) => 2000"
                  define-back-color="rgba(0, 0, 0, 0)" :stroke-width="7"
                ></el-progress>
              </div>
              <div>采购金额</div>
            </div>
            <div style="display: flex;justify-content: flex-end;width: 100%;padding-bottom: 10px;">
              <div style="color: #FFFFFF;">6</div>
              <div style="width: 50%;padding-top: 3px;margin-left: 10px;margin-right: 15px;">
                <el-progress
                  style="transform: rotateY(180deg);" :show-text="false"
                  :percentage="(6 / documentQuantity) * 100" color="#ffd100" :format="(p) => 6"
                  define-back-color="rgba(0, 0, 0, 0)" :stroke-width="7"
                ></el-progress>
              </div>
              <div>供应商数</div>
            </div>
          </div>
        </div>
      </div>

      <div style="flex: 1;overflow: hidden;width: 100%;">
        <div
          class="main_table" style="width: 100%;height: 100%;padding: 0 15px;"
        >
          <table style="display: flex;flex-direction: column;width: 100%;height: 92%;">
            <thead :style="{ fontSize: 14 * $root.dw + 'px' }" style="border-bottom: 1px solid #c6d9f6;">
              <tr>
                <th style="width: 8%;">编号</th>
                <th style="width: 15%;">会员姓名</th>
                <th style="width: 7%;">性别</th>
                <th style="width: 20%;">电话</th>
                <th style="width: 20%;">销售订单</th>
                <th style="width: 15%;">付款金额</th>
                <th style="width: 15%;">开单时间</th>
              </tr>
            </thead>
            <tbody :style="{ fontSize: 12 * $root.dw + 'px' }" style="flex: 1;overflow-y: auto;width: 100%;">
              <tr style="width: 100%;">
                <td style="width: 8%;">1</td>
                <td style="width: 15%;">王安石</td>
                <td style="width: 7%;">男</td>
                <td style="width: 20%;">18888888888</td>
                <td style="width: 20%;">SL202308008</td>
                <td style="width: 15%;">8888</td>
                <td style="width: 15%;">2023-08-08</td>
              </tr>
              <tr>
                <td style="width: 8%;">1</td>
                <td style="width: 15%;">王安石</td>
                <td style="width: 7%;">男</td>
                <td style="width: 20%;">18888888888</td>
                <td style="width: 20%;">SL202308008</td>
                <td style="width: 15%;">8888</td>
                <td style="width: 15%;">2023-08-08</td>
              </tr>
              <tr>
                <td style="width: 8%;">1</td>
                <td style="width: 15%;">王安石</td>
                <td style="width: 7%;">男</td>
                <td style="width: 20%;">18888888888</td>
                <td style="width: 20%;">SL202308008</td>
                <td style="width: 15%;">8888</td>
                <td style="width: 15%;">2023-08-08</td>
              </tr>
              <tr>
                <td style="width: 8%;">1</td>
                <td style="width: 15%;">王安石</td>
                <td style="width: 7%;">男</td>
                <td style="width: 20%;">18888888888</td>
                <td style="width: 20%;">SL202308008</td>
                <td style="width: 15%;">8888</td>
                <td style="width: 15%;">2023-08-08</td>
              </tr>
              <tr>
                <td style="width: 8%;">1</td>
                <td style="width: 15%;">王安石</td>
                <td style="width: 7%;">男</td>
                <td style="width: 20%;">18888888888</td>
                <td style="width: 20%;">SL202308008</td>
                <td style="width: 15%;">8888</td>
                <td style="width: 15%;">2023-08-08</td>
              </tr>
              <tr>
                <td style="width: 8%;">1</td>
                <td style="width: 15%;">王安石</td>
                <td style="width: 7%;">男</td>
                <td style="width: 20%;">18888888888</td>
                <td style="width: 20%;">SL202308008</td>
                <td style="width: 15%;">8888</td>
                <td style="width: 15%;">2023-08-08</td>
              </tr>
              <tr>
                <td style="width: 8%;">1</td>
                <td style="width: 15%;">王安石</td>
                <td style="width: 7%;">男</td>
                <td style="width: 20%;">18888888888</td>
                <td style="width: 20%;">SL202308008</td>
                <td style="width: 15%;">8888</td>
                <td style="width: 15%;">2023-08-08</td>
              </tr>
              <tr>
                <td style="width: 8%;">1</td>
                <td style="width: 15%;">王安石</td>
                <td style="width: 7%;">男</td>
                <td style="width: 20%;">18888888888</td>
                <td style="width: 20%;">SL202308008</td>
                <td style="width: 15%;">8888</td>
                <td style="width: 15%;">2023-08-08</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NoSignInList',
  components: {
  },
  data() {
    return {
      inventoryQuantity: 4000,
      documentQuantity: 3006,
      tableData: []
    }
  },
  watch: {
  },
  mounted() {
  },
  beforeDestroy() {
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
.el-progress {
	/deep/ .el-progress-bar {
		.el-progress-bar__outer {
			border-radius: 0;
			border: 1px solid #3662EC;
		}
	}
}

th {
	color: #2ECFF9
}

tbody {
	tr {
		height: 22px;

		td {
			text-align: center;
			color: #FFFFFF;
		}
	}

	tr:nth-child(2n) {
		background-color: #1b1a6a;
	}
}

table,
tbody {
	display: block
}

thead,
tbody tr {
	display: table;
	width: 100%;
	table-layout: fixed;
}
</style>
