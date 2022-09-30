<template>
    <div class="transmitOrder">
        <div class="inputcontainer">
             <div class="search">
             <span class="iconfont iconsousuo searchicon">

             </span>
             <input type="text" placeholder="请输入联系人名字">
             </div>
         </div>
         <div class="departmentcontainer">
            <van-checkbox-group v-model="result">
                <div class="departmentcontainerwrap">
                <van-checkbox name="a">最近联系人(5)</van-checkbox>
                <div class="iconfont iconjf-row entericon" @click="enterRecentContacter"></div>
                </div>
                 <div class="departmentcontainerwrap">
                <van-checkbox name="b">常用联系人(5)</van-checkbox>
                <div class="iconfont iconjf-row entericon" @click="enterCommonContacter"></div>
                </div>
            </van-checkbox-group>
        </div>
        <div class="departmentcontainer">
            <van-checkbox-group v-model="result">
                <div class="departmentcontainerwrap">
                <van-checkbox name="a">区办公室(5)</van-checkbox>
                <div class="iconfont iconjf-row entericon"></div>
                </div>
                 <div class="departmentcontainerwrap">
                <van-checkbox name="b">区政法委(5)</van-checkbox>
                <div class="iconfont iconjf-row entericon"></div>
                </div>
            </van-checkbox-group>
        </div>
        <div class="contactercontent">
              <van-checkbox-group v-model="result">
                <div class="contactslide">
                  <van-checkbox name="a">
                      
                  </van-checkbox>
                  <img src="~@/assets/img/logo.png" alt="" class="personavatar">
                      <div class="personmessage">
                          <div class="personcontainer">
                              <div class="personname">黄菲菲</div>
                              <div class="personcareer">主任</div>
                          </div>
                          <div class="address">增城区新塘镇朱村街道办</div>
                      </div>
                </div>
                <div class="contactslide">
                  <van-checkbox name="b">
                      
                  </van-checkbox>
                  <img src="~@/assets/img/logo.png" alt="" class="personavatar">
                      <div class="personmessage">
                          <div class="personcontainer">
                              <div class="personname">黄菲菲</div>
                              <div class="personcareer">主任</div>
                          </div>
                          <div class="address">增城区新塘镇朱村街道办</div>
                      </div>
                </div>
             </van-checkbox-group>
         </div>
         <div class="bottomslide">
             <div class="choosepeople">
                 已选择：2人，1个分组
             </div>
             <div class="yesbutton">
                 确定
             </div>
         </div>
    </div>
</template>
<script>
export default {
    name: 'transmitOrder',
    methods: {
        enterRecentContacter() {
            this.$router.push({name: 'searchcontacter',params: {state: 0}}) //0代表获取最近联系人
        },
        enterCommonContacter() {
            this.$router.push({name: 'searchcontacter',params: {state: 1}})//1代表获取常用联系人
        }
    }
}
</script>
<style lang="less" scoped>
.transmitOrder {
  .inputcontainer {
      background-color: #FFFFFF;
    //   height: 6.74vh;
    //   padding: 1.5vh 4,3vw!important;
      box-sizing: border-box;
      padding: 1.5vh 4.3vw;
    .search {
        width: 91.5vw;
        height: 3.75vh;
        // margin: 1.5vh 4.3vw;
        background-color: #F2F2F2;
        display: flex;
        border-radius: 2.7vw;
      span.searchicon {
          font-size: 4.1vw;
          margin-top: 0.7vh;
          margin-left: 2.1vw;
          color: #999999;

      }

      input {
          background-color: #F2F2F2;
          border: none;
          &::placeholder {
              font-size: 3.7vw;
              color: #ccc;
          }

      }
    }
  }

  .departmentcontainer {
      background-color: #FFFFFF;
      margin-top: 1.5vh;
      padding-left: 2.93vw;
    //   height: 82vh;
      .departmentcontainerwrap {
          height: 7.5vh;
          border-bottom: 0.07vh solid #DDDDDD;
          display: flex;
          line-height: 7.5vh;
          justify-content: space-between;
        .entericon {
          margin-right: 4vw;
          width: 5.3vw;
          height:3.0vh;
        }
      }
  }

  .contactercontent {
    background-color: #FFFFFF;
    // height: 86vh;
    margin-top: 1.5vh;
    padding-left: 2.93vw;
    .contactslide {
        display: flex;
      img.personavatar {
        width: 9.9vw;
        height: 5.55vh;
        margin-top: .5vh;
        margin-left: 3.9vw;
      }
    
    
      .personmessage {
          margin-left: 2.7vw;
        .personcontainer {
            display: flex;
          .personname {
              height: 3.37vh;
              font-size: 4.3vw;
              color: #333333;

          }

          .personcareer {
              height: 2.1vh;
              border-radius: 1.6vw;
              border: 0.15vh solid #CDD6E1;
              font-size: 2.7vw;
              color: #86A0BA;
              text-align: center;
              line-height: 2.1vh;
              margin-top: .5vh;
              padding-left: 1.6vw;
              padding-right: 1.6vw;
              margin-left: 0.8vw;

          }
        }

        .address {
            height: 2.47vh;
            font-size: 3.2vw;
            color: #999999;

        }
      }
    }

}

   .bottomslide {
     background-color: #FFFFFF;
     height: 6.67vh;
     border-top: 0.07vh solid #747474;
     position: fixed;
     bottom: 0;
     left: 0;
     right: 0;
     display: flex;
     justify-content: space-between;
     .choosepeople {
     height: 3.37vh;
     margin-top: 1.65vh;
     margin-left: 3.5vw;
     font-size: 4.3vw;
     color: #0091FF;
     }
     .yesbutton {
         width: 18.13vw;
         height: 4.6vh;
         background-color: #0091FF;
         color: #FFFFFF;
         font-size: 4.3vw;
         border-radius: .8vw;
         text-align: center;
         line-height: 4.6vh;
         margin: 1.05vh 1.9vw;
     }
     
 }
}
</style>