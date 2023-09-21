<template>
  <div class="app-container">

    <!-- 查询和其他操作 -->
    <div class="filter-container">
      <el-input
        v-model="listQuery.name" clearable size="mini" class="filter-item"
        style="width: 200px;"
        placeholder="请输入广告标题" @keyup.enter.native="getList"
      />
      <el-input
        v-model="listQuery.content" clearable size="mini" class="filter-item"
        style="width: 200px;"
        placeholder="请输入广告内容" @keyup.enter.native="getList"
      />
      <el-button
        v-permission="[ `GET ${api.listAd}` ]" size="mini" class="filter-item" type="primary"
        icon="el-icon-search" @click="getList"
      >
        查找
      </el-button>
    </div>

    <TableTools
      :custom-columns-config="customColumnsConfig" download custom-field @update-fields="updateFields"
      @refresh="getList" @download="toolsMixin_exportMethod($refs.vxeTable, '广告管理')"
    >
      <el-button
        v-permission="[ `POST ${'/admin' + api.createAd}` ]" size="mini" class="filter-item" type="primary"
        icon="el-icon-plus" @click="handleCreate"
      >
        添加
      </el-button>
    </TableTools>

    <!-- 查询结果 -->
    <VxeTable
      ref="vxeTable" v-model="listQuery" :local-key="customColumnsConfig.localKey" api-method="GET"
      :api-path="api.listAd" :columns="columns"
    >
      <template #url="{ row }">
        <img v-if="row.url" :src="row.url" width="80">
      </template>
      <template #enabled="{ row }">
        <el-tag :type="row.enabled ? 'success' : 'error'">{{ row.enabled ? '启用' : '不启用' }}</el-tag>
      </template>
      <template #operate="{ row }">
        <el-button v-permission="[ `POST ${'/admin' + api.updateAd}` ]" size="mini" @click="handleUpdate(row)">
          编辑
        </el-button>
        <el-button v-permission="[ `POST ${'/admin' + api.deleteAd}` ]" type="danger" size="mini" @click="handleDelete(row)">
          删除
        </el-button>
      </template>
    </VxeTable>

    <!-- 添加或修改对话框 -->
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form
        ref="dataForm" :rules="rules" :model="dataForm" status-icon
        label-position="left" label-width="100px"
        style="width: 400px; margin-left:50px;"
      >
        <el-form-item label="广告标题" prop="name">
          <el-input v-model="dataForm.name" />
        </el-form-item>
        <el-form-item label="广告内容" prop="content">
          <el-input v-model="dataForm.content" />
        </el-form-item>
        <el-form-item label="广告图片" prop="url">
          <el-upload
            :headers="headers" :action="uploadPath" :show-file-list="false" :on-success="uploadUrl"
            class="avatar-uploader" accept=".jpg,.jpeg,.png,.gif"
          >
            <img v-if="dataForm.url" :src="dataForm.url" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon" />
          </el-upload>
        </el-form-item>
        <el-form-item label="广告位置" prop="position">
          <el-select v-model="dataForm.position" placeholder="请选择">
            <el-option :value="1" label="首页" />
          </el-select>
        </el-form-item>
        <el-form-item label="活动链接" prop="link">
          <el-input v-model="dataForm.link" />
        </el-form-item>
        <el-form-item label="是否启用" prop="enabled">
          <el-select v-model="dataForm.enabled" placeholder="请选择">
            <el-option :value="true" label="启用" />
            <el-option :value="false" label="不启用" />
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button v-if="dialogStatus == 'create'" type="primary" @click="createData">确定</el-button>
        <el-button v-else type="primary" @click="updateData">确定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import { api, createAd, updateAd, deleteAd } from '@/api/business/ad'
import VxeTable from '@/components/VxeTable'
import TableTools from '@/components/TableTools'
import { uploadPath } from '@/api/business/storage'
import { getToken } from '@/utils/auth'
import { columns } from './table'

export default {
  name: 'Ad',
  components: {
    VxeTable,
    TableTools
  },
  data() {
    return {
      uploadPath,
      api,
      columns,
      customColumnsConfig: {
        localKey: 'ad',
        columnsOptions: columns
      },
      listQuery: {
        page: 1,
        limit: 20,
        name: undefined,
        content: undefined,
        sort: 'add_time',
        order: 'desc'
      },
      dataForm: {
        id: undefined,
        name: undefined,
        content: undefined,
        url: undefined,
        link: undefined,
        position: 1,
        enabled: true
      },
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: '编辑',
        create: '创建'
      },
      rules: {
        name: [
          { required: true, message: '广告标题不能为空', trigger: 'blur' }
        ],
        content: [
          { required: true, message: '广告内容不能为空', trigger: 'blur' }
        ],
        url: [ { required: true, message: '广告链接不能为空', trigger: 'blur' } ]
      },
      downloadLoading: false
    }
  },
  computed: {
    headers() {
      return {
        'X-Dts-Admin-Token': getToken()
      }
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
    resetForm() {
      this.dataForm = {
        id: undefined,
        name: undefined,
        content: undefined,
        url: undefined,
        link: undefined,
        position: 1,
        enabled: true
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
    uploadUrl(response) {
      this.dataForm.url = response.data.url
    },
    createData() {
      this.$refs.dataForm.validate((valid) => {
        if (valid) {
          createAd(this.dataForm)
            .then((response) => {
              this.list.unshift(response.data)
              this.dialogFormVisible = false
              this.$notify.success({
                title: '成功',
                message: '创建成功'
              })
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
          updateAd(this.dataForm)
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
                message: '更新广告成功'
              })
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
      deleteAd(row)
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
