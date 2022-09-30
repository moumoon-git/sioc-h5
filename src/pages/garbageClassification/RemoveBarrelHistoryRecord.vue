<!--
 * @Author: yaoweixin
 * @Date: 2020-09-18 16:15:53
 * @LastEditors: yaoweixin
 * @LastEditTime: 2020-12-22 11:48:45
 * @Description: 历史撤桶记录
 * @FilePath: \vue-cli-multiPage-master\src\pages\garbageClassification\RemoveBarrelHistoryRecord.vue
-->
<template>
    <div class="removeBarrelHistoryRecord">
        <div class="detailWrapper">
            <img src="~@/assets/img/leftBackground.png" alt="" class="leftImg">
            <img src="~@/assets/img/rightBackground.png" alt="" class="rightImg">
            <div class="chooseDateWrapper" >
                <div class="dateWrapper" @click="showChooseDate = true">
                    <div class="dateText" >{{dateContent}}</div>
                    <img src="~@/assets/img/topExpand.png" alt="" >
                </div>
                <div class="chooseButton" @click="queryBarrelHistoryByTime">筛选</div>
            </div>
            <div class="line"></div>
                <div class="statisticDetail" @scroll.self="scrollmy" ref="scrollContainer">
                    <div class="rubbishSummationWrapper">
                        <div class="rubbishSummation">{{rubbish.rubbishSummationNumber}}</div>
                        <div class="rubbishSummationText">垃圾总量</div>
                        <div class="text">（桶）</div>
                    </div>
                    <div class="line"></div>
                        <div class="restRubbishWrapper">
                            <div class="restRubbish">{{rubbish.restNumber}}</div>
                            <div class="restRubbishText"> 餐余垃圾</div>
                            <div class="text">（桶）</div>
                        </div>
                    <div class="line"></div>
                        <div class="harmRubbishWrapper">
                            <div class="harmRubbish">{{rubbish.harmNumber}}</div>
                            <div class="harmRubbishText">有害垃圾</div>
                            <div class="text">（桶）</div>
                        </div>
                    <div class="line"></div>
                        <div class="recycleRubbishWrapper">
                            <div class="recycleRubbish">{{rubbish.recycleNumber}}</div>
                            <div class="recycleRubbishText">可回收垃圾</div>
                            <div class="text">（桶）</div>
                        </div>
                    <div class="line"></div>
                        <div class="otherWrapper">
                            <div class="other">{{rubbish.otherNumber}}</div>
                            <div class="otherText">其他垃圾</div>
                            <div class="text">（桶）</div>
                        </div>
                    <div class="line"></div>
                        <div class="removeBarrelTimesWrapper">
                            <div class="removeBarrelTimes">{{rubbish.removeNumber}}</div>
                            <div class="removeBarrelTimesText"> 撤桶次数</div>
                            <div class="text">（次）</div>
                        </div>
                    <div class="line"></div>
                        <div class="removePercentWrapper">
                            <div class="removePercent">{{rubbish.removePercent}}</div>
                            <div class="removePercentText">撤桶率</div>
                            <div class="text">（百分）</div>
                        </div>
                </div>
                <!-- 滚动滑块 -->
                <div class="slideContainer">
                    <van-slider v-model="value" disabled/>
                </div>
                    
       </div>
       <van-collapse v-model="activeNames">
            <van-collapse-item :name="index" v-for="(item,index) in barrelList" :key="index">
                <template #title>
                    <div class="removeBarrelTime">{{item.withdrawTime}}</div>
                <div class="removeDetail">
                  <div class="removePerson">
                    <div class="removeBarrelClass">撤桶班次：{{item.garbageShiftEntity ? (item.garbageShiftEntity.startTime != null ? item.garbageShiftEntity.startTime : '') : ''}}~{{item.garbageShiftEntity ? (item.garbageShiftEntity.endTime!= null ? item.garbageShiftEntity.endTime : '') : ''}}</div>
                    <div class="removeBarrelMember">撤桶人员: {{item.memberName}} {{item.memberPhone == null ? '' : '(' + item.memberPhone + ')'}}</div>
                  </div>
                  <div class="line"></div>
                    <div class="rubbishSummation">垃圾总计： 共{{item.totalCount}}桶</div>
                </div>
                </template>
                <div class="rubbishContainer">
                    <div class="restWrapper">
                        
                        <div class="rest">餐余垃圾</div>
                        <div class="restText">{{item.foodWaste}}桶</div>
                    </div>
                    <div class="otherWrapper">
                        <div class="other">其他垃圾</div>
                        <div class="otherText">{{item.otherWaste}}桶</div>
                    </div>
                    <div class="recycleWrapper">
                        <div class="recycle">可回收垃圾</div>
                        <div class="recycleText">{{item.recyclableWaste}}桶</div>
                    </div>
                    <div class="harmWrapper">
                        <div class="harm">有害垃圾</div>
                        <div class="harmText">{{item.harmfulWaste}}桶</div>
                    </div>
                </div>
                <div class="otherContainer">
                    <div class="classifyPreciseWrapper">
                        <div class="classifyPrecise">分类准确率</div>
                        <div class="classifyPreciseText">{{item.classAccuracy}}%</div>
                    </div>
                    <div class="isStickToBarrelWrapper">
                         
                        <div class="isStickToBarrel">是否有人守桶</div>
                        <div class="isStickToBarrelText">{{item.isKeepbarrel == "1" ? '有' : '无'}}</div>
                    </div>
                </div>
                <div class="imgWrapper">
                    <template v-if="item.imgList">
                    <img v-for="(item2,index2) in item.imgList" :key="index2" :src="item2.allUrl" alt="" @click="showPreviewImage(item2.allUrl)">
                    </template>
                </div>
                <div class="remarkContainer">
                    <div class="remarkTitle">备注：</div>
                    <div class="remarkContent">{{item.remark}}</div>
                </div>
            </van-collapse-item>
        </van-collapse>
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
    name: 'removeBarrelHistoryRecord',
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
            value: 0,//滑块滚动得初始值
             mark: 'all',//标记当前选中得日期
             rubbish: {
                 rubbishSummationNumber: 0,//垃圾总量
                 restNumber: 0,//餐余总量
                 recycleNumber: 0,//可回收总量
                 harmNumber: 0,//有害垃圾总量
                 otherNumber: 0,//其他总量
                 removeNumber: 0,//撤桶次数
                 removePercent: 0,//撤桶率
                 
             },
             activeNames: [],
             barrelList: [],//所有撤桶的记录
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
        /**
          * @description: 滚动触发事件
          * @param {event} 事件
          * @return {type} 
          */
         scrollmy(e) {
            //console.log(e.srcElement.scrollWidth)
            //console.log('滚动距离',e.srcElement.scrollLeft)
            //console.log('元素宽度',e.srcElement.offsetWidth)
            var totalScroll = e.srcElement.scrollWidth - e.srcElement.offsetWidth
            var step = totalScroll/100
            var stepNum = Math.floor(e.srcElement.scrollLeft/step)
            this.value = stepNum
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
        return date.getFullYear() + '-' + month + '-' + day;
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
        return date.getFullYear() + '-' + month + '-' + day;
        },
        /**
         * @description: 获取当前年份的第一天
         * @param {type} params
         * @return {type} 
         */
        getYearFirst(chooseDate) {
            var nowDay = chooseDate
            var nowYear = nowDay.getFullYear()
            return nowYear + '-01-01'
        },
        /**
         * @description: 获取当前年份的最后一天
         * @param {type} params
         * @return {type} 
         */
        getYearLast(chooseDate) {
            var nowDay = chooseDate
            var nowYear = nowDay.getFullYear()
            return nowYear + '-12-31'
        },
        /**
         * @description: 根据时间查询撤桶记录
         * @param {type} params
         * @return {type} 
         */
        queryBarrelHistoryByTime() {
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
                    type: "1",
                    id: localStorage.getItem('classifyId')
                }),
            }).then(({data}) => {
                //console.log('统计数据为',data)
                if(data && data.code === 0) {
                    this.rubbish.rubbishSummationNumber = data.data.totalCount
                    this.rubbish.restNumber = data.data.foodWasteCount
                    this.rubbish.recycleNumber = data.data.recyclableWasteCount
                    this.rubbish.harmNumber = data.data.harmfulWasteCount
                    this.rubbish.otherNumber = data.data.otherWasteCount
                    this.rubbish.removePercent = data.data.withdrawPercent
                    this.rubbish.removeNumber = data.data.rejectCount
                }
            })
        this.$http({
                url: this.$http.adornUrl(`/garbage/garbageWithdraw/showRecord`),
                method: "post",
                data: this.$http.adornData({
                    startTime: startTime,
                    endTime: endTime,
                    type: "1",
                    id: localStorage.getItem('classifyId')
                }),
            }).then(({data}) => {
                //console.log('撤桶记录为',data)
                if(data && data.code === 0) {
                    this.barrelList = data.data
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
                    type: "1",
                    id: localStorage.getItem('classifyId')
                }),
            }).then(({data}) => {
                //console.log('统计数据为',data)
                if(data && data.code === 0) {
                    this.rubbish.rubbishSummationNumber = data.data.totalCount
                    this.rubbish.restNumber = data.data.foodWasteCount
                    this.rubbish.recycleNumber = data.data.recyclableWasteCount
                    this.rubbish.harmNumber = data.data.harmfulWasteCount
                    this.rubbish.otherNumber = data.data.otherWasteCount
                    this.rubbish.removePercent = data.data.withdrawPercent
                    this.rubbish.removeNumber = data.data.rejectCount
                }
            })
        this.$http({
                url: this.$http.adornUrl(`/garbage/garbageWithdraw/showRecord`),
                method: "post",
                data: this.$http.adornData({
                    startTime: "",
                    endTime: "",
                    type: "1",
                    id: localStorage.getItem('classifyId')
                }),
            }).then(({data}) => {
                //console.log('撤桶记录为',data)
                if(data && data.code === 0) {
                    this.barrelList = data.data
                }
            })
    },
     components: {
    imagePreview,
    },
}
</script>
<style lang="less" scoped>
.removeBarrelHistoryRecord {
    padding: 0 .2rem;
  .detailWrapper {
    width: 7.1rem;
    height: 2.87rem;
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

    .line {
    width: 100%;
    height: .01rem;
    background: rgba(255, 255, 255, 0.4);
    box-shadow: 0rem .05rem .2rem 0rem rgba(53, 53, 57, 0.08); 
    margin-top: .2rem;
    }

   .statisticDetail {
       display: flex;
       overflow-x: auto;
       width: 7.1rem;
       margin-top: .12rem;
  .rubbishSummationWrapper {
    //   flex-shrink: 0;
    //   width: 1.82rem;
      flex: 0 0 1.82rem;
      text-align: center;
    .rubbishSummation {        
        font-size: .5rem;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #FFFFFF;
        text-shadow: 0rem .05rem .2rem rgba(53, 53, 57, 0.08);

    }

    .rubbishSummationText {
        font-size: .24rem;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #FFFFFF;
        text-shadow: 0rem .05rem .2rem rgba(53, 53, 57, 0.08);
    }
    .text {
        font-size: .24rem;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #FFFFFF;
        text-shadow: 0rem .05rem .2rem rgba(53, 53, 57, 0.08);  
    }
  }

  .line {
    flex: 0 0 .02rem;
    height: .75rem;
    background: #FFFFFF;
    box-shadow: 0rem .05rem .2rem 0rem rgba(53, 53, 57, 0.08);
    border-radius: .02rem;
    opacity: 0.39;
  }

  .restRubbishWrapper {
    //   width: 1.65rem;
    //    flex-shrink: 0;
       flex: 0 0 1.65rem;
       text-align: center;
    .restRubbish {
        font-size: .5rem;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #FFFFFF;
        text-shadow: 0rem .05rem .2rem rgba(53, 53, 57, 0.08);

    }

    .restRubbishText {
        font-size: .24rem;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #FFFFFF;
        text-shadow: 0rem .05rem .2rem rgba(53, 53, 57, 0.08);
    }
    .text {
        font-size: .24rem;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #FFFFFF;
        text-shadow: 0rem .05rem .2rem rgba(53, 53, 57, 0.08);  
    }
  }
  .line {
   flex: 0 0 .02rem;
    height: .75rem;
    background: #FFFFFF;
    box-shadow: 0rem .05rem .2rem 0rem rgba(53, 53, 57, 0.08);
    border-radius: .02rem;
    opacity: 0.39;
  }
  .harmRubbishWrapper {
    //   width: 1.65rem;
    //    flex-shrink: 0;
    flex: 0 0 1.65rem;
    text-align: center;
    .harmRubbish {
        font-size: .5rem;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #FFFFFF;
        text-shadow: 0rem .05rem .2rem rgba(53, 53, 57, 0.08);

    }

    .harmRubbishText {
        font-size: .24rem;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #FFFFFF;
        text-shadow: 0rem .05rem .2rem rgba(53, 53, 57, 0.08);

    }
    .text {
        font-size: .24rem;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #FFFFFF;
        text-shadow: 0rem .05rem .2rem rgba(53, 53, 57, 0.08);  
    }
  }
  .line {
   flex: 0 0 .02rem;
    height: .75rem;
    background: #FFFFFF;
    box-shadow: 0rem .05rem .2rem 0rem rgba(53, 53, 57, 0.08);
    border-radius: .02rem;
    opacity: 0.39;
  }
  .recycleRubbishWrapper {
    //   width: 1.9rem;
    //    flex-shrink: 0;
    flex: 0 0 1.9rem;
    text-align: center;
    .recycleRubbish {
        font-size: .5rem;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #FFFFFF;
        text-shadow: 0rem .05rem .2rem rgba(53, 53, 57, 0.08);

    }

    .recycleRubbishText {
        font-size: .24rem;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #FFFFFF;
        text-shadow: 0rem .05rem .2rem rgba(53, 53, 57, 0.08);

    }
    .text {
        font-size: .24rem;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #FFFFFF;
        text-shadow: 0rem .05rem .2rem rgba(53, 53, 57, 0.08);  
    }
  }
  .line {
    flex: 0 0 .02rem;
    height: .75rem;
    background: #FFFFFF;
    box-shadow: 0rem .05rem .2rem 0rem rgba(53, 53, 57, 0.08);
    border-radius: .02rem;
    opacity: 0.39;
  }
  .otherWrapper {
    //   width: 2.36rem;
    //    flex-shrink: 0;
       flex: 0 0 2.36rem;
       text-align: center;
    .other {
        font-size: .5rem;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #FFFFFF;
        text-shadow: 0rem .05rem .2rem rgba(53, 53, 57, 0.08);

    }

    .otherText {
        font-size: .24rem;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #FFFFFF;
        text-shadow: 0rem .05rem .2rem rgba(53, 53, 57, 0.08);
    }
    .text {
        font-size: .24rem;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #FFFFFF;
        text-shadow: 0rem .05rem .2rem rgba(53, 53, 57, 0.08);  
    }
  }
  .line {
    flex: 0 0 .02rem;
    height: .75rem;
    background: #FFFFFF;
    box-shadow: 0rem .05rem .2rem 0rem rgba(53, 53, 57, 0.08);
    border-radius: .02rem;
    opacity: 0.39;
  }
    .removeBarrelTimesWrapper {
        // width: 2.36rem;
        //  flex-shrink: 0;
         flex: 0 0 2.36rem;
         text-align: center;
      .removeBarrelTimes {
        font-size: .5rem;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #FFFFFF;
        text-shadow: 0rem .05rem .2rem rgba(53, 53, 57, 0.08);
      }

      .removeBarrelTimesText {
        font-size: .24rem;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #FFFFFF;
        text-shadow: 0rem .05rem .2rem rgba(53, 53, 57, 0.08);
      }
      .text {
        font-size: .24rem;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #FFFFFF;
        text-shadow: 0rem .05rem .2rem rgba(53, 53, 57, 0.08);  
    }
    }
    .line {
    flex: 0 0 .02rem;
    height: .75rem;
    background: #FFFFFF;
    box-shadow: 0rem .05rem .2rem 0rem rgba(53, 53, 57, 0.08);
    border-radius: .02rem;
    opacity: 0.39;
    }
    .removePercentWrapper {
         flex: 0 0 2.36rem;
         text-align: center;
      .removePercent {
        font-size: .5rem;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #FFFFFF;
        text-shadow: 0rem .05rem .2rem rgba(53, 53, 57, 0.08);
      }

      .removePercentText {
        font-size: .24rem;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #FFFFFF;
        text-shadow: 0rem .05rem .2rem rgba(53, 53, 57, 0.08);
      }
      .text {
        font-size: .24rem;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #FFFFFF;
        text-shadow: 0rem .05rem .2rem rgba(53, 53, 57, 0.08);  
    }
    }
  
}
   .slideContainer {
        width: 0.3rem;
        height: 0.1rem;
        padding-left: .1rem;
        background: #CCCCCC;
        box-shadow: 0rem .05rem .2rem 0rem rgba(53, 53, 57, 0.08);
        border-radius: .05rem;
        margin-top: .22rem;
        margin-left: 3.39rem;
        // overflow: hidden;
        .van-slider {
            width: .23rem;
            height: .1rem;
            background-color: #ccc;
           /deep/ .van-slider__bar {
                background-color: #ccc!important;
            }
           /deep/ .van-slider__button {
                width: .2rem;
                height: .1rem;
                background-color: #fff;
                border-radius: .05rem;
                box-shadow: none;
            }
        }
    }
     .leftImg {
        position: absolute;
        left: 0;
        top: 0;
        width: 1.58rem;
        // height: 1.69rem;
    }
    .rightImg {
        position: absolute;
        top: -0.24rem;
        right: .02rem;
        width: 2.1rem;
        // height: 2.04rem;
    }
    ::-webkit-scrollbar {/*隐藏滚轮*/
        display: none;
        }
  }

  .van-collapse {
    .van-collapse-item {
        box-sizing: border-box;
        width: 7.1rem;
        // height: 2.01rem;
        background: #FFFFFF;
        box-shadow: 0rem .04rem .4rem -0.1rem rgba(0, 0, 0, 0.1);
        border-radius: .08rem;
        padding-top: .28rem;
        padding-left: .4rem;
        padding-bottom: .25rem;
        margin-top: .2rem;
     /deep/ .van-cell {
          padding: 0!important;
           &::after {
                border-bottom: 0!important;
            }
        /deep/ .van-icon {
            position: absolute;
            top: .32rem;
            right: .32rem;
        }
      }
      /deep/ .van-collapse-item__content {
          padding: 0;
      }
      .removeBarrelTime {         
        font-size: .32rem;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 700;
        color: #333333;
        }

        .removeDetail {
            display: flex;
        .removePerson {
            .removeBarrelClass {               
        font-size: .24rem;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #999999;
            }

            .removeBarrelMember {
                
        font-size: .24rem;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #999999;
        display: flex;
        align-items: center;
        img {
            width: .22rem;
            height: .33rem;
        }
            }
        }
      .line {
        width: .02rem;
        height: .56rem;
        background: #DDDDDD;
        margin-top: .25rem;
      }
        .rubbishSummation {
        margin-left: .6rem;       
        font-size: .28rem;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #999999;
        margin-top: .22rem;
        }
        }
      .rubbishContainer {
        .restWrapper {
            display: flex;
            justify-content: space-between;
            padding-right: .4rem;
            margin-top: .07rem;
            .rest {
            
            font-size: .28rem;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #999999;
            }
            .restText {
                
            font-size: .28rem;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #333333;

            }
        }

        .otherWrapper {
            display: flex;
            justify-content: space-between;
             padding-right: .4rem;
             margin-top: .07rem;
            .other {
            font-size: .28rem;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #999999;
            }
            .otherText {
            font-size: .28rem;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #333333;
            }
        }

        .recycleWrapper {
            display: flex;
            justify-content: space-between;
             padding-right: .4rem;
             margin-top: .07rem;
            .recycle {
            font-size: .28rem;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #999999;
            }
            .recycleText {
            font-size: .28rem;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #333333;
            }
        }

        .harmWrapper {
            display: flex;
            justify-content: space-between;
             padding-right: .4rem;
             margin-top: .07rem;
            .harm {
            font-size: .28rem;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #999999;
            }
            .harmText {
            font-size: .28rem;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #333333;
            }

        }
      }

      .otherContainer {
        .classifyPreciseWrapper {
            display: flex;
            justify-content: space-between;
             padding-right: .4rem;
             margin-top: .07rem;
            .classifyPrecise {
            font-size: .28rem;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #999999;
            }
            .classifyPreciseText {
            font-size: .28rem;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #333333;
            }
        }

        .isStickToBarrelWrapper {
             display: flex;
            justify-content: space-between;
             padding-right: .4rem;
             margin-top: .07rem;
            .isStickToBarrel {
            font-size: .28rem;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #999999;
            }
            .isStickToBarrelText {
            font-size: .28rem;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #333333;
            }
        }
      }

      .imgWrapper {
          display: flex;
          flex-wrap: wrap;
          margin-top: .2rem;
        img {
            width: 3.13rem;
            height: 1.76rem;
            border-radius: .02rem;
            margin-left: .08rem;
        }
      }

      .remarkContainer {
          display: flex;         
        font-size: .28rem;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #666666;
        margin-top: .24rem;
        .remarkTitle {

        }

        .remarkContent {

        }
      }
    }
  }
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

        .chooseYearMonth {
        .van-datetime-picker {

        }
        }

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