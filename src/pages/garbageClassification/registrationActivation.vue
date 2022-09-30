<!--
 * @Author: liukanglin
 * @Date: 2020-09-25 14:26:47
 * @LastEditors: liukanglin
 * @LastEditTime: 2020-11-17 10:59:40
 * @Desc: 垃圾分类注册激活页面
 * @FilePath: \vue-cli-multiPage-master\src\pages\garbageClassification\registrationActivation.vue
-->
<template>
  <div class="registration_activation">
    <div class="registration_activation_img">
      <img src="@/assets/img/banner2.png" alt="" />
      <div class="registration_activation_img_title">{{ title }}</div>
    </div>
    <div class="registration_activation_content">
      <div>
        <van-field
          size="large"
          label="手机号"
          v-model="tel"
          type="tel"
          placeholder="请输入手机号"
          @input="verificationTel"
        />
        <div
          ref="code"
          class="registration_activation_content_getcode"
          v-if="getCodeFlag"
          @click="getCode"
        >
          获取验证码
        </div>
        <div v-else class="registration_activation_content_getcode">
          {{ countDown }}秒后重新获取
        </div>
      </div>
      <div>
        <van-field
          size="large"
          label="验证码"
          v-model="code"
          type="number"
          placeholder="请输入短信验证码"
          @input="verificationNote"
        />
        <van-field v-show="false" />
      </div>
    </div>
    <div
      ref="immediatelyActive"
      class="registration_activation_active"
      @click="activePhone"
    >
      立即激活
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tel: "",
      code: "",
      countDown: 60, //倒计时秒数
      getCodeFlag: true, //获取验证码标志
      activeFlag: false, //是否可以激活标志
      openId: "",
      title: "", //标题
    };
  },
  methods: {
    /**
     * @description: 每次输入手机号时都会进行验证
     * @param {}
     * @return {}
     */
    verificationTel() {
      //验证手机号码格式
      if (!/^1[3456789]\d{9}$/.test(this.tel)) {
        //手机号验证不通过
        this.$refs.code.style.color = "#c8c9cc";
        this.$refs.immediatelyActive.style.backgroundImage = "";
        this.activeFlag = false;
        return false;
      } else if (/^1[3456789]\d{9}$/.test(this.tel) && this.code != "") {
        //手机号验证通过且验证码不为空
        this.$refs.code.style.color = "blue";
        this.$refs.immediatelyActive.style.backgroundImage =
          "linear-gradient(360deg, rgb(43, 128, 255) 0%, rgb(101, 188, 255) 100%)";
        this.activeFlag = true;
      } else {
        this.$refs.code.style.color = "blue";
        this.activeFlag = false;
      }
    },
    /**
     * @description: 每次输入短信验证码时都会进行验证
     * @param {}
     * @return {}
     */
    verificationNote() {
      if (this.code != "" && /^1[3456789]\d{9}$/.test(this.tel)) {
        //输入的验证码不为空且手机号码通过验证
        this.$refs.immediatelyActive.style.backgroundImage =
          "linear-gradient(360deg, rgb(43, 128, 255) 0%, rgb(101, 188, 255) 100%)";
        this.activeFlag = true;
      } else {
        this.$refs.immediatelyActive.style.backgroundImage = "";
        this.activeFlag = false;
      }
    },
    /**
     * @description: 点击获取验证码
     * @param {}
     * @return {}
     */
    getCode() {
      //验证手机号码格式
      if (!/^1[3456789]\d{9}$/.test(this.tel)) {
        this.$toast("手机号码格式错误");
        return false;
      } else {
        this.$http({
          url: this.$http.adornUrl(
            `/garbage/garbageMember/getPhoneCode?phone=${this.tel}`
          ),
          method: "get",
          params: this.$http.adornParams({}),
        }).then((data) => {
          //console.log(data);
          this.$toast("验证码发送成功");
          this.getCodeFlag = false;
          var timer = setInterval(() => {
            //验证码发送成功后开始倒计时
            if (this.countDown > 0) {
              this.countDown--;
            } else {
              this.getCodeFlag = true;
              //倒计时结束后重置为60
              this.countDown = 60;
              clearInterval(timer);
            }
          }, 1000);
        });
      }
    },
    /**
     * @description: 点击立即激活
     * @param {}
     * @return {}
     */
    activePhone() {
      if (this.activeFlag) {
        this.$http({
          url: this.$http.adornUrl(`/garbage/garbageMember/wxAuth`),
          method: "post",
          data: this.$http.adornData({
            // openId: "oMHlns9GVz2HOkNw5ubfasT_GHv0",
            openId: this.openId,
            phone: this.tel,
            code: this.code,
          }),
        }).then((data) => {
          //console.log(data);
          switch (data.data.resultMsg) {
            case "-4":
              // -4代表提醒用户用微信扫码
              this.$toast("请使用微信进行扫码");
              break;
            case "1":
              // 1代表直接重新扫码查看详情
              this.$router.push({
                name: "registrationSuccess",
              });
              // this.$toast("请直接重新扫码查看详情");
              break;
            case "-1":
              // -1代表跳转到注册页面
              this.$router.push({
                name: "garbageClassificationRegister",
              });
              break;
            case "-2":
              //-2代表验证码错误
              this.$toast("验证码错误");
              break;
          }
        });
      } else {
        this.$toast("激活失败");
      }
    },
    /**
     * @description: 获取标题
     * @param {*}
     * @return {*}
     */
    getTitle() {
      this.$http({
        url: this.$http.adornUrl(`/sys/config/infoByKey?key=WX_TOPNAME`),
        method: "get",
        params: this.$http.adornParams({}),
      }).then((data) => {
        //console.log("获取标题", data);
        this.title = data.data.config.paramValue;
      });
    },
  },
  created() {
    this.getTitle();
    // this.openId = JSON.parse(localStorage.getItem("openId"));
    this.openId = localStorage.getItem("openId")
    //console.log(this.openId);
  },
};
</script>

<style lang="less" scoped>
  .registration_activation {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ffffff;
    font-size: 0.28rem;
    //注册激活头部图片
    .registration_activation_img {
      position: relative;
      img {
        width: 100%;
      }
      //标题
      .registration_activation_img_title {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        font-size: 28px;
        font-weight: bold;
        color: rgba(255, 255, 255, 1);
        text-shadow: 0px 2px 4px rgba(0, 0, 0, 0.5);
        width: 82.27vw;
        text-align: center;
      }
    }
    //注册激活内容区域
    .registration_activation_content {
      font-size: 0.32rem;
      div {
        margin: 0 0.1rem;
        position: relative;
        //注册激活内容输入区域
        /deep/ .van-field__control {
          font-size: 0.32rem;
          margin-left: -0.3rem;
        }
        //注册激活内容底部边框
        /deep/ .van-cell::after {
          border-bottom: 0.04rem solid #dddddd;
        }
        //获取验证码
        .registration_activation_content_getcode {
          position: absolute;
          right: 0.14rem;
          top: 0.24rem;
          color: #c8c9cc;
          z-index: 1;
        }
      }
    }
    //立即激活按钮
    .registration_activation_active {
      width: 85%;
      height: 1rem;
      line-height: 1rem;
      text-align: center;
      border-radius: 0.75rem;
      background-color: rgba(0, 0, 0, 0.1);
      font-size: 0.36rem;
      margin: 0.5rem auto;
      color: #ffffff;
    }
  }
</style>