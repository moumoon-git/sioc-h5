<template>
  <div>
    <div class="listBackUpHeader">
      <span class="headerLeft">整改信息</span>
      <span
        class="headerRight"
        v-if="rectificationUnitData.status == 0"
        @click="confirmCompleteModification(1)"
        >确认完成修改</span
      >
      <span v-else class="headerRight" @click="confirmCompleteModification(0)"
        >重启整改</span
      >
      <!-- v-if="rectificationUnitData.status == 0" -->
    </div>
    <div class="listBackUpInformation">
      <div class="informationTitle">
        {{ rectificationUnitData.name }}
        <img
          :src="
            rectificationUnitData.status == 0
              ? require('../../assets/img/waitHandle.png')
              : rectificationUnitData.status == 1
              ? require('../../assets/img/hadHandle.png')
              : ''
          "
          alt
        />
      </div>
      <div class="informationContent">
        <div>
          <span>发布时间</span>
          <b>{{ rectificationUnitData.publishTime }}</b>
        </div>
        <div>
          <span>响应说明</span>
          <b>{{ rectificationUnitData.remark }}</b>
        </div>
        <div>
          <span>响应单位</span>
          <div
            style="display: flex; flex-wrap: wrap; margin: 0; marginleft: -2vw"
          >
            <b
              class="contentTag"
              v-for="(item, index) in rectificationUnitData.platformList"
              :key="index"
            >
              <span>{{ item.platformName }}</span>
            </b>
          </div>
        </div>
        <div class="contentImage">
          <img
            v-for="(val, i) in rectificationUnitData.documentVoList"
            :key="i"
            :src="val.allUrl"
            @click="showPreviewImage(val.allUrl)"
            alt
          />
        </div>
      </div>
    </div>
    <div class="listBackUpHeader">
      <span class="headerLeft">整改记录</span>
    </div>
    <div v-for="(item, index) in rectificationListData" :key="index">
      <div v-show="item.platformId != platformId" class="listBackUpDepartment">
        <span class="department">{{ item.platformString }}</span>
        <span class="departmentDate">{{ item.gmtCreate }}</span>
      </div>
      <div
        v-show="item.platformId != platformId"
        class="departmentContent clearfix"
      >
        <div class="contentHeader">
          <span class="contentHeaderLeft">情况说明：</span>
          <span class="contentHeaderRight">{{ item.remark }}</span>
        </div>
        <div class="departmentContentImage">
          <img
            v-for="(val, i) in item.documentVos"
            :key="i"
            :src="val.allUrl"
            @click="showPreviewImage(val.allUrl)"
          />
        </div>
      </div>
    </div>
    <div
      v-show="item.platformId == platformId"
      class="listBackUpReportRight"
      v-for="(item, index) in rectificationListData"
      :key="'listBackUpReportRight' + index"
    >
      <div class="reportRightHeader">
        <span class="reportRightCenter">{{ item.gmtCreate }}</span>
        <span class="reportRight">{{ item.platformString }}</span>
      </div>
      <div class="reportRightContent clearfix">
        <div class="contentTitle">
          <div class="contentTitleLeft">情况说明：</div>
          <div class="contentTitleRight">{{ item.remark }}</div>
        </div>
        <div class="reportContentImage">
          <img
            v-for="(val, i) in item.documentVos"
            :key="i"
            :src="val.allUrl"
            @click="showPreviewImage(val.allUrl)"
          />
        </div>
      </div>
    </div>
    <div
      class="listBackUpSubmit clearfix"
      v-if="rectificationUnitData.status == 0"
    >
      <div class="submitHeader">
        <!-- <div><textarea class="submitHeaderLeft"></textarea></div> -->
        <!-- <div><input class="submitHeaderLeft" type="text"></div> -->
        <van-field
          v-model="rectificationMessage.remark"
          class="submitHeaderLeft"
        />
        <div class="submitHeaderRight">
          <van-uploader v-model="fileList" :after-read="afterRead">
            <img src="../../assets/img/fileImage.png" alt />
          </van-uploader>
          <button class="submitButton" @click="submitRectificationInformation">
            提交
          </button>
        </div>
      </div>
      <div class="submitImage">
        <div v-for="(item, index) in fileList" :key="'file' + index">
          <van-loading
            v-if="imageUpLoadFlag && index == fileList.length - 1"
            vertical
            >加载中...</van-loading
          >
          <div v-else>
            <img :src="item.content" alt />
            <img
              class="close"
              @click="delectImage(index)"
              src="../../assets/img/close.png"
              alt
            />
          </div>
        </div>
      </div>
    </div>
    <!-- <imagePreview
      :overlayShow="overlayShow"
      :enlargeImageUrl="enlargeImageUrl"
      @closeOverlay="closeOverlay"
    ></imagePreview>-->
    <imagePreview
      ref="previewImage"
      :enlargeImageUrl="enlargeImageUrl"
    ></imagePreview>
  </div>
</template>

<script>
import imagePreview from "./imagePreview";
export default {
  components: {
    imagePreview,
  },
  data() {
    return {
      // overlayShow: false, //遮罩层
      previewShow: false, //是否展示预览图片
      enlargeImageUrl: [], //接收到的放大图片的路径
      id: "",
      publishId: "",
      platformId: "",
      index: "",
      fileList: [],
      rectificationListData: [], //整改详情--整改记录data
      rectificationUnitData: [], //监督整改data
      rectificationMessage: {
        remark: "",
        rectifyPublishId: "",
        handerPeople: "",
        peoplePhone: "",
        documentVos: [],
      }, //回复整改信息
      imageUpLoadFlag: false, //图片是否加载完成标志
      compressSize: 1, //压缩比例
    };
  },
  methods: {
    //根据传过来的id获取到的整改信息
    rectificationInformationId() {
      // //console.log("id的值===》", this.id);
      this.$http({
        url: this.$http.adornUrl(`/levelRectifyPublish/selectPageList`),
        method: "post",
        data: this.$http.adornData({
          publishId: this.id,
          status: "",
          limit: 10,
          search: "",
          page: 1,
        }),
      }).then((data) => {
        // //console.log(
        //   "监督整改data===>",
        //   data,
        //   this.index,
        //   data.data.data.list[this.index]
        // );
        this.rectificationUnitData = data.data.data.list[this.index];
      });
    },
    //选中获取到的监督整改详情--整改记录
    rectificationList() {
      // //console.log("publishId的值===》", this.publishId);
      this.$http({
        url: this.$http.adornUrl(`/level/levelRectifyInfo/selectPagelist`),
        method: "post",
        data: this.$http.adornData({
          publishId: this.publishId,
        }),
      }).then((data) => {
        // //console.log("点击获取到的整改详情data===》", data);
        this.rectificationListData = data.data.data;
      });
    },
    //文件上传后的回调
    afterRead(file) {
      this.imageUpLoadFlag = true;
      //console.log(this.fileList);
      var content = file.content;
      var name = file.file.name;
      // 设置图片的压缩比例
      this.compressImg(file.file.size);
      new Promise((resolve) => {
        // 创建Canvas对象(画布)
        let canvas = document.createElement("canvas");
        // 获取对应的CanvasRenderingContext2D对象(画笔)
        let context = canvas.getContext("2d");
        // 创建新的图片对象
        let img = new Image();
        // 指定图片的DataURL(图片的base64编码数据)
        img.src = file.content;
        // 监听浏览器加载图片完成，然后进行进行绘制
        img.onload = () => {
          if (this.compressSize > 1) {
            // 指定canvas画布大小，该大小为最后生成图片的大小
            canvas.width = img.width / this.compressSize;
            canvas.height = img.height / this.compressSize;
            /* drawImage画布绘制的方法。(0,0)表示以Canvas画布左上角为起点，400，300是将图片按给定的像素进行缩小。
          如果不指定缩小的像素图片将以图片原始大小进行绘制，图片像素如果大于画布将会从左上角开始按画布大小部分绘制图片，最后的图片就是张局部图。*/

            context.drawImage(img, 0, 0, canvas.width, canvas.height);
            // 将绘制完成的图片重新转化为base64编码，file.file.type为图片类型，0.92为默认压缩质量
            // file.content = canvas.toDataURL(file.file.type, 0.92);
            var dataurl = canvas.toDataURL("image/png");
            var arr = dataurl.split(","),
              mime = arr[0].match(/:(.*?);/)[1],
              bstr = atob(arr[1]),
              n = bstr.length,
              u8arr = new Uint8Array(n);
            while (n--) {
              u8arr[n] = bstr.charCodeAt(n);
            }
            var file = new File([u8arr], name, { type: mime });
            // console.info(file);
            // 最后将base64编码的图片保存到数组中，留待上传。
            resolve(file);
            this.fileList[this.fileList.length - 1] = {
              content,
              file,
            };
          } else {
            resolve();
          }
        };
      }).then(() => {
        let formData = new FormData();
        this.fileList.forEach((v) => {
          formData.append("files", v.file);
        });
        //console.log(formData);
        this.$http({
          url: this.$http.adornUrl(`/level/levelPublish/upload//file`),
          method: "post",
          headers: {
            "content-type": "multipart/form-data",
          },
          data: formData,
        }).then((data) => {
          this.imageUpLoadFlag = false;
          // //console.log("文件上传后返回的数据data===》", data);
          let fileName = data.data.fileName;
          let filestr = data.data.filestr;
          // //console.log(fileName);
          this.rectificationMessage.documentVos = []; //清空上传数据
          fileName.forEach((v, i) => {
            this.rectificationMessage.documentVos.push({
              name: fileName[i],
              url: filestr[i],
            });
          });
          // //console.log(this.rectificationMessage.documentVos);
        });
      });
    },
    //删除指定的图片
    delectImage(index) {
      // //console.log(index);
      this.fileList.splice(index, 1);
      this.rectificationMessage.documentVos.splice(index, 1);
    },
    /**
     * @description: 根据图片的大小设置压缩的比例
     * @param {string} size 图片的大小
     * @return {}
     */
    compressImg(size) {
      if (size < 1024 * 1024) {
        // 图片小于1M的情况
        this.compressSize = 1;
      } else {
        // 图片大于1M的情况
        let num = size / (1024 * 1024); // 获取图片大小与1M大小的比例
        this.compressSize = num * 2; // 设置压缩比例
      }
      //console.log(this.compressSize);
    },
    //整改信息
    rectificationInformation() {
      this.$dialog
        .confirm({
          title: "是否提交整改信息",
        })
        .then(() => {
          this.$http({
            url: this.$http.adornUrl(`/level/levelRectifyInfo/save`),
            method: "post",
            data: this.$http.adornData({
              remark: this.rectificationMessage.remark,
              rectifyPublishId: this.publishId,
              handerPeople: "",
              peoplePhone: "",
              documentVos: this.rectificationMessage.documentVos,
            }),
          }).then((data) => {
            // //console.log("提交整改信息data===》", data);
            Promise.resolve(
              this.rectificationList(), //更新数据列表
              (this.rectificationMessage.remark = ""),
              (this.fileList = [])
            ).then(() => {
              this.$dialog.alert({
                message: "提交成功",
              });
            });
          });
        })
        .catch(() => {});
    },
    //提交整改信息
    submitRectificationInformation() {
      this.rectificationInformation();
    },
    //确认完成修改/重启整改
    confirmCompleteModification(value) {
      let titleText;
      let messageText;
      if (value == 1) {
        titleText = "请确认是否完成整改";
        messageText = "整改成功";
      } else {
        titleText = "请确认是否重启整改";
        messageText = "重启整改成功";
      }
      this.$dialog
        .confirm({
          title: titleText,
        })
        .then(() => {
          this.$http({
            url: this.$http.adornUrl(
              `/levelRectifyPublish/update/${this.publishId}/${value}`
            ),
            method: "get",
            // params:this.$http.adornParams({
            //   id:this.$route.params.publishId,
            //   status:1
            // })
          }).then((data) => {
            // //console.log("整改data===》", data);
            this.$dialog
              .alert({
                message: messageText,
              })
              .then(() => {
                this.$router.go(-1);
              });
          });
          // on confirm
        })
        .catch(() => {
          // on cancel
        });
    },
    //显示放大的预览图
    showPreviewImage(imgurl) {
      // this.enlargeImageUrl = imgurl;
      // document.body.setAttribute("style", "overflow:hidden");
      // this.overlayShow = true; //显示遮罩层
      this.enlargeImageUrl = [];
      this.$refs.previewImage.previewShow = true;
      this.enlargeImageUrl.push(imgurl);
    },
    //关闭遮罩层
    // closeOverlay() {
    //   document.body.setAttribute("style", "overflow:scroll");
    //   this.overlayShow = false; //关闭遮罩层
    // },
  },
  created() {
    this.publishId = JSON.parse(localStorage.getItem("publishId"));
    this.platformId = JSON.parse(localStorage.getItem("platformId"));
    this.id = JSON.parse(localStorage.getItem("id"));
    this.index = JSON.parse(localStorage.getItem("index"));
    this.rectificationInformationId();
    this.rectificationList();
  },
};
</script>

<style lang="less" scoped>
  .listBackUpHeader {
    // height: 6.3vh;
    // line-height: 6.3vh;
    height: 0.84rem;
    line-height: 0.84rem;
    position: relative;
    .headerLeft {
      position: absolute;
      color: #999999;
      left: 5.07vw;
      font-size: 0.24rem;
      font-family: PingFangSC-Medium, PingFang SC;
    }
    .headerRight {
      position: absolute;
      color: #0091ff;
      font-size: 0.24rem;
      font-family: PingFangSC-Medium, PingFang SC;
      right: 4vw;
    }
  }
  .listBackUpInformation {
    // min-height: 48.95vh;
    min-height: 6.53rem;
    margin: 0 2.67vw 0 2.67vw;
    background-color: #ffffff;
    position: relative;
    .informationTitle {
      // height: 8.4vh;
      // line-height: 8.4vh;
      height: 1.12rem;
      line-height: 1.12rem;
      margin: 0 5.07vw;
      // border-bottom: 0.07vh solid #e8e8e8;
      border-bottom: 0.01rem solid #e8e8e8;
      font-size: 0.32rem;
      font-family: PingFangSC-Medium, PingFang SC;
      color: #333333;
      font-weight: bold;
      img {
        position: absolute;
        width: 10.67vw;
        // height: 6vh;
        height: 0.8rem;
        right: 0;
      }
    }
  }
  .informationContent {
    div {
      // margin: 1.5vh 0 0.6vh 5.33vw;
      // min-height: 4.5vh;
      // line-height: 4.5vh;
      margin: 0.2rem 0 0.08rem 5.33vw;
      min-height: 0.6rem;
      line-height: 0.6rem;
      font-size: 0.28rem;
      display: flex;
      position: relative;
      span {
        color: #999999;
        margin-right: 9.07vw;
        display: inline-block;
        white-space: nowrap;
        font-family: PingFangSC-Regular, PingFang SC;
      }
      b {
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: normal;
        &.contentTag {
          // height: 4.05vh;
          // line-height: 4.05vh;
          // margin: 0 1.33vw 0.75vh 0;
          height: 0.54rem;
          line-height: 0.54rem;
          margin: 0 1.33vw 0.1rem 0;
          background: rgba(197, 222, 254, 0.28);
          border-radius: 3.6vw;
          span {
            font-size: 0.24rem;
            font-family: PingFangSC-Medium, PingFang SC;
            font-weight: bold;
            text-align: center;
            color: #0091ff;
            margin: 0 2.27vw;
            max-width: 60vw;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }
        }
      }
    }
    .contentImage {
      margin-left: 4.27vw;
      // padding-bottom: 2.62vh;
      padding-bottom: 0.35rem;
      background-color: #ffffff;
      display: inline-block;
      img {
        // width: 41.73vw;
        // height: 13.19vh;
        height: 1.76rem;
        margin-right: 2.67vw;
        // margin-top: 1.5vh;
        margin-top: 0.2rem;
        vertical-align: middle;
      }
    }
  }
  .listBackUpDepartment {
    .department {
      font-size: 0.28rem;
      font-family: PingFangSC-Medium, PingFang SC;
      color: #333333;
      margin-left: 5.07vw;
      margin-right: 2.4vw;
      font-weight: bold;
      display: inline-block;
      width: 40vw;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    .departmentDate {
      color: #999999;
      font-size: 0.24rem;
      font-family: PingFangSC-Regular, PingFang SC;
    }
  }
  .clearfix:before {
    content: "";
    display: table;
  }
  .departmentContent {
    width: 89.87vw;
    // min-height: 7.21vh;
    min-height: 0.96rem;
    background-color: #ffffff;
    // margin: 0.67vh 5.07vw 2.92vh 5.07vw;
    margin: 0.09rem 5.07vw 0.39rem 5.07vw;
    border-radius: 0 4vw 4vw 4vw;
    .contentHeader {
      // margin: 2.17vh 0 1.27vh 1.87vw;
      margin: 0.29rem 0 0.17rem 1.87vw;
      // display: flex;
      .contentHeaderLeft {
        color: #999999;
        font-size: 0.28rem;
        font-family: PingFangSC-Regular, PingFang SC;
      }
      .contentHeaderRight {
        font-size: 0.28rem;
        font-family: PingFangSC-Regular, PingFang SC;
      }
    }
    .departmentContentImage {
      img {
        // width: 23.6vw;
        // height: 8.77vh;
        height: 1.17rem;
        margin-left: 1.87vw;
        // margin-bottom: 1vh;
        margin-bottom: 0.13rem;
      }
    }
  }
  .listBackUpReportRight {
    .reportRightHeader {
      display: flex;
      justify-content: flex-end;
      // line-height: 1.42vh;
      // margin-bottom: 0.67vh;
      margin-bottom: 0.09rem;
      .reportRightCenter {
        color: #999999;
        font-size: 0.24rem;
        font-family: PingFangSC-Regular, PingFang SC;
        // margin-top: 0.5vh;
        margin-top: 0.07rem;
        // margin-right: 4vw;
      }
      .reportRight {
        // margin-top: -0.5vh;
        color: #333333;
        font-size: 0.28rem;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: bold;
        margin-right: 5.87vw;
        margin-left: 5vw;
        display: inline-block;
        width: 40vw;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
    }
    .reportRightContent {
      width: 89.87vw;
      // min-height: 7.21vh;
      // margin: 1.67vh 5.07vw 2.92vh 5.07vw;
      min-height: 0.96rem;
      margin: 0.22rem 5.07vw 0.39rem 5.07vw;
      border-radius: 4vw 0 4vw 4vw;
      // background-color: #c5defe;
      background: rgba(197, 222, 254, 0.45);
      // opacity: 0.45;
      .contentTitle {
        display: flex;
        // margin: 2.17vh 0 1vh 1.87vw;
        margin: 0.29rem 0 0.13rem 1.87vw;
        .contentTitleLeft {
          min-width: 18.67vw;
          color: #999999;
          font-size: 0.28rem;
          font-family: PingFangSC-Regular, PingFang SC;
        }
        .contentTitleRight {
          font-size: 0.28rem;
          font-family: PingFangSC-Regular, PingFang SC;
        }
      }
      .reportContentImage {
        img {
          // width: 23.6vw;
          // height: 8.77vh;
          height: 1.17rem;
          margin-left: 1.87vw;
          // margin-bottom: 1vh;
          margin-bottom: 0.13rem;
        }
      }
    }
  }
  .listBackUpSubmit {
    // min-height: 7.12vh;
    min-height: 0.95rem;
    font-size: 0.32rem;
    font-family: PingFangSC-Regular, PingFang SC;
    background: rgba(236, 242, 242, 1);
    box-shadow: 0px -1px 1px 0px rgba(116, 116, 116, 0.3);
    .submitHeader {
      // margin: 1.27vh 0 1.95vh 2vw;
      margin: 0.26rem 0 0.26rem 2vw;
      display: flex;
      .submitHeaderLeft {
        width: 73.87vw;
        // min-height: 4.72vh;
        min-height: 0.63rem;
        background-color: #ffffff;
        font-size: 0.32rem;
        font-family: PingFangSC-Regular, PingFang SC;
        border-radius: 4vw;
        // padding: 1vh 4.27vw 1vh 4.27vw;
        padding: 0.13rem 4.27vw 0.13rem 4.27vw;
        box-sizing: border-box;
        outline: none;
        border: none;
      }
      /deep/ .submitHeaderRight {
        // min-height: 4.72vh;
        min-height: 0.63rem;
        // height: 9.67vh;
        // line-height: 9.67vh;
        // line-height: 4.72vh;
        /deep/ .van-uploader__preview {
          display: none;
        }
        img {
          width: 7.47vw;
          // height: 4.2vh;
          height: 0.56rem;
          vertical-align: middle;
          margin-left: 0.93vw;
        }
        .submitButton {
          width: 12.67vw;
          // height: 4.72vh;
          // line-height: 4.72vh;
          height: 0.63rem;
          line-height: 0.63rem;
          border-radius: 4.27vw;
          background-color: #0091ff;
          border: none;
          font-size: 0.32rem;
          font-family: PingFangSC-Regular, PingFang SC;
          color: #ffffff;
          margin-left: 1.6vw;
        }
      }
    }
    .submitImage {
      display: flex;
      flex-wrap: wrap;
      margin-left: 5.47vw;
      div {
        position: relative;
        img {
          width: 20.33vw;
          // height: 11.43vh;
          height: 1.52rem;
          margin-right: 2.53vw;
          // margin-bottom: 1vh;
          margin-bottom: 0.13rem;
          &.close {
            width: 5.87vw;
            // height: 3.3vh;
            height: 0.44rem;
            position: absolute;
            right: -1vw;
            // top: -1vh;
            top: -0.13rem;
            z-index: 1000;
          }
        }
      }
    }
    /deep/ .van-loading--vertical {
      width: 20.33vw;
      // height: 11.43vh;
      // padding-top: 2vh;
      height: 1.52rem;
      padding-top: 0.27rem;
      box-sizing: border-box;
    }
  }
</style>