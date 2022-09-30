<!--
 * @Author: liukanglin
 * @Date: 2020-09-22 17:53:04
 * @LastEditors: liukanglin
 * @LastEditTime: 2020-10-23 16:12:32
 * @Desc: 垃圾分类工作人员注册激活页面
 * @FilePath: \vue-cli-multiPage-master\src\pages\garbageClassification\staffRegistrationActivation.vue
-->
<template>
  <div class="register_activation">
    <div class="register_activation_content">
      <!-- <div class="register_activation_content_text">
        <div>
          <b>广州垃圾分类最新指南图</b>
        </div>
        <div>"能卖拿去卖、有害单独放、干湿要分开"</div>
      </div> -->
      <img src="@/assets/img/garbage_classification1.jpg" alt />
      <img src="@/assets/img/garbage_classification2.jpg" alt />
      <img src="@/assets/img/garbage_classification3.jpg" alt />
      <img src="@/assets/img/garbage_classification4.jpg" alt />
    <div class="register_activation_bottom" @click="goRegistrationActivation">
      工作人员注册激活<img src="@/assets/img/enterRemoveBarrelHistory.png" alt="">
    </div>
    </div>
    <!-- <div class="register_activation_bottom" @click="goRegistrationActivation">
      工作人员注册激活<img src="@/assets/img/enterRemoveBarrelHistory.png" alt="">
    </div> -->
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    /**
     * @description: 跳转到注册激活
     * @param {type} param
     * @return {type} return
     */
    goRegistrationActivation() {
      this.$router.push({
        name: "registrationActivation",
      });
    },
    /**
     * @description: 获取openID
     * @param {}
     * @return {}
     */
    getOpenId() {
      // let urlString =
      //   "https://scg.chinaemt.com/rpt/garbageClassification.html#/staffRegistrationActivation?openId=oMHlns9GVz2HOkNw5ubfasT_GHv0&clientFlag=wechat&codeNum=1079c48883894a08b2936235afe3be56-1601369694940";
      let urlString = window.location.href;
      let openId = urlString.split("?")[1].split("=")[1].split("&")[0];
      //console.log(openId);
      localStorage.setItem("openId", openId);
    },
  },
  created() {
    this.getOpenId();
  },
};
</script>

<style lang="less" scoped>
  .register_activation {
    padding: 0.26rem 0.2rem 0.2rem 0.26rem;
    font-size: 0.28rem;
    // 注册激活内容区
    .register_activation_content {
      height: calc(100vh - 0.52rem);
      //   margin-top: 0.2rem;
      overflow: scroll;
      .register_activation_content_text {
        text-align: center;
        b {
          display: block;
          margin: 0 0 0.2rem 0;
        }
      }
      >img {
        display: block;
        width: 7rem;
        margin: 0 auto;
        border-radius: 0 0 0.1rem 0.1rem;
      }
    //注册激活底部
    .register_activation_bottom {
      font-size: 0.28rem;
      font-family: PingFangSC-Regular, PingFang SC;
      color: #0091ff;
      text-align: center;
      margin-top: 0.76rem;
      margin-bottom: 0.18rem;
      img{
        width: 0.34rem;
        vertical-align: middle;
        margin-top: -0.04rem;
      }
    }
    }
  }
</style>