<template>
  <div class="app-container">
    <div class="body-container">
      <el-card class="box-card">
        <h3 slot="header">租户信息/权限配置</h3>
        <div class="box-card-container">
          <div class="box-card-form">
            <el-form
              ref="formData" :rules="formRules" size="mini"
              label-suffix=":" :model="formData"
              label-width="150px"
            >
              <el-form-item label="租户名" prop="username">
                <el-input v-model="userData.username" disabled placeholder="请输入租户名" maxlength="30" show-word-limit />
              </el-form-item>
              <el-form-item label="登录密码" prop="password">
                <el-input v-model="formData.password" type="password" show-password placeholder="请输入您的登录密码" maxlength="30" show-word-limit />
              </el-form-item>
              <el-form-item label="页面风格" prop="pageStyle">
                <el-select v-if="pageStyle" v-model="formData.pageStyle" clearable class="filter-item" placeholder="请选择品牌商类型">
                  <el-option
                    v-for="item in pageStyle"
                    :key="item.dictItemKey"
                    :label="item.label"
                    :value="item.dictItemKey"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="租户权限">
                <!-- <el-input v-model="formData.password" placeholder="请输入内容"></el-input> -->
                <el-button @click="$refs.PermissionModal && $refs.PermissionModal.handleOpen({ id: userId })">配置租户权限</el-button>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </el-card>

      <el-card class="box-card">
        <h3 slot="header">
          商家商品列表        <el-tooltip content="可以为您的商城添加初始化的商品，商品来源于团蜂商城，自行选择，不做强制性要求" placement="top-start">
            <i class="el-icon-question  body-form-icon"></i>
          </el-tooltip>
        </h3>
        <el-button type="primary" icon="el-icon-plus" style="margin-bottom:10px" @click="openGoodsFrom">
          添加
        </el-button>
        <el-table :data="goodsData">
          <el-table-column prop="id" label="商品id" />
          <el-table-column prop="categoryName" label="商品名" />
          <el-table-column label="商品图片" class-name="small-padding fixed-width">
            <template slot-scope="{ row }">
              <el-image
                v-if="row.picUrl" :src="row.picUrl" style="width:40px; height:40px" fit="cover"
                :preview-src-list="[ row.picUrl ]"
              />
            </template>
          </el-table-column>
          <el-table-column label="操作" width="100" class-name="small-padding fixed-width">
            <template slot-scope="{ row }">
              <el-button type="danger" size="mini" @click="deleteGoodsItem(row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="pagation">
          <el-pagination
            background
            :page-size="queryList.size"
            :current-page="queryList.page"
            layout="prev, pager, next"
            :total="totals"
            @current-change="changePage"
          >
          </el-pagination>
        </div>
      </el-card>
      <!-- 新增的商品 -->
      <el-card class="box-card">
        <h3 slot="header">
          新添加的商品        <el-tooltip content="可以为您的商城添加初始化的商品，商品来源于团蜂商城，自行选择，不做强制性要求" placement="top-start">
            <i class="el-icon-question  body-form-icon"></i>
          </el-tooltip>
        </h3>
        <el-table :data="addData">
          <el-table-column prop="id" label="商品id" />
          <el-table-column prop="categoryName" label="商品名" />
          <el-table-column label="商品图片" class-name="small-padding fixed-width">
            <template slot-scope="{ row }">
              <el-image
                v-if="row.picUrl" :src="row.picUrl" style="width:40px; height:40px" fit="cover"
                :preview-src-list="[ row.picUrl ]"
              />
            </template>
          </el-table-column>
          <el-table-column label="操作" width="100" class-name="small-padding fixed-width">
            <template slot-scope="{ row }">
              <el-button type="danger" size="mini" @click="cancelAdd(row)">撤销添加</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
      <!-- 即将删除的商品 -->
      <el-card class="box-card">
        <h3 slot="header">
          即将删除的商品        <el-tooltip content="可以为您的商城添加初始化的商品，商品来源于团蜂商城，自行选择，不做强制性要求" placement="top-start">
            <i class="el-icon-question  body-form-icon"></i>
          </el-tooltip>
        </h3>
        <el-table :data="deleteData">
          <el-table-column prop="id" label="商品id" />
          <el-table-column prop="categoryName" label="商品名" />
          <el-table-column label="商品图片" class-name="small-padding fixed-width">
            <template slot-scope="{ row }">
              <el-image
                v-if="row.picUrl" :src="row.picUrl" style="width:40px; height:40px" fit="cover"
                :preview-src-list="[ row.picUrl ]"
              />
            </template>
          </el-table-column>
          <el-table-column label="操作" width="100" class-name="small-padding fixed-width">
            <template slot-scope="{ row }">
              <el-button type="danger" size="mini" @click="cancelDelete(row)">撤销删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
    </div>
    <PermissionModal ref="PermissionModal" @success="getList"></PermissionModal>
    <div class="footer-container">
      <el-button size="medium">取消</el-button>
      <el-button type="primary" size="medium" @click="createUser">保存</el-button>
    </div>
    <GoodsList ref="goodsList" @getGoods="getGoods"></GoodsList>
  </div>
</template>

<script>
import PermissionModal from '../components/PermissionModal'
import goodsList from '../components/goodsList'
import { updatedTenant, getTenantDetail, getTenantPermisson, getTenantPfGoodsList, getQueryDeletailByKey } from '@/api/tenantOccupancy/tenantManagement'
// import { isSet } from 'xe-utils'
export default {
  // eslint-disable-next-line vue/match-component-file-name
  name: 'GoodsCreate',
  components: {
    PermissionModal,
    GoodsList: goodsList
  },
  data() {
    return {
      userId: '',
      userData: {
        'pageStyle': '',
        'id': '',
        'username': '',
        'password': '',
        'lastLoginIp': '',
        'lastLoginTime': '',
        'avatar': "'",
        'addTime': '2023-08-08 00:02:46',
        'updateTime': '2023-08-08 00:02:47',
        'deleted': false,
        'roleIds': '[]',
        'userId': '',
        'desc': '',
        'tel': '',
        'mail': '',
        'tenantId': '',
        'isTenantAccount': '0',
        'status': '0'
      },
      queryList: {
        page: 1,
        size: 10
      },
      totals: 0,
      pageStyle: null,
      formData: {
        pageStyle: '',
        password: '',
        permissions: [],
        delGoodsIds: [],
        addGoodsIds: []
      },
      goodsData: null,
      addData: [],
      deleteData: [],
      attributeVisiable: false,
      formRules: {
        password: [
          { required: false, message: '请输入密码' }
        ]
      },
      attributeForm: {
        attribute: '',
        value: ''
      }
    }
  },
  computed: {

  },
  watch: {

  },
  created() {
    getQueryDeletailByKey().then((res) => {
      this.pageStyle = res.data.sysDictItems
    })
    this.userId = this.$router.currentRoute.query.id
    this.getTenantGoodsData()
    getTenantDetail(this.userId).then((res) => {
      this.userData = res.data
      // this.formData.username = this.userData.username
      this.formData.pageStyle = this.userData.pageStyle
      // console.log(this.userData)
    })
    getTenantPermisson({ tenantId: this.userId }).then((res) => {
      this.formData.permissions = res.data.assignedPermissions
      // console.log(this.formData)
    })
  },
  methods: {
    fillterArrayDeleteItem(array1, array2) {  // !数组去重,用于判断去除商家商品列表里面已经被删除的商品
      const idSet = new Set(array2.map((obj) => obj.id))
      const resultArray = array1.filter((obj) => !idSet.has(obj.id))
      // console.log('idSet', idSet)
      // console.log('deleteArray', array2)
      // console.log('返回值', resultArray)
      return resultArray
    },
    openGoodsFrom() {
      this.$refs.goodsList.visible = true
    },
    getList(array) {
      this.formData.permissions = array
      // console.log(array)
    },
    deleteGoodsItem(row) {
      // eslint-disable-next-line eqeqeq
      this.deleteData.push(row)
      this.goodsData = this.goodsData.filter((item) => item.id != row.id)
      // this.getGoods(this.goodsData)
      // console.log(this.goodsData)
    },
    createUser() { // !修改用户信息的保存按钮，点击保存按钮之后才会正式开始数据的改变
      this.formData.delGoodsIds = this.deleteData.map((item) => item.platformReferId)
      this.formData.addGoodsIds = this.addData.map((item) => item.id)
      console.log(this.formData)
      this.$refs.formData.validate().then((res) => {
        updatedTenant({ ...this.formData, id: this.userId }).then((res) => {
          this.$router.back()
          // this.$router.replace({ name: 'tenantManagement' })
        })
      })
    },
    changePage(value) { // 翻页组件触发的事件
      this.queryList.page = value
      this.getTenantGoodsData()
    },
    getTenantGoodsData() { // 获取商品数据
      getTenantPfGoodsList({ ...this.queryList, tenantId: this.userId }).then((res) => {
        this.totals = res.data.total
        this.goodsData = this.fillterArrayDeleteItem(res.data.records, this.deleteData)
        // this.getGoods(res.data.records)
      })
    },
    getGoods(GoodsValue) {  // 每次获取商品数据时进行的处理，商品的最终数据以这个为准
      this.addData = GoodsValue
    },
    cancelAdd(row) {
      this.addData = this.addData.filter((item) => item.id !== row.id)
    },
    cancelDelete(row) {  // !撤销需要删除的商品
      this.deleteData = this.deleteData.filter((item) => item.id !== row.id)
      this.goodsData.unshift(row)
    }
  }
}
</script>

<style lang="scss" scoped>
.pagation {
  margin-top: 20px;
  display: flex;
  justify-content: center;
}
.el-input,
.el-textarea,
.el-select,
.el-cascader {
	width: 400px;
}

.input-new-keyword {
	width: 90px;
	margin-left: 10px;
	vertical-align: bottom;
}

.app-container {
	height: 100%;
	/* padding: 0; */
}

.body-container {
	flex: 1;
	overflow-y: auto;

	.box-card-container {
		min-width: 1200px;

		// display: flex;
		// justify-content: space-between;
		.box-card-form {
			// flex:1;
			// width:0;
			display: inline-block;
		}
	}

	.el-card {
		margin: 20px;
	}

	.el-tag+.el-tag {
		margin-left: 10px;
	}
}

.footer-container {
	padding: 10px 20px;
	display: flex;
	justify-content: center;
	box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)
}

.body-form-icon {
	opacity: .4;
}
</style>
