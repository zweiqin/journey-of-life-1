<template>
  <div class="app-container">

    <!-- 查询和其他操作 -->
    <div class="filter-container">
      <el-input
        v-model="listQuery.msgSay"
        clearable
        class="filter-item"
        style="width: 200px;"
        placeholder="请输入话术"
        @clear="getList"
      />
      <el-select
        v-model="listQuery.msgSayType"
        clearable
        class="filter-item"
        style="width: 200px;"
        placeholder="请选择话术类型"
        @clear="getList"
      >
        <el-option
          v-for="item in msgSayTypeList"
          :key="item.code"
          :label="item.name"
          :value="item.code"
        />
      </el-select>
      <el-button
        v-permission="['POST /messagesentry/queryMsgSentryList']"
        size="mini"
        class="filter-item"
        type="primary"
        icon="el-icon-search"
        @click="handleFilter"
      >查找</el-button>
      <el-button
        v-permission="['POST /admin/salesman/create']"
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
        :data="list"
        v-bind="$tableCommonOptions"
      >

        <el-table-column align="center" min-width="100px" label="ID" prop="id" width="50" fixed="left" />
        <el-table-column align="center" min-width="150px" label="话术内容" prop="say" show-overflow-tooltip />
        <el-table-column align="center" min-width="150px" label="话术类型" prop="userGender">
          <template slot-scope="{row}">
            <span>{{ row.type | typeFilter(msgSayTypeList) }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" width="150px" label="创建时间" prop="createTime" />
        <el-table-column align="center" width="100px" label="更新时间" prop="updateTime" />
        <el-table-column
          align="center"
          label="操作"
          width="150"
          fixed="right"
          class-name="small-padding fixed-width"
        >
          <template slot-scope="{row}">
            <el-button
              v-permission="['POST /admin/prices/update']"
              type="primary"
              size="mini"
              @click="handleUpdate(row)"
            >编辑</el-button>
            <el-button
              v-permission="['POST /admin/prices/update']"
              type="danger"
              size="mini"
              @click="handleDelete(row)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.size"
      @pagination="getList"
    />

    <!-- 新增编辑 -->
    <EditModal ref="EditModal" :list="msgSayTypeList" @success="getList" />
  </div>
</template>

<script>
import {
  msgsayMsgSayTypeList,
  msgsayMsgSayList,
  msgsayDeleteById,
} from '@/api/businessManagement/scriptSetting';
import { getToken } from '@/utils/auth';
import { getUserInfo } from '@/api/login';
import Pagination from '@/components/Pagination'; // Secondary package based on el-pagination
import EditModal from './components/EditModal'

export default {
  name: 'scriptSetting',
  components: {
    Pagination,
    EditModal,
  },
  filters: {
    typeFilter(val, list = []) {
      const obj = list.find(item => item.code === +val)
      return obj ? obj.name : '--'
    }
  },
  data() {
    return {
      list: undefined,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        size: 20,
        msgSay: '',
        msgSayType: undefined
      },
      msgSayTypeList: []
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
    this.getMsgSayTypeList();
    this.getRoles();
  },
  methods: {
    async getMsgSayTypeList() {
      const res = await msgsayMsgSayTypeList()
      this.msgSayTypeList = res.data
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
      msgsayMsgSayList(this.listQuery)
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
    async handleUpdate({ id, say, type }) {
      this.$refs.EditModal && this.$refs.EditModal.handleOpen({ id, say, type })
    },
    async handleDelete({ id }) {
      await this.$elConfirm('确认删除?')
      await msgsayDeleteById({ id })
      this.$elMessage('删除成功!')
      this.handleFilter()
    }
  }
};
</script>
