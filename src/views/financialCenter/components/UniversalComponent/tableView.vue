<template>
  <div class="tableContainer">
    <VxeTable
      ref="vxeTable"
      v-model="listQuery"
      :local-key="customColumnsConfig.localKey"
      api-method="POST"
      :api-path="api.queryCommunityReportForms"
      :columns="columns"
      res-alias="map"
    ></VxeTable>
    <!-- :is-pager="false" 是否分页，默认为true 不需要分页则加上这条属性为false -->
  </div>
</template>

<script>
// 请求的方法
import {
  api
} from '@/api/financialCenter'
import VxeTable from '@/components/VxeTable'
// 表格行列参数 宽度 读取的字段
import { columns } from './table'
export default {
  // eslint-disable-next-line vue/match-component-file-name
  name: 'TableView',
  components: {
    VxeTable
  },
  data() {
    return {
      api,
      columns,
      customColumnsConfig: {
        localKey: 'PartnerApply',
        columnsOptions: columns
      },
      listQuery: {
        date: '2023',
        address: '广东省',
        page: 1,
        limit: 30,
        orderDate: '2023'
      }
    }
  }
}
</script>

<style lang="scss">
.tableContainer {
  height: 100%;
}
</style>
