<template>
  <div class="workordermanager">
      <div style="position: fixed;width: 100%;top: 0%;z-index: 996;">
        <div class="mainheader">
            <!-- 选择框 -->
            <div class="choose" @click="refreshOrderList">
              筛选
            </div>
            <!-- <div class="inputcontainer">
              <span class="iconfont iconsousuo searchicon"></span>
              <input type="text" v-model="ordervalue" placeholder="请输入搜索关键字">
            </div> -->
            <div class="inputcontainer">
              <van-search v-model="ordervalue" placeholder="请输入搜索关键字" />
            </div>
            <!-- 选择框结束 -->
        </div>
        <div class="selectdate" @click="chooseTime">
          <!-- <select name="" id="" class="choosedate" v-model="timeChoose">
            <option value="1">2020-03-23</option>
          </select> -->
          <div class="choosedate">
              {{startTime + '' + endTime == ''?'请选择开始时间和结束时间': 
              `${startTime}至
                ${endTime}`}}
          </div>
          <div class="iconfont iconxiasanjiaoxing triangle"></div>
        </div>
        <div class="mainhandle" style="white-space: nowrap;overflow: auto;" @click="handleClickStatus">
            <div :class="{'active-status':status==''}">全部：{{allStatusNumber}}</div>
            <div :class="{'active-status':status=='4'}">待签收：{{toBeSignedNumber}}</div>
            <div :class="{'active-status':status=='0'}">处置中：{{handleingNumber}}</div>
            <div :class="{'active-status':status=='5'}">审核中：{{underReviewNumber}}</div>
            <div :class="{'active-status':status=='1'}">已处置：{{alreadyHandleNumber}}</div>
            <div :class="{'active-status':status=='3'}">已挂账：{{alChargeNumber}}</div>
            <div :class="{'active-status':status=='0'}">已剔除：{{eliminatedNumber}}</div>


            <!-- <div :class="{'active-status':status=='0'}">处置中：{{handleingNumber}}</div>
            <div :class="{'active-status':status=='1'}">已处置：{{alreadyHandleNumber}}</div>
            <div :class="{'active-status':status=='-1'}">已取消：{{alreadyCancelNumber}}</div>
            <div :class="{'active-status':status=='4'}">待签收：{{toBeSignedNumber}}</div>
            <div :class="{'active-status':status=='2'}">已退件：{{alReturnNumber}}</div>
            <div :class="{'active-status':status=='3'}">已挂账：{{alChargeNumber}}</div> -->
        </div>
      </div>
      <van-list
        v-model="loading"
       @load="onLoad"
      :finished="finished"
       finished-text="没有更多了"
       style="margin-top: 21vh;"
       >
          <div class="maincontent">
              <div class="contentslide" v-for="(item,index) in orderList" :key="index" @click="enterOrderDetail(item.id)">
                <div class="toptitle">
                      <div class="lefttitle">
                            {{item.name}}
                      </div>
                      <div class="righttitle">
                            {{item.workModuleString}}
                      </div>
                      <van-icon v-if="item.isMine" name="passed" color="green" style="margin-top: 2.8vh; margin-left: 1.6vw;" />
                </div>
                <div class="centerdesc">
                      <span class="leftdes">
                          {{item.workPropertyString}}
                      </span>
                      <span class="rightdes">
                          {{item.remark}}
                      </span>
                </div>
                <!-- <div style="display: flex;justify-content: space-evenly;margin: 1vh 0px;">
                  <img v-for="(imgItem) in item.documentList" :key="imgItem.id" :src="imgItem.allUrl" style="width: 45%;height: 12vh;">
                </div> -->
                <div class="footerdesc">
                      <div class="footpic" v-if="item.imgList.length !== 0">
                        <img v-for="(item2,index2) in item.imgList" :key="index2" :src="item2.allUrl" alt="" >
                      </div>
                      <div class="footlink" v-if="item.fileList.length !== 0">
                        <a href="#" v-for="(item3,index3) in item.fileList" :key="index3">{{item3.documentName}}</a>
                      </div>
                      <div class="foottitle">
                        <div class="leftfooter">
                            {{item.gmtCreate}}
                        </div>
                        <div class="rightfooter">
                          <span class="iconfont icondingwei addressicon"></span>
                            {{item.workPlace}}
                        </div>
                      </div>
                </div>
                <div class="handlepicture">
                    <img src="~@/assets/img/alreadyhandle.png" alt="" v-if="item.status == 1">
                    <img src="~@/assets/img/Handleing.png" alt="" v-else-if="item.status == 0">
                    <img src="~@/assets/img/alreadyCancel.png" alt="" v-else-if="item.status == -1">
                    <img src="~@/assets/img/toBeSigned.png" alt="" v-else-if="item.status == 4">
                    <img src="~@/assets/img/alReturn.png" alt="" v-else-if="item.status == 2">
                    <img src="~@/assets/img/alCharge.png" alt="" v-else-if="item.status == 3">
                    <img src="~@/assets/img/underReview.png" alt="" v-else-if="item.status == 5">
                    <img src="~@/assets/img/eliminated.png" alt="" v-else-if="item.status == 6">
                </div>
              </div>
          </div>
      </van-list>
      <!-- <van-pagination v-model="currentPage" :page-count="totalPage" mode="simple" @change="pageChange"/> -->
     
      <!-- 选择开始时间 -->
      <van-datetime-picker
         v-if="showTime"  
         v-model="currentDate"
         type="date"
         title="选择开始时间"
         :max-date="maxDate"
         @cancel="handleCancel"
         @confirm="handleConfirm"
       />
       <!-- 选择结束时间 --> 
       <van-datetime-picker
         v-if="showEndTime"  
         v-model="currentEndDate"
         type="date"
         title="选择结束时间"
         :max-date="maxDate"
         @cancel="handleEndCancel"
         @confirm="handleEndConfirm"
       />
  </div>
  

</template>
<script>
export default {
  name: 'workordermanager',
  data() {
    return {
      currentPage: 0,//当前页
      showEndTime: false,//展示结束时间选择器
      showTime: false,//展示时间选择器
      totalPage: 0,//总页数
      limit: 10,
      ordervalue: '',
      timeChoose: '请选择时间',
      orderList: [],//工单列表
      // minDate: new Date(2020, 0, 1),
      maxDate: new Date(),
      currentDate: new Date(),
      currentEndDate: new Date(),
      startTime: '',
      endTime: '',
      handleingNumber: 0,
      alreadyHandleNumber: 0,
      alreadyCancelNumber: 0,
      allStatusNumber: 0,
      toBeSignedNumber: 0,
      alReturnNumber: 0,
      alChargeNumber: 0,
      underReviewNumber: 0,
      eliminatedNumber: 0,
      status: '',
      loading: false,
      finished: false,//加载未完成
      userId: ''
    }
  },
  created() {
        // localStorage.setItem('token','WX_4f568d966b8361c18a7f81fcd0c94bac')
        // localStorage.setItem('token',"WX_1df4d7de4fbaec202068a9c913ff157f")
        this.onLoad();
        this.userId = parseInt(localStorage.getItem('contactorId'));
  },
  methods: {
    // getWordOrderList() {
    //   this.$http({
    //         url: this.$http.adornUrl('/work/workSheet/wechatList'),
    //         method: 'post',
    //         data: this.$http.adornData({
    //        "page": 1,
    //        "limit": this.limit,
    //        "groupIds": [],
    //      "startTime": this.startTime,
    //      "endTime": this.endTime,
    //      "module": "",
    //      "property": "",
    //      "status": this.status,
    //      "type": "",
    //      "search": this.ordervalue
    //         })
    //       }).then(({ data }) => {
    //         let imgList = []
    //         let fileList = []
             
    //         data.page.list.forEach((item) => {
    //           if(item.documentList !== null) {
    //           item.documentList.forEach((item2) => {
    //                 if(/(.png|.jpg)$/.test(item2.url)) {
    //                     imgList.push(item2)
    //                 }else {
    //                     fileList.push(item2)
    //                 }
    //           })
    //           }
    //           item.imgList = imgList
    //           item.fileList = fileList
    //           imgList =  []
    //           fileList = []
    //         })
    //         this.currentPage = data.page.currPage
    //         this.orderList = data.page.list
    //         this.totalPage = data.page.totalPage
    //          this.getWorkOrderStatus();
    //       });
    // },
    onLoad() {

       
       this.currentPage = this.currentPage +1
       this.$http({
            url: this.$http.adornUrl('/work/workSheet/wechatList'),
            method: 'post',
            data: this.$http.adornData({
           "page":this.currentPage,
           "limit":this.limit,
           "groupIds":[],
         "startTime":this.startTime,
         "endTime":this.endTime,
         "module":"",
         "property":"",
         "status":this.status,
         "type":"",
         "search": this.ordervalue
            })
          }).then(({ data }) => {
             console.log("/work/workSheet/wechatList data",data)
             if(data.code==0) {
              let imgList = []
              let fileList = []
              data.page.list.forEach((item) => {
                if(item.documentList !== null) {
                item.documentList.forEach((item2) => {
                      if(/(.png|.jpg)$/.test(item2.url)) {
                          imgList.push(item2)
                      }else {
                          fileList.push(item2)
                      }
                })
                }
                item.imgList = imgList
                item.fileList = fileList
                imgList =  []
                fileList = []
              })
              this.totalPage = data.page.totalPage
              console.log('this.orderList',this.orderList)
                this.orderList = this.orderList.concat(data.page.list);
                // if(this.status=='0'||this.status=='5') {
                  this.orderList.forEach(item=>{
                    item.allContactorList&&item.allContactorList.forEach(contactorItem=>{
                      if((contactorItem.type=='2'||contactorItem.type=='5'||contactorItem.type=='6'||contactorItem.type=='7')&&contactorItem.workHandleResponseEntities&&contactorItem.workHandleResponseEntities.length!=0&&contactorItem.contactorId==this.userId) {
                        item.isMine = true;
                      }
                    })
                  })
                  
                // }

                this.getWorkOrderStatus();
                this.loading = false;
                
                if(this.currentPage> this.totalPage) {
                    this.finished = true
                    return
                }
             }
          })

    },
    getWorkOrderStatus() {
      this.$http({
        url: this.$http.adornUrl('/work/workSheet/countByType'),
        method: 'post',
        data: this.$http.adornData({
          "startTime": this.startTime,
          "endTime": this.endTime,
          "search": this.ordervalue
        })
      }).then(({ data }) => {
        console.log('/work/workSheet/countByType data',data)
        if(data.code==0) {
          this.handleingNumber = data.data.disposal?data.data.disposal:0;
          this.alreadyHandleNumber = data.data.disposed?data.data.disposed:0;
          this.alreadyCancelNumber = data.data.cancel?data.data.cancel:0;
          this.toBeSignedNumber = data.data.sign?data.data.sign:0;
          this.alReturnNumber = data.data.returned?data.data.returned:0;
          this.alChargeNumber = data.data.charge?data.data.charge:0;
          this.allStatusNumber = data.data.all?data.data.all:0;
          this.underReviewNumber = data.data.all?data.data.underReview:0;
          this.eliminatedNumber = data.data.all?data.data.charged:0;
        }
      });
    },
    handleClickStatus(e) {
      console.log('handleClickStatus e',e)
      this.currentPage=0;
      this.orderList = []
      let status = e.target.innerText
      this.finished = false
      if(status.search('全部')!=-1) {
        this.status = ''
      } else if(status.search('处置中')!=-1) {
        this.status = '0'
      } else if(status.search('已处置')!=-1) {
        this.status = '1'
      } else if(status.search('已取消')!=-1) {
        this.status = '-1'
      } else if(status.search('待签收')!=-1) {
        this.status = '4'
      } else if(status.search('已退件')!=-1) {
        this.status = '2'
      } else if(status.search('已挂账')!=-1) {
        this.status = '3'
      }
      this.onLoad();
    },
    pageChange() {//当当前页发生改变触发
      // this.getWordOrderList();
    },
    handleConfirm() {
       //console.log('选择的时间为',this.currentDate.toLocaleDateString().replace(/\//g,'-'))
       let time = this.currentDate.toLocaleDateString().replace(/\//g,'-')
       let timeArr = time.split('-')
       //console.log('timeArr',timeArr)
       timeArr.forEach((item,index) => {
           if(parseInt(item)<10) {
             timeArr[index] = '0'+item
            
           }
       })
       //console.log('改变后的timeArr',timeArr)
       let trueTime = timeArr.join('-')
       //console.log('真正的时间是',trueTime)
       this.startTime = trueTime
       this.showTime = false
       this.showEndTime = true
    },
    handleEndConfirm() {//结束时间确认
       //console.log('选择的时间为',this.currentEndDate.toLocaleDateString().replace(/\//g,'-'))
       let time = this.currentEndDate.toLocaleDateString().replace(/\//g,'-')
       let timeArr = time.split('-')
       //console.log('timeArr',timeArr)
       timeArr.forEach((item,index) => {
           if(parseInt(item)<10) {
             timeArr[index] = '0'+item
            
           }
       })
       //console.log('改变后的timeArr',timeArr)
       let trueTime = timeArr.join('-')
       //console.log('真正的时间是',trueTime)
       this.endTime = trueTime
       this.showEndTime = false
    },
    handleCancel() {
       this.showTime = false
       this.startTime = ''
       this.endTime = ''
    },
    handleEndCancel() {
       this.showEndTime = false
    },
    chooseTime() {//点击选择时间按钮
         this.showTime = true
    },
    refreshOrderList() {
      this.totalPage = 0
      this.orderList = []
      this.currentPage = 0
      this.finished = false
      this.onLoad();
    },
    enterOrderDetail(id) {
        localStorage.setItem('workId',id)
        this.$router.push({name: 'orderdetail',params: {id: id}})
    }
  }
}
</script>
<style lang="less" scoped>

    
    .workordermanager {
      background-color: #F5F5F5;
    .mainheader {
      background-color: #fff;
      /* margin-top: 4vw; */
      display: flex;
      height: 6.7vh;
      align-items: center;
      padding-bottom: 2.15vh;
      .choose {
      width: 7.5vw;
      // font-size: 0.28rem;
      font-size: 0.24rem;
      font-family:PingFangSC-Regular,PingFang SC;
      font-weight:800;
      color:rgba(0,145,255,1);
      height: auto;
      margin: 3.2vw 4.1vw 3.5vw 6vw;
       }
      // .inputcontainer {
      // display: flex;
      // width: 78vw;
      // margin-top: 2.7vw;
      // background-color: #F2F2F2;
      // border-radius: 2vw;
      // height: 3.7vh;
      //   .searchicon {
      //     font-size:.28rem;
      //     font-family:SFCompactDisplay-Regular,SFCompactDisplay;
      //     font-weight:800;
      //     color:rgba(153,153,153,1);
      //     padding: 1vh 1.5vw 0.6vh 2.1vw;

      //      }
      //   input {
      //           border: none;
      //           background-color: #F2F2F2;
      //           width: 80%;
      //           height: 3.5vh;
      //           font-size:0.28rem;
      //            font-family:PingFangSC-Regular,PingFang SC;
      //            font-weight:400;
      //            color:rgba(153,153,153,1);
      //           // line-height: 3.5vh;
      //           &::placeholder {
      //            font-size:0.28rem;
      //            font-family:PingFangSC-Regular,PingFang SC;
      //            font-weight:400;
      //            color:rgba(153,153,153,1);
      //           }
      //        }
      //  }
      .van-search {
        width: 78vw;
        padding-bottom: 0;
      }
    }
    .selectdate {
            // width: 30vw;
            display: flex;
            // height: 4.5vh;
            // margin-top: 1.5vh;
            // margin-left: 4.8vw;
            text-align: center;
            line-height: 4.5vh;
            // background-color: #FFFFFF;
            border-radius: 3.5vw;
            background:rgba(248,248,248,1);
            justify-content: center;
            align-items: center;
            font-size:0.24rem;
            font-family:Roboto-Medium,Roboto;
            font-weight:1000;
            color:rgba(51,51,51,1);
            padding: .6vh;
        .choosedate {
            // width: 80%;
            height: 100%;
            font-size:0.24rem;
            font-family:Roboto-Medium,Roboto;
            font-weight:1000;
            color:rgba(51,51,51,1);
            // border-radius: 3.5vw;
            border: none;
            padding-left: 3.5vw;
            font-size: 3.2vw;
            padding: .45vh;
           }
        .triangle {

        }
         }
    .mainhandle {
      background-color: #fff;
      display: flex;
      // height: 7.5vh;
      font-size: 0.28rem;
      color:rgba(153,153,153,1);
      & > div {
        margin: 1vh 8vw;
      }
      .active-status {
        color: #0091ff;
      }
    } 
    .maincontent {
        .contentslide {
          position: relative;
        width: 94.7vw;
        // height: 33.7vh;
        height: auto;
        margin: 1.5vh 2.7vw;
        background-color: #fff;
        .toptitle {
            display: -webkit-box;
            .lefttitle {
              width: 190px;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
              height: 3.4vh;
              margin-top: 2.4vh;
              margin-left: 4.3vw;
              font-size:0.32rem;
              font-family:PingFangSC-Medium,PingFang SC;
              font-weight:1000;
              color:rgba(51,51,51,1);

            }
            .righttitle {
              width: 15,7vw;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
              height: 2.7vh;
              margin-top: 2.8vh;
              background-color: #FFBB96;
              margin-left: 1.6vw;
              font-size:0.24rem;
              font-family:PingFangSC-Regular,PingFang SC;
              font-weight:400;
              color:rgba(255,122,69,1);
            }

        }
        .centerdesc {
          font-size: 3.7vw;
          color: #666666;
          padding-left:4.3vw;
          padding-right: 4.3vw;
          .leftdes {
            width: 22.4vw;
            height: 2.7vh;
            text-align: center;
            background-color: #E6EFFF;
            margin-top: 1.6vh;
            display: inline-block;
            font-size:0.24rem;
            font-family:PingFangSC-Regular,PingFang SC;
            font-weight:800;
            color:rgba(0,145,255,1);
          }
         .rightdes {
           font-size:0.28rem;
           font-family:PingFangSC-Regular,PingFang SC;
           font-weight:400;
           color:rgba(102,102,102,1);
         }
          

        }
        .footerdesc {
          padding-top: 1.5vh;
          padding-right: 4.3vw;
          padding-left: 4.3vw;
          .footpic {
            display: flex;
            img {
              width: 41.7vw;
              height: 13.2vh;
              &:nth-child(2) {
                margin-left: 2.7vw;
              }
            }
          }
          .footlink {
            margin-top: 1.3vh;
            height: 2.5vh;
            line-height: 2.5vh;
            a {
              text-decoration: none;
              color: #0091FF;
              font-size: 3.2vw;
            }
          }
          .foottitle {
            display: flex;
            justify-content: space-between;
            padding-top: 1.5vh;
            padding-bottom: 1.5vh;
            .leftfooter {
              // width: 18vw;
              height: 2.5vh;
              // font-size: 3.2vw;
              // color: #999999;
              flex: 2;
              font-size:0.24rem;
              font-family:PingFangSC-Regular,PingFang SC;
              font-weight:400;
              color:rgba(153,153,153,1);

            }
            .rightfooter {
              flex: 3;
              overflow: hidden;
              text-overflow: ellipsis;
              display: -webkit-box;
              line-height: 2.5vh;    
              max-height: 2.5vh;
              -webkit-line-clamp: 1;
              -webkit-box-orient: vertical;
              height: 2.5vh;
              font-size:0.24rem;
              font-family:PingFangSC-Regular,PingFang SC;
              font-weight:400;
              color:rgba(153,153,153,1);
              // line-height: 2.5vh;
              // font-size: 3.2vw;
              // color: #999999;
               .addressicon {
                 width: 2.316vw;
                 height: 1.558vh;
                 font-size: 2.316vw;
                 color: #CCCCCC;
               }
            }
          }

        }
            .handlepicture img{
              width: 10.7vw;
              height: 6vh;
              position: absolute;
              top: 0;
              right: 0;
            }
      }
    }
    /deep/ .van-picker {
       position: fixed;
       bottom: 0;
       left: 0;
       right: 0;
    }
  }
</style>