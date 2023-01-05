<template>
  <div class="app-container">

    <!-- 查询和其他操作 -->
    <div class="filter-container">
      <el-input
        v-model="listQuery.userId"
        clearable
        class="filter-item"
        style="width: 200px;"
        placeholder="请输入用户编号"
        @clear="getList"
      />
      <el-input
        v-model="listQuery.valueId"
        clearable
        class="filter-item"
        style="width: 200px;"
        placeholder="请输入商品编号"
        @clear="getList"
      />
      <el-select
        v-model="listQuery.type"
        clearable
        class="filter-item"
        style="width: 200px;"
        placeholder="选择评论类型"
        @clear="getList"
      >
        <el-option
          v-for="item in typeList"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
      <el-button
        v-permission="[`GET /admin${api.commentList}`]"
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
        <el-table-column align="center" width="150" label="评论类型" prop="type">
          <template slot-scope="{row}">
            {{ row.type | typeFilter(typeList) }}
          </template>
        </el-table-column>
        <el-table-column align="center" min-width="200" label="评论内容" prop="content" show-overflow-tooltip />
        
        <el-table-column align="center" width="100" label="用户头像" prop="userImg">
          <template slot-scope="{row}">
            <img v-if="row.userImg" :src="row.userImg" width="40" />
          </template>
        </el-table-column>
        <el-table-column align="center" width="100" label="用户编号" prop="userId" show-overflow-tooltip />
        <el-table-column align="center" min-width="100" label="用户名称" prop="userName" show-overflow-tooltip />
        <el-table-column align="center" width="100" label="图片" prop="hasPicture">
          <template slot-scope="{row}">
            <template v-if="row.hasPicture">
              <img v-for="(item,index) in row.picUrls" :key="index" :src="item" width="40" style="margin-right:4px;" />
            </template>
          </template>
        </el-table-column>
        <el-table-column align="center" width="140" label="商品评分" prop="goodsStar">
          <template slot-scope="{row}">
            <el-rate v-model="row.goodsStar" disabled />
          </template>
        </el-table-column>
        <el-table-column align="center" width="140" label="物流评价" prop="logisticsStar">
          <template slot-scope="{row}">
            <el-rate v-model="row.logisticsStar" disabled />
          </template>
        </el-table-column>
        <el-table-column align="center" width="140" label="服务态度" prop="serverStar">
          <template slot-scope="{row}">
            <el-rate v-model="row.serverStar" disabled />
          </template>
        </el-table-column>

        <el-table-column align="center" width="150" label="创建时间" prop="addTime" />
        <el-table-column align="center" width="150" label="更新时间" prop="updateTime" />
        <el-table-column
          label="操作"
          width="200"
          fixed="right"
          class-name="small-padding fixed-width"
        >
          <template slot-scope="{row}">
            <el-button
              v-permission="[`POST /admin${api.commentDelete}`]"
              type="danger"
              size="mini"
              @click="handleDelete(row)"
            >删除</el-button>
            <el-button
              v-if="row.type == 0"
              v-permission="[`POST /admin${api.commentBrandReply}`]"
              type="primary"
              size="mini"
              @click="handleAddComment(row)"
            >店铺回复评论</el-button>
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
    <EditModal ref="EditModal" @success="getList" />
  </div>
</template>

<script>
import {
  api,
  commentList,
  commentDelete
} from '@/api/business/comment'
import { getToken } from '@/utils/auth';
import { getUserInfo } from '@/api/login';
import Pagination from '@/components/Pagination';
import EditModal from './components/EditModal'

export default {
  name: 'CommentList',
  components: {
    Pagination,
    EditModal,
  },
  filters: {
    typeFilter(val, list = []) {
      const obj = list.find(item => +item.value === +val)
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
        userId: '',
        valueId: '',
        type: '',
      },
      typeList: [
        { label: '商品评论', value: '0' },
        { label: '专题评论', value: '1' },
        { label: '店铺回复评论', value: '3' },
      ]
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
      commentList(this.listQuery)
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
    // 添加评论
    async handleAddComment({ type, valueId, pid }) {
      this.$refs.EditModal && this.$refs.EditModal.handleOpen({ type, valueId, pid }, '添加店铺回复评论')
    },
    async handleDelete({ id }) {
      await this.$elConfirm('确认删除?')
      await commentDelete({ id })
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
