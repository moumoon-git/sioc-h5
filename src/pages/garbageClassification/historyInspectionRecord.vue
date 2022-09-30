<!--
 * @Author: liukanglin
 * @Date: 2020-10-10 13:54:22
 * @LastEditors: yaoweixin
 * @LastEditTime: 2020-12-22 11:53:54
 * @Desc: 垃圾分类巡查巡检历史巡查记录页
 * @FilePath: \vue-cli-multiPage-master\src\pages\garbageClassification\historyInspectionRecord.vue
-->
<template>
  <div class="historyInspectionRecord">
    <!-- 历史巡查记录头部 -->
    <div class="record_head">
      <img
        class="record_head_img_left"
        src="@/assets/img/historyLeft.png"
        alt=""
      />
      <img
        class="record_head_img_right"
        src="@/assets/img/historyRight.png"
        alt=""
      />
      <!-- 头部筛选区域 -->
      <div class="record_head_screen">
        <div class="record_head_screen_time" @click="showChooseDate = true">
          {{ dateContent }}<img src="@/assets/img/topExpand.png" alt="" />
        </div>
        <div
          class="record_head_screen_search"
          @click="queryInspectionHistoryByTime"
        >
          筛选
        </div>
      </div>
      <!-- 头部内容区域 -->
      <div
        class="record_head_content"
        @scroll.self="scrollmy"
        ref="scrollContainer"
      >
        <div class="record_head_content_box">
          <div class="record_head_content_box_num">
            {{ inspection.investigationAll }}
          </div>
          <div class="record_head_content_box_text">巡查次数</div>
          <div class="record_head_content_box_text">(次)</div>
        </div>
        <div class="record_head_content_line"></div>
        <div class="record_head_content_box">
          <div class="record_head_content_box_num">
            {{ inspection.investigationUnusual }}
          </div>
          <div class="record_head_content_box_text">异常数</div>
          <div class="record_head_content_box_text">(次)</div>
        </div>
        <div class="record_head_content_line"></div>
        <div class="record_head_content_box">
          <div class="record_head_content_box_num">
            {{ inspection.yellow }}
          </div>
          <div class="record_head_content_box_text">黄牌次数</div>
          <div class="record_head_content_box_text">(次)</div>
        </div>
        <div class="record_head_content_line"></div>
        <div class="record_head_content_box">
          <div class="record_head_content_box_num">
            {{ inspection.red }}
          </div>
          <div class="record_head_content_box_text">红牌次数</div>
          <div class="record_head_content_box_text">(次)</div>
        </div>
        <div class="record_head_content_line"></div>
        <div class="record_head_content_box">
          <div class="record_head_content_box_num">
            {{ inspection.refuse }}
          </div>
          <div class="record_head_content_box_text">拒收拒运次数</div>
          <div class="record_head_content_box_text">(次)</div>
        </div>
        <div class="record_head_content_line"></div>
        <div class="record_head_content_box">
          <div class="record_head_content_box_num">
            {{ inspection.instruct }}
          </div>
          <div class="record_head_content_box_text">责令整改</div>
          <div class="record_head_content_box_text">(次)</div>
        </div>
        <div class="record_head_content_line"></div>
        <div class="record_head_content_box">
          <div class="record_head_content_box_num">
            {{ inspection.administrative }}
          </div>
          <div class="record_head_content_box_text">行政处罚</div>
          <div class="record_head_content_box_text">(次)</div>
        </div>
      </div>
      <!-- 滚动滑块 -->
      <div class="slideContainer">
        <van-slider v-model="value" disabled />
      </div>
    </div>
    <!-- 历史巡查记录内容 -->
    <div class="record_content">
      <van-collapse v-model="activeNames">
        <van-collapse-item
          :name="index"
          v-for="(item, index) in inspectionHistory"
          :key="index"
        >
          <template #title>
            <div class="record_content_time">{{ item.investigationTime }}</div>
            <div class="record_content_text">
              <span class="record_content_text_people"
                >巡查人：{{ item.memberEntity?item.memberEntity.name:'' }} ({{
                  item.memberEntity?item.memberEntity.roleIdString:''
                }})<img src="@/assets/img/personPhone.png" alt=""
              /></span>
              <span class="record_content_text_status">
              <span class="record_content_text_usual"
                ><img src="@/assets/img/normalIcon.png" alt="" /> 正常：{{
                  item.usual
                }}</span
              ><span class="record_content_text_unusual"
                ><img src="@/assets/img/abnormalIcon.png" alt="" /> 异常：{{
                  item.unusual
                }}</span
              >
              </span>
            </div>
          </template>
          <div
            class="record_content_box"
            v-for="(v, i) in item.instanceInforList"
            :key="i"
          >
            <div class="box_title">{{ v.inforName }}</div>
            <div class="box_result">
              检查结果：<span
                :class="v.status == '1' ? 'normalStatus' : 'unnormalStatus'"
                >{{ v.status == "1" ? "正常" : "不正常" }}</span
              >
            </div>
            <div class="box_remark">
              情况说明：<span>{{ v.remark }}</span>
            </div>
            <div class="box_img">
              <img
                @click="showPreviewImage(val.allUrl)"
                v-for="(val, inx) in v.imgList"
                :key="inx"
                :src="val.allUrl"
                alt=""
              />
            </div>
            <div class="box_line"></div>
          </div>
        </van-collapse-item>
      </van-collapse>
    </div>
    <div class="chooseDateDialog">
      <van-popup v-model="showChooseDate" position="bottom">
        <div class="headerWrapper">
          <img
            src="@/assets/img/closeDialog.png"
            alt=""
            @click="showChooseDate = false"
          />
          <div class="titleText">选择时间</div>
          <div class="confirmButton" @click="confirmDate">确定</div>
        </div>
        <div class="chooseSlide">
          <div
            class="accordingMonth"
            @click="chooseAccurateDate('month')"
            :class="{ activeDate: dateMark == 'month' }"
          >
            按月
          </div>
          <div
            class="accordingYear"
            @click="chooseAccurateDate('year')"
            :class="{ activeDate: dateMark == 'year' }"
          >
            按年
          </div>
        </div>
        <div class="chooseYearMonth" v-if="dateMark == 'month'">
          <van-datetime-picker
            v-model="currentYearMonth"
            type="year-month"
            :min-date="minDate"
            :max-date="maxDate"
            :formatter="formatterYearMonth"
            :show-toolbar="false"
          />
        </div>
        <div class="chooseYear" v-if="dateMark == 'year'">
          <van-datetime-picker
            v-model="currentYear"
            type="date"
            :columns-order="['month', 'year', 'day']"
            :min-date="minYearDate"
            :max-date="maxYearDate"
            :formatter="formatterYear"
            :show-toolbar="false"
          />
        </div>
      </van-popup>
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
      //巡查巡检统计数据
      inspection: {
        investigationAll: "", //巡查次数
        investigationUnusual: "", //异常数
        yellow: "", //黄牌次数
        red: "", //红牌次数
        refuse: "", //拒收拒运次数
        instruct: "", //责令整改次数
        administrative: "", //行政处罚次数
      },
      inspectionHistory: [], //巡查历史数据
      enlargeImageUrl: [], //接收到的放大图片的路径
      activeNames: [], //折叠面板接收的数据格式
      value: 0, //滑块滚动得初始值
      mark: "all", //标记当前选中得日期
      dateContent: "请选择时间", //展示的时间内容
      showChooseDate: false, //控制年份筛选弹框得展示
      minDate: new Date(2020, 0, 1), //按月筛选时候的最小日期
      maxDate: new Date(2025, 10, 1), //按月筛选时候的最大日期
      minYearDate: new Date(2020, 0, 1), //按年筛选时候的最小日期
      maxYearDate: new Date(2025, 10, 1), //按年筛选时候的最大日期
      dateMark: "month", //控制按年或者按月筛选日期
      currentYearMonth: new Date(), //year-month类型下的值
      currentYear: new Date(), //date类型下的值
      trueDate: new Date(), //点击筛选所控制得日期
    };
  },
  methods: {
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
     * @description: 滚动触发事件
     * @param {event} 事件
     * @return {type}
     */
    scrollmy(e) {
      // //console.log(e.srcElement.scrollWidth);
      // //console.log("滚动距离", e.srcElement.scrollLeft);
      // //console.log("元素宽度", e.srcElement.offsetWidth);
      var totalScroll = e.srcElement.scrollWidth - e.srcElement.offsetWidth;
      var step = totalScroll / 100;
      var stepNum = Math.floor(e.srcElement.scrollLeft / step);
      this.value = stepNum;
    },
    /**
     * @description: 巡查巡检统计
     * @param {}
     * @return {}
     */
    patrolStatistics() {
      this.$http({
        url: this.$http.adornUrl(
          `/garbage/garbageInvestigationInstance/historyCount`
        ),
        method: "post",
        data: this.$http.adornData({
          pointId: localStorage.getItem("classifyId"),
          resultStatus: "",
          startTime: "",
          endTime: "",
          handleMan: "",
        }),
      }).then((data) => {
        //console.log("巡查巡检统计", data);
        this.inspection = data.data.data;
      });
    },
    /**
     * @description: 巡查历史记录
     * @param {}
     * @return {}
     */
    patrolHistory() {
      this.$http({
        url: this.$http.adornUrl(
          `/garbage/garbageInvestigationInstance/history`
        ),
        method: "post",
        data: this.$http.adornData({
          pointId: localStorage.getItem("classifyId"),
          resultStatus: "",
          startTime: "",
          endTime: "",
        }),
      }).then((data) => {
        //console.log("巡查历史记录", data);
        this.inspectionHistory = data.data.page;
      });
    },
    /**
     * @description: 获取当前月份的第一天
     * @param {Obj} chooseDate 选中的时间
     * @return {}
     */
    getCurrentMonthFirst(chooseDate) {
      var date = chooseDate;
      date.setDate(1);
      var month = parseInt(date.getMonth() + 1);
      var day = date.getDate();
      if (month < 10) {
        month = "0" + month;
      }
      if (day < 10) {
        day = "0" + day;
      }
      return date.getFullYear() + "-" + month + "-" + day;
    },
    /**
     * @description: 获取当前月份的最后一天
     * @param {Obj} chooseDate 选中的时间
     * @return {}
     */
    getCurrentMonthLast(chooseDate) {
      var date = chooseDate;
      var currentMonth = date.getMonth();
      var nextMonth = ++currentMonth;
      var nextMonthFirstDay = new Date(date.getFullYear(), nextMonth, 1);
      var oneDay = 1000 * 60 * 60 * 24;
      var lastTime = new Date(nextMonthFirstDay - oneDay);
      var month = parseInt(lastTime.getMonth() + 1);
      var day = lastTime.getDate();
      if (month < 10) {
        month = "0" + month;
      }
      if (day < 10) {
        day = "0" + day;
      }
      return date.getFullYear() + "-" + month + "-" + day;
    },

    /**
     * @description: 获取当前年份的第一天
     * @param {Obj} chooseDate 选中的时间
     * @return {}
     */
    getYearFirst(chooseDate) {
      var nowDay = chooseDate;
      var nowYear = nowDay.getFullYear();
      return nowYear + "-01-01";
    },
    /**
     * @description: 获取当前年份的最后一天
     * @param {Obj} chooseDate 选中的时间
     * @return {}
     */
    getYearLast(chooseDate) {
      var nowDay = chooseDate;
      var nowYear = nowDay.getFullYear();
      return nowYear + "-12-31";
    },
    /**
     * @description: 确认选择时间
     * @param {}
     * @return {}
     */
    confirmDate() {
      if (this.dateMark == "month") {
        // 按月筛选日期的情况
        this.trueDate = this.currentYearMonth;
        var month = this.trueDate.getMonth() + 1;
        this.dateContent = this.trueDate.getFullYear() + "年" + month + "月";
      }
      if (this.dateMark == "year") {
        // 按年筛选日期的情况
        this.trueDate = this.currentYear;
        this.dateContent = this.trueDate.getFullYear() + "年";
      }
      this.showChooseDate = false;
    },
    /**
     * @description: 点击按年或者按月按钮
     * @param {String} mark 传入按年或者按月的标记
     * @return {type}
     */
    chooseAccurateDate(mark) {
      this.dateMark = mark;
    },
    /**
     * @description: 按月日期格式化函数
     * @param {String} type 类型
     * @param {String} val 值
     * @return {String} 返回按月格式化后的值
     */
    formatterYearMonth(type, val) {
      if (type === "year") {
        return `${val}年`;
      } else if (type === "month") {
        return `${val}月`;
      }
      return val;
    },
    /**
     * @description: 按年日期格式化函数
     * @param {String} type 类型
     * @param {String} val  值
     * @return {String} 返回按年格式化后的值
     */
    formatterYear(type, val) {
      if (type === "month") {
        return "";
      }
      if (type === "year") {
        return `${val}年`;
      }
      if (type === "day") {
        return "";
      }
      return val;
    },
    /**
     * @description: 根据时间查询巡查历史记录
     * @param {}
     * @return {}
     */
    queryInspectionHistoryByTime() {
      var startTime = ''
      var endTime = ''
      if (this.dateMark == "month") {
         startTime = this.getCurrentMonthFirst(this.trueDate);
         endTime = this.getCurrentMonthLast(this.trueDate);
      } else if (this.dateMark == "year") {
         startTime = this.getYearFirst(this.trueDate);
         endTime = this.getYearLast(this.trueDate);
      }
      this.$http({
        url: this.$http.adornUrl(
          `/garbage/garbageInvestigationInstance/history`
        ),
        method: "post",
        data: this.$http.adornData({
          pointId: localStorage.getItem("classifyId"),
          resultStatus: "",
          startTime,
          endTime,
        }),
      }).then(({ data }) => {
        //console.log("巡查历史记录", data);
        if (data && data.code === 0) {
          this.inspectionHistory = data.page;
        }
      });
      this.$http({
        url: this.$http.adornUrl(
          `/garbage/garbageInvestigationInstance/historyCount`
        ),
        method: "post",
        data: this.$http.adornData({
          pointId: localStorage.getItem("classifyId"),
          resultStatus: "",
          startTime,
          endTime,
          handleMan: "",
        }),
      }).then(({ data }) => {
        if (data && data.code === 0) {
          //console.log("巡查巡检统计", data);
          this.inspection = data.data;
        }
      });
    },
  },
  created() {
    this.patrolStatistics(); //巡查巡检统计
    this.patrolHistory(); //巡查历史记录
  },
};
</script>

<style lang="less" scoped>
  .historyInspectionRecord {
    margin: 0.2rem;
    // 记录头部
    .record_head {
      height: 2.87rem;
      margin-bottom: 0.2rem;
      background-image: linear-gradient(338deg, #65bcff 0%, #2b80ff 100%);
      box-shadow: 0 0.05rem 0.2rem 0 rgba(53, 53, 57, 0.08);
      border-radius: 0.08rem;
      color: #ffffff;
      position: relative;
      // 头部左上角图片
      .record_head_img_left {
        position: absolute;
        left: 0;
        top: 0;
        width: 1.4rem;
      }
      // 头部右上角图片
      .record_head_img_right {
        position: absolute;
        top: 0;
        right: 0;
        width: 2.56rem;
      }
      // 头部筛选区域
      .record_head_screen {
        height: 0.92rem;
        line-height: 0.92rem;
        border-bottom: 0.01rem solid rgba(255, 255, 255, 0.4);
        display: flex;
        justify-content: space-between;
        // 选择时间
        .record_head_screen_time {
          height: 0.92rem;
          line-height: 0.92rem;
          font-size: 0.32rem;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 500;
          color: #ffffff;
          text-shadow: 0 0.05rem 0.2rem rgba(53, 53, 57, 0.08);
          margin-left: 0.42rem;
          z-index: 1000;
          img {
            width: 0.38rem;
            vertical-align: middle;
          }
        }
        // 筛选按钮
        .record_head_screen_search {
          width: 0.88rem;
          height: 0.46rem;
          line-height: 0.46rem;
          border-radius: 0.23rem;
          border: 0.01rem solid #ffffff;
          font-size: 0.28rem;
          font-family: PingFangSC-Regular, PingFang SC;
          text-shadow: 0 0.05rem 0.2rem rgba(53, 53, 57, 0.08);
          text-align: center;
          margin: auto 0.4rem auto 0;
          z-index: 1000;
        }
      }
      // 头部内容
      .record_head_content {
        height: 1.94rem;
        display: flex;
        overflow-x: auto;
        // 内容盒子
        .record_head_content_box {
          flex: 0 0 1.77rem;
          text-align: center;
          // 内容盒子数字
          .record_head_content_box_num {
            height: 0.7rem;
            line-height: 0.7rem;
            font-size: 0.5rem;
            font-family: PingFangSC-Medium, PingFang SC;
            font-weight: bold;
            color: #ffffff;
            margin-top: 0.12rem;
          }
          // 内容盒子文字
          .record_head_content_box_text {
            height: 0.3rem;
            line-height: 0.3rem;
            font-size: 0.24rem;
            font-family: PingFangSC-Regular, PingFang SC;
            color: #ffffff;
            text-shadow: 0 0.05rem 0.2rem rgba(53, 53, 57, 0.08);
          }
        }
        // 内容盒子右边线
        .record_head_content_line {
          flex: 0 0 0.01rem;
          height: 0.75rem;
          background: #ffffff;
          box-shadow: 0 0.05rem 0.2rem 0 rgba(53, 53, 57, 0.08);
          border-radius: 0.02rem;
          opacity: 0.39;
          margin: auto 0;
        }
      }
      // 滑块内容
      .slideContainer {
        width: 0.3rem;
        height: 0.1rem;
        padding-left: 0.1rem;
        background: #cccccc;
        box-shadow: 0px 5px 20px 0px rgba(53, 53, 57, 0.08);
        border-radius: 5px;
        margin-top: -0.3rem;
        margin-left: 3.39rem;
        .van-slider {
          width: 0.23rem;
          height: 0.1rem;
          background-color: #ccc;
          /deep/ .van-slider__bar {
            background-color: #ccc !important;
          }
          // 滑块的小滚动条
          /deep/ .van-slider__button {
            width: 0.2rem;
            height: 0.1rem;
            background-color: #fff;
            border-radius: 5px;
            box-shadow: none;
          }
        }
      }
    }
    // 记录内容
    .record_content {
      // 折叠项目
      /deep/ .van-collapse-item {
        margin-bottom: 0.2rem;
        // 折叠线
        /deep/ .van-collapse-item__title--expanded::after {
          display: none;
        }
        /deep/ .van-collapse-item__content {
          padding-top: 0;
          padding: 0 0.2rem 0.24rem 0.2rem;
        }
        // 头部可点击区域（默认状态可视区域）
        /deep/ .van-cell--clickable {
          min-height: 1.82rem;
          border-radius: 0.08rem;
          padding-top: 0.28rem;
          // 默认内容巡查时间
          .record_content_time {
            font-size: 0.32rem;
            font-family: PingFangSC-Medium, PingFang SC;
            font-weight: bold;
            color: #333333;
            // margin-bottom: 0.3rem;
          }
          // 默认内容文字内容
          .record_content_text {
            min-height: 0.24rem;
            line-height: 0.24rem;
            // 巡查人
            .record_content_text_people {
              font-size: 0.24rem;
              font-family: PingFangSC-Regular, PingFang SC;
              color: #999999;
              // border-right: 0.01rem solid #cccccc;
              margin-right: 0.3rem;
              margin-top: 0.3rem;
              display: inline-block;
              //手机图标
              img {
                height: 0.34rem;
                vertical-align: middle;
                margin: 0 0.2rem 0 0.1rem;
              }
            }
            // 状态
            .record_content_text_status{
              display: inline-block;
              margin-top: 0.3rem;
              margin-bottom: 0.1rem;
            // 正常
            .record_content_text_usual {
              height: 0.38rem;
              line-height: 0.38rem;
              font-size: 0.29rem;
              font-family: PingFangSC-Regular, PingFang SC;
              color: #333333;
              img {
                width: 0.26rem;
                vertical-align: middle;
                // margin-left: 0.3rem;
              }
            }
            // 异常
            .record_content_text_unusual {
              height: 0.38rem;
              line-height: 0.38rem;
              font-size: 0.29rem;
              font-family: PingFangSC-Regular, PingFang SC;
              color: #333333;
              img {
                width: 0.26rem;
                vertical-align: middle;
                margin-left: 0.3rem;
              }
            }
          }
          }
          /deep/ .van-cell__right-icon {
            position: absolute;
            right: 0.3rem;
            top: 0.24rem;
          }
        }
        // 展开内容区域
        .record_content_box {
          background: #f7f7f7;
          // border-radius: 0.1rem;
          padding: 0.2rem;
          padding-bottom: 0;
          // 第一个内容区
          &:nth-child(1) {
            border-radius: 0.1rem 0.1rem 0 0;
          }
          // 最后一个内容区
          &:nth-last-child(1) {
            border-radius: 0 0 0.1rem 0.1rem;
          }
          // 标题
          .box_title {
            height: 0.29rem;
            line-height: 0.29rem;
            font-size: 0.29rem;
            font-family: PingFangSC-Medium, PingFang SC;
            font-weight: bold;
            color: #333333;
            border-left: 0.04rem solid #0091ff;
            padding-left: 0.1rem;
          }
          // 检查结果
          .box_result {
            font-size: 0.29rem;
            font-family: PingFangSC-Regular, PingFang SC;
            color: #333333;
            margin: 0.2rem 0 0.14rem 0;
            // 正常状态
            .normalStatus {
              color: #0bd295;
            }
            // 异常状态
            .unnormalStatus {
              color: #f66e6e;
            }
          }
          // 情况说明
          .box_remark {
            font-size: 0.29rem;
            font-family: PingFangSC-Regular, PingFang SC;
            color: #333333;
            margin-bottom: 0.24rem;
            span {
              color: #999999;
            }
          }
          // 图片
          .box_img {
            img {
              width: 2.92rem;
              height: 1.9rem;
              &:nth-child(1) {
                margin-right: 0.2rem;
              }
            }
          }
          // 下划线
          .box_line {
            height: 0.01rem;
            background-color: #dddddd;
            margin-top: 0.2rem;
          }
          // 消除最后一个盒子图片下的线条
          &:nth-last-child(1) {
            .box_line {
              visibility: hidden;
            }
          }
        }
      }
    }
    // 时间选择器
    .chooseDateDialog {
      .van-popup {
        height: 7.64rem;
        background: #ffffff;
        border-radius: 0.28rem 0.28rem 0rem 0rem;
        // 选择器头部
        .headerWrapper {
          display: flex;
          height: 0.94rem;
          box-sizing: border-box;
          padding-top: 0.4rem;
          padding-left: 0.4rem;
          margin-bottom: 0.3rem;
          // 左边叉叉图标
          img {
            width: 0.48rem;
            height: 0.48rem;
          }
          // 标题文字
          .titleText {
            font-size: 0.36rem;
            font-family: PingFangSC-Medium, PingFang SC;
            font-weight: 700;
            color: #333333;
            flex: 1;
            text-align: center;
          }
          // 确定按钮
          .confirmButton {
            font-size: 0.32rem;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #0091ff;
            margin-right: 0.4rem;
          }
        }
        // 按月或年切换时间类型
        .chooseSlide {
          display: flex;
          width: 3.29rem;
          height: 0.5rem;
          border-radius: 0.04rem;
          opacity: 0.79;
          border: 0.01rem solid #0091ff;
          margin: 0 auto;
          font-size: 0.24rem;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #0091ff;
          text-align: center;
          line-height: 0.5rem;
          .accordingMonth {
            flex: 1;
            border-right: 0.01rem solid #0091ff;
            &.activeDate {
              background: #0091ff;
              color: #fff;
            }
          }
          .accordingYear {
            flex: 1;
            &.activeDate {
              background: #0091ff;
              color: #fff;
            }
          }
        }
        // year-month类型的picker样式
        .chooseYearMonth {
          .van-datetime-picker {
          }
        }
        // date类型的picker样式
        .chooseYear {
          .van-datetime-picker {
            /deep/ .van-picker__columns {
              // /deep/ .van-picker-column:nth-child(2) {
              //   display: none;
              // }
              // /deep/ .van-picker-column:nth-child(3) {
              //   display: none;
              // }
            }
          }
        }
      }
    }
  }
</style>