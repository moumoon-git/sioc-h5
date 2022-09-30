<template>
    <div class="searchcontacter">
         <div class="inputcontainer">
             <div class="search">
             <span class="iconfont iconsousuo searchicon">

             </span>
             <input type="text" placeholder="请输入联系人名字">
             </div>
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
    name: 'searchcontacter',
    created() {
       //console.log('state',this.$route.params.state)
       let state = this.$route.params.state
       if(state === 0){//最近联系人
       //Request URL: http://scg.chinaemt.com/ser/message/messageinfor/getCurrentContract?t=1594190326663
       this.$http({
      url: this.$http.adornUrl('/message/messageinfor/getCurrentContract'),
      method: 'get',
      params: this.$http.adornParams({
      })
    }).then(({data}) => {
        //console.log('currentdata',data)
    })
       }
       if(state ===1){//常用联系人
          this.$http({
      url: this.$http.adornUrl('/message/messageinfor/getCommonContract'),
      method: 'get',
      params: this.$http.adornParams({
      })
    }).then(({data}) => {
        //console.log('commondata',data)
    })
       }
    },
    data() {
        return {
            result: [],
        }
    }
}
</script>
<style lang="less" scoped>
.searchcontacter {
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
.contactercontent {
    background-color: #FFFFFF;
    height: 86vh;
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