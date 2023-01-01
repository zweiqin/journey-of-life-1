<template>
  <div
    role="progressbar"
    aria-valuenow="100"
    aria-valuemin="0"
    aria-valuemax="100"
    class="el-progress el-progress--circle flex flex-center-center"
    :style="{height: height + 'px', width: width +'px'}"
  >
    <div class="el-progress-circle" :style="{height: height + 'px', width: width +'px'}">
      <svg viewBox="0 0 100 100">
        <path
          d="
        M 50 50
        m 0 -47
        a 47 47 0 1 1 0 94
        a 47 47 0 1 1 0 -94
        "
          stroke="#e5e9f2"
          stroke-width="4.8"
          fill="none"
          class="el-progress-circle__track"
          style="stroke-dasharray: 295.31px, 295.31px; stroke-dashoffset: 0px;"
        />
        <path
          d="
        M 50 50
        m 0 -47
        a 47 47 0 1 1 0 94
        a 47 47 0 1 1 0 -94
        "
          stroke="#20a0ff"
          fill="none"
          stroke-linecap="round"
          stroke-width="4.8"
          class="el-progress-circle__path"
          style="stroke-dasharray: 295.31px, 295.31px; stroke-dashoffset: 0px; transition: stroke-dasharray 0.6s ease 0s, stroke 0.6s ease 0s;"
        />
      </svg>
    </div>
    <div class="el-progress__text" style="font-size: 16px;">100%</div>
  </div>
</template>

<script>
export default {
  props: {
    // 宽
    width: {
      type: [String, Number],
      default: 146
    },
    // 高
    height: {
      type: [String, Number],
      default: 146
    }
  }
}
</script>

<style lang='scss' scoped>
.el-progress {
  background-color: #fff;
}
</style>
