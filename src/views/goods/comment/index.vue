<template>
  <div class="app-container">

    <!-- 查询和其他操作 -->
    <div class="filter-container">
      <el-input
        v-model="listQuery.userId" clearable class="filter-item" style="width: 200px;"
        placeholder="请输入用户编号"
        @keyup.enter.native="getList"
      />
      <!-- <el-input
        v-model="listQuery.valueId"
        clearable
        class="filter-item"
        style="width: 200px;"
        placeholder="请输入商品编号"
        /> -->
      <el-select v-model="listQuery.type" clearable class="filter-item" style="width: 200px;" placeholder="选择评论类型">
        <el-option v-for="item in typeList" :key="item.value" :label="item.label" :value="item.value" />
      </el-select>
      <el-button
        v-permission="[ `GET /admin${api.commentList}` ]" size="mini" class="filter-item" type="primary"
        icon="el-icon-search" style="margin-left:10px;" @click="getList"
      >
        查找
      </el-button>
    </div>

    <TableTools
      :custom-columns-config="customColumnsConfig" download custom-field @update-fields="updateFields"
      @refresh="getList" @download="toolsMixin_exportMethod($refs.vxeTable, '商品评论')"
    >
    </TableTools>

    <!-- 查询结果 -->
    <VxeTable
      ref="vxeTable" v-model="listQuery" :local-key="customColumnsConfig.localKey" api-method="GET"
      :api-path="api.commentList" :columns="columns"
    >
      <template #type="{ row }">
        {{ row.type | typeFilter(typeList) }}
      </template>
      <template #userImg="{ row }">
        <el-image
          v-if="row.userImg" :src="row.userImg" style="width:40px; height:40px" fit="cover"
          :preview-src-list="[ row.userImg ]"
        />
      </template>
      <template #picUrls="{ row }">
        <div v-if="row.picUrls && row.picUrls.length">
          <el-image :src="row.picUrls[0]" style="width:40px; height:40px" fit="cover" :preview-src-list="row.picUrls" />
          <span v-if="row.picUrls.length > 1" style="margin-left:8px;">+{{ row.picUrls.length }}</span>
        </div>
      </template>
      <template #goodsStar="{ row }">
        <el-rate v-model="row.goodsStar" disabled />
      </template>
      <template #logisticsStar="{ row }">
        <el-rate v-model="row.logisticsStar" disabled />
      </template>
      <template #serverStar="{ row }">
        <el-rate v-model="row.serverStar" disabled />
      </template>
      <template #operate="{ row }">
        <el-button
          v-permission="[ `POST /admin${api.commentDelete}` ]" type="danger" size="mini"
          @click="handleDelete(row)"
        >
          删除
        </el-button>
        <el-button
          v-permission="[ `POST /admin${api.commentBrandReply}` ]" :disabled="row.type != 0" type="primary"
          size="mini" @click="handleAddComment(row)"
        >
          店铺回复评论
        </el-button>
      </template>
    </VxeTable>

    <!-- 新增编辑 -->
    <EditModal ref="EditModal" @success="getList" />
  </div>
</template>

<script>
import {
  api,
  commentDelete
} from '@/api/goods/goodsComment'
import VxeTable from '@/components/VxeTable'
import TableTools from '@/components/TableTools'
import EditModal from './components/EditModal'
import { columns } from './table'

export default {
  name: 'CommentList',
  components: {
    VxeTable,
    TableTools,
    EditModal
  },
  filters: {
    typeFilter(val, list = []) {
      const obj = list.find((item) => +item.value === +val)
      return obj ? obj.label : '--'
    }
  },
  data() {
    return {
      api,
      columns,
      customColumnsConfig: {
        localKey: 'commentList',
        columnsOptions: columns
      },
      listQuery: {
        page: 1,
        limit: 20,
        userId: '',
        valueId: '',
        type: ''
      },
      typeList: [
        { label: '商品评论', value: '0' },
        { label: '订单商品评论', value: '2' },
        { label: '店铺回复评论', value: '3' }
      ]
    }
  },
  methods: {
    // 自定义列
    updateFields(columns) {
      this.columns = columns
    },
    getList(meaning) {
      meaning === 'keepPage' ? this.listQuery = { ...this.listQuery } : this.listQuery = { ...this.listQuery, page: 1 }
    },
    // 添加评论
    async handleAddComment({ type, valueId, pid }) {
      this.$refs.EditModal && this.$refs.EditModal.handleOpen({ type, valueId, pid }, '添加店铺回复评论')
    },
    async handleDelete({ id }) {
      await this.$elConfirm('确认删除?')
      await commentDelete({ id })
      this.$elMessage('删除成功!')
      this.getList()
    }
  }
}
</script>

<style lang="scss" scoped>
/deep/ .el-rate__icon {
	margin-right: 2px;
}
</style>
