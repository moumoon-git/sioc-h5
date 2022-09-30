<template>
  <div class="inspectionItems">
    <div v-if="!myMapVisible" style="padding-bottom:10vh;">
      <section
        style="width: 93%;margin: 2vh auto auto auto;border-radius: 5px;background: rgb(255, 255, 255);"
        v-for="(item,index) in inspectionTaskItems"
        :key="index"
        @click="expand(index);fileUploadIndex=index"
      >
        <div
          style="font-size: 16px;font-family: PingFangSC-Medium;font-weight: 1000;color: rgb(51, 51, 51);height: 10vh;line-height: 10vh;position: relative;"
        >
          <span style="margin-left: 5vw;">{{item.name}}</span>
          <img
            :src="require(item.inspectionResults=='1'?'@/assets/img/normal.png':(item.inspectionResults=='0'?'@/assets/img/abnormal.png':'@/assets/img/noChecked.png'))"
            style="position: absolute;right: 0%;height: 10vh;"
          />
        </div>
        <div style="width:88%;height:1px;background:rgba(221,221,221,1);margin: auto;"></div>
        <div :style="{width:'100%','font-size': '15px','padding-bottom':'0.1px'}" class="content">
          <div style="width: 90%;margin: 2vh auto;">{{item.content}}</div>

          <div v-if="item.expandVisible">
            <div>
              <span
                style="font-family:PingFangSC-Regular,PingFang SC;font-weight:400;color:rgba(51,51,51,1);"
              >检查结果</span>
              <div style="padding: 1vh 0px 0px;">
                <div
                  :style="{display:'inline-block',width:'28vw',height:'6vh','line-height': '6vh','text-align':'center',background:item.inspectionResults=='1'?'rgba(22,200,139,0.1)':'rgba(245,245,245,1)','border-radius':'8px',border:item.inspectionResults=='1'?'2px solid rgba(22,200,139,1)':'2px solid rgba(245,245,245,1)',color:item.inspectionResults=='1'?'rgba(22,200,139,1)':'initial',position:'relative'}"
                  @click.stop="onInspectionResults(index,'1')"
                >
                  正常
                  <i
                    v-if="item.inspectionResults=='1'"
                    class="iconfont iconzhengque"
                    style="color:#19be6b;position: absolute;right: -7%;bottom: -47%;"
                  ></i>
                </div>
                <div
                  :style="{display:'inline-block',width:'28vw',height:'6vh','line-height': '6vh','text-align':'center',background:item.inspectionResults=='0'?'rgba(211,40,40,0.1)':'rgba(245,245,245,1)','border-radius':'8px',border:item.inspectionResults=='0'?'2px solid rgba(250,126,126,1)':'2px solid rgba(245,245,245,1)',color:item.inspectionResults=='0'?'rgba(246,110,110,1)':'initial','margin-left':'3vw',position:'relative'}"
                  @click.stop="onInspectionResults(index,'0')"
                >
                  异常
                  <i
                    v-if="item.inspectionResults=='0'"
                    class="iconfont iconjinggao"
                    style="color:#fa7e7e;position: absolute;right: -7%;bottom: -47%;"
                  ></i>
                </div>
              </div>
            </div>

            <div v-if="item.inspectionResults=='0'">
              <span
                style="font-family:PingFangSC-Regular,PingFang SC;font-weight:400;color:rgba(51,51,51,1);"
              >通知处置人员</span>
              <div style="padding: 1vh 0px 0px;">
                <van-radio-group v-model="item.isNotice" direction="horizontal">
                  <van-radio name="0">通知</van-radio>
                  <van-radio name="1">不通知</van-radio>
                </van-radio-group>
              </div>
            </div>

            <div>
              <span
                style="font-family:PingFangSC-Regular,PingFang SC;font-weight:400;color:rgba(51,51,51,1);"
              >情况说明</span>
              <div style="padding: 1vh 0px 0px;">
                <van-field
                  v-model="item.situationExplain"
                  label
                  placeholder="请输入情况说明"
                  style="padding: 0px;"
                  @input="onInputSituationExplain"
                />
              </div>
            </div>
            <div style="width:88%;height:1px;background:rgba(221,221,221,1);margin: auto;"></div>

            <div>
              <span
                style="font-family:PingFangSC-Regular,PingFang SC;font-weight:400;color:rgba(51,51,51,1);"
              >拍照说明</span>
              <div style="padding: 1vh 0px 0px;">
                <van-uploader v-model="item.fileList" :after-read="afterRead" @delete="deleteFile" />
              </div>
            </div>
            <div style="width:88%;height:1px;background:rgba(221,221,221,1);margin: auto;"></div>

            <div>
              <span
                style="font-family:PingFangSC-Regular,PingFang SC;font-weight:400;color:rgba(51,51,51,1);"
              >巡查地址</span>
              <div style="padding: 1vh 0px 0px;">
                <i
                  class="iconfont icondingwei1"
                  style="color:rgba(0,145,255,1);"
                  @click="openMap(index)"
                ></i>
                {{item.location.poiaddress}}
              </div>
              <!-- <van-field
                  v-model="poiaddress"
                  label
                  placeholder="请输入巡查地址"
                  style="padding: 0px;"
                  @input="onInputPoiaddress"
              /> -->
            </div>
            <div style="width:88%;height:1px;background:rgba(221,221,221,1);margin: auto;"></div>

            <div style="display: flex;justify-content: center;align-items: center;">
              <!-- <span
                :style="{'font-family':'PingFangSC-Regular,PingFang SC','font-weight':'400',color:item.saveAble?'rgba(0,145,255,1)':'rgba(204,204,204,1)'}"
              >取消</span>
              <span
                style="display:inline-block;width:2px;height:2vh;background:rgba(221,221,221,1);margin-left: 3vw;"
              ></span> -->
              <span
                :style="{'font-family':'PingFangSC-Regular,PingFang SC','font-weight':'400',color:item.saveAble?'rgba(0,145,255,1)':'rgba(204,204,204,1)','margin-left': '3vw'}"
                @click="saveThrottle(item.saveAble,index)"
              >保存</span>
            </div>
          </div>
        </div>
      </section>

      <section
        style="width:100%;height:8vh;line-height:8vh;position: fixed;display: flex;bottom: 0%;"
      >
        <div
          style="width:62%;height:100%;display: inline-block;text-align: center;background: white;"
        >
          <div style="display:inline-block;white-space: nowrap;">
            <i class="iconfont iconzhengque" style="color:#19be6b;"></i>
            <span
              style="font-family:PingFangSC-Regular,PingFang SC;font-weight:400;color:rgba(51,51,51,1);margin-left: 2vw;"
            >正常：{{inspectionTaskItems.normalTotal}}</span>
          </div>

          <div style="display:inline-block;white-space: nowrap;margin-left: 6vw;">
            <i class="iconfont iconjinggao" style="color:#fa7e7e;"></i>
            <span
              style="font-family:PingFangSC-Regular,PingFang SC;font-weight:400;color:rgba(51,51,51,1);margin-left: 2vw;"
            >异常：{{inspectionTaskItems.abnormalTotal}}</span>
          </div>
        </div>
        <div
          :style="{width:'38%',height:'100%',display: 'inline-block',background:inspectionTaskItems.every(function (elem, index, arr) {return elem.saveAble==true })?'rgba(0,145,255,1)':'rgba(221,221,221,1)','text-align':'center','font-family': 'PingFangSC-Medium,PingFang SC','font-weight': '500',color: 'rgba(255,255,255,1)'}"
          @click="confirmSubmissionThrottle"
        >确认提交</div>
      </section>
    </div>

    <myMap v-if="myMapVisible" ref="myMap" @closeMap="closeMap"></myMap>
    <Loading ref="loading"></Loading>
  </div>
</template>

<script>
import Loading from '../commonLoading/commonLoading'
import {debounce,throttle} from './utils.js'
import { mapMutations, mapActions, mapGetters } from "vuex";
import { Toast } from "vant";
import myMap from "./myMap";
export default {
  name: "inspectionItems",
  data() {
    return {
      flag: false,//是否点击确认提交的标志
      flag1: false,//是否点击保存的标志
      myMapVisible: false,
      inspectionTaskItems: [],
      fileUploadIndex: "",
      temporaryFileList: [],
      compressSize: 1, //压缩比例
      acceptInspectionTaskItems: [], 
      acceptInstanceEntitiesId: '',
      acceptTaskId: '',
      poiaddress: '',
    };
  },
  components: {
    myMap,
    Loading
  },
  computed: {
    ...mapGetters(["location"])
  },
  watch: {
    inspectionTaskItems: {
      handler(newValue, oldValue) {
        this.inspectionTaskItems.forEach((item, index) => {
          if (
            item.inspectionResults &&
            item.situationExplain &&
            item.fileList.length &&
            Object.keys(item.location).length
          ) {
            item.saveAble = true;
          } else {
            item.saveAble = false;
          }
        });
      },
      deep: true
    }
  },
  created() {
    //console.log("this.$route", this.$route);
    var that = this;
    new Promise(function(resolve, reject) {
      that.acceptInspectionTaskItems = JSON.parse(localStorage.getItem('inspectionTaskItems'));
      that.acceptTaskId = JSON.parse(localStorage.getItem('taskId'));
      // that.$route.params.inspectionTaskItems.forEach((element, index) => {
      that.acceptInspectionTaskItems.forEach((element, index) => {
        (element.inspectionResults = ""),
          (element.fileList = []),
          (element.expandVisible = false),
          (element.isNotice = "1"),
          (element.location = {}),
          (element.situationExplain = ""),
          (element.saveAble = false);
        that.temporaryFileList.push([]);
        // if (index == that.$route.params.inspectionTaskItems.length - 1) {
        if (index == that.acceptInspectionTaskItems.length - 1) {
          resolve();
        }
      });
    }).then(() => {
      that.acceptInstanceEntitiesId = localStorage.getItem('instanceEntitiesId');
      // if (that.$route.params.instanceEntitiesId) {
      if (that.acceptInstanceEntitiesId) {
        that
          .$http({
            url: that.$http.adornUrl(
              // `/investigation/instanceInfor/info/${that.$route.params.instanceEntitiesId}`
              `/investigation/instanceInfor/info/${that.acceptInstanceEntitiesId}`
            ),
            method: "get"
          })
          .then(({ data }) => {
            //console.log("/investigation/instanceInfor/info", data);

            data.data.inforEntitys.forEach((item, itemIndex) => {
              if (item.instanceInforEntity) {
                // that.$route.params.inspectionTaskItems.instanceId = data.data.inforEntitys.filter(
                that.acceptInspectionTaskItems.instanceId = data.data.inforEntitys.filter(
                  item => {
                    return item.instanceInforEntity != null;
                  }
                )[0].instanceInforEntity.instanceId;
                // that.$route.params.inspectionTaskItems.forEach(
                that.acceptInspectionTaskItems.forEach(
                  (element, elementIndex) => {
                    if (element.id == item.id) {
                      // element=item

                      element.instanceInforEntity = item.instanceInforEntity;
                      element.inspectionResults =
                        item.instanceInforEntity.status;

                      if (item.instanceInforEntity.documentList) {
                        element.fileList = item.instanceInforEntity.documentList.map(
                          documentListItem => {
                            return { url: documentListItem.allUrl };
                          }
                        );
                        that.temporaryFileList[
                          itemIndex
                        ] = item.instanceInforEntity.documentList.map(
                          documentListItem => {
                            return {
                              name: documentListItem.name,
                              url: documentListItem.url
                            };
                          }
                        );
                      }

                      element.location = {
                        poiaddress: item.instanceInforEntity.place,
                        latlng: {
                          lng: item.instanceInforEntity.longitude,
                          lat: item.instanceInforEntity.latitude
                        }
                      };
                      element.situationExplain =
                        item.instanceInforEntity.remark;
                    }
                    if (
                      elementIndex ==
                      // that.$route.params.inspectionTaskItems.length - 1
                      that.acceptInspectionTaskItems.length - 1
                    ) {
                      // that.$route.params.inspectionTaskItems.normalTotal = 0;
                      that.acceptInspectionTaskItems.normalTotal = 0;
                      // that.$route.params.inspectionTaskItems.abnormalTotal = 0;
                      that.acceptInspectionTaskItems.abnormalTotal = 0;
                      // that.$route.params.inspectionTaskItems.forEach(item => {
                      that.acceptInspectionTaskItems.forEach(item => {
                        if (item.inspectionResults == "1") {
                          // that.$route.params.inspectionTaskItems.normalTotal += 1;
                          that.acceptInspectionTaskItems.normalTotal += 1;
                        }
                        if (item.inspectionResults == "0") {
                          // that.$route.params.inspectionTaskItems.abnormalTotal += 1;
                          that.acceptInspectionTaskItems.abnormalTotal += 1;
                        }
                      });
                      that.inspectionTaskItems =
                        // that.$route.params.inspectionTaskItems;
                        that.acceptInspectionTaskItems;
                    }
                  }
                );
              } else {
                that.inspectionTaskItems =
                  // that.$route.params.inspectionTaskItems;
                  that.acceptInspectionTaskItems;
              }
            });
          });
      } else {
        // that.inspectionTaskItems = that.$route.params.inspectionTaskItems;
        that.inspectionTaskItems = that.acceptInspectionTaskItems;
      }
    });
  },
  mounted() {},
  methods: {
    // afterRead(file) {
    //   // 此时可以自行将文件上传至服务器
    //   //console.log("file", file);
    //   var formData = new FormData();
    //   formData.append("file", file.file);

    //   file.status = "uploading";
    //   file.message = "上传中...";
    //   // this.temporaryFileList[this.fileUploadIndex].push({
    //   //   name: file.file.name,
    //   //   url: file.content
    //   // });
    //   this.$set(
    //     this.inspectionTaskItems,
    //     this.fileUploadIndex,
    //     this.inspectionTaskItems[this.fileUploadIndex]
    //   );
    //   this.$http({
    //     url: this.$http.adornUrl("/upload/passImg"),
    //     method: "post",
    //     data: formData,
    //     headers: {
    //       "content-type": "multipart/form-data"
    //     },
    //     processData: false
    //   }).then(({ data }) => {
    //     //console.log("/upload/passImg", data, this.fileUploadIndex);
    //     file.status = "";
    //     file.message = "";
    //     if (data.code == 0) {
    //       this.temporaryFileList[this.fileUploadIndex].push({
    //         name: data.data.name,
    //         url: data.data.url
    //       });
    //       this.$set(
    //         this.inspectionTaskItems,
    //         this.fileUploadIndex,
    //         this.inspectionTaskItems[this.fileUploadIndex]
    //       );
    //       //console.log(
    //         "this.inspectionTaskItems[this.fileUploadIndex]",
    //         this.inspectionTaskItems[this.fileUploadIndex]
    //       );
    //     }
    //   });
    // },
    afterRead(file) {
      // 此时可以自行将文件上传至服务器
      //console.log("file", file);
      var content = file.content;
      var name = file.file.name;
      file.status = "uploading";
      file.message = "上传中...";
      // 设置图片的压缩比例
      this.compressImg(file.file.size);
      new Promise((resolve, reject) =>{
        // 创建Canvas对象(画布)
        let canvas = document.createElement("canvas");
        // 获取对应的CanvasRenderingContext2D对象(画笔)
        let context = canvas.getContext("2d");
        // 创建新的图片对象
        let img = new Image();
        // 指定图片的DataURL(图片的base64编码数据)
        img.src = file.content;
        // 监听浏览器加载图片完成，然后进行进行绘制
        img.onload = () => {
          if (this.compressSize > 1) {
            // 指定canvas画布大小，该大小为最后生成图片的大小
            canvas.width = img.width / this.compressSize;
            canvas.height = img.height / this.compressSize;
            /* drawImage画布绘制的方法。(0,0)表示以Canvas画布左上角为起点，400，300是将图片按给定的像素进行缩小。
          如果不指定缩小的像素图片将以图片原始大小进行绘制，图片像素如果大于画布将会从左上角开始按画布大小部分绘制图片，最后的图片就是张局部图。*/

            context.drawImage(img, 0, 0, canvas.width, canvas.height);
            // 将绘制完成的图片重新转化为base64编码，file.file.type为图片类型，0.92为默认压缩质量
            // file.content = canvas.toDataURL(file.file.type, 0.92);
            var dataurl = canvas.toDataURL("image/png");
            var arr = dataurl.split(","),
              mime = arr[0].match(/:(.*?);/)[1],
              bstr = atob(arr[1]),
              n = bstr.length,
              u8arr = new Uint8Array(n);
            while (n--) {
              u8arr[n] = bstr.charCodeAt(n);
            }
            var file = new File([u8arr], name, { type: mime });
            console.info(file);
            // 最后将base64编码的图片保存到数组中，留待上传。
            resolve(file);
            //console.log(file);
          } 
          else {
            resolve();
          }
        };
      }).then((fil)=>{
        var formData = new FormData();
        //console.log(fil,file)
        formData.append("file", fil?fil : file.file);
      // this.temporaryFileList[this.fileUploadIndex].push({
      //   name: file.file.name,
      //   url: file.content
      // });
      this.$set(
        this.inspectionTaskItems,
        this.fileUploadIndex,
        this.inspectionTaskItems[this.fileUploadIndex]
      );
      this.$http({
        url: this.$http.adornUrl("/upload/passImg"),
        method: "post",
        data: formData,
        headers: {
          "content-type": "multipart/form-data"
        },
        processData: false
      }).then(({ data }) => {
        //console.log("/upload/passImg", data, this.fileUploadIndex);
        file.status = "";
        file.message = "";
        if (data.code == 0) {
          this.temporaryFileList[this.fileUploadIndex].push({
            name: data.data.name,
            url: data.data.url
          });
          this.$set(
            this.inspectionTaskItems,
            this.fileUploadIndex,
            this.inspectionTaskItems[this.fileUploadIndex]
          );
          //console.log(
          //   "this.inspectionTaskItems[this.fileUploadIndex]",
          //   this.inspectionTaskItems[this.fileUploadIndex]
          // );
        }
      });
      })

    },
    /**
     * @description: 根据图片的大小设置压缩的比例
     * @param {string} size 图片的大小
     * @return {}
     */
    compressImg(size) {
      if (size < 1024 * 1024) {
        // 图片小于1M的情况
        this.compressSize = 1;
      } else {
        // 图片大于1M的情况
        let num = size / (1024 * 1024); // 获取图片大小与1M大小的比例
        this.compressSize = num * 2; // 设置压缩比例
      }
      //console.log(this.compressSize);
    },
    deleteFile(file) {
      //console.log("删除了文件", file);
      var temporaryIndex;
      Promise.resolve(
        this.inspectionTaskItems[this.fileUploadIndex].fileList.forEach(
          (item, index) => {
            if (item.url == file.url) {
              temporaryIndex = index;
            }
          }
        )
      ).then(() => {
        this.$set(
          this.inspectionTaskItems,
          this.fileUploadIndex,
          this.inspectionTaskItems[this.fileUploadIndex]
        );
      });

      this.temporaryFileList[this.fileUploadIndex] = this.temporaryFileList[
        this.fileUploadIndex
      ].filter(item => {
        return (
          item.url.search(
            file.url.split("/")[file.url.split("/").length - 1]
          ) == -1
        );
      });
    },
    closeMap(index) {
      this.inspectionTaskItems[index].location = this.location;
      this.$set(
        this.inspectionTaskItems,
        index,
        this.inspectionTaskItems[index]
      );
      this.myMapVisible = false;
    },
    expand(index) {
      this.inspectionTaskItems[index].expandVisible = true;
      this.$set(
        this.inspectionTaskItems,
        index,
        this.inspectionTaskItems[index]
      );
    },
    onInspectionResults(index, type) {
      this.inspectionTaskItems[index].inspectionResults = type;
      this.$set(
        this.inspectionTaskItems,
        index,
        this.inspectionTaskItems[index]
      );
    },
    openMap(index) {
      // this.myMapVisible=true;
      // setTimeout(()=>{
      //   this.$refs.myMap.index=index
      // })
      var Position;
      var that = this;

      AMap.plugin("AMap.Geolocation", function() {
        var geolocation = new AMap.Geolocation({
          // 是否使用高精度定位，默认：true
          enableHighAccuracy: true,
          // 设置定位超时时间，默认：无穷大
          timeout: 10000,
          //显示定位按钮，默认：true
          showButton: true
        });

        geolocation.getCurrentPosition(function(status, result) {
          if (status == "complete") {
            //console.log("result", result);
            that.inspectionTaskItems[index].location = {
              poiaddress: result.formattedAddress,
              latlng: { lng: result.position.lng, lat: result.position.lat }
            };
            that.$set(
              that.inspectionTaskItems,
              index,
              that.inspectionTaskItems[index]
            );
          }
        });
      });

      //百度地图
      // var geolocation = new BMap.Geolocation();
      // geolocation.getCurrentPosition(function(r){
      //   if(this.getStatus() == BMAP_STATUS_SUCCESS){

      //     // alert('您的位置：'+r.point.lng+','+r.point.lat);
      //     that.$http({
      //       url: that.$http.adornUrl(`/investigation/instanceInfor/getAdressFromTencent?lat=${r.point.lat}&lng=${r.point.lng}`),
      //       method: 'get',
      //     }).then(({ data })=>{
      //       //console.log("/investigation/instanceInfor/getAdressFromTencent",data)
      //       that.inspectionTaskItems[index].location={poiaddress:data.address,latlng:{lng:r.point.lng,lat:r.point.lat}}
      //       that.$set(that.inspectionTaskItems,index,that.inspectionTaskItems[index])
      //     })

      //   }
      //   else {
      //     alert('failed'+this.getStatus());
      //   }
      // },{enableHighAccuracy: true})

      //腾讯地图
      // var geolocation = new qq.maps.Geolocation("XIGBZ-SL2WF-6TXJP-J3PN2-4ZX7J-ZBFRC", "myapp");
      // geolocation.getLocation(showPosition, {timeout: 8000})
      // function showPosition(position) {
      //   Position=position
      //   that.$http({
      //     url: that.$http.adornUrl(`/investigation/instanceInfor/getAdressFromTencent?lat=${position.lat}&lng=${position.lng}`),
      //     method: 'get',
      //   }).then(({ data })=>{
      //     //console.log("/investigation/instanceInfor/getAdressFromTencent",data)
      //     that.inspectionTaskItems[index].location={poiaddress:data.address,latlng:{lng:position.lng,lat:position.lat}}
      //     that.$set(that.inspectionTaskItems,index,that.inspectionTaskItems[index])
      //   })
      // };

      // setTimeout(()=>{

      //   alert(JSON.stringify(Position))
      //   //console.log("Position",Position)

      // },1000)
    },
    onInputSituationExplain(value) {
      this.inspectionTaskItems[this.fileUploadIndex].situationExplain = value;
      this.$set(
        this.inspectionTaskItems,
        this.fileUploadIndex,
        this.inspectionTaskItems[this.fileUploadIndex]
      );
    },
    onInputPoiaddress(value) {
      this.inspectionTaskItems[this.fileUploadIndex].location = {
        poiaddress: value,
        latlng: { lng: '', lat: '' }
      };
      this.$set(
        this.inspectionTaskItems,
        this.fileUploadIndex,
        this.inspectionTaskItems[this.fileUploadIndex]
      );
    },
    saveThrottle(saveAble, index) {
      if(this.flag1 == false) {
        this.flag1 = true
        this.save(saveAble, index)
      }
    },
    save(saveAble, index) {
      if (!saveAble) {
        this.flag1 = false
        return false;
      }
      var item = this.inspectionTaskItems[index];
      this.$http({
        url: this.$http.adornUrl(
          item.instanceInforEntity
            ? "/investigation/instanceInfor/update"
            : "/investigation/instanceInfor/save"
        ),
        method: "post",
        data: this.$http.adornData({
          id: item.instanceInforEntity ? item.instanceInforEntity.id : "",
          status: item.inspectionResults,
          inforId: item.id,
          // instanceId: this.$route.params.instanceEntitiesId
          //   ? this.$route.params.instanceEntitiesId
          //   : -1,
          instanceId: this.acceptInstanceEntitiesId
            ? this.acceptInstanceEntitiesId
            : -1,
          isNotice: item.isNotice,
          // taskId: this.$route.params.taskId,
          taskId: this.acceptTaskId,
          remark: item.situationExplain,
          place: item.location.poiaddress,
          longitude: item.location.latlng.lng,
          latitude: item.location.latlng.lat,
          documentList: this.temporaryFileList[index],
          openId: this.$getQueryString("openId")
          // openId:"oMHlns9GVz2HOkNw5ubfasT_GHv0"
        })
      }).then(({ data }) => {
        //console.log(
        //   item.instanceInforEntity
        //     ? "/investigation/instanceInfor/update"
        //     : "/investigation/instanceInfor/save",
        //   data
        // );
        this.inspectionTaskItems.instanceId = data.data.instanceId;
        this.inspectionTaskItems[index].instanceInforEntity =
          data.data.taskInstanceEntity.inforEntitys[index].instanceInforEntity;
        if (data.code == 0) {
          this.flag1 = false
          // this.$toast('保存成功')
          Toast.success("保存成功");
          // this.$toast({message:'保存成功',duration:2000});
          setTimeout(() => {
            this.inspectionTaskItems[index].expandVisible = false;
            this.$set(
              this.inspectionTaskItems,
              index,
              this.inspectionTaskItems[index]
            );
            // location.reload()
          this.$http({
            url: this.$http.adornUrl(`/investigation/instanceInfor/info/${this.acceptInstanceEntitiesId}`),
            method: "get"
          }).then(data=>{
            // //console.log(data);
              let normalTotal = 0;
              let abnormalTotal = 0;
            data.data.data.inforEntitys.forEach((item, itemIndex) => {
              if (item.instanceInforEntity) {
                if(item.instanceInforEntity.status == '1'){
                  normalTotal ++;
                }
                if(item.instanceInforEntity.status == '0'){
                  abnormalTotal ++;
                }
              }
            });
            // //console.log(this.inspectionTaskItems);
            this.inspectionTaskItems.normalTotal = normalTotal;
            this.inspectionTaskItems.abnormalTotal = abnormalTotal;
            this.inspectionTaskItems.forEach((item,index)=>{
              this.$set(
                this.inspectionTaskItems,
                index,
                this.inspectionTaskItems[index]
              );
            })
            // //console.log(this.inspectionTaskItems.normalTotal,this.inspectionTaskItems.abnormalTotal);
          })
          }, 2000);
        } else {
          this.flag1 = false
          Toast.fail(data.msg);
          // this.$toast(data.msg);
        }
      });
    },
    confirmSubmissionThrottle() {
        if(this.flag == false) {
          this.flag = true
          this.$refs.loading.show = true
          this.confirmSubmission()
        }
        
    },
    confirmSubmission() {
      if (
        !this.inspectionTaskItems.every(function(elem, index, arr) {
          return elem.instanceInforEntity != null;
        })
      ) {
         this.flag = false
         this.$refs.loading.show = false
        return false;
      }

      this.$http({
        url: this.$http.adornUrl("/investigation/instanceInfor/submit"),
        method: "post",
        data: this.$http.adornData({
          id: this.inspectionTaskItems.instanceId,
          openId: this.$getQueryString("openId"),
          // openId:"oMHlns9GVz2HOkNw5ubfasT_GHv0"
        })
      }).then(({ data }) => {
        //console.log("/investigation/instanceInfor/submit", data);
        if (data.code == 0) {
          Toast.success("保存成功");
           this.flag = false
           this.$refs.loading.show = false
          // this.$toast({message:'保存成功',duration:2000});
          this.$router.push({ path: "/" });
        } else {
           this.flag = false
           this.$refs.loading.show = false
          Toast.fail(data.msg);
          // this.$toast(data.msg);
        }
      });
    }
  }
};
</script>

<style lang="less" >
.inspectionItems {
  .content {
    > div > div {
      width: 90%;
      margin: 2vh auto;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(102, 102, 102, 1);
    }
  }
}
</style>

