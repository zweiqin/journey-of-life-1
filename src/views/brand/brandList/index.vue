<template>
  <div class="app-container">
    <!-- 查询和其他操作 -->
    <div class="filter-container">
      <el-input
        v-model="listQuery.name"
        clearable
        class="filter-item"
        style="width: 200px;"
        placeholder="输入公司名称"
      />
      <el-input
        v-model="listQuery.keeperName"
        clearable
        class="filter-item"
        style="width: 200px;"
        placeholder="输入店主名称"
      />
      <el-input
        v-model="listQuery.phone"
        clearable
        class="filter-item"
        style="width: 200px;"
        placeholder="输入电话"
      />
      <el-cascader
        v-model="listQuery.region_arr"
        placeholder="选择区域"
        :options="common_regionList"
        :props="{ checkStrictly: true, label: 'name', value: 'code' }"
        expand-trigger="hover"
        clearable
        size="mini"
        class="filter-item"
        style="width: 200px;"
      />
      <el-select
        v-model="listQuery.styleId"
        placeholder="选择门店风格"
        clearable
        filterable
        class="filter-item"
        style="width: 200px;"
      >
        <el-option
          v-for="item in brandStyleList"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        />
      </el-select>
      <el-select
        v-model="listQuery.labelId"
        placeholder="选择门店标签"
        clearable
        filterable
        class="filter-item"
        style="width: 200px;"
      >
        <el-option
          v-for="item in brandLabelList"
          :key="item.code"
          :label="item.value"
          :value="item.code"
        />
      </el-select>
      <el-select
        v-model="listQuery.administratorId"
        placeholder="选择负责人"
        clearable
        filterable
        class="filter-item"
        style="width: 200px;"
      >
        <el-option
          v-for="item in staffList"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        >{{ item.roleName }}-{{item.name}}</el-option>
      </el-select>
      <el-button
        v-permission="[`GET /admin${api.brandList}`]"
        size="mini"
        class="filter-item"
        type="primary"
        icon="el-icon-search"
        style="margin-left:10px;"
        @click="handleFilter"
      >查找</el-button>
      <el-button
      brandCreate
        v-permission="[`POST /admin${api.brandCreate}`]"
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

        <el-table-column align="center" width="100" label="ID" prop="id" fixed="left" />
        <el-table-column align="center" width="150" label="公司名称" prop="name" fixed="left" show-overflow-tooltip />
        <el-table-column align="center" width="150" label="店主名称" prop="keeperName" fixed="left" show-overflow-tooltip />
        <el-table-column align="center" width="200" label="简介" prop="desc" show-overflow-tooltip />
        <el-table-column align="center" width="150" label="电话" prop="phone" show-overflow-tooltip />
        <el-table-column align="center" width="100" label="公司图片" prop="picUrl">
          <template slot-scope="{row}">
            <el-image v-if="row.picUrl" :src="row.picUrl" style="width:40px; height:40px" fit="cover" :preview-src-list="[row.picUrl]" />
          </template>
        </el-table-column>
        <el-table-column align="center" min-width="150" label="区域" prop="regionList" show-overflow-tooltip />
        <el-table-column align="center" min-width="150" label="门店类型" prop="brandgenreName" show-overflow-tooltip />
        <el-table-column align="center" min-width="150" label="门店风格" prop="styleName" show-overflow-tooltip />
        <el-table-column align="center" width="100" label="产品数量" prop="productAmount" show-overflow-tooltip />
        <el-table-column align="center" width="100" label="员工数量" prop="employeeAmount" show-overflow-tooltip />
        <el-table-column align="center" width="150" label="上级名称" prop="chargeName" show-overflow-tooltip />
        <el-table-column align="center" width="150" label="创建时间" prop="addTime" />
        <el-table-column align="center" width="150" label="更新时间" prop="updateTime" />
        <el-table-column
          align="center"
          label="操作"
          width="150"
          fixed="right"
          class-name="small-padding fixed-width"
        >
          <template slot-scope="{row}">
            <el-button
              type="primary"
              size="mini"
              @click="handleChoose(row)"
            >查看商品</el-button>
            <el-button
              v-permission="[`POST /admin${api.brandDelete}`]"
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
      :limit.sync="listQuery.limit"
      @pagination="getList"
    />

    <!-- 新增编辑 -->
    <EditModal ref="EditModal" @success="getList" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Pagination from '@/components/Pagination';
import EditModal from './components/EditModal'
import {
  api,
  brandList,
  brandDelete,
} from '@/api/brand/brandList'
import { brandLabelList } from '@/api/brand/brandList'
import { brandStyleList } from '@/api/brand/brandStyle'
import { staffList } from '@/api/enterprise/staff'

export default {
  name: 'BrandList',
  components: {
    Pagination,
    EditModal,
  },
  computed: {
    ...mapGetters([
      'common_regionList'
    ]),
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
        regionCode: '',
        keeperName: '',
        phone: '',
        labelId: '',
        styleId: '',
        administratorId: '',
      },
      brandLabelList: [],
      brandStyleList: [],
      staffList: [],
    };
  },
  created() {
    this.getBrandLabelList();
    this.getBrandStyleList();
    this.getStaffList();
    this.getList();
  },
  methods: {
    // 商品标签
    async getBrandLabelList() {
      const res = await brandLabelList()
      this.brandLabelList = res.data.data
    },
    // 商品风格
    async getBrandStyleList() {
      const res = await brandStyleList({
        page: 1,
        limit: 9999
      })
      this.brandStyleList = res.data.items
    },
    // 员工列表
    async getStaffList() {
      const res = await staffList({
        page: 1,
        limit: 9999,
      })
      this.staffList = res.data.items
    },
    async getList() {
      this.listLoading = true;
      try {
        const res = await brandList(this.listQuery)
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
    handleChoose (row) {
      this.$router.push({ name: 'BrandGoods', query: { brandId: row.id } })
    },
    async handleDelete({ id }) {
      await this.$elConfirm('确认删除?')
      await brandDelete({ id })
      this.$elMessage('删除成功!')
      this.handleFilter()
    }
  }
};
</script>

<style lang="scss" scoped>
/deep/ .el-rate__icon {
  margin-right: 2px;
}
</style>
