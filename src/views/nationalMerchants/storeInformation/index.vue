<template>
  <div class="app-container">
    <!-- 查询和其他操作 -->
    <div class="filter-container">
      <el-input
        v-model="listQuery.keywords"
        clearable
        class="filter-item"
        style="width: 200px"
        placeholder="请输入商家分类、名称等"
        @keyup.enter.native="getList"
      />

      <el-select
        v-model="listQuery.radius"
        clearable
        size="mini"
        class="filter-item"
        style="width: 200px"
        placeholder="请选择附近商家范围"
      >
        <el-option
          v-for="item in radiusList"
          :key="item.id"
          :label="item.label"
          :value="item.value"
        />
      </el-select>

      <el-cascader
        v-model="listQuery.address"
        placeholder="选择区域"
        :options="common_regionList"
        :props="{
          checkStrictly: true,
          label: 'name',
          value: 'name',
          expandTrigger: 'hover',
        }"
        clearable
        size="mini"
        class="filter-item"
        style="width: 200px"
      />

      <el-input
        :disabled="!listQuery.address"
        clearable
        class="filter-item"
        v-model="listQuery.detail"
        style="width: 200px"
        placeholder="请输入详细地址"
        @keyup.enter.native="getList"
      ></el-input>

      <el-button
        size="mini"
        class="filter-item"
        type="primary"
        icon="el-icon-search"
        style="margin-left: 10px"
        @click="getList"
      >
        查找
      </el-button>

      <el-button
        size="mini"
        class="filter-item"
        type="info"
        style="margin-left: 10px"
        @click="handleReset"
      >
        重置
      </el-button>
    </div>

    <TableTools
      :custom-columns-config="customColumnsConfig"
      download
      custom-field
      @update-fields="updateFields"
      @refresh="getList"
      @download="toolsMixin_exportMethod($refs.vxeTable, exportExcelName)"
    >
    </TableTools>

    <!-- 查询结果 -->
    <VxeTable
      ref="vxeTable"
      v-model="listQuery"
      :local-key="customColumnsConfig.localKey"
      api-method="GET"
      :api-path="api.getNearbyBusiness"
      :columns="columns"
    >
      <template #tel="{ row }">
        <div v-if="row.tel && row.tel.split">
          <el-button
            type="text"
            v-for="item in row.tel.split(';')"
            :key="item"
            >{{ item }}</el-button
          >
        </div>
        <div v-else>--</div>
      </template>

      <template #type="{ row }">
        <div v-if="row.type && row.type.split">
          <el-tag
            type="success"
            style="margin-right: 5px"
            v-for="(item, index) in row.type.split(';')"
            :key="index"
            >{{ item }}</el-tag
          >
        </div>
        <div v-else>--</div>
      </template>

      <template #photos="{ row }">
        <el-popover placement="right" width="400" trigger="click">
          <div class="image-list" v-if="row.photos && row.photos.length">
            <el-carousel indicator-position="outside">
              <el-carousel-item v-for="(item, index) in row.photos" :key="index">
                <el-image
                  :src="item.url"
                  :preview-src-list="row.photos.map((item) => item.url)"
                ></el-image>
              </el-carousel-item>
            </el-carousel>
          </div>
          <el-button type="text" slot="reference">{{
            row.photos && row.photos.length ? '商家图片' : '--'
          }}</el-button>
        </el-popover>
      </template>
      <!-- <template #operate="{ row }">
        <el-button
          v-permission="[`POST /admin${api.queryCustomerPoolList}`]"
          size="mini"
          @click="handleDetail(row)"
        >
          查看
        </el-button>
      </template> -->
    </VxeTable>
  </div>
</template>

<script>
import { api } from '@/api/nationalMerchants/storeInformation';
import VxeTable from '@/components/VxeTable';
import TableTools from '@/components/TableTools';
import { columns, radiusList } from './table';
import { mapGetters } from 'vuex';

export default {
  name: 'storeInformation',
  components: {
    VxeTable,
    TableTools,
  },
  data() {
    return {
      api,
      columns,
      customColumnsConfig: {
        localKey: 'storeInformation',
        columnsOptions: columns,
      },
      radiusList: Object.freeze(radiusList),
      listQuery: {
        page: 1,
        limit: 20,
        keywords: '',
        radius: '',
        address: '',
        detail: '',
      },
      exportExcelName: '',
    };
  },
  watch: {
    listQuery: {
      handler(value) {
        const address = value.address ? '-' + value.address + value.detail : '';
        const keywords = value.keywords ? '-' + value.keywords : '';
        this.exportExcelName = '全国商家' + address + keywords;
      },

      deep: true,
    },
  },
  methods: {
    // 自定义列
    updateFields(columns) {
      this.columns = columns;
    },
    getList(meaning) {
      this.listQuery.address = Array.isArray(this.listQuery.address)
        ? this.listQuery.address.join()
        : this.listQuery.address;
      meaning === 'keepPage'
        ? (this.listQuery = {
            ...this.listQuery,
          })
        : (this.listQuery = {
            ...this.listQuery,
            page: 1,
          });
    },
    handleDetail(row) {
      this.$refs.DetailModal && this.$refs.DetailModal.handleOpen(row);
    },

    // 重置表单
    handleReset() {
      this.listQuery.address = '';
      this.listQuery.radius = '';
      this.listQuery.detail = '';
      this.listQuery.keywords = '';
      this.getList('keepPage');
    },
  },
  computed: {
    ...mapGetters(['common_regionList']),
  },
};
</script>
