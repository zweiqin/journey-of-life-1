<template>
  <div class="app-container">

    <!-- 查询和其他操作 -->
    <div class="filter-container">
      <!-- <el-input
        v-model="listQuery.id"
        clearable
        size="mini"
        class="filter-item"
        style="width: 200px;"
        placeholder="请输入材料ID"
      /> -->
      <el-input
        v-model="listQuery.materialsCategory"
        clearable
        size="mini"
        class="filter-item"
        style="width: 200px;"
        placeholder="请输入材料名称"
      />
      <el-button
        v-permission="['GET /admin/pricesView/list']"
        size="mini"
        class="filter-item"
        type="primary"
        icon="el-icon-search"
        @click="handleFilter"
      >查找</el-button>
      <el-button
        v-permission="['POST /admin/pricesView/add']"
        size="mini"
        class="filter-item"
        type="primary"
        icon="el-icon-edit"
        @click="handleCreate"
      >添加</el-button>
      <!-- <el-button :loading="downloadLoading" size="mini" class="filter-item" type="warning" icon="el-icon-download" @click="handleDownload">导出</el-button> -->
    </div>

    <!-- 查询结果 -->
    <el-table
      v-loading="listLoading"
      :data="list"
      size="small"
      element-loading-text="正在查询中。。。"
      border
      fit
      highlight-current-row
    >

      <el-table-column
        align="center"
        min-width="100px"
        label="材料ID"
        prop="id"
        sortable
      />

      <el-table-column
        align="center"
        min-width="150px"
        label="材料类名"
        prop="materialsCategory"
      />

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

      <el-table-column
        align="center"
        min-width="120px"
        label="上次价格"
        prop="lastMoney"
      />

      <el-table-column
        align="center"
        min-width="120px"
        label="价格"
        prop="money"
      />

      <el-table-column
        align="center"
        min-width="80px"
        label="涨幅百分比"
        prop="viewPicture"
      />

      <el-table-column
        align="center"
        prop="status"
        label="状态"
      >
        <template slot-scope="scope">
          {{ scope.row.status===1?'涨':'降' }}
        </template>
      </el-table-column>

      <el-table-column
        align="center"
        label="操作"
        min-width="200"
        class-name="small-padding fixed-width"
      >
        <template slot-scope="scope">
          <el-button
            v-permission="['POST /admin/pricesView/update']"
            type="primary"
            size="mini"
            @click="handleUpdate(scope.row)"
          >编辑</el-button>
          <el-button
            v-permission="['POST /admin/pricesView/delete']"
            type="danger"
            size="mini"
            @click="handleDelete(scope.row)"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.limit"
      @pagination="getList"
    />

    <!-- 添加或修改对话框 -->
    <el-dialog
      :title="textMap[dialogStatus]"
      :visible.sync="dialogFormVisible"
    >
      <el-form
        ref="dataForm"
        :rules="rules"
        :model="dataForm"
        status-icon
        label-position="left"
        label-width="150px"
        style="width: 400px; margin-left:50px;"
      >
        <el-form-item
          v-if="dialogStatus!=='create'"
          label="材料ID"
          prop="id"
        >
          {{ dataForm.id }}
          <!-- <el-input v-model="dataForm.id" /> -->
        </el-form-item>

        <el-form-item
          label="材料类名"
          prop="materialsCategory"
        >
          <el-input v-model="dataForm.materialsCategory" />
        </el-form-item>

        <el-form-item
          label="上次价格"
          prop="lastMoney"
        >
          <el-input
            v-model="dataForm.lastMoney"
            oninput="value=value.replace(/^0|[^\d]/g,'')"
          />
        </el-form-item>

        <el-form-item
          label="价格"
          prop="money"
          oninput="value=value.replace(/^0|[^\d]/g,'')"
        >
          <el-input v-model="dataForm.money" />
        </el-form-item>

      </el-form>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button
          v-if="dialogStatus=='create'"
          type="primary"
          @click="createData"
        >确定</el-button>
        <el-button
          v-else
          type="primary"
          @click="updateData"
        >确定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<style scoped>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #20a0ff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 120px;
  height: 120px;
  line-height: 120px;
  text-align: center;
}
.avatar {
  width: 145px;
  height: 145px;
  display: block;
}
</style>

<script>
import { listGet, listDelete, listAdd, listUpdate } from '@/api/materialManagement/priceIndices'
import { uploadPath } from '@/api/business/storage'
import { getToken } from '@/utils/auth'
import { getUserInfo } from '@/api/login'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination

export default {
  name: 'PriceIndices',
  components: { Pagination },
  data () {
    return {
      TypeOptions: [],
      uploadPath,
      list: undefined,
      total: 0,
      categoryList: [],
      adminList: [],
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20,
        id: undefined,
        materialsCategory: undefined,
        sort: 'add_time',
        order: 'desc'
      },
      dataForm: {
        id: undefined,
        materialsCategory: undefined,
        lastMoney: undefined,
        money: undefined
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
          { required: true, message: '材料类名不能为空', trigger: 'blur' }
        ],
        lastMoney: [
          { required: true, message: '上次价格不能为空', trigger: 'blur' }
        ],
        money: [
          { required: true, message: '价格不能为空', trigger: 'blur' }
        ]
      },
      downloadLoading: false
    }
  },
  computed: {
    headers () {
      return {
        'X-Dts-Admin-Token': getToken()
      }
    }
  },
  created () {
    this.getRoles()
  },
  mounted () {

  },
  methods: {
    getRoles () {
      getUserInfo(getToken())
        .then(response => {
          this.getList()
        })
        .catch()
    },
    init () {
      // listCatAndAdmin().then(response => {
      //   this.categoryList = response.data.categoryList
      //   this.adminList = response.data.adminList
      //   // 获取门店类型
      //   this.getTypeOption()
      // })
    },
    // getTypeOption () {
    //   listStoreType().then(response => {
    //     this.TypeOptions = response.data.items
    //   })
    //     .catch(() => {
    //       this.TypeOptions = []
    //     })
    // },
    getList () {
      this.listLoading = true
      listGet(this.listQuery)
        .then(response => {
          this.list = response.data.items
          this.total = response.data.total
          this.listLoading = false
        })
        .catch(() => {
          this.list = []
          this.total = 0
          this.listLoading = false
        })
    },
    handleFilter () {
      this.listQuery.page = 1
      this.getList()
    },
    resetForm () {
      this.dataForm = {
        id: undefined,
        materialsCategory: undefined,
        lastMoney: undefined,
        money: undefined
      }
    },
    handleCreate () {
      this.resetForm()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    uploadPicUrl: function (response) {
      this.dataForm.picUrl = response.data.url
    },
    uploadLicenseUrl: function (response) {
      this.dataForm.licenseUrl = response.data.url
    },
    uploadIdcardProsUrl: function (response) {
      this.dataForm.idcardProsUrl = response.data.url
    },
    uploadIdcardConsUrl: function (response) {
      this.dataForm.idcardConsUrl = response.data.url
    },
    createData () {
      this.$refs['dataForm'].validate(valid => {
        if (valid) {
          listAdd(this.dataForm)
            .then(response => {
              this.list.unshift(response.data)
              this.dialogFormVisible = false
              this.$notify.success({
                title: '成功',
                message: '创建成功'
              })
              this.getList()
            })
            .catch(response => {
              this.$notify.error({
                title: '失败',
                message: response.errmsg
              })
            })
        }
      })
    },
    handleUpdate (row) {
      this.dataForm = Object.assign({}, row)
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    updateData () {
      this.$refs['dataForm'].validate(valid => {
        if (valid) {
          listUpdate(this.dataForm)
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
              this.getList()
            })
            .catch(response => {
              this.$notify.error({
                title: '失败',
                message: response.errmsg
              })
            })
        }
      })
    },
    handleDelete (row) {
      listDelete(row)
        .then(response => {
          this.$notify.success({
            title: '成功',
            message: '删除成功'
          })
          const index = this.list.indexOf(row)
          this.list.splice(index, 1)
        })
        .catch(response => {
          this.$notify.error({
            title: '失败',
            message: response.errmsg
          })
        })
    }
  }
}
</script>
