<template>
  <div class="app-container">

    <!-- 查询和其他操作 -->
    <div class="filter-container">
      <el-input
        v-model="listQuery.search" clearable class="filter-item" style="width: 400px;"
        placeholder="请输入公告标题、内容、备注等" @keyup.enter.native="getList"
      />
      <el-button
        v-permission="[ `GET /admin${api.queryAnnouncementList}` ]" size="mini" class="filter-item"
        type="primary" icon="el-icon-search" style="margin-left:10px;" @click="getList"
      >
        查找
      </el-button>
    </div>

    <TableTools
      :custom-columns-config="customColumnsConfig" download custom-field @update-fields="updateFields"
      @refresh="getList" @download="toolsMixin_exportMethod($refs.vxeTable, '公告管理')"
    >
      <el-button
        v-permission="[ `POST /admin${api.customerpoolInsertSelective}` ]" size="mini" type="primary" icon="el-icon-plus"
        @click="$refs.EditModal && $refs.EditModal.handleOpen({ id: '' })"
      >
        添加
      </el-button>
    </TableTools>

    <!-- 查询结果 -->
    <VxeTable
      ref="vxeTable" v-model="listQuery" :local-key="customColumnsConfig.localKey" api-method="POST"
      :api-path="api.queryAnnouncementList" :columns="columns"
    >
      <template #status="{ row }">
        <el-tag v-if="row.status === 1" type="info">草稿</el-tag>
        <el-tag v-else-if="row.status === 2">已发布</el-tag>
        <el-tag v-else-if="row.status === 3" type="success">已下架</el-tag>
        <span v-else>--</span>
      </template>
      <template #type="{ row }">
        <el-tag v-if="row.type === 1" type="warning">商城</el-tag>
        <el-tag v-else-if="row.type === 2">材料</el-tag>
        <el-tag v-else-if="row.type === 3" type="success">社区</el-tag>
        <el-tag v-else-if="row.type === 4" type="danger">物流</el-tag>
        <span v-else>--</span>
      </template>
      <template #operate="{ row }">
        <el-button v-permission="[ `GET /admin${api.queryAnnouncementList}` ]" size="mini" @click="handleDetail(row)">
          查看
        </el-button>
        <el-button v-permission="[ `POST /admin${api.updateByIdAnnouncement}` ]" size="mini" @click="handleUpdate(row)">
          编辑
        </el-button>
        <el-button
          v-permission="[ `POST /admin${api.updaetByStatus}` ]" :disabled="row.status !== 1 && row.status !== 3" type="primary"
          size="mini" @click="handleUpdateStatus(row)"
        >
          发布
        </el-button>
        <el-button
          v-permission="[ `POST /admin${api.updaetByStatus}` ]" :disabled="row.status !== 2" type="info" size="mini"
          @click="handleUpdateStatus(row)"
        >
          下架
        </el-button>
        <el-button
          v-permission="[ `GET /admin${api.deleteByIdAnnouncement}` ]" type="danger" size="mini"
          @click="handleDelete(row)"
        >
          删除
        </el-button>
      </template>
    </VxeTable>

    <!-- 新增编辑 -->
    <EditModal ref="EditModal" @success="getList" />
    <!-- 查看详情 -->
    <DetailModal ref="DetailModal" @success="getList" />
  </div>
</template>

<script>
import {
  api,
  updaetByStatus,
  deleteByIdAnnouncement
} from '@/api/promotionManagement/announcementManagement'
import VxeTable from '@/components/VxeTable'
import TableTools from '@/components/TableTools'
import EditModal from './components/EditModal'
import DetailModal from './components/DetailModal'
import { columns } from './table'

export default {
  name: 'AnnouncementManagement',
  components: {
    VxeTable,
    TableTools,
    EditModal,
    DetailModal
  },
  data() {
    return {
      api,
      columns,
      customColumnsConfig: {
        localKey: 'announcementManagement',
        columnsOptions: columns
      },
      listQuery: {
        page: 1,
        limit: 20,
        search: ''
      }
    }
  },
  computed: {},
  methods: {
    // 自定义列
    updateFields(columns) {
      this.columns = columns
    },
    getList(meaning) {
      meaning === 'keepPage' ? this.listQuery = { ...this.listQuery } : this.listQuery = { ...this.listQuery, page: 1 }
    },
    handleDetail(row) {
      this.$refs.DetailModal && this.$refs.DetailModal.handleOpen(row)
    },
    handleUpdate(row) {
      this.$refs.EditModal && this.$refs.EditModal.handleOpen(row)
    },
    async handleUpdateStatus({ id, status }) {
      let tempStatus
      if (status === 1 || status === 3) {
        await this.$elConfirm(`确认发布？`)
        tempStatus = 2
      } else if (status === 2) {
        await this.$elConfirm(`确认下架？`)
        tempStatus = 3
      } else {
        return
      }
      const loading = this.$elLoading()
      try {
        await updaetByStatus({
          id,
          status: tempStatus
        })
        loading.close()
        this.$elMessage()
        this.getList()
      } catch (e) {
        loading.close()
      }
    },
    async handleDelete({ id }) {
      await this.$elConfirm('确认删除?')
      await deleteByIdAnnouncement({ ids: id })
      this.$elMessage('删除成功!')
      this.getList()
    }
  }
}
</script>
