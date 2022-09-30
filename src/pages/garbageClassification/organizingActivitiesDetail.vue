<!--
 * @Author: liukanglin
 * @Date: 2020-09-21 10:26:10
 * @LastEditors: yaoweixin
 * @LastEditTime: 2020-12-23 18:17:37
 * @Desc: 垃圾分类组织宣传活动详情页
 * @FilePath: \vue-cli-multiPage-master\src\pages\garbageClassification\organizingActivitiesDetail.vue
-->
<template>
  <div class="activities_detail">
    <div class="activities_detail_content">
      <div class="activities_detail_content_title">
        {{ activityDetail.name }}
      </div>
      <div class="activities_detail_content_img">
        <img
          :src="activityDetail.qrCode"
          alt
          @click="showPreviewImage(activityDetail.qrCode)"
        />
        <div>活动二维码</div>
      </div>
      <div class="activities_detail_content_list">
        <div class="activities_detail_content_list_title">知晓率</div>
        <div class="activities_detail_content_list_text">
          {{ activityDetail.accuracy }}%
        </div>
      </div>
      <div class="activities_detail_content_list">
        <div class="activities_detail_content_list_title">投入人次</div>
        <div class="activities_detail_content_list_text">
          {{ activityDetail.personTime }}
        </div>
      </div>
      <div class="activities_detail_content_list">
        <div class="activities_detail_content_list_title">宣教人次</div>
        <div class="activities_detail_content_list_text">
          {{ activityDetail.answerTime }}
        </div>
      </div>
      <div class="activities_detail_content_list">
        <div class="activities_detail_content_list_title">活动组织者</div>
        <div class="activities_detail_content_list_text">
          {{ activityDetail.contactorName }}
        </div>
      </div>
      <div class="activities_detail_content_list">
        <div class="activities_detail_content_list_title">宣传时间</div>
        <div class="activities_detail_content_list_text">
          {{ activityDetail.gmtCreate }}
        </div>
      </div>
      <div class="activities_detail_content_list">
        <div class="activities_detail_content_list_title">活动地址</div>
        <div
          class="activities_detail_content_list_text activities_detail_content_list_height"
        >
          {{ activityDetail.place }}
        </div>
      </div>
      <!-- <div class="activities_detail_content_list"> -->
      <!-- <div class="activities_detail_content_list_title">现场照片：</div> -->
      <!-- <div class="activities_detail_content_list_text"> -->
      <div v-if="activityDetail.imgList != '' " class="activities_detail_content_image">
        <img
          @click="showPreviewImage(item.allUrl)"
          v-for="(item, index) in activityDetail.imgList"
          :key="index"
          :src="item.allUrl"
          alt
        />
      </div>
      <!-- </div> -->
      <!-- <div class="activities_detail_content_list">
        <div class="activities_detail_content_list_title">宣传情况：</div>
        <div class="activities_detail_content_list_text">
          {{ activityDetail.remark }}
        </div>
      </div> -->
      <div class="activities_detail_content_remark">
        宣传情况：{{ activityDetail.remark }}
      </div>
    </div>
    <div class="activities_detail_margin"></div>
    <div class="activities_detail_fixed" v-if="activityDetail.status == '1'">
      <div class="activities_detail_fixed_modify" @click="goActivityUpdata">
        修改活动
      </div>
      <div class="activities_detail_fixed_finish" @click="endActivity">
        结束活动
      </div>
    </div>
    <imagePreview
      ref="previewImage"
      :enlargeImageUrl="enlargeImageUrl"
    ></imagePreview>
  </div>
</template>

<script>
import imagePreview from "../gradeResponse/imagePreview";
export default {
  components: {
    imagePreview,
  },
  data() {
    return {
      id: "", //活动id值
      activityDetail: {}, //活动详情数据
      enlargeImageUrl: [], //接收到的放大图片的路径
    };
  },
  methods: {
    /**
     * @description: 获取活动详情
     * @param {number} id 传入活动对应的id值
     * @return {}
     */
    getActivityDetail(id) {
      this.$http({
        url: this.$http.adornUrl(`/garbage/garbageActivity/info/${id}`),
        method: "get",
        params: this.$http.adornParams({}),
      }).then((data) => {
        //console.log(data);
        this.activityDetail = data.data.data;
      });
    },
    /**
     * @description: 显示放大的预览图
     * @param {String} imgurl 被点击的图片传递进来的图片路径
     * @return {}
     */
    showPreviewImage(imgurl) {
      this.enlargeImageUrl = [];
      this.$refs.previewImage.previewShow = true;
      this.enlargeImageUrl.push(imgurl);
    },

    /**
     * @description: 跳转到修改活动
     * @param {}
     * @return {}
     */
    goActivityUpdata() {
      this.$router.push({
        name: "organizingActivitiesUpdata",
      });
    },
    /**
     * @description: 结束活动
     * @param {}
     * @return {}
     */
    endActivity() {
      this.$dialog
        .confirm({
          title: "请确认是否结束当前活动",
        })
        .then(() => {
          this.$http({
            url: this.$http.adornUrl(`/garbage/garbageActivity/update`),
            method: "post",
            data: this.$http.adornData({
              id: this.id,
              status: "2",
              name: this.activityDetail.name,
              place: this.activityDetail.place,
              townId: this.activityDetail.townId,
              personTime: this.activityDetail.personTime,
              remark: this.activityDetail.remark,
              longitude: this.activityDetail.longitude,
              latitude: this.activityDetail.latitude,
              imgList: this.activityDetail.imgList,
            }),
          }).then((data) => {
            //console.log(data);
            this.$dialog
              .alert({
                message: "结束活动成功",
              })
              .then(() => {
                this.$router.go(-1);
              });
          });
        });
    },
  },
  created() {
    this.id = localStorage.getItem("id");
    this.getActivityDetail(this.id);
  },
};
</script>

<style lang="less" scoped>
  .activities_detail {
    // 详情内容
    .activities_detail_content {
      background-color: #ffffff;
      border-radius: 0.1rem;
      margin: 0.2rem;
      padding: 0 0.38rem;
      // 活动名称
      .activities_detail_content_title {
        height: 1.1rem;
        line-height: 1.1rem;
        font-size: 0.32rem;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: bold;
        color: #333333;
        border-bottom: 0.01rem solid #dddddd;
      }
      // 二维码图片区域
      .activities_detail_content_img {
        text-align: center;
        font-size: 0.28rem;
        // margin-bottom: 0.2rem;
        height: 3.8rem;
        img {
          width: 3.2rem;
        }
        div {
          height: 0.4rem;
          line-height: 0.4rem;
          font-size: 0.28rem;
          font-family: PingFangSC-Regular, PingFang SC;
          color: #666666;
          border-bottom: 0.01rem solid #dddddd;
          margin-top: -0.15rem;
          padding-bottom: 0.2rem;
        }
      }
      // 内容区活动图片
      .activities_detail_content_image {
        margin-top: 0.3rem;
        img {
          width: 3.1rem;
          height: 1.76rem;
          margin-right: 0.1rem;
          &:nth-child(2n) {
            margin-right: 0;
          }
        }
      }
      // 内容区宣传情况说明
      .activities_detail_content_remark {
        font-size: 0.28rem;
        font-family: PingFangSC-Regular, PingFang SC;
        color: #666666;
        min-height: 0.6rem;
        line-height: 0.6rem;
      }
      // 详情列表
      .activities_detail_content_list {
        display: flex;
        justify-content: flex-start;
        font-size: 0.28rem;
        font-family: PingFangSC-Regular, PingFang SC;
        color: #999999;
        min-height: 0.6rem;
        line-height: 0.6rem;
        .activities_detail_content_list_title {
          // flex: 0 0 auto;
          margin-right: auto;
        }
        .activities_detail_content_list_text {
          color: #333333;
          max-width: 4.5rem;
          // overflow: hidden;
          // text-overflow: ellipsis;
          // white-space: nowrap;
          img {
            width: 3.13rem;
            height: 1.76rem;
          }
        }
        // 单独设置行高
        .activities_detail_content_list_height {
          line-height: 0.4rem;
          margin-top: 0.1rem;
        }
      }
    }
    // 设置固定定位的margin值
    .activities_detail_margin {
      margin-bottom: 2.56rem;
    }
    // 底部固定定位内容
    .activities_detail_fixed {
      font-size: 0.28rem;
      text-align: center;
      position: fixed;
      bottom: 0;
      width: 100%;
      height: 2.36rem;
      background-color: #ffffff;
      // 修改活动按钮
      .activities_detail_fixed_modify {
        color: #ffffff;
        width: 6.4rem;
        height: 0.9rem;
        line-height: 0.9rem;
        border-radius: 0.75rem;
        background: linear-gradient(360deg, #2b80ff 0%, #65bcff 100%);
        box-shadow: 0 0.06rem 0.12rem 0 rgba(12, 126, 161, 0.35);
        margin: 0.32rem auto 0 auto;
        font-size: 0.36rem;
        font-family: PingFangSC-Regular, PingFang SC;
      }
      // 结束活动按钮
      .activities_detail_fixed_finish {
        color: #0091ff;
        font-size: 0.29rem;
        margin-top: 0.4rem;
        font-family: PingFangSC-Regular, PingFang SC;
      }
    }
  }
</style>