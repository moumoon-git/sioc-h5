<template>
  <div v-cloak>
    <div v-if="listData.length!=0">
      <div
        class="response"
        v-for="(item,index) in listData"
        :key="index"
        @click="goUnitDetail(item.id,index,item.platformId)"
      >
        <div class="responseHeader">{{item.name}}</div>
        <div class="responseBottom">
          <div class="bottomContent">
            <div>
              <span>发布时间</span>
              <b>{{item.gmtCreate}}</b>
            </div>
            <div>
              <span>响应说明</span>
              <b>{{item.remark}}</b>
            </div>
            <div>
              <span>响应单位</span>
              <div style="display:flex;flexWrap:wrap;marginLeft:7.07vw">
                <b class="contentTag" v-for="(val,i) in item.platformList" :key="i">
                  <span>{{val.platformName}}</span>
                </b>
              </div>
            </div>
            <div>
              <span>附件</span>
              <div class="contentInput">
                <div
                  v-for="(val,i) in item.publishDocumentList"
                  :key="'document'+i"
                >{{val.documentName}}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="listData!=null&listData.length == 0" class="empty">暂无数据</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 列表数据
      listData: null,
    };
  },
  methods: {
    //获取平台列表
    getPlatformList() {
      this.$http({
        url: this.$http.adornUrl(`/level/levelPublish/selectSonPlatforms`),
        method: "get",
        params: this.$http.adornParams({}),
      }).then((data) => {
        // //console.log("获取到的平台列表的data===》", data);
      });
    },
    // 列表带条件查询
    search() {
      this.$http({
        url: this.$http.adornUrl(`/level/levelPublish/list`),
        method: "post",
        // headers:{
        //   contentType:'text/plain'
        // },
        data: this.$http.adornData({
          search: "",
          page: 1,
          limit: 10,
          startTime: "",
          endTime: "",
          type: 1,
        }),
      }).then((data) => {
        // //console.log("列表带条件查询data===》", data);
        this.listData = data.data.page.list;
      });
    },
    //点击跳转到详情页
    goUnitDetail(id, index, platformId) {
      // //console.log(id, index, platformId);
      localStorage.setItem("id", id);
      localStorage.setItem("index", index);
      this.$router.push({
        name: "districtUnitDetail",
      });
    },
  },
  created() {
    this.search();
    this.getPlatformList();
    localStorage.setItem("active", 0);
  },
};
</script>

<style lang="less" scoped>
  [v-cloak] {
    display: none !important;
  }
  .response {
    font-family: PingFangSC-Medium, PingFang SC;
    min-height: 37.56vh;
    background-color: #ffffff;
    margin: 1.5vh 2.67vw;
    .responseHeader {
      height: 8.4vh;
      line-height: 8.4vh;
      width: 84.53vw;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      margin: 0 5.07vw;
      border-bottom: 0.07vh solid #dddddd;
      color: #333333;
      font-weight: bold;
      font-size: 0.32rem;
      font-family: PingFangSC-Medium, PingFang SC;
    }
    .responseBottom {
      .bottomContent {
        padding-top: 1.5vh;
        div {
          min-height: 4.5vh;
          line-height: 4.5vh;
          display: flex;
          margin-bottom: 0.9vh;
          &:nth-last-child(1) {
            padding-bottom: 0.5vh;
          }
          &:nth-last-child(1) {
            margin-bottom: 0;
          }
          span {
            display: inline-block;
            min-width: 14.93vw;
            margin-left: 5.33vw;
            color: #999999;
            font-size: 0.28rem;
            font-family: PingFangSC-Regular, PingFang SC;
          }
          b {
            display: inline-block;
            max-width: 60vw;
            color: #333333;
            font-size: 0.28rem;
            font-family: PingFangSC-Regular, PingFang SC;
            margin: 0 1.33vw 0.75vh 9.07vw;
            font-weight: normal;
            &.contentTag {
              height: 4.05vh;
              line-height: 4.05vh;
              background: rgba(197, 222, 254, 0.28);
              border-radius: 3.6vw;
              margin-left: 0;
              padding: 0.1vh 2vw;
              span {
                display: inline-block;
                font-size: 0.24rem;
                font-family: PingFangSC-Medium, PingFang SC;
                font-weight: bold;
                margin-left: 0;
                text-align: center;
                color: #0091ff;
                max-width: 60vw;
                // white-space: normal;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
              }
            }
          }
          .contentInput {
            margin-left: 9.07vw;
            overflow: hidden;
            min-height: 4.5vh;
            display: block;
            div {
              color: #0091ff;
              font-size: 0.28rem;
              font-family: PingFangSC-Regular, PingFang SC;
            }
          }
        }
      }
    }
  }
  .empty {
    height: 100vh;
    font-size: 0.4rem;
    font-family: PingFangSC-Regular, PingFang SC;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: bold;
    color: #cccccc;
  }
</style>