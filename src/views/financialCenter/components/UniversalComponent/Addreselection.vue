<template>
  <div class="addresComponents">
    <span class="addresText">{{ listQuery.region_arr[0] }}</span>
    <!-- element选择器组件 其中value定义了每次选择的值，将值绑定到 listQuery.region_arr中
      可以选择将哪个属性绑定起来 如这里我选择的是name，也就是选择的地区的名字，也可以选择其他属性，比如对应着第七区码的code等。
      数据由vuex获取，以计算属性转化。 -->
    <el-cascader
      v-model="listQuery.region_arr" placeholder="选择区域" :options="[{ id: 0, name: '全国', code: 0 }, ...common_regionList]" :props="{
        checkStrictly: true,
        label: 'name',
        value: 'name',
        expandTrigger: 'hover'
      }"
      class="filter-item" style="width: 7.8125vw"
      @change="handleAddressChange"
    />
  </div>
</template>

<script>
// vuex展开数据的方法
import { mapGetters } from 'vuex'
export default {
  name: 'Addreselection',
  data() {
    return {
      value: '全国',
      listQuery: {
        region_arr: [ '全国' ]
      }
    }
  },
  computed: {
    ...mapGetters([ 'common_regionList' ])
  // addresText: {
  //   get() {
  //     let addres
  //     this.listQuery.region_arr.forEach((item) => {
  //       addres[0]
  //     })
  //     return addres
  //   }
  // }
  },
  methods: {
    handleAddressChange(e) {
      this.$emit('change', this.listQuery.region_arr.join(''))
    }
  }
}
</script>

<style lang="scss">
.addresText {
	height: 1.4583vw;
	line-height: 1.4583vw;
	display: inline-block;
	align-items: center;
	padding: 0px 0.625vw;
	background: rgba(77, 112, 255, 0.08);
	font-size: 0.7292vw;
	font-weight: normal;
	letter-spacing: 0em;
	color: #0519d4;
}
</style>
