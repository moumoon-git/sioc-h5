<template>
  <div>
    <div class="submitResponseHeader">
      <div class="submitResponseHeaderPeople">
        <span class="headerNameLeft">响应人数</span>
        <input
          onkeyup="value=value.replace(/[^\d]/g,'')"
          v-model="addResponseData.responNum"
          class="headerNameRight"
          type="text"
        />
      </div>
      <div class="submitResponseHeaderLeader">
        <span class="headerLeaderLeft">响应负责人</span>
        <input
          v-model="addResponseData.person"
          class="headerLeaderRight"
          type="text"
        />
      </div>
      <div class="submitResponseHeaderLeaderPhone">
        <span class="headerLeaderPhoneLeft">负责人电话</span>
        <input
          v-model="addResponseData.personPhone"
          class="headerLeaderPhoneRight"
          type="text"
        />
      </div>
      <div class="submitResponseHeaderExplain">
        <span class="headerExplainLeft">响应说明</span>
        <span class="headerExplainRight"></span>
      </div>
      <div class="submitResponseHeaderInput">
        <textarea
          v-model="addResponseData.remark"
          style="resize: none"
          placeholder="请输入内容"
        ></textarea>
      </div>
    </div>
    <div class="submitResponseUpload">
      <div class="uploadTitle">上传图片</div>
      <div class="uploadContent">
        <van-uploader
          v-model="fileList"
          @delete="afterRead"
          :after-read="afterRead"
        >
          <div class="uploadImage">
            <i class="iconfont iconicon-test"></i>
            <div class="uploadText">上传图片</div>
          </div>
        </van-uploader>
      </div>
    </div>
    <div class="submitResponseBottomButton">
      <button class="buttonReset" @click="resetResponse">重置</button>
      <button class="buttonSubmit" @click="submitResponse">提交</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      fileList: [],
      show: false,
      id: "", //传过来的id
      addResponseData: {
        responNum: "",
        person: "",
        personPhone: "",
        remark: "",
        documentVoList: [],
      }, //添加发布响应数据
      compressSize: 1, //压缩比例
    };
  },
  methods: {
    //重置
    resetResponse() {
      this.addResponseData = {
        responNum: "",
        person: "",
        personPhone: "",
        remark: "",
        documentVoList: [],
      };
      this.fileList = [];
    },
    // 提交响应
    submitResponse() {
      this.$dialog
        .confirm({
          title: "请确认是否提交响应",
        })
        .then(() => {
          this.$http({
            url: this.$http.adornUrl(`/level/levelResponseInfor/save`),
            method: "post",
            data: this.$http.adornData({
              remark: this.addResponseData.remark,
              person: this.addResponseData.person,
              personPhone: this.addResponseData.personPhone,
              responNum: this.addResponseData.responNum,
              publishId: this.id,
              documentVoList: this.addResponseData.documentVoList,
            }),
          }).then((data) => {
            // //console.log("提交响应数据data===》", data);
            this.$dialog
              .alert({
                message: "提交响应成功",
              })
              .then(() => {
                this.$router.go(-1);
              });
          });
        })
        .catch(() => {});
    },
    // 文件上传完毕后触发的回调函数
    afterRead(file) {
      file.status = "uploading";
      file.message = "上传中...";
      //console.log(this.fileList);
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
        // //console.log(formData);
        this.$http({
          url: this.$http.adornUrl(`/level/levelPublish/upload//file`),
          method: "post",
          headers: {
            "content-type": "multipart/form-data",
          },
          data: formData,
        }).then((data) => {
          // //console.log("文件上传后返回的数据data===》", data);
          file.status = "";
          file.message = "";
          let fileName = data.data.fileName;
          let filestr = data.data.filestr;
          this.addResponseData.documentVoList = []; //清空上传数据
          data.data.fileName.forEach((v, i) => {
            this.addResponseData.documentVoList.push({
              name: fileName[i],
              url: filestr[i],
              allUrl: "",
            });
          });
          //console.log(this.addResponseData.documentVoList);
        });
      });
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
  },
  created() {
    this.id = JSON.parse(localStorage.getItem("id"));
    //console.log(this.id);
  },
};
</script>

<style lang="less" scoped>
  .submitResponseHeader {
    // min-height: 42.95vh;
    // margin-top: 1.5vh;
    min-height: 5.73rem;
    margin-top: 0.2rem;
    background-color: #ffffff;
    div {
      display: flex;
      span:nth-child(1) {
        min-width: 21.33vw;
      }
    }
    .submitResponseHeaderPeople {
      // border-bottom: 0.075vh solid #f3f3f3;
      border-bottom: 0.02rem solid #f3f3f3;
      // height: 7.5vh;
      // line-height: 7.5vh;
      height: 1rem;
      line-height: 1rem;
      margin-left: 5.33vw;
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
        border: none;
      }
    }
    .submitResponseHeaderLeader {
      // border-bottom: 0.075vh solid #f3f3f3;
      border-bottom: 0.02rem solid #f3f3f3;
      // height: 7.5vh;
      // line-height: 7.5vh;
      height: 1rem;
      line-height: 1rem;
      margin-left: 5.33vw;
      .headerLeaderLeft {
        color: #999999;
        font-size: 0.32rem;
        font-family: PingFangSC-Regular, PingFang SC;
        margin-right: 4vw;
      }
      .headerLeaderRight {
        font-size: 0.32rem;
        font-family: PingFangSC-Regular, PingFang SC;
        color: #333333;
        border: none;
      }
    }
    .submitResponseHeaderLeaderPhone {
      // border-bottom: 0.075vh solid #f3f3f3;
      border-bottom: 0.02rem solid #f3f3f3;
      // height: 7.5vh;
      // line-height: 7.5vh;
      height: 1rem;
      line-height: 1rem;
      margin-left: 5.33vw;
      .headerLeaderPhoneLeft {
        color: #999999;
        font-size: 0.32rem;
        margin-right: 4vw;
      }
      .headerLeaderPhoneRight {
        font-size: 0.32rem;
        font-family: PingFangSC-Regular, PingFang SC;
        color: #333333;
        border: none;
      }
    }
    .submitResponseHeaderExplain {
      // height: 7.5vh;
      // line-height: 7.5vh;
      height: 1rem;
      line-height: 1rem;
      margin-left: 5.33vw;
      // margin-right: 5.33vw;
      .headerExplainLeft {
        color: #999999;
        font-size: 0.32rem;
        font-family: PingFangSC-Regular, PingFang SC;
      }
    }
    .submitResponseHeaderInput {
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
  .submitResponseUpload {
    // min-height: 20.01vh;
    min-height: 2.67rem;
    // margin-top: 1.5vh;
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
  .submitResponseBottomButton {
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