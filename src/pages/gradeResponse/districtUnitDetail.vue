<template>
  <div>
    <div class="detailHeader">
      <div class="headerContent clearfix">
        <van-collapse v-model="activeNames">
          <van-collapse-item size="0.32rem" :title="headerListData.name" name="1">
            <div class="response">
              <div class="responseBottom">
                <div class="bottomContent">
                  <div>
                    <span>发布时间</span>
                    <b>{{headerListData.gmtCreate}}</b>
                  </div>
                  <div>
                    <span>响应说明</span>
                    <b>{{headerListData.remark}}</b>
                  </div>
                  <div>
                    <span>响应单位</span>
                    <div style="display:flex;flexWrap:wrap;marginLeft:7.07vw">
                      <b
                        class="contentTag"
                        v-for="(item,index) in headerListData.platformList"
                        :key="index"
                      >
                        <span>{{item.platformName}}</span>
                      </b>
                    </div>
                  </div>
                  <div>
                    <span>附件</span>
                    <div>
                      <div class="contentInput">
                        <!-- <div
                          v-for="(val,i) in headerListData.publishDocumentList"
                          :key="'document'+i"
                        >{{val.documentName}}</div>-->
                        <a
                          v-for="(val,i) in headerListData.publishDocumentList"
                          :key="'document'+i"
                          :href="val.url"
                        >{{val.documentName}}</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </van-collapse-item>
        </van-collapse>
      </div>
    </div>
    <div class="detailMiddle">
      <div class="middleToggle">
        <van-tabs
          @change="tabsToggle"
          title-active-color="#333333"
          title-inactive-color="#666666"
          v-model="active"
        >
          <van-tab title="响应记录"></van-tab>
          <van-tab title="监督整改"></van-tab>
        </van-tabs>
      </div>
      <div class="middleScreen" v-show="indexIsSelect">
        <span
          class="screenText"
          @click="responseConditionQuery('responseReceiveBeginDate','responseReceiveEndDate','responseSearch','responsePlatformId')"
        >筛选</span>
        <input
          v-model="conditionQueryData.responseSearch"
          placeholder="请输入搜索关键字"
          class="screenSearch"
          type="text"
        />
        <i class="iconfont iconsousuo"></i>
      </div>
      <div class="middleCondition" v-show="indexIsSelect">
        <select class="conditionSelect" @change="responseConditionSelect($event)">
          <option selected value>全部整改单位</option>
          <option
            :value="item.id"
            v-for="(item,index) in platformList"
            :key="index"
          >{{item.platformName}}</option>
        </select>
        <select
          class="dateSelect"
          @click="responseShowBeginPopup"
          onmousedown="javascript:return false;"
        >
          <option
            value
          >{{dateSelect.responseBeginDate==''?dateFormatter(new Date(),'/',false):dateFormatter(dateSelect.responseBeginDate,'/',false) }}</option>
        </select>
        <van-popup
          v-model="dateSelect.responseBeginShow"
          position="bottom"
          :style="{ height: '30%' }"
        >
          <van-datetime-picker
            @confirm="responseBeginConfirmPicker"
            @cancel="cancelPicker"
            v-model="conditionQueryData.startTime"
            type="date"
            :min-date="minDate"
            :max-date="maxDate"
          />
        </van-popup>
        <span>至</span>
        <select
          class="dateSelect"
          @click="responseShowEndPopup"
          onmousedown="javascript:return false;"
        >
          <option
            value
          >{{dateSelect.responseEndDate==''?dateFormatter(new Date(),'/',false):dateFormatter(dateSelect.responseEndDate,'/',false) }}</option>
        </select>
        <van-popup
          v-model="dateSelect.responseEndShow"
          position="bottom"
          :style="{ height: '30%' }"
        >
          <van-datetime-picker
            @confirm="responseEndConfirmPicker"
            @cancel="cancelPicker"
            v-model="currentDate"
            type="date"
            :min-date="minDate"
            :max-date="maxDate"
          />
        </van-popup>
      </div>
      <div class="middleScreen" v-show="!indexIsSelect">
        <span
          class="screenText"
          @click="rectificationConditionQuery('rectificationReceiveBeginDate','rectificationReceiveEndDate','rectificationSearch','rectificationPlatformId')"
        >筛选</span>
        <input
          v-model="conditionQueryData.rectificationSearch"
          placeholder="请输入搜索关键字"
          class="screenSearch"
          type="text"
        />
        <i class="iconfont iconsousuo"></i>
      </div>
      <div class="middleCondition" v-show="!indexIsSelect">
        <select class="conditionSelect" @change="rectificationConditionSelect($event)">
          <option selected value>全部整改单位</option>
          <option
            :value="item.id"
            v-for="(item,index) in platformList"
            :key="index"
          >{{item.platformName}}</option>
        </select>
        <select
          class="dateSelect"
          @click="rectificationShowBeginPopup"
          onmousedown="javascript:return false;"
        >
          <option
            value
          >{{dateSelect.rectificationBeginDate == ''?dateFormatter(new Date(),'/',false):dateFormatter(dateSelect.rectificationBeginDate,'/',false) }}</option>
        </select>
        <van-popup
          v-model="dateSelect.rectificationBeginShow"
          position="bottom"
          :style="{ height: '30%' }"
        >
          <van-datetime-picker
            @confirm="rectificationBeginConfirmPicker"
            @cancel="cancelPicker"
            v-model="conditionQueryData.startTime"
            type="date"
            :min-date="minDate"
            :max-date="maxDate"
          />
        </van-popup>
        <span>至</span>
        <select
          class="dateSelect"
          @click="rectificationShowEndPopup"
          onmousedown="javascript:return false;"
        >
          <option
            value
          >{{dateSelect.rectificationEndDate==''?dateFormatter(new Date(),'/',false):dateFormatter(dateSelect.rectificationEndDate,'/',false) }}</option>
        </select>
        <van-popup
          v-model="dateSelect.rectificationEndShow"
          position="bottom"
          :style="{ height: '30%' }"
        >
          <van-datetime-picker
            @confirm="rectificationEndConfirmPicker"
            @cancel="cancelPicker"
            v-model="conditionQueryData.endTime"
            type="date"
            :min-date="minDate"
            :max-date="maxDate"
          />
        </van-popup>
      </div>
    </div>
    <div
      class="detailBottom"
      v-for="(item,index) in responseData"
      :key="index"
      v-show="indexIsSelect"
    >
      <div class="bottomTitle">响应单位：{{item.platformName}}</div>
      <div class="bottomContent">
        <div>
          <span>发布时间</span>
          <b>{{item.gmtCreate}}</b>
        </div>
        <div>
          <span>响应人数</span>
          <b>{{item.responNum}}人</b>
        </div>
        <div>
          <span>响应负责人</span>
          <b style="marginLeft:-3.7vw">{{item.person}}({{item.personPhone}})</b>
          <i class="iconfont iconshouji"></i>
        </div>
        <div>
          <span>响应说明</span>
          <b>{{item.remark}}</b>
        </div>
        <div class="contentImage">
          <img
            v-for="(val,i) in item.documentVoList"
            :key="i"
            :src="val.allUrl"
            @click="showPreviewImage(val.allUrl)"
            alt
          />
        </div>
      </div>
    </div>
    <div
      class="detailBottom"
      @click="selectSupervisionRectification(index)"
      v-for="(item,index) in RectificationUnitData"
      :key="'list'+index"
      v-show="!indexIsSelect"
    >
      <div class="bottomTitle">
        {{item.name}}
        <img v-if="item.status == 0" src="../../assets/img/waitHandle.png" alt />
        <img v-else src="../../assets/img/hadHandle.png" alt />
      </div>
      <div class="bottomContent">
        <div>
          <span>发布时间</span>
          <b>{{item.publishTime}}</b>
        </div>
        <div>
          <span>整改说明</span>
          <b>{{item.remark}}</b>
        </div>
        <div>
          <span>整改单位</span>
          <div style="display:flex;flexWrap:wrap;margin:0;marginLeft:-2vw">
            <b class="contentTag" v-for="(v,i) in item.platformList" :key="i">
              <span>{{v.platformName}}</span>
            </b>
          </div>
        </div>
        <div class="contentImage">
          <img v-for="(val,i) in item.documentVoList" :key="i" :src="val.allUrl" alt />
        </div>
      </div>
    </div>
    <div v-if="active == 0" style="marginTop:1.5vh"></div>
    <div v-if="active == 1" style="marginTop:9.75vh"></div>
    <div class="detailAdd">
      <button class="addButton" @click="newRectification" v-show="!indexIsSelect">新增整改</button>
    </div>
    <imagePreview ref="previewImage" :enlargeImageUrl="enlargeImageUrl"></imagePreview>
  </div>
</template>

<script>
// import imagePreview from "./imagePreview";
import imagePreview from "./imagePreview";
export default {
  components: {
    imagePreview,
  },
  data() {
    return {
      active: 0,
      show: false, //时间弹出层
      previewShow: false, //是否展示预览图片
      enlargeImageUrl: [], //接收到的放大图片的路径
      dateSelect: {
        responseBeginShow: false, //响应开始时间弹出层
        responseEndShow: false, //响应结束时间弹出层
        rectificationBeginShow: false, //整改时间弹出层
        rectificationEndShow: false, //整改时间弹出层
        responseBeginDate: "", //响应选项显示的开始时间
        responseEndDate: "", //响应选项显示结束的时间
        rectificationBeginDate: "", //整改选项显示结束的时间
        rectificationEndDate: "", //整改选项显示结束的时间
        responseReceiveBeginDate: "",
        responseReceiveEndDate: "",
        rectificationReceiveBeginDate: "",
        rectificationReceiveEndDate: "",
        responseSearch: "",
        rectificationSearch: "",
      },
      receiveEndDate: "",
      // date: "", //选中的时间
      activeNames: [], //当前展示的面板
      headerListData: [], //头部折叠区数据
      indexIsSelect: true,
      minDate: new Date(2020, 0, 1),
      maxDate: new Date(2025, 10, 1),
      currentDate: new Date(),
      id: "", //接收到的id
      index: "", //接收到的index
      responsePlatformId: "", //响应查询选中的平台id
      rectificationPlatformId: "", //整改查询选中的平台id
      responseData: "", //响应的数据
      platformList: [], //整改单位列表
      RectificationUnitData: [], //整改单位数据
      conditionQueryData: {
        search: "",
        page: 1,
        limit: 10,
        startTime: "",
        endTime: "",
        responseSearch: "",
        rectificationSearch: "",
      }, //列表带条件查询数据
    };
  },
  methods: {
    //切换tabs选项
    tabsToggle(index) {
      //console.log(index);
      localStorage.setItem("active", index);
      if (index == 0) {
        this.indexIsSelect = true;
        return;
      }
      this.indexIsSelect = false;
    },
    //初始化进来通过active判断需要看到哪个页面
    showActivePage() {
      if (this.active == 0) {
        this.indexIsSelect = true;
        return;
      }
      this.indexIsSelect = false;
    },
    //格式化起始时间结束时间
    dateFormatter(str, connect) {
      //默认返回yyyy-MM-dd HH-mm-ss
      var hasTime = arguments[2] != false ? true : false; //可传第三个参数false，返回yyyy-MM-dd
      var d = new Date(str);
      var year = d.getFullYear();
      var month =
        d.getMonth() + 1 < 10 ? "0" + (d.getMonth() + 1) : d.getMonth() + 1;
      var day = d.getDate() < 10 ? "0" + d.getDate() : d.getDate();
      var hour = d.getHours() < 10 ? "0" + d.getHours() : d.getHours();
      var minute = d.getMinutes() < 10 ? "0" + d.getMinutes() : d.getMinutes();
      var second = d.getSeconds() < 10 ? "0" + d.getSeconds() : d.getSeconds();
      if (hasTime) {
        return (
          [year, month, day].join(connect) +
          " " +
          [hour, minute, second].join(":")
        );
      } else {
        return [year, month, day].join(connect);
      }
    },
    //响应展示开始时间弹出层
    responseShowBeginPopup() {
      this.dateSelect.responseBeginShow = true;
    },
    //响应展示结束时间弹出层
    responseShowEndPopup() {
      this.dateSelect.responseEndShow = true;
    },
    //整改开始时间弹出层
    rectificationShowBeginPopup() {
      this.dateSelect.rectificationBeginShow = true;
    },
    //整改结束时间弹出层
    rectificationShowEndPopup() {
      this.dateSelect.rectificationEndShow = true;
    },
    //响应开始时间选择器点击完成
    responseBeginConfirmPicker(date) {
      this.dateSelect.responseBeginDate = this.dateFormatter(date, "-", false);
      this.dateSelect.responseReceiveBeginDate = this.dateFormatter(date, "-");
      // //console.log(
      //   this.dateSelect.responseBeginDate,
      //   this.dateSelect.responseReceiveBeginDate
      // );
      this.dateSelect.responseBeginShow = false;
    },
    //响应结束时间选择器点击完成
    responseEndConfirmPicker(date) {
      this.dateSelect.responseEndDate = this.dateFormatter(date, "-", false);
      this.dateSelect.responseReceiveEndDate =
        this.dateSelect.responseEndDate.trim() + " " + "23:59:59";
      // this.dateSelect.responseReceiveEndDate = this.dateFormatter(date, "-");
      // //console.log(
      //   this.dateSelect.responseEndDate,
      //   this.dateSelect.responseReceiveEndDate
      // );
      this.dateSelect.responseEndShow = false;
    },
    //整改开始时间选择器点击完成
    rectificationBeginConfirmPicker(date) {
      this.dateSelect.rectificationBeginDate = this.dateFormatter(
        date,
        "-",
        false
      );
      this.dateSelect.rectificationReceiveBeginDate = this.dateFormatter(
        date,
        "-"
      );
      // //console.log(
      //   this.dateSelect.rectificationBeginDate,
      //   this.dateSelect.rectificationReceiveBeginDate
      // );
      this.dateSelect.rectificationBeginShow = false;
    },
    //整改结束时间选择器点击完成
    rectificationEndConfirmPicker(date) {
      this.dateSelect.rectificationEndDate = this.dateFormatter(
        date,
        "-",
        false
      );
      this.dateSelect.rectificationReceiveEndDate =
        this.dateSelect.rectificationEndDate.trim() + "" + "23:59:59";
      // this.dateSelect.rectificationReceiveEndDate = this.dateFormatter(
      //   date,
      //   "-"
      // );
      // //console.log(
      //   this.dateSelect.rectificationEndDate,
      //   this.dateSelect.rectificationReceiveEndDate
      // );
      this.dateSelect.rectificationEndShow = false;
    },

    //时间选择器点击取消
    cancelPicker() {
      this.show = false;
    },
    //数据查询
    search() {
      this.$http({
        url: this.$http.adornUrl(`/level/levelPublish/list`),
        method: "post",
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
      });
    },
    //响应记录带条件查询
    responseConditionQuery(begin, end, search, platformId) {
      this.conditionQueryData.startTime =
        this.dateSelect[begin] == ""
          ? this.dateFormatter(new Date(), "-")
          : this.dateSelect[begin];
      this.conditionQueryData.endTime =
        this.dateSelect[end] == ""
          ? this.dateFormatter(new Date(), "-")
          : this.dateSelect[end];
      // this.conditionQueryData.search = this.dateSelect[search];
      this.$http({
        url: this.$http.adornUrl(`/level/levelResponseInfor/list`),
        method: "post",
        data: this.$http.adornData({
          search: this.conditionQueryData[search],
          startTime: this.conditionQueryData.startTime,
          endTime: this.conditionQueryData.endTime,
          page: 1,
          limit: 10,
          platformId: this[platformId],
          publishId: this.id,
        }),
      }).then((data) => {
        this.$toast.success('筛选成功');
        // //console.log("响应记录带条件查询data===》", data);
        this.responseData = data.data.data.list;
      });
    },
    // 响应记录
    detailListSearch() {
      this.$http({
        url: this.$http.adornUrl(`/level/levelPublish/getUnitAndResponse`),
        method: "post",
        data: this.$http.adornData({
          serach: "",
          startTime: "",
          endTime: "",
          page: 1,
          limit: 10,
          publishId: this.id,
        }),
      }).then((data) => {
        // //console.log("响应记录data===》", data);
        this.headerListData = data.data.LevelPublish;
        this.responseData = data.data.responseinfo.list;
        this.platformList = data.data.platformList;
      });
    },
    //监督整改
    supervisionRectification() {
      this.$http({
        url: this.$http.adornUrl(`/levelRectifyPublish/selectPageList`),
        method: "post",
        data: this.$http.adornData({
          publishId: this.id,
          status: "",
          limit: 10,
          search: "",
          startTime: "",
          endTime: "",
          page: 1,
        }),
      }).then((data) => {
        // //console.log("监督整改data===>", data);
        this.RectificationUnitData = data.data.data.list;
      });
    },
    //监督整改带条件查询
    rectificationConditionQuery(begin, end, search) {
      this.conditionQueryData.startTime =
        this.dateSelect[begin] == ""
          ? this.dateFormatter(new Date(), "-")
          : this.dateSelect[begin];
      this.conditionQueryData.endTime =
        this.dateSelect[end] == ""
          ? this.dateFormatter(new Date(), "-")
          : this.dateSelect[end];
      this.$http({
        url: this.$http.adornUrl(`/levelRectifyPublish/selectPageList`),
        method: "post",
        data: this.$http.adornData({
          publishId: this.id,
          status: "",
          limit: 10,
          search: this.conditionQueryData[search],
          startTime: this.conditionQueryData.startTime,
          endTime: this.conditionQueryData.endTime,
          page: 1,
        }),
      }).then((data) => {
        this.$toast.success('筛选成功');
        // //console.log("监督整改带条件查询data===>", data);
        this.RectificationUnitData = data.data.data.list;
      });
    },
    //选择查看监督整改下的详情
    selectSupervisionRectification(index) {
      let publishId = this.RectificationUnitData[index].id;
      let platformId = this.RectificationUnitData[index].platformId;
      localStorage.setItem("publishId", publishId);
      localStorage.setItem("platformId", platformId);
      localStorage.setItem("index", index);
      // //console.log("选中的index和publishId", index, publishId);
      this.$router.push({
        name: "districtUnitListBackUp",
      });
    },
    // 新增整改
    newRectification() {
      this.$router.push({
        name: "districtUnitAddRectification",
        params: {
          id: this.$route.params.id,
        },
      });
    },
    //响应记录条件选择
    responseConditionSelect(event) {
      //console.log(event);
      this.responsePlatformId = event.target.value;
    },
    //整改记录条件选择
    rectificationConditionSelect(event) {
      //console.log(event);
      this.rectificationPlatformId = event.target.value;
    },
    //显示放大的预览图
    showPreviewImage(imgurl) {
      this.enlargeImageUrl = [];
      this.$refs.previewImage.previewShow = true;
      this.enlargeImageUrl.push(imgurl);
    },
  },
  created() {
    this.id = JSON.parse(localStorage.getItem("id"));
    this.index = JSON.parse(localStorage.getItem("index"));
    this.active = JSON.parse(localStorage.getItem("active"));
    this.showActivePage();
    // //console.log("这是传过来的index===》", this.index, this.id);
    this.search(); //渲染头部折叠区数据
    this.detailListSearch();
    this.supervisionRectification();
  },
};
</script>

<style lang="less" scoped>
  .clearfix::before {
    content: "";
    display: table;
  }
  .detailHeader {
    // min-height: 8.4vh;
    min-height: 1.12rem;
    // margin: 1.5vh 2.67vw;
    margin: 0.2rem 2.67vw;
    .headerContent {
      // min-height: 8.4vh;
      min-height: 1.12rem;
      position: relative;
      background-color: #ffffff;
      .response {
        // min-height: 12.84vh;
        min-height: 1.72rem;
        background-color: #ffffff;
        // margin: 1.5vh 2.67vw;
        margin: 0.2rem 2.67vw;
        .responseBottom {
          .bottomContent {
            // padding-top: 1.5vh;
            padding-top: 0.2rem;
            div {
              // min-height: 4.5vh;
              // line-height: 4.5vh;
              min-height: 0.6rem;
              line-height: 0.6rem;
              display: flex;
              // margin-bottom: 0.9vh;
              margin-bottom: 0.12rem;
              // &:nth-last-child(1) {
              //   padding-bottom: 0.5vh;
              // }
              &:nth-last-child(1) {
                margin-bottom: 0;
              }
              span {
                display: inline-block;
                min-width: 14.93vw;
                margin-left: 1.33vw;
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
                // margin: 0 1.33vw 0.75vh 9.07vw;
                margin: 0 1.33vw 0.1rem 9.07vw;
                font-weight: normal;
                &.contentTag {
                  // height: 4.05vh;
                  // line-height: 4.05vh;
                  height: 0.54rem;
                  line-height: 0.54rem;
                  background: rgba(197, 222, 254, 0.28);
                  border-radius: 3.6vw;
                  margin-left: 0;
                  // padding: 0.1vh 2vw;
                  padding: 0.01rem 2vw;
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
                // min-height: 4.5vh;
                min-height: 0.6rem;
                display: block;
                a {
                  display: block;
                  color: #0091ff;
                  font-size: 0.28rem;
                  font-family: PingFangSC-Regular, PingFang SC;
                }
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
      .van-hairline--top-bottom::after {
        border: none;
      }
      /deep/.van-cell__title {
        font-size: 0.32rem;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: bold;
      }
      .van-collapse-item {
        // margin-top: 1vh;
        margin-top: 0.13rem;
      }
      /deep/.van-collapse-item__content {
        padding: 0;
      }
    }
  }
  .detailMiddle {
    .middleToggle {
      // height: 7.5vh;
      height: 1rem;
      background-color: #ffffff;
      /deep/.van-tabs__wrap {
        // height: 7.5vh;
        height: 1rem;
      }
      /deep/.van-tabs__line {
        background-color: #0091ff;
        width: 10.67vw !important;
        // height: 0.3vh;
        height: 0.04rem;
      }
      .van-tab__pane {
        background-color: #ffffff;
      }
      /deep/.van-tab--active {
        font-weight: bold;
      }
      /deep/ .van-tab__text--ellipsis {
        font-size: 0.28rem;
        font-family: PingFangSC-Regular, PingFang SC;
      }
    }
    .middleScreen {
      // height: 6.75vh;
      height: 0.9rem;
      display: flex;
      align-items: center;
      background-color: #ffffff;
      position: relative;
      .screenText {
        // margin-top: 2.62vh;
        margin-left: 6vw;
        color: #0091ff;
        font-weight: 400;
        font-size: 0.28rem;
        font-family: PingFangSC-Regular, PingFang SC;
      }
      .screenSearch {
        width: 78.13vw;
        // height: 3.75vh;
        // line-height: 3.75vh;
        height: 0.5rem;
        line-height: 0.5rem;
        border-radius: 3.33vw;
        margin-left: 4.13vw;
        background-color: #f2f2f2;
        border: none;
        padding-left: 7.33vw;
        box-sizing: border-box;
        font-size: 0.28rem;
        font-family: PingFangSC-Regular, PingFang SC;
      }
      .iconsousuo {
        display: inline-block;
        // height: 2.55vh;
        // line-height: 2.55vh;
        height: 0.34rem;
        line-height: 0.34rem;
        position: absolute;
        // top: 2.1vh;
        top: 0.28rem;
        left: 20.73vw;
        font-size: 0.28rem;
        color: #999999;
      }
    }
    .middleCondition {
      display: flex;
      align-items: center;
      // height: 7.5vh;
      height: 1rem;
      background-color: #ffffff;
      padding-left: 2.27vw;
      .conditionSelect {
        width: 28.67vw;
        // height: 4.5vh;
        // line-height: 4.5vh;
        height: 0.6rem;
        line-height: 0.6rem;
        background-color: #f2f2f2;
        color: #333333;
        font-weight: bold;
        // margin: 1.5vh 2.67vw 1.5vh 0;
        margin: 0.2rem 2.67vw 0.2rem 0;
        border-radius: 4.27vw;
        color: rgba(51, 51, 51, 1);
        font-size: 0.24rem;
        font-family: PingFangSC-Medium, PingFang SC;
        padding-left: 2vw;
        box-sizing: border-box;
        border: none;
        outline: none;
        option {
          text-align: center;
        }
      }
      .dateSelect {
        min-width: 23.8vw;
        // height: 4.5vh;
        // line-height: 4.5vh;
        height: 0.6rem;
        line-height: 0.6rem;
        background-color: #f2f2f2;
        color: #333333;
        font-weight: bold;
        // margin: 1.5vh 2.67vw 1.5vh 0;
        margin: 0.2rem 2.67vw 0.2rem 0;
        border-radius: 4.27vw;
        color: rgba(51, 51, 51, 1);
        font-size: 0.24rem;
        font-family: Roboto-Medium, Roboto;
        padding-left: 2vw;
        box-sizing: border-box;
        border: none;
        option {
          text-align: center;
        }
      }
      span {
        color: #666666;
        font-size: 0.24rem;
        font-family: PingFangSC-Light, PingFang SC;
        margin-right: 2.67vw;
      }
    }
  }
  .detailBottom {
    // min-height: 48.95vh;
    min-height: 6.54rem;
    // margin: 1.5vh 2.67vw 0 2.67vw;
    margin: 0.2rem 2.67vw 0 2.67vw;
    background-color: #ffffff;
    position: relative;
    .bottomTitle {
      // min-height: 8.4vh;
      // line-height: 8.4vh;
      min-height: 1.12rem;
      line-height: 1.12rem;
      margin: 0 5.07vw;
      // border-bottom: 0.07vh solid #e8e8e8;
      border-bottom: 0.01rem solid #e8e8e8;
      font-size: 0.32rem;
      font-family: PingFangSC-Medium, PingFang SC;
      color: #333333;
      font-weight: bold;
      img {
        position: absolute;
        width: 10.67vw;
        // height: 6vh;
        height: 0.8rem;
        right: 0;
      }
    }
    .bottomContent {
      div {
        // margin: 1.5vh 0 0.6vh 5.33vw;
        // min-height: 4.5vh;
        // line-height: 4.5vh;
        margin: 0.2rem 0 0.08rem 5.33vw;
        min-height: 0.6rem;
        line-height: 0.6rem;
        font-size: 0.28rem;
        display: flex;
        position: relative;
        span {
          color: #999999;
          margin-right: 9.07vw;
          display: inline-block;
          font-size: 0.28rem;
          font-family: PingFangSC-Regular, PingFang SC;
          white-space: nowrap;
        }
        b {
          font-weight: normal;
          &.contentTag {
            // height: 4.05vh;
            // line-height: 4.05vh;
            height: 0.54rem;
            line-height: 0.54rem;
            background: rgba(197, 222, 254, 0.28);
            border-radius: 3.6vw;
            // margin: 0 1.33vw 0.75vh 0;
            margin: 0 1.33vw 0.1rem 0;
            span {
              font-size: 0.24rem;
              font-family: PingFangSC-Medium, PingFang SC;
              font-weight: bold;
              text-align: center;
              color: #0091ff;
              margin: 0 2.27vw;
              max-width: 60vw;
              overflow: hidden;
              white-space: nowrap;
              text-overflow: ellipsis;
            }
          }
        }
      }
      div:nth-child(4) {
        // margin: 1.5vh 0 0 5.33vw;
        margin: 0.2rem 0 0 5.33vw;
      }
      .iconshouji {
        display: inline-block;
        width: 2.97vw;
        // height: 2.49vh;
        height: 0.33rem;
        color: #0091ff;
        position: absolute;
        right: 5.33vw;
        font-size: 0.32rem;
      }
      .contentImage {
        margin-left: 4.27vw;
        // padding-bottom: 2.62vh;
        padding-bottom: 0.35rem;
        background-color: #ffffff;
        display: inline-block;
        img {
          // width: 41.73vw;
          // height: 13.19vh;
          height: 1.76rem;
          margin-right: 2.67vw;
          // margin-top: 1.5vh;
          margin-top: 0.2rem;
          vertical-align: middle;
        }
      }
    }
  }
  .detailAdd {
    position: fixed;
    z-index: 1000;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    text-align: center;
    background-color: #f1f3f4;
    .addButton {
      width: 85.33vw;
      // height: 6.75vh;
      height: 0.9rem;
      background: linear-gradient(
        360deg,
        rgba(43, 128, 255, 1) 0%,
        rgba(101, 188, 255, 1) 100%
      );
      box-shadow: 0px 6px 12px 0px rgba(12, 126, 161, 0.35);
      border-radius: 10vw;
      color: #ffffff;
      font-size: 0.4rem;
      font-family: PingFangSC-Regular, PingFang SC;
      border: none;
      // margin: 1.5vh 0;
      margin: 0.2rem 0;
    }
  }
</style>