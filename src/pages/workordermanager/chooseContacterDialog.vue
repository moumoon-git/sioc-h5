<template>
    <div class="lookChooseContacter">
        <div class="dialogwrapper">
            <van-popup v-model="isShow" position="bottom" round :style="{ height: '55%' }" @click-overlay="closeDialog">
            <div class="bottomslide">
             <div class="choosepeople">
                 已选择：{{personNumber}}人
             </div>
             <div class="yesbutton" @click="transferOrder">
                 确定
              </div>
             </div>
             <div class="contactercontent">
              
                <div class="contactslide" v-for="(item,index) in userArr" :key="index">
                  
                  <div class="personavatar">{{item.name?item.name.substring(item.name.length-2):''}}</div>
                      <div class="personmessage">
                          <div class="personcontainer">
                              <div class="personname">{{item.name}}</div>
                              <div v-if="item.position" class="personcareer">{{item.position}}</div>
                          </div>
                          <div v-if="item.workUnit" class="address">{{item.workUnit}}</div>
                      </div>
                      <img src="~@/assets/img/deletex.png" alt="" class="del" @click="deleteUser(item.id)">
                </div>
               
             
         </div>
         
            </van-popup>
        </div>
    </div>
</template>
<script>
export default {
    name: 'chooseContacterDialog',
    data() {
      return {
        isShow: false
      }
    },
    props: {
        show: {
            type: Boolean,
            required: true
        },
        personNumber: {
            type: Number,
            required: true
        },
        userArr: {
            type: Array,
            required: true
        }
    },
    watch: {
       show(newVal) {
           this.isShow = newVal
       }
    },
    methods: {
        closeDialog() {
         this.$emit('closeDialog')
        },
        transferOrder() {
         this.$emit('transferOrder')
        },
        deleteUser(userId) {
         this.$emit('deleteUser',userId)
        }
    }
}
</script>
<style lang="less" scoped>
.lookChooseContacter {
  .dialogwrapper {
    /deep/ .van-popup {
      .bottomslide {
     background-color: #FFFFFF;
     height: 6.67vh;
     border-top: 0.07vh solid #747474;
     display: flex;
     justify-content: space-between;
     .choosepeople {
     height: 3.37vh;
     margin-top: 1.65vh;
     margin-left: 3.5vw;
    //  font-size: 4.3vw;
    //  color: #0091FF;
     font-size:0.32rem;
    font-family:PingFangSC-Regular,PingFang SC;
    font-weight:400;
    color:rgba(0,145,255,1);
     }
     .yesbutton {
         width: 18.13vw;
         height: 4.6vh;
         background-color: #0091FF;
        //  color: #FFFFFF;
        //  font-size: 4.3vw;
         border-radius: .8vw;
         text-align: center;
         line-height: 4.6vh;
         margin: 1.05vh 1.9vw;
         font-size:0.32rem;
        font-family:PingFangSC-Regular,PingFang SC;
        font-weight:400;
        color:rgba(255,255,255,1);
     }
     
 }
.contactercontent {
    background-color: #FFFFFF;
    height: 86vh;
    padding-left: 2.93vw;
    .contactslide {
        display: flex;
        position: relative;
        // padding-top: 2vh;
          padding-bottom: 2vh;
       .personavatar {
        width: 9.9vw;
        height: 5.55vh;
        margin-top: .5vh;
        margin-left: 3.9vw;
        background-color: #65bcff;
        border-radius: 50%;
        text-align: center;
        line-height: 5.55vh;
        // color: #fff;
        font-size:0.28rem;
        font-family:PingFangSC-Regular,PingFang SC;
        font-weight:400;
        color:rgba(255,255,255,1);
      }
    
    
      .personmessage {
          margin-left: 2.7vw;
          width: 85%;
          border-bottom: 0.07vh solid #DDDDDD;
          padding-bottom: 2vh;
        .personcontainer {
            display: flex;
          .personname {
              height: 3.37vh;
            //   font-size: 4.3vw;
            //   color: #333333;
              font-size:0.32rem;
            font-family:PingFangSC-Regular,PingFang SC;
            font-weight:400;
            color:rgba(51,51,51,1);

          }

          .personcareer {
              height: 2.1vh;
              border-radius: 1.6vw;
              border: 0.15vh solid #CDD6E1;
            //   font-size: 2.7vw;
            //   color: #86A0BA;
              text-align: center;
              line-height: 2.1vh;
              margin-top: .5vh;
              padding-left: 1.6vw;
              padding-right: 1.6vw;
              margin-left: 0.8vw;
              font-size:0.2rem;
            font-family:PingFangSC-Regular,PingFang SC;
            font-weight:400;
            color:rgba(134,160,186,1);

          }
        }

        .address {
            height: 2.47vh;
            // font-size: 3.2vw;
            // color: #999999;
            font-size:0.24rem;
            font-family:PingFangSC-Regular,PingFang SC;
            font-weight:400;
            color:rgba(153,153,153,1);

        }
      }
      .del {
          width: 4.27vw;
          height: 2.4vh;
          position: absolute;
          top: 2vh;
          right: 3.87vw;
      }
    }
    .groupcontent {
     background-color: #FFFFFF;
    height: 86vh;
    padding-left: .7vw;
    .contactslide {
        display: flex;
        position: relative;
        // padding-top: 2vh;
          padding-bottom: 2vh;
      .personavatar {
        width: 9.9vw;
        height: 5.55vh;
        margin-top: .5vh;
        margin-left: 3.9vw;
        background-color: #F2B626;
        // color: #fff;
        text-align: center;
        line-height: 5.55vh;
        border-radius: 50%;
        font-size: 3vw;
        font-size:0.28rem;
        font-family:PingFangSC-Regular,PingFang SC;
        font-weight:400;
        color:rgba(255,255,255,1);
      }
    
    
      .groupname {
          padding-top: 2vh;
          padding-left: 2vw;
          
      }
      .del {
          width: 4.27vw;
          height: 2.4vh;
          position: absolute;
          top: 2vh;
          right: 3.87vw;
      }
    }


}

}

    }
  }
}
</style>