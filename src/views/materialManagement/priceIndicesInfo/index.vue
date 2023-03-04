<template>
  <div class="app-container">

    <!-- 查询和其他操作 -->
    <div class="filter-container">
      <el-input
        v-model="listQuery.materialsCategory" clearable size="mini" class="filter-item"
        style="width: 200px;"
        placeholder="请输入材料名称" @keyup.enter.native="getList"
      />
      <el-button
        v-permission="[ `GET ${api.pricesList}` ]" size="mini" class="filter-item" type="primary"
        icon="el-icon-search" @click="getList"
      >
        查找
      </el-button>
    </div>

    <TableTools
      :custom-columns-config="customColumnsConfig" download custom-field @update-fields="updateFields"
      @refresh="getList" @download="toolsMixin_exportMethod($refs.vxeTable, '价格指数')"
    >
      <el-button
        v-permission="[ `POST ${api.pricesAdd}` ]" size="mini" type="primary" icon="el-icon-plus"
        @click="handleCreate"
      >
        添加
      </el-button>
    </TableTools>

    <!-- 价格指数列表 -->
    <VxeTable
      ref="vxeTable" v-model="listQuery" :local-key="customColumnsConfig.localKey" api-method="GET"
      :api-path="api.pricesList" :columns="columns" @post-data="handlePostData"
    >
      <!-- <el-table-column
        align="center"
        min-width="100px"
        property="picUrl"
        label="材料图片"
        >
        <template slot-scope="scope">
        <img
        v-if="scope.row.picUrl"
        :src="scope.row.picUrl"
        width="80"
        >
        </template>
        </el-table-column> -->
      <template #operate="{ row }">
        <el-button v-permission="[ `POST ${api.pricesUpdate}` ]" size="mini" @click="handleUpdate(row)">
          编辑
        </el-button>
        <el-button v-permission="[ `POST ${api.pricesDelete}` ]" type="danger" size="mini" @click="handleDelete(row)">
          删除
        </el-button>
      </template>
    </VxeTable>

    <!-- 添加或修改对话框 -->
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form
        ref="dataForm" :rules="rules" :model="dataForm" status-icon
        label-position="left" label-width="150px"
        style="width: 400px; margin-left:50px;"
      >
        <el-form-item v-if="dialogStatus !== 'create'" label="序号" prop="id">
          {{ dataForm.id }}
          <!-- <el-input v-model="dataForm.id" /> -->
        </el-form-item>

        <el-form-item label="类名" prop="materialsCategory">
          <el-input v-model="dataForm.materialsCategory" />
        </el-form-item>

        <el-form-item label="品名" prop="materialsName">
          <el-input v-model="dataForm.materialsName" />
        </el-form-item>

        <el-form-item label="规格" prop="materialsSku">
          <el-input v-model="dataForm.materialsSku" />
        </el-form-item>

        <el-form-item label="材质" prop="materialsTexture">
          <el-input v-model="dataForm.materialsTexture" />
        </el-form-item>

        <el-form-item label="品质" prop="materialsQuality">
          <el-input v-model="dataForm.materialsQuality" />
        </el-form-item>

        <el-form-item label="价格" prop="materialsMoney" oninput="value=value.replace(/^0|[^\d]/g,'')">
          <el-input v-model="dataForm.materialsMoney" />
        </el-form-item>

        <el-form-item label="单位" prop="materialsUnit" oninput="value=value.replace(/^0|[^\d]/g,'')">
          <el-input v-model="dataForm.materialsUnit" />
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button v-if="dialogStatus == 'create'" type="primary" @click="createData">
          确定
        </el-button>
        <el-button v-else type="primary" @click="updateData">
          确定
        </el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import { api, pricesDelete, pricesAdd, pricesUpdate } from '@/api/materialManagement/priceIndicesInfo'
import VxeTable from '@/components/VxeTable'
import TableTools from '@/components/TableTools'
import { columns } from './table'

export default {
  name: 'PriceIndicesInfo',
  components: {
    VxeTable,
    TableTools
  },
  data() {
    return {
      api,
      columns,
      customColumnsConfig: {
        localKey: 'priceIndicesInfo',
        columnsOptions: columns
      },
      listQuery: {
        page: 1,
        limit: 20,
        id: undefined,
        materialsCategory: undefined,
        materialsName: undefined,
        sort: 'add_time',
        order: 'desc'
      },
      list: undefined,
      dataForm: {
        id: undefined,
        materialsCategory: undefined,
        materialsLastmoney: undefined,
        materialsMoney: undefined,
        materialsName: undefined,
        materialsQuality: undefined,
        materialsSku: undefined,
        materialsTexture: undefined,
        materialsUnit: undefined,
        updateTime: undefined
      },
      dialogFormVisible: false,
      shareUrlDialogVisible: false,
      dialogStatus: '',
      textMap: {
        update: '编辑',
        create: '创建',
        shareUrl: '店铺推广码'
      },
      rules: {
        materialsCategory: [
          { required: true, message: '类名不能为空', trigger: 'blur' }
        ],
        materialsMoney: [
          { required: true, message: '价格不能为空', trigger: 'blur' }
        ],
        materialsName: [
          { required: true, message: '品名不能为空', trigger: 'blur' }
        ],
        materialsSku: [
          { required: true, message: '规格不能为空', trigger: 'blur' }
        ],
        materialsTexture: [
          { required: true, message: '材质不能为空', trigger: 'blur' }
        ],
        materialsQuality: [
          { required: true, message: '品质不能为空', trigger: 'blur' }
        ],
        materialsLastmoney: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        materialsUnit: [
          { required: true, message: '单位不能为空', trigger: 'blur' }
        ]
      },
      downloadLoading: false
    }
  },
  created() { },
  methods: {
    // 自定义列
    updateFields(columns) {
      this.columns = columns
    },
    getList(meaning) {
      meaning === 'keepPage' ? this.listQuery = { ...this.listQuery } : this.listQuery = { ...this.listQuery, page: 1 }
    },
    handlePostData(postData) {
      this.list = postData
    },
    resetForm() {
      this.dataForm = {
        id: undefined,
        materialsCategory: undefined,
        materialsLastmoney: undefined,
        materialsMoney: undefined,
        materialsName: undefined,
        materialsQuality: undefined,
        materialsSku: undefined,
        materialsTexture: undefined,
        materialsUnit: undefined,
        updateTime: undefined
      }
    },
    handleCreate() {
      this.resetForm()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs.dataForm.clearValidate()
      })
    },
    createData() {
      this.$refs.dataForm.validate((valid) => {
        if (valid) {
          pricesAdd(this.dataForm)
            .then((response) => {
              this.list.unshift(response.data)
              this.dialogFormVisible = false
              this.$notify.success({
                title: '成功',
                message: '创建成功'
              })
              this.getList()
            })
            .catch((response) => {
              this.$notify.error({
                title: '失败',
                message: response.errmsg
              })
            })
        }
      })
    },
    handleUpdate(row) {
      this.dataForm = Object.assign({}, row)
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs.dataForm.clearValidate()
      })
    },
    updateData() {
      this.$refs.dataForm.validate((valid) => {
        if (valid) {
          pricesUpdate(this.dataForm)
            .then(() => {
              for (const v of this.list) {
                if (v.id === this.dataForm.id) {
                  const index = this.list.indexOf(v)
                  this.list.splice(index, 1, this.dataForm)
                  break
                }
              }
              this.dialogFormVisible = false
              this.$notify.success({
                title: '成功',
                message: '更新成功'
              })
              this.getList('keepPage')
            })
            .catch((response) => {
              this.$notify.error({
                title: '失败',
                message: response.errmsg
              })
            })
        }
      })
    },
    handleDelete(row) {
      pricesDelete(row)
        .then((response) => {
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

<style scoped></style>
