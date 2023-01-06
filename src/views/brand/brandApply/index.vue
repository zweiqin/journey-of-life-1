<template>
  <div class="app-container">

    <!-- 查询和其他操作 -->
    <div class="filter-container">
      <el-input
        v-model="listQuery.userId"
        clearable
        class="filter-item"
        style="width: 200px;"
        placeholder="请输入会员ID"
      />
      <el-select
        v-model="listQuery.status"
        clearable
        class="filter-item"
        style="width: 200px;"
        placeholder="选择状态"
      >
        <el-option
          v-for="item in statusList"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
      <el-button
        v-permission="[`GET /admin${api.userupList}`]"
        size="mini"
        class="filter-item"
        type="primary"
        icon="el-icon-search"
        style="margin-left:10px;"
        @click="handleFilter"
      >查找</el-button>
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
        <el-table-column align="center" min-width="150" label="会员名称" prop="username" show-overflow-tooltip />
        <el-table-column align="center" min-width="100" label="状态" prop="status">
          <template slot-scope="{row}">
            {{ row.status | typeFilter(statusList) }}
          </template>
        </el-table-column>
        <!-- <el-table-column align="center" width="100" label="图片" prop="picUrl">
          <template slot-scope="{row}">
            <el-image v-if="row.picUrl" :src="row.picUrl" style="width:40px; height:40px" fit="cover" :preview-src-list="[row.picUrl]" />
          </template>
        </el-table-column> -->
        <el-table-column align="center" min-width="150" label="创建时间" prop="addTime" />
        <el-table-column align="center" min-width="150" label="更新时间" prop="updateTime" />
        <el-table-column
          label="操作"
          width="160"
          fixed="right"
          class-name="small-padding fixed-width"
        >
          <template slot-scope="{row}">
            <el-button
              v-if="row.status == 0"
              v-permission="[`POST /admin${api.userupManage}`]"
              type="primary"
              size="mini"
              @click="handleUpdate(row.id, 5)"
            >开始审核</el-button>
            <el-button
              v-if="row.status == 1"
              v-permission="[`POST /admin${api.userupManage}`]"
              type="danger"
              size="mini"
              @click="handleUpdate(row.id, 2)"
            >驳回</el-button>
            <el-button
              v-permission="[`POST /admin${api.userupManage}`]"
              v-if="row.status == 1"
              type="warning"
              size="mini"
              @click="handleUpgrade(row)"
            >通过并注册</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <Pagination
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.limit"
      @pagination="getList"
    />

  </div>
</template>

<script>
import {
  api,
  userupList,
  userupManage,
  userupSignin,
} from '@/api/brand/brandApply'
import Pagination from '@/components/Pagination';

export default {
  name: 'BrandApply',
  components: {
    Pagination,
  },
  filters: {
    typeFilter(val, list = []) {
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
        limit: 20,
        name: '',
      },
      statusList: [
        { label: '用户主动撤销', value: -2 },
        { label: '已驳回', value: -3 },
        { label: '待审核', value: 0 },
        { label: '审核中', value: 1 },
        { label: '未创建账户', value: 5 },
        { label: '已创建账户', value: 6 },
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
        const res = await userupList(this.listQuery)
        this.list = res.data.items;
        this.total = res.data.total;
      } finally {
        this.listLoading = false;
      }
    },
    handleFilter() {
      this.listQuery.page = 1;
      this.getList();
    },
    async handleUpdate(id, stateEnum) {
      await userupManage({
        id,
        stateEnum
      })
      this.$elMessage('操作成功!')
      this.getList()
    },
    // 状态5的时候，手动升级
    async handleUpgrade({ id, userId }) {
      await userupSignin({
        id,
        userId
      })
      this.$elMessage('操作成功!')
      this.getList()
    },
  }
};
</script>
