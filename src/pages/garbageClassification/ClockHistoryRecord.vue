<!--
 * @Author: yaoweixin
 * @Date: 2020-09-17 14:55:09
 * @LastEditors: yaoweixin
 * @LastEditTime: 2020-12-22 16:43:11
 * @Description: 考勤记录
 * @FilePath: \vue-cli-multiPage-master\src\pages\garbageClassification\ClockHistoryRecord.vue
-->
<template>
    <div class="clockHistoryRecord">    
        <div class="detailWrapper">
            <div class="chooseDateWrapper" >
                <div class="dateWrapper" @click="showChooseDate = true">
                    <div class="dateText" >{{dateContent}}</div>
                    <img src="~@/assets/img/topExpand.png" alt="" >
                </div>
                <div class="chooseButton" @click="queryClockHistoryByTime">筛选</div>
            </div>
           
            <div class="line"></div>
             <div class="cleanHistoryWrapper">
            <div class="cleanDetail">
                <div class="cleanTimesWrapper">
                    <div class="cleanTimes">{{clockClassTime}}</div>
                    <div class="cleanTimesText">考勤班次（早班）</div>
                </div>
                <div class="cleanerWrapper">
                    <div class="cleaner">{{clockMember}}</div>
                    <div class="cleanerText">考勤人次</div>
                </div>
            </div>
            <div class="cleanDetail">
                <div class="cleanTimesWrapper">
                    <div class="cleanTimes">{{clockClassLaterTime}}</div>
                    <div class="cleanTimesText">考勤班次（晚班）</div>
                </div>
                <div class="cleanerWrapper">
                    <div class="cleaner">{{clockLaterMember}}</div>
                    <div class="cleanerText">考勤人次</div>
                </div>
            </div>
            </div>
            <img src="~@/assets/img/leftBackground.png" alt="" class="leftImg">
            <img src="~@/assets/img/rightBackground.png" alt="" class="rightImg">
       </div>
        <div class="keepBarrelDetailWrapper">
            <van-collapse v-model="activeNames">
                <van-collapse-item v-for="(item,index) in clockRecordList" :key="index" :name="index">
                    <template #title>
                      <div class="clockClass">考勤班次：{{item.punchClockDay.split('##')[0]}}</div>
                     <div class="titleWrapper">
                         <div class="keepBarrelClass">
                           考勤人员： {{item.punchClockDay.split('##')[1]}}
                           <a :href="'tel:'+ item.garbagePunchClockList[0].memberEntity.phone">
                           <img src="~@/assets/img/personPhone.png" alt="">
                           </a>
                           </div>
                          <div class="line"></div>
                         <div class="keepBarrelTime">考勤时长: {{item.restTime}}小时</div>
                     </div>
                    </template>
                    <div class="shrinkContent" v-for="(pItem,pIndex) in item.garbagePunchClockList" :key="pIndex">
                        <div class="topContent" v-if="pItem.type == '1' || pItem.type == '3'">
                            <div class="attendanceTimeWrapper">
                                <div class="attendanceTime">{{pItem.punchclockTime}}</div>
                                <div class="status1">签到</div>
                            </div>
                            <div class="imgWrapper">
                                <img v-for="(imgItem,imgIndex) in pItem.imgList" :key="imgIndex" :src="imgItem.allUrl" alt="" @click="showPreviewImage(imgItem.allUrl)">
                            </div>
                            <div class="attendanceRemark">
                                <div class="remarkTitle">签到备注:</div>
                                <div class="remarkContet">{{pItem.remark}}</div>
                            </div>
                            <div class="locationWrapper">
                            <img src="~@/assets/img/unLocation.png" alt="">
                            <div class="locationTitle">{{pItem.place}}</div>
                            </div>
                        </div>
                        <div class="bottomContent" v-if="pItem.type == '2' || pItem.type == '4'">
                            <div class="attendanceTimeWrapper">
                                <div class="attendanceTime">{{pItem.punchclockTime}}</div>
                                <div class="status2">离岗</div>
                            </div>
                            <div class="imgWrapper">
                                <img v-for="(img2Item,img2Index) in pItem.imgList" :key="img2Index" :src="img2Item.allUrl" alt="" @click="showPreviewImage(img2Item.allUrl)">
                            </div>
                            <div class="attendanceRemark">
                                <div class="remarkTitle">备注:</div>
                                <div class="remarkContet">{{pItem.remark}}</div>
                            </div>
                             <div class="locationWrapper">
                            <img src="~@/assets/img/unLocation.png" alt="">
                            <div class="locationTitle">{{pItem.place}}</div>
                            </div>
                        </div>
                        <!-- <div class="unBottomContent">
                            <div class="statusCard">离岗未打卡</div>
                        </div> -->
                        
                    </div>
                </van-collapse-item>
            </van-collapse>
        </div>
         <!-- 时间选择器 -->
       <div class="chooseDateDialog">
           <van-popup v-model="showChooseDate" position="bottom">
               <div class="headerWrapper">
                   <img src="~@/assets/img/closeDialog.png" alt="" @click="showChooseDate = false">
                   <div class="titleText">选择时间</div>
                   <div class="confirmButton" @click="confirmDate">确定</div>
               </div>
               <div class="chooseSlide">
                   <div class="accordingMonth" @click="chooseAccurateDate('month')" :class="{activeDate: dateMark == 'month'}">按月</div>
                   <div class="accordingYear" @click="chooseAccurateDate('year')" :class="{activeDate : dateMark == 'year'}">按年</div>
               </div>
            <div class="chooseYearMonth" v-if="dateMark == 'month'">
                <van-datetime-picker
                    v-model="currentYearMonth"
                    type="year-month"
                    :min-date="minDate"
                    :max-date="maxDate"
                    :formatter="formatterYearMonth"
                    :show-toolbar='false'
                    />
            </div>
            <div class="chooseYear" v-if="dateMark == 'year'">
                    <van-datetime-picker
                    v-model="currentYear"
                    type="date"
                    :columns-order="['month','year','day']"
                    :min-date="minYearDate"
                    :max-date="maxYearDate"
                    :formatter="formatterYear"
                    :show-toolbar='false'
                    />
            </div>
           </van-popup>
    </div>
    <imagePreview
      ref="previewImage"
      :enlargeImageUrl="enlargeImageUrl"
    ></imagePreview>
    </div>
</template>
<script>
import imagePreview from "../gradeResponse/imagePreview";
export default {
    name: 'clockHistoryRecord',
    data() {
        return {
            enlargeImageUrl: [],//预览图片路径
            clockClassTime: '',//考勤早班次时间
            clockMember: '',//考勤早人次
            clockClassLaterTime: '',//考勤晚班次时间
            clockLaterMember: '',//考勤晚人次
            dateContent: '请选择时间',
            trueDate: new Date(),//点击筛选所控制得日期
            dateMark: 'month',//控制按年或者按月筛选日期
            showChooseDate: false,//控制年份筛选弹框得展示
            minDate: new Date(2020, 0, 1),
            maxDate: new Date(2025, 10, 1),
            minYearDate: new Date(2020,0,1),
            maxYearDate: new Date(2025,10,1),
            currentYearMonth: new Date(),
            currentYear: new Date(),
            activeNames: [],//默认展开的一栏
            mark: 'all',//点击哪个日期进行筛选
            clockRecordList: [],//历史考勤记录
            classifyPlace: '',//分类点位置
        }
    },
    methods: {
      /**
     * @description: 显示放大的预览图
     * @param {String} imgurl 被点击的图片传递进来的图片路径
     * @return {}
     */
    showPreviewImage(imgurl) {
      this.enlargeImageUrl = [];
      this.enlargeImageUrl.push(imgurl);
      this.$refs.previewImage.previewShow = true;
    },
      confirmDate() {
            if(this.dateMark == 'month') {
                this.trueDate = this.currentYearMonth
                var month = this.trueDate.getMonth() + 1
                this.dateContent = this.trueDate.getFullYear() + '年' + month + '月'
            }
            if(this.dateMark == 'year') {
                this.trueDate = this.currentYear
                this.dateContent = this.trueDate.getFullYear() + '年'
            }
            this.showChooseDate = false
        },
        /**
         * @description: 点击按年或者按月按钮
         * @param {type} params
         * @return {type} 
         */
        chooseAccurateDate(mark) {
            this.dateMark = mark
        },
        formatterYearMonth(type, val) {
            if (type === 'year') {
                return `${val}年`;
            } else if (type === 'month') {
                return `${val}月`;
            }
            return val;
            },
        formatterYear(type, val) {
            
            if (type === 'month') {
                return '';
            }
            if (type === 'year') {
                return `${val}年`;
            }
            if (type === 'day') {
                return '';
            }
            return val;
            },
      /**
         * @description: 点击日期条件进行筛选
         * @param {int} 标识选中得日期
         * @return {type} 
         */
        chooseDate(mark) {
           this.mark = mark 
        },
         /**
         * @description: 根据时间查询对应的考勤历史记录
         * @param {type} params
         * @return {type} 
         */
        queryClockHistoryByTime() {
          let classifyId = localStorage.getItem('classifyId')
           this.classifyPlace = localStorage.getItem('classifyName')
           var startTime = ''
           var endTime = ''
             if(this.dateMark == 'month') {
                 startTime = this.getCurrentMonthFirst(this.trueDate)
                 endTime = this.getCurrentMonthLast(this.trueDate)
            }else if(this.dateMark == 'year') {
                 startTime = this.getYearFirst(this.trueDate)
                 endTime = this.getYearLast(this.trueDate)
            }
             this.$http({
            url: this.$http.adornUrl(`/garbage/garbagePunchClock/recordCountBySortPoint?id=${classifyId}`),
            method: 'get',
            params: this.$http.adornParams({
            })
          }).then(({data}) => {
            if(data && data.code == 0) {
              //console.log('考勤班次为',data)
              this.clockClassTime = data.data[0] ? data.data[0].shiftStartTime + '-' + data.data[0].shiftEndTime : ''
              this.clockMember = data.data[0] ? data.data[0].count : ''
              this.clockClassLaterTime = data.data[1] ? data.data[1].shiftStartTime + '-' + data.data[1].shiftEndTime : ''
              this.clockLaterMember = data.data[1] ? data.data[1].count : ''
            }else {
              alert('获取考勤班次失败')
            }
            
          })
           this.$http({
                url: this.$http.adornUrl(`/garbage/garbagePunchClock/getPunchClockByPointAndMember`),
                method: "post",
                data: this.$http.adornData({
                  pointId: classifyId,
                  startTime: startTime,
                  endTime: endTime
                }),
            }).then(({data}) => {
              if(data && data.code === 0) {
                //console.log('考勤历史记录为',data)
                
                 data.data.forEach((historyItem) => {
                   var restTime = 0
                    var startTime = 0
                     var endTime = 0
                   historyItem.garbagePunchClockList.forEach((item,index,arr) => {
                     
                     if(item.type == "1") {
                       startTime = new Date(item.punchclockTime).getTime()
                     }
                     if(item.type == '2' && index == arr.length - 1) {
                       endTime = new Date(item.punchclockTime).getTime()
                     }
                   })
                   if(startTime && endTime) {
                   restTime = ((endTime-startTime)/(1000*60*60)).toFixed(2)
                   } else {
                     restTime = '0'
                   }
                   historyItem.restTime = restTime
                })
                this.clockRecordList = data.data
              } else {
                alert('获取考勤历史记录失败')
              }
            })

        },
        /**
         * @description: 获取当前月份的第一天
         * @param {type} params
         * @return {type} 
         */
        getCurrentMonthFirst(chooseDate){
        var date = chooseDate;
        date.setDate(1);
        var month = parseInt(date.getMonth()+1);
        var day = date.getDate();
        if (month < 10) {
            month = '0' + month
        }
        if (day < 10) {
            day = '0' + day
        }
        return date.getFullYear() + '-' + month + '-' + day + ' ' + '00:00:00';
        },
        /**
         * @description: 获取当前月份的最后一天
         * @param {type} params
         * @return {type} 
         */
        getCurrentMonthLast(chooseDate){
        var date= chooseDate;
        var currentMonth=date.getMonth();
        var nextMonth=++currentMonth;
        var nextMonthFirstDay=new Date(date.getFullYear(),nextMonth,1);
        var oneDay=1000*60*60*24;
        var lastTime = new Date(nextMonthFirstDay-oneDay);
        var month = parseInt(lastTime.getMonth()+1);
        var day = lastTime.getDate();
        if (month < 10) {
            month = '0' + month
        }
        if (day < 10) {
            day = '0' + day
        }
        return date.getFullYear() + '-' + month + '-' + day + ' ' + '23:59:59';
        },
        /**
         * @description: 获取当前年份的第一天
         * @param {type} params
         * @return {type} 
         */
        getYearFirst(chooseDate) {
            var nowDay = chooseDate
            var nowYear = nowDay.getFullYear()
            return nowYear + '-01-01 00:00:00'
        },
        /**
         * @description: 获取当前年份的最后一天
         * @param {type} params
         * @return {type} 
         */
        getYearLast(chooseDate) {
            var nowDay = chooseDate
            var nowYear = nowDay.getFullYear()
            return nowYear + '-12-31 23:59:59'
        },
        /**
         * @description: 获取当前的时间
         * @param {type} params
         * @return {type} 
         */
        getNowDate() {
          var nowTime = new Date().toLocaleDateString().split('/')
          nowTime[1] = parseInt(nowTime[1]) < 10 ? '0' + nowTime[1] : nowTime[1]
          nowTime[2] = parseInt(nowTime[2]) < 10 ? '0' + nowTime[2] : nowTime[2]
          var time = new Date().toTimeString().split(' ')[0]
          return nowTime.join('-') + ' ' + time
        }
    },
    created() {
      let classifyId = localStorage.getItem('classifyId')
      this.classifyPlace = localStorage.getItem('classifyName')
      var now = new Date()
      var nowYear = (now.getMonth() + 1) < 10 ? ('0' + (now.getMonth() + 1)): (now.getMonth() + 1)
      this.dateContent = now.getFullYear() + '年' + nowYear + '月'
      var startTime = this.getCurrentMonthFirst(now)
      var endTime = this.getNowDate()
       this.$http({
            url: this.$http.adornUrl(`/garbage/garbagePunchClock/recordCountBySortPoint?id=${classifyId}`),
            method: 'get',
            params: this.$http.adornParams({
            })
          }).then(({data}) => {
            if(data && data.code == 0) {
              //console.log('考勤班次为',data)
              this.clockClassTime = data.data[0] ? data.data[0].shiftStartTime + '-' + data.data[0].shiftEndTime : ''
              this.clockMember = data.data[0] ? data.data[0].count : ''
              this.clockClassLaterTime = data.data[1] ? data.data[1].shiftStartTime + '-' + data.data[1].shiftEndTime : ''
              this.clockLaterMember = data.data[1] ? data.data[1].count : ''
            }
            
          })
      this.$http({
                url: this.$http.adornUrl(`/garbage/garbagePunchClock/getPunchClockByPointAndMember`),
                method: "post",
                data: this.$http.adornData({
                  pointId: classifyId,
                  startTime: startTime,
                  endTime: endTime
                }),
            }).then(({data}) => {
              if(data && data.code === 0) {
                
                //console.log('考勤历史记录为',data)
                data.data.forEach((historyItem) => {
                      var restTime = 0
                      var startTime = 0
                      var endTime = 0
                   historyItem.garbagePunchClockList.forEach((item,index,arr) => {
                     if(item.type == "1") {
                       startTime = new Date(item.punchclockTime).getTime()
                     }
                     if(item.type == '2' && index == arr.length - 1) {
                       endTime = new Date(item.punchclockTime).getTime()
                     }
                   })
                   if(startTime && endTime) {
                   restTime = ((endTime-startTime)/(1000*60*60)).toFixed(2)
                   }else {
                     restTime = '0'
                   }
                   historyItem.restTime = restTime
                })
                this.clockRecordList = data.data
              }
            })
    },
     components: {
    imagePreview,
    },
}
</script>
<style lang="less" scoped>
.clockHistoryRecord {
  padding: 0 .2rem;
  .detailWrapper {
    width: 7.1rem;
    height: 3.65rem;
    font-size: .32rem;     
    background: linear-gradient(338deg, #65BCFF 0%, #2B80FF 100%);
    box-shadow: 0rem .05rem .2rem 0rem rgba(53, 53, 57, 0.08);
    border-radius: .08rem;
    position: relative;
    margin-top: .2rem;
    box-sizing: border-box;
    padding-top: .2rem;
    .chooseDateWrapper {
        display: flex;
        justify-content: space-between;
         padding-left: .42rem;
      .dateWrapper {
          display: flex;
          align-items: center;
          z-index: 2;
        .dateText {       
            font-size: .32rem;
            font-family: PingFangSC-Medium, PingFang SC;
            font-weight: 500;
            color: #FFFFFF;
            text-shadow: 0rem .05rem .2rem rgba(53, 53, 57, 0.08);
        }

        img {
            width: .38rem;
            height: .38rem;
            margin-top: .1rem;
        }
      }
     //筛选按钮
      .chooseButton {
            width: .88rem;
            height: .46rem;
            box-shadow: 0rem .05rem .2rem 0rem rgba(53, 53, 57, 0.08);
            border-radius: .23rem;
            border: .01rem solid #FFFFFF;           
            font-size: .28rem;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #FFFFFF;
            text-shadow: 0rem .05rem .2rem rgba(53, 53, 57, 0.08);
            text-align: center;
            line-height: .46rem;
            margin-right: .41rem;
            z-index: 2;
      }
    }

   //分割线
    .line {
    width: 100%;
    height: .01rem;
    background: rgba(255, 255, 255, 0.4);
    box-shadow: 0rem .05rem .2rem 0rem rgba(53, 53, 57, 0.08); 
    margin-top: .2rem;
    }
     .cleanHistoryWrapper{
    .cleanDetail {
      display: flex;
      justify-content: space-between;
       &:nth-child(2) {
          margin-top: .12rem;
        }
      .cleanTimesWrapper {
        margin-top: .12rem;
        margin-left: .4rem;
        height: .94rem;
        .cleanTimes {        
          font-size: .5rem;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 500;
          color: #FFFFFF;
          text-shadow: 0rem .05rem .2rem rgba(53, 53, 57, 0.08);
        }

        .cleanTimesText {

        font-size: .24rem;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #FFFFFF;
        text-shadow: 0rem .05rem .2rem rgba(53, 53, 57, 0.08);
        }
      }

      .cleanerWrapper {
        margin-right: .4rem;
        text-align: center;
        .cleaner {
          font-size: .5rem;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 500;
          color: #FFFFFF;
          text-shadow: 0rem .05rem .2rem rgba(53, 53, 57, 0.08);

        }

        .cleanerText {
        font-size: .24rem;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #FFFFFF;
        text-shadow: 0rem .05rem .2rem rgba(53, 53, 57, 0.08);
        }
      }
    }
  }
     //左侧背景图片
    .leftImg {
        position: absolute;
        left: 0;
        top: 0;
        width: 1.58rem;
        height: 1.69rem;
    }
    //右侧背景图片
    .rightImg {
        position: absolute;
        top: -0.06rem;
        right: -0.02rem;
        width: 2.61rem;
        height: 2.04rem;
    }
  }

  .keepBarrelDetailWrapper {
    .van-collapse {
      .van-collapse-item {
         margin-top: .2rem;          
            // height: 1.59rem;
            background: #FFFFFF;
            box-shadow: 0rem .04rem .4rem -0.1rem rgba(0, 0, 0, 0.1);
            border-radius: .08rem;
            box-sizing: border-box;
            padding-bottom: .28rem;
            // padding-left: .4rem;

        /deep/ .van-cell {
            padding: 0!important;
            &::after {
                border-bottom: 0;
            }
            /deep/ .van-cell__right-icon {
                margin-right: .32rem;
                margin-top: .52rem;
                        } 
        
        }
         /deep/ .van-collapse-item__wrapper {
            // padding-bottom: .24rem;
            background-color: #fff;
         /deep/ .van-collapse-item__content {
             padding: 0;
         }
        }
        .clockClass {         
          font-size: .32rem;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 700;
          color: #333333;
          margin-left: .4rem;
          margin-top: .28rem;
          }

          .titleWrapper {
            display: flex;
            justify-content: space-between;            
            font-size: .24rem;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #999999;
            .keepBarrelClass {
              display: flex;
              align-items: center;
              flex: 0 0 2.72rem;
              margin-left: .4rem;
              img {
                margin-left: .12rem;
                width: .22rem;
                height: .33rem;
              }
            }
            .line {
              flex: 0 0 .02rem;
              height: .28rem;
              background: #DDDDDD;
              margin-top: .1rem;
            }
            .keepBarrelTime {
              margin-left: .3rem;
              flex: 0 0 4.35rem;             
              font-size: .24rem;
              font-family: PingFangSC-Regular, PingFang SC;
              font-weight: 400;
              color: #999999;
            }
          }

        .shrinkContent {
          .topContent {
            width: 6.7rem;
            background: #f7f7f7;
            border-radius: .1rem;
            // opacity: 0.49;
            margin: 0 .2rem;
            padding-bottom: .26rem;
            border-bottom: .01rem solid #ddd;
            .attendanceTimeWrapper {
              padding-top: .2rem;
              margin-left: .18rem;
              display: flex;
              .attendanceTime {

              }

              .status1 {
                width: .8rem;
                height: .4rem;
                background: rgba(22, 200, 139, 0.08);
                border-radius: .2rem;
                font-size: .24rem;
                font-family: PingFangSC-Medium, PingFang SC;
                font-weight: 500;
                color: #16C88B;
                text-align: center;
                line-height: .4rem;
                margin-left: .09rem;
              }
            }

            .imgWrapper {
              margin-left: .12rem;
              img {
                width: 3.13rem;
                height: 1.76rem;
                &:nth-child(n+1) {
                  margin-left: .2rem;
                }
              }
            }

            .attendanceRemark {
              display: flex;
              margin-left: .18rem;              
              font-size: .28rem;
              font-family: PingFangSC-Regular, PingFang SC;
              font-weight: 400;
              color: #666666;
              .remarkTitle {

              }

              .remarkContet {
                margin-left: .17rem;
              }
            }

            .locationWrapper {
              display: flex;
              margin-left: .23rem;             
              font-size: .28rem;
              font-family: PingFangSC-Regular, PingFang SC;
              font-weight: 400;
              color: #666666;
              img {
                width: .26rem;
                height: .33rem;
              }

              .locationTitle {

              }
            }
          }

          .bottomContent {
            width: 6.7rem;
            background: #f7f7f7;
            border-radius: .1rem;
            // opacity: 0.49;
            margin: 0 .2rem;
            padding-bottom: .26rem;
            .attendanceTimeWrapper {
               padding-top: .2rem;
              margin-left: .18rem;
              display: flex;
              .attendanceTime {              
              font-size: .28rem;
              font-family: PingFangSC-Regular, PingFang SC;
              font-weight: 400;
              color: #333333;
              }

              .status2 {
                width: .8rem;
                height: .4rem;
                background: rgba(248, 177, 12, 0.08);
                border-radius: .2rem;
                font-size: .24rem;
                font-family: PingFangSC-Medium, PingFang SC;
                font-weight: 500;
                color: #FFBB1D;
                text-align: center;
                line-height: .4rem;
                margin-left: .09rem;
              }
            }

           .imgWrapper {
              margin-left: .12rem;
              img {
                width: 3.13rem;
                height: 1.76rem;
                &:nth-child(n+1) {
                  margin-left: .2rem;
                }
              }
            }

            .attendanceRemark {
              display: flex;
              margin-left: .18rem;
              font-size: .28rem;
              font-family: PingFangSC-Regular, PingFang SC;
              font-weight: 400;
              color: #666666;
              .remarkTitle {

              }

              .remarkContet {
                 margin-left: .17rem;
              }
            }
            .locationWrapper {
              display: flex;
              margin-left: .23rem;             
              font-size: .28rem;
              font-family: PingFangSC-Regular, PingFang SC;
              font-weight: 400;
              color: #666666;
                img {
                  width: .26rem;
                  height: .33rem;
                }

                .locationTitle {

                }
              }
          }
        }
      }
    }
  }
   //时间选择器
    .chooseDateDialog {
    .van-popup {       
        height: 7.64rem;
        background: #FFFFFF;
        border-radius: .28rem .28rem 0rem 0rem;
        .headerWrapper {
            display: flex;
            height: .94rem;
            box-sizing: border-box;
            padding-top: .4rem;
            padding-left: .4rem;
            margin-bottom: .3rem;
        img {
            width: .48rem;
            height: .48rem;
        }

        .titleText {            
            font-size: .36rem;
            font-family: PingFangSC-Medium, PingFang SC;
            font-weight: 700;
            color: #333333;
            flex: 1;
            text-align: center;
        }

        .confirmButton {
            font-size: .32rem;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #0091FF;
            margin-right: .4rem;
        }
        }
        //外观
        .chooseSlide {
            display: flex;
            // margin-top: .3rem;
            width: 3.29rem;
            height: .5rem;
            border-radius: .04rem;
            opacity: 0.79;
            border: .01rem solid #0091FF;
            margin: 0 auto;           
            font-size: .24rem;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #0091FF;
            text-align: center;
            line-height: .5rem;
        .accordingMonth {
            flex: 1;
            border-right: .01rem solid #0091FF;
            &.activeDate {               
                background: #0091FF;
                color: #fff;
            }
        }

        .accordingYear {
            flex: 1;
            &.activeDate {               
                background: #0091FF;
                color: #fff;
            }
        }
        }
        //年月选择器
        .chooseYearMonth {
        .van-datetime-picker {

        }
        }
        //年选择器
        .chooseYear {
        .van-datetime-picker {
            /deep/ .van-picker__columns {
          // /deep/ .van-picker-column:nth-child(2) {
          //     display: none;
          // }
          // /deep/ .van-picker-column:nth-child(3) {
          //     display: none;
          // }
         }
        }
        }
    }
    }
}
</style>