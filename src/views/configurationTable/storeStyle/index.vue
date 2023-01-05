<template>
  <div class="app-container">

    <!-- 查询和其他操作 -->
    <div class="filter-container">
      <el-input
        v-model="listQuery.name"
        clearable
        size="mini"
        class="filter-item"
        style="width: 200px;"
        placeholder="请输入风格名称"
      />
      <el-button
        size="mini"
        class="filter-item"
        type="primary"
        icon="el-icon-search"
        @click="handleFilter"
      >查找</el-button>
      <el-button
        size="mini"
        class="filter-item"
        type="primary"
        icon="el-icon-edit"
        @click="handleCreate"
      >添加</el-button>
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
        label="编号"
        prop="id"
        sortable
      />

      <el-table-column
        align="center"
        label="风格名称"
        prop="name"
      />

      <el-table-column
        :min-width="300*$root.dw+'px'"
        align="center"
        property="picUrl"
        label="风格图片"
      >
        <template slot-scope="scope">
          <el-dialog
            :visible.sync="detailDialogVisible"
            title="图片预览"
          >
            <img
              :src="lookingPicture"
              width="100%"
            >
          </el-dialog>
          <div
            style="width:100%,height:100%"
            @click="showPicture(scope.row.picUrl)"
          >
            <img
              :src="scope.row.picUrl"
              :width="100*$root.dw+'px'"
            >
          </div>
        </template>
      </el-table-column>

      <el-table-column
        align="center"
        label="操作"
        class-name="small-padding fixed-width"
      >
        <template slot-scope="scope">
          <el-button
            type="primary"
            size="mini"
            @click="handleUpdate(scope.row)"
          >编辑</el-button>
          <el-button
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
        label-width="100px"
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
          label="风格名称"
          prop="name"
        >
          <el-input v-model="dataForm.name" />
        </el-form-item>

        <el-form-item
          label="风格图片"
          prop="picUrl"
        >
          <el-upload
            :headers="headers"
            :action="uploadPath"
            :show-file-list="false"
            :on-success="uploadPicUrl"
            class="avatar-uploader"
            accept=".jpg,.jpeg,.png,.gif"
          >
            <img
              v-if="dataForm.picUrl"
              :src="dataForm.picUrl"
              class="avatar"
            >
            <i
              v-else
              class="el-icon-plus avatar-uploader-icon"
            />
          </el-upload>
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
import { brandStyleCreate, brandStyleDelete, brandStyleList, brandStyleUpdate } from '@/api/business/brandStyle'
import { uploadPath } from '@/api/business/storage'
import { getToken } from '@/utils/auth'
import Pagination from '@/components/Pagination'

export default {
  name: 'StoreLevel',
  components: { Pagination },
  data () {
    return {
      uploadPath,
      list: null,
      total: 0,
      listLoading: false,
      listQuery: {
        pid: undefined,
        name: undefined,
        page: 1,
        limit: 20,
        sort: 'add_time',
        order: 'desc'
      },
      dataForm: {
        id: undefined,
        name: undefined,
        pid: undefined,
        picUrl: undefined
      },
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: '编辑',
        create: '创建'
      },
      // 图片展示
      lookingPicture: '',
      // 图片预览弹窗
      detailDialogVisible: false,
      rules: {
        name: [
          { required: true, message: '风格名称不能为空', trigger: 'blur' }
        ]
      }
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
    this.getList()
  },
  methods: {
    getList () {
      this.listLoading = true
      brandStyleList(this.listQuery)
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
        name: undefined,
        pid: undefined,
        picUrl: undefined
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
          brandStyleCreate(this.dataForm)
            .then(() => {
              this.getList()
              this.dialogFormVisible = false
              this.$notify.success({
                title: '成功',
                message: '添加门店风格成功'
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
          brandStyleUpdate(this.dataForm)
            .then(() => {
              this.dialogFormVisible = false
              this.$notify.success({
                title: '成功',
                message: '更新门店风格成功'
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
      brandStyleDelete(row)
        .then(() => {
          this.$notify.success({
            title: '成功',
            message: '删除门店风格成功'
          })
          this.getList()
        })
        .catch(response => {
          this.$notify.error({
            title: '失败',
            message: response.errmsg
          })
        })
    },
    // 展示图片
    showPicture (url) {
      this.lookingPicture = url
      this.detailDialogVisible = true
    },
    uploadPicUrl (response) {
      this.dataForm.picUrl = response.data.url
      console.log(this.dataForm.picUrl)
    }
  }
}
</script>
