<template>
  <div class="app-container">

    <!-- 查询和其他操作 -->
    <div class="filter-container">
      <el-input
        v-model="listQuery.title" clearable size="mini" class="filter-item"
        style="width: 200px;"
        placeholder="请输入公告标题..."
      />
      <el-button
        v-permission="[ `GET ${api.listArticle}` ]" class="filter-item" size="mini" type="primary"
        icon="el-icon-search"
        @click="getList"
      >
        查找
      </el-button>
    </div>

    <TableTools
      :custom-columns-config="customColumnsConfig" download custom-field @update-fields="updateFields"
      @refresh="getList" @download="toolsMixin_exportMethod($refs.vxeTable, '公告列表')"
    >
      <el-button v-permission="[ `POST ${api.publishArticle}` ]" class="filter-item" size="mini" type="primary" icon="el-icon-plus" @click="handleCreate">添加</el-button>
    </TableTools>

    <!-- 查询结果 -->
    <VxeTable
      ref="vxeTable" v-model="listQuery" :local-key="customColumnsConfig.localKey" api-method="GET"
      :api-path="api.listArticle" :columns="columns"
    >
      <template #type="{ row }">
        <el-tag v-if="row.type == '1'" type="success">公告</el-tag>
        <el-tag v-else-if="row.type == '0'" type="success">通知</el-tag>
        <el-tag v-else type="error">其他</el-tag>
      </template>
      <template #operate="{ row }">
        <el-button v-permission="[ `POST ${api.editArticle}` ]" size="mini" @click="handleUpdate(row)">编辑</el-button>
        <el-button v-permission="[ `POST ${api.deleteArticle}` ]" type="danger" size="mini" @click="handleDelete(row)">删除</el-button>
      </template>
    </VxeTable>

  </div>
</template>

<script>
import { api, deleteArticle } from '@/api/business/article'
import VxeTable from '@/components/VxeTable'
import TableTools from '@/components/TableTools'
import BackToTop from '@/components/BackToTop'
import { columns } from './table'

export default {
  name: 'AnnouncementList',
  components: {
    VxeTable,
    TableTools,
    BackToTop
  },
  data() {
    return {
      api,
      columns,
      customColumnsConfig: {
        localKey: 'announcementList',
        columnsOptions: columns
      },
      listQuery: {
        page: 1,
        limit: 20,
        title: undefined,
        sort: 'add_time',
        order: 'desc'
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    // 自定义列
    updateFields(columns) {
      this.columns = columns
    },
    getList(meaning) {
      meaning === 'keepPage' ? this.listQuery = { ...this.listQuery } : this.listQuery = { ...this.listQuery, page: 1 }
    },
    handleCreate() {
      this.$router.push({ path: '/promotion/announcementCreate' })
    },
    handleUpdate(row) {
      this.$router.push({ path: '/promotion/announcementEdit', query: { id: row.id } })
    },
    handleDelete(row) {
      deleteArticle(row).then((response) => {
        this.$notify.success({
          title: '成功',
          message: '删除成功'
        })
        const index = this.list.indexOf(row)
        this.list.splice(index, 1)
      })
        .catch((response) => {
          this.$notify.error({
            title: '失败',
            message: response.errmsg
          })
        })
    }
  }
}
</script>

<style>
.table-expand {
	font-size: 0;
}

.table-expand label {
	width: 100px;
	color: #99a9bf;
}

.table-expand .el-form-item {
	margin-right: 0;
	margin-bottom: 0;
}

.gallery {
	width: 80px;
	margin-right: 10px;
}
</style>
