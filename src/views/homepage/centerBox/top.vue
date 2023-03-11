<template>
  <div
    :style="{
      width: '100%',
      height: '100%'
    }"
  >
    <div style="display: flex;flex-direction: column;width: 100%;height: 100%;">
      <div
        style="width: 100%;height: 100%;padding: 2px 4px 2px;color: #2ECFF9;"
        :style="{ fontSize: 16 * $root.dw + 'px' }"
      >
        <div style="display: flex;justify-content: space-between;width: 100%;height: 100%;">
          <div style="height: 100%;">
            <div style="height: 100%;" class="container-img">
              <img height="100%" src="@/assets/image/digit-vacancy-sphere.png" alt />
            </div>
          </div>
          <div style="display: flex;flex-direction: column;justify-content: space-between;width: 30%;padding: 16px 0;">
            <div style="display: flex;justify-content: space-between;">
              <div>用户总数（个）</div>
              <div style="color: #FFFFFF;">1021</div>
            </div>
            <div style="height: 1px;background: linear-gradient(270deg, #132c73 0%, #596a8f 54%, #18307e 100%);"></div>
            <div style="display: flex;justify-content: space-between;">
              <div>营业总额（元）</div>
              <div style="color: #FFFFFF;">655312</div>
            </div>
            <div style="height: 1px;background: linear-gradient(270deg, #132c73 0%, #596a8f 54%, #18307e 100%);"></div>
            <div style="display: flex;justify-content: space-between;">
              <div>销售总额（元）</div>
              <div style="color: #FFFFFF;">6523</div>
            </div>
            <div style="height: 1px;background: linear-gradient(270deg, #132c73 0%, #596a8f 54%, #18307e 100%);"></div>
          </div>
          <div style="height: 100%;">
            <div style="height: 100%;" class="container-img container-img-cloud">
              <img height="100%" src="@/assets/image/digit-cloud.png" alt />
            </div>
          </div>
          <div style="display: flex;flex-direction: column;justify-content: space-between;width: 20%;padding: 16px 0;">
            <div style="display: flex;justify-content: space-between;">
              <div style="color: #FFC300;">多云</div>
              <div style="color: #FFFFFF;">22度</div>
            </div>
            <div style="height: 1px;background: linear-gradient(270deg, #132c73 0%, #596a8f 54%, #18307e 100%);"></div>
            <div style="display: flex;justify-content: space-between;">
              <div>湿度</div>
              <div style="color: #FFFFFF;">30%</div>
            </div>
            <div style="height: 1px;background: linear-gradient(270deg, #132c73 0%, #596a8f 54%, #18307e 100%);"></div>
            <div style="display: flex;justify-content: space-between;">
              <div>空气质量</div>
              <div style="color: #FFFFFF;">良</div>
            </div>
            <div style="height: 1px;background: linear-gradient(270deg, #132c73 0%, #596a8f 54%, #18307e 100%);"></div>
          </div>
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
</style>
