<!--
 * @Author: liukanglin
 * @Date: 2020-09-16 09:55:56
 * @LastEditors: liukanglin
 * @LastEditTime: 2020-09-21 10:30:15
 * @Desc: 垃圾分类注册登录首页
 * @FilePath: \vue-cli-multiPage-master\src\pages\garbageClassification\garbageClassification.vue
-->
<template>
  <div class="garbage_classification">
    <div class="garbage_classification_title">垃圾分类管理人员登录</div>
    <div class="garbage_classification_img">
      <img src="@/assets/img/garbage.png" />
    </div>
    <!-- 登录页面 -->
    <div class="garbage_classification_content" v-show="pageStatus == 0">
      <van-cell-group>
        <!-- 输入手机号，调起手机号键盘 -->
        <van-field v-model="login.tel" type="tel" label="手机号码：" placeholder="请输入手机号码" />
        <!-- 输入密码 -->
        <van-field v-model="login.password" type="password" label="登录密码：" placeholder="请输入登录密码" />
      </van-cell-group>
      <div class="garbage_classification_content_tip">账号或密码错误请重新输入</div>
      <van-button color="linear-gradient(to bottom, #73ccf9, #0493ff)">登录</van-button>
      <div class="garbage_classification_content_bottom">
        <span
          class="garbage_classification_content_bottom_left"
          @click="verificationCodeLogin(1)"
        >验证码登录</span>
        <span
          class="garbage_classification_content_bottom_right"
          @click="verificationCodeLogin(2)"
        >注册账号</span>
      </div>
    </div>
    <!-- 获取验证码页面 -->
    <div class="garbage_classification_content" v-show="pageStatus == 1">
      <van-cell-group>
        <!-- 输入手机号，调起手机号键盘 -->
        <van-field v-model="login.tel" type="tel" label="手机号码：" placeholder="请输入手机号码" />
      </van-cell-group>
      <div class="garbage_classification_content_tip">该手机号码未注册请先注册</div>
      <van-button
        color="linear-gradient(to bottom, #73ccf9, #0493ff)"
        @click="verificationCodeLogin(3)"
      >获取短信验证码</van-button>
      <div class="garbage_classification_content_bottom">
        <span
          class="garbage_classification_content_bottom_left"
          @click="verificationCodeLogin(0)"
        >密码登录</span>
        <span
          class="garbage_classification_content_bottom_right"
          @click="verificationCodeLogin(2)"
        >注册账号</span>
      </div>
    </div>
    <!-- 注册账号页面 -->
    <div class="garbage_classification_content" v-show="pageStatus == 2">
      <van-cell-group>
        <van-field v-model="register.name" label="姓名：" placeholder="请输入姓名" />
        <van-field
          readonly
          clickable
          name="picker"
          :value="register.community"
          label="所属社区："
          placeholder="请选择所在社区"
          @click="register.communityShowPicker = true"
        />
        <van-popup v-model="register.communityShowPicker" position="bottom">
          <van-picker
            show-toolbar
            :columns="register.communityColumns"
            @confirm="communityOnConfirm"
            @cancel="register.communityShowPicker = false"
          />
        </van-popup>
        <van-field v-model="register.unit" label="单位：" placeholder="请输入单位名称" />
        <van-field v-model="register.post" label="职务：" placeholder="请输入职务名称" />
        <!-- 输入手机号，调起手机号键盘 -->
        <van-field v-model="register.tel" type="tel" label="手机号码：" placeholder="请输入手机号码" />
        <van-field name="switch" label="是否为党员">
          <template #input>
            <van-switch v-model="register.switchChecked" size="20" />
          </template>
        </van-field>
        <van-field
          readonly
          clickable
          name="picker"
          :value="register.workRole"
          label="工作角色："
          placeholder="请选择工作角色"
          @click="register.workRoleShowPicker = true"
        />
        <van-popup v-model="register.workRoleShowPicker" position="bottom">
          <van-picker
            show-toolbar
            :columns="register.workRoleColumns"
            @confirm="workRoleOnConfirm"
            @cancel="register.workRoleShowPicker = false"
          />
        </van-popup>
        <van-field v-model="register.validatePassword" label="效验口令：" placeholder="请输入校验口令" />
      </van-cell-group>
      <van-button color="linear-gradient(to bottom, #73ccf9, #0493ff)">注册</van-button>
      <div class="garbage_classification_back_login">
        <van-button @click="verificationCodeLogin(0)">返回登录</van-button>
      </div>
    </div>
    <!-- 输入验证码页面 -->
    <div class="garbage_classification_content" v-show="pageStatus == 3">
      <div class="garbage_classification_content_code">
        <div class="garbage_classification_content_code_title">输入验证码</div>
        <div class="garbage_classification_content_code_tip">短信验证码发送失败，请点击重新获取验证码</div>
        <!-- 验证码输入框 -->
        <van-password-input
          :value="value"
          :length="4"
          :gutter="15"
          :mask="false"
          :focused="showKeyboard"
          @focus="showKeyboard = true"
        />
        <!-- 数字键盘 -->
        <van-number-keyboard
          :show="showKeyboard"
          @input="onInput"
          @delete="onDelete"
          @blur="showKeyboard = false"
        />
        <div class="garbage_classification_content_code_bottom">
          <div class="garbage_classification_content_tip">验证码错误，请重新输入</div>
          <div
            v-if="getCodeFlag"
            class="garbage_classification_content_code_get"
            @click="afreshGetCode"
          >重新获取验证码</div>
          <div v-else class="garbage_classification_content_code_countdown">{{countDown}} 秒后重新获取验证码</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { CountDown } from "vant";

export default {
  data() {
    return {
      pageStatus: 0, //用于判断当前页面的显示状态：0：登录，1：获取验证码，2：注册账号,3：输入验证码
      // 登录页面的数据
      login: {
        tel: "",
        password: "",
      },
      // 注册页面的数据
      register: {
        name: "",
        community: "",
        communityColumns: ["社区1", "社区2", "社区3", "社区4"], //社区可选项
        communityShowPicker: false, //控制社区弹窗是否显示
        unit: "",
        post: "",
        tel: "",
        switchChecked: false,
        workRole: "",
        workRoleColumns: [
          "守桶人员",
          "保洁人员",
          "撤桶人员",
          "巡查人员",
          "收运点工作人员",
          "中转站工作人员",
        ],
        workRoleShowPicker: false,
        validatePassword: "",
      },
      showKeyboard: true,
      value: "",
      getCodeFlag: true, //获取验证码状态
      countDown: 60, //倒计时时间
    };
  },
  methods: {
    /**
     * @description: 点击验证码登录
     * @param {number} val 传入一个number值使页面切换成需要的显示状态
     * @return {}
     */
    verificationCodeLogin(val) {
      this.pageStatus = val;
    },
    /**
     * @description: 注册状态下所属社区选择
     * @param {string} value 选中社区的值
     * @return {}
     */
    communityOnConfirm(value) {
      this.register.community = value;
      this.register.communityShowPicker = false;
    },
    /**
     * @description: 注册状态下工作角色选择
     * @param {string} value 选中工作角色的值
     * @return {}
     */
    workRoleOnConfirm(value) {
      this.register.workRole = value;
      this.register.workRoleShowPicker = false;
    },
    onInput(key) {
      this.value = (this.value + key).slice(0, 6);
    },
    onDelete() {
      this.value = this.value.slice(0, this.value.length - 1);
    },
    /**
     * @description: 重新获取验证码
     * @param {}
     * @return {}
     */
    afreshGetCode() {
      this.getCodeFlag = !this.getCodeFlag;
    },
  },
  watch: {
    /**
     * @description: 监听获取验证码状态值
     * @param {string} newVal
     * @return {}
     */
    getCodeFlag(newVal) {
      //console.log(newVal);
      if (newVal == false) {
       var timer = setInterval(() => {
          if (this.countDown > 0) {
            this.countDown--;
          } else {
            this.getCodeFlag = true;
            this.countDown = 60;
            clearInterval(timer)
          }
        }, 1000);
      }
    },
  },
};
</script>

<style lang="less" scoped>
  .garbage_classification {
    text-align: center;
    // 垃圾分类标题
    .garbage_classification_title {
      font-size: 0.32rem;
      font-weight: bold;
      height: 2rem;
      line-height: 2rem;
      text-align: center;
    }
    // 垃圾分类图片
    .garbage_classification_img {
      text-align: center;
      img {
        width: 90%;
      }
    }
    // 内容区
    .garbage_classification_content {
      // 垃圾分类输入框
      /deep/ .van-cell-group {
        width: 90%;
        margin: 0 auto;
      }
      // 垃圾分类按钮
      /deep/ .van-button {
        width: 90%;
        margin: 0 auto;
        display: block;
      }
      // 输入验证码区域
      .garbage_classification_content_code {
        width: 90%;
        height: 3.48rem;
        margin: 0 auto;
        background-color: #ffffff;
        text-align: left;
        padding: 0.2rem 0.4rem;
        box-sizing: border-box;
        .garbage_classification_content_code_title {
          font-size: 0.4rem;
        }
        //
        // 验证码提示
        .garbage_classification_content_code_tip {
          font-size: 0.28rem;
        }
        // 验证码输入框
        /deep/ .van-password-input__security li {
          border-bottom: 1px solid #ccc;
        }
        .garbage_classification_content_code_bottom {
          display: flex;
          justify-content: flex-end;
          margin-top: 0.4rem;
          // 获取验证码
          .garbage_classification_content_code_get {
            font-size: 0.24rem;
            color: #02a7f0;
            margin-left: auto;
          }
          // 验证码倒计时
          .garbage_classification_content_code_countdown {
            font-size: 0.24rem;
            color: #7f7f7f;
            margin-left: auto;
          }
        }
      }
      // 红色错误提示
      .garbage_classification_content_tip {
        font-size: 0.24rem;
        color: red;
      }
      // 注册页面返回登录按钮
      .garbage_classification_back_login {
        /deep/ .van-button {
          display: block;
          margin: 0 auto;
          color: #000000;
          background-color: #f5f5f5;
          border: none;
        }
      }
      // 垃圾分类底部
      .garbage_classification_content_bottom {
        width: 90%;
        margin: 0 auto;
        font-size: 0.28rem;
        position: relative;
        .garbage_classification_content_bottom_left {
          position: absolute;
          left: 0;
        }
        .garbage_classification_content_bottom_right {
          position: absolute;
          right: 0;
        }
      }
    }
  }
</style>