<!--
 * @Author: liukanglin
 * @Date: 2020-09-27 11:46:25
 * @LastEditors: liukanglin
 * @LastEditTime: 2020-12-18 09:25:23
 * @Desc: 垃圾分类注册页
 * @FilePath: \vue-cli-multiPage-master\src\pages\garbageClassification\garbageClassificationRegister.vue
-->
<template>
  <div class="registration">
    <div class="registration_information">
      <div class="registration_information_header">基本信息</div>
      <div class="registration_information_content">
        <div class="registration_information_content_list">
          <span><b>* </b>姓名</span>
          <input
            v-model="register.name"
            type="text"
            placeholder="请输入姓名（必填）"
            @input="verificationRequired"
          />
          <div class="content_list_image">
            <img
              ref="sexMan"
              src="@/assets/img/manUnchecked.png"
              @click="sexCheck(1)"
              alt=""
            />
            <img
              ref="sexWoman"
              src="@/assets/img/womanUnchecked.png"
              @click="sexCheck(2)"
              alt=""
            />
          </div>
        </div>
        <div
          class="registration_information_content_list"
          @click="communityShow = true"
        >
          <span><b>* </b>所属社区</span>
          <div
            class="registration_information_content_list_select"
            :class="
              register.townIdString == ''
                ? ''
                : 'registration_information_content_list_color'
            "
          >
            {{
              register.townIdString == ""
                ? "请选择所在社区"
                : register.townIdString
            }}
          </div>
          <i></i>
        </div>
        <van-popup v-model="communityShow" round position="bottom">
          <van-picker
            title="请选择所在社区"
            show-toolbar
            cancel-button-text="✕"
            confirm-button-text="确定"
            :columns="communityActions"
            @cancel="communityShow = false"
            @confirm="communitySelect"
          />
        </van-popup>
        <div class="registration_information_content_list">
          <span>单位</span>
          <input
            v-model="register.unit"
            type="text"
            placeholder="请输入单位名称"
          />
        </div>
        <div class="registration_information_content_list">
          <span>职务</span>
          <input
            v-model="register.position"
            type="text"
            placeholder="请输入职务名称"
          />
        </div>
        <div class="registration_information_content_list">
          <span><b>* </b>是否党员</span>
          <van-radio-group
            @change="verificationRequired"
            v-model="register.isParty"
            direction="horizontal"
          >
            <van-radio name="1">是</van-radio>
            <van-radio name="2">否</van-radio>
          </van-radio-group>
        </div>
        <div
          class="registration_information_content_list"
          @click="workRoleShow = true"
        >
          <span><b>* </b>工作角色</span>
          <div
            class="registration_information_content_list_select"
            :class="
              register.roleIdString == ''
                ? ''
                : 'registration_information_content_list_color'
            "
          >
            {{
              register.roleIdString == ""
                ? "请选择工作角色"
                : register.roleIdString
            }}
          </div>
          <i></i>
        </div>
        <!-- <van-popup v-model="workRoleShow" round position="bottom">
          <van-picker
            title="请选择工作角色"
            show-toolbar
            cancel-button-text="✕"
            confirm-button-text="确定"
            :columns="workRoleActions"
            @cancel="workRoleShow = false"
            @confirm="workRoleSelect"
          />
        </van-popup> -->
        <van-action-sheet v-model="workRoleShow">
          <div class="registration_information_action_header">
            <div class="registration_information_action_header_left">已选择：{{this.result.length}}</div>
            <div class="registration_information_action_header_right" @click="confirmButton">确定</div>
          </div>
          <!-- <van-checkbox-group @change="selectInformation" v-model="result"> -->
          <van-checkbox-group v-model="result">
            <van-checkbox
              @click="selectInformation(item.id,index,item.name)"
              v-for="(item,index) in workRoleActionsData"
              :name="item.name"
              :key="index"
            >{{item.name}}</van-checkbox>
          </van-checkbox-group>
        </van-action-sheet>
      </div>
      <div class="registration_information_header">账户信息</div>
      <div class="registration_information_content">
        <div class="registration_information_content_list">
          <span><b>* </b>手机号码</span>
          <input
            v-model="register.phone"
            type="text"
            placeholder="请输入手机（必填）"
            @input="verificationRequired"
          />
        </div>
        <!-- <div class="registration_information_content_list">
          <span>账号密码</span>
          <input
            v-model="register.password"
            type="password"
            placeholder="6-16位英文或数字（必填）"
            @input="verificationRequired"
          />
        </div> -->
        <div class="registration_information_content_list">
          <span>校验口令</span>
          <input
            v-model="register.verifyPassword"
            type="password"
            placeholder="请输入注册口令"
            @input="verificationRequired"
          />
        </div>
        <div class="registration_information_content_list">
          <span>验证码</span>
          <input
            v-model="register.verifyCode"
            type="text"
            placeholder="请输入验证码"
            @input="verificationRequired"
          />
          <div class="registration_information_content_list_line"></div>
          <div
            class="registration_information_content_list_code"
            v-if="getCodeFlag"
            @click="getCode"
          >
            获取验证码
          </div>
          <div v-else class="registration_information_content_list_code">
            {{ countDown }}秒后重新获取
          </div>
        </div>
      </div>
    </div>
    <div class="registration_margin"></div>
    <div class="registration_bottom">
      <div
        ref="registrationButton"
        class="registration_bottom_register"
        @click="submitRegister"
      >
        注册
      </div>
      <!-- <div class="registration_back">返回登录</div> -->
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      result: [], // 绑定复选框的勾选状态
      communityShow: false, //所属社区面板是否展示
      workRoleShow: false, //工作角色是否展示
      communityValue: "", //所属社区值
      communityActions: [], //传入社区选项的值
      communityActionsData: [], //后台返回社区选项的值
      workRoleActions: [], //传入工作角色选项的值
      workRoleActionsData: [], //后台返回工作角色选项的值
      getCodeFlag: true, //获取验证码标志
      countDown: 60, //倒计时秒数
      // 传入的注册信息数据
      register: {
        name: "",
        townIdString: "",
        townId: "",
        unit: "",
        position: "",
        isParty: "",
        roleIdString: "",
        roleId: "",
        phone: "",
        password: "",
        verifyPassword: "",
        verifyCode: "",
        openId: "",
        sex: "",
        flag: false,
        checkboxRoleId: [],
        checkboxRoleName: [],
        imgList: [
          {
            name: "",
            url: "",
            allUrl: "",
          },
        ],
      },
    };
  },
  methods: {
    /**
     * @description: 复选框确定按钮
     * @param {}
     * @return {}
     */
    confirmButton() {
      this.verificationRequired(); //验证必填项
      this.workRoleShow = false;
      // this.register.roleIdString = this.register.checkboxRoleName;
      this.register.roleIdString = "";
      this.register.checkboxRoleName.forEach((item,index)=>{
        if(index != this.register.checkboxRoleName.length - 1){
          this.register.roleIdString +=item + '，';
        }else{
          this.register.roleIdString +=item + '';
        }
      })
      this.register.roleId = this.register.checkboxRoleId;
      //console.log(
      //   "this.register.roleId",
      //   this.register.roleId
      // );
    },
    /**
     * @description: 复选框选中情况
     * @param {}
     * @return {}
     */
    selectInformation(id, index, name) {
      //console.log(id, index, name);
      //console.log(this.result);
      if (this.register.checkboxRoleName.indexOf(name) > -1) {
        this.register.checkboxRoleName = this.register.checkboxRoleName.filter((v) => {
          return v != name;
        });
        this.register.checkboxRoleId = this.register.checkboxRoleId.filter((v) => {
          return v != id;
        });
      } else {
        this.register.checkboxRoleName.splice(index, 0, name);
        this.register.checkboxRoleId.splice(index, 0, id);
        // this.receiveResult.push(id);
        //console.log("我是被push进来的id===》", this.register.checkboxRoleId);
      }
      //console.log("选择后的id====>", this.register.checkboxRoleId);
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
          //获取
          // this.communityActions.push({ name: v.townName, id: v.id });
          this.communityActions.push(v.townName);
        });
      });
    },
    /**
     * @description: 获取工作角色
     * @param {}
     * @return {}
     */
    getRole() {
      this.$http({
        url: this.$http.adornUrl(`/garbage/garbageRole/list`),
        method: "get",
        params: this.$http.adornParams({}),
      }).then((data) => {
        //console.log(data);
        this.workRoleActionsData = data.data.page;
        data.data.page.forEach((v)=>{
          this.workRoleActions.push(v.name);
        })
      });
    },
    /**
     * @description: 所属社区选中情况
     * @param {string} value 选中选项的值
     * @param {number} index 选中选项的索引值
     * @return {}
     */
    communitySelect(value,index) {
      this.verificationRequired(); //验证必填项
      this.communityShow = false;
      //console.log(value,index);
      this.register.townIdString = value;
      this.register.townId = this.communityActionsData[index].id;
      //console.log(this.register.townId)
    },
    /**
     * @description: 工作角色选中情况
     * @param {string} value 选中选项的值
     * @param {number} index 选中选项的索引值
     * @return {}
     */
    workRoleSelect(value,index) {
      this.verificationRequired(); //验证必填项
      this.workRoleShow = false;
      //console.log(value,index);
      this.register.roleIdString = value;
      this.register.roleId = this.workRoleActionsData[index].id;
      //console.log(this.register.roleId)
    },
    /**
     * @description: 提交注册
     * @param {}
     * @return {}
     */
    submitRegister() {
      if (this.register.flag) {
        //注册按钮被激活
        this.$http({
          url: this.$http.adornUrl(`/garbage/garbageMember/wxSave`),
          method: "post",
          data: this.$http.adornData({
            name: this.register.name,
            townId: this.register.townId,
            unit: this.register.unit,
            position: this.register.position,
            isParty: this.register.isParty,
            roleIdList: this.register.roleId,
            phone: this.register.phone,
            password: this.register.password,
            openId: this.register.openId,
            command: this.register.verifyPassword,
            code: this.register.verifyCode,
            imgList: this.register.imgList,
            sex: this.register.sex,
            groupId: 0, //传0即可，只要不是空
          }),
        }).then((data) => {
          //console.log(data);
          switch (data.data.resultMsg) {
            case "-1":
              //   -1口令错误
              // this.$toast("输入效验口令错误");
              this.$dialog.alert({
                title: '注册失败',
                message: "输入效验口令错误",
              });
              break;
            case "-2":
              // -2验证码错误
              // this.$toast("输入验证码错误");
              this.$dialog.alert({
              title: '注册失败',
              message: "输入验证码错误",
              });
              break;
            case "-3":
              // -3手机号码已存在,请更换其它号码
              // this.$toast("该手机号码已被注册");
              this.$dialog.alert({
              title: '注册失败',
              message: "该手机号码已被注册，请更换其它号码。",
              });
              break;
            case "1":
              //  1成功
              // this.$toast("注册成功");
              this.$router.push({
                name: "registrationSuccess",
              });
              break;
            default:
              // this.$toast("服务器异常");
              this.$dialog.alert({
              title: '注册失败',
              message: "服务器异常",
              });
              break;
          }
        });
      } else {
        //注册按钮未激活
        if (!this.register.name) {
          this.$toast("请填写姓名");
          return;
        }
        if (!this.register.sex) {
          this.$toast("请选择性别");
          return;
        }
        if (!this.register.townIdString) {
          this.$toast("请选择所属社区");
          return;
        }
        if (!this.register.isParty) {
          this.$toast("请选择是否党员");
          return;
        }
        if (!this.register.roleIdString) {
          this.$toast("请选择工作角色");
          return;
        }
        if (!this.register.phone) {
          this.$toast("请填写手机号码");
          return;
        }
        // if (!this.register.password) {
        //   this.$toast("请填写账号密码");
        //   return;
        // }
        if (!this.register.verifyPassword) {
          this.$toast("请填写效验口令");
          return;
        }
        if (!this.register.verifyCode) {
          this.$toast("请填写验证码");
          return;
        }
      }
    },
    /**
     * @description: 获取验证码
     * @param {}
     * @return {}
     */
    getCode() {
      //验证手机号码格式
      if (!/^1[3456789]\d{9}$/.test(this.register.phone)) {
        this.$toast("手机号码格式错误");
        return false;
      } else {
        this.$http({
          url: this.$http.adornUrl(
            `/garbage/garbageMember/getPhoneCode?phone=${this.register.phone}`
          ),
          method: "get",
          params: this.$http.adornParams({}),
        }).then((data) => {
          //console.log(data);
          if(data && data.data.code === 0){
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
          }else{
            this.$dialog
              .alert({
                message: "验证码发送失败，服务器异常",
              })
          }
        });
      }
    },
    /**
     * @description: 选择性别
     * @param {number} num  传入1或2：1为男性，2为女性
     * @return {}
     */
    sexCheck(num) {
      this.verificationRequired(); //验证必填项
      switch (num) {
        case 1:
          //选中性别为男
          this.$refs.sexMan.src = require("@/assets/img/manChecked.png");
          this.$refs.sexWoman.src = require("@/assets/img/womanUnchecked.png");
          this.register.sex = 1;
          break;
        case 2:
          //选中性别为女
          this.$refs.sexMan.src = require("@/assets/img/manUnchecked.png");
          this.$refs.sexWoman.src = require("@/assets/img/womanChecked.png");
          this.register.sex = 2;
          break;
      }
    },
    /**
     * @description: 验证必填项是否填写
     * @param {}
     * @return {}
     */
    verificationRequired() {
      if (
        this.register.name &&
        this.register.sex &&
        this.register.townIdString &&
        this.register.isParty &&
        this.register.roleIdString &&
        this.register.phone &&
        // this.register.password &&
        this.register.verifyPassword &&
        this.register.verifyCode
      ) {
        this.register.flag = true;
        this.$refs.registrationButton.style.opacity = "1";
      } else {
        this.register.flag = false;
        this.$refs.registrationButton.style.opacity = "0.39";
      }
    },
  },
  created() {
    this.getCommunity(); //获取社区数据
    this.getRole(); //获取工作角色数据
    this.register.openId = localStorage.getItem("openId");
  },
};
</script>

<style lang="less" scoped>
  .registration {
    font-size: 0.32rem;
    //注册信息区域
    .registration_information {
      //信息头部
      .registration_information_header {
        font-size: 0.24rem;
        height: 0.86rem;
        line-height: 0.86rem;
        color: #999999;
        margin-left: 0.38rem;
        font-family: PingFangSC-Medium, PingFang SC;
      }
      //信息内容
      .registration_information_content {
        background-color: #ffffff;
        //action面板
      .registration_information_action_header {
        display: flex;
        .registration_information_action_header_left {
          width: 75.2vw;
          margin-left: 4.8vw;
          // margin-top: 2.5vh;
          margin-top: 0.33rem;
          color: #0091ff;
          font-size: 0.32rem;
          font-family: PingFangSC-Regular, PingFang SC;
        }
        .registration_information_action_header_right {
          width: 18.13vw;
          // height: 4.57vh;
          // line-height: 4.57vh;
          height: 0.61rem;
          line-height: 0.61rem;
          text-align: center;
          background-color: #0091ff;
          color: #ffffff;
          font-size: 0.32rem;
          font-family: PingFangSC-Regular, PingFang SC;
          // margin-top: 2.02vh;
          margin-top: 0.27rem;
          margin-right: 2.87vw;
          border-radius: 0.8vw;
        }
      }
      //复选框按钮
      .van-checkbox {
        border-bottom: 0.13vw solid #ededed;
        // height: 8vh;
        height: 1.07rem;
        /deep/.van-checkbox__icon--round .van-icon {
          margin-left: 3.6vw;
        }
        /deep/.van-checkbox__label {
          margin-left: 3.2vw;
          font-size: 0.32rem;
          font-family: PingFangSC-Regular, PingFang SC;
        }
      }
        // picker选择器确定按钮
       /deep/ .van-picker__confirm{
          color: #0091ff;
          font-size: 0.32rem;
        }
        // picker选择器取消按钮
      /deep/ .van-picker__cancel{
        // font-weight: bold;
        font-size: 0.4rem;
        color: #575757;
      }
      /deep/ .van-picker__title{
        font-size: 0.36rem;
      }
        //内容列表
        .registration_information_content_list {
          height: 1.1rem;
          line-height: 1.1rem;
          border-bottom: 0.01rem solid #f3f3f3;
          margin: 0 0.38rem;
          position: relative;
          font-family: PingFangSC-Regular, PingFang SC;
          //列表左边说明
          span {
            color: #333333;
            b{
              color: red;
            }
          }
          //列表性别选择
          .content_list_image {
            position: absolute;
            right: 0;
            top: 0;
            img {
              width: 0.7rem;
              vertical-align: middle;
              &:nth-last-child(1) {
                margin-left: 0.1rem;
              }
            }
          }
          //列表单选框
          /deep/ .van-radio__label {
            font-size: 0.29rem;
          }
          //列表的最后一个
          &:nth-last-child(1) {
            border-bottom: none;
          }
          //带选项列表的文字
          .registration_information_content_list_select {
            display: inline-block;
            color: #cccccc;
            max-width: 4rem;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            vertical-align: middle;
            margin-top: -0.1rem;
          }
          //带选项被选中后的文字颜色
          .registration_information_content_list_color {
            color: #000000;
          }
          //边框竖线
          .registration_information_content_list_line {
            position: absolute;
            background-color: #dddddd;
            width: 0.01rem;
            height: 0.4rem;
            top: 50%;
            margin-top: -0.2rem;
            right: 1.6rem;
          }
          //获取验证码
          .registration_information_content_list_code {
            position: absolute;
            right: 0;
            top: 0;
            color: #0094ee;
            font-size: 0.24rem;
            font-family: PingFangSC-Regular, PingFang SC;
          }
          //单选框
          /deep/ .van-radio-group--horizontal {
            position: absolute;
            left: 2.4rem;
            top: 0.35rem;
          }
          //列表左边文字
          span {
            min-width: 1.56rem;
            margin-right: 0.8rem;
            display: inline-block;
          }
          //列表输入框
          input {
            border: none;
            padding: 0;
            width: 4rem;
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
          //设置输入框提示文字
          input::-webkit-input-placeholder {
            color: #cccccc;
          }
          input::-moz-placeholder {
            /* Mozilla Firefox 19+ */
            color: #cccccc;
          }
          input:-moz-placeholder {
            /* Mozilla Firefox 4 to 18 */
            color: #cccccc;
          }
          input:-ms-input-placeholder {
            /* Internet Explorer 10-11 */
            color: #cccccc;
          }
          //设置输入框禁用情景
          input:disabled {
            background-color: #ffffff;
          }
        }
      }
    }
    //
    .registration_margin {
      // margin-bottom: 2.6rem;
      margin-bottom: 1.74rem;
    }
    //注册底部
    .registration_bottom {
      width: 100%;
      // height: 2.36rem;
      height: 1.5rem;
      background-color: #ffffff;
      //   margin-top: 0.26rem;
      overflow: hidden;
      position: fixed;
      z-index: 1000;
      bottom: 0;
      .registration_bottom_register {
        width: 6.4rem;
        height: 0.9rem;
        line-height: 0.9rem;
        text-align: center;
        font-size: 0.36rem;
        background: linear-gradient(360deg, #2b80ff 0%, #65bcff 100%);
        box-shadow: 0 0.06rem 0.12rem 0 rgba(12, 126, 161, 0.35);
        border-radius: 0.75rem;
        opacity: 0.39;
        margin: 0.3rem auto 0 auto;
        color: #ffffff;
      }
      .registration_back {
        width: 2rem;
        font-size: 0.29rem;
        text-align: center;
        color: #0091ff;
        margin: 0.4rem auto;
      }
    }
  }
</style>