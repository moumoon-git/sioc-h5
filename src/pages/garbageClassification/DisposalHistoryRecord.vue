<!--
 * @Author: linhuiting
 * @Date: 2020-09-29 14:45:57
 * @LastEditors: linhuiting
 * @LastEditTime: 2020-12-14 16:50:30
 * @Description: 处置记录
 * @FilePath: \mobile - 副本\src\pages\garbageClassification\DisposalHistoryRecord.vue
-->
<template>
  <div class="disposalList" v-if="hasData">       
    <div class="disposalSlide" v-for="(item,index) in disposalDetailList" :key="index">
      <!-- 处置结果标签、登记时间、登记人员 -->
      <div class="disposalDetail">
        <div class="statusAndTime">
          <div class="disposalResult">
            <div class="status" v-if="item.status == '1'">
              <div>恢复正常</div>
              <div class="line"></div>
            </div>
            <div class="status" v-else-if="item.status == '2'">
              <div>黄牌警告</div>
              <div class="line yellow"></div>
            </div>
            <div class="status" v-else-if="item.status == '3'">
              <div>红牌警告</div>
              <div class="line red"></div>
            </div>
            <div class="status" v-else-if="item.status == '4'">
              <div>拒收拒运</div>
              <div class="line reject"></div>
            </div>
            <div class="status" v-else-if="item.status == '5'">
              <div>责令整改</div>
              <div class="line modify"></div>
            </div>
            <div class="status" v-else-if="item.status == '6'">
              <div>行政处罚</div>
              <div class="line red"></div>
            </div>
          </div>
          <div class="disposalTime" v-if="item.handleTime !== undefined">{{ dateFormatter(item.handleTime,'/') }}</div>
        </div>

        <div class="garbageMemberEntity" v-if="item.garbageMemberEntity">
          <div class="disposalPerson">登记人员：{{item.garbageMemberEntity.name}} </div> 
          <a :href="'tel:' + item.garbageMemberEntity.phone"> <img src="~@/assets/img/personPhone.png" alt="图片不存在"></a>
        </div>               
      </div>
      
      <!-- 图片证明 -->
      <div class="imgWrapper" v-if="item.img">
        <img v-for="(imgItem, imgIndex) in item.img" :key="imgIndex" :src="backgroundUrl+imgItem.url" alt="图片不存在">
      </div>

      <div class="remarkContainer">
        <div class="remarkTitle">备注：</div>
        <div class="remarkContent">{{item.remark}}</div>
      </div>            
    </div>
  </div>

  <!-- 无记录时显示页面 -->
  <div v-else class="empty">
    <div class="empty__image">
      <img src="~@/assets/img/noPatrol.png"/>
    </div>
    <p class="empty__description">暂无处置记录</p>
  </div>

</template>

<script>
export default {
  name: 'disposalHistoryRecord',
  data() {        
    return {
      backgroundUrl: window.SERSVER_BASE_HOME,
      hasData: false,  //判断是否存在记录
      disposalDetailList: [], // 单条处置记录                 
    }       
  },
    
  created() {
    this.$http({
      url: this.$http.adornUrl(`/garbage/garbageHandle/list`),
      method: "post",
      data: this.$http.adornData({   
             pointId: localStorage.getItem('classifyId'),  
             startTime: '', 
             endTime: '',  
             status: '',
             handleMan: ''       
            }),
        }).then(({data}) => {
          if (data && data.code === 0) { // 获取到处置记录           
            this.disposalDetailList = data.data;                   
            //console.log("data", data)
            this.hasData = true;
            
            // 将后台传来的图片字符串遍历为数组
            this.disposalDetailList.forEach(i => {
                i.img = JSON.parse(i.img);
                //console.log("i.img", i.img);
            });
          }
        }).catch(function (error) {  // 没有获取到处置记录                  
            this.hasData = false;
            //console.log(error);
            //console.log(this);
          }); 
  },

  methods: {
    //格式化起始时间结束时间
    dateFormatter(str, connect) {
      //默认返回yyyy-MM-dd HH-mm-ss
      var hasTime = arguments[2] != false ? true : false; //可传第三个参数false，返回yyyy-MM-dd，无时间点
      var d = new Date(str);
      var year = d.getFullYear();
      var month =
        d.getMonth() + 1 < 10 ? "0" + (d.getMonth() + 1) : d.getMonth() + 1;
      var day = d.getDate() < 10 ? "0" + d.getDate() : d.getDate();
      var hour = d.getHours() < 10 ? "0" + d.getHours() : d.getHours();
      var minute = d.getMinutes() < 10 ? "0" + d.getMinutes() : d.getMinutes();
      // var second = d.getSeconds() < 10 ? "0" + d.getSeconds() : d.getSeconds();
      if (hasTime) {
        return (
          [year, month, day].join(connect) +
          " " +
          [hour, minute].join(":")
        );
      } else {
        return [year, month, day].join(connect);
      }
    },
  },
}
</script>

<style lang="less" scoped>
.disposalList {
  
  .disposalSlide {
    width: 7.1rem;
    height:fit-content;
    background: #FFFFFF;
    box-shadow: 0rem 0.04rem 0.4rem -0.1rem rgba(0, 0, 0, 0.1);
    border-radius: 0.08rem;
    display: inline-block;
    margin-left: 0.2rem;
    margin-top: 0.2rem;
    .disposalDetail {
      .statusAndTime {
        display: flex;
        justify-content: space-between;
        // 处置结果标签
        .disposalResult {
          margin-left: 0.42rem;
          margin-top: 0.28rem;

          .status {
            display: flex;
            div{
              width: 1.28rem;
              height: 0.48rem;
              font-size: 0.32rem;
              font-family: PingFangSC-Medium, PingFang SC;
              font-weight: 600;
              color: #333333;
              line-height: 0.48rem;
              z-index: 1;           
            }
            /deep/ .line {
              position: relative;
              top: 0.3rem;
              left: -1.32rem;
              z-index: 0;
              width: 0.68rem;
              height: 0.12rem;
              background: #0BD295;
              border-radius: 0.06rem;
              opacity: 0.7;
              &.yellow {
              background: #F2B626;
              }
              &.red {
              background: #FF5E5E;
              }
              &.reject {
              background: #BBBBBB;
              }
              &.modify {
              background: #0091FF;
              }       
            }
          }
        }

        .disposalTime {
          margin-right: 0.32rem;
          margin-top: 0.01rem;
          width: 2.41rem;
          height: 1rem;
          font-size: 0.28rem;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 500;
          color: #333333;
          line-height: 1rem;
        }
      }

      .garbageMemberEntity {
        display: flex;
        align-items: center;
        .disposalPerson {
          height: 0.36rem;
          font-size: 0.24rem;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #999999;
          line-height: 0.36rem;
          vertical-align: top;
          margin-left: 0.4rem;
        }

        a {
          width: 0.22rem;
          height: 0.33rem;
          text-align: center;
          img {
            width: 0.22rem;
            height: 0.33rem;
            vertical-align: top;
            margin-left: 0.12rem;
          }
        }
      }
    }

    .imgWrapper {
      margin-left: 0.32rem;
      display: flex;
      img {
        width: 3.13rem;
        height: 1.76rem;
        border-radius: 0.02rem;
        margin-top: 0.24rem;
        padding-right: 0.2rem;
      }
    }

    .remarkContainer {
      display: flex;
      font-size: 0.28rem;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #666666;
      line-height: 0.40rem;
      margin: 0.24rem auto 0.24rem 0.38rem;
      .remarkTitle {

      }

      .remarkContent {

      }
    }
  }
}

.empty {
  text-align: center;
  .empty__image {
    img{
      width: 1.52rem;
      height: 1.36rem; 
      margin-top: 2.91rem;
    }
  }   
  .empty__description {
    height: 0.56rem;
    font-size: 0.28rem;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #999999;
    line-height: 0.28rem; 
    margin-top: 0.09rem;
  }
}
</style>