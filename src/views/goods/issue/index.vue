<template>
  <div class="app-container">

    <!-- 查询和其他操作 -->
    <div class="filter-container">
      <el-input
        v-model="listQuery.question"
        clearable
        class="filter-item"
        style="width: 200px;"
        placeholder="输入问题内容"
        @clear="getList"
      />
      <el-select
        v-model="listQuery.type"
        clearable
        class="filter-item"
        style="width: 200px;"
        placeholder="选择问题范围"
        @clear="getList"
      >
        <el-option
          v-for="item in issueGetTypeEnumList"
          :key="item.code"
          :label="item.value"
          :value="item.code"
        />
      </el-select>
      <el-select
        v-model="listQuery.brandId"
        clearable
        class="filter-item"
        style="width: 200px;"
        placeholder="选择门店"
        @clear="getList"
      >
        <el-option
          v-for="item in brandList"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
      <el-button
        v-permission="[`GET /admin${api.issueList}`]"
        size="mini"
        class="filter-item"
        type="primary"
        icon="el-icon-search"
        @click="handleFilter"
      >查找</el-button>
      <el-button
        v-permission="[`POST /admin${api.issueCreate}`]"
        size="mini"
        class="filter-item"
        type="primary"
        icon="el-icon-edit"
        @click="$refs.EditModal && $refs.EditModal.handleOpen({ id: '' })"
      >添加</el-button>
    </div>

    <!-- 查询结果 -->
    <div v-tableHeight>
      <el-table
        height="100%"
        v-loading="listLoading"
        element-loading-text="正在查询中。。。"
        :data="list"
        v-bind="$tableCommonOptions"
      >

        <el-table-column align="center" width="50" label="ID" prop="id" fixed="left" />
        <el-table-column align="center" width="150" label="问题范围" prop="type" show-overflow-tooltip>
          <template slot-scope="{row}">
            {{ row.type | typeFilter(issueGetTypeEnumList) }}
          </template>
        </el-table-column>
        <el-table-column align="center" min-width="150" label="问题内容" prop="question" show-overflow-tooltip />
        <el-table-column align="center" min-width="300" label="问题回复" prop="answer" show-overflow-tooltip />
      
        <el-table-column align="center" width="100" label="状态" prop="isEnable">
          <template slot-scope="{row}">
            <el-switch v-permission="[`GET /admin${api.issueChangeEnable}`]" :value ="row.isEnable" @change="switchChange(row)" />
          </template>
        </el-table-column>
      
        <el-table-column align="center" width="150" label="创建时间" prop="addTime" />
        <el-table-column align="center" width="150" label="更新时间" prop="updateTime" />
        <el-table-column
          align="center"
          label="操作"
          width="120"
          fixed="right"
          class-name="small-padding fixed-width"
        >
          <template slot-scope="{row}">
            <el-button
              v-permission="[`POST /admin${api.issueUpdate}`]"
              type="primary"
              size="mini"
              @click="handleUpdate(row)"
            >编辑</el-button>
            <el-button
              v-permission="[`POST /admin${api.issueDelete}`]"
              type="danger"
              size="mini"
              @click="handleDelete(row)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <pagination
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.size"
      @pagination="getList"
    />

    <!-- 新增编辑 -->
    <EditModal ref="EditModal" :list="issueGetTypeEnumList" @success="getList" />
  </div>
</template>

<script>
import {
  api,
  issueGetTypeEnum,
  issueList,
  issueDelete,
  issueChangeEnable,
} from '@/api/business/issue';
import { getToken } from '@/utils/auth';
import { getUserInfo } from '@/api/login';
import Pagination from '@/components/Pagination'; // Secondary package based on el-pagination
import EditModal from './components/EditModal'
import { goodsCatAndBrand } from '@/api/business/goods'

export default {
  name: 'Issue',
  components: {
    Pagination,
    EditModal,
  },
  filters: {
    typeFilter(val, list = []) {
      const obj = list.find(item => +item.code === +val)
      return obj ? obj.value : '--'
    }
  },
  data() {
    return {
      api,
      list: undefined,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        size: 20,
        question: '',
        type: '',
        brandId: '',
      },
      brandList: [],
      issueGetTypeEnumList: []
    };
  },
  computed: {
    headers() {
      return {
        'X-Dts-Admin-Token': getToken()
      };
    }
  },
  created() {
    this.getBrandList();
    this.getIssueGetTypeEnumList();
    this.getRoles();
  },
  methods: {
    async getIssueGetTypeEnumList() {
      const res = await issueGetTypeEnum()
      this.issueGetTypeEnumList = res.data
    },
    async getBrandList() {
      const res = await goodsCatAndBrand()
      this.brandList = res.data.brandList
    },
    getRoles() {
      getUserInfo(getToken())
        .then(response => {
          this.getList();
        })
        .catch();
    },
    getList() {
      this.listLoading = true;
      issueList(this.listQuery)
        .then(response => {
          this.list = response.data.items;
          this.total = response.data.total;
          this.listLoading = false;
        })
        .catch(() => {
          this.list = [];
          this.total = 0;
          this.listLoading = false;
        });
    },
    handleFilter() {
      this.listQuery.page = 1;
      this.getList();
    },
    async handleUpdate({ id, type, question, answer }) {
      this.$refs.EditModal && this.$refs.EditModal.handleOpen({ id, type, question, answer })
    },
    async switchChange({ id, isEnable }) {
      const loading =  this.$elLoading()
      await issueChangeEnable({
        id,
        isEnable: !isEnable
      })
      loading.close()
      this.$elMessage()
      this.getList()
    },
    async handleDelete({ id }) {
      await this.$elConfirm('确认删除?')
      await issueDelete({ id })
      this.$elMessage('删除成功!')
      this.handleFilter()
    }
  }
};
</script>
