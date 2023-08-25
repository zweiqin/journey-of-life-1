<template>
  <div class="app-container">

    <!-- 查询和其他操作 -->
    <div class="filter-container">
      <el-button
        v-permission="[ `POST /admin${api.customerCategoryAddCategory}` ]" size="mini" class="filter-item"
        type="primary" icon="el-icon-edit" @click="handleCreate"
      >
        添加
      </el-button>
    </div>

    <!-- 查询结果 -->
    <div v-tableHeight>
      <el-table
        ref="multipleTable" v-loading="listLoading" height="100%" element-loading-text="正在查询中。。。"
        :data="list"
        v-bind="$tableCommonOptions" row-key="id" border :default-expand-all="false"
        :tree-props="{ children: 'children' }"
      >
        <el-table-column align="center" width="140" label="分类ID" prop="id" sortable />

        <el-table-column align="center" label="分类名称" prop="name" />

        <el-table-column align="center" label="分类图标" prop="picUrl">
          <template slot-scope="scope">
            <el-image
              v-if="scope.row.iconUrl" :src="scope.row.picUrl" style="width:40px; height:40px" fit="cover"
              :preview-src-list="[ scope.row.picUrl ]"
            />
            <span v-else>--</span>
          </template>
        </el-table-column>

        <el-table-column align="center" min-width="100" label="排序" prop="sortOrder" />

        <el-table-column align="center" width="140" label="级别" prop="level">

          <template slot-scope="scope">
            <el-tag :type="scope.row.level == '1' ? 'primary' : 'info'">
              {{ scope.row.level == '1' ? '一级分类' : scope.row.level == '2' ? '二级分类' : '--' }}
            </el-tag>
          </template>
        </el-table-column>

        <el-table-column align="center" label="父类目ID" prop="parentId" />

        <el-table-column align="center" fixed="right" label="操作" width="200" class-name="small-padding fixed-width">
          <template slot-scope="scope">
            <el-button
              v-permission="[ `POST /admin${api.customerCategoryUpdateCategory}` ]" type="primary" size="mini"
              @click="handleUpdate(scope.row)"
            >
              编辑
            </el-button>
            <el-button
              v-permission="[ `POST /admin${api.customerCategoryDelete}` ]" type="danger" size="mini"
              @click="handleDelete(scope.row)"
            >
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>

    </div>

    <!-- 添加或修改对话框 -->
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form
        ref="formData" :rules="formRules" :model="formData" status-icon
        label-position="left" label-width="100px"
        style="width: 400px; margin-left:50px;"
      >
        <el-form-item label="分类名称" prop="name">
          <el-input v-model="formData.name" placeholder="请输入分类名称" />
        </el-form-item>
        <el-form-item label="分类图标" prop="picUrl">
          <MyUpload v-model="formData.picUrl" />
        </el-form-item>
        <el-form-item label="级别" prop="level">
          <el-select v-model="formData.level" @change="formData.parentId = ''">
            <el-option label="一级分类" :value="1" />
            <el-option label="二级分类" :value="2" />
          </el-select>
        </el-form-item>
        <el-form-item v-if="formData.level == 2" label="父类目" prop="parentId">
          <el-select v-model="formData.parentId">
            <el-option v-for="item in catL1" :key="item.id" :label="item.name" :value="item.id" />
          </el-select>
        </el-form-item>
        <el-form-item label="排序" prop="sortOrder">
          <el-input v-model="formData.sortOrder" placeholder="请输入排序数字" />
        </el-form-item>
        <div v-if="formData.level == 2">
          <el-form-item label="回答描述" prop="answer.describe">
            <el-input
              v-model="formData.answer.describe" type="textarea" :autosize="{ minRows: 3, maxRows: 5 }"
              maxlength="520" show-word-limit placeholder="请输入回答描述"
            />
          </el-form-item>
          <el-form-item label="回答图片" prop="answer.picUrl">
            <MyUpload v-model="formData.answer.picUrl" />
          </el-form-item>
        </div>
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
import MyUpload from '@/components/MyUpload'
import { api, customerCategorySingleStage, customerCategoryTree, customerCategorySelectId, customerCategoryAddCategory, customerCategoryUpdateCategory, customerCategoryDelete } from '@/api/customerServiceSystem/problemClassificationList'
import XeUtils from 'xe-utils'

export default {
  name: 'ProblemClassificationList',
  components: {
    MyUpload
  },
  data() {
    return {
      api,
      list: [],
      listLoading: true,
      catL1: [],
      // catL2: [],
      formData: {
        id: '',
        parentId: '',
        name: '',
        picUrl: '',
        level: '',
        sortOrder: '',
        answer: {
          id: '',
          categoryId: '',
          describe: '',
          picUrl: ''
        }
      },
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: '编辑',
        create: '创建'
      },
      formRules: {
        'name': [ { required: true, message: '分类名称不能为空', trigger: 'blur' } ],
        'level': [ { required: true, message: '请选择分类级别', trigger: 'blur' } ]
      },
      downloadLoading: false
    }
  },
  created() {
    this.getList()
    this.getCatL1()
  },
  methods: {
    getList() {
      this.listLoading = true
      customerCategoryTree()
        .then((res) => {
          XeUtils.eachTree(res.data, (item) => {
            if (Array.isArray(item.children) && item.children.length === 0) {
              item.children = undefined
              // item.hasChildren = false
            } else if (Array.isArray(item.children) && item.children.length !== 0) {
              // item.hasChildren = true
            }
          })
          this.list = res.data || []
          this.listLoading = false
        })
        .catch(() => {
          this.list = []
          this.listLoading = false
        })
    },
    getCatL1() {
      customerCategorySingleStage({ pid: 0 }).then((res) => {
        this.catL1 = res.data || []
      })
    },
    // getCatL2(id) {
    // 	customerCategorySingleStage({ pid: id }).then((res) => {
    // 		this.catL2 = res.data || []
    // 	})
    // },
    resetForm() {
      this.formData = {
        id: '',
        parentId: '',
        name: '',
        picUrl: '',
        level: '',
        sortOrder: '',
        answer: {
          id: '',
          categoryId: '',
          describe: '',
          picUrl: ''
        }
      }
    },
    handleCreate() {
      this.resetForm()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs.formData.clearValidate()
      })
    },
    async handleUpdate(row) {
      const loading = this.$elLoading('加载中')
      try {
        const res = await customerCategorySelectId({ id: row.id })
        this.formData = Object.assign({}, {
          id: res.data.id || '',
          parentId: res.data.parentId || '',
          name: res.data.name || '',
          picUrl: res.data.picUrl || '',
          level: res.data.level || '',
          sortOrder: res.data.sortOrder || '',
          answer: {
            id: res.data.answer ? res.data.answer.id : '',
            categoryId: res.data.answer ? res.data.answer.categoryId : '',
            describe: res.data.answer ? res.data.answer.describe : '',
            picUrl: res.data.answer ? res.data.answer.picUrl : ''
          }
        })
        this.dialogStatus = 'update'
        this.dialogFormVisible = true
        this.$nextTick(() => {
          this.$refs.formData.clearValidate()
        })
        loading.close()
      } catch (e) {
        loading.close()
      }
    },
    async createData() {
      await this.$validatorForm('formData')
      const loading = this.$elLoading()
      try {
        if (this.formData.level == 2) {
          if (!this.formData.parentId) {
            return this.$elMessage('请填写所属父分类', 'warning')
          } else if (!this.formData.answer.describe) {
            return this.$elMessage('请输入回答描述', 'warning')
          } else if (!this.formData.answer.picUrl) {
            return this.$elMessage('请上传回答图片', 'warning')
          }
        }
        await customerCategoryAddCategory(this.formData)
        loading.close()
        this.dialogFormVisible = false
        this.$elMessage('创建成功')
        this.getList()
        this.getCatL1()
      } catch (e) {
        loading.close()
      }
    },
    async updateData() {
      await this.$validatorForm('formData')
      const loading = this.$elLoading()
      try {
        if (this.formData.level == 2) {
          if (!this.formData.parentId) {
            return this.$elMessage('请填写所属父分类', 'warning')
          } else if (!this.formData.answer.describe) {
            return this.$elMessage('请输入回答描述', 'warning')
          } else if (!this.formData.answer.picUrl) {
            return this.$elMessage('请上传回答图片', 'warning')
          }
        }
        await customerCategoryUpdateCategory(this.formData)
        loading.close()
        this.dialogFormVisible = false
        this.$elMessage('更新成功')
        this.getList()
        this.getCatL1()
      } catch (e) {
        loading.close()
      }
    },
    async handleDelete(row) {
      await this.$elConfirm('确认删除?')
      await customerCategoryDelete({ id: row.id })
      this.$elMessage('删除成功')
      this.getList()
      this.getCatL1()
    }
  }
}
</script>
