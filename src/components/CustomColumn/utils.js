import Vue from 'vue'
/**
 * vueTable的resizableChange 后会记录当前表格的每列宽度缓存到本地，若需要保留用户的调整表格列宽操作， 可通过此方法更新width字段
 * @param {*} columns
 * @returns
 */
export function resizableRegain (localKey = '', columns) {
  function resizableRegainLoop (resizeConfig, columns) {
    for (const i of columns) {
      const index = resizeConfig.findIndex(item => item.field === i.field)
      if (index > -1) {
        i.width = resizeConfig[index].resizeWidth
        resizeConfig.splice(index, 1)
      }
      if (resizeConfig.length && Array.isArray(i.children) && i.children.length) {
        resizableRegainLoop(resizeConfig, i.children)
      }
    }
    return columns
  }
  const __resizeConfig = Vue.ls.get(localKey + '_resizeConfig')
  if (!__resizeConfig) return columns
  return resizableRegainLoop(__resizeConfig, columns)
}
