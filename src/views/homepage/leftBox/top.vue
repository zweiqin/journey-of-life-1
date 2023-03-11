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
        style="display: flex;justify-content: space-between;width: 100%;margin-top: 2px;padding: 0 10px 8px;color: #2ECFF9;"
        :style="{ fontSize: 16 * $root.dw + 'px' }"
      >
        <div style="display: flex;flex-direction: column;width: 33.3%;">
          <div :style="{ fontSize: 14 * $root.dw + 'px' }" style="width: fit-content;margin-top: 3px;margin-left: 6px;padding: 8px;border: 1px solid;border-image: linear-gradient(180deg, #1a1f4d 0%, #727592 54%, #1a1f4d 100%) 12 / 4 / 0 stretch;clip-path: polygon(0 0, 100% 0, 94% 100%, 6% 100%);">信息哨兵</div>
          <div style="flex: 1;height: 0;display: flex;align-items: center;width: 100%;margin-top: 1px;margin-right: 4px;">
            <div style="width: 30%;">
              <div class="container-img">
                <img src="@/assets/image/digit-complete-sphere.png" alt />
              </div>
            </div>
            <div
              :style="{ fontSize: 10 * $root.dw + 'px' }"
              style="display: flex;flex-direction: column;justify-content: space-between;width: 70%;padding: 6px;background: rgba(19, 31, 83, 0.5);border-radius: 5px;border: 0.5px solid;border-image: linear-gradient(0deg, #1a1f4d -3%, #727592 48%, #1a1f4d 100%) 0.5;"
            >
              <div>客户数：200个</div>
              <div>合伙人：10个</div>
              <div>收集：90个</div>
              <div>转换：80个</div>
              <div>追销：20个</div>
            </div>
          </div>
        </div>
        <div style="display: flex;flex-direction: column;width: 33.3%;">
          <div :style="{ fontSize: 14 * $root.dw + 'px' }" style="width: fit-content;margin-top: 3px;margin-left: 6px;padding: 8px;border: 1px solid;border-image: linear-gradient(180deg, #1a1f4d 0%, #727592 54%, #1a1f4d 100%) 12 / 4 / 0 stretch;clip-path: polygon(0 0, 100% 0, 94% 100%, 6% 100%);">业绩哨兵</div>
          <div style="flex: 1;height: 0;display: flex;align-items: center;width: 100%;margin-top: 1px;margin-right: 4px;">
            <div style="width: 30%;">
              <div class="container-img">
                <img src="@/assets/image/digit-complete-sphere.png" alt />
              </div>
            </div>
            <div
              :style="{ fontSize: 10 * $root.dw + 'px' }"
              style="display: flex;flex-direction: column;justify-content: space-between;width: 70%;padding: 6px;background: rgba(19, 31, 83, 0.5);border-radius: 5px;border: 0.5px solid;border-image: linear-gradient(0deg, #1a1f4d -3%, #727592 48%, #1a1f4d 100%) 0.5;"
            >
              <div>门店业绩:￥1000</div>
              <div>个人业绩:￥700</div>
              <div>活动业绩:￥300</div>
            </div>
          </div>
        </div>
        <div style="display: flex;flex-direction: column;width: 33.3%;">
          <div :style="{ fontSize: 14 * $root.dw + 'px' }" style="width: fit-content;margin-top: 3px;margin-left: 6px;padding: 8px;border: 1px solid;border-image: linear-gradient(180deg, #1a1f4d 0%, #727592 54%, #1a1f4d 100%) 12 / 4 / 0 stretch;clip-path: polygon(0 0, 100% 0, 94% 100%, 6% 100%);">业务管理</div>
          <div style="flex: 1;height: 0;display: flex;align-items: center;width: 100%;margin-top: 1px;margin-right: 4px;">
            <div style="width: 30%;">
              <div class="container-img">
                <img src="@/assets/image/digit-complete-sphere.png" alt />
              </div>
            </div>
            <div
              :style="{ fontSize: 10 * $root.dw + 'px' }"
              style="display: flex;flex-direction: column;justify-content: space-between;width: 70%;padding: 6px;background: rgba(19, 31, 83, 0.5);border-radius: 5px;border: 0.5px solid;border-image: linear-gradient(0deg, #1a1f4d -3%, #727592 48%, #1a1f4d 100%) 0.5;"
            >
              <div>总客户数：200个</div>
              <div>开发：100个</div>
              <div>潜在：70个</div>
              <div>VIP：30个</div>
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
                <th style="width: 15%;">客户姓名</th>
                <th style="width: 7%;">性别</th>
                <th style="width: 30%;">电话</th>
                <th style="width: 20%;">状态</th>
                <th style="width: 20%;">开单时间</th>
              </tr>
            </thead>
            <tbody :style="{ fontSize: 12 * $root.dw + 'px' }" style="flex: 1;overflow-y: auto;width: 100%;">
              <tr style="width: 100%;">
                <td style="width: 8%;">1</td>
                <td style="width: 15%;">王安石</td>
                <td style="width: 7%;">男</td>
                <td style="width: 30%;">18888888888</td>
                <td style="width: 20%;">收集</td>
                <td style="width: 20%;">2023-08-08</td>
              </tr>
              <tr style="width: 100%;">
                <td style="width: 8%;">1</td>
                <td style="width: 15%;">王安石</td>
                <td style="width: 7%;">男</td>
                <td style="width: 30%;">18888888888</td>
                <td style="width: 20%;">收集</td>
                <td style="width: 20%;">2023-08-08</td>
              </tr>
              <tr style="width: 100%;">
                <td style="width: 8%;">1</td>
                <td style="width: 15%;">王安石</td>
                <td style="width: 7%;">男</td>
                <td style="width: 30%;">18888888888</td>
                <td style="width: 20%;">收集</td>
                <td style="width: 20%;">2023-08-08</td>
              </tr>
              <tr style="width: 100%;">
                <td style="width: 8%;">1</td>
                <td style="width: 15%;">王安石</td>
                <td style="width: 7%;">男</td>
                <td style="width: 30%;">18888888888</td>
                <td style="width: 20%;">收集</td>
                <td style="width: 20%;">2023-08-08</td>
              </tr>
              <tr style="width: 100%;">
                <td style="width: 8%;">1</td>
                <td style="width: 15%;">王安石</td>
                <td style="width: 7%;">男</td>
                <td style="width: 30%;">18888888888</td>
                <td style="width: 20%;">收集</td>
                <td style="width: 20%;">2023-08-08</td>
              </tr>
              <tr style="width: 100%;">
                <td style="width: 8%;">1</td>
                <td style="width: 15%;">王安石</td>
                <td style="width: 7%;">男</td>
                <td style="width: 30%;">18888888888</td>
                <td style="width: 20%;">收集</td>
                <td style="width: 20%;">2023-08-08</td>
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
    // this.$nextTick(() => {
    //   this.infinitScroll()
    // })
  },
  beforeDestroy() {
    this.$bus.$off('makeAppointmentPatientsObj')
  },
  methods: {
    // infinitScroll() {
    //   // 拿到表格挂载后的真实DOM
    //   const table = this.$refs.table
    //   // 拿到表格中承载数据的div元素
    //   const divData = table.bodyWrapper
    //   divData.onmouseover = function () {
    //     clearInterval(t)
    //   } // 鼠标移入，停止滚动
    //   divData.onmouseout = function () {
    //     start()
    //   } // 鼠标移出，继续滚动
    //   // 拿到元素后，对元素进行定时增加距离顶部距离，实现滚动效果(此配置为每100毫秒移动1像素)
    //   let t
    //   function start() {
    //     // 数据少于表格高度停止滚动
    //     if (divData.clientHeight >= divData.scrollHeight) {
    //       return
    //     }
    //     t = setInterval(() => {
    //       // 元素自增距离顶部1像素
    //       divData.scrollTop += 1
    //       // 判断元素是否滚动到底部(可视高度+距离顶部=整个高度)
    //       if (divData.clientHeight + divData.scrollTop == divData.scrollHeight) {
    //         // 重置table距离顶部距离
    //         divData.scrollTop = 0
    //       }
    //     }, 100)
    //   }
    //   start()
    // },
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
