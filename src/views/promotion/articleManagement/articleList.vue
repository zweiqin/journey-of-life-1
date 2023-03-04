<template>
  <div class="app-container">

    <!-- 查询和其他操作 -->
    <div class="filter-container">
      <el-input
        v-model="listQuery.title" clearable size="mini" class="filter-item"
        style="width: 200px;"
        placeholder="请输入文章标题" @keyup.enter.native="getList"
      />
      <el-select v-model="listQuery.type" size="mini" class="filter-item" clearable placeholder="请选择文章类型">
        <el-option v-for="item in typeList" :key="item.value" :label="item.label" :value="item.value" />
      </el-select>
      <el-select v-model="listQuery.isVip" size="mini" class="filter-item" clearable placeholder="请选择文章性质">
        <el-option v-for="item in isVipList" :key="item.value" :label="item.label" :value="item.value" />
      </el-select>
      <el-button
        v-permission="[ `GET ${api.listArticle}` ]" class="filter-item" size="mini" type="primary"
        icon="el-icon-search" @click="getList"
      >
        查找
      </el-button>
    </div>

    <TableTools
      :custom-columns-config="customColumnsConfig" download custom-field @update-fields="updateFields"
      @refresh="getList" @download="toolsMixin_exportMethod($refs.vxeTable, '文章列表')"
    >
      <el-button
        v-permission="[ `POST ${api.publishArticle}` ]" class="filter-item" size="mini" type="primary"
        icon="el-icon-plus" @click="handleCreate"
      >
        添加
      </el-button>
    </TableTools>

    <!-- 查询结果 -->
    <VxeTable
      ref="vxeTable" v-model="listQuery" :local-key="customColumnsConfig.localKey" api-method="GET"
      :api-path="api.listArticle" :columns="columns" :grid-options="{ height: '' }"
    >
      <template #type="{ row }">
        {{ typeValue[row.type - 1] }}
      </template>
      <template #isVip="{ row }">
        {{ row.isVip ? '收费' : '免费' }}
      </template>
      <template #operate="{ row }">
        <el-button v-permission="[ `POST ${api.editArticle}` ]" size="mini" @click="handleUpdate(row)">编辑</el-button>
        <el-button
          v-permission="[ `POST ${api.deleteArticle}` ]" type="danger" size="mini"
          @click="handleDelete(row)"
        >
          删除
        </el-button>
      </template>
    </VxeTable>

    <el-tooltip placement="top" content="返回顶部">
      <BackToTop :visibility-height="100" />
    </el-tooltip>

  </div>
</template>

<script>
import { api, deleteArticle } from '@/api/articleManagement/article'
import VxeTable from '@/components/VxeTable'
import TableTools from '@/components/TableTools'
import BackToTop from '@/components/BackToTop'
import { columns } from './table'

export default {
  name: 'ArticleList',
  components: {
    VxeTable,
    TableTools,
    BackToTop
  },
  data() {
    return {
      typeList: [{
        value: 1,
        label: '草帽服装'
      }, {
        value: 2,
        label: '餐饮酒店'
      }, {
        value: 3,
        label: '美容美发'
      }, {
        value: 4,
        label: '生活超市'
      }, {
        value: 5,
        label: '健身娱乐'
      }, {
        value: 6,
        label: '装修建材'
      }, {
        value: 7,
        label: '培训学校'
      }, {
        value: 8,
        label: '汽车美容'
      }, {
        value: 9,
        label: '爆粉秘籍'
      }, {
        value: 10,
        label: '抖音实例'
      }, {
        value: 11,
        label: '营销课程'
      }, {
        value: 12,
        label: '赚钱教程'
      }, {
        value: 13,
        label: '购买协议'
      }],
      isVipList: [{
        value: 'true',
        label: '收费'
      }, {
        value: 'false',
        label: '免费'
      }],
      api,
      columns,
      customColumnsConfig: {
        localKey: 'articleList',
        columnsOptions: columns
      },
      listQuery: {
        page: 1,
        limit: 20,
        title: undefined,
        type: undefined,
        isVip: undefined,
        sort: 'add_time',
        order: 'desc'
      },
      typeValue: ['草帽服装', '餐饮酒店', '美容美发', '生活超市', '健身娱乐', '装修建材', '培训学校', '汽车美容', '爆粉秘籍', '抖音实例', '营销课程', '赚钱教程', '购买协议']
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
    handleCreate() {
      this.$router.push({ name: 'teachArticleCreate' })
    },
    handleUpdate(row) {
      this.$router.push({ name: 'teachArticleEdit', query: { id: row.id } })
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
