<template>
  <div
    :style="{
      width: '100%',
      height: '100%'
    }"
  >
    <div style="display: flex;justify-content: center;align-items: center;height: 11.62%;">
      <span :style="{ fontSize: 20 * $root.dw + 'px', fontWeight: 'bold', color: '#2ECFF9' }">营销管理</span>
    </div>
    <div style="height: 88.38%;">
      <div style="display: flex;justify-content: flex-end;align-items: center;height: 7.92%;margin: 10px 0;color: #FFFFFF;">
        <svg-icon icon-class="h-digit-article" style="margin-right: 5px;" />
        <span :style="{ fontSize: 14 * $root.dw + 'px' }" style="margin-right: 5px;">文章类型</span>
        <i :style="{ fontSize: 16 * $root.dw + 'px' }" style="margin-right: 18px;" class="el-icon-arrow-up"></i>
      </div>
      <div class="digit-marketing-text" style="display: flex;flex-direction: column;align-items: center;height: 80%;overflow-y: auto;">
        <div
          style="display: flex;justify-content: space-between;width: 94%;padding: 6px 17.5px 6px 21px;background: #1B1A6A;"
        >
          <div :style="{ flex: 1, width: 0, fontSize: 14 * $root.dw + 'px' }">
            <div style="color: #FFFFFF;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;-o-text-overflow: ellipsis;"><span>怎样开汽车维修保养加盟店，才能吸引到更多顾客？</span></div>
            <div style="color: #2ECFF9;margin-top: 6px;"><span>2022-10-28 18:05:08</span></div>
          </div>
          <div
            style="display: flex;flex-direction: column;justify-content: center;padding: 4px 22px;cursor: pointer;border-radius: 2px;background: linear-gradient(180deg, #1B1A6A 0%, #033CA7 44%, #1B1A6A 100%);border: 0.5px solid;border-image: linear-gradient(180deg, #FFFFFF 0%, #91B0F0 48%, #FFFFFF 100%) 0.5;color: #2ECFF9;"
            :style="{ fontSize: 16 * $root.dw + 'px' }"
          >
            已读
          </div>
        </div>
        <div
          style="display: flex;justify-content: space-between;width: 94%;padding: 6px 17.5px 6px 21px;background: #1B1A6A;"
        >
          <div :style="{ flex: 1, width: 0, fontSize: 14 * $root.dw + 'px' }">
            <div style="color: #FFFFFF;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;-o-text-overflow: ellipsis;"><span>怎样开汽车维修保养加盟店，才能吸引到更多顾客？</span></div>
            <div style="color: #2ECFF9;margin-top: 6px;"><span>2022-10-28 18:05:08</span></div>
          </div>
          <div
            style="display: flex;flex-direction: column;justify-content: center;padding: 4px 22px;cursor: pointer;border-radius: 2px;background: linear-gradient(180deg, #1B1A6A 0%, #033CA7 44%, #1B1A6A 100%);border: 0.5px solid;border-image: linear-gradient(180deg, #FFFFFF 0%, #91B0F0 48%, #FFFFFF 100%) 0.5;color: #2ECFF9;"
            :style="{ fontSize: 16 * $root.dw + 'px' }"
          >
            已读
          </div>
        </div>
        <div
          style="display: flex;justify-content: space-between;width: 94%;padding: 6px 17.5px 6px 21px;background: #1B1A6A;"
        >
          <div :style="{ flex: 1, width: 0, fontSize: 14 * $root.dw + 'px' }">
            <div style="color: #FFFFFF;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;-o-text-overflow: ellipsis;"><span>怎样开汽车维修保养加盟店，才能吸引到更多顾客？</span></div>
            <div style="color: #2ECFF9;margin-top: 6px;"><span>2022-10-28 18:05:08</span></div>
          </div>
          <div
            style="display: flex;flex-direction: column;justify-content: center;padding: 4px 22px;cursor: pointer;border-radius: 2px;background: linear-gradient(180deg, #1B1A6A 0%, #033CA7 44%, #1B1A6A 100%);border: 0.5px solid;border-image: linear-gradient(180deg, #FFFFFF 0%, #91B0F0 48%, #FFFFFF 100%) 0.5;color: #FA5151;"
            :style="{ fontSize: 16 * $root.dw + 'px' }"
          >
            未读
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
    }
  },
  watch: {
  },
  updated() {
  },
  mounted() {
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
.digit-marketing-button {
	font-weight: bold;
	color: #16EDFF;
	background: linear-gradient(180deg, #1B1A6A 0%, #033CA7 44%, #1B1A6A 100%);
	border: 0.5px solid;
	border-radius: 2px;
	border-image: linear-gradient(180deg, #3662EC 0%, #91B0F0 48%, #3662EC 100%) 0.5;
}

.digit-marketing-text {
	&>div:nth-child(n + 2) {
		margin-top: 20px;
	}
}
</style>
