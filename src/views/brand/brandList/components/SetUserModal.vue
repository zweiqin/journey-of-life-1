<template>
  <div>
    <el-dialog :visible.sync="visible" v-bind="modalOptions">
      <el-form ref="setUserFormRef" :model="setUserForm" :rules="setUserRules" size="mini" label-suffix=":"
        label-width="150px">

        <el-form-item label="用户" prop="userId">
          <el-autocomplete style="width: 200px;" v-model="setUserForm.userId" :trigger-on-focus="false"
            :fetch-suggestions="handleSeachUserByPhone" placeholder="请输入用户手机号查询" @select="handleSelectUser">
            <template slot-scope="{ item }">
              <div class="user-pane">
                <img :src="item.avatar" alt="" class="avatar">
                <div class="wrapper">
                  <div class="item">{{ item.nickname }}</div>
                  <span class="item">{{ item.userLevelDesc }}</span>
                </div>
              </div>

            </template>
          </el-autocomplete>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="handleClose">取 消</el-button>
        <el-button :loading="isLoading" type="primary" size="mini" @click="handleSubmit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { userList } from '@/api/userManagement/memberList'
import { setUserForBrand } from '@/api/brand/brandList'

export default {
  data() {
    return {
      modalOptions: {
        closeOnClickModal: false,
        width: '500px',
        title: '设置用户',
      },
      visible: false,
      setUserForm: {
        brandId: '',
        userId: ''
      },
      setUserRules: {
        userId: { required: true, message: '请选择要设置的用户', trigger: "blur" }
      },
      isLoading: false
    };
  },

  methods: {
    handleClose() {
      this.visible = false
    },

    handleOpen(brandInfo = {}) {
      console.log(brandInfo);
      this.visible = true
      this.setUserForm.brandId = brandInfo.id
    },

    async handleSeachUserByPhone(mobile, cb) {
      const res = await userList({
        mobile,
        size: 20,
        page: 1
      })

      cb(res.data.items || [])
    },

    handleSelectUser(userInfo) {
      this.setUserForm.userId = userInfo.id + ''
    },

    handleSubmit() {
      try {

        this.$refs.setUserFormRef.validate(async (valid) => {
          if (valid) {
            await setUserForBrand(this.setUserForm)
            this.$message.success("设置成功")
            this.visible = false
            this.$emit('success')
          }
        })
      } finally {
        this.isLoading = false
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.user-pane {
  display: flex;
  align-items: center;
  padding: 4px 0;

  .avatar {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin-right: 10px;
  }

  .wrapper {
    flex: 1;
    display: flex;
    justify-content: center;
    flex-direction: column;

    .item {
      line-height: 1.5;
      width: 98px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      font-size: 12px;
      color: #3d3d3d;

      &:nth-child(1) {
        font-size: 16px;
        font-weight: bold;
        color: #46a6ff;

      }


    }
  }
}
</style>
