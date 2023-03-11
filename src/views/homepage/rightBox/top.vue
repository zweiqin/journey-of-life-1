<template>
  <div
    :style="{
      width: '100%',
      height: '100%'
    }"
  >
    <div style="display: flex;justify-content: center;align-items: center;height: 7.55%;">
      <span :style="{ fontSize: 20 * $root.dw + 'px', fontWeight: 'bold', color: '#2ECFF9' }">财务系统</span>
    </div>
    <div style="display: flex;flex-direction: column;width: 100%;height: 92.45%;">
      <div
        style="width: 100%;padding: 16px 4px 16px;color: #2ECFF9;"
        :style="{ fontSize: 16 * $root.dw + 'px' }"
      >
        <div style="display: flex;width: 100%;">
          <div style="display: flex;flex-direction: column;align-items: center;width: 50%;padding-bottom: 25px;padding-right: 12px;">
            <div style="flex: 1;height: 0;display: flex;width: 100%;margin-top: 1px;">
              <div style="width: 40%;">
                <div class="container-img">
                  <img src="@/assets/image/digit-lack-sphere.png" alt />
                </div>
              </div>
              <div style="display: flex;flex-direction: column;justify-content: space-between;width: 70%;padding: 6px;">
                <div style="padding-bottom: 12px;">收入</div>
                <div :style="{ fontSize: 14 * $root.dw + 'px' }">
                  <div style="display: flex;justify-content: space-between;padding-bottom: 10px;">
                    <div>应收金额</div>
                    <div>￥ 9009</div>
                  </div>
                  <div style="display: flex;justify-content: space-between;padding-bottom: 10px;">
                    <div>收到金额</div>
                    <div>￥ 5209</div>
                  </div>
                </div>
              </div>
            </div>
            <div :style="{ fontSize: 14 * $root.dw + 'px' }" style="width: 90%;padding: 5px 0;text-align: center;background: linear-gradient(180deg, #02124D 0%, rgba(2,18,77,0.00) 52%, rgba(2,18,77,0.78) 100%);border: 0.5px solid #3662EC;box-shadow: inset 0px 0px 4px 0px #FFFFFF;">当日总收入：2000元</div>
          </div>
          <div style="display: flex;flex-direction: column;align-items: center;width: 50%;padding-bottom: 25px;padding-right: 12px;">
            <div style="flex: 1;height: 0;display: flex;width: 100%;margin-top: 1px;">
              <div style="width: 40%;">
                <div class="container-img">
                  <img src="@/assets/image/digit-lack-sphere.png" alt />
                </div>
              </div>
              <div style="display: flex;flex-direction: column;justify-content: space-between;width: 70%;padding: 6px;">
                <div style="padding-bottom: 12px;">支出</div>
                <div :style="{ fontSize: 14 * $root.dw + 'px' }">
                  <div style="display: flex;justify-content: space-between;padding-bottom: 10px;">
                    <div>应付金额</div>
                    <div>￥ 16528</div>
                  </div>
                  <div style="display: flex;justify-content: space-between;padding-bottom: 10px;">
                    <div>已付金额</div>
                    <div>￥ 8652</div>
                  </div>
                </div>
              </div>
            </div>
            <div :style="{ fontSize: 14 * $root.dw + 'px' }" style="width: 90%;padding: 5px 0;text-align: center;background: linear-gradient(180deg, #02124D 0%, rgba(2,18,77,0.00) 52%, rgba(2,18,77,0.78) 100%);border: 0.5px solid #3662EC;box-shadow: inset 0px 0px 4px 0px #FFFFFF;">当日总支出：1098元</div>
          </div>
        </div>
        <div style="display: flex;justify-content: space-between;padding: 0 10px;">
          <div style="width: 16%;text-align: center;padding: 5px 0;background: #131F53;border: 0.5px solid;border-image: linear-gradient(0deg, #060B3D -3%, #FFFFFF 49%, #060B3D 100%) 0.5;">总销售额</div>
          <div style="width: 16%;text-align: center;padding: 5px 0;background: #131F53;border: 0.5px solid;border-image: linear-gradient(0deg, #060B3D -3%, #FFFFFF 49%, #060B3D 100%) 0.5;">总成本</div>
          <div style="width: 16%;text-align: center;padding: 5px 0;background: #131F53;border: 0.5px solid;border-image: linear-gradient(0deg, #060B3D -3%, #FFFFFF 49%, #060B3D 100%) 0.5;">总差价</div>
          <div style="width: 16%;text-align: center;padding: 5px 0;background: #131F53;border: 0.5px solid;border-image: linear-gradient(0deg, #060B3D -3%, #FFFFFF 49%, #060B3D 100%) 0.5;">总支出</div>
          <div style="width: 16%;text-align: center;padding: 5px 0;background: #131F53;border: 0.5px solid;border-image: linear-gradient(0deg, #060B3D -3%, #FFFFFF 49%, #060B3D 100%) 0.5;">总销售量</div>
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
                <th style="width: 15%;">产品分类</th>
                <th style="width: 17%;">分类总金额</th>
                <th style="width: 15%;">分类总数</th>
                <th style="width: 15%;">分类编号</th>
                <th style="width: 15%;">供应商数</th>
                <th style="width: 15%;">操作</th>
              </tr>
            </thead>
            <tbody :style="{ fontSize: 12 * $root.dw + 'px' }" style="flex: 1;overflow-y: auto;width: 100%;">
              <tr style="width: 100%;">
                <td style="width: 8%;">1</td>
                <td style="width: 15%;">沙发类</td>
                <td style="width: 17%;">￥ 500</td>
                <td style="width: 15%;">99</td>
                <td style="width: 15%;">SL202308008</td>
                <td style="width: 15%;">1</td>
                <td style="width: 15%;">查看详情</td>
              </tr>
              <tr style="width: 100%;">
                <td style="width: 8%;">1</td>
                <td style="width: 15%;">沙发类</td>
                <td style="width: 17%;">￥ 500</td>
                <td style="width: 15%;">99</td>
                <td style="width: 15%;">SL202308008</td>
                <td style="width: 15%;">1</td>
                <td style="width: 15%;">查看详情</td>
              </tr>
              <tr style="width: 100%;">
                <td style="width: 8%;">1</td>
                <td style="width: 15%;">沙发类</td>
                <td style="width: 17%;">￥ 500</td>
                <td style="width: 15%;">99</td>
                <td style="width: 15%;">SL202308008</td>
                <td style="width: 15%;">1</td>
                <td style="width: 15%;">查看详情</td>
              </tr>
              <tr style="width: 100%;">
                <td style="width: 8%;">1</td>
                <td style="width: 15%;">沙发类</td>
                <td style="width: 17%;">￥ 500</td>
                <td style="width: 15%;">99</td>
                <td style="width: 15%;">SL202308008</td>
                <td style="width: 15%;">1</td>
                <td style="width: 15%;">查看详情</td>
              </tr>
              <tr style="width: 100%;">
                <td style="width: 8%;">1</td>
                <td style="width: 15%;">沙发类</td>
                <td style="width: 17%;">￥ 500</td>
                <td style="width: 15%;">99</td>
                <td style="width: 15%;">SL202308008</td>
                <td style="width: 15%;">1</td>
                <td style="width: 15%;">查看详情</td>
              </tr>
              <tr style="width: 100%;">
                <td style="width: 8%;">1</td>
                <td style="width: 15%;">沙发类</td>
                <td style="width: 17%;">￥ 500</td>
                <td style="width: 15%;">99</td>
                <td style="width: 15%;">SL202308008</td>
                <td style="width: 15%;">1</td>
                <td style="width: 15%;">查看详情</td>
              </tr>
              <tr style="width: 100%;">
                <td style="width: 8%;">1</td>
                <td style="width: 15%;">沙发类</td>
                <td style="width: 17%;">￥ 500</td>
                <td style="width: 15%;">99</td>
                <td style="width: 15%;">SL202308008</td>
                <td style="width: 15%;">1</td>
                <td style="width: 15%;">查看详情</td>
              </tr>
              <tr style="width: 100%;">
                <td style="width: 8%;">1</td>
                <td style="width: 15%;">沙发类</td>
                <td style="width: 17%;">￥ 500</td>
                <td style="width: 15%;">99</td>
                <td style="width: 15%;">SL202308008</td>
                <td style="width: 15%;">1</td>
                <td style="width: 15%;">查看详情</td>
              </tr>
              <tr style="width: 100%;">
                <td style="width: 8%;">1</td>
                <td style="width: 15%;">沙发类</td>
                <td style="width: 17%;">￥ 500</td>
                <td style="width: 15%;">99</td>
                <td style="width: 15%;">SL202308008</td>
                <td style="width: 15%;">1</td>
                <td style="width: 15%;">查看详情</td>
              </tr>
              <tr style="width: 100%;">
                <td style="width: 8%;">1</td>
                <td style="width: 15%;">沙发类</td>
                <td style="width: 17%;">￥ 500</td>
                <td style="width: 15%;">99</td>
                <td style="width: 15%;">SL202308008</td>
                <td style="width: 15%;">1</td>
                <td style="width: 15%;">查看详情</td>
              </tr>
              <tr style="width: 100%;">
                <td style="width: 8%;">1</td>
                <td style="width: 15%;">沙发类</td>
                <td style="width: 17%;">￥ 500</td>
                <td style="width: 15%;">99</td>
                <td style="width: 15%;">SL202308008</td>
                <td style="width: 15%;">1</td>
                <td style="width: 15%;">查看详情</td>
              </tr>
              <tr style="width: 100%;">
                <td style="width: 8%;">1</td>
                <td style="width: 15%;">沙发类</td>
                <td style="width: 17%;">￥ 500</td>
                <td style="width: 15%;">99</td>
                <td style="width: 15%;">SL202308008</td>
                <td style="width: 15%;">1</td>
                <td style="width: 15%;">查看详情</td>
              </tr>
              <tr style="width: 100%;">
                <td style="width: 8%;">1</td>
                <td style="width: 15%;">沙发类</td>
                <td style="width: 17%;">￥ 500</td>
                <td style="width: 15%;">99</td>
                <td style="width: 15%;">SL202308008</td>
                <td style="width: 15%;">1</td>
                <td style="width: 15%;">查看详情</td>
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

.container-img {
	position: relative;
	width: 100%;
	/* The size you want */
}

.container-img:after {
	content: "";
	display: block;
	padding-bottom: 100%;
	/* The padding depends on the width, not on the height, so with a padding-bottom of 100% you will get a square */
}

.container-img img {
	position: absolute;
	/* Take your picture out of the flow */
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	/* Make the picture taking the size of it's parent */
	width: 100%;
	/* This if for the object-fit */
	height: 100%;
	/* This if for the object-fit */
	object-fit: cover;
	/* Equivalent of the background-size: cover; of a background-image */
	object-position: center;
}
</style>
