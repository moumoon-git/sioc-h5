<!--
 * @Author: yaoweixin
 * @Date: 2020-09-22 15:36:44
 * @LastEditors: yaoweixin
 * @LastEditTime: 2020-12-16 10:40:36
 * @Description: 中转站登记
 * @FilePath: \vue-cli-multiPage-master\src\pages\garbageClassification\TransitRegister.vue
-->
<template>
    <div class="transitRegister">
      <!-- 中转点基本信息 -->
        <div class="collectPointHeader">
                <div class="title">{{Community.name}}</div>
                <div class="content">
                    <div class="personWrapper">
                        <div class="leader">负责人</div>
                        <div class="phone">
                            {{Community.personName}} {{Community.phone ? '('+Community.phone+')': ''}}
                            <a :href="'tel:'+ Community.phone">
                            <img src="~@/assets/img/personPhone.png" alt="">
                            </a>
                        </div>
                    </div>
                     <div class="personWrapper">
                        <div class="leader">联系人</div>
                        <div class="phone">
                            {{Community.mailContactorEntity.name}} {{Community.mailContactorEntity.mobile1 ? '('+Community.mailContactorEntity.mobile1+')': ''}}
                            <a :href="'tel:'+ Community.mailContactorEntity.mobile1">
                            <img src="~@/assets/img/personPhone.png" alt="">
                            </a>
                        </div>
                    </div>
                    <div class="onDutyMember">
                        <div class="onDutyTitle">值班人员</div>
                        <div class="personWrapper">
                            <div class="personName" v-for="(pItem,pIndex) in Community.workList" :key="pIndex">{{pItem.name}}</div>
                        </div>
                    </div>
                    <div class="imgWrapper">
                        <img v-for="(item,index) in Community.imgList" :key="index" :src="item.allUrl" alt="" @click="showPreviewImage(item.allUrl)">
                    </div>
                </div>
        </div>
        <div class="transferContainer">
             <div class="recordWrapper">
                <div class="recordTitle">
                  <div class="recordSlide"></div>
                  <div class="recordText">今日转运记录</div>
                  </div>
                <div class="cleanTimes">
                  转运次数：{{ transitList.length }}
                </div>
              </div>
              <!-- 转运记录 -->
            <div class="transferWrapper">
                 <div
                  class="cleanSlide"
                  v-for="(iItem, iIndex) in transitList"
                  :key="iIndex"
                  @click="lookTransferDetail(iItem.id)"
                >
                  <div class="cleanTime">{{iItem.withdrawTime}}</div>
                  <div class="cleaner">
                    转运总量：共{{iItem.totalCount}}吨
                  </div>
                  <img src="~@/assets/img/expand.png" alt="">
                </div>
            </div>
        </div>
        <!-- <div class="transferBottom" v-for="(limitItem, limitIndex) in limitList" :key="limitIndex">
            <div class="transferHistoryRecord" @click="$router.push('/transitHistoryRecord')" v-if="limitItem.menuCode == 'ZZD-LSZYJL'">历史中转记录</div>
            <div class="addTransferRecord" @click="addTransitRecord" v-if="limitItem.menuCode == 'ZZD-TJZYJL'" >添加中转记录</div>
        </div> -->
      <div class="recordBigWrapper">
        <div class="recordWrapper2" v-for="(limitItem, limitIndex) in limitList" :key="limitIndex">
              <div class="addCleanRecord"  @click="addTransitRecord" v-if="limitItem.menuCode == 'ZZD-TJZYJL'">
              添加中转记录
              </div>
              <!-- <div
                class="historyCleanRecord"
               @click="$router.push('/transitHistoryRecord')" v-if="limitItem.menuCode == 'ZZD-LSZYJL'"
              >
                历史中转记录
              </div> -->
        </div>
        <div class="recordWrapper2" v-for="(limitItem, limitIndex) in limitList" :key="limitIndex">
              <!-- <div class="addCleanRecord"  @click="addTransitRecord" v-if="limitItem.menuCode == 'ZZD-TJZYJL'">
              添加中转记录
              </div> -->
              <div
                class="historyCleanRecord"
               @click="$router.push('/transitHistoryRecord')" v-if="limitItem.menuCode == 'ZZD-LSZYJL'"
              >
                历史中转记录
              </div>
        </div>
      </div>
        <!-- <div class="recordWrapper2">
              <div class="addCleanRecord"  @click="addTransitRecord">
              添加中转记录
              </div>
              <div
                class="historyCleanRecord"
               @click="$router.push('/transitHistoryRecord')"
              >
                历史中转记录
              </div>
        </div> -->
        <!-- 添加中转记录的弹框 -->
        <div class="transitRegisterDialog">
           <van-popup v-model="confirmTransferShow" round position="bottom">
            <div class="transferRegisterTitle">
                <img src="~@/assets/img/closeDialog.png" alt="" @click="confirmTransferShow = false">
                <div class="titleText">收运登记</div>
            </div>
              <div class="restWrapper">
                <div class="restCook">
                  <div class="restTitle">餐余垃圾（吨）：</div>
                  <div class="barrelNumberContainer">
                      <div class="decreaseButton" @click="decreaseNumber('1')">-</div>
                      <div class="dinnerRestNumber">
                        <!-- <input type="number" v-model="dinnerNumber"> -->
                         <van-field v-model="dinnerNumber" type="number" center input-align="center"/>
                      </div>
                      <div class="increaseButton" @click="increaseNumber('1')">+</div>
                  </div>
                </div>
                <div class="went" @click="showEnter('1')">
                    <div class="wentTitle">去向：</div>
                    <div class="inputWrapper">
                        <div>{{dinnerEnter}}</div>
                        <img src="~@/assets/img/bottomExpand.png" alt="">
                    </div>
                    <input type="hidden" v-model="dinnerId">
                </div>
              </div>
              <div class="restWrapper">
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
                <div class="went" @click="showEnter('2')">
                    <div class="wentTitle">去向：</div>
                    <div class="inputWrapper">
                        <div>{{otherEnter}}</div>
                        <img src="~/@/assets/img/bottomExpand.png" alt="">
                    </div>
                    <input type="hidden" v-model="otherId">
                </div>
              </div>
              <div class="restWrapper">
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
                <div class="went" @click="showEnter('3')">
                    <div class="wentTitle">去向：</div>
                    <div class="inputWrapper">
                        <div>{{recycleEnter}}</div>
                        <img src="~/@/assets/img/bottomExpand.png" alt="">
                    </div>
                    <input type="hidden" v-model="recycleId">
                </div>
              </div>
              <div class="restWrapper">
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
                <div class="went" @click="showEnter('4')">
                    <div class="wentTitle">去向：</div>
                    <div class="inputWrapper">
                        <div>{{harmEnter}}</div>
                        <img src="~/@/assets/img/bottomExpand.png" alt="">
                    </div>
                    <input type="hidden" v-model="harmId">
                </div>
              </div>
              <div class="restWrapper">
                <div class="restCook">
                  <div class="restTitle">绿色垃圾（吨）</div>
                  <div class="barrelNumberContainer">
                      <div class="decreaseButton" @click="decreaseNumber('5')">-</div>
                      <div class="dinnerRestNumber">
                        <!-- <input type="number" v-model="greenNumber"> -->
                        <van-field v-model="greenNumber" type="number" center input-align="center"/>
                      </div>
                      <div class="increaseButton" @click="increaseNumber('5')">+</div>
                  </div>
                </div>
                <div class="went" @click="showEnter('5')">
                    <div class="wentTitle">去向：</div>
                    <div class="inputWrapper">
                        <div>{{greenEnter}}</div>
                        <img src="~@/assets/img/bottomExpand.png" alt="">
                    </div>
                    <input type="hidden" v-model="greenId">
                </div>
              </div>
              <!-- <div class="rubbishAccurate">
                  <div class="title">餐余垃圾精准率：</div>
                  <div class="inputWrapper">
                    <input type="text" v-model="rubbishAccurate">%
                  </div>
              </div> -->
               <div class="restCook">
                  <div class="restTitle">餐余垃圾精准率%</div>
                  <div class="barrelNumberContainer">
                      <div class="decreaseButton" @click="decreaseNumber('6')">-</div>
                      <div class="dinnerRestNumber">
                        <!-- <input type="number" v-model="rubbishAccurate"> -->
                         <van-field v-model="rubbishAccurate" type="number" center input-align="center"/>
                      </div>
                      <div class="increaseButton" @click="increaseNumber('6')">+</div>
                  </div>
               </div>
              <!-- <div class="rubbishAccurate">
                  <div class="title">分类实效率：</div>
                  <div class="inputWrapper">
                    <input type="text" v-model="classifyAccurate">%
                  </div>
              </div> -->
               <div class="restCook">
                  <div class="restTitle">分类实效率%</div>
                  <div class="barrelNumberContainer">
                      <div class="decreaseButton" @click="decreaseNumber('7')">-</div>
                      <div class="dinnerRestNumber">
                        <!-- <input type="number" v-model="classifyAccurate"> -->
                         <van-field v-model="classifyAccurate" type="number" center input-align="center"/>
                      </div>
                      <div class="increaseButton" @click="increaseNumber('7')">+</div>
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
                <!-- <div class="remarkContainer">
                    <div class="remarkTitle">备注：</div>
                    <input type="text" v-model="protectRemark">
                </div> -->
            <div class="remarkContainer">
                <div class="remarkTitle">备注：</div>
                <textarea type="text" v-model="protectRemark" placeholder="请在此输入备注（选填）"></textarea>
            </div>
                <div class="sumContainer">
                    <div class="sum">
                    <div class="sumTitle">总量：</div>
                    <div class="sumNumber">共{{sumNumber}}吨</div>
                    </div>
                    <div class="saveButton" @click="confirmTransferRegisterDebounce">确认</div>
                </div>
           </van-popup>
        </div>
        <!-- 查看单条中转记录的弹框 -->
         <div class="transitRegisterDialog">
           <van-popup v-model="lookTransferShow" round position="bottom">
            <div class="transferRegisterTitle">
                <img src="~@/assets/img/closeDialog.png" alt="" @click="lookTransferShow = false">
                <div class="titleText">查看收运记录</div>
            </div>
              <div class="restWrapper">
                <div class="restCook">
                  <div class="restTitle">餐余垃圾（吨）：</div>
                  <div class="barrelNumberContainer">
                      <div class="dinnerRestNumber">
                        {{lookDinnerNumber}}
                      </div>
                  </div>
                </div>
                <div class="went">
                    <div class="wentTitle">去向：</div>
                    <div class="inputWrapper">
                        <div>{{lookDinnerEnter}}</div>
                    </div>
                </div>
              </div>
              <div class="restWrapper">
                <div class="restCook">
                  <div class="restTitle">其他垃圾（吨）</div>
                  <div class="barrelNumberContainer">
                      <div class="dinnerRestNumber">
                        {{lookOtherNumber}}
                      </div>
                  </div>
                </div>
                <div class="went">
                    <div class="wentTitle">去向：</div>
                    <div class="inputWrapper">
                        <div>{{lookOtherEnter}}</div>
                    </div>
                </div>
              </div>
              <div class="restWrapper">
                <div class="restCook">
                  <div class="restTitle">可回收垃圾（吨）</div>
                  <div class="barrelNumberContainer">
                      <div class="dinnerRestNumber">
                        {{lookRecycleNumber}}
                      </div>
                  </div>
                </div>
                <div class="went">
                    <div class="wentTitle">去向：</div>
                    <div class="inputWrapper">
                        <div>{{lookRecycleEnter}}</div>
                    </div>
                </div>
              </div>
              <div class="restWrapper">
                <div class="restCook">
                  <div class="restTitle">有害垃圾（吨）</div>
                  <div class="barrelNumberContainer">
                      <div class="dinnerRestNumber">
                        {{lookHarmNumber}}
                      </div>
                  </div>
                </div>
                <div class="went">
                    <div class="wentTitle">去向：</div>
                    <div class="inputWrapper">
                        <div>{{lookHarmEnter}}</div>
                    </div>
                </div>
              </div>
              <div class="restWrapper">
                <div class="restCook">
                  <div class="restTitle">绿色垃圾（吨）</div>
                  <div class="barrelNumberContainer">
                      <div class="dinnerRestNumber">
                        {{lookGreenNumber}}
                      </div>
                  </div>
                </div>
                <div class="went">
                    <div class="wentTitle">去向：</div>
                    <div class="inputWrapper">
                        <div>{{lookGreenEnter}}</div>
                    </div>
                </div>
              </div>
               <div class="restCook">
                  <div class="restTitle">餐余垃圾精准率%</div>
                  <div class="barrelNumberContainer">
                      <div class="dinnerRestNumber">
                        {{lookRubbishAccurate}}
                      </div>
                  </div>
               </div>
               <div class="restCook">
                  <div class="restTitle">分类实效率%</div>
                  <div class="barrelNumberContainer">
                      <div class="dinnerRestNumber">
                        {{lookClassifyAccurate}}
                      </div>
                  </div>
                </div>
              <div class="takePictureWrapper">
                <div class="dialogHeader">上传照片</div>
                <div class="imgWrapper">
                  <img v-for="(imgItem,imgIndex) in lookImgList" :key="imgIndex" :src="imgItem.allUrl" alt="" @click="showPreviewImage(imgItem.allUrl)">
                </div>
            </div>
            <div class="remarkContainer">
                <div class="remarkTitle">备注：</div>
                <div class="remarkContent">{{lookProtectRemark}}</div>
            </div>
                <div class="sumContainer">
                    <div class="sum">
                    <div class="sumTitle">总量：</div>
                    <div class="sumNumber">共{{lookSumNumber}}吨</div>
                    </div>
                </div>
           </van-popup>
        </div>
        <!-- 垃圾去向选择弹框 -->
        <van-picker
          title="选择去向"
          show-toolbar
          :columns="columns"
          @confirm="onConfirm"
          @cancel="onCancel"
          v-show="enterShow"
        />
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
    name: 'transitRegister',
    data() {
        return {
            transitFlag: false,
            enlargeImageUrl: [],//预览图片路径
            activeNames: ['1'],//控制展开的一栏
            Community: {
                personName: '张三',//负责人
                phone: '110',//联系电话
                name: '',//中转站名字
                workList: [],//值班人员列表
                imgList: [],//情况图片列表
                location: '',//地理位置
                mailContactorEntity: {},//联系人信息
            },
            transitList: [],//中转站记录
            confirmTransferShow: false,//控制转运登记弹框的显示与隐藏
            dinnerNumber: 0,//餐余垃圾数目
            dinnerEnter: '请选择',//餐余去向
            dinnerId: 0,
            otherNumber: 0,//其他垃圾数目
            otherEnter: '请选择',//其他垃圾去向
            otherId: 0,
            recycleNumber: 0,//可循环垃圾数目
            recycleEnter: '请选择',//可循环垃圾去向
            recycleId: 0,
            harmNumber: 0,//有害垃圾数目
            harmEnter: '请选择',//有害垃圾去向
            harmId: 0,
            greenNumber: 0,//绿色垃圾数目
            greenEnter: '请选择',//绿色垃圾去向
            greenId: 0,
            rubbishAccurate: 0,
            classifyAccurate: 0,
            protectFileList: [],//图片列表
            protectRemark: '',//备注
            columns: [],//去向列表
            enterShow: false,
            enterName: [],//去向名字列表
            enterId: [],//去向得id列表
            enterMark: '0',//去向标志
            imgList: [],//转运上传给后台得列表
            limitList: [],//权限数组
            lookTransferShow: false,//控制转运登记弹框的显示与隐藏
            lookDinnerNumber: 0,
            lookDinnerEnter: '',
            lookOtherNumber: 0,
            lookOtherEnter: '',
            lookRecycleNumber: 0,
            lookRecycleEnter: '',
            lookHarmNumber: 0,
            lookHarmEnter: '',
            lookGreenNumber: 0,
            lookGreenEnter: '',
            lookRubbishAccurate: 0,
            lookClassifyAccurate: 0,
            lookProtectRemark: '',
            lookSumNumber: 0,
            lookImgList: [],
            compressSize: 1, //压缩比例
        }
    },
    created() {
      let urlString = window.location.href
      // let urlString = 'https://scg.chinaemt.com/ser/wechat/wxAuthCodeGarbage?openId=odNcAxAtJyDNn6dMPe5qP_HO_HKg&codeNum=59d3c6d75e8e44a8be8c8eaa20e4ae08-1603507251855'
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
        localStorage.setItem('transitOpenId',openId)
        localStorage.setItem('transitCodeNum',codeNum)
          this.$http({
            url: this.$http.adornUrl(`/garbage/garbageRole/getRole?openId=${openId}`),
            method: "get",
            params: this.$http.adornParams({}),
            }).then(({data}) => {
                if(data && data.code === 0) {
                  var limitArr = []
                  // data.data.memberEntity.menuList = [{menuCode: 'ZZD-TJZYJL'}, {menuCode: 'ZZD-LSZYJL'}]
                    this.limitList = data.data.memberEntity.menuList
                   
                    //console.log('权限',data.data.memberEntity.menuList)
                     data.data.memberEntity.menuList.forEach((item,index) => {
                      limitArr.push(item.menuCode)
                    })
                    if(!limitArr.includes('ZZD-TJZYJL') && !limitArr.includes('ZZD-LSZYJL')) {
                      this.$router.push('/noLimit')
                      return false
                    }
                }
            })
      this.$http({
            url: this.$http.adornUrl(`/garbage/garbageTransferPoint/wxInfo?codeNum=${codeNum}`),
            method: 'get',
            params: this.$http.adornParams({
            })
            }).then(({data}) => {
              //console.log('中转站',data)
              this.Community.name = data.data.data.name
              this.Community.personName = data.data.data.mailContactor.name
              this.Community.phone = data.data.data.mailContactor.mobile1
              this.Community.workList = data.data.data.garbageMemberEntityList
              this.Community.imgList = data.data.data.imgList
              this.Community.location = data.data.data.place
              this.Community.mailContactorEntity = data.data.data.mailContactorEntity
            })
           
            var nowTime = new Date().toLocaleDateString().split('/')
            nowTime[1] = parseInt(nowTime[1]) < 10 ? '0'+nowTime[1] : nowTime[1]
            nowTime[2] = parseInt(nowTime[2]) < 10 ? '0'+nowTime[2] : nowTime[2]
            var time = nowTime.join('-')
             this.$http({
                url: this.$http.adornUrl(`/garbage/garbageTransferRegister/wxList`),
                method: "post",
                data: this.$http.adornData({
                    startTime: time,
                    endTime: time,
                    codeNum: localStorage.getItem('transitCodeNum')
                }),
            }).then(({data}) => {
                //console.log('中转站记录为',data)
                this.transitList = data.data
            })
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
       * @description: 查看单条中转记录
       * @param {int} id: 记录的id
       * @return {} 
       */
      lookTransferDetail(id) {
        this.$http({
            url: this.$http.adornUrl(`/garbage/garbageTransferRegister/wxInfo?id=${id}`),
            method: "get",
            params: this.$http.adornParams({}),
            }).then(({data}) => {
              //console.log('中转单条记录为',data)
              if(data && data.code == 0) {
                  this.lookDinnerNumber = data.data.foodWaste
                  this.lookDinnerEnter = data.data.foodDriName
                  this.lookOtherNumber = data.data.otherWaste
                  this.lookOtherEnter = data.data.otherDirName
                  this.lookRecycleNumber = data.data.recyclableWaste
                  this.lookRecycleEnter = data.data.recyclableDirName
                  this.lookHarmNumber = data.data.harmfulWaste
                  this.lookHarmEnter = data.data.harmfulDirName
                  this.lookGreenNumber = data.data.greenWaste
                  this.lookGreenEnter = data.data.greenDirName
                  this.lookRubbishAccurate = data.data.foodAccuracy
                  this.lookClassifyAccurate = data.data.classAccuracy
                  this.lookProtectRemark = data.data.remark
                  this.lookSumNumber = data.data.totalCount
                  this.lookImgList = data.data.imgList
                  this.lookTransferShow = true
              }
            })
      },
      /**
       * @description: 添加垃圾数量
       * @param {string} mark: 垃圾标志
       * @return {} 
       */
      increaseNumber(mark) {
        if(mark == '1') {
            this.dinnerNumber++
        }else if(mark == '2') {
            this.otherNumber++
        }else if(mark == '3'){
            this.recycleNumber++
        }else if(mark == '4') {
            this.harmNumber++
        }else if(mark == '5') {
            this.greenNumber++
        }else if(mark == '6') {
            this.rubbishAccurate++
        }else if(mark == '7') {
            this.classifyAccurate++
        }
      },
      decreaseNumber(mark) {
        if(mark == '1') {
          this.dinnerNumber == 0 ? 0 : --this.dinnerNumber
        }else if(mark == '2') {
          this.otherNumber == 0 ? 0 : --this.otherNumber
        }else if(mark == '3') {
          this.recycleNumber == 0 ? 0 : --this.recycleNumber
        }else if(mark == '4') {
          this.harmNumber == 0 ? 0 : --this.harmNumber
        }else if(mark == '5') {
          this.greenNumber == 0 ? 0 : --this.greenNumber
        }else if(mark == '6') {
          this.rubbishAccurate == 0 ? 0 : --this.rubbishAccurate
        }else if(mark == '7') {
          this.classifyAccurate == 0 ? 0 : --this.classifyAccurate
        }
      },
      onCancel() {
        this.enterShow = false
      },
      /**
       * @description: 确认垃圾去向
       * @param {string,index} value: 选择的去向值 index: 索引
       * @return {} 
       */
      onConfirm(value,index) {
        if(this.enterMark == '1') {
          this.dinnerEnter = value
          this.dinnerId = this.enterId[index]
        }else if(this.enterMark == '2') {
          this.otherEnter = value
          this.otherId = this.enterId[index]
        }else if(this.enterMark == '3') {
          this.recycleEnter = value
          this.recycleId = this.enterId[index]
        }else if(this.enterMark == '4') {
          this.harmEnter = value
          this.harmId = this.enterId[index]
        }else if(this.enterMark == '5') {
          this.greenEnter = value
          this.greenId = this.enterId[index]
        }
        this.enterShow = false
      },
    //   afterRead(file) {
    //   file.status = "uploading";
    //   file.message = "上传中...";
    //   let formData = new FormData();
    //   this.protectFileList.forEach((v) => {
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
       * @param {type} 
       * @return {type} 
       */
      addTransitRecord() {
        this.$http({
                url: this.$http.adornUrl(`/garbage/garbageDirection/wxList`),
                method: "post",
                data: this.$http.adornData({
                }),
            }).then(({data}) => {
              //console.log('去向数据为',data)
              var list = data.data
              list.forEach((item,index) => {
                this.enterName.push(item.name)
                this.enterId.push(item.id)
              })
              this.columns = this.enterName

            })
        this.confirmTransferShow = true
      },
      showEnter(mark) {
        this.enterMark = mark
        this.enterShow = true
      },
      confirmTransferRegisterDebounce() {
        if(this.transitFlag == false) {
          this.transitFlag = true
          this.$refs.loading.show = true
          this.confirmTransferRegister()
        }
       
      },
      /**
       * @description:转运登记确认
       * @param {type} 
       * @return {type} 
       */
      confirmTransferRegister() {
        if(this.dinnerId == 0 || this.otherId == 0 || this.recycleId == 0 || this.harmId == 0 || this.greenId == 0) {
          alert('垃圾去向必须填写')
          this.transitFlag = false
          this.$refs.loading.show = false
          return false
        }
        var ranges = [
        '\ud83c[\udf00-\udfff]', 
        '\ud83d[\udc00-\ude4f]', 
        '\ud83d[\ude80-\udeff]'
        ];
        if(new RegExp(ranges.join('|'), 'g').test(this.protectRemark)) {
          alert('备注中不能出现表情')
          this.transitFlag = false
          this.$refs.loading.show = false
          return false
        }
         this.$http({
                url: this.$http.adornUrl(`/garbage/garbageTransferRegister/save`),
                method: "post",
                data: this.$http.adornData({
                    foodWaste: this.dinnerNumber,
                    foodDir: this.dinnerId,
                    otherWaste: this.otherNumber,
                    otherDir: this.otherId,
                    recyclableWaste: this.recycleNumber,
                    recyclableDir: this.recycleId,
                    harmfulWaste: this.harmNumber,
                    harmfulDir: this.harmId,
                    imgList: this.imgList,
                    remark: this.protectRemark,
                    openId: localStorage.getItem('transitOpenId'),
                    codeNum: localStorage.getItem('transitCodeNum'),
                    status: "1",
                    foodAccuracy: this.rubbishAccurate,
                    classAccuracy: this.classifyAccurate,
                    greenWaste: this.greenNumber,
                    greenDir: this.greenId
                }),
            }).then(({data}) => {
              //console.log('转运登记得结果为',data)
              if(data && data.code === 0) {
                this.transitFlag = false
                this.$refs.loading.show = false
                 var nowTime = new Date().toLocaleDateString().split('/')
                  nowTime[1] = parseInt(nowTime[1]) < 10 ? '0'+nowTime[1] : nowTime[1]
                  nowTime[2] = parseInt(nowTime[2]) < 10 ? '0'+nowTime[2] : nowTime[2]
                  var time = nowTime.join('-')
                  this.$http({
                      url: this.$http.adornUrl(`/garbage/garbageTransferRegister/wxList`),
                      method: "post",
                      data: this.$http.adornData({
                          startTime: time,
                          endTime: time,
                          codeNum: localStorage.getItem('transitCodeNum')
                      }),
                  }).then(({data}) => {
                      //console.log('中转站记录为',data)
                      this.transitList = data.data
                  })
                this.confirmTransferShow = false
                this.imgList = []
                this.protectFileList = []

              }
            })
      }
    },
    computed: {
      sumNumber() {
        return (parseFloat(this.dinnerNumber) + parseFloat(this.otherNumber) + parseFloat(this.recycleNumber) + parseFloat(this.harmNumber) + parseFloat(this.greenNumber)).toFixed(2)
      }
    },
     components: {
    imagePreview,
    Loading
    },
}
</script>
<style lang="less" scoped>
.transitRegister {
    padding-left: .2rem;
    padding-right: .2rem;
    padding-top: .2rem;
    padding-bottom: 2.36rem;
    //基本信息
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
            }

            
        .content {
          .communityContainer {
              display: flex;
              font-size: .32rem;
            .community {

            }

            .area {

            }
          }
          //盒子模型
          .personWrapper {
                 display: flex;
                justify-content: space-between;
                width: 6.3rem;
                margin-left: .4rem;
                margin-top: .24rem;
                padding-bottom: .24rem;                
                font-size: .28rem;
                font-family: PingFangSC-Regular, PingFang SC;
                font-weight: 400;
                color: #999999;
                border-bottom: .01rem solid #DDDDDD;
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
                    padding: .11rem .25rem;
                    height: .54rem;
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

           .imgWrapper {
                display: flex;
                flex-wrap: wrap;
                margin-top: .23rem;
                margin-left: .12rem;
                img {
                    width: 3.13rem;
                    height: 1.76rem;
                    margin-left: .2rem;
                }
            }
        }
        .locationWrapper {
                display: flex;
                font-size: .32rem;
            img {
              width: .5rem;
              height: .8rem;

            }

            .locationTitle {

            }
            }
    
  }

  .transferContainer {
    //弹性盒子
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

    .transferWrapper {
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
  //添加和查看中转记录的弹框
  .transitRegisterDialog {
    font-size: .32rem;
  .van-popup {
    height: 16.82rem;
    padding: 0 .4rem;
    padding-bottom: 1.08rem;
    box-sizing: border-box;    
    background: #FFFFFF;
    border-radius: .28rem .28rem 0rem 0rem;
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

    .restWrapper {
      border-bottom: .01rem solid #eee;
      //弹性盒子
      .restCook {
                display: flex;
                align-items: center;
                font-size: 0.32rem;
                justify-content: space-between;
                height: 1rem;
                // border-bottom: .01rem solid #eee;
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
                      border: none;
                      text-align: center;
                      background: #F7F8F9;
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
      //盒子模型
      .went {
        display: flex;
        align-items: center;
        height: .8rem;
        justify-content: space-between;
        .wentTitle {

        }

       .inputWrapper {
         display: flex;
         align-items: center;
       //外观
        div {         
        font-size: .32rem;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #ccc;
        width: fit-content;
        border: none;
        }

        img {
          width: .31rem;
          height: .17rem;
        }
      }
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
                  //减少按钮
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
                //外观
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
                      border: none;
                      text-align: center;
                      background: #F7F8F9;
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
                  //添加按钮
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
    //上传图片
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
             .imgWrapper {
               display: flex;
                flex-wrap: wrap;
               img {
                 width: 3.13rem;
                 height: 1.76rem;
                 object-fit: cover;
                 margin-left: .12rem;
               }
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
  //备注
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
 //垃圾去向选择弹框
  .van-picker {
    position: fixed;
    background-color: #fff;
    -webkit-user-select: none;
    user-select: none;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 3000;
}
}
</style>