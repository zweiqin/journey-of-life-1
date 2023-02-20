import Vue from 'vue'
import { Message, MessageBox } from 'element-ui'
import { cloneDeep } from 'lodash'

export default {
  methods: {
    toolsMixin_exportMethod(ref, filename) {
      let dataValue
      let CheckboxRecords
      const h = ref.$createElement
      MessageBox({
        title: '提示',
        message: h({
          data() {
            return {
              value: '1'
            }
          },
          render(h) {
            return h('el-select', { attrs: {
              placeholder: '请选择导出方式'
            },
            props: {
              value: this.value
            },
            on: {
              input: (event) => {
                this.value = event
              }
            } }, [
              h('el-option', {
                attrs: {
                  label: '导出当前表格全部数据',
                  value: '1'
                }
              }),
              h('el-option', {
                attrs: {
                  label: '导出表格中选定的数据',
                  value: '2'
                }
              })
            ])
          }
        }),
        showCancelButton: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        beforeClose(action, instance, done) {
          // console.log(this, this.$children[2].value, this.$children[3].value)
          if (action === 'confirm') {
            instance.confirmButtonLoading = true
            instance.confirmButtonText = '执行中...'
            dataValue = this.$children[2].value || this.$children[3].value
            // console.log(ref.handleVxeTableMethod('getTableColumn'))
            if (dataValue === '2' && !ref.handleVxeTableMethod('getTableColumn').collectColumn.some((item) => item.type === 'checkbox')) {
              // console.log(ref.columns)
              const columnsArr = cloneDeep(ref.columns)
              columnsArr.unshift({ type: 'checkbox', fixed: 'left' })
              ref.handleVxeTableMethod('loadColumn', columnsArr)
              Message({ type: 'info', message: '请选择要导出的行' })
              done()
              instance.confirmButtonLoading = false
              return
            } else if (dataValue === '2') {
              CheckboxRecords = ref.handleVxeTableMethod('getCheckboxRecords')
              CheckboxRecords ? CheckboxRecords = CheckboxRecords.map((item) => item.$index - 1) : CheckboxRecords = []
            }

            // console.log(CheckboxRecords)
            ref && ref.handleVxeTableMethod('exportData', {
              type: 'csv',
              filename,
              columnFilterMethod({ column }) {
                // console.log(column.property)
                return ![undefined, '$index', 'operate'].includes(column.property)
              },
              dataFilterMethod(row, $rowIndex) {
                // console.log(row, $rowIndex)
                if (dataValue === '1') {
                  return true
                } else if (dataValue === '2') {
                  return CheckboxRecords.includes(row.$rowIndex)
                }
              },
              afterExportMethod() {
                ref.handleVxeTableMethod('reloadColumn', cloneDeep(ref.columns))
                done()
                instance.confirmButtonLoading = false
              }
            })
          } else {
            done()
          }
        }
      }).then((action) => {
        // Message({
        //   type: 'info',
        //   message: 'action: ' + action
        // })
      })
    }
  }
}
