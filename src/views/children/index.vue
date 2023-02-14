<template>
	<router-view />
	<!-- <keep-alive :include="cachedViews">
		<router-view :key="key" />
		</keep-alive> -->
</template>

<script>
export default {
	name: 'Children',
	// keep-alive无需在父组件keep-alive，在父父组件（AppMain）组件写就行，会自动把相应的子组件keep-alive的
	// 但是注意要在父父组件把父组件的name（Children）和子组件的name也写上
	computed: {
		cachedViews() {
			return this.$store.state.tagsView.cachedViews
		},
		key() {
			console.log(this.$route)
			return this.$route.fullPath
		}
	},
	activated() {
		console.log('激活a')
	},
	deactivated() {
		console.log('激活d')
	}
}
</script>

<style>

</style>
