<template>
  <div class="app-container">

    <!-- 查询和其他操作 -->
    <div class="filter-container">
      <el-input
        v-model="listQuery.storeName"
        clearable
        size="mini"
        class="filter-item"
        style="width: 200px;"
        placeholder="请输入查询名称"
      />
      <el-button
        v-permission="['GET /admin/admin/list']"
        size="mini"
        class="filter-item"
        type="primary"
        icon="el-icon-search"
        @click="handleFilter"
      >查找</el-button>
      <el-button
        v-permission="['POST /admin/admin/create']"
        size="mini"
        class="filter-item"
        type="primary"
        icon="el-icon-edit"
        @click="handleCreate"
      >添加</el-button>
      <!-- <el-button
        :loading="downloadLoading"
        size="mini"
        class="filter-item"
        type="warning"
        icon="el-icon-download"
        @click="handleDownload"
      >导出</el-button> -->
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
      @expand-change="expand"
    >

      <el-table-column type="expand">
        <template slot-scope="scope">
          <el-table
            v-loading="listIdLoading"
            :data="listId[scope.row.id]"
            size="small"
            element-loading-text="正在查询中。。。"
            border
            fit
            highlight-current-row
          >

            <el-table-column
              align="center"
              label="编号"
              prop="id"
              sortable
            />

            <el-table-column
              align="center"
              label="父类型编号"
              prop="pid"
            />

            <el-table-column
              align="center"
              label="类型名称"
              prop="storeName"
            />

            <el-table-column
              align="center"
              label="操作"
              class-name="small-padding fixed-width"
            >
              <template slot-scope="scope">
                <el-button
                  v-permission="['POST /admin/admin/update']"
                  type="primary"
                  size="mini"
                  @click="handleUpdate(scope.row)"
                >编辑</el-button>
                <el-button
                  v-permission="['POST /admin/admin/delete']"
                  type="danger"
                  size="mini"
                  @click="handleDelete(scope.row)"
                >删除</el-button>
              </template>
            </el-table-column>
          </el-table>

          <pagination
            v-show="IdTotal[scope.row.id]>0"
            :total="Number(IdTotal[scope.row.id])"
            :page.sync="listQueryId.page"
            :limit.sync="listQueryId.limit"
            @pagination="getListOfId(scope.row.id)"
          />
        </template>
      </el-table-column>

      <el-table-column
        align="center"
        label="编号"
        prop="id"
        sortable
      />

      <el-table-column
        align="center"
        label="门店类型名称"
        prop="storeName"
      />

      <el-table-column
        align="center"
        label="操作"
        class-name="small-padding fixed-width"
      >
        <template slot-scope="scope">
          <el-button
            v-permission="['POST /admin/admin/update']"
            type="primary"
            size="mini"
            @click="handleUpdate(scope.row)"
          >编辑</el-button>
          <el-button
            v-permission="['POST /admin/admin/delete']"
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
        label-width="120px"
        style="width: 400px; margin-left:50px;"
      >

        <el-form-item
          v-if="dialogStatus!='create'"
          label="编号"
          prop="id"
        >
          {{ dataForm.id }}
        </el-form-item>

        <el-form-item
          v-if="dialogStatus!='update'"
          label="父类型编号"
          prop="pid"
        >
          <el-input v-model="dataForm.pid" placeholder="输入'0'代表一级分类"/>
        </el-form-item>

        <el-form-item
          label="门店类型名称"
          prop="storeName"
        >
          <el-input v-model="dataForm.storeName" />
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

<style>
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
import { listAdd, listDelete, listGet, listedit, sonListGet } from '@/api/configurationTable/storeType'
import Pagination from '@/components/Pagination'

export default {
  name: 'Admin',
  components: { Pagination },
  data () {
    return {
      list: null,
      total: 0,
      roleOptions: null,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20,
        storeName: undefined,
        pid: '0',
        sort: 'add_time',
        order: 'desc'
      },
      listIdLoading: false,
      listId: [],
      IdTotal: [],
      listQueryId: {
        page: 1,
        limit: 10,
        sort: 'add_time',
        order: 'desc',
        id: undefined
      },
      dataForm: {
        id: undefined,
        pid: undefined,
        storeName: undefined
      },
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: '编辑',
        create: '创建'
      },
      rules: {
        pid: [
          { required: true, message: '父类型编号不能为空', trigger: 'blur' }
        ],
        storeName: [{ required: true, message: '类型名称不能为空', trigger: 'blur' }]
      },
      downloadLoading: false
    }
  },
  computed: {

  },
  created () {
    this.getList()
  },
  methods: {
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
    // 二级菜单请求
    expand (row, expandedRows) {
      this.getListOfId(row.id)
    },
    getListOfId (id) {
      this.listIdLoading = true
      this.listQueryId.id = id
      sonListGet(this.listQueryId).then(response => {
        // 设置列表数据
        this.$set(this.listId, id, response.data.items)
        // 设置列表页
        this.$set(this.IdTotal, id, response.data.total)
        this.listIdLoading = false
      }).catch((response) => {
        this.$set(this.listId, id, [])
        this.$set(this.IdTotal, id, 0)
        this.listIdLoading = false
      })
    },
    handleFilter () {
      this.listQuery.page = 1
      this.getList()
    },
    resetForm () {
      this.dataForm = {
        id: undefined,
        pid: undefined,
        storeName: undefined
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
    createData () {
      this.$refs['dataForm'].validate(valid => {
        if (valid) {
          listAdd(this.dataForm)
            .then(response => {
              this.getList()
              this.dialogFormVisible = false
              this.$notify.success({
                title: '成功',
                message: '添加门店类型信息成功'
              })
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
          listedit(this.dataForm)
            .then(() => {
              this.getList()
              this.dialogFormVisible = false
              this.$notify.success({
                title: '成功',
                message: '更新门店类型信息成功'
              })
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
            message: '删除门店类型信息成功'
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
  }
}
</script>
