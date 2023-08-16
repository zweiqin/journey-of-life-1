<template>
  <div class="app-container">
    <div class="body-container">
      <el-card class="box-card">
        <h3 slot="header">
          租户信息/权限配置 <el-tooltip content="请务必配置好租户管理、商品管理、订单管理、用户列表、企业管理、系统管理！！！这很重要" placement="top-start">
            <i class="el-icon-question  body-form-icon"></i>
          </el-tooltip>
        </h3>
        <div class="box-card-container">
          <div class="box-card-form">
            <el-form
              ref="formData" :rules="formRules" size="mini"
              label-suffix=":" :model="formData"
              label-width="150px"
            >
              <el-form-item label="租户名" prop="username">
                <el-input v-model="formData.username" placeholder="请输入租户名" maxlength="30" show-word-limit />
              </el-form-item>
              <el-form-item label="登录密码" prop="password">
                <el-input v-model="formData.password" type="password" show-password placeholder="请输入您的登录密码" maxlength="30" show-word-limit />
              </el-form-item>
              <el-form-item label="页面风格" prop="pageStyle">
                <el-select v-if="pageStyle" v-model="formData.pageStyle" clearable class="filter-item" placeholder="请选择品牌商类型">
                  <el-option
                    v-for="item in pageStyle"
                    :key="item.dictKey + item.dictItemKey"
                    :label="item.label"
                    :value="item.dictItemKey"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="租户权限">
                <!-- <el-input v-model="formData.password" placeholder="请输入内容"></el-input> -->
                <el-button @click="$refs.PermissionModal && $refs.PermissionModal.handleOpen()">
                  配置租户权限
                </el-button>
                <el-tooltip content="请务必配置好租户管理、商品管理、订单管理、用户列表、企业管理、系统管理！！！这很重要！！！" placement="top-start">
                  <i class="el-icon-question  body-form-icon"></i>
                </el-tooltip>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </el-card>

      <el-card class="box-card">
        <h3 slot="header">
          初始化商品        <el-tooltip content="可以为您的商城添加初始化的商品，商品来源于团蜂商城，自行选择，不做强制性要求" placement="top-start">
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
              <el-button type="danger" size="mini">删除</el-button>
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
import { createTenant, getQueryDeletailByKey } from '@/api/tenantOccupancy/tenantManagement'
export default {
  name: 'GoodsCreate',
  components: {
    PermissionModal,
    GoodsList: goodsList
  },
  data() {
    return {
      pageStyle: null,
      formData: {
        username: '',
        password: '',
        pageStyle: '',
        permissions: [],
        goodsIds: []
      },
      goodsData: null,
      attributeVisiable: false,
      formRules: {
        username: [
          { required: true, message: '请输入账户名' }
        ],
        password: [
          { required: true, message: '请输入密码' }
        ],
        pageStyle: [
          { required: true, message: '请选择你的页面风格' }
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
  },

  methods: {
    openGoodsFrom() {
      this.$refs.goodsList.visible = true
    },
    getList(array) {
      this.formData.permissions = array
      // console.log(array)
    },
    createUser() {
      this.$refs.formData.validate().then((res) => {
        createTenant(this.formData).then((res) => {
          this.$router.back()
          // this.$router.replace({ name: 'tenantManagement' })
        })
      })
    },
    getGoods(GoodsValue) {
      this.goodsData = GoodsValue
      this.formData.goodsIds = this.goodsData.map((item) => item.id)
      // console.log(this.formData.goodsIds)
    }
  }
}
</script>

<style lang="scss" scoped>
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
