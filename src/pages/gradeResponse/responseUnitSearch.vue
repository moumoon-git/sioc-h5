<template>
  <div>
    <div class="searchHeader">
      <form action @submit.prevent="search">
        <van-search
          type="search"
          v-model="value"
          show-action
          placeholder="请输入搜索关键词"
          @search="onSearch"
          @cancel="onCancel"
        />
      </form>
    </div>
    <div class="searchRecord">
      <div class="recordTitle">搜索记录</div>
      <div>
        <img class="recordDelect" @click="openDel" src="../../assets/img/deleteslide.png" alt />
      </div>
      <div class="recordText">
        <span
          v-for="(item,index) in historicalRecords"
          :key="index"
          @touchstart.prevent="tStart"
          @touchmove="tMove"
          @touchend="tend($event,index)"
        >
          {{item}}
          <img v-if="flag" @click="del(index)" src="../../assets/img/deletex.png" alt />
        </span>
        <!-- <span>
          增城区路边村
          <img src="../../assets/img/deletex.png" alt />
        </span>
        <span>
          斯庄村
          <img src="../../assets/img/deletex.png" alt />
        </span>
        <span>
          斯庄村
          <img src="../../assets/img/deletex.png" alt />
        </span>
        <span>
          斯庄村
          <img src="../../assets/img/deletex.png" alt />
        </span>-->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: "", //搜索框的值
      historicalRecords: [
        "增城区路边村",
        "增城区路边村",
        "斯庄村",
        "斯庄村",
        "斯庄村",
        "test",
      ], //历史记录
      flag: false, //是否开启删除标志
      timeOutEvent: 0, //设置定时器
      longClick: false, //判断是否为长按
    };
  },
  methods: {
    onSearch() {},
    onCancel() {},
    tStart() {
      let that = this;
      that.longClick = false;
      clearTimeout(this.timeOutEvent); //清除延时器
      this.timeOutEvent = setTimeout(() => {
        that.flag = !that.flag;
        that.longClick = true;
      }, 500);
    },
    tMove() {
      clearTimeout(this.timeOutEvent); //清除延时器
      //console.log('move事件被触发了');
    },
    //手释放，如果在500毫秒内就释放，则取消长按事件，此时可以执行onclick应该执行的事件
    tend(event,index) {
      clearTimeout(this.timeOutEvent); //清除延时器
      if (!this.longClick) {
        //console.log("我是end事件===》,相当于单击事件", event,index);
        this.value = this.historicalRecords[index];
      }
    },
    openDel() {
      this.flag = !this.flag;
    },
    del(index) {
      //console.log("index===>", index);
      this.$dialog
        .confirm({
          title: "是否删除搜索记录",
        })
        .then(() => {
          this.historicalRecords.splice(index, 1);
        });
    },
  },
};
</script>

<style lang="less" scoped>
.searchHeader {
  font-size: 0.28rem;
  font-family: PingFangSC-Regular, PingFang SC;
  .van-cell {
    // line-height: 2.75vh;
    line-height: 0.37rem;
  }
  .van-search__content {
    border-radius: 4.33vw;
    background-color: #f2f2f2;
    // height: 3.75vh;
    height: 0.5rem;
  }
  .van-search__action {
    color: #0091ff;
  }
}
.searchRecord {
  // height: 92vh;
  // height: 12.27rem;
  height: calc(100vh - 0.54rem);
  background-color: #ffffff;
  position: relative;
  .recordTitle {
    font-size: 0.3rem;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: bold;
    // padding: 0 0 2.02vh 4.27vw;
    padding: 0 0 0.26rem 4.27vw;
  }
  .recordDelect {
    width: 3.47vw;
    // height: 1.95vh;
    height: 0.26rem;
    position: absolute;
    right: 2.8vw;
    top: 0;
  }
  .recordText {
    margin-left: 4.27vw;
    font-size: 0.24rem;
    span {
      // height: 4.05vh;
      // line-height: 4.05vh;
      height: 0.54rem;
      line-height: 0.54rem;
      display: inline-block;
      border-radius: 13.33vw;
      color: #7e7e7e;
      font-size: 0.24rem;
      font-family: PingFangSC-Regular, PingFang SC;
      background-color: #f2f2f2;
      padding: 0 2vw;
      margin-right: 2.67vw;
      margin-bottom: 2.67vw;
      position: relative;
      img {
        position: absolute;
        width: 2.93vw;
        right: -1vw;
        top: 0;
        // height: 1.65vh;
        // height: 0.22rem;
      }
    }
  }
}
</style>