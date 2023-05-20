<!-- eslint-disable vue/custom-event-name-casing -->
<template>
  <!-- <div>  -->
  <el-cascader
    placeholder="网点区域"
    v-model="selectedOptions"
    :options="options"
    :props="props"
    @change="handleChange"
  >
  </el-cascader>
  <!-- {{ selectedOptions = Address }} -->
  <!-- </div>  -->
</template>

<script>
import res from './index'
export default {
  name: 'AddresSelsect',
  props: [ 'Address' ],
  data() {
    return {
      getData: res,
      options: [],
      props: {
        checkStrictly: true,
        value: 'text',
        label: 'text',
        children: 'children'
      },
      selectedOptions: this.Address
    }
  },
  watch: {
    Address(val) {
      this.selectedOptions = val
      console.log(this.selectedOptions)
    }
  },
  created() {
    const t1 = new Date() // t1 - 开始时间
    // 一级地址
    const arr1 = []
    for (const [k1, v1] of Object.entries(this.getData)) {
      const arr2 = []
      // 二级地址
      for (const [k2, v2] of Object.entries(v1)) {
        // 三级地址
        const arr3 = []
        for (const [k3, v3] of Object.entries(v2)) {
          // arr3.push({ text: k3 })
          // 四级地址
          const arr4 = []
          v3.map((v4, k4) => {
            arr4.push({ text: v4 })
          })
          arr4.length === 0
            ? arr3.push({ text: k3 })
            : arr3.push({ text: k3, children: arr4 })
        }
        arr3.length === 0
          ? arr2.push({ text: k2 })
          : arr2.push({ text: k2, children: arr3 })
      }
      arr2.length === 0
        ? arr1.push({ text: k1 })
        : arr1.push({ text: k1, children: arr2 })
    }
    // console.log(arr1)
    this.options = arr1
    const t2 = new Date() // t2 - 结束时间
    console.log('SelectAddress加载时间：' + (t2 - t1))
  },
  methods: {
    handleChange(val) {
      // console.log(val)
      this.$emit('addresSelect', val)
    }
  }
  // beforeUpdate: function () {
  //   console.log('子组件内', this.Address)
  //   this.$nextTick(function () {
  //     this.selectedOptions = [
  //       this.Address.Province,
  //       this.Address.City,
  //       this.Address.Area,
  //       this.Address.Street
  //     ]
  //   })
  // }
}
</script>
