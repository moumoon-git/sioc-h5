<template>
  <div>
    <div class="addRectificationHeader">
      <div class="addRectificationHeaderName">
        <span class="headerNameLeft">整改名称</span>
        <!-- <span class="headerNameRight">花市乱摆乱卖</span> -->
        <input v-model="newRectificationData.name" class="headerNameRight" type="text" />
      </div>
      <div class="addRectificationHeaderUnit">
        <span class="headerUnitLeft">整改单位</span>
        <div class="headerUnitRight">
          <i v-for="(item,index) in receiveName" :key="'receive'+index">{{item}}</i>
        </div>
        <img @click="show = true" src="../../assets/img/add.png" alt />
        <van-action-sheet v-model="show">
          <div class="actionSheetHeader">
            <div class="actionSheetHeaderLeft">已选择：{{this.result.length}}</div>
            <div class="actionSheetHeaderRight" @click="confirmButton">确定</div>
          </div>
          <!-- <van-checkbox-group @change="selectInformation" v-model="result"> -->
          <van-checkbox-group v-model="result">
            <van-checkbox
              @click="selectInformation(item.id,index,item.platformName)"
              v-for="(item,index) in lowerLevelData"
              :name="item.platformName"
              :key="index"
            >{{item.platformName}}</van-checkbox>
          </van-checkbox-group>
        </van-action-sheet>
      </div>
      <div class="addRectificationHeaderExplain">
        <span class="headerExplainLeft">整改说明</span>
        <span class="headerExplainRight"></span>
      </div>
      <div class="addRectificationHeaderInput">
        <textarea v-model="newRectificationData.remark" style="resize:none" placeholder="请输入内容"></textarea>
      </div>
    </div>
    <div class="addRectificationUpload">
      <div class="uploadTitle">上传图片</div>
      <div class="uploadContent">
        <van-uploader v-model="fileList" @delete="afterRead" :after-read="afterRead">
          <div class="uploadImage">
            <i class="iconfont iconicon-test"></i>
            <div class="uploadText">上传图片</div>
          </div>
        </van-uploader>
      </div>
    </div>
    <div class="addRectificationBottomButton">
      <button class="buttonReset" @click="resetRectification">重置</button>
      <button class="buttonSubmit" @click="newRectification">提交</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      fileList: [],
      show: false,
      result: [], // 绑定复选框的勾选状态
      receiveName: [], //接收resultName数组
      receiveId: [], //接收resultId数组
      id: "", //传过来的id
      lowerLevelData: [], //下级目录数据
      newRectificationData: {
        name: "",
        remark: "",
        responsePublishId: "",
        handerPeople: "",
        peoplePhone: "",
        documentVoList: [],
        unitList: [],
      }, //新增整改数据
      compressSize: 1, //压缩比例
    };
  },
  methods: {
    //重置
    resetRectification() {
      this.newRectificationData = {
        name: "",
        remark: "",
        responsePublishId: "",
        handerPeople: "",
        peoplePhone: "",
        documentVoList: [],
        unitList: [],
      };
      this.receiveName = [];
      this.receiveId = [];
      this.result = [];
      this.fileList = [];
    },
    //新增整改
    newRectification() {
      if (this.result.length == 0) {
        this.$dialog.alert({
          message: "整改单位不能为空",
        });
        return;
      }
      this.$dialog
        .confirm({
          title: "请确认是否新增整改",
        })
        .then(() => {
          this.$http({
            url: this.$http.adornUrl(`/levelRectifyPublish/save`),
            method: "post",
            data: this.$http.adornData({
              name: this.newRectificationData.name,
              remark: this.newRectificationData.remark,
              responsePublishId: this.id,
              handerPeople: "",
              peoplePhone: "",
              documentVoList: this.newRectificationData.documentVoList,
              unitList: this.newRectificationData.unitList,
            }),
          }).then((data) => {
            this.$dialog
              .alert({
                message: "新增整改成功",
              })
              .then(() => {
                this.$router.go(-1);
              });
          });
        })
        .catch(() => {});
    },
    //下级目录
    lowerLevel() {
      this.$http({
        url: this.$http.adornUrl(
          `/levelRectifyPublish/sleectPublishPlatform/${this.id}`
        ),
        method: "post",
        data: this.$http.adornData({}),
      }).then((data) => {
        this.lowerLevelData = data.data.data;
        data.data.data.forEach((v) => {
          this.newRectificationData.unitList.push(v.id);
        });
      });
    },
    //复选框选中情况
    selectInformation(id, index, name) {
      // //console.log(id, index, name);
      if (this.receiveName.indexOf(name) > -1) {
        this.receiveName = this.receiveName.filter((v) => {
          return v != name;
        });
        this.receiveId = this.receiveId.filter((v) => {
          return v != id;
        });
      } else {
        this.receiveName.splice(index, 0, name);
        this.receiveId.splice(index, 0, id);
        // this.receiveResult.push(id);
      }
    },
    //复选框确定按钮
    confirmButton() {
      // this.receiveResult = this.result;
      this.newRectificationData.unitList = this.receiveId;
      this.show = false;
    },
    // 文件上传完毕后触发的回调函数
    afterRead(file) {
      file.status = "uploading";
      file.message = "上传中...";
      var content = file.content;
      var name = file.file.name;
      // 设置图片的压缩比例
      this.compressImg(file.file.size);
      new Promise((resolve, reject) => {
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
            console.info(file);
            // 最后将base64编码的图片保存到数组中，留待上传。
            resolve(file);
            this.fileList[this.fileList.length - 1] = {
              content,
              file,
            }
          } 
          else {
            resolve();
          }
        };
      }).then(()=>{
        // //console.log(this.fileList);
        let formData = new FormData();
        this.fileList.forEach((v) => {
          formData.append("files", v.file);
        });
        this.$http({
          url: this.$http.adornUrl(`/level/levelPublish/upload//file`),
          method: "post",
          headers: {
            "content-type": "multipart/form-data",
          },
          data: formData,
        }).then((data) => {
          file.status = "";
          file.message = "";
          let fileName = data.data.fileName;
          let filestr = data.data.filestr;
          this.newRectificationData.documentVoList = [];
          fileName.forEach((v, i) => {
            this.newRectificationData.documentVoList.push({
              name: fileName[i],
              url: filestr[i],
            });
          });
        });
      })
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
      // //console.log(this.compressSize);
    },
  },
  created() {
    Promise.resolve((this.id = JSON.parse(localStorage.getItem("id")))).then(
      () => {
        this.lowerLevel();
      }
    );
  },
};
</script>

<style lang="less" scoped>
  .addRectificationHeader {
    // min-height: 42.95vh;
    // margin-top: 1.5vh;
    min-height: 5.73rem;
    margin-top: 0.2rem;
    background-color: #ffffff;
    .addRectificationHeaderName {
      // border-bottom: 0.075vh solid #f3f3f3;
      border-bottom: 0.02rem solid #f3f3f3;
      // height: 7.5vh;
      // line-height: 7.5vh;
      height: 1rem;
      line-height: 1rem;
      margin-left: 5.33vw;
      font-size: 0.32rem;
      font-family: PingFangSC-Regular, PingFang SC;
      // margin-right: 5.33vw;
      .headerNameLeft {
        color: #999999;
        font-size: 0.32rem;
        font-family: PingFangSC-Regular, PingFang SC;
        margin-right: 4vw;
      }
      .headerNameRight {
        font-size: 0.32rem;
        font-family: PingFangSC-Regular, PingFang SC;
        color: #333333;
        // height: 3.75vh;
        height: 0.5rem;
        border: 0;
      }
    }
    .addRectificationHeaderUnit {
      // border-bottom: 0.075vh solid #f3f3f3;
      border-bottom: 0.02rem solid #f3f3f3;
      // min-height: 7.5vh;
      min-height: 1rem;
      margin-left: 5.33vw;
      position: relative;
      font-size: 0.32rem;
      font-family: PingFangSC-Regular, PingFang SC;
      display: flex;
      .headerUnitLeft {
        color: #999999;
        font-size: 0.32rem;
        font-family: PingFangSC-Regular, PingFang SC;
        margin-right: 3.2vw;
        // line-height: 7.5vh;
        line-height: 1rem;
      }
      .headerUnitRight {
        max-width: 60vw;
        // margin: 2vh 0;
        margin: 0.27rem 0;
        i {
          display: inline-block;
          max-width: 60vw;
          // margin-bottom: 1.5vh;
          margin-bottom: 0.2rem;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          // height: 4.05vh;
          // line-height: 4.05vh;
          height: 0.54rem;
          line-height: 0.54rem;
          padding: 0 2.27vw;
          border-radius: 3.6vw;
          margin-right: 1.33vw;
          font-style: normal;
          color: #0091ff;
          font-size: 0.24rem;
          font-family: PingFangSC-Medium, PingFang SC;
          text-align: center;
          font-weight: bold;
          background: rgba(197, 222, 254, 0.28);
          &:nth-last-child(1) {
            margin-bottom: 0;
          }
        }
      }
      img {
        width: 5.33vw;
        // height: 3vh;
        height: 0.4rem;
        position: absolute;
        right: 4.67vw;
        // top: 2.62vh;
        top: 0.35rem;
      }
      .actionSheetHeader {
        display: flex;
        .actionSheetHeaderLeft {
          width: 75.2vw;
          margin-left: 4.8vw;
          // margin-top: 2.5vh;
          margin-top: 0.33rem;
          color: #0091ff;
          font-size: 0.32rem;
          font-family: PingFangSC-Regular, PingFang SC;
        }
        .actionSheetHeaderRight {
          width: 18.13vw;
          // height: 4.57vh;
          // line-height: 4.57vh;
          height: 0.61rem;
          line-height: 0.61rem;
          text-align: center;
          background-color: #0091ff;
          color: #ffffff;
          font-size: 0.32rem;
          font-family: PingFangSC-Regular, PingFang SC;
          // margin-top: 2.02vh;
          margin-top: 0.27rem;
          margin-right: 2.87vw;
          border-radius: 0.8vw;
        }
      }
      .van-checkbox {
        border-bottom: 0.13vw solid #ededed;
        // height: 8vh;
        height: 1.07rem;
        /deep/.van-checkbox__icon--round .van-icon {
          margin-left: 3.6vw;
        }
        /deep/.van-checkbox__label {
          margin-left: 3.2vw;
          font-size: 0.32rem;
          font-family: PingFangSC-Regular, PingFang SC;
        }
      }
    }
    .addRectificationHeaderExplain {
      // height: 7.5vh;
      // line-height: 7.5vh;
      height: 1rem;
      line-height: 1rem;
      margin-left: 5.33vw;
      font-size: 0.32rem;
      font-family: PingFangSC-Regular, PingFang SC;
      // margin-right: 5.33vw;
      .headerExplainLeft {
        color: #999999;
        font-size: 0.32rem;
        font-family: PingFangSC-Regular, PingFang SC;
      }
    }
    .addRectificationHeaderInput {
      textarea {
        width: 89.33vw;
        // height: 18.67vh;
        height: 2.49rem;
        margin-left: 5.33vw;
        // margin-bottom: 1.7vh;
        margin-bottom: 0.23rem;
        border: 0.13vw solid #e6e6e6;
        // padding: 0.5vh 0 0 2.67vw;
        padding: 0.07rem 0 0 2.67vw;
        box-sizing: border-box;
        font-size: 0.28rem;
        font-family: PingFangSC-Regular, PingFang SC;
        &::-webkit-input-placeholder {
          color: #dddddd;
        }
      }
    }
  }
  .addRectificationUpload {
    // min-height: 20.01vh;
    // margin-top: 1.5vh;
    min-height: 2.67rem;
    margin-top: 0.2rem;
    background-color: #ffffff;
    // padding: 1.5vh 0 0 5.33vw;
    padding: 0.2rem 0 0 5.33vw;
    .uploadTitle {
      font-size: 0.32rem;
      font-family: PingFangSC-Regular, PingFang SC;
      // margin-bottom: 1.27vh;
      margin-bottom: 0.17rem;
    }
    .uploadContent {
      .van-uploader {
        .uploadImage {
          width: 20.27vw;
          // height: 11.39vh;
          height: 1.52rem;
          position: relative;
          // line-height: 11.39vh;
          border: 0.13vw dashed #e9e9e9;
          .iconicon-test {
            color: #999999;
            font-size: 0.6rem;
            position: absolute;
            // top: 1.55vh;
            top: 0.21rem;
            left: 6.13vw;
          }
          .iconfont{
            color: #999999;
            font-size: 0.6rem;
            position: absolute;
            // top: 1.55vh;
            top: 0.21rem;
            left: 6.13vw;
          }
          .uploadText {
            color: #999999;
            font-size: 0.2rem;
            font-family: PingFangSC-Medium, PingFang SC;
            position: absolute;
            // top: 7.05vh;
            top: 0.94rem;
            left: 4vw;
          }
        }
      }
    }
  }
  .addRectificationBottomButton {
    position: fixed;
    bottom: 0;
    button {
      // height: 6.75vh;
      // line-height: 6.75vh;
      height: 0.9rem;
      line-height: 0.9rem;
      width: 50vw;
      border: none;
      &.buttonReset {
        background-color: #e8f2fc;
        color: #0091ff;
        font-size: 0.32rem;
        font-family: PingFangSC-Regular, PingFang SC;
      }
      &.buttonSubmit {
        background-color: #0091ff;
        color: #ffffff;
        font-size: 0.32rem;
        font-family: PingFangSC-Regular, PingFang SC;
      }
    }
  }
</style>