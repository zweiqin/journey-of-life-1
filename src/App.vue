<template>
  <div id="app">
    <router-view />
    <audio id="eventAudio" ref="audio" muted hidden src></audio>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      isShow: true
    }
  },
  created() {
    this.$store.dispatch('GET_RegionList')
  },
  methods: {

  }
}
</script>
