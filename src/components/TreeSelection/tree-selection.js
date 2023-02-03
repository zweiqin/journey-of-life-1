import { cloneDeep } from 'lodash'
class TreeSelection {
  _c (treeData) {
    return cloneDeep(treeData)
  }
  /** @description 监听状态 向上传递 同步父级状态 */
  addListenerChange (treeData) {
    function setFlag (list) {
      for (const i of list) {
        const child = i.children
        if (child.length) {
          const num = count(child)
          i.selectFlag = num === child.length ? 2 : num ? 3 : 1
          setFlag(child)
        }
      }
      return list
    }
    function count (child) {
      let num = 0
      for (const i of child) {
        if (i.selectFlag === 2) {
          num += 1
        }
      }
      return num
    }
    return setFlag(treeData)
  }
  /** @description SET => 选中状态 */
  deepChange (treeData, selectFlag, type = 'all') {
    for (const i of treeData) {
      const child = i.children
      if (!i.system) {
        i.selectFlag = ['all', 'unCheck'].includes(type) ? selectFlag : i.selectFlag === 1 ? 2 : 1
      }
      if (child.length) this.deepChange(child, selectFlag, type)
    }
    return treeData
  }
  /** @description 取消选中 */
  _unCheck (treeData, item) {
    const vm = this
    function setUncheck (treeData, item, selectFlag) {
      for (const i of treeData) {
        const child = i.children
        if (i.field === item.field) {
          i.isActive = i.selectFlag = selectFlag
          if (child.length) vm.deepChange(child, selectFlag)
        }
        if (child.length) {
          setUncheck(child, item, selectFlag)
        }
      }
      return treeData
    }
    this.addListenerChange(setUncheck(treeData, item, 1))
  }
  /** @description  SET => 全选 (all) | 取消全选（unCheck）| 反选(invert) */
  _setChecked (treeData, flag, type) {
    return this._c(this.addListenerChange(this.deepChange(treeData, flag, type)))
  }
}
export default TreeSelection
