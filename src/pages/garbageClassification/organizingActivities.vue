<!--
 * @Author: liukanglin
 * @Date: 2020-09-18 09:27:51
 * @LastEditors: liukanglin
 * @LastEditTime: 2020-12-17 20:10:48
 * @Desc: 垃圾分类组织宣传活动首页
 * @FilePath: \vue-cli-multiPage-master\src\pages\garbageClassification\organizingActivities.vue
-->
<template>
  <div>
    <div>
      <div class="activities">
        <div class="activities_title">
          我的活动
          <div class="activities_title_line"></div>
        </div>
        <div
          class="activities_content"
          v-for="(item, index) in myActivities"
          :key="index"
          @click="goActivityDetail(item.id)"
        >
          <div class="activities_content_header">
            {{ item.name }}
          </div>
          <div class="activities_content_bottom">
            <div class="activities_content_bottom_content">
              <div class="activities_content_bottom_content_left">知晓率</div>
              <div class="activities_content_bottom_content_right">
                {{ item.accuracy }}%
              </div>
            </div>
            <div class="activities_content_bottom_content">
              <div class="activities_content_bottom_content_left">投入人次</div>
              <div class="activities_content_bottom_content_right">
                {{ item.personTime }}
              </div>
            </div>
            <div class="activities_content_bottom_content">
              <div class="activities_content_bottom_content_left">宣教人次</div>
              <div class="activities_content_bottom_content_right">
                {{ item.answerTime }}
              </div>
            </div>
            <div class="activities_content_bottom_content">
              <div class="activities_content_bottom_content_left">
                活动组织者
              </div>
              <div class="activities_content_bottom_content_right">
                {{ item.contactorName }}
              </div>
            </div>
            <div class="activities_content_bottom_content">
              <div class="activities_content_bottom_content_left">宣传时间</div>
              <div class="activities_content_bottom_content_right">
                {{ item.gmtCreate }}
              </div>
            </div>
            <div class="activities_content_bottom_content">
              <div class="activities_content_bottom_content_left">活动地址</div>
              <div class="activities_content_bottom_content_right">
                {{ item.place }}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="activities">
        <div class="activities_title">
          当前活动
          <div class="activities_title_line"></div>
        </div>
        <div
          class="activities_content"
          v-for="(item, index) in otherActivities"
          :key="index"
          @click="goActivityDetail(item.id)"
        >
          <div class="activities_content_header">
            {{ item.name }}
          </div>
          <div class="activities_content_bottom">
            <div class="activities_content_bottom_content">
              <div class="activities_content_bottom_content_left">知晓率</div>
              <div class="activities_content_bottom_content_right">
                {{ item.accuracy }}%
              </div>
            </div>
            <div class="activities_content_bottom_content">
              <div class="activities_content_bottom_content_left">投入人次</div>
              <div class="activities_content_bottom_content_right">
                {{ item.personTime }}
              </div>
            </div>
            <div class="activities_content_bottom_content">
              <div class="activities_content_bottom_content_left">宣教人次</div>
              <div class="activities_content_bottom_content_right">
                {{ item.answerTime }}
              </div>
            </div>
            <div class="activities_content_bottom_content">
              <div class="activities_content_bottom_content_left">
                活动组织者
              </div>
              <div class="activities_content_bottom_content_right">
                {{ item.contactorName }}
              </div>
            </div>
            <div class="activities_content_bottom_content">
              <div class="activities_content_bottom_content_left">宣传时间</div>
              <div class="activities_content_bottom_content_right">
                {{ item.gmtCreate }}
              </div>
            </div>
            <div class="activities_content_bottom_content">
              <div class="activities_content_bottom_content_left">活动地址</div>
              <div class="activities_content_bottom_content_right">
                {{ item.place }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="activities_margin"></div>
    <div class="activities_fixed">
      <div class="activities_fixed_publish" @click="publishActivity">
        发布活动
      </div>
      <div class="activities_fixed_history" @click="historyActivity">
        历史活动
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      myActivities: [], //我的活动的数据
      otherActivities: [], //其它活动的数据
      contactorId: "", //用户Id
    };
  },
  methods: {
    /**
     * @description: 跳转到发布活动页
     * @param {}
     * @return {}
     */
    publishActivity() {
      this.$router.push({
        name: "organizingActivitiesPublish",
      });
    },

    /**
     * @description: 跳转到历史活动页
     * @param {}
     * @return {}
     */
    historyActivity() {
      this.$router.push({
        name: "organizingActivitiesHistory",
      });
    },

    /**
     * @description: 获取其他的活动(运行中)
     * @param {}
     * @return {}
     */
    getOtherActivities() {
      this.$http({
        url: this.$http.adornUrl(`/garbage/garbageActivity/list`),
        method: "post",
        data: this.$http.adornData({
          search: "",
          startTime: "",
          endTime: "",
          townId: "",
          noMember: 1,
          member: "",
          page: 1,
          limit: 100000,
          status: 1,
        }),
      }).then((data) => {
        //console.log(data);
        this.otherActivities = data.data.page.list;
      });
    },

    /**
     * @description: 获取我的活动(运行中)
     * @param {}
     * @return {}
     */
    getMyActivities() {
      this.$http({
        url: this.$http.adornUrl(`/garbage/garbageActivity/list`),
        method: "post",
        data: this.$http.adornData({
          search: "",
          startTime: "",
          endTime: "",
          townId: "",
          noMember: 2,
          member: this.contactorId,
          page: 1,
          limit: 100000,
          status: 1,
        }),
      }).then((data) => {
        //console.log(data);
        this.myActivities = data.data.page.list;
      });
    },

    /**
     * @description: 跳转到活动详情页
     * @param {number} id 传入活动对应的id值
     * @return {}
     */
    goActivityDetail(id) {
      localStorage.setItem("id", id);
      this.$router.push({
        name: "organizingActivitiesDetail",
      });
    },
    /**
     * @description: 获取用户Id
     * @param {}
     * @return {}
     */
    getContactorId() {
      let openId = localStorage.getItem("openId");
      return this.$http({
        url: this.$http.adornUrl(
          `/wechatMobile/getContactorByOpneId?openId=${openId}`
        ),
        method: "get",
        params: this.$http.adornParams({}),
      }).then((data) => {
        //console.log(data);
        this.contactorId = data.data.data.id;
        localStorage.setItem("contactorId",this.contactorId)
        //console.log(this.contactorId);
      });
    },
  },
  created() {
    //先获取用户Id
     Promise.resolve(this.getContactorId()).then(() => {
      this.getMyActivities(); //获取自己的活动
      this.getOtherActivities(); //获取其他的活动
    });
  },
};
</script>

<style lang="less" scoped>
  // 活动
  .activities {
    padding: 0 0.2rem 0 0.2rem;
    font-size: 0.28rem;
    // 活动标题
    .activities_title {
      height: 1.18rem;
      line-height: 1.18rem;
      text-align: center;
      font-size: 0.36rem;
      font-family: PingFangSC-Semibold, PingFang SC;
      font-weight: 600;
      color: #666666;
      position: relative;
      // 标题底部蓝色线条
      .activities_title_line {
        width: 0.6rem;
        height: 0.04rem;
        background-color: #0091ff;
        position: absolute;
        left: 50%;
        margin-left: -0.3rem;
        top: 0.95rem;
      }
    }
    // 活动内容
    .activities_content {
      height: 5.18rem;
      background-color: #ffffff;
      border-radius: 0.1rem;
      padding: 0 0.38rem;
      margin-top: 0.2rem;
      &:nth-child(2) {
        margin-top: 0;
      }
      .activities_content_header {
        height: 1.1rem;
        line-height: 1.1rem;
        border-bottom: 0.01rem solid #ccc;
        font-size: 0.32rem;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: bold;
        color: #333333;
        margin-bottom: 0.24rem;
      }
      .activities_content_bottom {
        .activities_content_bottom_content {
          display: flex;
          justify-content: flex-start;
          height: 0.6rem;
          line-height: 0.6rem;
          font-size: 0.29rem;
          font-family: PingFangSC-Regular, PingFang SC;
          .activities_content_bottom_content_left {
            color: #999999;
          }
          .activities_content_bottom_content_right {
            color: #333333;
            margin-left: auto;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
            max-width: 4.5rem;
          }
          img {
            width: 0.4rem;
            vertical-align: middle;
          }
        }
      }
    }
    &:nth-last-child(1) {
      margin-bottom: 2.2rem;
    }
  }
  // 设置固定定位的margin值
  .activities_margin {
    margin-bottom: 2.56rem;
  }
  // 底部固定定位内容
  .activities_fixed {
    font-size: 0.28rem;
    text-align: center;
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 2.36rem;
    background-color: #ffffff;
    // 发布活动按钮
    .activities_fixed_publish {
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
    // 历史活动按钮
    .activities_fixed_history {
      color: #0091ff;
      font-size: 0.29rem;
      margin-top: 0.4rem;
      font-family: PingFangSC-Regular, PingFang SC;
    }
  }
</style>