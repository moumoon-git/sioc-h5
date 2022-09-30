<!--
 * @Author: liukanglin
 * @Date: 2020-09-22 11:44:08
 * @LastEditors: liukanglin
 * @LastEditTime: 2020-10-21 10:56:08
 * @Desc: 垃圾分类组织宣传活动历史页面
 * @FilePath: \vue-cli-multiPage-master\src\pages\garbageClassification\organizingActivitiesHistory.vue
-->
<template>
  <div class="activities_history">
    <van-tabs>
      <van-tab title="我的活动">
        <div class="activities_history_box">
          <div class="activities_history_box_top">
            <div>
              <div class="activities_history_box_top_number">
                {{ myActivities.length }}
              </div>
              <div class="activities_history_box_top_text">活动次数</div>
            </div>
            <div>
              <div class="activities_history_box_top_number">
                {{ myPersonTime }}
              </div>
              <div class="activities_history_box_top_text">投入人次</div>
            </div>
            <div>
              <div class="activities_history_box_top_number">{{myAccuracy}}%</div>
              <div class="activities_history_box_top_text">宣传知晓率</div>
            </div>
            <img
              class="top_img_left"
              src="@/assets/img/historyLeft.png"
              alt=""
            />
            <img
              class="top_img_right"
              src="@/assets/img/historyRight.png"
              alt=""
            />
          </div>
          <div
            class="activities_history_content"
            v-for="(item, index) in myActivities"
            :key="index"
            @click="goActivityDetail(item.id)"
          >
            <div class="activities_history_content_header">
              {{ item.name }}
            </div>
            <div class="activities_history_content_bottom">
              <div class="activities_history_content_bottom_content">
                <div class="activities_history_content_bottom_content_left">
                  知晓率
                </div>
                <div class="activities_history_content_bottom_content_right">
                  {{ item.accuracy }}%
                </div>
              </div>
              <div class="activities_history_content_bottom_content">
                <div class="activities_history_content_bottom_content_left">
                  投入人次
                </div>
                <div class="activities_history_content_bottom_content_right">
                  {{ item.personTime }}
                </div>
              </div>
              <div class="activities_history_content_bottom_content">
                <div class="activities_history_content_bottom_content_left">
                  宣教人次
                </div>
                <div class="activities_history_content_bottom_content_right">
                  {{ item.answerTime }}
                </div>
              </div>
              <div class="activities_history_content_bottom_content">
                <div class="activities_history_content_bottom_content_left">
                  活动组织者
                </div>
                <div class="activities_history_content_bottom_content_right">
                  {{ item.contactorName }}
                </div>
              </div>
              <div class="activities_history_content_bottom_content">
                <div class="activities_history_content_bottom_content_left">
                  宣传时间
                </div>
                <div class="activities_history_content_bottom_content_right">
                  {{ item.gmtCreate }}
                </div>
              </div>
              <div class="activities_history_content_bottom_content">
                <div class="activities_history_content_bottom_content_left">
                  活动地址
                </div>
                <div class="activities_history_content_bottom_content_right">
                  {{ item.place }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </van-tab>
      <van-tab title="其它活动">
        <div class="activities_history_box">
          <div class="activities_history_box_top">
            <div>
              <div class="activities_history_box_top_number">{{otherActivities.length}}</div>
              <div class="activities_history_box_top_text">活动次数</div>
            </div>
            <div>
              <div class="activities_history_box_top_number">{{otherPresonTime}}</div>
              <div class="activities_history_box_top_text">投入人次</div>
            </div>
            <div>
              <div class="activities_history_box_top_number">{{otherAccuracy}}%</div>
              <div class="activities_history_box_top_text">宣传知晓率</div>
            </div>
            <img
              class="top_img_left"
              src="@/assets/img/historyLeft.png"
              alt=""
            />
            <img
              class="top_img_right"
              src="@/assets/img/historyRight.png"
              alt=""
            />
          </div>
          <div
            class="activities_history_content"
            v-for="(item, index) in otherActivities"
            :key="index"
            @click="goActivityDetail(item.id)"
          >
            <div class="activities_history_content_header">
              {{ item.name }}
            </div>
            <div class="activities_history_content_bottom">
              <div class="activities_history_content_bottom_content">
                <div class="activities_history_content_bottom_content_left">
                  知晓率
                </div>
                <div class="activities_history_content_bottom_content_right">
                  {{ item.accuracy }}%
                </div>
              </div>
              <div class="activities_history_content_bottom_content">
                <div class="activities_history_content_bottom_content_left">
                  投入人次
                </div>
                <div class="activities_history_content_bottom_content_right">
                  {{ item.personTime }}
                </div>
              </div>
              <div class="activities_history_content_bottom_content">
                <div class="activities_history_content_bottom_content_left">
                  宣教人次
                </div>
                <div class="activities_history_content_bottom_content_right">
                  {{ item.answerTime }}
                </div>
              </div>
              <div class="activities_history_content_bottom_content">
                <div class="activities_history_content_bottom_content_left">
                  活动组织者
                </div>
                <div class="activities_history_content_bottom_content_right">
                  {{ item.contactorName }}
                </div>
              </div>
              <div class="activities_history_content_bottom_content">
                <div class="activities_history_content_bottom_content_left">
                  宣传时间
                </div>
                <div class="activities_history_content_bottom_content_right">
                  {{ item.gmtCreate }}
                </div>
              </div>
              <div class="activities_history_content_bottom_content">
                <div class="activities_history_content_bottom_content_left">
                  活动地址
                </div>
                <div class="activities_history_content_bottom_content_right">
                  {{ item.place }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
export default {
  data() {
    return {
      myActivities: [], //我的活动记录
      otherActivities: [], //其它活动记录
      contactorId: "", //用户ID
      myPersonTime: 0, //我的投入人次
      myAccuracy: 0, //我的宣传知晓率
      otherPresonTime: 0, //其它的投入人次
      otherAccuracy: 0, //其它的宣传知晓率
    };
  },
  methods: {
    /**
     * @description: 获取其他的活动(已结束)
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
          member: this.contactorId,
          page: 1,
          limit: 100000,
          status: 2,
        }),
      }).then((data) => {
        //console.log(data);
        this.otherActivities = data.data.page.list;
        data.data.page.list.forEach((v) => {
          this.otherPresonTime += parseInt(v.personTime);
          this.otherAccuracy += parseInt(v.accuracy)/(data.data.page.list.length)
        });
      });
    },

    /**
     * @description: 获取我的活动(已结束)
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
          status: 2,
        }),
      }).then((data) => {
        //console.log(data);
        this.myActivities = data.data.page.list;
        data.data.page.list.forEach((v) => {
          this.myPersonTime += parseInt(v.personTime);
          this.myAccuracy += parseInt(v.accuracy)/(data.data.page.list.length)
        });
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
  },
  created() {
    this.contactorId = localStorage.getItem("contactorId");
    this.getMyActivities(); //获取自己的活动
    this.getOtherActivities(); //获取其他的活动
  },
};
</script>

<style lang="less" scoped>
  .activities_history {
    font-size: 0.28rem;
    /deep/ .van-tab {
      font-size: 0.28rem;
      color: #666666;
    }
    // 被选中的tab
    /deep/ .van-tab--active {
      font-size: 0.28rem;
      font-family: PingFangSC-Semibold, PingFang SC;
      font-weight: 600;
      color: #333333;
    }
    // 切换tab时跟随移动的线条
    /deep/ .van-tabs__line {
      // display: none;
      width: 0.8rem !important;
      background-color: #0091ff;
    }
    // 历史活动区域
    .activities_history_box {
      padding: 0.2rem;
      .activities_history_box_top {
        display: flex;
        height: 1.7rem;
        // line-height: 1.7rem;
        background: linear-gradient(337deg, #65bcff 0%, #2b80ff 100%);
        box-shadow: 0 0.05rem 0.2rem 0 rgba(53, 53, 57, 0.08);
        border-radius: 0.08rem;
        // opacity: 0.68;
        position: relative;
        > div {
          width: 33.33%;
          text-align: center;
          color: #ffffff;
          .activities_history_box_top_number {
            font-size: 0.5rem;
            font-family: PingFangSC-Medium, PingFang SC;
            font-weight: 500;
            color: #ffffff;
            margin-top: 0.35rem;
          }
          .activities_history_box_top_text {
            font-size: 0.24rem;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #ffffff;
          }
        }
        .top_img_left {
          width: 1.4rem;
          position: absolute;
          top: 0;
          left: 0;
        }
        .top_img_right {
          width: 2.56rem;
          position: absolute;
          top: 0;
          right: 0;
        }
      }
      // 历史活动内容
      .activities_history_content {
        height: 5.18rem;
        background-color: #ffffff;
        border-radius: 0.1rem;
        padding: 0 0.38rem;
        margin-top: 0.2rem;
        &:nth-child(2) {
          // margin-top: 0;
        }
        .activities_history_content_header {
          height: 1.1rem;
          line-height: 1.1rem;
          border-bottom: 0.01rem solid #ccc;
          font-size: 0.32rem;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: bold;
          color: #333333;
          margin-bottom: 0.24rem;
        }
        .activities_history_content_bottom {
          .activities_history_content_bottom_content {
            display: flex;
            justify-content: flex-start;
            height: 0.6rem;
            line-height: 0.6rem;
            font-size: 0.29rem;
            font-family: PingFangSC-Regular, PingFang SC;
            .activities_history_content_bottom_content_left {
              color: #999999;
            }
            .activities_history_content_bottom_content_right {
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
      // &:nth-last-child(1) {
      //   margin-bottom: 2.2rem;
      // }
    }
  }
</style>