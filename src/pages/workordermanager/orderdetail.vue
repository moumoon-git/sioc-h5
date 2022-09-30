<!--
 * @Author: yaoweixin
 * @Date: 2020-07-24 15:23:59
 * @LastEditors: Liukanglin
 * @LastEditTime: 2020-12-29 16:21:15
 * @Description: 工单详情
 * @FilePath: /vue-cli-multiPage-master/src/pages/workordermanager/orderdetail.vue
-->
<template>
  <div>
    <div class="orderdetail" v-if="!myMapVisible">
        <div class="orderdetailheader">
            <div class="ordermessagetitle" :class="{'messageActive': state == 0}" @click="changeOrder(0)">
                工单信息
            </div>
            <div class="handleordertitle" :style="{display:(order.status == 4||order.status == 2)?'none':'initial'}" :class="{'messageActive' : state == 1}" @click="changeOrder(1)">
                处置工单
            </div>
        </div>
        <div v-if="order.reject&&state == 0" style="background-color: rgb(255, 255, 255);font-size: initial;margin: 2vh 3vw;padding: 1vh 0px;box-sizing: border-box;word-break: 2px;text-indent: 4vw;">
          {{`退件已被驳回 ${order.rejectDescription?order.rejectDescription:''}`}}
        </div>
        <div v-if="state == 0" style="background-color: rgb(255, 255, 255);font-size: 12px;margin: 2vh 3vw;padding: 1vh 0px;box-sizing: border-box;word-break: 2px;display: flex;">
          <!-- <span style="margin-left: 6px;">{{`派单时间:${order.gmtCreate.split(' ')[0]}`}}</span> -->
          <span style="margin-left: auto;margin-right: 6px;">{{`剩余时间:${order.isEndtime==0?'不限时':handleTime(order.endDate)}`}}</span>
        </div>
        <div class="orderdetailcontainer" v-if="state == 0">
            
            <div class="ordermessagecontainer">
                <div class="basemessagetitle">
                    基本详情
                </div>
                <div class="detailcontent">
                    <van-field v-model="order.workModuleString" label="工单类型" label-width="18.7vw" label-class="gray" readonly/>
                    <van-field v-model="order.number" label="工单编号" label-width="18.7vw" label-class="gray" readonly/>
                    <van-field v-model="order.name" label="工单名称" label-width="18.7vw" label-class="gray" readonly/>
                    <van-field v-model="order.workPropertyString" label="工单属性" label-width="18.7vw" label-class="gray" readonly/>
                    <div style="display:flex;justify-content:space-between;align-items:center;" class="lookWrapper">
                    <van-field v-model="order.handleTarget" label="处置对象" label-width="18.7vw" label-class="gray" readonly/>
                      <template v-if="order.handleTarget.split('-').length==2">
                        <img src="~@/assets/img/phone.png" alt="" class="tel" @click="$refs.handleTargetPhone.click()">
                        <a ref="handleTargetPhone" :href="'tel:'+order.handleTarget.split('-')[1]" style="display:none;"></a>
                      </template>
                      <div style="font-size: 0.28rem;color: skyblue;width:13vw;margin-bottom:2vh;" v-if="lookShow" @click="lookHandleObjectDetail()">查看</div>
                    </div>
                    <van-field v-model="order.sysTownName" label="所属镇街" label-width="18.7vw" label-class="gray" readonly/>
                    <van-field v-model="order.workPlace" label="工单地点" label-width="18.7vw" label-class="gray" readonly/>
                    <van-field v-model="order.gmtCreate" label="工单时间" label-width="18.7vw" label-class="gray" readonly/>
                    <van-field v-model="order.gmtCreate" label="派单时间" label-width="18.7vw" label-class="gray" readonly/>
                    <van-field v-model="order.sendTime" label="来电时间" label-width="18.7vw" label-class="gray" readonly/>
                    <van-field v-model="order.label" label="工单标签" label-width="18.7vw" label-class="gray" readonly/>
                    <van-field v-model="order.timelimit" label="工单时限点" label-width="18.7vw" label-class="gray" readonly/>
                    <van-field v-if="order.status == 3" v-model="order.chargeStartTime" label="挂帐开始时间" label-width="18.7vw" label-class="gray" readonly/>
                    <van-field v-if="order.status == 3" v-model="order.chargeEndTime" label="挂帐结束时间" label-width="18.7vw" label-class="gray" readonly/>
                    <van-field v-model="order.remark" rows="2" autosize label="情况说明" label-width="18.7vw" type="textarea" label-class="gray" readonly/>
                    <div class="appendix">
                      附件
                    </div>
                    <div class="picturecontainer" v-if="imgList.length != 0">
                       <img v-for="(imgitem,index) in imgList" :key="index" v-lazy="imgitem.allUrl" alt="" @click="previewPic(imgitem.allUrl)">
                    </div>
                    <div class="linka" v-if="fileList.length != 0">
                      <a :href="fileitem.allUrl" v-for="(fileitem,index) in fileList" :key="index">{{fileitem.documentName}}</a>
                    </div>
                </div>
                <div class="statusPictureWrapper">
                <img src="~@/assets/img/alreadyhandle.png" alt="" v-if="order.status == 1">
                <img src="~@/assets/img/Handleing.png" alt="" v-else-if="order.status == 0">
                <img src="~@/assets/img/alreadyCancel.png" alt="" v-else-if="order.status == -1">
                <img src="~@/assets/img/toBeSigned.png" alt="" v-else-if="order.status == 4">
                <img src="~@/assets/img/alReturn.png" alt="" v-else-if="order.status == 2">
                <img src="~@/assets/img/alCharge.png" alt="" v-else-if="order.status == 3">
                <img src="~@/assets/img/underReview.png" alt="" v-else-if="order.status == 5">
                <img src="~@/assets/img/eliminated.png" alt="" v-else-if="order.status == 6">
                </div>
            </div>
            <div class="orderhandlepeople">
                 <div class="orderhandlepersoncontainer">
                     <div class="orderhandleperson">
                     工单处置人员 （{{allContactorList.length}}人)
                     </div>
                     <!-- <div class="handledepartment">
                       处置部门: {{departmentName}}
                     </div> -->
                 </div>
                 <div class="handlepersondetailcontainer" v-if="allContactorList.length != 0">
                 <div class="hanlepersondetail" v-for="(item,index) in allContactorList" :key="index">
                     <img src="~@/assets/img/leader.png" alt="" class="personavatar" v-if="item.type == '5'||item.type == '6'">
                     <img src="~@/assets/img/joiner.png" alt="" class="personavatar" v-else>
                     <div class="personname">
                          {{item.contactorIdString}}
                     </div>
                     <div class="career" :class="{isleader: item.type == '5'||item.type == '6',isjoiner: item.type == '2'}">
                          {{getContactorType(item.type)}}
                          <!-- {{item.type == "1"? '负责人': item.type == "2"? '参与人': '抄送人'}} -->
                     </div>
                     <div class="addressdetail">
                          {{item.position == null?'':item.position}}{{item.position == null && item.mailGroupName == null?'':'/'}}{{item.mailGroupName == null?'':item.mailGroupName}}
                     </div>
                     <div v-if="item.type == '5'||item.type == '6'" style="white-space: nowrap;margin-right: 0.3rem;">{{item.isSign==0?'未签收':'已签收'}}</div>
                     <img src="~@/assets/img/phone.png" alt="" class="tel" @click="handleCallPhone(index)">
                     <a ref="callPhone" :href="'tel:'+item.mobile1" style="display:none;"></a>
                 </div>
                 </div>
            </div>
            <div class="btn-panel">
              <div class="sendorder" @click="chooseUser" v-if="transferOrderButtonShow && (order.status == 0)">
                转发工单
              </div>
              <!-- <div class="return-parts-btn" v-if="returnPartsBtnShow && order.status == 4" @click="returnPartsShow=true">
                退件
              </div> -->
              <div class="sign-for-btn" v-if="signForBtnShow" @click="handleUpdateStatus('签收')">
                签收
              </div>
              <div class="sendorder" v-if="urgeBtnShow" @click="handleUrge">
                催办
              </div>
            </div>
            
        </div>
        <!-- -->
        <div class="submitHandleMessageJoiner" v-if="state == 1">
        <div class="handlecontent" @click="functionPanelVisible=false">
          <div class="handleorderdetail" style="overflow: scroll;max-height: 75.5vh;" v-if="handleResponseEntities.length != 0">
              <div class="persontalk" v-for="(item,index) in handleResponseEntities" :key="index">
                  <div class="sender" v-if="item.contactorEntity.contactorId === userId">
                      <div class="content">
                         <div class="contenttop">
                             <div class="contenttopheader">
                                 
                                   <span class="iconfont iconyk_yuanquan_fill circleblack"></span>
                                   <div class="handleordertitle" v-if="item.responseType==-1">
                                       已取消（停用）工单
                                   </div>
                                   <div class="handleordertitle" v-else-if="item.responseType==0">
                                       处置中（重启）工单
                                   </div>
                                   <div class="handleordertitle" v-else-if="item.responseType==1">
                                       已处置（完成）工单
                                   </div>
                                   <div class="handleordertitle" v-else-if="item.responseType==2">
                                       处置工单
                                   </div>
                                   <div class="handleordertitle" v-else-if="item.responseType==3">
                                       回复工单
                                   </div>
                                   <div class="handleordertitle" v-else-if="item.responseType==4">
                                       已退件
                                   </div>
                                   <div class="handleordertitle" v-else-if="item.responseType==5">
                                       已签收
                                   </div>
                                   <div class="handleordertitle" v-else-if="item.responseType==6">
                                       已挂账
                                   </div>
                                   <div class="handleordertitle" v-else-if="item.responseType==7">
                                       驳回
                                   </div>
                                   <div class="handleordertitle" v-else-if="item.responseType==8">
                                       已催办
                                   </div>
                                   <div class="handleordertitle" v-else-if="item.responseType==9">
                                       重发
                                   </div>
                                   <div class="handleordertitle" v-else-if="item.responseType==10">
                                      已转发
                                   </div>
                                   <div class="handleordertitle" v-else-if="item.responseType==11">
                                      提交审批
                                   </div>
                                   <div class="handleordertitle" v-else-if="item.responseType==12">
                                      已剔除
                                   </div>
                                   <div class="handleordertitle" v-else-if="item.responseType==13">
                                      审核通过
                                   </div>
                                   <div class="handleordertitle" v-else-if="item.responseType==14">
                                      二次办理
                                   </div>
                                   <div class="perName" v-else>
                                     {{item.handleResponseEntity != null ?(item.handleResponseEntity.contactorEntity != null?item.handleResponseEntity.contactorEntity.contactorIdString: ''): ''}}
                                   </div>
                                   <div class="starttime" v-if="item.handleResponseEntity != null">
                                       {{item.handleResponseEntity != null?item.handleResponseEntity.gmtCreate: ''}}
                                   </div>
                             </div>
                             
                             <!-- <div class="personname">{{item.handleResponseEntity != null ?(item.handleResponseEntity.contactorEntity != null?item.handleResponseEntity.contactorEntity.contactorIdString: ''): ''}}</div> -->
                             <template  v-if="item.handleResponseEntity != null">
                             <div class="handleresult">
                                  {{item.handleResponseEntity.remark}}
                             </div>
                             </template>
                         </div>
                         <div class="contentbottom">
                              <div class="contentbottomheader">
                                  <!-- <div class="responseordertitle">
                                      回复工单
                                  </div> -->
                                  <div class="responsetime">
                                      {{item.gmtCreate}}
                                  </div>
                              </div>
                              <div class="responseresult">
                                   {{item.remark}}
                              </div>
                              <div class="handlepiccontainer" v-if="item.imgProcessList.length!= 0">
                                 <img v-for="(imgitem,index) in item.imgProcessList" :key="index" :src="$window.SERSVER_BASE_HOME+imgitem.url" alt="" @click="previewPic($window.SERSVER_BASE_HOME+imgitem.url)"/>
                             </div>
                             <div class="footlink" v-if="item.fileHandleList.length != 0">
                               <a href="#" v-for="(fileitem,index3) in item.fileHandleList" :key="index3">{{fileitem.documentName}}</a>
                             </div>
                             <template v-if="item.audioList.length != 0">
                                <div class="audio-wrap" v-for="(audioItem,audioIndex) in item.audioList" :key="audioIndex">
                                  <audio v-if="audioItem.url.search('amr')==-1" :src="$window.SERSVER_BASE_HOME+(audioItem.fileName||audioItem.url)" controls="controls" >
                                    您的浏览器不支持 audio 标签。
                                  </audio>
                                  <div v-else class="audio-wrap" style="display:flex;align-items:end;" @click="openRecording($window.SERSVER_BASE_HOME+audioItem.url,audioIndex)">
                                    <label>{{audioItem.name}}</label>
                                    <van-icon v-if="voiceActive==audioIndex" name="pause-circle-o"  style="margin-left: 8px;"/>
                                    <van-icon v-else name="play-circle-o" style="margin-left: 8px;"/>
                                  </div>
                                </div>
                             </template>
                             <template v-if="item.videoList.length != 0">
                                <div class="video-wrap" v-for="(videoItem,videoIndex) in item.videoList" :key="videoIndex">
                                  <video controls>
                                    <source :src="$window.SERSVER_BASE_HOME+videoItem.url" type="video/mp4" />
                                    <source :src="$window.SERSVER_BASE_HOME+videoItem.url" type="video/mov" />
                                    您的浏览器不支持 video 标签。
                                  </video>
                                </div>
                             </template>
                              <div class="addresscontainer">
                                    <div class="address" @click="showAddressDetail(item.workPlace)">
                                      <span class="iconfont icondingwei addressicon"></span>
                                      {{item.workPlace}}
                                   </div>
                                  <!-- <div class="responsebutton"  @click="responseOrder(item.id)"  v-if="joinerShowContent">
                                      回复
                                  </div> -->
                              </div>
                         </div>
                         <!-- <div class="myOrderResponse" v-else>
                           <div class="addresscontainer" >
                                  <div class="address">
                                      <span class="iconfont icondingwei addressicon"></span>
                                      {{item.workPlace}}
                                  </div>
                                  <div class="responsebutton" :class="{'responseStyle': responseShow == 1}" @click="responseOrder(item.id)" >
                                      回复
                                  </div>
                              </div>
                         </div> -->
                      </div>
                      <div class="handleperson">
                          {{item.contactorEntity.contactorIdString?item.contactorEntity.contactorIdString.substring(item.contactorEntity.contactorIdString.length-2): ''}}
                      </div>
                  </div>
                  <div class="receiver" v-if="item.contactorEntity.contactorId !== userId">
                      <div class="leader">
                          {{item.contactorEntity.contactorIdString?item.contactorEntity.contactorIdString.substring(item.contactorEntity.contactorIdString.length-2): ''}}
                          <div class="leadericon"></div>
                      </div>
                      <div class="content">
                         <div class="contenttop">
                             <div class="contenttopheader">
                                   <span class="iconfont iconyk_yuanquan_fill circleblack"></span>
                                   <div class="handleordertitle" v-if="item.responseType==-1">
                                       已取消（停用）工单
                                   </div>
                                   <div class="handleordertitle" v-else-if="item.responseType==0">
                                       处置中（重启）工单
                                   </div>
                                   <div class="handleordertitle" v-else-if="item.responseType==1">
                                       已处置（完成）工单
                                   </div>
                                   <div class="handleordertitle" v-else-if="item.responseType==2">
                                       处置工单
                                   </div>
                                   <div class="handleordertitle" v-else-if="item.responseType==3">
                                       回复工单
                                   </div>
                                   <div class="handleordertitle" v-else-if="item.responseType==4">
                                       已退件
                                   </div>
                                   <div class="handleordertitle" v-else-if="item.responseType==5">
                                       已签收
                                   </div>
                                   <div class="handleordertitle" v-else-if="item.responseType==6">
                                       已挂账
                                   </div>
                                   <div class="handleordertitle" v-else-if="item.responseType==7">
                                       驳回
                                   </div>
                                   <div class="handleordertitle" v-else-if="item.responseType==8">
                                       已催办
                                   </div>
                                   <div class="handleordertitle" v-else-if="item.responseType==9">
                                       重发
                                   </div>
                                   <div class="handleordertitle" v-else-if="item.responseType==10">
                                      已转发
                                   </div>
                                   <div class="handleordertitle" v-else-if="item.responseType==11">
                                      提交审批
                                   </div>
                                   <div class="handleordertitle" v-else-if="item.responseType==12">
                                      已剔除
                                   </div>
                                   <div class="handleordertitle" v-else-if="item.responseType==13">
                                      审核通过
                                   </div>
                                   <div class="handleordertitle" v-else-if="item.responseType==14">
                                      二次办理
                                   </div>
                                   <div class="perName" v-else>
                                     {{item.handleResponseEntity != null ?(item.handleResponseEntity.contactorEntity != null?item.handleResponseEntity.contactorEntity.contactorIdString: ''): ''}}
                                   </div>
                                   <div class="starttime" v-if="item.handleResponseEntity != null">
                                       {{item.handleResponseEntity != null?item.handleResponseEntity.gmtCreate: ''}}
                                   </div>
                             </div>
                             
                             <!-- <div class="personname">{{item.handleResponseEntity != null ?(item.handleResponseEntity.contactorEntity != null?item.handleResponseEntity.contactorEntity.contactorIdString: ''): ''}}</div> -->
                             <template v-if="item.handleResponseEntity != null">
                             <div class="handleresult">
                                  {{item.handleResponseEntity.remark}}
                             </div>
                             </template>
                         </div>
                         <div class="contentbottom">
                              <div class="contentbottomheader">
                                  <!-- <div class="responseordertitle">
                                      回复工单
                                  </div> -->
                                  <div class="responsetime">
                                       {{item.gmtCreate}}
                                  </div>
                              </div>
                              <div class="responseresult">
                                  {{item.remark}}
                              </div>
                               <div class="handlepiccontainer" v-if="item.imgProcessList.length!= 0">
                                 <img v-for="(imgitem,index) in item.imgProcessList" :key="index" :src="$window.SERSVER_BASE_HOME+imgitem.url" alt="" @click="previewPic($window.SERSVER_BASE_HOME+imgitem.url)">
                             </div>
                             <div class="footlink" v-if="item.fileHandleList.length != 0">
                               <a href="#" v-for="(fileitem,index3) in item.fileHandleList" :key="index3">{{fileitem.documentName}}</a>
                             </div>
                             <template v-if="item.audioList.length != 0">
                                <div class="audio-wrap" v-for="(audioItem,audioIndex) in item.audioList" :key="audioIndex">
                                  <audio v-if="audioItem.url.search('amr')==-1" :src="$window.SERSVER_BASE_HOME+(audioItem.fileName||audioItem.url)" controls="controls">
                                    您的浏览器不支持 audio 标签。
                                  </audio>
                                  <div v-else class="audio-wrap" style="display:flex;align-items:end;"  @click="openRecording($window.SERSVER_BASE_HOME+audioItem.url,audioIndex+100)">
                                    <label>{{audioItem.name}}</label>
                                    <van-icon v-if="voiceActive==(audioIndex+100)" name="pause-circle-o"  style="margin-left: 8px;"/>
                                    <van-icon v-else name="play-circle-o" style="margin-left: 8px;"/>
                                  </div>
                                </div>
                             </template>
                             <template v-if="item.videoList.length != 0">
                                <div class="video-wrap" v-for="(videoItem,videoIndex) in item.videoList" :key="videoIndex">
                                  <video controls >
                                    <source :src="$window.SERSVER_BASE_HOME+videoItem.url" type="video/mp4" />
                                    <source :src="$window.SERSVER_BASE_HOME+videoItem.url" type="video/mov" />
                                    您的浏览器不支持 video 标签。
                                  </video>
                                </div>
                             </template>
                              <div class="addresscontainer">
                                  <div class="address" @click="showAddressDetail(item.workPlace)">
                                      <span class="iconfont icondingwei addressicon"></span>
                                      {{item.workPlace}}
                                  </div>
                                  <!-- <div class="responsebutton"  @click="responseOrder(item.id)" v-if="joinerShowContent">
                                      回复
                                  </div> -->
                              </div>
                         </div>
                         <!-- <div class="myOrderResponse" v-else>
                           <div class="addresscontainer" >
                                  <div class="address">
                                      <span class="iconfont icondingwei addressicon"></span>
                                      {{item.workPlace}}
                                  </div>
                                  <div class="responsebutton" :class="{'responseStyle': responseShow == 1}" @click="responseOrder(item.id)" >
                                      回复
                                  </div>
                              </div>
                         </div> -->
                      </div>
                  </div>
              </div>
        </div>
            
        </div>
        <div class="handleProcess" :style="{'bottom': !functionPanelVisible?'-2.5vh':'0rem'}">
          <div class="permission-button-panel">
              <div v-if="handlerShowButton||examineVisible" class="button" :class="{'messageActive' : Orderstate == 'disposalOrder'}" @click="changeOrderstate('disposalOrder')">处置工单</div>
              <template v-if="handlerShowButton">
                <!-- <div class="button" :class="{'messageActive' : Orderstate == 'orderSettings'}" @click="changeOrderstate('orderSettings')">工单设置</div> -->
                <div v-if="order.status==0&&(userInfo.type=='5'||userInfo.type=='6')" class="button" :class="{'messageActive' : Orderstate == 'submitApproval','disabled': userInfo.isApprove==1}" @click="changeOrderstate('submitApproval',userInfo.isApprove==1)">提交审批</div>
              </template> 
              <template v-if="examineVisible">
                <div v-if="(order.status==5||order.status==1)&&(userInfo.type=='7')" class="button" :class="{'messageActive' : Orderstate == 'submitExamine','disabled': userInfo.isApprove==1||order.status==1}" @click="changeOrderstate('submitExamine',userInfo.isApprove==1||order.status==1)">审核工单</div>
              </template>
              <!-- v-if="order.status==5"  -->
              <div v-if="order.status==5" class="button" :class="{'messageActive' : Orderstate == 'approvalProgress'}" @click="getApprovalProgressList">审批进度</div> 
            </div>
          <div v-show="handlerShowButton&&Orderstate!='disposalOrder'" class="permission-response-button-panel" >           
                  <!-- <div class="alreadyhandle" :class="{'handleing': handleState == 0}" v-show="Orderstate == 'orderSettings'" @click="changeHandleState(0)">处置中</div>
                  <div class="alreadyhandle" :class="{'handleing': handleState == 1}" v-show="Orderstate == 'orderSettings'" @click="changeHandleState(1)">已处置</div> -->
                  <!-- <div class="alreadyhandle" :class="{'handleing': handleState == -1}" v-show="Orderstate == 'orderSettings'" @click="changeHandleState(-1)">已取消</div> -->
                  <van-radio-group v-show="Orderstate == 'submitExamine'"  v-model="approvalExamineRadio" style="display: flex;">
                    <van-radio name="0" style="margin-right: 15px;">{{Orderstate == 'submitApproval'?'确认提交审批':'已审批'}}</van-radio>
                    <van-radio name="1">{{Orderstate == 'submitApproval'?'暂不提交审批':'退回办理'}}</van-radio>
                  </van-radio-group>
          </div>
            <div class="handlecontact" >
              <!-- <div class="inputborder">
                  <textarea name="" id=""  rows="2" placeholder="请输入工单处置情况" class="contacttalk" v-model="inputHandleCondition"></textarea>
              </div>
              <van-uploader v-model="imgFileList" multiple :after-read="afterReadOrder" :preview-image="false">
                <div class="iconfont icontupian pic"></div>
              </van-uploader>
              <div class="submitbutton" @click="handleMyOwnOrderThrottle"  @touchstart="isClick = true" :class="{clickStyle:isClick}">
                  提交
              </div> -->
              <img src="~@/assets/img/soundRecording.png" style="width: 0.5rem;" @click="voiceRecordVisible=!voiceRecordVisible">
              <van-field ref="van-field" class="custom-input" v-model="inputHandleCondition" placeholder="请输入详细内容" style="width:4.33rem;height:0.68rem;"/>
              <van-icon name="add-o" size="0.5rem" @click="handleAddIconClick"/>
              <button class="submit-button" @click="handleMyOwnOrderThrottle"  :class="{'clickStyle':isClick,'disabled': (handlerShowButton||examineVisible)&&Orderstate == 'disposalOrder'&&!inputHandleCondition}">发送</button>
            </div>
            <section class="function-panel" :class="{'function-panel-active': functionPanelVisible}">
              <!-- <template v-if="uploadResponsImg.length==0"> -->
                <section class="panel-box">
                  <div @click="handleImgUpload">
                    <van-icon class="function-panel-icon" name="photo" size="6vw" />
                    <label>图片</label>
                    <input ref="imgUpload" type="file" accept="image/*" style="display:none;" multiple="true" @change="handleImgUploadChange">
                  </div>
                  <!-- <div @click="handleFileUpload('cameraUpload')">
                      <van-icon class="function-panel-icon" name="photograph" size="6vw"/>
                      <label>拍摄</label>
                      <input ref="cameraUpload" type="file" data-set="cameraUpload" accept="video/*" capture="camcorder" style="display:none;" @change="handleFileUploadChange">
                    </div> -->
                    <!-- <div @click="handleFileUpload('fileUpload')">
                      <van-icon class="function-panel-icon" name="smile-comment" size="6vw" />
                      <label>录音</label>
                      <input ref="fileUpload" type="file" data-set="fileUpload" style="display:none;" multiple="multiple" @change="handleFileUploadChange">
                    </div> -->
                  <!-- </template> -->

                  <!-- <input type="file" accept="video/*" capture="camcorder"> -->
                </section>

              <template v-if="uploadResponsImg.filter(item=>{return  /(jpg|gif|bmp|png)$/i.test(item.url) }).length!=0">
                <div class="img-wrap" v-for="(imgItem,imgIndex) in uploadResponsImg.filter(item=>{return  /(jpg|gif|bmp|png)$/i.test(item.url) })" :key="imgIndex">
                  <img :src="$window.SERSVER_BASE_HOME+imgItem.url" @click="handleImgPreview($window.SERSVER_BASE_HOME+imgItem.url)">
                  <van-icon name="clear" @click="handleDeleteFile(imgIndex)" />
                </div>
              </template>

              <template v-if="uploadResponsImg.filter(item=>{return  /(mp4|rmvb|flv|mpeg|avi|mov)$/i.test(item.url) }).length!=0">
                <div class="video-wrap" v-for="(videoItem,videoIndex) in uploadResponsImg.filter(item=>{return  /(mp4|rmvb|flv|mpeg|avi|mov)$/i.test(item.url) })" :key="videoIndex">
                  <video controls>
                    <source :src="$window.SERSVER_BASE_HOME+videoItem.url" type="video/mp4" />
                    <source :src="$window.SERSVER_BASE_HOME+videoItem.url" type="video/mov" />
                    您的浏览器不支持 video 标签。
                  </video>
                  <van-icon name="clear" @click="handleDeleteFile(videoIndex)"/>
                </div>
              </template>

              <template v-if="uploadResponsImg.filter(item=>{return  /(cd|ogg|mp3|asf|wma|wav|rm|real|ape|module|midi|vqf|amr|m4a)$/i.test(item.url) }).length!=0">
                <div class="audio-wrap" v-for="(audioItem,audioIndex) in uploadResponsImg.filter(item=>{return  /(cd|ogg|mp3|asf|wma|wav|rm|real|ape|module|midi|vqf|amr|m4a)$/i.test(item.url) })" :key="audioIndex">
                  <audio :src="$window.SERSVER_BASE_HOME+audioItem.url" controls="controls">
                    您的浏览器不支持 audio 标签。
                  </audio>
                  <van-icon name="clear" @click="handleDeleteFile(audioIndex)"/>
                </div>
              </template>
        
            </section>
            <!-- <div v-if="imgFileList.length!=0" class="showChooseImg">
                <div class="imgContainer" v-for="(item,index) in imgFileList" :key="index">
                    <img :src="item.content" alt="">
                    <img src="~@/assets/img/deleteimgx.png" class="deletex" @click="deleteImg(index)">
                </div>
            </div> -->
        </div>
        </div>
        <van-dialog v-model="replyOrderShow" title="回复工单" show-cancel-button @confirm="responseOrderMessageDebounce">
             <textarea name="" id="" cols="30" rows="2" placeholder="请输入工单处置情况" class="contacttalk" v-model="handleCondition"></textarea>
             <van-uploader :after-read="afterRead" v-model="orderFileList"/>
        </van-dialog>
        <van-dialog v-model="returnPartsShow" title="退件" show-cancel-button @confirm="handleUpdateStatus('退件')">
             <textarea name="" id="" cols="30" rows="2" placeholder="请输入退件原因" class="contacttalk" v-model="returnPartsRemark"></textarea>
        </van-dialog>
    </div>
    <imagePreview
      :overlayShow="overlayShow"
      :enlargeImageUrl="enlargeImageUrl"
      @closeOverlay="closeOverlay"
    >
    </imagePreview>
    <Loading ref="loading"></Loading>
    <van-popup v-model="approvalProgressVisible">
      <van-steps direction="vertical" :active="approvalProgressList.length-1">
        <van-step v-for="(progressItem) in approvalProgressList" :key="progressItem.id">
          <h3>{{progressItem.tips}}</h3>
          <p>{{progressItem.gmtCreate}}</p>
        </van-step>
      </van-steps>
    </van-popup>
    <van-overlay :show="overlayVisible">
      <div class="wrapper" @click.stop style="display: flex;align-items: center;justify-content: center;height: 100%;">
        <van-loading size="24px">加载中...</van-loading>
      </div>
    </van-overlay>
    <van-action-sheet v-model="voiceRecordVisible" title=" " @close="handleCloseVoiceRecordPanel">
      <section class="voice-record-panel">
        <h1>{{mainTitleText}}</h1>
        <p>{{subTitleText}}</p>
        <div class="sound-record-button" @touchstart.prevent="handleVoiceRecordStart" @touchend.prevent="handleVoiceRecordEnd"></div>
      </section>
    </van-action-sheet>
    </div>
</template>
<script>
import Loading from '../commonLoading/commonLoading'
import {debounce,throttle} from './utils.js'
import imagePreview from "./imagePreview"
import { mapMutations, mapActions, mapGetters } from 'vuex'
import { ImagePreview, Toast } from 'vant';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import BenzAMRRecorder from 'benz-amr-recorder';
import { Notify } from 'vant';

export default {
  name: 'orderdetail',
  data() {
    return {
    flag: false,//处置订单防止重复提交的标志
    flag1: false,//回复订单防止重复提交的标志
    isClick: false,//提交按钮是否被点击
    overlayShow: false, //遮罩层
    enlargeImageUrl: "", //接收到的放大图片的路径
    bussid: -1,
    routerTo: '',//要跳转的url
    lookShow: false,//判断查看按钮是否显示
    orderIsCancel: false,//工单是否是已取消工单
    transferOrderButtonShow: false,//转发工单按钮是否显示
    returnPartsBtnShow: false,
    signForBtnShow: false,
    urgeBtnShow: false,
    showPreview: false,//展示预览图片
    uploadResponsImg: [],//上传的图片列表
    responseType: -2,//改变订单状态
    inputHandleCondition: '',//下边工单输入处置情况
    // inspectionTaskItems:[],//人所在的地理位置
    myMapVisible: false,//控制地图的显示与隐藏
    handleCondition: '',//工单处置情况
    orderFileList: [],//工单上传图片
    replyOrderShow: false,//回复工单弹窗的显示与隐藏
    returnPartsShow: false,
    returnPartsRemark: '',
    responseShow: false,//回复显示按钮
    joinerShowContent: false,//参与人显示的内容
    handlerShowButton: false,//处置人显示按钮
    allContactorList: [],//所有的参与人列表
    handleState: -2,//改变处置状态
    Orderstate: 'disposalOrder',
    responseId: -1,//回复的id
    userId: 0,//用户登录的id
    imgFileList: [],//上传的图片列表
    workId: 0,//工单id
    handleResponseEntities: [],//处置工单的详细信息
    state: 0,
    order: {
       workModuleString: '',
       name: '',
       workPropertyString: '',
       handleTarget: '',
       workPlace: '',
       gmtCreate: '',
       timelimit: '',
       remark: '',
       status: 4,
       endDate: '',
       chargeStartTime: '',
       chargeEndTime: '',
    },
    fileList: [],//文件列表
    imgList: [],//图片列表
    allContactorList: [],//所有处置人的信息
    departmentName: '',//部门名字
    longitude: '',
    latitude: '',
    address: '',
    approvalExamineRadio: '0',
    userInfo: '',
    examineVisible: false,
    approvalProgressVisible: false,
    approvalProgressList: [],
    functionPanelVisible: false,
    overlayVisible: false,
    stompClient: null,
    lockReconnect: false,
    playRec: null,
    voiceActive: '',
    voiceRecordVisible: false,
    mainTitleText: '按住录音',
    subTitleText: '请录制1分钟以内录音',
    voice: { localId: '', serverId: '' },
    countDownTime: 59,
    voiceInterval: null,
    beginTimeDate: '',
    endTimeDate: '',
    lastPercent: '',
    lastPercentTime: ''
    }
  },
  created() {
        this.initJSDK();
        this.userId = parseInt(localStorage.getItem('contactorId'))
        //console.log('用户id出来',parseInt(localStorage.getItem('contactorId')))
          // this.userId = 13823
          
    let workId = localStorage.getItem('workId')
    this.$http({
      url: this.$http.adornUrl(`/work/workSheet/info/${workId}`),
      method: 'get',
      params: this.$http.adornParams({
      })
    }).then(({data}) => {
      if(data && data.code === 0){
      let timelimit = ""
      let imgList = []
      let fileList = []
      //console.log('data',data)
      if(data.data.status == "-1") {
          this.orderIsCancel = true
      }
      this.lookShow = data.data.workModule != null && data.data.handleTagetId != null && data.data.workModuleEntity != null && data.data.workModuleEntity.pageUrl != null? true: false
      this.bussid = data.data.handleTagetId
      this.routerTo = data.data.workModuleEntity.pageUrl != null? data.data.workModuleEntity.pageUrl.split('#')[1]: ''
      this.order.workModuleString = data.data.workModuleString
      this.order.name  = data.data.name
      this.order.workPropertyString = data.data.workPropertyString
      this.order.handleTarget = data.data.handleTarget
      this.order.workPlace = data.data.workPlace
      this.order.gmtCreate = data.data.gmtCreate
      this.order.status = data.data.status
      this.order.endDate = data.data.endDate
      this.order = data.data;
      if(data.data.isEndtime == '0'){
        timelimit = '无限制'
      }
      if(data.data.isEndtime !== '0') {
          if(data.data.endDate != null) {
             timelimit = timelimit + data.data.endDate
          }
          if(data.data.endTime != null) {
            timelimit = timelimit + data.data.endTime
          }
      }
      this.order.timelimit = timelimit
      this.order.remark = data.data.remark
      data.data.documentList.forEach((item,index) => {
          if(item.url.search('png')!=-1||item.url.search('jpg')!=-1||item.url.search('PNG')!=-1||item.url.search('JPG')!=-1){
          // if(/(.png|.jpg|.PNG|.JPG)$/.test(item.url)){
            imgList.push(item)
          }else {
            fileList.push(item)
          }
      })
      this.imgList = imgList
      this.fileList = fileList
      this.allContactorList = data.data.allContactorList
      this.allContactorList.forEach((item,index) => {
        if(item.contactorId == this.userId) {
          localStorage.setItem("forwarderId",item.id);
          if((item.type == '5'||item.type == '6') && item.isSign==1) {
            this.transferOrderButtonShow = true
          }else {
            this.transferOrderButtonShow = false
          }
          if(item.type == '5'||item.type == '6') {
            this.returnPartsBtnShow = true
          }else {
            this.returnPartsBtnShow = false
          }
          if((item.type == '5'||item.type == '6'||item.type == '1') && item.isSign==0) {
            this.signForBtnShow = true
          }else {
            this.signForBtnShow = false
          }
          if(( ((item.type == "5"||item.type == "6")&&(this.order.status=='0')&& item.isSign==1) || (item.type == "7"&&(this.order.status == "4"||this.order.status == "0")) || (item.type == "8"&&(this.order.status == "4"||this.order.status == "0"||this.order.status == "5")) )) {
            this.urgeBtnShow = true
          }else {
            this.urgeBtnShow = false
          }
        }
      })
      this.departmentName = data.data.mailGroupName
      this.workId = data.data.id
      let imgProcessList = []
      let fileHandleList = []
      let audioList = [];
      let videoList = [];
             data.data.handleResponseEntities.forEach((item,index) => {
               if(item.documentList !== null) {
               item.documentList.forEach((item2,index2) => {
                    if(item2.url.search('png')!=-1||item2.url.search('jpg')!=-1||item2.url.search('PNG')!=-1||item2.url.search('JPG')!=-1){
                    //  if(/(.png|.jpg|.PNG|.JPG)$/.test(item2.url)) {
                         imgProcessList.push(item2)
                     }
                     else if(/(cd|ogg|mp3|asf|wma|wav|rm|real|ape|module|midi|vqf|amr|m4a)$/i.test(item2.url)){
                         audioList.push(item2)
                     }
                     else if(/(mp4|rmvb|flv|mpeg|avi|mov)$/i.test(item2.url)){
                         videoList.push(item2)
                     }
                     else {
                         fileHandleList.push(item2)
                     }
               })
               item.imgProcessList = imgProcessList
               item.fileHandleList = fileHandleList
               item.audioList = audioList;
               item.videoList = videoList;
               }else {
                 item.imgProcessList = []
                 item.fileHandleList = []
                 item.audioList = [];
                  item.videoList = [];
               }
               
               imgProcessList =  []
               fileHandleList = []
               audioList = [];
                videoList = [];
             })

      this.handleResponseEntities = data.data.handleResponseEntities.reverse();
      //console.log('处置的整个工单',this.handleResponseEntities)
      this.allContactorList = data.data.allContactorList
      this.allContactorList.forEach((item,index) => {
           if(item.contactorId == this.userId && (item.type == '5'||item.type == '6'||item.type == '7')) {   
            // 参与人 2
            // 村/社区负责人 5
            // 部门科室负责人 6
            // 包村领导 7
            // 镇领导 8
                 this.handlerShowButton = true
                 this.joinerShowContent = true
                 this.responseShow = true
                 this.userInfo = item;
           }else if (item.contactorId == this.userId && item.type == "2" && this.orderIsCancel == false) {
                this.joinerShowContent = true
                this.responseShow = true
           }else if(item.contactorId == this.userId && item.type == "2" && this.orderIsCancel == true) {
                this.joinerShowContent = false
           }else if(item.contactorId == this.userId && item.type == '7') {
             this.joinerShowContent = true
             this.examineVisible = true;
             this.userInfo = item;
           }
           else {
               this.responseShow = false
           }
      })
    }
    })
    this.getLocation();

    
    this.initWebsocket();

  },
  mounted(){
    let that = this;
    wx.onVoiceRecordEnd({
      complete: function (res) {
        that.voice.localId = res.localId;
        alert('录音结束，时长超过1分钟!');
        //上传录音
        that.uploadVoice();
      }
    });
  },
  beforeDestroy() {
    this.stompClient.disconnect()();
  },
  methods: {
    /**
     * @description: 展示工单地址的详细信息
     * @param {*} address:回复工单地址
     * @return {*}
     */
    showAddressDetail(address) {
      this.$toast(address)
    },
    handleMyOwnOrderThrottle() {
    if((this.handlerShowButton||this.examineVisible)&&this.Orderstate == 'disposalOrder'&&!this.inputHandleCondition) {
      return ;
    }
    this.isClick = true
     if(this.flag == false) {
       this.flag = true
       this.$refs.loading.show = true
       this.handleMyOwnOrder()
     }
      // if(this.flag == false) {
      //   this.flag = true
      // }
      
    },
    lookHandleObjectDetail() { //点击查看按钮
      // this.bussid = data.data.otherBussid
      // this.routerTo = data.data.workModuleEntity.pageUrl.split('#')[1]
      localStorage.setItem('bussid',this.bussid)
      if(this.routerTo && this.routerTo != ''){
      this.$router.push(this.routerTo)
      }
    },
    previewPic(imgUrl) {//点击预览图片
       this.enlargeImageUrl = imgUrl;
      document.body.setAttribute('style','overflow:hidden')
      this.overlayShow = true; //显示遮罩层
    },
    closePreviewPicture() {//关闭预览图片
      this.showPreview = false
      document.body.setAttribute('style','overflow:scroll')
    },
    //关闭遮罩层
    closeOverlay() {
      document.body.setAttribute('style','overflow:scroll')
      this.overlayShow = false; //关闭遮罩层
    },
    chooseUser() {
      // let nullArr = []
      // localStorage.setItem('checkedContacter',JSON.stringify(nullArr))
      this.$router.push("/chooseContacterList")
    },
    responseOrderMessageDebounce() {
      if(this.flag1 == false) {
        this.flag1 == true
        this.$refs.loading.show = true
        this.responseOrderMessage()
      }
      
    },
    responseOrderMessage() {//回复工单
      if(this.handleCondition != null || this.handleCondition != '') {
        this.$http({
          url: this.$http.adornUrl(`/work/workHandleResponse/wechatReply`),
          method: 'post',
          data: this.$http.adornData({
            "workPlace": this.address,
            "longitude": this.longitude,
            "latitude": this.latitude,
            "remark":  this.handleCondition,
            "workId": this.$route.params.id,
            "handleResponseId": this.responseId,
            "documentList": this.uploadResponsImg
          })
        }).then(({data}) => {
          //console.log('回复后的数据为',data)
          if(data && data.code === 0) {
            this.flag1 = false
            this.$refs.loading.show = false
            this.uploadResponsImg = []
            this.getOrderDetail()
          }
        })
      }
    },
    changeHandleState(index) {
       this.handleState = index
       this.responseType = index
    },
    changeOrderstate(index,isSetting) {
        if((index == 'submitApproval'||index == 'submitExamine')&&isSetting) {
          this.$notify(`你已经提交${index == 'submitApproval'?'审批':'审核'}，请勿重复提交`);
        }
        if(isSetting) {
          return;
        }
       this.Orderstate = index 
    },
    responseOrder(responseId) {//点击回复按钮
         this.responseId = responseId
         this.handleCondition = ''
         this.orderFileList = []
         this.replyOrderShow = true
         


    },
    handleMyOwnOrder() {//提交处置当前订单
      var that = this
      if(this.Orderstate == 'submitApproval'||this.Orderstate == 'submitExamine') {
          this.$http({
            url: this.$http.adornUrl(`/work/workSheet/toExamine`),
            method: 'post',
            data: this.$http.adornData({
              'remark': this.inputHandleCondition,
              'wsContactorId': this.userId,
              'workId': this.workId,
              'tips': `${this.getContactorType(this.userInfo.type)}-${this.Orderstate == 'submitExamine'?'审核':'提交审批'}`,
              'isAdopt': this.Orderstate == 'submitExamine'?this.approvalExamineRadio:undefined,
              'responseType': this.Orderstate == 'submitExamine'?'13':'11',
              'workSheetStatus': this.Orderstate == 'submitApproval'?'5':undefined,
              'handleResponseId': '0',
              'workPlace': this.address
            })
          }).then(({data}) => {
            if(data && data.code === 0){
                //console.log('更新之后的状态为',data)
                that.$refs.loading.show = false
                that.inputHandleCondition = ''
                that.imgFileList = []
                that.getOrderDetail()
                alert(`${that.Orderstate == 'submitExamine'?'审核':'提交审批'}成功`);
                that.Orderstate = 'disposalOrder';
                that.isClick = false
                that.flag = false
                that.functionPanelVisible = false;
              }else{
                that.$refs.loading.show = false
                that.isClick = false
                that.flag = false
                alert(data.msg)
              }
          })
          return ;
      }
      if(this.handlerShowButton && this.Orderstate == 'orderSettings' && this.responseType === -2) {
        this.$dialog.alert({
          message: '请选择处置状态',
        })
        that.isClick = false
        that.flag = false
        that.$refs.loading.show = false
        return
      }//负责人点击工单设置必须选择处置状态
      if(this.joinerShowContent === true && this.handlerShowButton == false) {//参与人
           var Position
      var that=this

  
           if(that.inputHandleCondition != '') {
           var formData = new FormData();

           that.$http({
        url: that.$http.adornUrl(`/work/workHandleResponse/wechatReply`),
        method: 'post',
        data: that.$http.adornData({
             "workPlace": that.address,
             "longitude": that.longitude,
             "latitude": that.latitude,
             "remark":  that.inputHandleCondition,
             "workId": localStorage.getItem('workId'),
             "handleResponseId":0,
             "documentList": that.uploadResponsImg.length==0?[]:that.uploadResponsImg
        })
          }).then(({data}) => {
            if(data && data.code === 0){
                //console.log('更新之后的状态为',data)
                that.$refs.loading.show = false
                that.inputHandleCondition = ''
                that.imgFileList = []
                that.uploadResponsImg = []
                that.getOrderDetail()
                that.isClick = false
                that.flag = false
                that.functionPanelVisible = false;
                alert('处置工单成功')
              }else{
                that.$refs.loading.show = false
                that.isClick = false
                that.flag = false
                alert('服务器异常，处置工单失败')
              }
            return
          })
     
      }else {
          that.$refs.loading.show = false
          that.isClick = false
          that.flag = false
          alert('请填写处置情况')
          return
      }
        

           return
      }
      //参与人结束
      //负责人
       var Position
      var that=this

           if(that.inputHandleCondition != '') {
           var formData = new FormData();
    
        if(that.Orderstate == 'orderSettings') {
           that.$http({
        url: that.$http.adornUrl(`/work/workHandleResponse/wechatUpdateStatus`),
        method: 'post',
        data: that.$http.adornData({
             "workPlace": that.address,
             "longitude": that.longitude,
             "latitude": that.latitude,
             "remark":  that.inputHandleCondition,
              "responseType": that.responseType,
             "workId": localStorage.getItem('workId'),
             "handleResponseId":0,
             "documentList": that.uploadResponsImg.length == 0?[]:that.uploadResponsImg
        })
          }).then(({data}) => {
            //console.log('更新之后的状态为',data)
               that.$refs.loading.show = false
            that.$dialog.alert({
             message: '更新工单成功',
             }).then(() => {
               that.inputHandleCondition = ''
               that.imgFileList = []
               that.uploadResponsImg = []
               that.getOrderDetail()
               that.isClick = false
               that.flag = false
               that.functionPanelVisible = false;
             })
            return
          })
        } else {
          that.$http({
        url: that.$http.adornUrl(`/work/workHandleResponse/wechatReply`),
        method: 'post',
        data: that.$http.adornData({
             "workPlace": that.address,
             "longitude": that.longitude,
             "latitude": that.latitude,
             "remark":  that.inputHandleCondition,
             "workId": localStorage.getItem('workId'),
             "handleResponseId":0,
             "documentList": that.uploadResponsImg.length == 0?[]:that.uploadResponsImg
        })
          }).then(({data}) => {
            if(data && data.code === 0){
              //console.log('更新之后的状态为',data)
              that.$refs.loading.show = false
              that.inputHandleCondition = ''
              that.imgFileList = []
              that.uploadResponsImg = []
              that.getOrderDetail()
              that.isClick = false
              that.flag = false
              that.functionPanelVisible = false;
              alert('处置工单成功')
            }else{
              that.$refs.loading.show = false
              that.isClick = false
              that.flag = false
              alert('服务器异常，处置工单失败')
            }
            return
          })
             
        }
      
      }else {
        that.$refs.loading.show = false
        that.isClick = false
        that.flag = false
        alert('请填写处置情况')
        return 
      }
      
    },
    changeOrder(state) {
      if(this.order.status == 4) {
        return ;
      }
      this.state = state
      this.getOrderDetail()

      
    },
     afterRead(file) {//弹框文件上传
      //console.log('orderfilelist ',this.orderFileList)
      //console.log('file ',file)
            // 此时可以自行将文件上传至服务器
      var formData = new FormData();
      // this.orderFileList.forEach((item,index) => {
      //   if(item.file){
      //     formData.append("file", item.file)
      //   }
      // })
      formData.append("file", file.file)
      this.$http({
        url: this.$http.adornUrl('/upload/passImg'),
        method: 'post',
        data: formData,
        headers: {
          "content-type": "multipart/form-data"
        },
        processData: false
      }).then(({data}) => {
        //console.log('图片数据为',data)
        let imgName = data.data.name
        let imgUrl = data.data.url
        let imgObj = {}
        imgObj.name = imgName
        imgObj.url = imgUrl
        let imgList = []
        imgList.push(imgObj)
        this.uploadResponsImg = imgList
      })
        },
     afterReadOrder() { //下方文件上传
       //console.log('文件列表为',this.imgFileList)


     },
        deleteImg(index) {
            this.imgFileList.splice(index,1)
        },
        handleDeleteFile(index){
          this.uploadResponsImg.splice(index,1)
        },
      getOrderDetail() {
         //console.log('orderid',this.$route.params.id)
         let workId = localStorage.getItem('workId')
    this.$http({
      url: this.$http.adornUrl(`/work/workSheet/info/${workId}`),
      method: 'get',
      params: this.$http.adornParams({
      })
    }).then(({data}) => {
      console.log('/work/workSheet/info data', data,this);
      if(data && data.code === 0){
      let timelimit = ""
      let imgList = []
      let fileList = []
      //console.log('处置工单数据data',data)
      if(data.data.status == "-1") {
          this.orderIsCancel = true
      }
      this.order.status = data.data.status
      this.order.workModuleString = data.data.workModuleString
      this.order.name  = data.data.name
      this.order.workPropertyString = data.data.workPropertyString
      this.order.handleTarget = data.data.handleTarget
      this.order.workPlace = data.data.workPlace
      this.order.gmtCreate = data.data.gmtCreate
      this.order.endDate = data.data.endDate
      this.order = data.data;
     this.lookShow = data.data.workModule != null && data.data.handleTagetId != null && data.data.workModuleEntity != null && data.data.workModuleEntity.pageUrl != null? true: false
       this.bussid = data.data.handleTagetId
      this.routerTo = data.data.workModuleEntity.pageUrl != null? data.data.workModuleEntity.pageUrl.split('#')[1]: ''
      if(data.data.isEndtime == '0'){
        timelimit = '无限制'
      }
      if(data.data.isEndtime !== '0') {
          if(data.data.endDate != null) {
             timelimit = timelimit + data.data.endDate
          }
          if(data.data.endTime != null) {
            timelimit = timelimit + data.data.endTime
          }
      }
      this.order.timelimit = timelimit
      this.order.remark = data.data.remark
      data.data.documentList.forEach((item) => {
          if(item.url.search('png')!=-1||item.url.search('jpg')!=-1||item.url.search('PNG')!=-1||item.url.search('JPG')!=-1){
          // if(/(.png|.jpg|.PNG|.JPG)$/.test(item.url)){
            imgList.push(item)
          }else {
            fileList.push(item)
          }
      })
      this.imgList = imgList
      this.fileList = fileList
      this.allContactorList = data.data.allContactorList
      this.departmentName = data.data.mailGroupName
      this.workId = data.data.id
      let imgProcessList = []
      let fileHandleList = []
      let audioList = [];
      let videoList = [];
             data.data.handleResponseEntities.forEach((item) => {
               if(item.documentList !== null) {
               item.documentList.forEach((item2) => {
                    if(item2.url.search('png')!=-1||item2.url.search('jpg')!=-1||item2.url.search('PNG')!=-1||item2.url.search('JPG')!=-1){
                    //  if(/(.png|.jpg|.PNG|.JPG)$/.test(item2.url)) {
                         imgProcessList.push(item2)
                     }
                      else if(/(cd|ogg|mp3|asf|wma|wav|rm|real|ape|module|midi|vqf|amr|m4a)$/i.test(item2.url)){
                         audioList.push(item2)
                     }
                     else if(/(mp4|rmvb|flv|mpeg|avi|mov)$/i.test(item2.url)){
                         videoList.push(item2)
                     }
                     else {
                         fileHandleList.push(item2)
                     }
               })
               item.imgProcessList = imgProcessList
               item.fileHandleList = fileHandleList
               item.audioList = audioList;
               item.videoList = videoList;
               }else {
                 item.imgProcessList = []
                 item.fileHandleList = []
                 item.audioList = [];
                item.videoList = [];
               }
               
               imgProcessList =  []
               fileHandleList = []
               audioList = [];
                videoList = [];
             })
      this.handleResponseEntities = data.data.handleResponseEntities.reverse();
      
      this.allContactorList = data.data.allContactorList
      this.allContactorList.forEach((item) => {
           if(item.id == this.userId && (item.type == '5'||item.type == '6'||item.type == '7')) {
            // 参与人 2
            // 村/社区负责人 5
            // 部门科室负责人 6
            // 包村领导 7
            // 镇领导 8
                 this.handlerShowButton = true
                 this.joinerShowContent = true
                 this.responseShow = true
                 this.userInfo = item;
           }else if (item.id == this.userId && item.type == "2" && this.orderIsCancel == false) {
                this.joinerShowContent = true
                this.responseShow = true
           }else if(item.contactorId == this.userId && item.type == "2" && this.orderIsCancel == true) {
                this.joinerShowContent = false
           }else if(item.contactorId == this.userId && item.type == '7') {
             this.joinerShowContent = true
             this.examineVisible = true;
             this.userInfo = item;
           }else {
               this.responseShow = false
           }

            if(item.contactorId == this.userId) {
              localStorage.setItem("forwarderId",item.id);
              if((item.type == '5'||item.type == '6') && item.isSign==1) {
                this.transferOrderButtonShow = true
              }else {
                this.transferOrderButtonShow = false
              }
              if(item.type == '5'||item.type == '6') {
                this.returnPartsBtnShow = true
              }else {
                this.returnPartsBtnShow = false
              }
              if((item.type == '5'||item.type == '6'||item.type == '1') && item.isSign==0) {
                this.signForBtnShow = true
              }else {
                this.signForBtnShow = false
              }
              if(( ((item.type == "5"||item.type == "6")&&(this.order.status=='0')&& item.isSign==1) || (item.type == "7"&&(this.order.status == "4"||this.order.status == "0")) || (item.type == "8"&&(this.order.status == "4"||this.order.status == "0"||this.order.status == "5")) )) {
                this.urgeBtnShow = true
              }else {
                this.urgeBtnShow = false
              }
            }
      })



    }

    })
      
    },
    getLocation() {
      let that = this;
      var geolocation = new BMap.Geolocation();
      geolocation.getCurrentPosition(function(r){
        // if(that.getStatus() == BMAP_STATUS_SUCCESS){

        that.longitude = r.point.lng;
        that.latitude = r.point.lat;
          console.log('您的位置：'+r.point.lng+','+r.point.lat);
          // that.$http({
          //   url: that.$http.adornUrl(`/investigation/instanceInfor/getAdressFromTencent?lat=${r.point.lat}&lng=${r.point.lng}`),
          //   method: 'get',
          // }).then(({ data })=>{
          //   //console.log("/investigation/instanceInfor/getAdressFromTencent",data)
          //   if(data.code !== 0) {
          //     that.$dialog.alert({
          //       message: '获取位置信息失败请重试',
          //     })
          //     return
          //   }
          //   that.address = data.address

          // })

          var myGeo = new BMap.Geocoder();      
          // 根据坐标得到地址描述    
          myGeo.getLocation(new BMap.Point(that.longitude, that.latitude), function(result){      
              if (result){      
                console.log('根据坐标得到地址描述 result',result)
                that.address = result.address
                // alert(result.address);      
              }      
          });

        // }
      })

    },
    handleUpdateStatus(handleType='') {
      let that = this;

            let responseType
            let workSheetStatus
            if(handleType.search('退件')!=-1) {
              responseType = 4
              workSheetStatus = 2
            } else if(handleType.search('签收')!=-1) {
              responseType = 5
              workSheetStatus = 0
            }

            that.$http({
              url: that.$http.adornUrl(`/work/workHandleResponse/wechatUpdateStatusBQJ`),
              method: 'post',
              data: that.$http.adornData({
                  "workPlace": that.address,
                  "longitude": that.longitude,
                  "latitude": that.latitude,
                  "responseType": responseType, //4.已退件，5.已签收
                  "workId": localStorage.getItem('workId'),
                  "handleResponseId":0,
                  "documentList": [],
                  "workSheetStatus": workSheetStatus,   //2.已退件，0.已签收
                  "returnDescription": that.returnPartsRemark,
                  'type': that.allContactorList.filter(item=>{return item.contactorId == that.userId})[0].type,
                  'contactorId': that.userId
            }) }).then(({data}) => {
              if(data.code == 0) {
                that.$dialog.alert({
                  message: `${handleType}成功`,
                })
                that.getOrderDetail();
              } else {
                that.$dialog.alert({
                  message: `${handleType}失败`,
                })
              }
            });

    },
    handleTime(endDate='') {
      let time = new Date(endDate.replace(/-/g,'/')).valueOf()-new Date().valueOf();

      if(time>0) {
        let day = Math.floor(time/1000/60/60/24);
        let hour = Math.floor(time/1000/60/60%24);
        let min = Math.floor(time/1000/60%60);
        console.log('day hour min',day,hour,min)
        return `${day}天${hour}时${min}分`
      } else {
        return '已超时'
      }
    },
    handleUrge() {
      this.overlayVisible = true;
      this.$http({
        url: this.$http.adornUrl(`/event/eventinfo/sendMessage`),
        method: 'post',
        data: this.$http.adornData({
          eventDescription: this.order.name,
          flagType: this.order.contactorId,
          id: this.order.id,
          urgeDescription: "", // 短信的一部分内容，先传空把
          urgeType: 1, //写死，传1 
          workPlace: this.order.workPlace //当前地址
      }) }).then(({data}) => {
        console.log(`/event/eventinfo/sendMessage data`,data)
        if(data.code == 0) {
          this.getOrderDetail();
          this.$dialog.alert({
            message: `催办成功`,
          })
          this.overlayVisible = false;
        } else {
          this.$dialog.alert({
            message: `催办失败`,
          })
        }
      })
    },
    getContactorType(value) {
      let type;
      switch(value) {
        case "1":
          type = '处置人';break;
        case "2":
          type = '参与人';break;
        case "3":
          type = '抄送人';break;
        case "5":
          type = '村/社区负责人';break;
        case "6":
          type = '部门科室负责人';break;
        case "7":
          type = '包村领导';break;
        case "8":
          type = '镇领导';break;
        default :
          break;
      }
      return type;
    },
    getApprovalProgressList(){
      this.Orderstate == 'approvalProgress';
      this.approvalProgressVisible = true;
      this.$http({
        url: this.$http.adornUrl(`/work/workSheetRxamine/list`),
        method: 'post',
        data: this.$http.adornData({
          workId: this.workId
        }) 
      }).then(({data}) => {
        console.log(`/work/workSheetRxamine/list data`,data)
        if(data.code == 0) {
          this.approvalProgressList = data.data;
        } else {
          this.$dialog.alert({
            message: data.msg,
          })
        }
      })
    },
    handleAddIconClick() {
      if(this.functionPanelVisible) {
        this.$refs['van-field'].focus();
      } else {
        this.functionPanelVisible = true;
      }
    },
    handleImgPreview(value) {
      ImagePreview([value]);
    },
    handleImgUpload() {
      this.$refs.imgUpload.click();
    },
    async handleImgUploadChange() {
      let file = this.$refs.imgUpload.files[0];
      let fileSize = parseFloat(parseInt(file.size) / 1024 / 1024).toFixed(2);
      console.log('压缩前图片大小',fileSize);
      if (fileSize > 2) {
        file = await this.compressImage(file);
        fileSize = parseFloat(parseInt(file.size) / 1024 / 1024).toFixed(2);
        console.log('压缩后图片大小',fileSize);
      }
      let formData = new FormData();  
      formData.append("file", file)
      formData.append("address", this.address)

      this.lastPercentTime = Date.now();
      this.lastPercent = 0;
      this.$http({
        url: this.$http.adornUrl('/upload/passImgWithLogo'),
        method: 'post',
        data: formData,
        headers: {
          "content-type": "multipart/form-data"
        },
        onUploadProgress: (progressEvent) => {
          if (progressEvent.lengthComputable) {
            let percent =  ((progressEvent.loaded / progressEvent.total) * 100) | 0;
            
            let currentPercent = percent - this.lastPercent;
            this.lastPercent = percent;
            let duration = (Date.now() - this.lastPercentTime) / 1000;
            this.lastPercentTime = Date.now();
            let size = file.size * (currentPercent/100)/1024/1024; //  图片大小5M
            let speed = (size / duration).toFixed(2);
            console.log(speed + "mb/s当前网速 ");

            Toast.loading({
              duration: 0, // 持续展示 toast
              forbidClick: true,
              message: `上传中${percent}%,当前网速${speed}mb/s`,
            });
          }
        }
      }).then(({data}) => {
        console.log('/upload/passImgWithLogo data',data)
        
        if(data.code==0) {
          Toast.clear();
          this.$dialog.alert({
            message: '图片上传成功',
          })
          this.uploadResponsImg.push(data.data);
        }
      })

    },
    compressImage(file) {
      let that = this;
      return new Promise((resolve, reject) => {
        var reader = new FileReader();
        reader.readAsDataURL(file);
        // 缩放图片需要的canvas
        var canvas = document.createElement('canvas');
        var context = canvas.getContext('2d');
        reader.onload=function (e) {
          var content = e.target.result; //图片的src，base64格式
          var img = new Image();
          img.src = content;
          img.onload = function (){ //图片加载完毕
            let width = Math.floor(this.width / 2);
            let height = Math.floor(this.height / 2);
            canvas.setAttribute('width', width);
            canvas.setAttribute('height', height);
            // 清除画布
            context.clearRect(0, 0, width, height);
            // 图片压缩
            context.drawImage(this, 0, 0, width, height);
            /*第一个参数是创建的img对象；第二个参数是左上角坐标，后面两个是画布区域宽高*/
            //压缩后的图片base64 url
            /*canvas.toDataURL(mimeType, qualityArgument),mimeType 默认值是'image/jpeg';
             * qualityArgument表示导出的图片质量，只要导出为jpg和webp格式的时候此参数才有效果，默认值是0.92*/
            var dataURL = canvas.toDataURL(file.type||"image/jpeg", 0.2);//base64 格式
            // let blob = that.dataURItoBlob(dataURL,file.name);
            let newFile = that.dataURItoBlob(dataURL,file.name);
            resolve(newFile);
          }
        };
      });
    },
    dataURItoBlob(dataurl,filename) {
       var arr = dataurl.split(',');
        var mime = arr[0].match(/:(.*?);/)[1];
        var bstr = atob(arr[1]);
        var n = bstr.length;
        var u8arr = new Uint8Array(n);
        while(n--){
          u8arr[n] = bstr.charCodeAt(n);
        }
        //发现ios11不支持new File()
        // let newFile = new File([u8arr], filename, {
        //   type: mime || "image/jpeg"
        // });
        // return newFile;
        function blobToFile(Blob, fileName) {
          Blob.lastModifiedDate = new Date();
          Blob.name = fileName;
          return Blob;
        }
        let blob = new Blob([u8arr], {type:mime || "image/jpeg"});
        let file = blobToFile(blob, "fileName");
        return file;
    },
    handleFileUpload(value){
      Notify({ type: 'primary', message: '请录制10s以内视频' });
      this.$refs[value].click();
    },
    handleFileUploadChange(e){
      
      
      console.log("this.$refs[e.target.dataset.set].files",this.$refs[e.target.dataset.set].files[0]);
      let file = this.$refs[e.target.dataset.set].files[0];
      console.log('压缩前视频大小',file.size);
      let url = URL.createObjectURL(file);
      var audioElement = new Audio(url);

      audioElement.addEventListener('loadedmetadata', () => {
          console.dir(audioElement);

          if(audioElement.duration>10) {
            alert('请录制10s以内视频');
            return ;
          }else {
            this.compressVideo(file);
            // Toast.loading({
            //   duration: 0, // 持续展示 toast
            //   forbidClick: true,
            //   message: '上传中',
            // });
          }
      })
      
    },
    handleCallPhone(index) {
      this.$refs.callPhone[index].click();
    },
    initWebsocket() {
      this.lockReconnect = false; //避免重复连接
      var sock = new SockJS(window.SERSVER_WEBSOCKET);
      this.stompClient = Stomp.over(sock); // 获取 STOMP 子协议的客户端对象
      this.stompClient.connect(
        {
          Authorization: "",
        }, 
        (frame)=>{
          console.log("连接成功：frame", frame);
          this.lockReconnect = true;
          this.stompClient.subscribe(
            `/platform/${localStorage.getItem('platformId')}/message`,
            (msg) => {
              console.log(`订阅/platform/${localStorage.getItem('platformId')}/message msg`, msg);
              msg = JSON.parse(msg.body);
              if(msg.msgType == 11111123) {
                this.getOrderDetail();
              }
            })
        }, (frame)=>{
          console.log("连接失败 frame", frame);
          this.reconnctWS();
        }
      );
      this.stompClient.ws.onclose = (error)=>{
        //console.log("关闭连接")
        console.log(error)
        // this.reconnctWS(); //重连
      }
       
    },
    reconnctWS() {
      if (this.lockReconnect) return;
      setTimeout(() => {
        this.initWebsocket()
      }, 5000);
    },//播放语音
    openRecording(_url, index) {
      console.log('openRecording url', _url);
      let vm = this
      if (vm.playRec !== null) {
        vm.stopPlayVoice()
      }
      vm.playRec = new BenzAMRRecorder()
      //⚠️注意跨域问题
      vm.playRec.initWithUrl(_url).then(function() {
        vm.voiceActive = index
        vm.playRec.play();
        console.log('录音开始播放');
        vm.playRec.onEnded(function() {
          vm.voiceActive = null;
          console.log('录音播放结束');
        })
      }).catch((e) => {
        console.log(e);
        vm.$message.error('播放录音失败')
      })
    },
    //停止播放
    stopPlayVoice() {
      if (this.playRec.isPlaying()) {
        this.playRec.stop()
      }
    },
    handleVoiceRecordStart() {
      this.beginTimeDate = new Date().getTime();
      this.subTitleText = '松开结束录音';
      if(this.voiceInterval) {
        clearInterval(this.voiceInterval);
      }
      wx.startRecord({
        cancel: function () {
          alert('用户拒绝授权录音');
          return;
        }
      });
      this.voiceInterval = window.setInterval(()=>{
        this.mainTitleText = `00:${this.countDownTime}`;
        if(this.countDownTime == 0) {
          clearInterval(this.voiceInterval);
        }
        this.countDownTime = this.countDownTime-1;
      },1000);
    },
    handleVoiceRecordEnd() {
      this.endTimeDate = new Date().getTime();
      const differTime = this.endTimeDate - this.beginTimeDate;
      this.subTitleText = '请录制1分钟以内录音';
      clearInterval(this.voiceInterval);
      if(differTime < 1000 ){
        alert('录音时间太短，请重新录制');
      }else{
        let that = this;
        setTimeout(function () {
          //停止录音
          wx.stopRecord({
            success: function (res) {
              console.log('录音成功res',res);
              that.voice.localId = res.localId;
              //上传录音
              that.uploadVoice();
            },
            fail: function (res) {
              console.log('录音出错了res',res);
              that.mainTitleText = res.errMsg;
            }
          });
      
        }, 800);
      }
    },
    uploadVoice() {
      let that = this;
      wx.uploadVoice({
        localId: that.voice.localId,
        success: function (res) {
          that.voice.serverId = res.serverId;
          console.log('wx.uploadVoice', res,that.voice);
          //上传到服务器
          that.$http({
            url: that.$http.adornUrl(`/wechatReport/uploadVoice?mediaId=${that.voice.serverId}`),
            method: 'post',
          }).then(({data}) => {
            console.log('/wechatReport/uploadVoice data', data);
            that.uploadResponsImg.push({
              // allUrl: that.$window.SERSVER_BASE_HOME+data.fileName,
              url: data.fileName,
              name: data.fileName,
            });
            that.voice.serverId = res.serverId;
            that.handleCloseVoiceRecordPanel();
            that.functionPanelVisible=true;
          }).catch(()=>{
            alert("录音结束，时长超过1分钟!");
          });

        }
      });
    },
    handleCloseVoiceRecordPanel() {
      console.log('handleCloseVoiceRecordPanel');
      this.countDownTime = 59;
      this.mainTitleText = '按住录音';
      this.subTitleText = '请录制1分钟以内录音';
      clearInterval(this.voiceInterval);
      this.voiceRecordVisible = false;
    },
    initJSDK() {
      let url = encodeURIComponent(location.href.split('#')[0]);

      this.$http({
        url: this.$http.adornUrl('/wechatReport/jsJdkIndex'),
        method: 'get',
        params: this.$http.adornParams({
          url: url
        })
      }).then(({data}) => {
        console.log("/wechatReport/jsJdkIndex data", data);

        wx.config({
          debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
          appId: data.appId, // 必填，公众号的唯一标识
          timestamp: data.timestamp, // 必填，生成签名的时间戳
          nonceStr: data.nonceStr, // 必填，生成签名的随机串
          signature: data.signature,// 必填，签名，见附录1
          jsApiList: [
            'translateVoice',
            'startRecord',
            'stopRecord',
            'onRecordEnd',
            'playVoice',
            'pauseVoice',
            'stopVoice',
            'uploadVoice',
            'downloadVoice',
            'chooseImage',
            'previewImage',
            'uploadImage',
            'downloadImage'
          ]
        });
      })      
  
    },
    compressVideo(file) {
      // const { createFFmpeg, fetchFile } = FFmpeg;
      // const ffmpeg = createFFmpeg({
      //   log: true,
      //   progress: ({ ratio }) => {
      //     Toast.loading({
      //       duration: 0, // 持续展示 toast
      //       forbidClick: true,
      //       message: `上传中: ${(ratio * 100.0).toFixed(2)}%`,
      //     });
      //   },
      // });
      // const transcode = async (file) => {
      //   const { name } = file;
      //   console.log('正在加载 ffmpeg-core.js',ffmpeg.load);
      //   await ffmpeg.load();
      //   console.log('开始压缩');
      //   ffmpeg.FS('writeFile', name, await fetchFile(file));
      //   // '-b','2000000'  值越小  压缩率越大
      //   await ffmpeg.run('-i', name,'-b','2000000','order.mp4');
      //   console.log('压缩完成');
      //   const data = ffmpeg.FS('readFile', 'order.mp4');
      //   file = new File([new Blob([data.buffer])], 'order.mp4', {type: 'video/mov'});
      //   console.log('压缩后视频大小',file.size);
      //   this.handleUploadVideo(file);
      // }
      // transcode(file);

      // const { createWorker } = FFmpeg;
      // const worker = createWorker();

      // const transcode = async (file) => {
      //   const { name } = file;
        
      //   console.log('worker file',worker,file);
      //   await worker.load();
      //   Toast.loading({
      //     duration: 0, // 持续展示 toast
      //     forbidClick: true,
      //     message: `上传中`,
      //   });
      //   await worker.write(name,file);
      //   await worker.transcode(name,'output.mp4');
      //   const {data} = await worker.read('output.mp4');
      //   file = new File([new Blob([data.buffer])], 'output.mp4', {type: 'video/mov'});
      //   console.log('压缩后视频大小',file.size);
      //   this.handleUploadVideo(file);
      // }
      // transcode(file);
      this.handleUploadVideo(file);
    },
    handleUploadVideo(file) {
      this.lastPercentTime = Date.now();
      this.lastPercent = 0;
      let formData = new FormData();
      formData.append("file", file);
      this.$http({
        url: this.$http.adornUrl('/upload/emergencyHandleProcessFile'),
        method: 'post',
        data: formData,
        headers: {
          "content-type": "multipart/form-data"
        },
        onUploadProgress: (progressEvent) => {
          if (progressEvent.lengthComputable) {
            let percent =  ((progressEvent.loaded / progressEvent.total) * 100) | 0;
            
            let currentPercent = percent - this.lastPercent;
            this.lastPercent = percent;
            let duration = (Date.now() - this.lastPercentTime) / 1000;
            this.lastPercentTime = Date.now();
            let size = file.size * (currentPercent/100)/1024/1024; //  图片大小5M
            let speed = (size / duration).toFixed(2);
            console.log(speed + "mb/s当前网速 ");

            Toast.loading({
              duration: 0, // 持续展示 toast
              forbidClick: true,
              message: `上传中${percent}%,当前网速${speed}mb/s`,
            });
          }
        }
      }).then(({data}) => {
        console.log('/upload/emergencyHandleProcessFile data',data)
        
        if(data.code==0) {
          Toast.clear();
          this.$dialog.alert({
            message: '文件上传成功',
          })
          this.uploadResponsImg.push(data.data);
        }
      })
    }
  },
  computed: {
    ...mapGetters([
      'location'
    ])
  },
  components: {
    imagePreview,
    Loading
  }
}
</script>
<style lang="less" scoped>
   .gray {
      font-size: 3.7vw;
      color: #999999;

   }
  .orderdetail {
    background-color: #F5F5F5;
  .orderdetailheader {
      display: flex;
      justify-content: space-around;
      height: 7.5vh;
      line-height: 7.5vh;
      font-size: 3.7vw;
      color: #666666;
      background-color: #ffffff;
    .ordermessagetitle {
      font-size:0.28rem;
      font-family:PingFangSC-Regular,PingFang SC;
      font-weight:400;
      color:rgba(102,102,102,1);
      &.messageActive {
        border-bottom: 0.3vh solid #0091FF;
        font-size:0.28rem;
        font-family:PingFangSC-Semibold,PingFang SC;
        font-weight:600;
        color:rgba(51,51,51,1);
      }

    }

    .handleordertitle {
      font-size:0.28rem;
      font-family:PingFangSC-Regular,PingFang SC;
      font-weight:400;
      color:rgba(102,102,102,1);
      &.messageActive {
        border-bottom: 0.3vh solid #0091FF;
         border-bottom: 0.3vh solid #0091FF;
        font-size:0.28rem;
        font-family:PingFangSC-Semibold,PingFang SC;
        font-weight:600;
        color:rgba(51,51,51,1);
      }

    }
  }

  .orderdetailcontainer {
      // background-color: #ffffff;
      width: 94.7vw;
      margin: 1.5vh 2.7vw;
      position: relative;
    .ordermessagecontainer {
      padding-bottom: 1.95vh;
      background-color: #ffffff;
      .basemessagetitle {
        height: 8.4vh;
        line-height: 8.4vh;
        // font-size: 4.3vw;
        // color: #333333;
        margin-left: 5vw;
        font-size:0.32rem;
        font-family:PingFangSC-Medium,PingFang SC;
        font-weight:1000;
        color:rgba(51,51,51,1);

      }

      .detailcontent {
          width: 84vw;
          border-top: 0.075vh solid #DDDDDD;
          margin-left: 5.3vw;
          .lookWrapper {
            /deep/ .van-cell {
              padding-top: 0!important;
            }
          }
          /deep/ .van-cell {
            padding-top: 0;
             padding-left: 0;
             &:nth-child(1) {
               padding-top: 2vh;
             }
             &::after {
               border-bottom: 0;
             }
          }
          /deep/ .van-cell__value {
            margin-left: 5.3vw;
          }
          .appendix {
            width: 7.5vw;
            font-size: 3.7vw;
            color: #999999;
            height: 3.0vh;
          }
          .picturecontainer {
            display: flex;
            margin-top: 1.2vh;
            flex-wrap: wrap;
            img {
              width: 39.7vw;
              height: 13.2vh;
              &:nth-child(2) {
                margin-left: 2.7vw;
              }
            }
          }
          .linka {
            // height: 1.4vh;
            a {
              font-size: 3.7vw;
              color: #0091FF;
            }
          }
          img.tel {
            width: 0.4rem;
            height: 0.4rem;
            margin-top: -0.2rem;
          }
      }
      .statusPictureWrapper{
      img {
        position: absolute;
        top: 0;
        right: 0;
        width: 10.67vw;
        height: 6vh;

      }
      img {
        position: absolute;
        top: 0;
        right: 0;
        width: 10.67vw;
        height: 6vh;
      }
      img {
        position: absolute;
        top: 0;
        right: 0;
        width: 10.67vw;
        height: 6vh;
      }
      }
    }

    .orderhandlepeople {
      background-color: #ffffff;
      width:  94.7vw;
      // margin: 1.5vh 2.7vw;
      margin-top: 1.5vh;
      .orderhandlepersoncontainer {
        // height: 8.4vh;
        display: flex;
        justify-content: space-between;
        color: #333333;
        .orderhandleperson {
          height: 8.4vh;
          width: 41vw;
          line-height: 8.4vh;
          // font-size: 4.3vw;
          margin-left: 5.1vw;
          font-size:0.32rem;
          font-family:PingFangSC-Medium,PingFang SC;
          font-weight:1000;
          color:rgba(51,51,51,1);
        }

        .handledepartment {
          height: 100%;
          // width: 29.9vw;
          line-height: 8.4vh;
          // font-size: 3.7vw;
          margin-right: 5.3vw;
          font-size:0.28rem;
          font-family:PingFangSC-Regular,PingFang SC;
          font-weight:400;
          color:rgba(51,51,51,1);
        }
      }
      .handlepersondetailcontainer {
        width: 84vw;
        margin-left: 5.3vw;
        margin-right: 5.3vw;
        border-top: 0.07vh solid #DDDDDD;
      .hanlepersondetail {
        display: flex;
        height: 5.5vh;
        align-items: center;
        // line-height: 5.25vh;
        img.personavatar {
            width: 3.84vw;
            height: 2.3vh;
        }

        .personname {
          width: 1.6rem;
          height: 3.0vh;
          margin-left: 0.7vw;
          // color: #333333;
          // font-size: 3.7vw;
          font-size:0.28rem;
          font-family:PingFangSC-Regular,PingFang SC;
          font-weight:400;
          color:rgba(51,51,51,1);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .career {
          white-space: nowrap;
          padding: 0rem 0.2rem;
          height: 3.0vh;
          // margin-left: 0.7vw;
          // margin-left: 2.7vw;
          margin-right: 0.3rem;
          border-radius: 2.1vw;
          line-height: 3.0vh;
          text-align: center;
          // background-color: rgba(22,200,139,0.08);;
          font-size:0.2rem;
          font-family:PingFangSC-Medium,PingFang SC;
          font-weight:500;
          color:rgba(153,153,153,1);
          // font-size: 2.7vw;
          // color: #16C88B;
          background:rgba(240,240,240,1);
          &.isleader {
            color:rgba(22,200,139,1);
            background:rgba(22,200,139,0.08);
          }
          &.isjoiner {
            color:rgba(0,145,255,1);
            background:rgba(22,141,200,0.08);
          }
        }

        .addressdetail {
          width: 39.2vw;
          height: 3.0vh;
          // font-size: 3.7vw;
          // color: #666666;
          // margin-left: 5.5vw;
          font-size:0.28rem;
          font-family:PingFangSC-Regular,PingFang SC;
          font-weight:400;
          color:rgba(102,102,102,1);

        }

        img.tel {
          width: 0.4rem;
          height: 0.4rem;
          // margin-left: 0.5rem;
        }
      }
      }
    }
    .btn-panel {
      font-size: 0.4rem;
      display: flex;
      margin-top: 2vh;
    }
    .sendorder {
      margin-top: 1.5vh;
      width: 85.3vw;
      height: 6.74vh;
      border-radius: 6vw;
      background-color: #65BCFF;
      text-align: center;
      line-height: 6.74vh;
      margin-left: 4.3vw;
      font-size:0.4rem;
      font-family:PingFangSC-Regular,PingFang SC;
      font-weight:400;
      color:rgba(255,255,255,1);

    }
    .return-parts-btn {
      width: 50%;
      background: #E8F2FC;
      height: 6vh;
      line-height: 6vh;
      text-align: center;
      color: #0091FF;
    }
    .sign-for-btn {
      // width: 50%;
      // background: #0091FF;
      // height: 6vh;
      // line-height: 6vh;
      // text-align: center;
      // color: #FFFFFF;

      margin-top: 1.5vh;
      width: 85.3vw;
      height: 6.74vh;
      border-radius: 6vw;
      background-color: #65BCFF;
      text-align: center;
      line-height: 6.74vh;
      margin-left: 4.3vw;
      font-size:0.4rem;
      font-family:PingFangSC-Regular,PingFang SC;
      font-weight:400;
      color:rgba(255,255,255,1);
    }
  }
  .submitHandleMessageJoiner {
  .orderdetailheader {
      display: flex;
      justify-content: space-around;
      height: 7.5vh;
      line-height: 7.5vh;
      font-size: 3.7vw;
      color: #666666;
      background-color: #ffffff;
    .ordermessagetitle {

    }

    .handleordertitle {

    }
  }

  .handlecontent {
     height: 75.5vh;
     position: relative;
    // overflow: scroll;
    .handleorderdetail {
      background-color: #F5F5F5;
    .persontalk {
      .sender {
          display: flex;
          margin: 2.0vh 2.7vw 4.04vh 5.3vw;
        .content {
            width: 79.5vw;
            // height: 38.7vh;
            background-color: #C5DEFE;
            border-top-left-radius: 4vw;
            border-top-right-radius: 1vw;
            border-bottom-right-radius: 4vw;
            border-bottom-left-radius: 4vw;
            
          .contenttop {
              border-left: 0.3vw solid #DAD7D7;
              margin-left: 1.9vw;
              margin-top: 1.4vh;
            .contenttopheader {
                display: flex;
                margin-bottom: 1.3vh;
                // justify-content: sapce-between;
                position: relative;
              span.circleblack {
                  font-size: 2.7vw;
                  color: #999999;
                  margin-top: 0.6vh;
                  margin-left: 1.9vw;

              }

              .handleordertitle {
                  // width: 18.7vw;
                  height: 3.0vh;
                  // font-size: 3.7vw;
                  color: #999999;
                //   margin-top: 1.3vh;
                  margin-left: 0.93vw;
                  font-size:0.28rem;
                  font-family:PingFangSC-Medium,PingFang SC;
                  font-weight:1000;
                  color:rgba(153,153,153,1);
              }
              .perName {
                font-size:0.28rem;
                font-family:PingFangSC-Medium,PingFang SC;
                font-weight:1000;
                color:rgba(153,153,153,1);
                margin-left: 0.9vw;

              }
              .starttime {
                  // width: 27.6vw;
                  height: 2.5vh;
                  font-size: 3.2vw;
                  color: #999999;
                  margin-left: 38.6vw;
                  // float: right;
                  margin-top: 0.3vh;
                  position: absolute;
                  right: 4vw;
                  top: 0.3vh;

              }
            }
            .personname {
              font-size: 2vw;
              color:#999999;
              margin-left: 3vw;
            }
            .handleresult {
                height: 2.25vh;
                margin-left: 2.9vw;
                // font-size: 2.9vw;
                // color: #999999;
                font-size:0.22rem;
                font-family:PingFangSC-Regular,PingFang SC;
                font-weight:400;
                color:rgba(153,153,153,1);

            }

            
          }

          .contentbottom {
              width: 72vw;
              border-top: 0.15vh solid #DAD7D7;
              margin-top: 1.3vh;
              margin-left: 3.2vw;
              padding-top: 1.12vh;
            .contentbottomheader {
                display: flex;
                // justify-content: space-between;
                flex-direction: row-reverse;
              .responseordertitle {
                  height: 2.5vh;
                  font-size: 3.2vw;
                  color: #666666;
              }

              .responsetime {
                  height: 2.5vh;
                  font-size: 3.2vw;
                  color: #999999; 
              }
            }

            .responseresult {
                margin-top: 1.2vh;
                // font-size: 2.1vw;
                color: #333333;
                font-size:0.28rem;
                font-family:PingFangSC-Regular,PingFang SC;
                font-weight:400;
                color:rgba(51,51,51,1);
                margin-left: 1vw;

            }
            .handlepiccontainer {
                margin-top: 1.7vh;
                display: flex;
              img {
                width: 23.6vw;
                height: 8.8vh;
                margin-left: 1.9vw;
              }
            }

            .addresscontainer {
                margin-top: 1.9vh;
                display: flex;
                justify-content: space-between;
                align-items: center;
              .address {
                  height: 2.6vh;
                  font-size: 3.2vw; 
                  color: #999999;
                  flex: 7;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  display: -webkit-box;
                  line-height: 2.6vh;    
                  max-height: 2.6vh;
                  -webkit-line-clamp: 1;
                  -webkit-box-orient: vertical;
                span.addressicon {
                    width: 2.316vw;
                    height: 1.6vh;
                    font-size: 2.316vw;
                    color: #CCCCCC;

                }
              }

              .responsebutton {
                  height: 2.1vh;
                  // color: #0091FF;
                  // font-size: 3.7vw;
                  margin-bottom: 3vh;
                  flex: 1;
                  margin-bottom: 3vh;
                  font-size:0.28rem;
                  font-family:PingFangSC-Regular,PingFang SC;
                  font-weight:400;
                  color:rgba(0,145,255,1);
                  &.responseStyle {
                    display: none;
                  }

              }
            }

            .audio-wrap {
              margin: 0rem auto 4vw auto;
              position: relative;
            }

            .video-wrap {
              margin-right: 6vw;
              margin-bottom: 4vw;
              position: relative;
              video {
                width: 270px;
                height: 200px;
              }
              &:nth-of-type(2n) {
                margin-right: 0;
              }
            }

          }
          .myOrderResponse {
            .addresscontainer {
                margin-top: 1.9vh;
                display: flex;
                justify-content: space-between;
              .address {
                  height: 2.6vh;
                  font-size: 3.2vw; 
                  color: #999999;
                span.addressicon {
                    width: 2.316vw;
                    height: 1.6vh;
                    font-size: 2.316vw;
                    color: #CCCCCC;

                }
              }

              .responsebutton {
                  height: 2.1vh;
                  color: #0091FF;
                  font-size: 3.7vw;
                  margin-bottom: 3vh;
                  &.responseStyle {
                    display: none;
                  }

              }
            }

          }
        }

        .handleperson {
            width: 9.9vw;
            height: 5.5vh;
            background-color: #0BD295;
            // font-size: 3.7vw;
            // color: #FFFFFF;
            text-align: center;
            line-height: 5.5vh;
            border-radius: 50%;
            margin-left: 2.7vw;
            font-size:0.28rem;
            font-family:PingFangSC-Regular,PingFang SC;
            font-weight:400;
            color:rgba(255,255,255,1);
            
        }
      }

      .receiver {
          display: flex;
          margin-top: 2vh;
        .leader {
             width: 9.9vw;
            height: 5.5vh;
            border-radius: 50%;
            // font-size: 3.7vw;
            text-align: center;
            line-height: 5.5vh;
            color: #ffffff;
            background-color: #0091FF;
            margin-left: 2.7vw;
            margin-right: 2.7vw;
            font-size:0.28rem;
            font-family:PingFangSC-Regular,PingFang SC;
            font-weight:400;
            color:rgba(255,255,255,1);
          .leadericon {

          }
        }

        .content {
            width: 79.5vw;
            background-color: #ffffff;
            border-top-left-radius: 1.5vw;
            border-top-right-radius: 5.9vw;
            border-bottom-right-radius: 5.9vw;
            border-bottom-left-radius: 5.9vw;
          .contenttop {
              margin-top: 1.3vh;
              margin-left: 1.5vw;
              border-left: 0.3vw solid #F0F0F0;
            .contenttopheader {
                display: flex;
                margin-bottom: 1.3vh;
                position: relative;
                // justify-content: space-between;
              span.circleblack {
                  font-size: 2.7vw;
                  color: #999999;
                  margin-top: .8vh;
                  margin-left: 2.3vw;

              }

              .handleordertitle {
                //   margin-top: 1.3vh;
                  font-size: 3.7vw;
                  color: #999999;
                  margin-left: 0.9vw;
                  font-size:0.28rem;
                  font-family:PingFangSC-Medium,PingFang SC;
                  font-weight:1000;
                  color:rgba(153,153,153,1);

              }
              .perName {
                font-size:0.28rem;
                font-family:PingFangSC-Medium,PingFang SC;
                font-weight:1000;
                color:rgba(153,153,153,1);
                margin-left: 0.9vw;
              }
              .starttime {
                  height: 2.5vh;
                  margin-left: 38.6vw;
                  margin-top: .3vh;
                  font-size: 3.2vw;
                  color: #999999;
                  // float: right;
                  position: absolute;
                 right: 4vw;
                  top: 0.3vh;

              }
            }
            .personname {
              font-size: 2vw;
              color:#999999;
              margin-left: 3vw;
            }
            .handleresult {
                margin-top: 0.75vh;
                // font-size: 2.9vw;
                // color: #999999;
                margin-left: 2.9vw;
                font-size:0.22rem;
                font-family:PingFangSC-Regular,PingFang SC;
                font-weight:400;
                color:rgba(153,153,153,1);
            }

           
          }

          .contentbottom {
              width: 72vw;
              margin-left: 2.8vw;
              border-top: 0.15vh solid #F0F0F0;
            .contentbottomheader {
                display: flex;
                // justify-content: space-between;
                padding-top: 1.04vh;
                flex-direction: row-reverse;
              .responseordertitle {
                  font-size: 3.2vw;
                  color: #666666;

              }

              .responsetime {
                  font-size: 3.2vw;
                  color:#999999;

              }
            }

            .responseresult {
                margin-top: 0.97vh;
                // font-size: 3.7vw;
                color: #333333;
                font-size:0.28rem;
                font-family:PingFangSC-Regular,PingFang SC;
                font-weight:400;
                color:rgba(51,51,51,1);
                margin-left: 1vw;

            }
            .handlepiccontainer {
                margin-top: 1.7vh;
                display: flex;
              img {
                width: 23.6vw;
                height: 8.8vh;
                margin-left: 1.9vw;
              }
            }
             .addresscontainer {
                margin-top: 1.9vh;
                display: flex;
                justify-content: space-between;
              .address {
                  height: 2.6vh;
                  font-size: 3.2vw; 
                  color: #999999;
                  flex: 7;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  display: -webkit-box;
                  line-height: 2.6vh;    
                  max-height: 2.6vh;
                  -webkit-line-clamp: 1;
                  -webkit-box-orient: vertical;
                span.addressicon {
                    width: 2.316vw;
                    height: 1.6vh;
                    font-size: 2.316vw;
                    color: #CCCCCC;

                }
              }

              .responsebutton {
                  flex: 1;
                  height: 2.1vh;
                  // color: #0091FF;
                  // font-size: 3.7vw;
                  margin-bottom: 3vh;
                  font-size:0.28rem;
                  font-family:PingFangSC-Regular,PingFang SC;
                  font-weight:400;
                  color:rgba(0,145,255,1);
                  &.responseStyle {
                    display: none;
                  }

              }
            }
          }
          .myOrderResponse {
            .addresscontainer {
                margin-top: 1.9vh;
                display: flex;
                justify-content: space-between;
              .address {
                  height: 2.6vh;
                  font-size: 3.2vw; 
                  color: #999999;
                span.addressicon {
                    width: 2.316vw;
                    height: 1.6vh;
                    font-size: 2.316vw;
                    color: #CCCCCC;

                }
              }

              .responsebutton {
                  height: 2.1vh;
                  color: #0091FF;
                  font-size: 3.7vw;
                  margin-bottom: 3vh;
                  &.responseStyle {
                    display: none;
                  }

              }
            }

          }
        }
      }
    }
  }

  }

  .handleProcess {
      // border-top: 0.005vh solid #747474;
      border-top: 0.02rem solid #EEEEEE;
      position: fixed;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: rgba(236,242,242,1);
      .permission-button-panel {
          // margin-top: 3vh;
          padding: 0.2rem 0rem;
          display: flex;
          // position: absolute;
          // bottom: 2vh;
          .button {
              width: 18vw;
              height: 4.27vh;
              border-radius: 5.83vw;
              border: 0.1vh solid #666;
              text-align: center;
              line-height: 4.27vh;
              padding: 0.6vh 1.73vw;
              margin-left: 2vw;
               font-size:0.28rem;
              font-family:PingFangSC-Regular,PingFang SC;
              font-weight:400;
              color:rgba(153,153,153,1);
              // color: #FFF;
              // background-color: #0091FF;
              &.messageActive {
                 border: 0.2vh solid #0091FF;
                 color: #0091FF;

              }
          }
          .disabled {
            background: #d7d0d0;
            color: #FFF;
          }
      }
      .permission-response-button-panel {
          //  display: flex;
          //  margin-top: 1.5vh;
          //  margin-left: 1.87vw;
           padding: 15px 0rem 1.5vh 1.87vw;
           .alreadyhandle {
             background-color: #FFFCFC;
              color: #333333;
              font-size: 3.73vw;
              text-align: center;
              line-height: 4.95vh;
              height: 4.95vh;
              width: 28vw;
              margin-left: 1.33vw;
              border-radius: 8vw;
              &.handleing {
              background-color: #0091FF;
              color: #FFFFFF;
              font-size: 3.73vw;
              text-align: center;
              line-height: 4.95vh;
              height: 4.95vh;
              width: 28vw;
              margin-left: 1.33vw;
              border-radius: 8vw;
            }
           }

         .alreadyhandle {
             background-color: #FFFCFC;
              // color: #333333;
              // font-size: 3.73vw;
              text-align: center;
              line-height: 4.95vh;
              height: 4.95vh;
              width: 28vw;
              margin-left: 1.33vw;
              border-radius: 8vw;
              font-size:0.28rem;
              font-family:PingFangSC-Regular,PingFang SC;
              font-weight:400;
              color:rgba(51,51,51,1);
              &.handleing {
              background-color: #0091FF;
              // color: #FFFFFF;
              // font-size: 3.73vw;
              text-align: center;
              line-height: 4.95vh;
              height: 4.95vh;
              width: 28vw;
              margin-left: 1.33vw;
              border-radius: 8vw;
              font-size:0.28rem;
              font-family:PingFangSC-Regular,PingFang SC;
              font-weight:400;
              color:rgba(255,255,255,1);
            }
           }
        }
    .handlecontact {
      display: flex;
      justify-content: space-evenly;
      align-items: center;
    //   height: 7.12vh;
      
      padding: 1.2vh 1.3vw 1.2vh 1.3vw;
      background-color: rgba(236,242,242,1);
      display: flex;
      .inputborder {
          width: 73.87vw;
          height: 9.67vh;
          border-radius: 4.3vw; 
          background-color: #ffffff;
     textarea.contacttalk {
         width: 80%;
         margin-left: 4.3vw ;
         margin-top: 0.67vh;
         height: 86%;
         border: none;
         overflow: hidden;
         font-size: 4.3vw;
           &::placeholder {
               font-size: 4.3vw;
               color: #CCCCCC;
           }

            }
      }
     .van-uploader {
      /deep/ .van-uploader__preview {
          display: none;
        
      
     }
     /deep/ .van-uploader__input-wrapper {
       .pic {
          // width: 7.6vw;
          // height: 4.3vh;
          font-size: 9vw;
          margin-left: 0.93vw;
          margin-right: 0.86vw;
          margin-top: 3vh; 
      }
     }
     }

     .submitbutton {
         &.clickStyle {
           opacity: .2;
         }
         margin-top: 3.8vh; 
         width: 12.7vw;
         height: 4.7vh;
         border-radius: 5vw ;
         background-color: #028eff;
        //  color: #FFFFFF;
        //  font-size: 4.3vw;
         text-align: center;
         line-height: 4.7vh;
        //  opacity:0.39;
         font-size:0.32rem;
          font-family:PingFangSC-Regular,PingFang SC;
          font-weight:400;
          color:rgba(255,255,255,1);
        //  position: fixed;
        //  right: 50px;
        //  top: 304px;


        }

      .custom-input {
        width: 5.33rem;
        height: 0.68rem;
        padding: 0px 16px;
        /deep/ .van-field__control {
          height: 0.68rem;
        }
      }
      .submit-button {
        &.clickStyle {
           opacity: .2;
         }
        width: 0.95rem;
        height: 0.63rem;
        line-height: 0.63rem;
        text-align: center;
        background: #0091FF;
        border-radius: 0.08rem;
        font-size: 14px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #FFFFFF;
        border: none;
        padding: 0rem;
        &.disabled {
          background: #d7d0d0;
          color: #FFF;
        }
      }
  }

    .showChooseImg {
        margin-top: 1.95vh;
        margin-left: 2.93vw;
        display: flex;
      .imgContainer {
          display: flex;
          position: relative;
          width: 20.33vw;
          height: 11.43vh;
          margin-left: 3vw;
        img {
            width: 20.33vw;
            height: 11.43vh;
            // margin-left: 2.53vw;

        }

        .deletex {
          position: absolute;
          right: -2.4vw;
          top:-0.93vh;
          width: 5.87vw;
          height: 3.3vh;
        }
      }
    }
    .function-panel {
      width: 100%;
      box-sizing: border-box;
      padding: 0.35rem 0.5rem 0rem 0.5rem;
      border-top: 0.02rem solid #e1dfdf;
      display: flex;
      flex-wrap: wrap;
      height: 0rem;
      overflow-y: auto;
      transition: all 0.5s;
      &.function-panel-active {
        height: 3.6rem;
      }
      &>.img-wrap {
        margin-right: 6vw;
        margin-bottom: 4vw;
        position: relative;
        img {
          width: 17vw;
          height: 17vw;
          margin-right: 2vw;
        }
        .van-icon-clear {
          position: absolute;
          right: -10%;
          top: -10%;
        }
        &:nth-of-type(4n) {
          margin-right: 0;
        }
      }
      &>.video-wrap {
        margin-right: 6vw;
        margin-bottom: 4vw;
        position: relative;
        video {
          width: 270px;
          height: 200px;
        }
        .van-icon-clear {
          position: absolute;
          right: -5%;
          top: -4%;
        }
        &:nth-of-type(2n) {
          margin-right: 0;
        }
      }
      .audio-wrap {
        margin: 0rem auto 4vw auto;
        position: relative;
        .van-icon-clear {
          position: absolute;
          right: -3%;
          top: -10%;
        }
      }
      .panel-box {
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        &>div {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-right: 8vw;
          margin-bottom: 4vw;
          &:nth-of-type(4n) {
            margin-right: 0;
          }
          .function-panel-icon {
            padding: 4.5vw;
            background: #FFFFFF;
            border-radius: 0.08rem;
            border: 0.01rem solid #EDEDED;
          }
          label {
            font-size: 10px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #333333;
            margin-top: 0.06rem;
          }
        }
      }
    }
  }
}

/deep/ .van-dialog {
   text-align: center;
}

  
}

.voice-record-panel {
    padding: 36px 0px 50px 0px;
    box-sizing: border-box;
    text-align: center;
    &>h1 {
      color: rgba(0,145,255,1);
      font-weight: initial;
    }
    &>p {
      font-size: 12px;
    }
    .sound-record-button {
      display: inline-block;
      width: 50px;
      height: 50px;
      background: url(~@/assets/img/soundRecord.png) no-repeat;
      background-size: 100% 100%;
      margin-top: 30px;
    }
  }
</style>