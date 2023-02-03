<!----------------------------------------------------------------------------------
about：vxe-table
author：zzw
date：2021-7
----------------------------------------------------------------------------------->
<script>
import empty from './image/no-data.png'
import request from '@/utils/request'
import client from '@/utils/request.js'
import XEUtils from 'xe-utils'
import { objDeepMerge } from '@/utils'

const slotHeader_titleHelp = function ($titleHelp = {}, props, h) {
  const { title } = props.column
  // 1.针对 column 配置有 titleHelp 对象的 进行默认提示处理
  const { message, icon } = $titleHelp || {}
  let TitleHelp = ''
  if (message) {
    TitleHelp = <a-tooltip placement="top">
      <span slot="title" domPropsInnerHTML={message} />
    </a-tooltip>
  }
  return [
    <div class='slot_titleHelpWrap'>
      <span class="label">{title}</span>
      {TitleHelp}
    </div>
  ]
}

const slotDefault = ({ row, column }, h) => {
  const val = row[column.property]
  const _params = XEUtils.get(column, 'params') || {}
  // 如果有多行省略号处理
  const ellipsis_line = _params.ellipsis_line
  if (ellipsis_line) {
    return [
      <el-tooltip placement={_params.placement || 'top'}>
        <span slot='content' domPropsInnerHTML={val} />
        <div class='text-overflow_ellipsis_line_2' style={`width: fit-content;-webkit-line-clamp: ${ellipsis_line}`}>{ val || '--'}</div>
      </el-tooltip>
    ]
  }
  if (typeof val !== 'number') {
    return val || '--'
  }
  return val
}

const baseOption = {
  round: true,
  resizable: true,
  showOverflow: true,
  showHeaderOverflow: true,
  highlightHoverRow: true,
  autoResize: true,
  rowClassName: (item) => {
    if (item.level > 0) return 'child-row'
  },
  scrollY: {
    gt: -1
  },
  // treeConfig: {
  //   showIcon: true,
  //   iconOpen: 'iconfonterp icon-erp-arrow-right-fill table-tree-icon table-tree-icon-open',
  //   iconClose: 'iconfonterp icon-erp-arrow-right-fill table-tree-icon'
  // },
  // 排序
  sortConfig: {
    trigger: 'cell',
    remote: true // 所有列是否使用服务端排序，如果设置为 true 则不会对数据进行处理
  },
  rowConfig: {
    isHover: true,
    isCurrent: true,
  }
}

export default {
  name: 'VxeTable',
  model: {
    prop: 'searchParams',
    event: 'update:searchParams'
  },
  computed: {
    resizelocalKey() {
      return this.localKey + '_resizeConfig'
    }
  },
  props: {
    columns: {
      type: Array,
      default: () => []
    },
    tableData: {
      type: Array,
      default: () => []
    },
    isRequest: {
      type: Boolean,
      default: true
    },
    gridOptions: {
      type: Object,
      default: () => ({})
    },
    className: {
      type: String,
      default: ''
    },
    // 查询条件
    searchParams: {
      type: Object
    },
    // 请求方式
    apiMethod: {
      type: String,
      default: 'GET'
    },
    // 请求地址
    apiPath: {
      type: String,
      default: ''
    },
    // res别名
    resAlias: {
      type: String,
      default: ''
    },
    // 是否有分页
    isPager: {
      type: Boolean,
      default: true
    },
    loading: {
      type: Boolean,
      default: false
    },
    page: {
      type: Object,
      default: () => ({})
    },
    // 需要减去的高度
    diffHeight: {
      type: Number,
      default: 0
    },
    // 是否显示table empty的暂无数据图片
    showEmptyImage: {
      type: Boolean,
      default: true
    },
    pageAlias: {
      type: String,
      default: 'page'
    },
    sizeAlias: {
      type: String,
      default: 'limit'
    },
    // 添加序号
    showIndex: {
      type: Boolean,
      default: true
    },
    localKey: {
      type: String,
      default: ''
    }
  },
  inheritAttrs: false,
  data () {
    return {
      isDataLoading: false,
      tableHeight: 0,
      option: baseOption,
      pagination: {
        // currentPage: 1,
        // pageSize: 20,
        pageSizes: [10, 20, 30, 40, 50, 100],
        layout: 'total, sizes, prev, pager, next, jumper',
        total: 0
      },
      postData: [],
      // 排序
      descParams: {
        column: undefined,
        direction: undefined
      },
    }
  },
  mounted () {
    if (!this.gridOptions.height) {
      this.calcTableHeight()
      window.addEventListener('resize', XEUtils.debounce(this.calcTableHeight, 300), true)
      this.$once('hook:beforeDestroy', () => {
        window.removeEventListener('resize', this.calcTableHeight, true)
      })
    }
  },
  watch: {
    searchParams: {
      handler (val) {
        if (!this.isRequest) return
        this.$emit('update:searchParams', Object.assign(val, { [this.pageAlias]: 1 }))
        this.getData()
      },
      immediate: true
    },
    gridOptions: {
      handler (options) {
        this.option = objDeepMerge(this.option, options)
      },
      deep: true,
      immediate: true
    },
  },
  methods: {
    /* ----------------------------------------- 绑定方法 ----------------------------------------- */
    sortChange ({ column, property, order }) {
      const params = {
        // column: property,
        // order: order,
        order: order || undefined
      }
      if (order) {
        this.descParams = {
          orderField: property,
          order: order
        }
      } else {
        this.descParams = this.$options.data.call(this).descParams
      }

      this.$emit('sortChange', params)
      this.getData(params)
    },
    /* ----------------------------------------- 自定义方法 ----------------------------------------- */
    async getData () {
      if (!this.isRequest) return
      try {
        this.isDataLoading = true
        const { apiPath, apiMethod } = this
        const page = this.searchParams[this.pageAlias]
        const pageSize = this.searchParams[this.sizeAlias]

        const res = await request({
          url: apiPath,
          method: apiMethod,
          [apiMethod.toUpperCase() === 'GET' ? 'params' : 'data']: this.searchParams
        })
        const { data } = res
        let postData = this.resAlias ? data[this.resAlias] : data.items

        this.showIndex && (postData = postData.map((v, i) => ({
          ...v,
          $index: (page - 1) * pageSize + (i + 1),
        })))
        this.postData = postData
        this.pagination.total = data.total
        this.isDataLoading = false
        this.$emit('fetch-data', res)
      } catch (e) {
        this.postData = []
        this.isDataLoading = false
      }
    },
    onPageChange (val) {
      if (this.isRequest) {
        this.$emit('update:searchParams', Object.assign(this.searchParams, { [this.pageAlias]: val }))
        this.getData()
      } else {
        this.$emit('pageChange', val)
      }
    },
    onSizeChange (val) {
      console.log('onSizeChange')
      if (this.isRequest) {
        this.$emit('update:searchParams', Object.assign(this.searchParams, {
          [this.pageAlias]: 1,
          [this.sizeAlias]: val
        }))
        this.getData()
      } else {
        this.$emit('pageChange', val)
      }
    },
    setTotal (total = 0) {
      this.pagination.total = total
    },
    /**
     * 记录列宽
     * @param {*} event
     */
    resizableChange (event) {
      const { field, resizeWidth } = event.column
      const __resizeConfig = this.$ls.get(this.resizelocalKey) || []
      const index = __resizeConfig.findIndex(item => item.field === field)
      if (index > -1) {
        __resizeConfig[index].resizeWidth = resizeWidth
      } else {
        __resizeConfig.push({
          field,
          resizeWidth
        })
      }
      this.$ls.set(this.resizelocalKey, __resizeConfig)
      this.$emit('resizable-change', { field })
    },
    // 调用vxe-table方法
    handleVxeTableMethod (method, ...params) {
      this.$refs.erpVxeTable[method](...params)
    },
    checkboxChange (...arg) {
      this.$emit('select-change', ...arg)
    },
    checkboxAll (...arg) {
      this.$emit('select-change', ...arg)
    },
    calcTableHeight () {
      const pagerHeight = this.isPager ? 56 : 0
      const qiankunHeight = window.__POWERED_BY_QIANKUN__ ? 10 : 0
      this.$nextTick(() => {
        const tableTop = document.querySelector('.jufeng-vxe-table') && document.querySelector('.jufeng-vxe-table').getBoundingClientRect().top
        this.tableHeight = window.innerHeight - tableTop - pagerHeight - qiankunHeight - this.diffHeight
      })
    },
    updateFooter () {
      this.$refs.erpVxeTable.updateFooter()
    },
    clearScroll () {
      this.$refs.erpVxeTable.clearScroll()
    },
    updateScroll (left, table_fixed_width) {
      this.$refs.erpVxeTable.scrollTo(left - table_fixed_width)
    }
  },
  render (h) {
    const {
      columns,
      tableData,
      isRequest,
      postData,
      className,
      option,
      loading,
      isDataLoading,
      tableHeight,
      $scopedSlots,
      $slots,
      $listeners,
      $attrs,
      pagination,
      isPager,
    } = this

    const data = isRequest ? postData : tableData

    const _this = this

    // 添加序号
    if (this.showIndex && columns.length && columns[0].field !== '$index') {
      columns.unshift({
        align: 'left',
        fixed: 'left',
        field: '$index',
        title: '序号',
        width: 50
      })
    }
    XEUtils.eachTree(columns, function (column) {
      // 添加边框className
      const className = 'table-border-group'

      // 内置表头
      if (column.$titleHelp) {
        const $titleHelp = column.$titleHelp
        delete column.$titleHelp
        column.slots.header = slotHeader_titleHelp.bind(_this, $titleHelp)
      }

      // 对非组件级内置的 column类型 且 未定义formatter 进行默认 default处理
      if (!column.type && !column.formatter) {
        if (!column.slots) {
          console.log('no')
          column.slots = { default: slotDefault }
        } else if (!column.slots.default) {
          // 针对没有 column slot default 的 数据进行处理
          console.log('slotDefault', slotDefault)
          column.slots.default = slotDefault
        }
      } else {
        column.slots = column.slots || {}
      }
    })

    const props = { height: option.height || tableHeight, columns, data, ...option }
    const isLoading = isRequest ? isDataLoading : loading
    // const spin = h('div', { class: 'spin-wrap', style: { 'display': isLoading ? 'flex' : '' } }, [h('span', { class: 'spin-item', props: { tip: '加载中...' } })])
    const spin = [
      <div
        class="spin-wrap"
        style={{ display: isLoading ? 'flex' : 'none' }}
      >
        <i class="el-icon-loading"></i>
        <div> 努力加载中...</div>
      </div>
    ]
    // pagination
    const pager = isPager ? h('el-pagination', {
      props: {
        currentPage: this.searchParams[this.pageAlias],
        pageSize: this.searchParams[this.sizeAlias],
        ...pagination
      },
      on: {
        'current-change': this.onPageChange,
        'size-change': this.onSizeChange
      }
    }) : null


    // table-empty
    const emptySlots = this.showEmptyImage ? h('div', { class: 'table-empty', slot: 'empty' }, [h('img', { attrs: { src: empty } }), h('div', '暂无数据')]) : undefined
    // vxe-table
    const el = h('div', { class: ['flexColumnPageWrap ' + className] }, [
      h('vxe-grid', {
        style: { 'z-index': 50 },
        ref: 'erpVxeTable',
        class: 'jufeng-vxe-table',
        props,
        scopedSlots: $scopedSlots,
        slots: $slots,
        attrs: $attrs,
        on: {
          ...$listeners,
          'sort-change': this.sortChange,
          'resizable-change': this.resizableChange,
          'checkbox-change': this.checkboxChange,
          'checkbox-all': this.checkboxAll,
        }
      }, [emptySlots]),
      pager
    ])

    // wrapper
    return h('div', { class: 'vxe-table__wrapper' }, [spin, el])
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.vxe-table__wrapper {
  position: relative;
  height: 100%;
  .spin-wrap {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 999;
    background: rgba(0, 0, 0, 0.02);
    color: #409EFF;
    font-size: 14px;
    .el-icon-loading {
      margin-right: 4px;
    }
    &[style*="display: flex"] + .flexColumnPageWrap  .table-empty {
      display: none;
    }
  }
  .el-pagination {
    text-align: right;
  }
}
</style>
