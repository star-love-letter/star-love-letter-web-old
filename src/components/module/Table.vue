<template>
  <div class="post">
    <el-breadcrumb separator="❤">
      <el-breadcrumb-item class="gender">
        <div v-if="item.senderSex === 1">
          <i class="fas fa-mars" style="color: #3b6fa8"></i>
        </div>
        <div v-else-if="item.senderSex === 2">
          <i class="fas fa-venus" style="color: deeppink"></i>
        </div>
        <div v-else><i class="fas fa-genderless"></i></div>
        <div class="name" @click="goSearch(item.sender)">
          {{ item.sender }}
        </div>
      </el-breadcrumb-item>
      <el-breadcrumb-item class="gender">
        <div class="name" @click="goSearch(item.recipient)">
          {{ item.recipient }}
        </div>
        <div v-if="item.recipientSex === 1">
          <i class="fas fa-mars" style="color: #3b6fa8"></i>
        </div>
        <div v-else-if="item.recipientSex === 2">
          <i class="fas fa-venus" style="color: deeppink"></i>
        </div>
        <div v-else><i class="fas fa-genderless"></i></div>
      </el-breadcrumb-item>
    </el-breadcrumb>

    <div class="content-box">
      <div class="item-content">
        {{ item.content }}
      </div>
      <el-image
        :style="isDetail ? tableImageStyle2 : tableImageStyle1"
        v-for="item in imgList"
        :key="item.id"
        :src="item"
        fit="cover"
        :preview-src-list="isDetail ? imgList : false"
      >
      </el-image>
    </div>

    <div class="info">
      <div
        v-if="item.anonymous === true || item.userPublic === undefined"
        class="user"
      >
        表白者：<span style="color: #999; font-weight: bold">[匿名]</span>
      </div>
      <div v-else class="user">表白者：{{ item.userPublic.name }}</div>
      <div class="create-time">{{ this.toDates(item.createTime) }}</div>
    </div>

    <el-button-group>
      <!--   点赞   -->
      <el-button
        icon="fas fa-thumbs-up"
        @click="thumbs_up"
        id="thumbsTrue"
        v-if="!item.support"
      >
        {{ item.supportCount }}
      </el-button>
      <el-button
        icon="fas fa-thumbs-up"
        @click="un_thumbs_up"
        id="thumbsFalse"
        v-else
      >
        {{ item.supportCount }}
      </el-button>
      <!--  评论  -->
      <el-button
        v-if="!isDetail"
        icon="fas fa-comment-alt"
        @click="goTableDetail"
      >
        {{ item.commentCount }}
      </el-button>
      <!--  分享  -->
      <el-button icon="fas fa-share-square" @click="showQrCode"></el-button>
    </el-button-group>
    <!--  点击分享后显示的页面  -->
    <el-dialog :visible.sync="QRVisible" width="60%">
      <canvas ref="qrCodeUrl"></canvas>
      <div class="flex flex-col items-center justify-center">
        <el-breadcrumb separator="❤" style="border-bottom: 0; font-size: 1.5em">
          <el-breadcrumb-item class="gender">
            <div v-if="item.sender_sex === 1">
              <i class="fas fa-mars" style="color: #3b6fa8"></i>
            </div>
            <div v-else-if="item.sender_sex === 2">
              <i class="fas fa-venus" style="color: deeppink"></i>
            </div>
            <div v-else><i class="fas fa-genderless"></i></div>
            <div class="name" @click="goSearch(item.sender)">
              {{ item.sender }}
            </div>
          </el-breadcrumb-item>
          <el-breadcrumb-item class="gender">
            <div class="name" @click="goSearch(item.recipient)">
              {{ item.recipient }}
            </div>
            <div v-if="item.recipient_sex === 1">
              <i class="fas fa-mars" style="color: #3b6fa8"></i>
            </div>
            <div v-else-if="item.recipient_sex === 2">
              <i class="fas fa-venus" style="color: deeppink"></i>
            </div>
            <div v-else><i class="fas fa-genderless"></i></div>
          </el-breadcrumb-item>
        </el-breadcrumb>
        <el-input
          style="height: 0.6rem"
          size="small"
          v-model="url"
          ref="urlText"
          readonly
        >
          <el-button slot="append" @click="copyUrl">复制</el-button>
        </el-input>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import QRCode from "qrcode"; //引入生成二维码插件
export default {
  data() {
    return {
      imgVisible: false,
      imagePath: axios.defaults.baseURL + "/api/file/image/",
      QRVisible: false,
      TableId: "",
      url: "",
      flag: false,
      CommentTotal: "",
      //  图片列表
      imgList: [],
      // 列表图片的样式
      tableImageStyle1: {
        width: "100px",
        height: "100px",
      },
      tableImageStyle2: {
        width: "222px",
        height: "222px",
      },
    };
  },
  name: "Table",

  //item 内容
  //isDetail 是否为详情页
  //          详情页没有点击进入详情页功能
  props: ["item", "isDetail", "id"],
  methods: {
    // 点击喜欢按钮
    async thumbs_up() {
      await this.$http
        .put("/api/table/support", {
          tableId: this.item.id,
        })
        .then((data) => {
          this.$message.success(data.message);
          this.getTableData();
        });
    },
    // 点击取消喜欢按钮
    async un_thumbs_up() {
      await this.$http
        .delete("/api/table/support", {
          tableId: this.item.id,
        })
        .then((data) => {
          this.$message.success(data.message);
          this.getTableData();
        });
    },
    // 根据id获取帖子数据
    async getTableData() {
      await this.$http
        .get("/api/table/table", {
          id: this.item.id,
        })
        .then(({ data }) => {
          console.log(data.images);
          this.item = data;
        });
    },
    // 解析图片列表
    getImgList() {
      this.imgList = [];
      if (!this.item.images) {
        return;
      }
      // 解析json
      let imgSrc = JSON.parse(this.item.images);
      for (const item of imgSrc) {
        this.imgList.push(this.imagePath + item);
      }
    },
    // 打开详情页
    goTableDetail() {
      this.$router.push({
        name: "TableDetail",
        params: { id: this.item.id },
      });
    },
    //搜索
    goSearch(keyword) {
      this.$router.push({
        name: "Search",
        params: { keyword: keyword },
      });
    },
    // 显示分享页面
    showQrCode() {
      this.QRVisible = true;
      this.TableId = this.item.id;
    },
    // 创建二维码的函数
    creatQrCode() {
      this.$nextTick(() => {
        // 获取不带路径的url地址
        var origin = window.location.origin;
        const url = origin + "/#/TableDetail/" + this.TableId;
        this.url = url;
        this.$refs.qrCodeUrl.innerHTML = ""; //清空原有的二维码

        // 创建二维码
        let opts = {
          errorCorrectionLevel: "H", //容错级别
          type: "image/png", //生成的二维码类型
          quality: 0.3, //二维码质量
          margin: 12, //二维码留白边距
          width: 150, //宽
          height: 150, //高
          text: url, //二维码内容
          color: {
            dark: "#333333", //前景色
            light: "#fff", //背景色
          },
        };
        this.QRCodeMsg = url; //生成的二维码为URL地址js
        let msg = this.$refs.qrCodeUrl;
        // 将获取到的数据（val）画到msg（canvas）上
        QRCode.toCanvas(msg, this.QRCodeMsg, opts, function (error) {
          if (error) console.error(error);
        });
      });
    },
    copyUrl() {
      var ele = this.$refs.urlText;
      ele.select();
      document.execCommand("Copy");
      this.$message.success("复制链接成功！");
    },
  },
  created() {
    this.getImgList();
  },
  watch: {
    QRVisible: function (val, oldVal) {
      if (val === true) {
        this.creatQrCode();
      }
    },
    item(val) {
      this.getImgList();
      this.item = val;
    },
  },
};
</script>

<style scoped>
/deep/ .el-breadcrumb__separator {
  color: red;
}

.item-content {
  min-height: 60px;
  padding-bottom: 10px;
  margin-bottom: 20px;
}

.image-box {
  display: inline-block;
}

.el-breadcrumb {
  display: flex;
  justify-content: center;
  padding-bottom: 1.25rem;
  border-bottom: 0.05rem solid #999;
}

.el-image {
  margin: 2px;
}

/* 内容列表整体框的样式 */
.post {
  height: auto;
  background-color: #fff;
  padding: 10px;
  box-sizing: border-box;
  box-shadow: 0 0 1px #000 inset;
  display: block;
}

.post:last-child {
  margin-bottom: 0.6rem;
}

/* 一个内容的样式 */
.content-box {
  padding: 0.8rem;
  margin-top: 1.25rem;
  width: 100%;
  height: 45%;
  word-wrap: break-word;
  box-shadow: 1px 1px 5px #cccccc70;
}

/* 内容里面的按钮数组 */
.el-button-group {
  display: flex;
  justify-content: center;
}

.info {
  display: flex;
  justify-content: flex-start;
}

/* 表白者用户信息 */
.user {
  display: inline-block;
  color: #ff8686;
  font-size: 0.8rem;
  margin-top: 1.25rem;
  margin-bottom: 1.25rem;
  margin-left: 0.6rem;
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
}

/* 创建时间的样式 */
.create-time {
  color: #999;
  font-size: 0.8rem;
  margin: 1.25rem 0.6rem 1.25rem auto;
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
}

.gender div {
  display: inline-block;
  vertical-align: -0.187rem;
}

.gender div i {
  font-size: 1.25rem;
}

/deep/ .el-dialog__body {
  display: flex;
  justify-content: center;
}

.name {
  font-weight: bold;
  color: #303133;
  cursor: pointer;

  display: inline-block;
  margin-left: 0.6rem;
  margin-right: 0.6rem;
}

#thumbsFalse {
  color: #409eff;
  border-color: #c6e2ff;
  background-color: #ecf5ff;
}

#thumbsFalse:hover {
  color: #409eff;
  border-color: #c6e2ff;
  background-color: #ecf5ff;
}

#thumbsTrue:focus {
  color: #606266;
  border-color: #dcdfe6;
  background-color: #fff;
}

#thumbsTrue:hover {
  color: #409eff;
  border-color: #c6e2ff;
  background-color: #ecf5ff;
}
</style>
