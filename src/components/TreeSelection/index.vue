
<!----------------------------------------------------------------------------------
about：树选择
----------------------------------------------------------------------------------->
<template>
  <div class="jufeng-deep-box-wrap">
    <div class="deep-box-no-children" v-for="item in fields.filter(item => !item.children.length)" :key="item.field">
      <div class="check-item" :class="{ disabled: item.system }" :style="{color: colors[item.level - 2]}" @click.stop="item.system ? '' : checkChange(item)">
        <span class="check-box-pointer" :class="{ checked: item.selectFlag === 2 }" />
        {{ item.alias || item.title || item.label }}
      </div>
    </div>
    <div class="deep-box-has-children" v-for="item in fields.filter(item => item.children.length)" :key="item.field">
      <div class="check-item" :style="{color: colors[item.level - 1], fontWeight: item.level === 1 ? 'bold' : ''}" @click.stop="checkChange(item, true)">
        <span class="check-box-pointer" :class="{ checked: item.selectFlag === 2, indeterminate: item.selectFlag === 3 }" />
        {{ item.alias || item.title || item.label }}
      </div>
      <tree-selection :fields="item.children" :style="{ paddingLeft: 24 + 'px' }" @ochange="ochange(item)" @change="change"></tree-selection>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TreeSelection',
  model: 'menu',
  props: {
    fields: {
      type: Array,
      default: () => []
    },
    isBtn: Boolean
  },
  data () {
    return {
      colors: ['rgba(0, 0, 0, 0.85)', '#333', '#555', '#555', '#555']
    }
  },
  methods: {
    /** @param  selectFlag 1 未选中 2选中 3 半选 */
    checkChange (item, deep = false) {
      const flag = item.selectFlag === 3 ? 2 : item.selectFlag === 1 ? 2 : 1
      item.selectFlag = flag
      if (deep) {
        this.deepChange(item.children, flag)
      }
      this.$emit('ochange')
      this.$emit('change', item)
      setTimeout(() => {
        this.$forceUpdate()
      }, 0)
    },
    // 向下传递
    deepChange (data, flag) {
      for (const i of data) {
        i.selectFlag = flag
        if (i.children.length) {
          this.deepChange(i.children, flag)
        }
      }
    },
    change (item) {
      this.$emit('change', item)
    },
    // 向上传递
    ochange (val) {
      let count = 0
      for (const i of val.children) {
        if (i.selectFlag === 2) {
          count += 1
        }
      }
      val.selectFlag = count === val.children.length ? 2 : count ? 3 : 1
      this.$emit('ochange')
    }
  }
}
</script>

<style lang="scss" scoped>

.jufeng-deep-box-wrap {
  display: flex;
  flex-wrap: wrap;
  margin-top: 16px;
}
.deep-box-no-children {
  width: 33.3%;
  flex-shrink: 0;
  margin-bottom: 16px;
}
.deep-box-has-children {
  width: 100%;
}
</style>

<style lang="scss">
$primary-color: #409EFF;
.jufeng-deep-box-wrap {
  .check-item {
    display: flex;
    align-items: center;
    cursor: pointer;
    font-size: 12px;
    color: rgba(0, 0, 0, .75);
    padding-left: 0;
    height: auto;
    line-height: normal;
    &.disabled {
      cursor: not-allowed;
      color: rgba(0,0,0,.25);
      .check-box-pointer {
        background-color: #f5f5f5;
        border-color: #d9d9d9!important;
        &.checked {
          border-color: #d9d9d9!important;
          background-color: #f5f5f5;
          &::after {
            border-color: rgba(0,0,0,.25);
          }
        }
      }
    }
    &:hover {
      background-color: #fff;
    }
    .check-box-pointer {
      margin-right: 8px;
      border: 1px solid #D9D9D9;
      width: 14px;
      height: 14px;
      display: block;
      background: #fff;
      outline: none;
      font-feature-settings: "tnum";
      cursor: pointer;
      box-sizing: border-box;
      border-radius: 2px;
      transition: all 0.25s;
      position: relative;
      flex: none;
      &::after {
        box-sizing: content-box;
        position: absolute;
        display: table;
        border: 1px solid #fff;
        border-top: 0;
        border-left: 0;
        transform: rotate(45deg) scale(1) translate(-50%,-50%);
        opacity: 1;
        transition: all .2s cubic-bezier(.12,.4,.29,1.46) .1s;
        transform-origin: center;
        content: " ";
        width: 3px;
        height: 7px;
        left: 3px;
        top: 5px;
      }
      &.indeterminate {
        &::after {
          top: 50%;
          left: 50%;
          width: 8px;
          height: 8px;
          background-color: $primary-color;
          border: 0;
          -webkit-transform: translate(-50%, -50%) scale(1);
          transform: translate(-50%, -50%) scale(1);
          transition: all .1s cubic-bezier(.71,-.46,.88,.6),opacity .1s;
          opacity: 1;
          content: ' ';
        }
      }
      &.checked {
        background: $primary-color;
        border-color: $primary-color;
      }
      &:hover {
        border-color: $primary-color;
      }
    }
  }
}
</style>
