<template>
  <div class="lookChooseContacter">
    <div class="dialogwrapper">
      <van-popup
        v-model="isShow"
        position="bottom"
        round
        :style="{ height: '55%' }"
        @click-overlay="closeDialog"
      >
        <div class="bottomslide">
          <div class="choosepeople">已选择：{{personNumber}}人</div>
          <div class="yesbutton" @click="transferOrder">确定</div>
        </div>
        <div class="contactercontent">
          <div class="contactslide" v-for="(item,index) in userArr" :key="index">
            <div class="personavatar">{{item.name?item.name.substring(item.name.length-2):''}}</div>
            <div class="personmessage">
              <div class="personcontainer">
                <div class="personname">{{item.name}}</div>
                <div class="personcareer">{{item.position}}</div>
              </div>
              <div class="address">{{item.workUnit}}</div>
            </div>
            <img src="~@/assets/img/deletex.png" alt class="del" @click="deleteUser(item.id)" />
          </div>
        </div>
      </van-popup>
    </div>
  </div>
</template>
<script>
export default {
  name: "chooseContacterDialog",
  data() {
    return {
      isShow: false,
    };
  },
  props: {
    show: {
      type: Boolean,
      required: true,
    },
    personNumber: {
      type: Number,
      required: true,
    },
    userArr: {
      type: Array,
      required: true,
    },
  },
  watch: {
    show(newVal) {
      this.isShow = newVal;
    },
  },
  methods: {
    closeDialog() {
      this.$emit("closeDialog");
    },
    transferOrder() {
      this.$emit("transferOrder");
    },
    deleteUser(userId) {
      this.$emit("deleteUser", userId);
    },
  },
};
</script>
<style lang="less" scoped>
  .lookChooseContacter {
    .dialogwrapper {
      /deep/ .van-popup {
        .bottomslide {
          background-color: #ffffff;
          // height: 6.67vh;
          height: 0.89rem;
          // border-top: 0.07vh solid #747474;
          border-top: 0.01rem solid #747474;
          display: flex;
          justify-content: space-between;
          .choosepeople {
            // height: 3.37vh;
            // margin-top: 1.65vh;
            height: 0.45rem;
            margin-top: 0.22rem;
            margin-left: 3.5vw;
            //  font-size: 4.3vw;
            //  color: #0091FF;
            font-size: 0.32rem;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: rgba(0, 145, 255, 1);
          }
          .yesbutton {
            width: 18.13vw;
            // height: 4.6vh;
            height: 0.61rem;
            background-color: #0091ff;
            //  color: #FFFFFF;
            //  font-size: 4.3vw;
            border-radius: 0.8vw;
            text-align: center;
            // height: 4.6vh;
            height: 0.61rem;
            // margin: 1.05vh 1.9vw;
            margin: 0.14rem 1.9vw;
            font-size: 0.32rem;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: rgba(255, 255, 255, 1);
          }
        }
        .contactercontent {
          background-color: #ffffff;
          // height: 86vh;
          height: 11.47rem;
          padding-left: 2.93vw;
          .contactslide {
            display: flex;
            position: relative;
            // padding-top: 2vh;
            // padding-bottom: 2vh;
            padding-bottom: 0.27rem;
            .personavatar {
              width: 9.9vw;
              // height: 5.55vh;
              height: 0.74rem;
              // margin-top: 0.5vh;
              margin-top: 0.07rem;
              margin-left: 3.9vw;
              background-color: #65bcff;
              border-radius: 50%;
              text-align: center;
              // line-height: 5.55vh;
              line-height: 0.74rem;
              // color: #fff;
              font-size: 0.28rem;
              font-family: PingFangSC-Regular, PingFang SC;
              font-weight: 400;
              color: rgba(255, 255, 255, 1);
            }

            .personmessage {
              margin-left: 2.7vw;
              width: 85%;
              // border-bottom: 0.07vh solid #dddddd;
              border-bottom: 0.01rem solid #dddddd;
              // padding-bottom: 2vh;
              padding-bottom: 0.27rem;
              .personcontainer {
                display: flex;
                .personname {
                  // height: 3.37vh;
                  height: 0.45rem;
                  //   font-size: 4.3vw;
                  //   color: #333333;
                  font-size: 0.32rem;
                  font-family: PingFangSC-Regular, PingFang SC;
                  font-weight: 400;
                  color: rgba(51, 51, 51, 1);
                }

                .personcareer {
                  // height: 2.1vh;
                  height: 0.28rem;
                  border-radius: 1.6vw;
                  // border: 0.15vh solid #cdd6e1;
                  border: 0.02rem solid #cdd6e1;
                  //   font-size: 2.7vw;
                  //   color: #86A0BA;
                  text-align: center;
                  // line-height: 2.1vh;
                  // margin-top: 0.5vh;
                  line-height: 0.28rem;
                  margin-top: 0.07rem;
                  padding-left: 1.6vw;
                  padding-right: 1.6vw;
                  margin-left: 0.8vw;
                  font-size: 0.2rem;
                  font-family: PingFangSC-Regular, PingFang SC;
                  font-weight: 400;
                  color: rgba(134, 160, 186, 1);
                }
              }

              .address {
                // height: 2.47vh;
                height: 0.33rem;
                // font-size: 3.2vw;
                // color: #999999;
                font-size: 0.24rem;
                font-family: PingFangSC-Regular, PingFang SC;
                font-weight: 400;
                color: rgba(153, 153, 153, 1);
              }
            }
            .del {
              width: 4.27vw;
              // height: 2.4vh;
              height: 0.32rem;
              position: absolute;
              // top: 2vh;
              top: 0.27rem;
              right: 3.87vw;
            }
          }
          .groupcontent {
            background-color: #ffffff;
            // height: 86vh;
            height: 11.47rem;
            padding-left: 0.7vw;
            .contactslide {
              display: flex;
              position: relative;
              // padding-top: 2vh;
              // padding-bottom: 2vh;
              padding-bottom: 0.27rem;
              .personavatar {
                width: 9.9vw;
                // height: 5.55vh;
                height: 0.74rem;
                // margin-top: 0.5vh;
                margin-top: 0.07rem;
                margin-left: 3.9vw;
                background-color: #f2b626;
                // color: #fff;
                text-align: center;
                // line-height: 5.55vh;
                line-height: 0.74rem;
                border-radius: 50%;
                font-size: 3vw;
                font-size: 0.28rem;
                font-family: PingFangSC-Regular, PingFang SC;
                font-weight: 400;
                color: rgba(255, 255, 255, 1);
              }

              .groupname {
                // padding-top: 2vh;
                padding-top: 0.27rem;
                padding-left: 2vw;
              }
              .del {
                width: 4.27vw;
                // height: 2.4vh;
                height: 0.33rem;
                position: absolute;
                // top: 2vh;
                top: 0.27rem;
                right: 3.87vw;
              }
            }
          }
        }
      }
    }
  }
</style>