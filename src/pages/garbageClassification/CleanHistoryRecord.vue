<!--
 * @Author: yaoweixin
 * @Date: 2020-09-18 10:54:58
 * @LastEditors: yaoweixin
 * @LastEditTime: 2020-12-22 13:19:06
 * @Description: 保洁历史记录
 * @FilePath: \vue-cli-multiPage-master\src\pages\garbageClassification\CleanHistoryRecord.vue
-->
<template>
    <div class="cleanHistoryRecord">
        <!-- 统计信息 -->
       <div class="detailWrapper">
            <div class="chooseDateWrapper" >
                <div class="dateWrapper" @click="showChooseDate = true">
                    <div class="dateText" >{{dateContent}}</div>
                    <img src="~@/assets/img/topExpand.png" alt="" >
                </div>
                <div class="chooseButton" @click="queryCleanHistoryByTime">筛选</div>
            </div>
            <div class="line"></div>
            <div class="cleanDetail">
                <div class="cleanTimesWrapper">
                    <div class="cleanTimes">{{countMember}}</div>
                    <div class="cleanTimesText">保洁总数（次）</div>
                </div>
                <div class="line"></div>
                <div class="cleanerWrapper">
                    <div class="cleaner">{{cleanMember}}</div>
                    <div class="cleanerText">保洁人数（人）</div>
                </div>
            </div>
            <img src="~@/assets/img/leftBackground.png" alt="" class="leftImg">
            <img src="~@/assets/img/rightBackground.png" alt="" class="rightImg">
       </div>
       <!-- 保洁记录 -->
       <div class="cleanList">
           <!-- <div class="cleanSlide" v-for="(item,index) in cleanDetailList" :key="index" @click="lookCleanDetail(item.id)">
               <div class="cleanTime">保洁时间： {{item.withdrawTime}}</div>
               <div class="cleaner">保洁人员：{{item.memberName}}</div>
           </div> -->
        <van-collapse v-model="activeNames">
            <van-collapse-item :name="index" v-for="(item,index) in cleanDetailList" :key="index">
                <template #title>
                <div class="cleanTime">{{item.withdrawTime}}</div>
                <div class="cleaner">保洁人员：{{item.memberName}}
                    <a :href="'tel:'+ item.memberPhone">
                    <img src="~@/assets/img/personPhone.png" alt="">
                    </a>
                </div>
                </template>
                <div class="imgContainer">
                    <img v-for="(imgItem,imgIndex) in item.imgList" :key="imgIndex" :src="imgItem.allUrl" alt="" @click="showPreviewImage(imgItem.allUrl)">
                </div>
                <div class="remarkContainer">
                    <div class="remark">备注：</div>
                    <div class="remarkContent">{{item.remark}}</div>
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
    name: 'cleanHistoryRecord',
    data() {
        return {
            enlargeImageUrl: [],//预览图片路径
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
            mark: 'all',//标记当前选中得日期
            countMember: 0,//保洁总数
            cleanMember: 0,//保洁人数
            startTime: '',//开始时间
            endTime: '',//结束时间
            cleanDetailList: [],//保洁历史
            cleaningDetailShow: false,//控制查看保洁详情是否显示
            singleClean: {//单条保洁记录
                withdrawTime: '',
                remark: '',
                memberName: '',
                imgList: []

            },
            activeNames: [],
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
         * @return {} 
         */
        chooseDate(mark) {
           this.mark = mark 
        },
        /**
         * @description: 获取当前选择月份的第一天
         * @param {date} chooseDate: 选择的日期
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
        return date.getFullYear() + '-' + month + '-' + day;
        },
        /**
         * @description: 获取当前选择月份的最后一天
         * @param {date} chooseDate: 选择的日期
         * @return {} 
         */
        getCurrentMonthLast(chooseDate){
        var date=chooseDate;
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
        return date.getFullYear() + '-' + month + '-' + day;
        },
        /**
         * @description: 获取当前年份的第一天
         * @param {date} chooseDate: 选择的日期
         * @return {} 
         */
        getYearFirst(chooseDate) {
            var nowDay = chooseDate
            var nowYear = nowDay.getFullYear()
            return nowYear + '-01-01'
        },
        /**
         * @description: 获取当前年份的最后一天
         * @param {date} chooseDate: 选择的日期
         * @return {type} 
         */
        getYearLast(chooseDate) {
            var nowDay = chooseDate
            var nowYear = nowDay.getFullYear()
            return nowYear + '-12-31'
        },
        /**
         * @description: 根据时间查询对应的保洁历史记录
         * @param {} 
         * @return {} 
         */
        queryCleanHistoryByTime() {
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
                url: this.$http.adornUrl(`/garbage/garbageWithdraw/wxCount`),
                method: "post",
                data: this.$http.adornData({
                    startTime: startTime,
                    endTime: endTime,
                    type: "2",
                    id: localStorage.getItem('classifyId')
                }),
            }).then(({data}) => {
                //console.log('获得的全部清洁历史总数为',data) 
                if(data && data.code === 0) {
                    this.countMember = data.data.totalCount
                    this.cleanMember = data.data.memberCount
                }
            })
            this.$http({
                url: this.$http.adornUrl(`/garbage/garbageWithdraw/showRecord`),
                method: "post",
                data: this.$http.adornData({
                    startTime: startTime,
                    endTime: endTime,
                    type: "2",
                    id: localStorage.getItem('classifyId')
                }),
            }).then(({data}) => {
                //console.log('获得的全部清洁历史数据为',data)
                if(data && data.code === 0) {
                   this.cleanDetailList = data.data
                }
            })

        },
        /**
         * @description: 查看单条保洁记录
         * @param {id} 单条记录的id
         * @return {} 
         */
        lookCleanDetail(id) {
             this.$http({
            url: this.$http.adornUrl(`/garbage/garbageWithdraw/wxInfo?id=${id}`),
            method: 'get',
            params: this.$http.adornParams({
            })
            }).then(({data}) => {
                //console.log('单条记录的信息为',data)
                if(data && data.code === 0) {
                    this.singleClean = data.data
                    this.cleaningDetailShow = true
                }
            })
        }
    },
    created() {
         this.$http({
                url: this.$http.adornUrl(`/garbage/garbageWithdraw/wxCount`),
                method: "post",
                data: this.$http.adornData({
                    startTime: "",
                    endTime: "",
                    type: "2",
                    id: localStorage.getItem('classifyId')
                }),
            }).then(({data}) => {
                //console.log('获得的全部清洁历史总数为',data) 
                if(data && data.code === 0) {
                    this.countMember = data.data.totalCount
                    this.cleanMember = data.data.memberCount
                }
            })
            this.$http({
                url: this.$http.adornUrl(`/garbage/garbageWithdraw/showRecord`),
                method: "post",
                data: this.$http.adornData({
                    startTime: "",
                    endTime: "",
                    type: "2",
                    id: localStorage.getItem('classifyId')
                }),
            }).then(({data}) => {
                //console.log('获得的全部清洁历史数据为',data)
                if(data && data.code === 0) {
                   this.cleanDetailList = data.data
                }
            })
    },
     components: {
    imagePreview,
  },
}
</script>
<style lang="less" scoped>
.cleanHistoryRecord {
    padding: 0 .2rem;
 //统计数据
  .detailWrapper {
    width: 7.1rem;
    height: 2.42rem;
    font-size: .32rem;     
    background: linear-gradient(338deg, #65BCFF 0%, #2B80FF 100%);
    box-shadow: 0rem .05rem .2rem 0rem rgba(53, 53, 57, 0.08);
    border-radius: .08rem;
    position: relative;
    margin-top: .2rem;
    box-sizing: border-box;
    padding-top: .2rem;
   //弹性盒子
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
  .cleanDetail {
      display: flex;
  .cleanTimesWrapper {
      flex: 1;
        .cleanTimes {            
            height: .7rem;
            font-size: .5rem;
            font-family: PingFangSC-Medium, PingFang SC;
            font-weight: 500;
            color: #FFFFFF;
            line-height: .7rem;
            text-shadow: 0rem .05rem .2rem rgba(53, 53, 57, 0.08);
            margin-top: .12rem;
            margin-left: 1.86rem;
        }

        .cleanTimesText {
            width: 1.68rem;
            height: .24rem;
            font-size: .24rem;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #FFFFFF;
            line-height: .24rem;
            text-shadow: 0rem .05rem .2rem rgba(53, 53, 57, 0.08);
            margin-left: 1.32rem;
        }
    }
    .line {
        width: .01rem;
        height: .75rem;
        background: #FFFFFF;
        box-shadow: 0rem .05rem .2rem 0rem rgba(53, 53, 57, 0.08);
        border-radius: .02rem;
        opacity: 0.39;
        margin-top: .3rem;
    }
    .cleanerWrapper {
        flex: 1;
        .cleaner {           
            height: .7rem;
            font-size: .5rem;
            font-family: PingFangSC-Medium, PingFang SC;
            font-weight: 500;
            color: #FFFFFF;
            line-height: .7rem;
            text-shadow: 0rem .05rem .2rem rgba(53, 53, 57, 0.08);
            margin-top: .12rem;
            margin-left: 1.2rem;
        }

        .cleanerText {
            width: 1.68rem;
            height: .24rem;
            font-size: .24rem;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #FFFFFF;
            line-height: .24rem;
            text-shadow: 0rem .05rem .2rem rgba(53, 53, 57, 0.08);
            margin-left: .55rem;
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
  //清洁记录
  .cleanList {

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

        .cleanTime {            
        font-size: .32rem;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 700;
        color: #333333;
        margin-top: .28rem;
        margin-left: .4rem;
        }

        .cleaner {
            display: flex;
            align-items: center;
            margin-left: .4rem;
        a {
            display: flex;
            justify-content: center;
            align-items: center;
        img {
            width: .22rem;
            height: .33rem;
            margin-left: .12rem;
            }
        }
        }
        /deep/ .van-collapse-item__wrapper {
            padding-bottom: .24rem;
            background-color: #fff;
         /deep/ .van-collapse-item__content {
             padding: 0;
         }
        }
        .imgContainer {
            display: flex;
            margin-top: .24rem;
            flex-wrap: wrap;
            padding-left: .12rem;

          img {
            width: 3.13rem;
            height: 1.76rem;
            border-radius: .02rem;
            margin-left: .2rem;
          }
        }

        .remarkContainer {
            display: flex;            
            font-size: .28rem;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #666666;
            margin-top: .24rem;
            margin-left: .38rem;
          .remark {

          }

          .remarkContent {

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
        //   /deep/ .van-picker-column:nth-child(2) {
        //       display: none;
        //   }
        //   /deep/ .van-picker-column:nth-child(3) {
        //       display: none;
        //   }
         }
        }
        }
    }
    }
}
</style>