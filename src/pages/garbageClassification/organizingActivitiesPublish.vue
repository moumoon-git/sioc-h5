<!--
 * @Author: liukanglin
 * @Date: 2020-09-21 13:35:40
 * @LastEditors: liukanglin
 * @LastEditTime: 2020-12-17 20:35:17
 * @Desc: 垃圾分类组织宣传活动发布页面
 * @FilePath: \vue-cli-multiPage-master\src\pages\garbageClassification\organizingActivitiesPublish.vue
-->
<template>
  <div class="activities_publish">
    <div class="activities_publish_content">
      <div class="activities_publish_content_list">
        <div class="activities_publish_content_list_title">活动名称</div>
        <!-- <div class="activities_publish_content_list_text">天福居小区垃圾分类宣教活动</div> -->
        <input
          v-model="publishActivity.name"
          class="activities_publish_content_list_input"
          type="text"
          placeholder="请输入活动名称"
        />
      </div>
      <div class="activities_publish_content_list">
        <div class="activities_publish_content_list_title">活动地址</div>
        <div
          class="activities_publish_content_list_text"
          style="margin-right: 0.4rem"
          :class="
            publishActivity.place == ''
              ? 'activities_publish_content_list_select'
              : 'activities_publish_content_list_color'
          "
        >
          {{
            publishActivity.place == ""
              ? "点击获取定位地址"
              : publishActivity.place
          }}
        </div>
        <!-- <img
          @click="showPosition"
          style="width: 0.4rem; margin: 0"
          src="@/assets/img/location.png"
          alt
        /> -->
        <img
          class="activities_publish_content_list_location"
          @click="getLocation"
          src="@/assets/img/location.png"
          alt
        />
      </div>
      <div
        class="activities_publish_content_list"
        @click="communityShow = true"
      >
        <div class="activities_publish_content_list_title">
          所属社区
          <!-- <img src="@/assets/img/right_arrow.svg" alt /> -->
        </div>
        <i></i>
        <div
          :class="
            publishActivity.community == ''
              ? 'activities_publish_content_list_select'
              : 'activities_publish_content_list_color'
          "
        >
          {{
            publishActivity.community == ""
              ? "请选择所属社区"
              : publishActivity.community
          }}
        </div>
        <!-- <van-action-sheet
          v-model="communityShow"
          :actions="communityActions"
          close-on-click-action
          @select="onSelect"
        /> -->
      </div>
      <van-popup v-model="communityShow" round position="bottom">
        <van-picker
          title="请选择所属社区"
          show-toolbar
          cancel-button-text="✕"
          confirm-button-text="确定"
          :columns="communityActions"
          @cancel="communityShow = false"
          @confirm="onSelect"
        />
      </van-popup>
      <div class="activities_publish_content_list">
        <div class="activities_publish_content_list_title">投入人次</div>
        <!-- <van-stepper v-model="publishActivity.personTime" min="0" /> -->
        <input
          v-model="publishActivity.personTime"
          class="activities_publish_content_list_input"
          type="text"
          placeholder="请输入投入人次"
        />
      </div>
      <div class="activities_publish_content_list">
        <div class="activities_publish_content_list_title">
          <div>上传照片</div>
          <van-uploader
            v-model="fileList"
            @delete="afterRead"
            :after-read="afterRead"
          >
            <!-- multiple -->
            <div class="uploadImage">
              <!-- <i class="iconfont iconicon-test"></i> -->
              <span
                ><img src="@/assets/img/camera.png" alt="" />
                <div class="uploadImage_text">上传照片</div></span
              >
            </div>
          </van-uploader>
        </div>
        <div class="activities_publish_content_list_text">
          <!-- <img src="@/assets/img/textImg.png" alt />
          <img src="@/assets/img/textImg.png" alt />-->
          <!-- <img src="@/assets/img/textImg.png" alt /> -->
        </div>
        <!-- <van-uploader v-model="fileList" @delete="afterRead" :after-read="afterRead" multiple>
          <div class="uploadImage">
            <i class="iconfont iconicon-test"></i>
          </div>
        </van-uploader>-->
      </div>
      <!-- <div class="activities_publish_content_list">
        <div class="activities_publish_content_list_title">宣传情况</div>
        <textarea
          v-model="publishActivity.remark"
          placeholder="请输入内容"
        ></textarea>
      </div> -->
      <div class="activities_publish_content_remark">
        <div>备注：</div>
        <textarea
          v-model="publishActivity.remark"
          placeholder="请在此输入备注（选填）"
        ></textarea>
      </div>
    </div>
    <div class="activities_publish_margin"></div>
    <div class="activities_publish_fixed">
      <div
        class="activities_publish_fixed_confirm"
        @click="confirmPublishActivity"
      >
        确定
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      communityShow: false, //所属社区面板是否展示
      communityValue: "", //所属社区值
      communityActions: [], //传入社区选项的值
      communityActionsData: [], //后台返回社区选项的值
      fileList: [], //上传图片的数据
      delectIndex: "", //被删除的位置的索引值
      acceptImglist: [],
      publishActivity: {
        community: "",
        name: "",
        place: "",
        townId: "",
        personTime: "",
        remark: "",
        longitude: 0,
        latitude: 0,
        imgList: [],
      },
      compressSize: 1, //压缩比例
    };
  },
  watch: {
    fileList(newVal, oldVal) {
      //console.log(newVal, oldVal);
      //新值的长度小于旧值，说明图片被删除
      if (newVal.length < oldVal.length) {
        oldVal.forEach((val, index) => {
          if (!newVal.includes(val)) {
            //console.log(newVal.includes(val), index);
            //将被删除的图片通过索引进行删除
            // this.publishActivity.imgList.splice(index, 1);
            this.delectIndex = index;
          }
        });
      }
    },
  },
  methods: {
    /**
     * @description: 从高德地图api获取浏览器定位
     * @param {}
     * @return {}
     */
    getLocation() {
      // 从高德地图api获取浏览器定位
      const that = this;
      AMap.plugin("AMap.Geolocation", function () {
        let geolocation = new AMap.Geolocation({
          // 是否使用高精度定位，默认：true
          enableHighAccuracy: true,
          // 设置定位超时时间，默认：无穷大
          timeout: 10000,
        });
        geolocation.getCurrentPosition();
        // geolocation.getCurrentPosition()
        AMap.event.addListener(geolocation, "complete", onComplete);
        AMap.event.addListener(geolocation, "error", onError);

        function onComplete(data) {
          // data是具体的定位信息
          //console.log("定位成功后获取得位置为", data);
          that.publishActivity.longitude = data.position.lng;
          that.publishActivity.latitude = data.position.lat;
          let lng = that.lng;
          let lat = that.lat;
          that
            .$http({
              url: that.$http.adornUrl(
                `/investigation/instanceInfor/getAdressFromTencent?lng=${that.publishActivity.longitude}&lat=${that.publishActivity.latitude}`
              ),
              method: "get",
              params: that.$http.adornParams({}),
            })
            .then(({ data }) => {
              //console.log("活动地址", data);
              that.publishActivity.place = data.address;
            });
        }

        function onError() {
          // 定位出错
          that.$toast.fail("定位失败");
        }
      });
    },

    /**
     * @description: 所属社区选中情况
     * @param {string} value 选中选项的值
     * @param {number} index 选中选项的索引值
     * @return {}
     */
    onSelect(value, index) {
      this.communityShow = false;
      //console.log(value, index);
      this.publishActivity.community = value;
      this.publishActivity.townId = this.communityActionsData[index].id;
      //console.log(this.publishActivity.townId, this.publishActivity.community);
    },

    /**
     * @description:文件上传完毕后触发的回调函数
     * @param {obj} file 对应的file对象
     * @return {}
     */
    afterRead(file) {
      //console.log(file, this.fileList);
      //长度为1的时候数据类型为对象
      var content = file.content;
      var name = file.file.name;
      file.status = "uploading";
      file.message = "上传中...";
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
            //console.log(file);
            if (this.delectIndex === 0) {
            } else if (!this.delectIndex) {
              this.fileList[this.fileList.length - 1] = {
                content,
                file,
              };
            }
          } 
          else {
            resolve();
          }
        };
      }).then(() => {
        //console.log(file, this.fileList);
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
          file.status = "";
          file.message = "";
          //console.log("文件上传后返回的数据data===》", data, this.delectIndex);
          let fileName = data.data.fileName;
          let filestr = data.data.filestr;
          if (this.delectIndex || this.delectIndex === 0) {
            this.publishActivity.imgList.splice(this.delectIndex, 1);
          } else {
            //console.log(fileName);
            this.publishActivity.imgList = [];
            fileName.forEach((v, i) => {
              this.publishActivity.imgList.push({
                name: fileName[i],
                url: filestr[i],
              });
            });
          }
          this.delectIndex = "";
          this.acceptImglist = this.publishActivity.imgList;
          //console.log(this.publishActivity.imgList, this.fileList);
        });
      });
    },

    /**
     * @description: 发布一个新活动
     * @param {}
     * @return {}
     */
    confirmPublishActivity() {
      if (this.publishActivity.townId == "") {
        this.$dialog.alert({
          message: "所属社区不能为空",
        });
        return;
      }
      this.$dialog
        .confirm({
          title: "请确认是否发布活动",
        })
        .then(() => {
          this.$http({
            url: this.$http.adornUrl(`/garbage/garbageActivity/save`),
            method: "post",
            data: this.$http.adornData({
              name: this.publishActivity.name,
              place: this.publishActivity.place,
              townId: this.publishActivity.townId,
              personTime: this.publishActivity.personTime,
              remark: this.publishActivity.remark,
              longitude: this.publishActivity.longitude,
              latitude: this.publishActivity.latitude,
              imgList: this.publishActivity.imgList,
            }),
          }).then((data) => {
            //console.log(data);
            if(data && data.data.code === 0){
              this.$dialog
                .alert({
                  message: "发布活动成功",
                })
                .then(() => {
                  this.$router.go(-1);
                });
            }else{
              this.$dialog
                .alert({
                  message: "发布活动失败，服务器异常",
                })
            }
          });
        });
    },

    /**
     * @description: 获取社区
     * @param {}
     * @return {}
     */
    getCommunity() {
      this.$http({
        url: this.$http.adornUrl(`/sys/systown/treeList`),
        method: "get",
        params: this.$http.adornParams({}),
      }).then((data) => {
        this.communityActionsData = data.data.list[0].children;
        data.data.list[0].children.forEach((v) => {
          // this.communityActions.push({ name: v.townName, id: v.id });
          this.communityActions.push(v.townName);
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
    this.getCommunity();
  },
};
</script>

<style lang="less" scoped>
  .activities_publish {
    margin: 0.2rem 0 0 0;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: #ffffff;
    overflow: scroll;
    // 详情内容
    .activities_publish_content {
      background-color: #ffffff;
      border-radius: 0.1rem;
      // margin-bottom: 2.2rem;
      overflow: hidden;
      // picker选择器确定按钮
      /deep/ .van-picker__confirm {
        color: #0091ff;
        font-size: 0.32rem;
      }
      // picker选择器取消按钮
      /deep/ .van-picker__cancel {
        // font-weight: bold;
        font-size: 0.4rem;
        color: #575757;
      }
      /deep/ .van-picker__title {
        font-size: 0.36rem;
      }
      //宣传情况说明
      .activities_publish_content_remark {
        margin: 0 0.4rem;
        font-size: 0.32rem;
        font-family: PingFangSC-Regular, PingFang SC;
        color: #333333;
        div {
          margin-top: 0.3rem;
        }
        textarea {
          border: none;
          resize: none;
          width: 100%;
          height: 2.8rem;
          margin-top: 0.12rem;
        }
        textarea::-webkit-input-placeholder {
          font-size: 0.26rem;
          font-family: PingFangSC-Regular, PingFang SC;
          color: #cccccc;
        }
      }
      // 详情列表
      .activities_publish_content_list {
        display: flex;
        justify-content: flex-start;
        min-height: 1.1rem;
        line-height: 1.1rem;
        font-size: 0.28rem;
        margin: 0 0.4rem;
        border-bottom: 0.01rem solid #dddddd;
        font-size: 0.32rem;
        font-family: PingFangSC-Regular, PingFang SC;
        color: #333333;
        position: relative;
        &:nth-last-child(1) {
          min-height: 1.9rem;
        }
        //定位图标
        .activities_publish_content_list_location {
          width: 0.4rem;
          margin: 0;
          position: absolute;
          right: 0;
          top: 0.4rem;
        }
        //带选项列表的文字
        .activities_publish_content_list_select {
          display: inline-block;
          color: #cccccc !important;
        }
        //带选项被选中后的文字颜色
        .activities_publish_content_list_color {
          color: #000000 !important;
        }
        // 社区选项弹框
        /deep/ .van-action-sheet {
          height: 6rem;
        }
        .activities_publish_content_list_title {
          flex: 0 0 auto;
          margin-right: 0.8rem;
          img {
            position: absolute;
            right: -0.15rem;
            top: 0.2rem;
            width: 0.7rem;
            transform: rotate(180deg);
          }
        }
        .activities_publish_content_list_input {
          border: none;
          width: 5.2rem;
        }
        input::-webkit-input-placeholder {
          color: #cccccc;
          font-size: 0.32rem;
          font-family: PingFangSC-Regular, PingFang SC;
        }
        .activities_publish_content_list_text {
          max-width: 4.5rem;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          font-size: 0.32rem;
          font-family: PingFangSC-Regular, PingFang SC;
          color: #333333;
          img {
            width: 2.5rem;
            &:nth-child(1) {
              margin-right: 0.15rem;
            }
          }
        }
        textarea {
          border: none;
          resize: none;
          width: 5rem;
        }
        //列表右侧的右箭头
        i {
          display: block;
          position: absolute;
          width: 0.2rem;
          height: 0.2rem;
          border-top: 0.02rem solid #999999;
          border-right: 0.02rem solid #999999;
          right: 0;
          top: 50%;
          margin-top: -0.1rem;
          transform: rotate(45deg);
        }
        // 上传图片
        .van-uploader {
          width: 7rem;
          // 相机图标
          .uploadImage {
            margin: 0.2rem 0;
            // i {
            //   font-size: 1rem;
            // }
            span {
              display: block;
              width: 1.5rem;
              height: 1.5rem;
              border: 0.01rem dashed #cccccc;
              position: relative;
              img {
                transform: rotate(0deg);
                width: 0.6rem;
                position: absolute;
                left: 50%;
                top: 0.2rem;
                margin-left: -0.3rem;
              }
              .uploadImage_text {
                font-size: 0.2rem;
                font-family: PingFangSC-Medium, PingFang SC;
                font-weight: 500;
                color: #999999;
                position: absolute;
                top: 30%;
                left: 20%;
              }
            }
          }
          // 预览图片
          /deep/ .van-uploader__preview-image {
            width: 2rem;
            height: 2rem;
          }
        }
      }
    }
    // 底部margin值
    .activities_publish_margin {
      margin-bottom: 1.5rem;
    }
    // 底部固定定位内容
    .activities_publish_fixed {
      width: 100%;
      // height: 2.36rem;
      height: 1.5rem;
      // background-color: #ffffff;
      //   margin-top: 0.26rem;
      overflow: hidden;
      position: fixed;
      z-index: 1000;
      bottom: 0;
      // 确定按钮
      .activities_publish_fixed_confirm {
        width: 6.4rem;
        height: 0.9rem;
        line-height: 0.9rem;
        text-align: center;
        font-size: 0.36rem;
        background: linear-gradient(360deg, #2b80ff 0%, #65bcff 100%);
        box-shadow: 0 0.06rem 0.12rem 0 rgba(12, 126, 161, 0.35);
        border-radius: 0.75rem;
        // opacity: 0.39;
        margin: 0.3rem auto 0 auto;
        color: #ffffff;
      }
    }
  }
</style>