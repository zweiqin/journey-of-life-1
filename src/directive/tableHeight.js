import Vue from 'vue'

// v-tableHeight: table自适应高度
Vue.directive('tableHeight', {
  update: function (el, binding) {
    function changeElHeight() {
      let height = 0;
      if (!binding.value) {
        const navbarHeight = 46;
        const tabsHeight = 62;
        const searchHeight = document.querySelector('.app-container>.filter-container') ? document.querySelector('.app-container>.filter-container').offsetHeight : 0;
        const pageHeight = document.querySelector('.app-container>.pagination-container') ? 75 : 20;
        const otherHeight = document.querySelector('.app-container>.other-container') ? document.querySelector('.app-container>.other-container').offsetHeight : 0;
        height = navbarHeight + tabsHeight + searchHeight + pageHeight + otherHeight
      } else {
        height = binding.value
      }
      el.style.height = `${window.innerHeight - height > 230 ? window.innerHeight - height : 230}px`
    }
    changeElHeight()
    window.onresize = () => {
      changeElHeight()
    }
  }
})
