<template>
    <div class="submitHandleMessageJoiner">
        <div class="orderdetailheader">
            <div class="ordermessagetitle">
                工单信息
            </div>
            <div class="handleordertitle">
                处置工单
            </div>
        </div>
        <div class="handlecontent">

        </div>
        <div class="handleProcess">
            <div class="handlecontact">
             <div class="inputborder">
                 <textarea name="" id="" cols="30" rows="2" placeholder="请输入处置情况" class="contacttalk"></textarea>
             </div>
             <van-uploader v-model="imgFileList" multiple :after-read="afterRead">
             <img src="~@/assets/img/contactpicture.png" alt="">
             </van-uploader>
             <div class="submitbutton">
                 提交
             </div>
            </div>
            <div class="showChooseImg">
                <div class="imgContainer" v-for="(item,index) in imgFileList" :key="index">
                    <img :src="item.content" alt="">
                    <img src="~@/assets/img/deleteimgx.png" class="deletex" @click="deleteImg(index)">
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'submitHandleMessageJoiner',
    data() {
        return {
            imgFileList: []//上传的图片列表
        }
    },
    methods: {
        afterRead() {
            //console.log(this.imgFileList)
        },
        deleteImg(index) {
            this.imgFileList.splice(index,1)
        }
    }
}
</script>
<style lang="less" scoped>
.submitHandleMessageJoiner {
  .orderdetailheader {
      display: flex;
      justify-content: space-around;
      height: 7.5vh;
      line-height: 7.5vh;
      font-size: 3.7vw;
      color: #666666;
      background-color: #ffffff;
    .ordermessagetitle {

    }

    .handleordertitle {

    }
  }

  .handlecontent {

  }

  .handleProcess {
      position: fixed;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: rgba(236,242,242,1);
    .handlecontact {
      
    //   height: 7.12vh;
      border-top: 0.15vh solid #747474;
      padding: 1.2vh 1.3vw 1.2vh 1.3vw;
      background-color: rgba(236,242,242,1);
      display: flex;
      .inputborder {
          width: 73.87vw;
          height: 9.67vh;
          border-radius: 4.3vw; 
          background-color: #ffffff;
     textarea.contacttalk {
         margin-left: 4.3vw ;
         margin-top: 0.67vh;
         height: 8.6vh;
         border: none;
         overflow: hidden;
           &::placeholder {
               font-size: 4.3vw;
               color: #CCCCCC;
           }

            }
      }
     .van-uploader {
      /deep/ .van-uploader__preview {
          display: none;
        
      
     }
     /deep/ .van-uploader__input-wrapper {
       img {
          width: 7.6vw;
          height: 4.3vh;
          margin-left: 0.93vw;
          margin-right: 0.86vw;
          margin-top: 4vh; 
      }
     }
     }

     .submitbutton {
         margin-top: 3.8vh; 
         width: 12.7vw;
         height: 4.7vh;
         border-radius: 5vw ;
         background-color: rgba(0,145,255,1);
         color: #FFFFFF;
         font-size: 4.3vw;
         text-align: center;
         line-height: 4.7vh;

        }
  }

    .showChooseImg {
        margin-top: 1.95vh;
        margin-left: 2.93vw;
        display: flex;
      .imgContainer {
          display: flex;
          position: relative;
          width: 20.33vw;
          height: 11.43vh;
          margin-left: 3vw;
        img {
            width: 20.33vw;
            height: 11.43vh;
            // margin-left: 2.53vw;

        }

        .deletex {
          position: absolute;
          right: -2.4vw;
          top:-0.93vh;
          width: 5.87vw;
          height: 3.3vh;
        }
      }
    }
  }
}
</style>