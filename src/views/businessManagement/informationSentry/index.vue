<template>
  <div class="app-container">

    <!-- 查询和其他操作 -->
    <div class="filter-container">
      <el-input
        v-model="listQuery.search"
        clearable
        size="mini"
        class="filter-item"
        style="width: 200px;"
        placeholder="请输入"
      />
      <el-select
        v-model="listQuery.status"
        size="mini"
        clearable
        class="filter-item"
        style="width: 200px;"
        placeholder="请选择"
      >
        <el-option
          v-for="item in statusList"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
      <el-button
        v-permission="[`POST ${api.messagesentryQueryMsgSentryList}`]"
        size="mini"
        class="filter-item"
        type="primary"
        icon="el-icon-search"
        @click="handleSearch"
      >查找</el-button>
      <br />
      <el-button
        v-permission="[`POST ${api.messagesentrySaveMsgSentry}`]"
        size="mini"
        type="primary"
        icon="el-icon-plus"
        @click="$refs.AddUserModal && $refs.AddUserModal.handleOpen()"
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

        <el-table-column align="center" label="ID" prop="id" width="100" fixed="left" />
        <el-table-column align="center" min-width="150" label="会员名称" prop="userName" fixed="left" show-overflow-tooltip />
        <el-table-column align="center" min-width="150" label="会员头像" prop="userAvatar">
          <template slot-scope="{row}">
            <el-image v-if="row.userAvatar" :src="row.userAvatar" style="width:40px; height:40px" fit="cover" :preview-src-list="[row.userAvatar]" />
          </template>
        </el-table-column>

        <el-table-column align="center" width="80" label="会员性别" prop="userGender">
          <template slot-scope="{row}">
            <span>{{ row.userGender | genderFilter }}</span>
          </template>
        </el-table-column>

        <el-table-column align="center" min-width="150" label="会员电话" prop="userTel" />
        <el-table-column align="center" width="80" label="购买次数" prop="buyCount" />
        <el-table-column align="center" width="80" label="报警天数" prop="setTime" />
        <el-table-column
          align="center"
          min-width="150"
          label="状态"
          prop="status"
        >
          <template slot-scope="{row}">
            <span>{{ row.status | statusFilter(statusList) }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" width="100" label="购买时间" prop="updateTime" />
        <el-table-column align="center" width="100" label="创建时间" prop="createTime" />

        <el-table-column
          align="center"
          width="100"
          label="是否转化"
          prop="isConversion"
        >
          <template slot-scope="{row}">
            <span>{{ row.isConversion ? '是' : '否' }}</span>
          </template>
        </el-table-column>

        <el-table-column align="center" min-width="100" label="职业" prop="professional" show-overflow-tooltip />
        <el-table-column align="center" min-width="100" label="爱好" prop="hobby" show-overflow-tooltip />
        <el-table-column align="center" min-width="200" label="工作地点" prop="workingPlace" show-overflow-tooltip />
        <el-table-column align="center" min-width="200" label="家庭住址" prop="homeAddress" show-overflow-tooltip />
        <el-table-column align="center" min-width="150" label="生日" prop="birthday" />
        <el-table-column align="center" min-width="150" label="业务员名称" prop="belongsSalesman" />
        <el-table-column align="center" min-width="150" label="业务员所属部门" prop="belongsDepartment" />

        <el-table-column
          label="操作"
          width="250"
          fixed="right"
          class-name="small-padding fixed-width"
        >
          <template slot-scope="{row}">
            <el-button
              v-permission="[`POST ${api.messagesentrySalesmanBinding}`]"
              size="mini"
              @click="handleBind(row)"
            >绑定业务员</el-button>
            <el-button
              v-permission="[`POST ${api.messagesentrySetOverdueTime}`]"
              type="danger"
              size="mini"
              @click="handleSetTime(row)"
            >报警时间</el-button>
            <el-button
              v-if="row.status==1"
              v-permission="[`POST ${api.messagesentryConversion}`]"
              type="success"
              size="mini"
              @click="handleUpdateStatus(row, 1)"
            >转化</el-button>
            <el-button
              v-if="row.status == 2"
              v-permission="[`POST ${api.messagesentryIsConversion}`]"
              type="warning"
              size="mini"
              @click="handleUpdateStatus(row, 3)"
            >回访</el-button>
            <el-button
              v-if="row.status == 3"
              v-permission="[`POST ${api.messagesentryIsConversion}`]"
              type="warning"
              size="mini"
              @click="handleUpdateStatus(row, 4)"
            >回访</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <Pagination
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.size"
      @pagination="getList"
    />

    <!-- 添加客户 -->
    <AddUserModal ref="AddUserModal" @success="getList" />
    <!-- 绑定业务员 -->
    <AddSalesmanModal ref="AddSalesmanModal" @success="getList" />
    <!-- 用户报警时间 -->
    <SetTimeModal ref="SetTimeModal" @success="getList" />
  </div>
</template>

<script>
import {
  api,
  messagesentryQueryMsgSentryList,
  messagesentryConversion,
  messagesentryIsConversion
} from '@/api/businessManagement/informationSentry';
import Pagination from '@/components/Pagination'; // Secondary package based on el-pagination
import AddUserModal from './components/AddUserModal'
import AddSalesmanModal from './components/AddSalesmanModal'
import SetTimeModal from './components/SetTimeModal'

export default {
  name: 'InformationSentry',
  components: {
    Pagination,
    AddUserModal,
    AddSalesmanModal,
    SetTimeModal,
  },
  filters: {
    genderFilter(val) {
      return {
        0: '未知',
        1: '男',
        2: '女'
      }[val] || '--'
    },
    statusFilter(val, list) {
      const obj = list.find(item => item.value === +val)
      return obj ? obj.label : '--'
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
        search: '',
        status: undefined
      },
      statusList: [
        { label: '收集', value: 1 },
        { label: '转化', value: 2 },
        { label: '追销', value: 3 },
        { label: '合伙人', value: 4 }
      ]
    };
  },
  created() {
    this.getList();
  },
  methods: {
    async getList() {
      this.listLoading = true;
      try {
        const res = await messagesentryQueryMsgSentryList(this.listQuery)
        this.list = res.data.items;
        this.total = res.data.total;
      } finally {
        this.listLoading = false;
      }
    },
    handleSearch() {
      this.listQuery.page = 1;
      this.getList();
    },
    async handleUpdateStatus({ id }, status) {
      const res = status == 1 ?  await messagesentryConversion({ id }) : await messagesentryIsConversion({ id, status })
      this.$message.success(`${status == 1 ? '转化' : '回访'}成功!`)
      this.getList();
    },
    handleBind({ id, belongsSalesman, belongsDepartment }) {
      this.$refs.AddSalesmanModal && this.$refs.AddSalesmanModal.handleOpen({ id, belongsSalesman, belongsDepartment })
    },
    handleSetTime({ id, setTime }) {
      this.$refs.SetTimeModal && this.$refs.SetTimeModal.handleOpen({ id, setTime })
    }
  }
};
</script>
