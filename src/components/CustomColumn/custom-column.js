
/* ---------------------------------------------------------------------------------------
about：处理自定义字段
* ---------------------------------------------------------------------------------------- */
import Vue from 'vue'
import TreeSelection from '../TreeSelection/tree-selection'
class CustomColumn extends TreeSelection {
  constructor (fields) {
    super()

    const { localKey, fieldKey, columns, sourceColumns, defaultFields } = fields

    const { newColumns, newDefault } = this.setBaseFields(0, super._c(columns), defaultFields)

    this.localKey = localKey // localKey 存在执行读取本地配置

    this.fieldKey = fieldKey // 请求标识 （后端根据此标识找对应的JSON）

    this.columns = newColumns // 左侧Columns

    this.sourceColumns = sourceColumns // 源数据

    this.defaultFields = newDefault // 默认字段

    this.lastColumns = [] // 右侧Columns

    this.tableColumns = [] // 表格columns

    this.initData() // 初始化init
  }
  /**
   * @description 生成勾选结构
   * @param Array [columns @type => Array, source @type => Array]
   * @return Array
   **/
  initData () {
    this.sourceColumns = this.localKey ? this.getLocalConfig() : this.sourceColumns
    const selectData = this.sourceColumns.length ? this.sourceColumns : this.defaultFields
    this.columns = super.addListenerChange(this.change(this.columns, selectData))
    this.lastColumns = this.sort(super._c(this.columns))
    this.tableColumns = this.createdColumn(super._c(this.lastColumns))
  }
  /**
   * @description 合并公共字段
   * @param Array { columns, defaultFields, newDefaultFields } @param Number deep
   * @return Array
   **/

  setBaseFields (deep = 0, columns, defaultFields, newDefaultFields = []) {
    deep++
    for (let i = 0, len = columns.length; i < len; i++) {
      const child = columns[i].children
      const base = {
        sort: i,
        level: deep,
        selectFlag: 1,
        isActive: true,
        fixed: columns[i].fixed || undefined,
        children: columns[i].children || []
      }
      Object.assign(
        columns[i],
        base
      )
      if (defaultFields.includes(columns[i].field)) {
        newDefaultFields.push({
          ...base,
          field: columns[i].field,
          selectFlag: 2
        })
      }
      if (child && child.length) {
        this.setBaseFields(deep, child, defaultFields, newDefaultFields)
      }
    }
    return {
      newColumns: columns,
      newDefault: newDefaultFields
    }
  }

  /** @description resetDefault 恢复默认字段 */
  resetDefault () {
    const defaultFields = this._c(this.defaultFields)
    this.columns = super.addListenerChange(this.change(this.columns, defaultFields))
    this.lastColumns = this.sort(super._c(this.columns))
    return {
      columns: this.columns,
      lastColumns: this.lastColumns
    }
  }
  /** @description 生成表头列 */
  createdColumn (columns) {
    for (let i = 0; i < columns.length; i++) {
      const child = columns[i].children
      if (child.length) {
        this.createdColumn(child)
      }
      if (columns[i].selectFlag === 1) {
        columns.splice(i--, 1)
      }
    }
    return columns
  }
  /**
   * @description 找出已选中字段, 改变回显
   * @param Array
   * @return Array
   **/

  change (columns, sourceData) {
    for (const i of columns) {
      const index = sourceData.findIndex(row => row.field === i.field)
      if (index > -1) {
        Object.assign(i, sourceData[index])
      } else {
        i.selectFlag = 1
      }
      if (i.children.length) {
        this.change(i.children, sourceData)
      }
    }
    return columns
  }

  /** @description target 发生改变 更新 */
  update (item) {
    const listData = this._c(this.lastColumns)
    // 找到原元素删除 把改变后的元素插入至末尾
    function insert (list, target) {
      for (let i = 0, len = list.length; i < len; i++) {
        if (list[i].field === target.field) {
          if (target.fixed) {
            Object.assign(list[i], target)
          } else {
            const _target = Object.assign(
              list.splice(i, 1)[0],
              item
            )
            list.push(_target)
          }
        }
        const child = list[i].children
        if (child.length) insert(child, target)
      }
      return list
    }
    const newLastColumns = super.addListenerChange(insert(listData, item))
    this.get(newLastColumns)
    return newLastColumns
  }

  /** @description 取消选中 */
  unCheck (item) {
    return super._unCheck(this.columns, item)
  }

  /** @description SET => 全选 (all) | 取消全选（unCheck）| 反选(invert) */
  setChecked (flag, type) {
    this.lastColumns = super._setChecked(this.columns, flag, type)
    return this.lastColumns
  }

  /** @description 保存 */
  save () {
    const params = []
    const mapTree = (list, checkList) => {
      list.forEach((element, index) => {
        let { sort } = element
        const { field, fixed, selectFlag, children } = element
        sort = index
        selectFlag !== 1 && checkList.push({
          field,
          fixed,
          sort,
          selectFlag
        })
        if (children.length) mapTree(children, checkList)
      })
      return checkList
    }
    const data = mapTree(this.lastColumns, params)
    this.localKey && this.setLocalConfig(data)
    return {
      data,
      tableColumns: this.createdColumn(super._c(this.lastColumns))
    }
  }

  /** @description 排序 */

  sort (list) {
    list = list.sort((a, b) => a.sort - b.sort)
    for (const i of list) {
      if (i.children.length) this.sort(i.children)
    }
    return list
  }

  /** @description 监听行为 */
  get (list) {
    this.lastColumns = list
  }

  /** @description  获取本地配置 */
  getLocalConfig () {
    const local = Vue.ls.get(this.localKey) || []
    return local
  }

  /** @description 设置本地配置 */
  setLocalConfig (list) {
    Vue.ls.set(this.localKey, list)
  }
}

export default CustomColumn
