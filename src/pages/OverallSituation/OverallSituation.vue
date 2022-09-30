<template>
  <div class="OverallSituation">
      <van-tabs v-model="activeName" @change="handleTabsChange">
        <van-tab title="三率排行" name="threeRateRanking" class="threeRateRanking">
          <van-list
            v-model="loading"
            @load="onLoad"
            :finished="finished"
            finished-text="没有更多了"
            class="scroll-list"
          >
            <ul>
              <li v-for="(rankingItem,rankingIndex) in threeRateRankingList" :key="rankingIndex">
                <p>
                  <small>{{`NO.${rankingIndex+1}`}}</small>
                  <label>{{rankingItem.name}}</label>
                  <span>{{`${rankingItem.avg}分`}}</span>
                </p>
                <article>
                  <section :style="{'width':rankingItem.avgPercent}"></section>
                </article>
              </li>
            </ul>
          </van-list>
        </van-tab>
        <van-tab title="工单统计" name="workOrderStatistics" class="workOrderStatistics">
          <header class="header">
              <div class="time-picker">
                  <span :class="{'time-active':timeActive=='date'}" @click="handleTimePickerClick('date')">日</span>
                  <span :class="{'time-active':timeActive=='week'}" @click="handleTimePickerClick('week')">周</span>
                  <span :class="{'time-active':timeActive=='year-month'}" @click="handleTimePickerClick('year-month')">月</span>
              </div>
              <section class="date-picker-panel" >
                  <article v-if="timeActive!='week'">
                      <div class="date-picker">
                          <span @click="handleDateClick('start')">{{ splitDateString[0] }}</span>
                          <van-icon name="play" />
                          <van-icon v-if="startFormatterDate!='开始日期'" name="clear" @click="handleDateClear('start')"/>
                      </div>
                      <span style="margin: 0rem 0.08rem;">-</span>
                      <div class="date-picker">
                          <span @click="handleDateClick('end')">{{ splitDateString[1] }}</span>
                          <van-icon name="play" />
                          <van-icon v-if="endFormatterDate!='结束日期'" name="clear" @click="handleDateClear('end')"/>
                      </div>
                  </article>
                  <article v-if="timeActive=='week'" @click="handleDateClick('start')"> 
                      <span>{{ splitDateString[0] }}</span>
                      <span style="margin: 0rem 0.08rem;">-</span>
                      <span>{{ splitDateString[1] }}</span>
                      <van-icon name="play" />
                      <van-icon v-if="endFormatterDate!='结束日期'" name="clear" @click="handleDateClear('week')"/>
                  </article>
              </section>
              <section class="date-picker-panel" @click="regionVisible=true">
                <article>
                  <span style="max-width: 1.2rem;display: inline-block;overflow: hidden;">{{ region.townName }}</span>
                  <van-icon name="play" />
                  <van-icon v-if="region.townName!='区域'" name="clear" @click="handleRegionClear"/>
                </article>
              </section>

              <van-popup v-model="regionVisible" round position="bottom">
                <van-cascader
                  v-model="region"
                  title="请选择所在区域"
                  :options="regionActions"
                  :field-names="{ text: 'townName', value: 'id', children: 'children' }"
                  @close="regionVisible = false"
                  @finish="handleSelectRegion"
                />
              </van-popup>

              <!-- <van-popover
                v-model="regionVisible"
                theme="dark"
                trigger="click"

              >
                <ol class="custom-popover">
                  <li :class="{'active-custom-popover':region==actionItem.text}" v-for="(actionItem,actionIndex) in regionActions" :key="actionIndex" @click="handleSelectRegion(actionItem.text)">{{actionItem.text}}</li>
                </ol>
                <template #reference>
                  
                </template>
              </van-popover> -->
          </header>
          <nav>
            <h4>工单状态统计</h4>
            <article>
              <div v-for="(statisticsItem,statisticsIndex) in WorkOrderStatusStatistics.slice(0,4)" :key="statisticsIndex">
                <span>{{statisticsItem.count}}</span><label>{{statisticsItem.name}}</label>
              </div>
            </article>
            <figure>
              <section>
                <div v-for="(statisticsItem,statisticsIndex) in WorkOrderStatusStatistics.slice(4)" :key="statisticsIndex">
                  <label>{{statisticsItem.name}}</label><span>{{statisticsItem.count}}</span>
                </div>
              </section>
            </figure>
          </nav>
          <main>
            <h4>工单类型统计</h4>
            <van-list
              v-model="loading"
              @load="onLoad"
              :finished="finished"
              finished-text="没有更多了"
              class="scroll-list"
            >
              <ul>
                <li v-for="(workOrderTypeItem,workOrderTypeIndex) in workOrderTypeList" :key="workOrderTypeIndex">
                  <p>
                    <small>{{`NO.${workOrderTypeIndex+1}`}}</small>
                    <label>{{workOrderTypeItem.name}}</label>
                    <span>{{`${workOrderTypeItem.num}件`}}</span>
                  </p>
                  <article>
                    <section :style="{'width':( workOrderTypeItem.num/(workOrderTypeList[0].num) )*100+'%' }"></section>
                  </article>
                </li>
              </ul>
            </van-list>
          </main>
        </van-tab>
      </van-tabs>
      <van-datetime-picker
            v-if="datetimeVisible && timeActive!='week'"
            class="fixed-bottom"
            :type="timeActive"
            :value="dateTag=='start'?startDate:endDate"
            :min-date="minDate"
            :max-date="maxDate"
            @confirm="handleDateConfirm"
            @cancel="handleDateCancel"
        />
        <van-picker
            v-if="datetimeVisible && timeActive=='week'"
            class="fixed-bottom"
            show-toolbar
            :columns="weekData"
            :default-index="weekData.length-1"
            @confirm="handleWeekConfirm"
            @cancel="handleDateCancel"
        />
  </div>
</template>
<script>
export default {
  name: 'OverallSituation',
  data() {
    return {
      activeName: 'threeRateRanking',
      loading: false,
      finished: false,
      timeActive: 'date',
      startFormatterDate: '开始日期',
      endFormatterDate: '结束日期',
      datetimeVisible: false,
      startDate: new Date(),
      endDate: new Date(),
      dateTag: '',
      minDate: new Date(2010,0,1),
      maxDate: new Date(),
      regionVisible: false,
      regionActions: [{ text: '选项一选项一选项一选项一' }, { text: '选项二选项二选项二选项二' }, { text: '选项三选项三选项三选项三' }],
      region: {
        townName: '区域',
        id: ''
      },
      threeRateRankingList: [],
      workOrderTypeList: [],
      WorkOrderStatusStatistics: []
    }
  },
  computed: {
    // 生成周数据
    weekData() {
        const res = [];
        const oneDay = 1000 * 60 * 60 * 24;
        const oneWeek = 7 * oneDay;
        const startDay = new Date(new Date(2021,0,1).getTime());
        const sat = new Date(2021,0,1).getTime() + (6 - startDay.getDay()) * oneDay;
        const endDay = new Date(this.maxDate.getTime());
        const endSat = this.maxDate.getTime() + (6 - endDay.getDay()) * oneDay;

        const _startDay = this.dateFormatter(startDay, false);
        const _sat = this.dateFormatter(sat, false);
        res.push({
            text: `第1周 ${_startDay.replaceAll('-', '.')}-${_sat.replaceAll(
            '-',
            '.'
            )}`,
            date: [_startDay, _sat],
        });

        let count = 2;
        for (let i = sat + oneDay; i <= endSat; i += oneWeek) {
            const _s = this.dateFormatter(i, false);
            const _e = this.dateFormatter(i + 6 * oneDay, false);
            res.push({
            text: `第${count}周 ${_s.replaceAll('-', '.')}-${_e.replaceAll(
                '-',
                '.'
            )}`,
            date: [_s, _e],
            });
            count++;
        }
        return res;
    },
    splitDateString() {
        let array = [];
        if(this.startFormatterDate.search('开始')==-1) {
            array.push(this.startFormatterDate.split(' ')[0])
        } else {
            array.push(this.startFormatterDate)
        }
        if(this.endFormatterDate.search('结束')==-1) {
            array.push(this.endFormatterDate.split(' ')[0])
        } else {
            array.push(this.endFormatterDate)
        }
        return array
    }
  },
  created() {
    this.getThreeRateRankingData();
    this.getWorkOrderTypeData();
    this.getRegionActions();
    this.getWorkOrderStatusStatistics();
  },
  methods: {
    //格式化起始时间结束时间
    dateFormatter(str) {
      //默认返回yyyy-MM-dd HH-mm-ss
      var hasTime = arguments[1] != false ? true : false; //可传第二个参数false，返回yyyy-MM-dd
      var d = new Date(str);
      var year = d.getFullYear();
      var month =
        d.getMonth() + 1 < 10 ? '0' + (d.getMonth() + 1) : d.getMonth() + 1;
      var day = d.getDate() < 10 ? '0' + d.getDate() : d.getDate();
      var hour = d.getHours() < 10 ? '0' + d.getHours() : d.getHours();
      var minute = d.getMinutes() < 10 ? '0' + d.getMinutes() : d.getMinutes();
      var second = d.getSeconds() < 10 ? '0' + d.getSeconds() : d.getSeconds();
      if (hasTime) {
        return (
          [year, month, day].join('-') + ' ' + [hour, minute, second].join(':')
        );
      } else {
        return [year, month, day].join('-');
      }
    },
    onLoad() {
      //  this.currentPage = this.currentPage +1
      //  this.$http({
      //       url: this.$http.adornUrl('/work/workSheet/wechatList'),
      //       method: 'post',
      //       data: this.$http.adornData({
      //       })
      //     }).then(({ data }) => {
      //        //console.log("data",data)
      //         this.loading = false;
      //         if(this.currentPage> this.totalPage) {
      //             this.finished = true
      //             return
      //         }
      //     })
    },
    handleTimePickerClick(value) {
      this.timeActive = value;
      this.handleDateClear('timeActiveChange')
    },
    handleDateClick(value) {
      this.dateTag = value;
      this.datetimeVisible = true;
    },
    handleDateClear(value) {
        if(value == 'start') {
            this.startFormatterDate = '开始日期';
            this.startDate = new Date();
        }else if(value == 'end') {
            this.endFormatterDate = '结束日期';
            this.endDate = new Date();
        } else if(value == 'week') {
            this.startFormatterDate = '开始日期';
            this.endFormatterDate = '结束日期';
        } else if(value == 'timeActiveChange') {
            this.startFormatterDate = '开始日期';
            this.startDate = new Date();
            this.endFormatterDate = '结束日期';
            this.endDate = new Date();
        }
        this.finished = false;

        this.getWorkOrderTypeData();
        this.getWorkOrderStatusStatistics();
    },
    handleRegionClear() {
        this.region.townName = '区域';
        this.region.id = '';
        this.finished = false;

        this.getWorkOrderTypeData();
        this.getWorkOrderStatusStatistics();
    },
    handleDateConfirm(event) {
      console.log('handleDateConfirm event',event);
        if(this.dateTag == 'start') {
            if (new Date(event).getTime() > this.endDate.getTime()) {
                this.$dialog.alert({
                  message: '开始日期不能大于结束日期',
                })
                return ;
            }
        } else {
            if (new Date(event).getTime() < this.startDate.getTime()) { 
                this.$dialog.alert({
                  message: '结束日期不能小于开始日期',
                })
                return ;
            }
        }
        this.datetimeVisible = false;
        let date = new Date(event)
        console.log('event', event, `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`)

        if(this.dateTag == 'start') {
            let firstDate;
            if(this.timeActive=='year-month') {
                firstDate = new Date(date.getFullYear(),date.getMonth()+1,1);
            }
            this.startFormatterDate = `${date.getFullYear()}-${date.getMonth()+1}${this.timeActive=='date'?`-${date.getDate()} 00:00:00`:`-${firstDate.getDate()} 00:00:00`}`;
            this.startDate = new Date(event);;
        } else {
            let endDate;
            if(this.timeActive=='year-month') {
                endDate = new Date(date.getFullYear(),date.getMonth()+1,0);
            }
            this.endFormatterDate = `${date.getFullYear()}-${date.getMonth()+1}${this.timeActive=='date'?`-${date.getDate()} 23:59:59`:`-${endDate.getDate()} 23:59:59`}`;
            this.endDate = new Date(event);
        }
        this.finished = false;

        this.getWorkOrderTypeData();
        this.getWorkOrderStatusStatistics();
    },
    handleDateCancel() {
      this.datetimeVisible = false;
    },
    handleWeekConfirm(event) {
      console.log('handleWeekConfirm event',event)
      this.datetimeVisible = false;
      let date = event.date
      this.startFormatterDate = `${date[0]} 00:00:00`;
      this.endFormatterDate = `${date[1]} 23:59:59`;
      this.finished = false;

      this.getWorkOrderTypeData();
      this.getWorkOrderStatusStatistics();
    },
    handleSelectRegion({ selectedOptions }) {
      console.log('handleSelectRegion selectedOptions',selectedOptions);
      this.regionVisible = false;
      this.region = selectedOptions[selectedOptions.length-1];
      this.getWorkOrderTypeData();
      this.getWorkOrderStatusStatistics();
    },
    getThreeRateRankingData() {
      this.$http({
        url: this.$http.adornUrl(`/work/workSheet/trendSolveThreeRate`),
        method: 'post',
        data: this.$http.adornData({
          year: null,
          quarter: null,
          month: null
        })
      }).then(({data}) => {
        console.log('/work/workSheet/trendSolveThreeRate data',data);
        if(data.code == 0) {
          this.threeRateRankingList = data.data.res;
          this.finished = true;
        }else {
          this.$dialog.alert({
            message: data.msg,
          })
        }
      })
    },
    getWorkOrderTypeData() {
      console.log("this.startFormatterDate",this.startFormatterDate)
      this.$http({
        url: this.$http.adornUrl(`/emergency/emergencyType/statByTimeAndTownGroup`),
        method: 'post',
        data: this.$http.adornData({
          startTime: this.startFormatterDate=='开始日期'?'':this.startFormatterDate,
          endTime: this.endFormatterDate=='结束日期'?'':this.endFormatterDate,
          townId: this.region.id
        })
      }).then(({data}) => {
        console.log('/emergency/emergencyType/statByTimeAndTownGroup data',data);
        if(data.code == 0) {
          this.workOrderTypeList = data.data;
          this.finished = true;
        }else {
          this.$dialog.alert({
            message: data.msg,
          })
        }
      })
    },
    handleTabsChange(event) {
      console.log('this.activeName',this.activeName);
    },
    getRegionActions() {
      this.$http({
        url: this.$http.adornUrl(`/sys/systown/treeList`),
        method: 'get'
      }).then(({data}) => {
        console.log('/sys/systown/treeList data',data);
        if(data.code == 0) {
          this.regionActions = data.list;
        }else {
          this.$dialog.alert({
            message: data.msg,
          })
        }
      })
    },
    getWorkOrderStatusStatistics() {
      this.$http({
        url: this.$http.adornUrl(`/work/workSheet/getStatusStatistics`),
        method: 'post',
        data: this.$http.adornData({
          startTime: this.startFormatterDate=='开始日期'?'':this.startFormatterDate,
          endTime: this.endFormatterDate=='结束日期'?'':this.endFormatterDate,
          townId: this.region.id
        })
      }).then(({data}) => {
        console.log('/work/workSheet/getStatusStatistics data',data);
        if(data.code == 0) {
          this.WorkOrderStatusStatistics = data.data;
        }else {
          this.$dialog.alert({
            message: data.msg,
          })
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>  
  .OverallSituation {
    /deep/ .van-tabs__line {
      background: #0091FF;
    }
    /deep/ .van-tabs__wrap {
      border-bottom: 0.01rem solid #EEEEEE;
    }
    /deep/ .van-tabs__content {
      height: calc(100vh - 0.9rem);
      background: #FFF;
    }
    .threeRateRanking {
      box-sizing: border-box;
      padding: 0.3rem;
      .scroll-list {
        height: 11.85rem;
        overflow-y: auto;
      }
    }
    .scroll-list {
        & > ul {
          list-style: none;
          li {
            margin-bottom: 0.3rem;
            p {
              display: flex;
              align-items: center;
              margin: 0rem;
              margin-bottom: 0.1rem;
              small,label {
                font-size: 14px;
                font-family: PingFangSC-Regular, PingFang SC;
                font-weight: 400;
                color: #666666;
              }
              label {
                margin-left: 0.25rem;
              }
              span {
                font-size: 14px;
                font-family: PingFangSC-Regular, PingFang SC;
                font-weight: 400;
                color: #333333;
                margin-right: 0rem;
                margin-left: auto;
              }
            }
            article {
              height: 0.3rem;
              border-radius: 0.2rem;
              background: #F2F5F8;
              section {
                height: 0.3rem;
                border-radius: 0.2rem;
                background: linear-gradient(90deg, #52D1FF 0%, #0F92FF 100%);
              }
            }
            &:nth-of-type(1) article section{
              background: linear-gradient(270deg, #FF5744 0%, #FFC680 100%);
            }
            &:nth-of-type(2) article section{
              background: linear-gradient(90deg, #FF9576 0%, #AD7AFF 100%);
            }
            &:nth-of-type(3) article section{
              background: linear-gradient(270deg, #5579FF 0%, #D6C8FF 100%);
            }
          }
        }
      }
    .workOrderStatistics {
      .header {
        position: fixed;
        width: 100vw;
        top: 7%;
        left: 0%;
        z-index: 996;
        background: #FFF;
        box-sizing: border-box;
        height: 1rem;
        display: flex;
        align-items: center;
        justify-content: space-evenly;
        white-space: nowrap;
        border-bottom: 0.01rem solid #EEEEEE;
        .time-picker {
            display: inline-block;
            padding: 0.15rem 0.18rem;
            font-size: 12px;
            font-family: PingFangSC-Medium, PingFang SC;
            font-weight: 500;
            color: #666666;
            background: #F8F8F8;
            border-radius: 0.6rem;
            .time-active {
                color: #0091FF;
            }
            & > span:nth-of-type(2) {
                margin: 0rem 0.3rem;
            }
        }
        .date-picker-panel {
            padding: 0.15rem 0.18rem;
            font-size: 12px;
            font-family: Roboto-Medium, Roboto;
            font-weight: 500;
            color: #333333;
            background: #F8F8F8;
            border-radius: 0.6rem;
            article {
              display: flex;
              align-items: center;
              position: relative;
              .date-picker {
                position: relative;
                display: flex;
                align-items: center;
              }
              .van-icon-play {
                  transform: rotateZ(90deg);
                  margin-left: 0.06rem;
              }
              .van-icon-clear {
                  position: absolute;
                  top: -60%;
                  right: -12%;
              }
            }
        }
      }
      nav {
        position: fixed;
        width: 94%;
        top: 16.5%;
        left: 50%;
        transform: translateX(-50%);
        border-radius: 0.1rem;
        border: 0.01rem solid #DDDDDD;
        &>h4 {
          font-size: 12px;
          font-family: PingFangSC-Semibold, PingFang SC;
          font-weight: 600;
          color: #333333;
          margin: 0rem;
          padding: 0.2rem 0rem;
          text-indent: 0.2rem;
        }
        &>article {
          border-top: 0.01rem solid #EEEEEE;
          border-bottom: 0.01rem solid #EEEEEE;
          display: flex;
          align-items: center;
          padding: 0.3rem 0.4rem;
          box-sizing: border-box;
          justify-content: space-between;
          & > div {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: space-between;
            span {
              font-size: 22px;
              font-family: PingFangSC-Medium, PingFang SC;
              font-weight: 500;
            }
            label {
              font-size: 12px;
              font-family: PingFangSC-Regular, PingFang SC;
              font-weight: 400;
              color: #666666;
            }
            &:nth-of-type(1) span {
              color: #000000;
            }
            &:nth-of-type(2) span {
              color: #F2B626;
            }
            &:nth-of-type(3) span {
              color: #0091FF;
            }
            &:nth-of-type(4) span {
              color: #FBC958;
            }
          }
        }
        &>figure {
          margin: 0rem;
          box-sizing: border-box;
          padding: 0.3rem 0.96rem;
          section {
            display: flex;
            white-space: nowrap;
            max-width: 5.12rem;
            overflow-x: auto;
            // justify-content: space-between;
            & > div {
              text-align: center;
              margin-right: 0.2rem;
              span,label {
                font-size: 12px;
                font-family: PingFangSC-Regular, PingFang SC;
                font-weight: 400;     
              }
              span {
                color: #000000;
                font-weight: 800;
                margin-left: 0.1rem;
              }
              label {
                color: #333333;
              }
            }
          }
        }
      }
      main {
        position: fixed;
        width: 100vw;
        top: 6.1rem;
        left: 0%;
        &>h4 {
          font-size: 12px;
          font-family: PingFangSC-Semibold, PingFang SC;
          font-weight: 600;
          color: #333333;
          margin: 0rem;
          padding: 0.2rem 0rem;
          text-indent: 0.3rem;
        }
        .scroll-list {
          padding: 0rem 0.3rem 0.3rem 0.3rem;
          height: 6.5rem;
          overflow-y: auto;
        }
      }
    }
    .fixed-bottom {
      width: 100%;
      position: fixed;
      left: 0;
      bottom: 0;
    }
  }
  .custom-popover {   
    li {
      white-space: nowrap;
      padding: 0.1rem;
      &.active-custom-popover {
        background: #0091FF;
      }
    }
    li:not(:last-of-type) {
      border-bottom: 0.01rem solid #FFF;
    }
  }
</style>