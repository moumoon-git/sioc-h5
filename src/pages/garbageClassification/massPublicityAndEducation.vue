<!--
 * @Author: liukanglin
 * @Date: 2020-09-22 14:38:16
 * @LastEditors: liukanglin
 * @LastEditTime: 2020-12-17 18:05:16
 * @Desc: 垃圾分类群众宣传教育首页
 * @FilePath: \vue-cli-multiPage-master\src\pages\garbageClassification\massPublicityAndEducation.vue
-->
<template>
  <div class="mass_publicity">
    <div v-if="!overdue">
    <div class="mass_publicity_header">
      <img
        class="mass_publicity_header_position"
        src="@/assets/img/location.png"
        alt
      /><span :class="place ? '' : 'mass_publicity_header_span'">{{
        place ? place : "小区定位中..."
      }}</span>
      <img
        v-if="place"
        @click="getLocation"
        class="mass_publicity_header_reload"
        src="@/assets/img/refresh.png"
        alt
      />
      <div class="mass_publicity_header_right">
        <!-- <50m -->
        <img
          class="mass_publicity_header_right_arrow"
          @click="getNearActivities"
          src="@/assets/img/right_arrow.png"
          alt
        />
        <!-- <img class="mass_publicity_header_right_arrow" scr="../../assets/img/right_arrow.png" alt /> -->
        <!-- <van-action-sheet v-model="show" :actions="actions" @select="onSelect" title="请选择活动位置"/> -->
        <van-action-sheet v-model="show" @select="onSelect">
          <div
            @click="goActivityDetail(item.id)"
            class="mass_publicity_header_right_action"
            v-for="(item, index) in nearActivities"
            :key="index"
          >
            <img src="@/assets/img/location.png" alt />{{ item.name }}
            <div
              v-if="index != nearActivities.length - 1"
              class="mass_publicity_header_right_action_line"
            ></div>
            <div class="mass_publicity_header_right_action_right">
              50m
              <img
                class="mass_publicity_header_right_action_right_arrow"
                src="@/assets/img/right_arrow.png"
                alt
              />
            </div>
          </div>
        </van-action-sheet>
      </div>
    </div>
    <div v-if="!sortAnswer" class="mass_publicity_content">
      <img src="@/assets/img/garbage_classification1.jpg" alt />
      <img src="@/assets/img/garbage_classification2.jpg" alt />
      <img src="@/assets/img/garbage_classification3.jpg" alt />
      <img src="@/assets/img/garbage_classification4.jpg" alt />
    </div>
    <div class="mass_publicity_question" v-else>
      <div class="mass_publicity_question_head">广州垃圾分类达人知识问答</div>
      <div
        class="mass_publicity_question_content"
        v-for="(item, index) in questionEntityList"
        :key="index"
        v-show="index == currentIndex"
      >
        <div class="mass_publicity_question_content_title">
          {{ item.title }}
        </div>
        <van-radio-group v-model="radio" direction="horizontal">
          <van-radio
            @click="selectEntityList(index, i)"
            v-for="(val, i) in item.epiSelectEntityList"
            :key="i"
            :name="i+1"
            >{{ val.content.split(".")[1] }}</van-radio
          >
        </van-radio-group>
        <div class="mass_publicity_question_content_switch">
          <div @click="lastQuestion(index)">
            <img src="@/assets/img/right_arrow.png" alt="" />上一题
          </div>
          <div
            v-if="sortAnswer & (currentIndex != questionEntityList.length - 1)"
            @click="nextQuestion"
          >
            下一题<img src="@/assets/img/right_arrow.png" alt="" />
          </div>
          <div
            v-if="currentIndex == questionEntityList.length - 1"
            @click="submitAnswer"
          >
            提交答题
          </div>
        </div>
      </div>
    </div>
    <div
      v-if="!sortAnswer"
      class="mass_publicity_answer"
      @click="changeToAnswer"
    >
    <!-- <div
      v-if="!sortAnswer"
      class="mass_publicity_answer"
      @click="sortAnswer = true"
    > -->
      分类问答
    </div>
    <div class="mass_publicity_margin"></div>
    <div v-if="sortAnswer" class="mass_publicity_fixed">
      <!-- <div
      v-if="sortAnswer & (currentIndex != this.questionEntityList.length - 1)"
      class="mass_publicity_next_question"
      @click="nextQuestion"
    >
      下一题
    </div>
    <div
      @click="submitAnswer"
      class="mass_publicity_next_question"
      v-if="currentIndex == this.questionEntityList.length - 1"
    >
      提交答题
    </div> -->
      <div v-if="sortAnswer" class="mass_publicity_back" @click="backToGuide">
        返回
      </div>
    </div>
    </div>
    <div class="mass_publicity_overdue" v-else>
      <div>
      抱歉，该活动已经过期！
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: false, //是否展示选项面板
      sortAnswer: false, //是否转换到问答
      // actions: [{ name: "选项一" }, { name: "选项二" }, { name: "选项三" }],
      questionEntityList: [],
      currentIndex: 0,
      openId: "",
      answerList: [], //接收答题的数据
      questionCurrentIndex: "", //当前选项的索引值
      activityId: "", //活动Id
      place: "", //活动地点
      longitude: "", //经度
      latitude: "", //纬度
      nearActivities: [], //附近活动
      radio: "", //单选框绑定的值
      radioArr:[], //单选框选中的题目顺序
      overdue: false, //活动是否过期
    };
  },
  methods: {
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
     * @description: 根据经纬度获取附近活动
     * @param {}
     * @return {}
     */
    getNearActivities() {
      this.$http({
        url: this.$http.adornUrl(`/garbage/garbageActivity/listNearbyActivity`),
        method: "post",
        data: this.$http.adornData({
          longitude: this.longitude,
          latitude: this.latitude,
        }),
      }).then((data) => {
        //console.log(data);
        if(data && data.data.code === 0){
          this.nearActivities = data.data.data;
          this.show = true;
        }else{
          this.$dialog.alert({
            message: "服务器异常",
          });
        }
      });
    },
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
          that.longitude = data.position.lng;
          that.latitude = data.position.lat;
          let lng = data.position.lng;
          let lat = data.position.lat;
          that
            .$http({
              url: that.$http.adornUrl(
                `/investigation/instanceInfor/getAdressFromTencent?lng=${lng}&lat=${lat}`
              ),
              method: "get",
              params: that.$http.adornParams({}),
            })
            .then(({ data }) => {
              //console.log("活动地址", data);
              if(data && data.code === 0){
                that.place = data.address;
              }else{
                this.$dialog.alert({
                  message: "服务器异常",
                });
              }
            });
        }

        function onError() {
          // 定位出错
          that.$toast.fail("定位失败");
        }
      });
    },
    /**
     * @description: 答题时进行答案选择
     * @param {number} index 题数
     * @param {number} i 具体某一道题的选项的索引值
     * @return {}
     */
    selectEntityList(index, i) {
      this.questionCurrentIndex = i; //获取当前题目选项的索引值
      this.radioArr.splice(index,1,i+1); //获取被选中题目的选项顺序
      //console.log('当前题目选项的索引值',this.questionCurrentIndex,'被选中题目的选项顺序',this.radioArr);
      let questionId = this.questionEntityList[index].id;
      let answer = this.questionEntityList[index].epiSelectEntityList[i].id; //选项id
      this.answerList.splice(index, 1, {
        questionId,
        answer,
      });
      //console.log(this.answerList);
    },
    /**
     * @description: 初始化答题结构
     * @param {}
     * @return {}
     */
    initAnswerStructure() {
      this.questionEntityList.forEach((v) => {
      //通过题目长度设置接收答案的数组结构
        this.answerList.push({
          questionId: "",
          answer: "",
        });
      //通过题目长度设置接收选项顺序的数组结构
        this.radioArr.push("");
      });

      //console.log(this.answerList);
    },
    onSelect(item) {
      //console.log(item.name);
      // 默认情况下点击选项时不会自动收起
      // 可以通过 close-on-click-action 属性开启自动收起
      this.show = false;
    },
    /**
     * @description: 获取题库信息
     * @param {}
     * @return {}
     */
    getQuestion() {
      let codeNum = window.location.href.split("?")[1].split("&")[2].split("=")[1];
      // let codeNum = 1;
      return this.$http({
        url: this.$http.adornUrl(
          `/garbage/garbageActivity//infoByCodeNum?codeNum=${codeNum}`
        ),
        method: "get",
        params: this.$http.adornParams({}),
      }).then((data) => {
        //console.log(data);
        if(data && data.data.code === 0){
          this.questionEntityList =
            data.data.data.epiRegisterTikuEntity.epiQuestionEntityList;
          // this.initAnswerStructure();
          this.activityId = data.data.data.id;
        }
        else if(data && data.data.code === -1){
          this.overdue = true;
        }else{
        this.$dialog.alert({
          message: "服务器异常",
        });
        }
      });
    },
    /**
     * @description: 点击上一题按钮
     * @param {number} index 当前题目的索引值
     * @return {}
     */
    lastQuestion(index) {
      if (this.currentIndex == 0) {
        // 当前为第一题
        this.$dialog.alert({
          message: `当前已经是第一题了`,
        });
        return;
      }
      this.radio = this.radioArr[index-1]; //清空单选框中接收的值
      //console.log('radio绑定的值',this.radio,typeof(this.radio));
      this.currentIndex--;
      this.questionCurrentIndex = ""; //将当前选中索引值清空
    },
    /**
     * @description: 点击下一题按钮
     * @param {}
     * @return {}
     */
    nextQuestion() {
      if (this.answerList[this.currentIndex].answer == "") {
        //当前题目没有进行作答,则不允许进入下一题
        this.$dialog.alert({
          message: `当前题目未作答`,
        });
        return;
      }
      // 当前索引值等于题目长度，说明已经是最后一题
      if (this.currentIndex >= this.questionEntityList.length - 1) {
        return;
      }
      // 下一题之前已经被选中过
      if(this.radioArr[this.currentIndex + 1]){
        this.radio = this.radioArr[this.currentIndex + 1] ;
        this.currentIndex++; //进入下一题
        this.questionCurrentIndex = ""; //将当前选中索引值清空
        return;
      }
      this.radio = ""; //清空单选框中接收的值
      this.currentIndex++; //进入下一题
      this.questionCurrentIndex = ""; //将当前选中索引值清空
      //console.log(this.currentIndex);
    },
    /**
     * @description: 返回指南
     * @param {}
     * @return {}
     */
    backToGuide() {
      this.radio = ""; //清空单选框中接收的值
      this.sortAnswer = false;
      this.currentIndex = 0;
      this.answerList = []; //清空题目数组
      this.radioArr = []; //清空单选框选中题目顺序数组
      this.initAnswerStructure(); //初始化答题结构
    },
    /**
     * @description: 提交答题
     * @param {}
     * @return {}
     */
    submitAnswer() {
      if (this.answerList[this.currentIndex].answer == "") {
        //当前题目没有进行作答,则不允许进入下一题
        this.$dialog.alert({
          message: `当前题目未作答`,
        });
        return;
      }
      this.$dialog
        .confirm({
          title: "是否确认提交答题？",
        })
        .then(() => {
          this.$http({
            url: this.$http.adornUrl(`/garbage/garbageRegister/save`),
            method: "post",
            data: this.$http.adornData({
              openId: this.openId,
              activityId: this.activityId,
              answerList: this.answerList,
            }),
          }).then((data) => {
            //console.log(data);
            if (data.data.msg == "success") {
              //完成答题
              this.$dialog
                .alert({
                  message: `答题成功，你的正确率为${data.data.data.accuracy}%`,
                })
                .then(() => {
                  this.backToGuide();
                });
            }
            else if (data.data.msg == "你已经作答过了") {
              //完成答题
              this.$dialog
                .alert({
                  message: `你已经作答过了`,
                })
                .then(() => {
                  this.backToGuide();
                });
            }
            else{
              this.$dialog.alert({
                message: "服务器异常",
              });
            }
          });
        });
    },
    /**
     * @description: 获取openID
     * @param {}
     * @return {}
     */
    getOpenId() {
      // let urlString =
        // "https://scg.chinaemt.com/rpt/garbageClassification.html#/massPublicityAndEducation?openId=oMHlns9GVz2HOkNw5ubfasT_GHv0&clientFlag=wechat&codeNum=1079c48883894a08b2936235afe3be56-1601369694940";
      let urlString = window.location.href;
      this.openId = urlString.split("?")[1].split("=")[1].split("&")[0];
      //console.log(this.openId);
    },
    /**
     * @description: 跳转到答题页面
     * @param {}
     * @return {}
     */
    changeToAnswer() {
      // 先测试是否之前在统一活动中作答了 status(1:未作答,0:已经作答)
      this.$http({
        url: this.$http.adornUrl(`/garbage/garbageRegister/testRepeatResponse`),
        method: "post",
        data: this.$http.adornData({
          openId: this.openId,
          activityId: this.activityId,
        }),
      }).then((data) => {
        //console.log(data);
        if (data.data.status == 0) {
          // 已作答
          this.$dialog.alert({
            message: `你已经作答过了`,
          });
          return;
        }
        else if (data.data.status == 1) {
          // 未作答
          this.sortAnswer = true;
        }
        else{
          this.$dialog.alert({
            message: "服务器异常",
          });
        }
      });
    },
  },
  created() {
    var that = this;
    this.getLocation();
    async function asyncFunction() {
      await that.getQuestion();
      await that.initAnswerStructure();
    }
    asyncFunction();
    // this.getQuestion();
    // this.initAnswerStructure();
    this.getOpenId();
  },
};
</script>

<style lang="less" scoped>
  .mass_publicity {
    // padding: 0.2rem;
    margin-top: 0.2rem;
    font-size: 0.28rem;
    .mass_publicity_overdue{
        font-size: 0.42rem;
        height: 30vh;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    // 群众宣传教育头部
    .mass_publicity_header {
      height: 1.1rem;
      line-height: 1.1rem;
      background-color: #ffffff;
      border-radius: 0.1rem;
      position: relative;
      font-size: 0.32rem;
      font-family: PingFangSC-Regular, PingFang SC;
      color: #333333;
      display: flex;
      align-items: center;
      > span {
        // height: 0.55rem;
        // line-height: 0.55rem;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        max-width: 5.6rem;
        display: inline-block;
        margin-left: 0.2rem;
      }
      //span定位中
      .mass_publicity_header_span {
        font-family: PingFangSC-Regular, PingFang SC;
        color: #31ce86;
      }
      // 定位图标
      .mass_publicity_header_position {
        width: 0.4rem;
        margin-left: 0.4rem;
      }
      // 重新加载图标
      .mass_publicity_header_reload {
        width: 0.24rem;
        vertical-align: middle;
        margin-left: 0.06rem;
      }
      .mass_publicity_header_right {
        position: absolute;
        right: 0;
        top: 0;
        // 右箭头图标
        .mass_publicity_header_right_arrow {
          width: 0.4rem;
          vertical-align: middle;
          margin-right: 0.2rem;
          margin-top: -0.06rem;
          // transform: rotate(180deg);
        }
        // 头部右侧弹出选项框
        .van-action-sheet {
          img {
            width: 0.4rem;
            vertical-align: middle;
            margin-left: 0.4rem;
          }
          // 弹出选项内容
          .mass_publicity_header_right_action {
            position: relative;
            font-size: 0.32rem;
            font-family: PingFangSC-Regular, PingFang SC;
            color: #333333;
            .mass_publicity_header_right_action_line {
              // border-bottom: 0.01rem solid #dddddd;
              height: 0.01rem;
              background-color: #dddddd;
              margin: 0 auto;
              width: 90%;
            }
            img {
              width: 0.3rem;
              margin-right: 0.25rem;
            }
            .mass_publicity_header_right_action_right {
              position: absolute;
              right: 0;
              top: 0;
              .mass_publicity_header_right_action_right_arrow {
                width: 0.4rem;
                vertical-align: middle;
                // transform: rotate(180deg);
              }
            }
          }
        }
      }
    }
    // 群众宣传教育内容区
    .mass_publicity_content {
      height: calc(100vh - 1.4rem);
      // margin-top: 0.2rem;
      margin: 0.2rem;
      background-color: #ffffff;
      overflow: scroll;
      .mass_publicity_content_text {
        text-align: center;
        b {
          display: block;
          margin: 0.2rem 0;
        }
      }
      img {
        display: block;
        width: 7rem;
        margin: 0 auto;
      }
    }
    // 群众宣传教育知识问答
    .mass_publicity_question {
      // height: calc(100vh - 3.7rem);
      height: calc(100vh - 3.2rem);
      background-color: #ffffff;
      position: relative;
      // text-align: center;
      //主标题
      .mass_publicity_question_head {
        height: 1rem;
        line-height: 1rem;
        border-bottom: 0.01rem solid #dddddd;
        box-sizing: border-box;
        font-size: 0.32rem;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: bold;
        color: #333333;
        padding-left: 0.4rem;
        background-color: #ffffff;
        margin-top: 0.2rem;
      }
      .mass_publicity_question_content {
        height: 2rem;
        border-radius: 0.1rem;
        background-color: #ffffff;
        padding: 0.32rem 0.4rem;
        // 切换题目
        .mass_publicity_question_content_switch {
          height: 0.8rem;
          line-height: 0.8rem;
          position: absolute;
          bottom: 0.2rem;
          font-size: 0.28rem;
          font-family: PingFangSC-Regular, PingFang SC;
          color: #333333;
          display: flex;
          left: 50%;
          margin-left: -1.44rem;
          div {
            img {
              width: 0.4rem;
              vertical-align: middle;
              margin-top: -0.04rem;
            }
            &:nth-child(1) {
              margin-right: 0.4rem;
              img {
                transform: rotate(180deg);
              }
            }
          }
        }
        // 题目标题
        .mass_publicity_question_content_title {
          font-size: 0.28rem;
          font-family: PingFangSC-Regular, PingFang SC;
          color: #333333;
          margin-bottom: 0.32rem;
        }
        //单选按钮
        /deep/ .van-radio-group--horizontal {
          justify-content: center;
          .van-radio--horizontal {
            margin-bottom: 0.2rem;
          }
        }
        .mass_publicity_question_content_color {
          background-color: #cccccc;
        }
      }
    }
    // 群众宣传教育分类问答按钮
    .mass_publicity_answer {
      position: fixed;
      bottom: 0.5rem;
      right: 0.3rem;
      width: 1.1rem;
      height: 1.1rem;
      border-radius: 50%;
      background-image: linear-gradient(#c5f67c, #76ba0b);
      color: #ffffff;
      padding: 0.16rem 0.2rem 0.2rem 0.25rem;
      box-sizing: border-box;
    }

    .mass_publicity_margin {
      margin-bottom: 1.7rem;
    }
    //底部
    .mass_publicity_fixed {
      width: 100%;
      // height: 2.36rem;
      height: 1.5rem;
      background-color: #ffffff;
      //   margin-top: 0.26rem;
      overflow: hidden;
      position: fixed;
      z-index: 1000;
      bottom: 0;
    }
    // 群众宣传教育下一题按钮
    .mass_publicity_next_question {
      width: 2.2rem;
      height: 0.8rem;
      line-height: 0.8rem;
      border-radius: 0.1rem;
      background-color: rgba(234, 98, 110, 1);
      color: #ffffff;
      text-align: center;
      margin: 0.2rem auto;
    }
    // 群众宣传教育返回按钮
    .mass_publicity_back {
      // width: 1.5rem;
      // height: 0.8rem;
      // line-height: 0.8rem;
      // line-height: 0.8rem;
      // border-radius: 0.1rem;
      // background-color: rgba(85, 85, 85, 0.780392156862745);
      // color: #ffffff;
      // text-align: center;
      // margin: 0 auto;
      width: 6.4rem;
      height: 0.9rem;
      line-height: 0.9rem;
      text-align: center;
      font-size: 0.36rem;
      background: linear-gradient(360deg, #2b80ff 0%, #65bcff 100%);
      box-shadow: 0 0.06rem 0.12rem 0 rgba(12, 126, 161, 0.35);
      border-radius: 0.75rem;
      margin: 0.3rem auto 0 auto;
      color: #ffffff;
    }
  }
</style>