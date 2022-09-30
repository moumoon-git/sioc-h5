<template>
    <div class="handleOrderLeader">
        <div class="orderdetailheader">
            <div class="ordermessagetitle">
                工单信息
            </div>
            <div class="handleordertitle">
                处置工单
            </div>
        </div>
        <div class="content">
            <div class="buttonwrapper">
              <div class="handleorderbutton">处置工单</div>
              <div class="ordersettingbutton">工单设置</div>
              </div>
        </div>
        <div class="handleProcess">
            <div class="buttonwrapper">
                   <div class="handleing">处置中</div>
                   <div class="alreadyhandle">已处置</div> 
                </div>
        <div class="handlecontact">
             <div class="inputborder">
                 <input type="text" class="contacttalk" placeholder="请输入工单处置情况" />
             </div>
             <img src="~@/assets/img/contactpicture.png" alt="">
             <div class="submitbutton">
                 提交
             </div>
        </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'handleOrderLeader'
}
</script>
<style lang="less" scoped>
.handleOrderLeader {
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

  .content {
      height: 80vh;
    //   background-color: red;
     position: relative;
    //   height: 60vh;
    
    .buttonwrapper {
          display: flex;
          position: absolute;
          bottom: 2vh;
          .handleorderbutton {
              width: 18vw;
              height: 4.27vh;
              border-radius: 5.83vw;
              border: 0.1vh solid #666;
              text-align: center;
              line-height: 4.27vh;
              padding: 0.6vh 1.73vw;
              margin-left: 2vw;
          }
          .ordersettingbutton {
             width: 18vw;
              height: 4.27vh;
              border-radius: 5.83vw;
              border: 0.1vh solid #666;
              text-align: center;
              line-height: 4.27vh;
              padding: 0.6vh 1.73vw;
              margin-left: 2vw;
          }
      }

  }
  .handleProcess {
      position: fixed;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: rgba(236,242,242,1);
      border-top: 0.15vh solid #747474;
      .buttonwrapper {
           display: flex;
           margin-top: 1.5vh;
           margin-left: 1.87vw;
           .handleing {
              background-color: #0091FF;
              color: #FFFFFF;
              font-size: 3.73vw;
              text-align: center;
              line-height: 4.95vh;
              height: 4.95vh;
              width: 28vw;
              margin-left: 1.33vw;
              border-radius: 8vw;
            }

         .alreadyhandle {
             background-color: #FFFCFC;
              color: #333333;
              font-size: 3.73vw;
              text-align: center;
              line-height: 4.95vh;
              height: 4.95vh;
              width: 28vw;
              margin-left: 1.33vw;
              border-radius: 8vw;
           }
        }
  .handlecontact {
    //   position: fixed;
    //   left: 0;
    //   right: 0;
    //   bottom: 0;
    //   height: 7.12vh;
    //   border-top: 0.15vh solid #747474;
      padding: 1.2vh 1.3vw 1.2vh 1.3vw;
      background-color: rgba(236,242,242,1);
      display: flex;
      .inputborder {
          width: 73.9vw;
          height: 4.7vh;
          border-radius: 4.3vw; 
          background-color: #ffffff;
     input.contacttalk {
         margin-left: 4.3vw ;
         margin-top: 0.67vh;
         border: none;
           &::placeholder {
               font-size: 4.3vw;
               color: #CCCCCC;
           }

            }
      }

      img {
          width: 7.6vw;
          height: 4.3vh;
          margin-left: 0.93vw;
          margin-right: 0.16vw;
      }

     .submitbutton {
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
  }
}
</style>