<template>
  <div class="orderchoose">
     <div class="ordertypecontainer">
        <div class="ordertype">
            工单类型
        </div>
        <div class="ordertypeitemcontainer">
             <div class="ordertypeitem" :class="{'isActive': currentIndex === -1}" @click="chooseOrderType(-1,0)">  
                  全部
              <div class="choosebackground" v-show="currentIndex === -1">
              </div>
                 <img src="~@/assets/img/selected.png" alt="" v-show="currentIndex === -1">
             </div>
             <div  class="ordertypeitem" v-for="(item,index) in orderTypeList" :key="index" @click="chooseOrderType(index,item.id)" :class="{'isActive': currentIndex === index}">
                  {{item.name}}
              <div class="choosebackground" v-show="currentIndex === index">
              </div>
                 <img src="~@/assets/img/selected.png" alt="" v-show="currentIndex === index">
             </div>
        </div>
     </div>
     <div class="orderstatecontainer">
       <div class="orderstate">
         工单状态
       </div>
       <div class="orderstateitemcontainer">
           <div class="orderstateitem" :class="{'isActive': currentStateIndex === -1}" @click="chooseOrderState(-1,0)">  
                  全部
              <div class="choosebackground" v-show="currentStateIndex === -1">
              </div>
                 <img src="~@/assets/img/selected.png" alt="" v-show="currentStateIndex === -1">
             </div>
            <div  class="orderstateitem" v-for="(item,index) in orderStateList" :key="index" @click="chooseOrderState(index,item.id)" :class="{'isActive': currentStateIndex === index}">
                  {{item.state}}
              <div class="choosebackground" v-show="currentStateIndex === index">
              </div>
                 <img src="~@/assets/img/selected.png" alt="" v-show="currentStateIndex === index">
             </div>
       </div>
     </div>
      <div class="orderattributecontainer">
          <div class="orderattributetitle">
              工单属性
          </div>
          <div class="pleasechoose">
              请选择
              <img src="~@/assets/img/rightenter.png" alt="">
          </div>
      </div>
      <div class="handleobject">
          <div class="handleobjecttitle">
             处置对象
          </div>
          <div class="pleasechoose">
             请选择
             <img src="~@/assets/img/rightenter.png" alt="">
          </div>
      </div>
      <div class="buttoncontainer">
          <div class="resetbutton">
              重置
          </div>
          <div class="surebutton">
              确定
          </div>
      </div>
  </div>
</template>
<script>
export default {
  name: 'orderchoose',
  data() {
   return {
     orderTypeList: [{id:1,name:'人员预警'},{id:3,name:'人员预警'},{id:2,name:'人员预警'}],//工单类型列表
     orderStateList: [{id:1,state:'人员预警'},{id:3,state:'人员预警'},{id:2,state:'人员预警'}],//工单状态列表
     currentIndex: -2,//控制工单类型是否被点击
     currentStateIndex: -2//控制工单状态是否被点击
   }
  },
  created() {
    this.$http({
      url: this.$http.adornUrl('/work/workModule/list'),
      method: 'get',
      params: this.$http.adornParams({
      })
    }).then(({data}) => {
        //console.log('data',data)
    })
  },
  methods: {
    chooseOrderType(index,id) {
      this.currentIndex = index

    },
    chooseOrderState(index,id) {
      this.currentStateIndex = index
    }
  }
}
</script>
<style lang="less" scoped>
  .orderchoose {
  .ordertypecontainer {
     background-color: #FFFFFF;
     padding-top: 2.4vh;
    .ordertype {
      width: 17.5vw;
      height: 3.4vh;
      // margin-top: 2.4vh;
      margin-left: 5.3vw;
      font-size: 4.3vw;
      color: #333333;

    }

    .ordertypeitemcontainer {
       
      //  padding: 1.5vh 5.5vw 2.7vh 2.5vw;
       padding-top: 1.5vh;
       padding-bottom: 2.7vh;
       padding-left: 2.5vw;
       display: flex;
       flex-wrap: wrap;
      .ordertypeitem {
        margin-bottom: 1vh;
        position: relative;
        width: 28vw;
        height: 4.94vh;
        text-align: center;
        font-size: 3.7vw;
        color: #333333;
        background-color: #F5F5F5;
        line-height: 4.94vh;
        margin-left: 2.7vw;
        &.isActive {
         background-color:  rgba(0,145,255,0.12);;
        color: #0091FF;
         }
        .choosebackground {
            position: absolute;
            top: 0;
            right: 0;
            width: 0;
            height: 0;
            border-top: 2.1vw solid #0091FF;
            border-right: 1.2vh solid #0091FF;
            border-bottom: 1.2vh solid transparent;
            border-left: 2.1vw solid transparent;
        }
           img {
             position: absolute;
             top: 0.15vh;
             right: 0.1vw;
             width: 2.1vw;
             height: 0.9vh;
           }
            
      }
    }
  }

  .orderstatecontainer {
    background-color: #FFFFFF;
    .orderstate {
      width: 17.5vw;
      height: 3.4vh;
      // margin-top: 2.4vh;
      margin-left: 5.3vw;
      font-size: 4.3vw;
      color: #333333;


    }

    .orderstateitemcontainer {
      //  padding: 1.5vh 5.5vw 1.6vh 2.5vw;
        padding-top: 1.5vh;
       padding-bottom: 2.7vh;
       padding-left: 2.5vw;
       display: flex;
       flex-wrap: wrap;
      .orderstateitem {
        position: relative;
        width: 28vw;
        height: 4.94vh;
        text-align: center;
        font-size: 3.7vw;
        color: #333333;
        background-color: #F5F5F5;
        line-height: 4.94vh;
        margin-left: 2.7vw;
        margin-bottom: 1vh;
        &.isActive {
         background-color:  rgba(0,145,255,0.12);;
        color: #0091FF;
         }
        .choosebackground {
            position: absolute;
            top: 0;
            right: 0;
            width: 0;
            height: 0;
            border-top: 2.1vw solid #0091FF;
            border-right: 1.2vh solid #0091FF;
            border-bottom: 1.2vh solid transparent;
            border-left: 2.1vw solid transparent;
        }
           img {
             position: absolute;
             top: 0.15vh;
             right: 0.1vw;
             width: 2.1vw;
             height: 0.9vh;
           }
      }
    }
  }

  .orderattributecontainer {
    background-color: #FFFFFF;
    display: flex;
    border-bottom: 0.07vh solid #EEEEEE;
    justify-content: space-between;
    height: 7.5vh;
    .orderattributetitle {
      width: 17.5vw;
      height: 3.4vh;
      font-size: 4.3vw;
      color: #333333;
      margin-top: 2.3vh;
      margin-left: 5.6vw;

    }

    .pleasechoose {
      margin-top: 2.3vh;
      font-size: 4.3vw;
      color: #999999;
      margin-right: 7.1vw;
      img {
        width: 2.3vw;
        height: 1.3vh;
      }

    }
  }

  .handleobject {
    background-color: #FFFFFF;
    display: flex;
    border-bottom: 0.07vh solid #EEEEEE;
    justify-content: space-between;
    height: 7.5vh;
    .handleobjecttitle {
      width: 17.5vw;
      height: 3.4vh;
      font-size: 4.3vw;
      color: #333333;
      margin-top: 2.3vh;
      margin-left: 5.6vw;
    }

    .pleasechoose {
      margin-top: 2.3vh;
      font-size: 4.3vw;
      color: #999999;
      margin-right: 7.1vw;
      img {
        width: 2.3vw;
        height: 1.3vh;
      }

    }
  }

  .buttoncontainer {
    height: 6.7vh;
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    .resetbutton {
      flex: 1;
      text-align: center;
      line-height: 6.7vh;
      background-color: #E8F2FC;
      font-size: 4.3vw;
      color: #0091FF;
    }

    .surebutton {
      flex: 1;
      text-align: center;
      line-height: 6.7vh;
      background-color: #0091FF;
      font-size: 4.3vw;
      color: #FFFFFF;
    }
  }
}
</style>