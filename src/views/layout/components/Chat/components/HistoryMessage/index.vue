<template>
  <el-dialog
    title="消息记录"
    :visible.sync="historyMessageDialogData.visible"
    width="600px"
    :close-on-click-modal="true"
    :append-to-body="true"
    :close-on-press-escape="false"
    class="field-dialog"
    @close="closeDialog"
  >
    <div class="filter-container">
      <el-input
        v-model="listQuery.content"
        style="margin-bottom:10px; width:60%"
        size="medium"
        placeholder="输入关键字进行过滤"
      ></el-input>
      <!-- value-format="timestamp" -->
      <el-date-picker
        v-model="listQuery.date"
        size="medium"
        type="date"
        placeholder="选择日期"
        value-format="yyyy-MM-dd"
      ></el-date-picker>
      <div class="selected-fields">
        <div ref="selectedBox" class="selected-box">
          <div class="selected-group">
            <div v-for="(item, index) in historyMessageList" :key="index">
              <div class="message">
                <div class="message__avatar">
                  <span
                    class="avatar avatar--circle"
                    shape="square"
                    style="width: 36px; height: 36px; line-height: 36px; font-size: 18px;border-radius: 50%"
                  >
                    <img :src="item.avatar" />
                  </span>
                </div>
                <div class="message__inner">
                  <div class="message__title">
                    <span>{{ item.displayName }}</span>

                    <span class="message__time">
                      <span>|</span>
                      {{ item.sendTime }}
                    </span>
                  </div>
                  <div
                    v-if="item.type == 'text'"
                    class="message__content-flex"
                    style="background-color:#f5f5f5"
                  >
                    <div class="message__content" style="background-color:#f5f5f5">
                      <span v-html="item.content"></span>
                    </div>
                  </div>

                  <div
                    v-else-if="item.type == 'link'"
                    class="message__content-flex"
                    style="background-color:#808080"
                  >
                    <div class="message__content" style="background-color:#808080">
                      <span v-text="'链接：' + item.content"></span>
                    </div>
                  </div>

                  <div v-else class="message__content-flex">
                    <div v-if="item.type == 'file' " class="message__content">
                      <el-button
                        icon="el-icon-link"
                        @click="downLoad(item)"
                      >
                        {{ item.fileName }} ( {{ getfilesize(item.fileSize) }})
                      </el-button>
                    </div>
                    <div v-if="item.type == 'image' " class="lemon-message__content">
                      <img
                        :src="item.content"
                        alt
                        style="cursor: pointer;"
                        @click="clickImage(item, historyMessageList)"
                      />
                    </div>
                    <div v-if="item.type == 'forward' " class="lemon-message__content">
                      <Message :content="item.content"></Message>
                    </div>
                    <div v-if="item.type == 'video' " class="lemon-message__content">
                      <VideoPreview :content="item.content"></VideoPreview>
                    </div>
                    <div v-else class="lemon-message__content">
                      <span style="font-weight: 700;color: darkgray;">其它消息</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <el-image
              ref="preview"
              class="previewImage"
              fit="scale-down"
              :src="imageSrc"
              :preview-src-list="srcList"
              :z-index="2050"
            ></el-image>
          </div>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <Pagination
          v-show="total > 0"
          :total="total"
          :page.sync="listQuery.cur_page"
          :limit.sync="listQuery.page_size"
          :small="true"
          @pagination="init"
        ></Pagination>
      </div>
    </div>
  </el-dialog>
</template>

<script>
// import { historyMessage } from '@/api/laboratory/chat_module/friend'
// import { groupHistoryMessage } from '@/api/laboratory/chat_module/group'
import { queryChatMessage } from '@/api/laboratory/chat_module/chat'
import { download } from '@/utils/file'
import Message from '../LemonMessageForward/components/Message'
import VideoPreview from '../LemonMessageVideo/components/VideoPreview'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
const defaultListQuery = {
  date: '',
  content: '',
  cur_page: 1,
  page_size: 20,
  contact_id: ''
}
export default {
  name: 'HistoryMessage',
  components: {
    Message,
    VideoPreview,
    Pagination
  },
  props: {
    historyMessageDialogData: {
      type: Object,
      default: {}
    }
  },
  data() {
    return {
      listQuery: Object.assign({}, defaultListQuery),
      historyMessageList: [],
      total: 0,
      imageSrc: '',
      srcList: []
    }
  },
  watch: {
    'listQuery.date'(val) {
      this.init()
    },
    'listQuery.content'(val) {
      // this.init()
      val ? this.historyMessageList = this.historyMessageList.filter((item) => item.content.includes(val)) : this.init()
    }
  },
  mounted() {},
  created() {},
  methods: {
    init() {
      this.listQuery.contact_id = this.historyMessageDialogData.contact_id
      const tempListQuery = {
        foUserId: this.$parent.$parent.user.id,
        toUserId: this.listQuery.contact_id,
        // chatId: this.listQuery.contact_id,
        // limit: this.listQuery.page_size,
        // endTime: this.listQuery.date + ' 00:00:00',
        // order: 'desc',
        content: this.listQuery.content
      }
      queryChatMessage(tempListQuery).then((response) => {
        this.historyMessageList = response.data.map((item) => ({
          id: item.sendTime,
          status: 'success',
          type: item.msgType,
          fileSize: item.fileSize,
          fileName: item.fileName,
          fileExt: item.exp || '',
          sendTime: new Date(item.sendTime).toLocaleString(),
          content: item.contentText,
          avatar: item.fromAvatarImage,
          displayName: item.fromUserName,
          fromUser: {
            id: item.fromUserId,
            avatar: item.fromAvatarImage,
            displayName: item.fromUserName
          }
        }))
        this.total = response.data.length
        // this.historyMessageList = response.data.items.map((item) => {
        // 	const tempObj = JSON.parse(item.message)
        // 	// console.log(tempObj, tempObj.fromUser)
        // 	return {
        // 		id: tempObj.message.id,
        // 		status: tempObj.message.status,
        // 		type: tempObj.message.type,
        // 		fileSize: tempObj.message.fileSize,
        // 		fileName: tempObj.message.fileName,
        // 		fileExt: tempObj.message.fileExt || '',
        // 		sendTime: new Date(Number(tempObj.message.sendTime)).toLocaleString(),
        // 		content: tempObj.message.content,
        // 		avatar: tempObj.message.fromUser.avatar,
        // 		displayName: tempObj.message.fromUser.displayName,
        // 		fromUser: {
        // 			id: tempObj.message.fromUser.id,
        // 			avatar: tempObj.message.fromUser.avatar,
        // 			displayName: tempObj.message.fromUser.displayName
        // 		}
        // 	}
        // })
        // this.total = response.data.items.length
      })
      // if (typeof this.listQuery.contact_id === 'number') {
      //   historyMessage(this.listQuery).then((response) => {
      //     if (response.code == 200) {
      //       this.historyMessageList = response.data.list
      //       this.total = response.data.total
      //     }
      //   })
      // } else {
      //   groupHistoryMessage(this.listQuery).then((response) => {
      //     if (response.code == 200) {
      //       this.historyMessageList = response.data.list
      //       this.total = response.data.total
      //     }
      //   })
      // }
    },
    closeDialog() {
      this.listQuery = Object.assign({}, defaultListQuery)
    },
    downLoad(message) {
      const fileExtension = message.content.substring(message.content.lastIndexOf('.') + 1)
      download(message.content, message.fileName, fileExtension, true)
    },
    clickImage(item, message) {
      while (this.srcList.length > 0) {
        this.srcList.pop()
      }
      for (let i = 0; i < message.length; i++) {
        if (message[i].type == 'image') this.srcList.push(message[i].content)
      }
      this.imageSrc = item.content
      this.$refs.preview.clickHandler()
    }
  }
}
</script>

<style lang="scss" scoped>
.message {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  padding: 10px 0;
}
.message__avatar {
  padding-right: 10px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
.message__avatar .avatar {
  cursor: pointer;
}
.avatar {
  font-variant: tabular-nums;
  line-height: 1.5;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  list-style: none;
  display: inline-block;
  text-align: center;
  background: #ccc;
  color: hsla(0, 0%, 100%, 0.7);
  white-space: nowrap;
  position: relative;
  overflow: hidden;
  vertical-align: middle;
  border-radius: 4px;
}
.avatar img {
  width: 100%;
  height: 100%;
  display: block;
}
.message__inner {
  width: 100%;
  position: relative;
}
.message__content-flex,
.message__title {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
}
.message__title {
  font-size: 12px;
  line-height: 16px;
  height: 16px;
  margin-bottom: 5px;
  padding-bottom: 4px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  color: #666;
}
.message__content-flex,
.message__title {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
}

.message__title {
  font-size: 12px;
  line-height: 16px;
  height: 16px;
  padding-bottom: 4px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  color: #666;
}

.message__time {
  color: #b9b9b9;
  padding: 0 5px;
  /* float: right; */
}
.message__content-flex,
.message__title {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
}
.message__content {
  font-size: 14px;
  line-height: 20px;
  padding: 8px 10px;
  background: #fff;
  border-radius: 4px;
  position: relative;
  margin: 0;
}
.message-file__inner {
  -webkit-box-flex: 1;
  -ms-flex: 1;
  flex: 1;
}
.filter-container::after {
  content: '';
  display: block;
  clear: both;
}

.box-head {
  margin-bottom: 15px;
  padding: 10px 0;
  font-size: 16px;
  font-weight: bold;
  border-bottom: 1px solid #ddd;
}

.all-fields,
.selected-fields {
  padding: 5px 10px;
  border: 1px solid #ddd;
  overflow-y: scroll;
  height: 500px;
}

.all-fields {
  margin-right: 2%;
  //width: 69%;
}

.checkAll {
  display: block;
  margin-bottom: 20px;
  padding: 10px 20px;
  background-color: #f7f9fc;
}

.all-fields ::v-deep .el-checkbox__label {
  font-size: 16px;
}
.all-fields ::v-deep .el-checkbox__inner {
  width: 16px;
  height: 16px;
  &::before {
    top: 6px;
  }
  &::after {
    top: 2px;
    left: 5px;
  }
}
.checkAll ::v-deep .el-checkbox__label {
  font-weight: bold;
}

.checkItem {
  margin: 0 0 10px 0;
  width: 33.333333%;
}
.checkItem:hover ::v-deep .el-checkbox__inner {
  border-color: #409eff;
}

.selected-group {
  margin-bottom: 15px;
  padding-bottom: 15px;
  &:last-child {
    border-bottom: none;
  }
}

.selected-item {
  position: relative;
  margin-bottom: 10px;
  padding: 10px 20px;
  background-color: #f8f8f8;
  border-radius: 10px;
  cursor: move;
  &--active {
    background-color: #ddd;
  }
  &:last-child {
    margin-bottom: 0;
  }

  .cancelItemBtn {
    position: absolute;
    top: 50%;
    right: 20px;
    margin-top: -8px;
    width: 16px;
    height: 16px;
    cursor: pointer;

    &::before,
    &::after {
      content: '';
      display: block;
      position: absolute;
      top: 50%;
      margin-top: -1px;
      width: 100%;
      height: 2px;
      background-color: #9f9f9f;
      transition: all 0.3s;
    }
    &::before {
      transform: rotate(45deg);
    }
    &::after {
      transform: rotate(-45deg);
    }

    &:hover {
      &::before,
      &::after {
        background-color: #f00;
      }
    }
  }
}
.previewImage ::v-deep .el-image__preview {
  display: none;
}

.previewImage ::v-deep .el-image__error {
  display: none;
}
</style>
