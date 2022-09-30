<!--
 * @Author: yaoweixin
 * @Date: 2020-09-22 09:41:01
 * @LastEditors: yaoweixin
 * @LastEditTime: 2020-12-16 10:46:25
 * @Description: 收运点登记
 * @FilePath: \vue-cli-multiPage-master\src\pages\garbageClassification\CollectPointRegister.vue
-->
<template>
    <div class="collectPointRegister">
        <div class="collectPointHeader">
                <div class="title">{{Community.name}}</div>
                <div class="content">
                    <div class="contentWrapper">
                       <div class="imgWrapper">
                        <img v-for="(imgItem,imgIndex) in pictureList" :key="imgIndex" :src="imgItem.allUrl" alt="" @click="showPreviewImage(imgItem.allUrl)">
                       </div>
                    <div class="communityContainer">
                        <div class="communityTitle">所属社区</div>
                        <div class="communityContent">{{Community.community}}</div>
                    </div>
                    <div class="areaWrapper">
                         <div class="areaTitle">城中村/小区</div>
                         <div class="areaContent">{{Community.areaName}}</div>
                    </div>
                    <div class="areaWrapper">
                         <div class="areaTitle">站点管理方</div>
                         <div class="areaContent">{{Community.siteManager == '1' ? '物业' : '环卫'}}</div>
                    </div>
                    <div class="locationWrapper">
                         <div class="locationTitle">地址</div>
                         <div class="locationContent" @click="$toast(Community.location)">{{Community.location}}</div>
                    </div>
                    <div class="personWrapper">
                        <div class="leader">负责人</div>
                        <div class="phone">
                            {{Community.personName}} {{Community.phone ? '('+Community.phone+')': ''}}
                            <a :href="'tel:' + Community.phone">
                            <img src="~@/assets/img/personPhone.png" alt="">
                            </a>
                        </div>
                    </div>
                     <div class="personWrapper">
                        <div class="leader">联系人</div>
                        <div class="phone">
                            {{Community.mailContactorEntity.name}} {{Community.mailContactorEntity.mobile1 ? '('+Community.mailContactorEntity.mobile1+')': ''}}
                            <a :href="'tel:' + Community.mailContactorEntity.mobile1">
                            <img src="~@/assets/img/personPhone.png" alt="">
                            </a>
                        </div>
                    </div>
                    </div>
                    <div class="onDutyMember">
                        <div class="onDutyTitle">值班人员</div>
                        <div class="personWrapper">
                            <div class="personName" v-for="(item,index) in workerList" :key="index">{{item.name}}</div>
                        </div>
                    </div>
                   
                </div>
               
        </div>
        <div class="transferContainer">
            <div class="recordWrapper">
                <div class="recordTitle">
                  <div class="recordSlide"></div>
                  <div class="recordText">今日收运记录</div>
                  </div>
                <div class="cleanTimes">
                  收运次数：{{ transitList.length }}
                </div>
              </div>
            <div class="transferWrapper">
                <!-- <div class="transferSlide" v-for="(item,index) in transitList" :key="index">
                    <div class="transferTime">转运时间：{{item.registerTime}}</div>
                    <div class="transferSummation">转运总量：{{item.totalCount}}（吨）</div>
                </div> -->
                 <div
                  class="cleanSlide"
                  v-for="(item, index) in transitList"
                  :key="index"
                  @click="lookTransferDetail(item.id)"
                >
                  <div class="cleanTime">{{item.registerTime}}</div>
                  <div class="cleaner">
                    收运总量：共{{item.totalCount}}吨
                  </div>
                  <img src="~@/assets/img/expand.png" alt="">
                </div>
            </div>
        </div>
        <!-- <div class="transferBottom" v-for="(limitItem, limitIndex) in limitList" :key="limitIndex">
            <div class="transferHistoryRecord" @click="$router.push('/transferHistoryRecord')" v-if="limitItem.menuCode == 'SYD-LSZYJL'">历史收运记录</div>
            <div class="addTransferRecord" @click="addTransitRecord" v-if="limitItem.menuCode == 'SYD-TJZYJL'">添加收运记录</div>
        </div> -->
        <div class="recordBigWrapper">
         <div class="recordWrapper2" v-for="(limitItem, limitIndex) in limitList" :key="limitIndex">
              <div class="addCleanRecord"  @click="addTransitRecord" v-if="limitItem.menuCode == 'SYD-TJZYJL'">
              添加收运记录
              </div>
              <!-- <div
                class="historyCleanRecord"
                @click="$router.push('/transferHistoryRecord')" v-if="limitItem.menuCode == 'SYD-LSZYJL'"
              >
                历史收运记录
              </div> -->
        </div>
        <div class="recordWrapper2" v-for="(limit2Item, limit2Index) in limitList" :key="limit2Index">
              <!-- <div class="addCleanRecord"  @click="addTransitRecord" v-if="limitItem.menuCode == 'SYD-TJZYJL'">
              添加收运记录
              </div> -->
              <div
                class="historyCleanRecord"
                @click="$router.push('/transferHistoryRecord')" v-if="limit2Item.menuCode == 'SYD-LSZYJL'"
              >
                历史收运记录
              </div>
        </div>
        </div>
        <!-- 添加收运记录的弹框 -->
        <div class="transferRegisterDialog">
            <van-popup v-model="confirmTransferShow" round position="bottom">
            <div class="transferRegisterTitle">
                <img src="~@/assets/img/closeDialog.png" alt="" @click="confirmTransferShow = false">
                <div class="titleText">收运登记</div>
            </div>
            <div class="restCook">
                <div class="restTitle">餐余垃圾（吨）</div>
                <div class="barrelNumberContainer">
                    <div class="decreaseButton" @click="decreaseNumber('1')">-</div>
                    <div class="dinnerRestNumber">
                      <!-- <input type="number" v-model="dinnerNumber"> -->
                      <van-field v-model="dinnerNumber" type="number" center input-align="center"/>
                      </div>
                    <div class="increaseButton" @click="increaseNumber('1')">+</div>
                </div>
            </div>
            <div class="restCook">
                <div class="restTitle">其他垃圾（吨）</div>
                <div class="barrelNumberContainer">
                    <div class="decreaseButton" @click="decreaseNumber('2')">-</div>
                    <div class="dinnerRestNumber">
                      <!-- <input type="number" v-model="otherNumber"> -->
                      <van-field v-model="otherNumber" type="number" center input-align="center"/>
                      </div>
                    <div class="increaseButton" @click="increaseNumber('2')">+</div>
                </div>
            </div>
            <div class="restCook">
                <div class="restTitle">可回收垃圾（吨）</div>
                <div class="barrelNumberContainer">
                    <div class="decreaseButton" @click="decreaseNumber('3')">-</div>
                    <div class="dinnerRestNumber">
                      <!-- <input type="number" v-model="recycleNumber"> -->
                       <van-field v-model="recycleNumber" type="number" center input-align="center"/>
                      </div>
                    <div class="increaseButton" @click="increaseNumber('3')">+</div>
                </div>
            </div>
            <div class="restCook">
                <div class="restTitle">有害垃圾（吨）</div>
                <div class="barrelNumberContainer">
                    <div class="decreaseButton" @click="decreaseNumber('4')">-</div>
                    <div class="dinnerRestNumber">
                      <!-- <input type="number" v-model="harmNumber"> -->
                       <van-field v-model="harmNumber" type="number" center input-align="center"/>
                      </div>
                    <div class="increaseButton" @click="increaseNumber('4')">+</div>
                </div>
            </div>
            <div class="restCook">
                <div class="restTitle">大件垃圾（吨）</div>
                <div class="barrelNumberContainer">
                    <div class="decreaseButton" @click="decreaseNumber('5')">-</div>
                    <div class="dinnerRestNumber">
                      <!-- <input type="number" v-model="bigNumber"> -->
                       <van-field v-model="bigNumber" type="number" center input-align="center"/>
                      </div>
                    <div class="increaseButton" @click="increaseNumber('5')">+</div>
                </div>
            </div>
            <!-- <div class="takePictureContainer">
                <div class="takePicTitle">拍照：</div>
                <van-uploader v-model="protectFileList" multiple :after-read="afterRead" @delete="afterRead">
                        <img src="~@/assets/img/Picture.svg" alt />
                    </van-uploader>
            </div> -->
            <div class="takePictureWrapper">
                <div class="dialogHeader">上传照片</div>
                <van-uploader
                  v-model="protectFileList"
                  multiple
                  :after-read="afterRead"
                  @delete="afterRead"
                >
                <div class="pictureWrapper">
                  <img src="~@/assets/img/Picture.svg" alt />
                  <div class="titleText">上传照片</div>
                </div>
                </van-uploader>
            </div>
            <div class="remarkContainer">
                <div class="remarkTitle">备注：</div>
                <textarea type="text" v-model="protectRemark" placeholder="请在此输入备注（选填）"></textarea>
            </div>
            <div class="sumContainer">
                <div class="sum">
                <div class="sumTitle">总量：</div>
                <div class="sumNumber">共{{sumNumber}}吨</div>
                </div>
                <div class="saveButton" @click="registerAddDebounce">确认</div>
            </div>
            </van-popup>
        </div>
        <!-- 查看收运记录的弹框 -->
         <div class="transferRegisterDialog">
            <van-popup v-model="lookTransferShow" round position="bottom">
            <div class="transferRegisterTitle">
                <img src="~@/assets/img/closeDialog.png" alt="" @click="lookTransferShow = false">
                <div class="titleText2">查看收运登记信息</div>
            </div>
            <div class="restCook">
                <div class="restTitle">餐余垃圾（吨）</div>
                <div class="barrelNumberContainer">
                    <div class="dinnerRestNumber">
                      {{lookDinnerNumber}}
                      </div>
                </div>
            </div>
            <div class="restCook">
                <div class="restTitle">其他垃圾（吨）</div>
                <div class="barrelNumberContainer">
                    <div class="dinnerRestNumber">
                      {{lookOtherNumber}}
                    </div>
                </div>
            </div>
            <div class="restCook">
                <div class="restTitle">可回收垃圾（吨）</div>
                <div class="barrelNumberContainer">
                    <div class="dinnerRestNumber">
                      {{lookRecycleNumber}}
                    </div>
                </div>
            </div>
            <div class="restCook">
                <div class="restTitle">有害垃圾（吨）</div>
                <div class="barrelNumberContainer">
                    <div class="dinnerRestNumber">
                      {{lookHarmNumber}}
                    </div>
                </div>
            </div>
            <div class="restCook">
                <div class="restTitle">大件垃圾（吨）：</div>
                <div class="barrelNumberContainer">
                    <div class="dinnerRestNumber">
                      {{lookBigNumber}}
                    </div>
                </div>
            </div>
            <div class="takePictureWrapper">
                <div class="imgWrapper">
                  <img v-for="(imgItem,imgIndex) in lookImgList" :key="imgIndex" :src="imgItem.allUrl" alt="" @click="showPreviewImage(imgItem.allUrl)">
                </div>
            </div>
            <div class="remarkContainer">
                <div class="remarkTitle">备注：</div>
                <div class="remarkContent">{{lookRemark}}</div>
            </div>
            <div class="sumContainer">
                <div class="sum">
                <div class="sumTitle">总量：</div>
                <div class="sumNumber">共{{lookTotalCount}}吨</div>
                </div>
            </div>
            </van-popup>
        </div>
         <imagePreview
      ref="previewImage"
      :enlargeImageUrl="enlargeImageUrl"
    ></imagePreview>
     <Loading ref="loading"></Loading>
    </div>
</template>
<script>
import Loading from '../commonLoading/commonLoading'
import {debounce,throttle} from './utils.js'
import imagePreview from "../gradeResponse/imagePreview";
export default {
    name: 'collectPointRegister',
    data() {
        return {
            collectPointFlag: false,
            enlargeImageUrl: [],//预览图片路径
            lookTransferShow: false,//控制查看弹框的开关
            activeNames: ['1'],
            Community: {
                community: '社区',
                areaName: '小区',
                personName: '负责人',//负责人
                phone: '110',//联系电话
                name: '',//收运点名称
                location: '',//地点
                siteManager: '',//站点管理方
                mailContactorEntity: {},//联系人信息
            },
            confirmTransferShow: false,//控制转运登记弹框的显示
            dinnerNumber: 0,//餐余
            otherNumber: 0,//其他
            recycleNumber: 0,//可回收
            harmNumber: 0,//有害
            bigNumber: 0,//大件垃圾
            protectFileList: [],//图片文件列表
            protectRemark: '',//备注
            workerList: [],//值班人员列表
            pictureList: [],//图片列表
            transitList: [],//转运记录
            imgList: [],//保存后台返回得图片路径
            limitList: [],//权限数组
            lookDinnerNumber: 0,//查看餐余
            lookOtherNumber: 0,//查看其他
            lookRecycleNumber: 0,//查看可回收
            lookHarmNumber: 0,//查看有害
            lookBigNumber: 0,//查看大件
            lookImgList: [],//查看图片列表
            lookRemark: '',//查看备注
            lookTotalCount: 0,//查看总量
            compressSize: 1, //压缩比例
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
       * @description: 点击单条转运记录查看具体信息
       * @param {int} id
       * @return {} 
       */
      lookTransferDetail(id) {
        this.$http({
            url: this.$http.adornUrl(`/garbage/garbageCollectionRegister/wxInfo?id=${id}`),
            method: "get",
            params: this.$http.adornParams({}),
            }).then(({data}) => {

              //console.log('单条记录信息为',data)
              this.lookDinnerNumber = data.data.foodWaste
              this.lookOtherNumber = data.data.otherWaste
              this.lookRecycleNumber = data.data.recyclableWaste
              this.lookHarmNumber = data.data.harmfulWaste
              this.lookBigNumber = data.data.bigWaste
              this.lookImgList = data.data.imgList
              this.lookRemark = data.data.remark
              this.lookTotalCount = data.data.totalCount
              this.lookTransferShow = true
            })
      },
    //     afterRead(file) {
    //   //console.log('上传的图片文件为',file)
    //   file.status = "uploading";
    //   file.message = "上传中...";
    //   let formData = new FormData();
    //   this.protectFileList.forEach((v) => {
    //     //console.log('上传的图片为',v.file)
    //     formData.append("files", v.file);
    //   });
    //   //console.log(formData);
    //   this.$http({
    //     url: this.$http.adornUrl(`/level/levelPublish/upload//file`),
    //     method: "post",
    //     headers: {
    //       "content-type": "multipart/form-data",
    //     },
    //     data: formData,
    //   }).then((data) => {
    //     file.status = "";
    //     file.message = "";
    //     //console.log("文件上传后返回的数据data===》", data);
    //     let fileName = data.data.fileName;
    //     let filestr = data.data.filestr;
    //     //console.log(fileName);
    //     fileName.forEach((v, i) => {
    //       this.imgList.push({
    //         name: fileName[i],
    //         url: filestr[i],
    //       });
    //     });
    //   });
    // },
       afterRead(file) {
      var that = this
      //console.log('上传的图片文件为',file)
      file.status = "uploading";
      file.message = "上传中...";
      let formData = new FormData();
      new Promise((resolve,reject) => {
        this.protectFileList.forEach((v,index) => {
        //console.log('v',v)
        //console.log('上传的图片为',v.file)
      var content = v.content;
      var name = v.file.name;
      // 设置图片的压缩比例
      this.compressImg(v.file.size);
        // 创建Canvas对象(画布)
          var canvas = document.createElement("canvas");
        // 获取对应的CanvasRenderingContext2D对象(画笔)
        var context = canvas.getContext("2d");
        // 创建新的图片对象
        var img = new Image();
        // 指定图片的DataURL(图片的base64编码数据)
        img.src = v.content;
        // 监听浏览器加载图片完成，然后进行进行绘制
         img.onload = () => {
          if (that.compressSize > 1) {
            // 指定canvas画布大小，该大小为最后生成图片的大小
            canvas.width = img.width / that.compressSize;
            canvas.height = img.height / that.compressSize;
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
            var file1 = new File([u8arr], name, { type: mime });
            console.info('file1',file1);
            // 最后将base64编码的图片保存到数组中，留待上传。
            //console.log(file);
            formData.append("files", file1);
            if(index == that.protectFileList.length -1) {
               resolve(formData)
            }
          }else {
             formData.append("files", v.file);
             if(index == that.protectFileList.length -1) {
               resolve(formData)
            }
          }
         } 
        
        });
       
      }).then((fileList) => {
        //console.log(fileList,'fileList')
          that.$http({
        url: that.$http.adornUrl(`/level/levelPublish/upload//file`),
        method: "post",
        headers: {
          "content-type": "multipart/form-data",
        },
        data: formData,
      }).then((data) => {
        file.status = "";
        file.message = "";
        //console.log("文件上传后返回的数据data===》", data);
        let fileName = data.data.fileName;
        let filestr = data.data.filestr;
        //console.log(fileName);
        fileName.forEach((v, i) => {
          that.imgList.push({
            name: fileName[i],
            url: filestr[i],
          });
        });
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
        /**
         * @description: 添加转运记录
         * @param {} 
         * @return {} 
         */
        addTransitRecord() {
            this.confirmTransferShow = true
        },
        decreaseNumber(mark) {
            if(mark == '1') {
                this.dinnerNumber == 0 ? 0 : --this.dinnerNumber
            }else if(mark == '2') {
                this.otherNumber == 0 ? 0 : --this.otherNumber
            }else if(mark == '3'){
                this.recycleNumber == 0 ? 0 : --this.recycleNumber
            }else if(mark == '4') {
                this.harmNumber == 0 ? 0 : --this.harmNumber
            }else if(mark == '5') {
                this.bigNumber == 0 ? 0 : --this.bigNumber
            }
        },
        increaseNumber(mark) {
            if(mark == '1') {
                ++this.dinnerNumber
            }else if(mark == '2') {
                ++this.otherNumber
            }else if(mark == '3') {
                ++this.recycleNumber
            }else if(mark == '4') {
                ++this.harmNumber
            }else if(mark == '5') {
                ++this.bigNumber
            }
        },
        /**
         * @description: 收运点新增防抖
         * @param {*}
         * @return {*}
         */
        registerAddDebounce() {
          if(this.collectPointFlag == false) {
            this.collectPointFlag = true
            this.$refs.loading.show = true
            this.registerAdd()
          }
          
        },
        /**
         * @description: 收运点登记新增 
         * @param {} 
         * @return {} 
         */
        registerAdd() {
          var ranges = [
        '\ud83c[\udf00-\udfff]', 
        '\ud83d[\udc00-\ude4f]', 
        '\ud83d[\ude80-\udeff]'
        ];
        if(new RegExp(ranges.join('|'), 'g').test(this.protectRemark)) {
          alert('备注中不能出现表情')
          this.collectPointFlag = false
          this.$refs.loading.show = false
          return false
        }
             this.$http({
                url: this.$http.adornUrl(`/garbage/garbageCollectionRegister/save`),
                method: "post",
                data: this.$http.adornData({
                    foodWaste: this.dinnerNumber,
                    otherWaste: this.otherNumber,
                    recyclableWaste: this.recycleNumber,
                    harmfulWaste: this.harmNumber,
                    bigWaste: this.bigNumber,
                    imgList: this.imgList,
                    remark: this.protectRemark,
                    openId: localStorage.getItem('collectPointOpenId'),
                    codeNum: localStorage.getItem('collectPointCodeNum'),
                    status: '1'
                }),
            }).then(({data}) => {
                if(data && data.code == 0) {
                  this.collectPointFlag = false
                  this.$refs.loading.show = false
                    this.protectFileList = []
                    this.imgList = []
                    this.confirmTransferShow = false
                     var nowTime = new Date().toLocaleDateString().split('/')
                    nowTime[1] = parseInt(nowTime[1]) < 10 ? '0'+nowTime[1] : nowTime[1]
                    nowTime[2] = parseInt(nowTime[2]) < 10 ? '0'+nowTime[2] : nowTime[2]
                    var time = nowTime.join('-')
                    this.$http({
                        url: this.$http.adornUrl(`/garbage/garbageCollectionRegister/wxList`),
                        method: "post",
                        data: this.$http.adornData({
                            startTime: time,
                            endTime: time,
                            codeNum:  localStorage.getItem('collectPointCodeNum')
                        }),
                    }).then(({data}) => {
                        //console.log('收运点记录为',data)
                        this.transitList = data.data
                    })

                }
            })
        }
    },
    created() {
        // let urlString = 'https://scg.chinaemt.com/ser/wechat/wxAuthCodeGarbage?openId=oMHlns5pZEhm9MuaNIbS_qy1rP4g&codeNum=90cf828ba68f4ae9bc0938274584013d-1603453728163 '
        let urlString = window.location.href
        let urlArr = urlString.split('?')
        let paramArr = urlArr[1]
        let workString = paramArr.split('&')
        //console.log('length',workString[workString.length-1])
        let Mcode = workString[workString.length-1]
        let Mcod = Mcode.split('=')
        let codeNum = Mcod[1]//codeNum二维码
        let MopenId  = workString[0]
        let Mopen = MopenId.split('=')
        let openId = Mopen[1]//openId
        localStorage.setItem('collectPointCodeNum',codeNum)
        localStorage.setItem('collectPointOpenId',openId)
        this.$http({
            url: this.$http.adornUrl(`/garbage/garbageRole/getRole?openId=${openId}`),
            method: "get",
            params: this.$http.adornParams({}),
            }).then(({data}) => {
                if(data && data.code === 0) {
                    var limitArr = []
                    // data.data.memberEntity.menuList = [{menuCode: 'SYD-TJZYJL'},{menuCode: 'SYD-LSZYJL'}]
                    this.limitList = data.data.memberEntity.menuList
                    //console.log('权限',data.data.memberEntity.menuList)
                    data.data.memberEntity.menuList.forEach((item,index) => {
                      limitArr.push(item.menuCode)
                    })
                    if(!limitArr.includes('SYD-TJZYJL') && !limitArr.includes('SYD-LSZYJL')) {
                      this.$router.push('/noLimit')
                      return false
                    }
                }
            })
         this.$http({
            url: this.$http.adornUrl(`/garbage/garbageCollectionPoint/wxInfo?codeNum=${codeNum}
`),
            method: 'get',
            params: this.$http.adornParams({
            })
            }).then(({data}) => {
                //console.log('收运点数据为',data)
                if(data && data.code === 0) {
                    this.Community.name = data.data.data.name
                    this.Community.community = data.data.data.townName
                    this.Community.areaName = data.data.data.village
                    this.Community.personName = data.data.data.mailContactor.name
                    this.Community.phone = data.data.data.mailContactor.mobile1
                    this.Community.mailContactorEntity = data.data.data.mailContactorEntity
                    this.Community.siteManager = data.data.data.delegating
                    this.workerList = data.data.data.garbageMemberList
                    this.pictureList = data.data.data.imgList
                    this.Community.location = data.data.data.place
                }
            })
            var nowTime = new Date().toLocaleDateString().split('/')
            nowTime[1] = parseInt(nowTime[1]) < 10 ? '0'+nowTime[1] : nowTime[1]
            nowTime[2] = parseInt(nowTime[2]) < 10 ? '0'+nowTime[2] : nowTime[2]
            var time = nowTime.join('-')
             this.$http({
                url: this.$http.adornUrl(`/garbage/garbageCollectionRegister/wxList`),
                method: "post",
                data: this.$http.adornData({
                    startTime: time,
                    endTime: time,
                    codeNum:  localStorage.getItem('collectPointCodeNum')
                }),
            }).then(({data}) => {
                //console.log('收运点记录为',data)
                this.transitList = data.data
            })
    },
    computed: {
        sumNumber() {
            return (parseFloat(this.dinnerNumber) + parseFloat(this.otherNumber) + parseFloat(this.recycleNumber) + parseFloat(this.harmNumber) + parseFloat(this.bigNumber)).toFixed(2)
        }
    },
     components: {
    imagePreview,
    Loading
    },
}
</script>
<style lang="less" scoped>

.collectPointRegister {
    padding-left: .2rem;
    padding-right: .2rem;
    padding-top: .2rem;
    padding-bottom: 2.36rem;
  //收运点基本信息
  .collectPointHeader {
      background-color: #fff;
        padding-bottom: .4rem;
        border-radius: .08rem;
            .title {
                font-size: .32rem;
                width: 6.3rem;
                height: 1.11rem;                
                font-family: PingFangSC-Medium, PingFang SC;
                font-weight: 1000;
                color: #333333;
                margin-left: .4rem;
                line-height: 1.11rem;
                border-bottom: .01rem solid #DDDDDD;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }

            
            .content {
              //外观
            .contentWrapper {
                width: 6.3rem;
                margin-left: .4rem;
                margin-top: .24rem;
                padding-bottom: .24rem;                
                font-size: .28rem;
                font-family: PingFangSC-Regular, PingFang SC;
                font-weight: 400;
                color: #999999;
                border-bottom: .01rem solid #DDDDDD;
                 .imgWrapper {
                display: flex;
                flex-wrap: wrap;
                margin-top: .23rem;
                // margin-left: .12rem;
                img {
                    width: 3.13rem;
                    height: 1.76rem;
                    margin-left: .2rem;
                }
              }
            .communityContainer {
                display: flex;
                justify-content: space-between;
                .communityTitle {

                }

                .communityContent {                    
                font-size: .28rem;
                font-family: PingFangSC-Regular, PingFang SC;
                font-weight: 400;
                color: #333333;
                }
            }

            .areaWrapper {
                display: flex;
                justify-content: space-between;
                .areaTitle {

                }

                .areaContent {
                font-size: .28rem;
                font-family: PingFangSC-Regular, PingFang SC;
                font-weight: 400;
                color: #333333;
                }
            }
            //弹性盒子
            .locationWrapper {
                display: flex;
                justify-content: space-between;
                .locationTitle {
                    width: 3rem;

                }

                .locationContent {
                font-size: .28rem;
                font-family: PingFangSC-Regular, PingFang SC;
                font-weight: 400;
                color: #333333;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                }
            }

            .personWrapper {
                 display: flex;
                justify-content: space-between;
                .leader {

                }

                .phone {
                font-size: .28rem;
                font-family: PingFangSC-Regular, PingFang SC;
                font-weight: 400;
                color: #333333;
                display: flex;
                img {
                    width: .34rem;
                    height: .44rem;
                    margin-left: .09rem;
                }
                }
            }
            }
            .onDutyMember {
                .onDutyTitle {
                    // width: 1.28rem;
                    height: .45rem;
                    font-size: .32rem;
                    font-family: PingFangSC-Medium, PingFang SC;
                    font-weight: 1000;
                    color: #666666;
                    line-height: .45rem;
                    margin-top: .24rem;
                    margin-left: .38rem;
                }

                .personWrapper {
                    width: 6.3rem;
                    display: flex;
                    flex-wrap: wrap;
                    margin-top: .15rem;
                    margin-left: .3rem;
                .personName {
                    // width: .98rem;
                    height: .54rem;
                    padding: .11rem .25rem;
                    background: #F8F8F8;
                    border-radius: 1rem;
                    font-size: .24rem;
                    font-family: PingFangSC-Regular, PingFang SC;
                    font-weight: 400;
                    color: #7E7E7E;
                    margin-left: .1rem;
                    text-align: center;
                    line-height: .54rem;
                    margin-top: .1rem;
                }
                }
            }

           
            }
       
      
    
  }

  .transferContainer {
    .recordWrapper {
              display: flex;
              justify-content: space-between;
              height: .8rem;
              padding-top: .3rem;
              box-sizing: border-box;
              .recordTitle {
                display: flex;
                .recordSlide {
                  width: .03rem;
                  height: .28rem;
                  background: #0091FF;
                  margin-top: .05rem;
              }
              .recordText {                 
                font-size: .28rem;
                font-family: PingFangSC-Medium, PingFang SC;
                font-weight: 500;
                color: #333333;
                margin-left: .06rem;
              }
              }

              .cleanTimes {               
                font-size: .28rem;
                font-family: PingFangSC-Medium, PingFang SC;
                font-weight: 500;
                color: #666666;
              }
            }
   //转运记录
    .transferWrapper {
      //单条转运记录
      .cleanSlide {
                // width: 7.1rem;
                height: 1.59rem;
                background: #FFFFFF;
                box-shadow: 0rem .04rem .4rem -0.1rem rgba(0, 0, 0, 0.1);
                border-radius: .08rem;
                 position: relative;
                 padding-top: .28rem;
                 padding-left: .4rem;
                 margin-top: .2rem;
                .cleanTime {                
                font-size: .32rem;
                font-family: PingFangSC-Medium, PingFang SC;
                font-weight: 500;
                color: #333333;
               
                }

                .cleaner {                 
                font-size: .24rem;
                font-family: PingFangSC-Regular, PingFang SC;
                font-weight: 400;
                color: #999999;
                display: flex;
                padding-top: .2rem;
                }
                img {
                  width: .36rem;
                  height: .36rem;
                  position: absolute;
                  top: .6rem;
                  right: .32rem;
                }
              }
    }
  }
  //底部记录按钮
.recordBigWrapper {
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            height: 2.36rem;
            background-color: #fff;
.recordWrapper2 {
            // position: fixed;
            // bottom: 0;
            // left: 0;
            // right: 0;
            // height: 2.36rem;
            background-color: #fff;
        //外观
        .historyCleanRecord {
            background-color: #fff;            
            font-size: .28rem;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #0091FF;
            height: .42rem;
            text-align: center;
            margin-top: .4rem;
        }
      //添加记录按钮
        .addCleanRecord {
            width: 6.4rem;
            height: .9rem;
            background: linear-gradient(360deg, #2B80FF 0%, #65BCFF 100%);
            box-shadow: 0rem .06rem .12rem 0rem rgba(12, 126, 161, 0.35);
            border-radius: .75rem;
            text-align: center;
            line-height: .9rem;
            margin: 0 auto;              
            font-size: .36rem;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #FFFFFF;
            margin-top: .32rem;
        }
        }
}
  //添加收运记录的弹框
  .transferRegisterDialog {
  .van-popup {
      height: 11.54rem;
      padding: 0 .4rem;
      box-sizing: border-box;
    .transferRegisterTitle {
        display: flex;
        height: 1.1rem;
         padding-top: .4rem;
         box-sizing: border-box;
        img {
            width: .48rem;
            height: .48rem;
        }

        .titleText {            
            font-size: .36rem;
            font-family: PingFangSC-Medium, PingFang SC;
            font-weight: 700;
            color: #333333;
            margin-left: 2.2rem;
        }
        }

    .restCook {
                display: flex;
                align-items: center;
                font-size: 0.32rem;
                justify-content: space-between;
                height: 1rem;
                border-bottom: .01rem solid #eee;
                .restTitle {                 
                font-size: .32rem;
                font-family: PingFangSC-Regular, PingFang SC;
                font-weight: 400;
                color: #333333;
                }

                .barrelNumberContainer {
                  display: flex;
                  align-items: center;
                  .decreaseButton {
                    width: .64rem;
                    height: .6rem;
                    background: #F7F8F9;
                    border-radius: .03rem 0rem 0rem .03rem;
                    font-size: .2rem;
                    color: #ccc;
                    text-align: center;
                    line-height: .6rem;
                  }

                  .dinnerRestNumber {
                    width: .91rem;
                    height: .6rem;
                    background: #F7F8F9;
                    font-size: .28rem;
                    font-family: PingFangSC-Medium, PingFang SC;
                    font-weight: 500;
                    color: #333333;
                    text-align: center;
                    margin: 0 .02rem;
                    line-height: .6rem;
                    input {
                      width: 100%;
                      height: 100%;
                      text-align: center;
                      background: #F7F8F9;
                      border: none;
                    }
                     .van-cell {
                      padding: 0;
                      line-height: 0;
                      height: 100%;
                      text-align: center;
                      font-size: .28rem;
                      background: #F7F8F9;
                      .van-cell__value {
                        text-align: center;
                        height: 100%;
                        /deep/  .van-field__control {
                            width: 100%;
                            height: .6rem;
                            border: none;
                            text-align: center;
                            background: #F7F8F9;
                          }
                        
                      }
                    }
                  }

                  .increaseButton {
                    width: .64rem;
                    height: .6rem;
                    background: #F0F1F2;
                    border-radius: .03rem 0rem 0rem .03rem;
                    font-size: .2rem;
                    color: #ccc;
                    text-align: center;
                    line-height: .6rem;
                  }

                  .barrelTitle {
                  }
                }
              }

       .takePictureWrapper {
              width: 6.7rem;
              padding-bottom: .3rem;
              border-bottom: .01rem solid #DDD;
            //   margin-left: .4rem;
              .dialogHeader {               
            font-size: .32rem;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #333333;
            margin-top: .3rem;
              }

              .van-uploader {
                .pictureWrapper {
                  margin-top: .2rem;
                  width: 1.52rem;
                  height: 1.52rem;
                  border: .01rem dashed #CCCCCC;
                  text-align: center;
                  // line-height: 1.52rem;

                img {
                  width: 0.6rem;
                  height: 0.6rem;
                  margin-top: .27rem;
                }
                .titleText {
                  // width: .8rem;
                  height: .28rem;
                  font-size: .2rem;
                  font-family: PingFangSC-Medium, PingFang SC;
                  font-weight: 500;
                  color: #999999;
                }
                }
              }
            }

    .remarkContainer {
        width: 6.7rem;
      .remarkTitle {        
        font-size: .32rem;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #333333;
        margin-top: .3rem;
      }

      textarea {
        border: none;
        width: 6.7rem;          
        font-size: .26rem;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #000;
      }
    }
   //弹性盒子
    .sumContainer {
        display: flex;
        justify-content: space-between;
        font-size: .32rem;
        // position: fixed;
        // bottom: 0;
        // left: 0;
        // right: 0;
        height: 1.08rem;
        border-top: .01rem solid #ddd;
      .sum {
          display: flex;
          width: 4.6rem;
          height: 1.08rem;
          padding-top: .33rem;
          padding-left: .4rem;          
        font-size: .3rem;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #999999;
        .sumTitle {

        }

        .sumNumber {
            color: #0091FF;
        }
      }
      //保存按钮
      .saveButton {
        width: 2.9rem;
        height: 1.08rem;
        background: #0091FF;
        font-size: .3rem;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #FFFFFF;
        text-align: center;
        line-height: 1.08rem;
      }
    }
  }
}
   //查看收运记录的弹框
    .transferRegisterDialog {
    .van-popup {
      .transferRegisterTitle {
        img {

        }

        .titleText2 {
          margin-left: 1.2rem;
          font-size: 0.36rem;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 700;
          color: #333333;
        }
      }

      .restCook {
        .restTitle {

        }

        .barrelNumberContainer {
          .dinnerRestNumber {

          }
        }
      }
      //图片
      .takePictureWrapper {
        .imgWrapper {
          display: flex;
          flex-wrap: wrap;
          margin-top: .2rem;
          img {
            width: 1.53rem;
            height: 1.53rem;
          }
        }
      }

      .remarkContainer {
        .remarkTitle {

        }

        .remarkContent {
          font-size: .32rem;
          
        }
      }

      .sumContainer {
        .sum {
          .sumTitle {

          }

          .sumNumber {

          }
        }
      }
    }
  }
}
</style>