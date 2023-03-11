<template>
  <div
    :style="{
      width: '100%',
      height: '100%'
    }"
  >
    <div style="display: flex;justify-content: center;align-items: center;height: 11.62%;">
      <span :style="{ fontSize: 20 * $root.dw + 'px', fontWeight: 'bold', color: '#2ECFF9' }">会员系统</span>
    </div>
    <div style="display: flex;flex-direction: column;width: 100%;height: 88.38%;">
      <div
        style="display: flex;justify-content: space-between;width: 100%;margin-top: 2px;padding: 0 20px 20px;color: #2ECFF9;"
        :style="{ fontSize: 16 * $root.dw + 'px' }"
      >
        <div style="width: 22%;margin-top: 4px;margin-left: 20px;">
          <div class="container-img">
            <img src="@/assets/image/digit-bug-sphere.png" alt />
          </div>
        </div>
        <div
          style="display: flex;flex-direction: column;justify-content: space-evenly;width: 45%;margin-top: 15px;padding: 0 15px;background: rgba(19, 31, 83, 0.5);border-radius: 5px;border: 0.5px solid;border-image: linear-gradient(0deg, #1a1f4d -3%, #727592 48%, #1a1f4d 100%) 0.5;"
        >
          <div style="display: flex;justify-content: space-between;">
            <div>总会员数量（个）</div>
            <div style="color: #FFFFFF;">569</div>
          </div>
          <div style="display: flex;justify-content: space-between;">
            <div>总会员剩余额度</div>
            <div style="color: #FFFFFF;">562035</div>
          </div>
        </div>
        <div style="display: flex;justify-content: flex-end;margin-top: 15px;color: #FFFFFF;">
          <span :style="{ fontSize: 14 * $root.dw + 'px' }" style="margin-right: 5px;">筛选</span>
          <i :style="{ fontSize: 16 * $root.dw + 'px' }" style="margin-right: 2px;" class="el-icon-arrow-up"></i>
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
                <th style="width: 13%;">付款金额</th>
                <th style="width: 17%;">开单时间</th>
              </tr>
            </thead>
            <tbody :style="{ fontSize: 12 * $root.dw + 'px' }" style="flex: 1;overflow-y: auto;width: 100%;">
              <tr style="width: 100%;">
                <td style="width: 8%;">1</td>
                <td style="width: 15%;">王安石</td>
                <td style="width: 7%;">男</td>
                <td style="width: 20%;">18888888888</td>
                <td style="width: 20%;">SL202308008</td>
                <td style="width: 13%;">8888</td>
                <td style="width: 17%;">2023-08-08</td>
              </tr>
              <tr>
                <td style="width: 8%;">1</td>
                <td style="width: 15%;">王安石</td>
                <td style="width: 7%;">男</td>
                <td style="width: 20%;">18888888888</td>
                <td style="width: 20%;">SL202308008</td>
                <td style="width: 13%;">8888</td>
                <td style="width: 17%;">2023-08-08</td>
              </tr>
              <tr>
                <td style="width: 8%;">1</td>
                <td style="width: 15%;">王安石</td>
                <td style="width: 7%;">男</td>
                <td style="width: 20%;">18888888888</td>
                <td style="width: 20%;">SL202308008</td>
                <td style="width: 13%;">8888</td>
                <td style="width: 17%;">2023-08-08</td>
              </tr>
              <tr>
                <td style="width: 8%;">1</td>
                <td style="width: 15%;">王安石</td>
                <td style="width: 7%;">男</td>
                <td style="width: 20%;">18888888888</td>
                <td style="width: 20%;">SL202308008</td>
                <td style="width: 13%;">8888</td>
                <td style="width: 17%;">2023-08-08</td>
              </tr>
              <tr>
                <td style="width: 8%;">1</td>
                <td style="width: 15%;">王安石</td>
                <td style="width: 7%;">男</td>
                <td style="width: 20%;">18888888888</td>
                <td style="width: 20%;">SL202308008</td>
                <td style="width: 13%;">8888</td>
                <td style="width: 17%;">2023-08-08</td>
              </tr>
              <tr>
                <td style="width: 8%;">1</td>
                <td style="width: 15%;">王安石</td>
                <td style="width: 7%;">男</td>
                <td style="width: 20%;">18888888888</td>
                <td style="width: 20%;">SL202308008</td>
                <td style="width: 13%;">8888</td>
                <td style="width: 17%;">2023-08-08</td>
              </tr>
              <tr>
                <td style="width: 8%;">1</td>
                <td style="width: 15%;">王安石</td>
                <td style="width: 7%;">男</td>
                <td style="width: 20%;">18888888888</td>
                <td style="width: 20%;">SL202308008</td>
                <td style="width: 13%;">8888</td>
                <td style="width: 17%;">2023-08-08</td>
              </tr>
              <tr>
                <td style="width: 8%;">1</td>
                <td style="width: 15%;">王安石</td>
                <td style="width: 7%;">男</td>
                <td style="width: 20%;">18888888888</td>
                <td style="width: 20%;">SL202308008</td>
                <td style="width: 13%;">8888</td>
                <td style="width: 17%;">2023-08-08</td>
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
    this.tableData = []
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
	padding-bottom: 107%;
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
