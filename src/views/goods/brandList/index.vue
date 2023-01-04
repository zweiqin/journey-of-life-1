<template>
  <div class="app-container">

    <!-- 查询和其他操作 -->
    <div class="filter-container">
      <el-input
        v-model="listQuery.id"
        clearable
        class="filter-item"
        style="width: 200px;"
        placeholder="请输入门店ID"
        @clear="getList"
      />
      <el-input
        v-model="listQuery.name"
        clearable
        class="filter-item"
        style="width: 200px;"
        placeholder="请输入门店名称"
        @clear="getList"
      />
      <el-button
        v-permission="[`GET /admin${api.brandList}`]"
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

        <el-table-column align="center" width="100" label="ID" prop="id" fixed="left" />
        <el-table-column align="center" width="150" label="门店名称" prop="name" show-overflow-tooltip fixed="left" />
        <el-table-column align="center" width="100" label="门店图片" prop="picUrl">
          <template slot-scope="{row}">
            <img :src="row.picUrl" width="40" />
          </template>
        </el-table-column>
        <el-table-column align="center" min-width="150" label="门店电话" prop="phone" show-overflow-tooltip />
        <el-table-column align="center" min-width="200" label="介绍" prop="desc" show-overflow-tooltip />
        <el-table-column align="center" min-width="100" label="底价" prop="floorPrice" show-overflow-tooltip />
        <el-table-column align="center" min-width="150" label="门店类型" prop="brandgenreName" show-overflow-tooltip />
        <el-table-column align="center" min-width="150" label="门店风格" prop="styleId" show-overflow-tooltip />
        <el-table-column align="center" width="150" label="创建时间" prop="addTime" />
        <el-table-column align="center" width="150" label="更新时间" prop="updateTime" />
        <el-table-column
          align="center"
          label="操作"
          width="100"
          fixed="right"
          class-name="small-padding fixed-width"
        >
          <template slot-scope="{row}">
            <el-button
              type="primary"
              size="mini"
              @click="handleChoose(row)"
            >选择</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <pagination
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
  brandList,
} from '@/api/business/brand'
import { getToken } from '@/utils/auth';
import { getUserInfo } from '@/api/login';
import Pagination from '@/components/Pagination';

export default {
  name: 'BrandList',
  components: {
    Pagination,
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
        id: '',
        name: '',
      },
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
    this.getRoles();
  },
  methods: {
    getRoles() {
      getUserInfo(getToken())
        .then(response => {
          this.getList();
        })
        .catch();
    },
    getList() {
      this.listLoading = true;
      brandList(this.listQuery)
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
    handleChoose (row) {
      this.$router.push({ name: 'brandGoodsListShow', query: { id: row.id } })
    }
  }
};
</script>

<style lang="scss" scoped>
/deep/ .el-rate__icon {
  margin-right: 2px;
}
</style>
