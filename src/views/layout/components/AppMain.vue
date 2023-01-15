<template>
	<section :style="{ height: 995 * $root.dw + 'px' }" class="app-main">
		<transition name="fade-transform" mode="out-in">
			<keep-alive :include="cachedViews">
				<router-view :key="key" />
			</keep-alive>
		</transition>
	</section>
</template>

<script>
export default {
	name: 'AppMain',
	computed: {
		cachedViews() {
			return this.$store.state.tagsView.cachedViews
		},
		key() {
			return this.$route.fullPath
		}
	}
}
</script>

<style scoped>
.app-main {
	flex: 1;
  /*84 = navbar + tags-view = 50 +34 */
  /* min-height: calc(100vh - 84px); */
  width: 100%;
  /* position: fixed; */
  overflow-y: auto;
}
/* ::v-deep .el-table__fixed {
    height: auto !important;
    bottom: 10px;
  }
::v-deep .el-table__fixed-right {
      height: auto !important;
      bottom: 10px;
    } */
</style>

