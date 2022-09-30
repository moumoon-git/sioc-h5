<template>
    <div class="applyMessageResponse">
        <div class="orderdetailheader">
            <div class="ordermessagetitle">
                工单信息
            </div>
            <div class="handleordertitle">
                处置工单
            </div>
        </div>
        <div class="handleorderdetail">
              <div class="persontalk">
                  <div class="sender">
                      <div class="content">
                         <div class="contenttop">
                             <div class="contenttopheader">
                                   <span class="iconfont iconyk_yuanquan_fill circleblack"></span>
                                   <div class="handleordertitle">
                                       已处置工单
                                   </div>
                                   <div class="starttime">
                                       2020-05-15 14:22
                                   </div>
                             </div>
                             <div class="handleresult">
                                  已到现场进行处置
                             </div>
                             <div class="handlepiccontainer">
                                 <img src="~@/assets/img/logo.png" alt="">
                             </div>
                         </div>
                         <div class="contentbottom">
                              <div class="addresscontainer">
                                  <div class="address">
                                      <span class="iconfont icondingwei addressicon"></span>
                                      工厂区A区东大门
                                  </div>
                                  <div class="responsebutton">
                                      回复
                                  </div>
                              </div>
                         </div>
                      </div>
                      <div class="handleperson">
                          张三
                      </div>
                  </div>
                  <div class="receiver">
                      <div class="leader">
                          王五
                          <div class="leadericon"></div>
                      </div>
                      <div class="content">
                         <div class="contenttop">
                             <div class="contenttopheader">
                                   <span class="iconfont iconyk_yuanquan_fill circleblack"></span>
                                   <div class="handleordertitle">
                                       已重启工单
                                   </div>
                                   <div class="starttime">
                                       2020-05-15 14:22
                                   </div>
                             </div>
                             <div class="handleresult">
                                  已到现场进行处置
                             </div>
                             <div class="handlepiccontainer">
                                 <img src="" alt="">
                             </div>
                         </div>
                         <div class="contentbottom">
                              <div class="addresscontainer">
                                  <div class="address">
                                      <span class="iconfont icondingwei addressicon"></span>
                                      工厂区A区东大门
                                  </div>
                                  <div class="responsebutton">
                                      回复
                                  </div>
                              </div>
                         </div>
                      </div>
                  </div>
              </div>
              <div class="buttonwrapper">
              <div class="handleorderbutton">处置工单</div>
              <div class="ordersettingbutton">工单设置</div>
              </div>
              <div class="handleConditionWrapper">
                   <div class="handleCondition">
                       <div class="handlepersonn">王五</div>
                       <div class="handlecontent">已到现场进行处置</div>
                       <img src="~@/assets/img/deletex.png" alt="">
                   </div>
              </div>
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
</template>
<script>
export default {
    name: 'applyMessageJoiner'
}
</script>
<style lang="less" scoped>
  .applyMessageResponse {
      background-color: #F5F5F5;
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

  .handleorderdetail {
      background-color: #F5F5F5;
      position: relative;
      height: 82vh;
    .persontalk {
      .sender {
          display: flex;
          margin: 3.0vh 2.7vw 4.04vh 5.3vw;
        .content {
            width: 79.5vw;
            // height: 38.7vh;
            background-color: #FFFFFF;
            border-top-left-radius: 4vw;
            border-top-right-radius: 1vw;
            border-bottom-right-radius: 4vw;
            border-bottom-left-radius: 4vw;
            
          .contenttop {
            //   border-left: 0.3vw solid #DAD7D7;
              margin-left: 1.9vw;
              margin-top: 1.4vh;
            .contenttopheader {
                display: flex;
                margin-bottom: 1.3vh;
              span.circleblack {
                  font-size: 2.7vw;
                  color: #0091FF;
                  margin-top: 0.6vh;
                  margin-left: 1.9vw;

              }

              .handleordertitle {
                  width: 18.7vw;
                  height: 3.0vh;
                  font-size: 3.7vw;
                  color: #0091FF;
                //   margin-top: 1.3vh;
                  margin-left: 0.93vw;
              }

              .starttime {
                  width: 27.6vw;
                  height: 2.5vh;
                  font-size: 3.2vw;
                  color: #999999;
                  margin-left: 23.6vw;
                  margin-top: 0.3vh;

              }
            }

            .handleresult {
                // height: 2.25vh;
                width: 73.47vw;
                margin-left: 1.9vw;
                font-size: 2.9vw;
                color: #333333;

            }

            .handlepiccontainer {
                margin-top: 1.7vh;
                display: flex;
              img {
                width: 23.6vw;
                height: 8.8vh;
                margin-left: 1.9vw;
              }
            }
          }

          .contentbottom {
              width: 72vw;
            //   border-top: 0.15vh solid #DAD7D7;
            //   margin-top: 1.3vh;
              margin-left: 3.2vw;
            //   padding-top: 1.12vh;
            // .contentbottomheader {
            //     display: flex;
            //     justify-content: space-between;
            //   .responseordertitle {
            //       height: 2.5vh;
            //       font-size: 3.2vw;
            //       color: #666666;
            //   }

            //   .responsetime {
            //       height: 2.5vh;
            //       font-size: 3.2vw;
            //       color: #999999; 
            //   }
            // }

            // .responseresult {
            //     margin-top: 1.2vh;
            //     font-size: 2.1vw;
            //     color: #333333;

            // }

            .addresscontainer {
                margin-top: 1.9vh;
                display: flex;
                justify-content: space-between;
              .address {
                  height: 1.8vh;
                  font-size: 3.2vw; 
                  color: #999999;
                span.addressicon {
                    width: 2.316vw;
                    height: 1.6vh;
                    font-size: 2.316vw;
                    color: #CCCCCC;

                }
              }

              .responsebutton {
                  height: 2.1vh;
                  color: #0091FF;
                  font-size: 3.7vw;
                  margin-bottom: 3vh;

              }
            }
          }
        }

        .handleperson {
            width: 9.9vw;
            height: 5.5vh;
            background-color: #0BD295;
            font-size: 3.7vw;
            color: #FFFFFF;
            text-align: center;
            line-height: 5.5vh;
            border-radius: 50%;
            margin-left: 2.7vw;

        }
      }

      .receiver {
          display: flex;
        .leader {
            width: 9.9vw;
            height: 5.5vh;
            border-radius: 50%;
            font-size: 3.7vw;
            text-align: center;
            line-height: 5.5vh;
            color: #ffffff;
            background-color: #0091FF;
            margin-left: 2.7vw;
            margin-right: 2.7vw;
          .leadericon {

          }
        }

        .content {
            width: 79.5vw;
            background-color: #ffffff;
            border-top-left-radius: 1.5vw;
            border-top-right-radius: 5.9vw;
            border-bottom-right-radius: 5.9vw;
            border-bottom-left-radius: 5.9vw;
          .contenttop {
              margin-top: 1.3vh;
              margin-left: 1.5vw;
            //   border-left: 0.3vw solid #F0F0F0;
            .contenttopheader {
                display: flex;
                margin-bottom: 1.3vh;
              span.circleblack {
                  font-size: 2.7vw;
                  color: #0091FF;
                  margin-top: .8vh;
                  margin-left: 2.3vw;

              }

              .handleordertitle {
                //   margin-top: 1.3vh;
                  font-size: 3.7vw;
                  color:#0091FF;
                  margin-left: 0.9vw;

              }

              .starttime {
                  margin-left: 23.6vw;
                  margin-top: .5vh;
                  font-size: 3.2vw;
                  color: #999999;

              }
            }

            .handleresult {
                width: 73.47vw;
                margin-left: 1.9vw;
                font-size: 2.9vw;
                color: #333333;

            }

            .handlepiccontainer {
              img {

              }
            }
          }

          .contentbottom {
              width: 72vw;
              margin-left: 2.8vw;
            //   border-top: 0.15vh solid #F0F0F0;
             .addresscontainer {
                margin-top: 1.9vh;
                display: flex;
                justify-content: space-between;
              .address {
                  height: 1.8vh;
                  font-size: 3.2vw; 
                  color: #999999;
                span.addressicon {
                    width: 2.316vw;
                    height: 1.6vh;
                    font-size: 2.316vw;
                    color: #CCCCCC;

                }
              }

              .responsebutton {
                  height: 2.1vh;
                  color: #0091FF;
                  font-size: 3.7vw;
                  margin-bottom: 3vh;

              }
            }
          }
        }
      }
    }
    .buttonwrapper {
          display: flex;
          position: absolute;
          bottom: 10vh;
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
      .handleConditionWrapper {
          width: 100vw;
          position: absolute;
          bottom: 0vh;
          height: 9vh;
          background-color: rgba(255,255,255,1);

          .handleCondition {
              position: relative;
              height: 4.57vh;
              border-left: 0.27vw solid #F0F0F0;
              margin-top: 1.87vh;
              margin-left: 2.4vw;
              padding-left: 1.87vw;
              width: 93.47vw;
           .handlepersonn {
               height: 2.40vh;
               font-size: 3.07vw;
               color: rgba(153,153,153,1);

               }

          .handlecontent {
              height: 2.77vh;
              font-size: 3.47vw;
              color: rgba(153,153,153,1);

             }

        img {
            position: absolute;
            width: 4.27vw;
            height: 2.40vh;
            top: 0;
            right: 0;
         }
  }
}
  
  
  }
  .handlecontact {
      position: fixed;
      left: 0;
      right: 0;
      bottom: 0;
    //   height: 7.12vh;
      border-top: 0.15vh solid #747474;
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
  
</style>