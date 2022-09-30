<!--
 * @Author: yaoweixin
 * @Date: 2020-09-16 20:12:29
 * @LastEditors: yaoweixin
 * @LastEditTime: 2020-12-22 17:07:25
 * @Description: 考勤打卡更新
 * @FilePath: \vue-cli-multiPage-master\src\pages\garbageClassification\WorkAttendanceNew.vue
-->
<template>
  <div class="workAttendanceNew">
    <div class="navHeader">
      <van-tabs
        v-model="activeName"
        class="itemWrapper"
        @click="clickTab"
        color="#0091FF"
      >
        <div v-for="(limitItem, limitIndex) in limitList" :key="limitIndex">
          <!-- 基本信息 -->
          <van-tab
            title="基本信息"
            name="a"
            class="basicMessage"
            v-if="limitItem.menuCode == 'JBXX'"
          >
            <div class="messageContainer">
              <div class="headerTitle">{{ classifyName }}</div>
              <div class="pointStatus">
                <div class="statusTitle">分类点状态</div>
                <div class="status" v-if="Community.status == '1'">正常</div>
                <div class="yellowstatus" v-else-if="Community.status == '2'">
                  黄牌
                </div>
                <div class="redstatus" v-else-if="Community.status == '3'">
                  红牌
                </div>
                <div class="rejectstatus" v-else-if="Community.status == '4'">
                  拒收
                </div>
                <div class="punishstatus" v-else-if="Community.status == '5'">责令整改</div>
                <div class="punishstatus2" v-else-if="Community.status == '6'">行政处罚</div>
              </div>
              <div class="imgWrapper">
                <img
                  v-for="(imgItem, imgIndex) in Community.imgList"
                  :key="imgIndex"
                  :src="imgItem.allUrl"
                  alt=""
                  @click="showPreviewImage(imgItem.allUrl)"
                />
              </div>
              <div class="topContentWrapper">
              <div class="communityContainer">
                <div class="communityTitle">所属社区：</div>
                <div class="communityName">{{ Community.communityName }}</div>
              </div>
              <div class="villageContainer">
                <div class="villageTitle">城中村/小区：</div>
                <div class="village">{{ Community.villageName }}</div>
              </div>
              <div class="villageCharacter">
                <div class="villageCharacterTitle">小区性质：</div>
                <div class="character" v-if="Community.villageCharacter == '1'">
                  物业小区
                </div>
                <div
                  class="character"
                  v-else-if="Community.villageCharacter == '2'"
                >
                  非物业小区
                </div>
                <div class="character" v-else>商城投放点</div>
              </div>
              <div class="delegateParty">
                <div class="delegateTitle">守桶人员委派方:</div>
                <div
                  class="delegateMember"
                  v-if="Community.delegateMember == '1'"
                >
                  物业
                </div>
                <div
                  class="delegateMember"
                  v-else-if="Community.delegateMember == '2'"
                >
                  环卫
                </div>
              </div>
              <div class="throwTime">
                <div class="throwTitle">投放时间：</div>
                <div class="throwTim">{{ trueThrowTime }}</div>
              </div>
              <div class="leaderContainer">
                <div class="leaderTitle">负责人：</div>
                <div class="personWrapper">
                <div class="leader">{{ Community.leader }}</div>
                <div class="phone">{{Community.phone ? '('+ Community.phone + ')' : ''}}</div>
                <a :href="'tel:' + Community.phone">
                <img src="~@/assets/img/personPhone.png" alt="">
                </a>
                </div>
              </div>
               <div class="leaderContainer">
                <div class="leaderTitle">联系人：</div>
                <div class="personWrapper" v-if="Community.mailContactorEntity != null">
                <div class="leader">{{ Community.mailContactorEntity.name }}</div>
                <div class="phone">{{Community.mailContactorEntity.mobile1 ? '('+ Community.mailContactorEntity.mobile1 + ')' : ''}}</div>
                <a :href="'tel:' + Community.mailContactorEntity.mobile1">
                <img src="~@/assets/img/personPhone.png" alt="">
                </a>
                </div>
              </div>
              </div>
              <div class="bottomContentWrapper">
              <div class="removeBarrelContainer">
                <div class="removeBarrelTitle">撤桶次数：</div>
                <div class="removeBarrelPercent">
                  {{ Community.removeBarrelTimes }}
                </div>
              </div>
              <div class="removeBarrelContainer">
                <div class="removeBarrelTitle">撤桶率：</div>
                <div class="removeBarrelPercent">
                  {{ Community.removeBarrelPercent*100}}%
                </div>
              </div>
              <div class="keepClean">
                <div class="cleanTitle">保洁次数：</div>
                <div class="cleanTimes">{{ Community.cleanTimes }}</div>
              </div>
              <div class="rubbishRecycleContainer">
                <div class="rubbishRecycleTitle">生活垃圾回收利用率：</div>
                <div class="recyclePercent">{{ Community.recyclePercent*100}}%</div>
              </div>
              <div class="otherRubbishContainer">
                <div class="otherTitle">其他垃圾减量率：</div>
                <div class="rubbishDecreasePercent">
                  {{ Community.otherRubbishDecreasePercent*100}}%
                </div>
              </div>
              <div class="yellowContainer">
                <div class="yellowTitle">黄牌次数：</div>
                <div class="yellowTimes">{{ Community.yellowTimes }}</div>
              </div>
              <div class="redContainer">
                <div class="redTitle">红牌次数：</div>
                <div class="redTimes">{{ Community.redTimes }}</div>
              </div>
              <div class="refuseContainer">
                <div class="refuseTitle">拒收拒运次数：</div>
                <div class="refuseTimes">{{ Community.refuseTimes }}</div>
              </div>
              <div class="changeContainer">
                <div class="changeTitle">责令整改：</div>
                <div class="change">{{ Community.change }}</div>
              </div>
              <div class="punishContainer">
                <div class="punishTitle">行政处罚：</div>
                <div class="punishContent">{{ Community.punishContent }}</div>
              </div>
              <div class="checkContainer">
                <div class="checkTitle">巡查次数：</div>
                <div class="checkTimes">{{ Community.checkTimes }}</div>
              </div>
              <div class="projectAbnormalContainer">
                <div class="abnormalTitle">检查项目异常次数：</div>
                <div class="abnormalTimes">{{ Community.abnormalTimes }}</div>
              </div>
              </div>
              <!-- </div> -->
              <img v-if="Community.launchType == '1'" src="~@/assets/img/place.png" alt="" />
              <img v-if="Community.launchType == '2'" src="~@/assets/img/errorTimePlace.png" alt="">
              <van-picker
                title="处置登记"
                show-toolbar
                :columns="columns"
                @confirm="onConfirm"
                @cancel="onCancel"
                v-show="showHandle"
                cancel-button-text="X"
                confirm-button-text="确定"
              />
            </div>
            <div class="recordContainer" v-if="existRecord">
            <div
                v-for="(rItem, rIndex) in limitList"
                :key="rIndex"
              >
                <div
                  class="recordSlide"
                  v-if="rItem.menuCode == 'KQJL'"
                  @click="linkBasicRecord('1')"
                >
                  考勤记录
                </div>
                <div
                  class="recordSlide"
                  v-if="rItem.menuCode == 'BJJL'"
                  @click="linkBasicRecord('2')"
                >
                  保洁记录
                </div>
                <div
                  class="recordSlide"
                  v-if="rItem.menuCode == 'CTJL'"
                  @click="linkBasicRecord('3')"
                >
                  撤桶记录
                </div>
                <div
                  class="recordSlide"
                  v-if="rItem.menuCode == 'XCJL'"
                  @click="linkBasicRecord('4')"
                >
                  巡查记录
                </div>
                <div
                  class="recordSlide"
                  v-if="rItem.menuCode == 'CZJL'"
                  @click="linkBasicRecord('5')"
                >
                  处置记录
                </div>
              </div>
            </div>
              <!-- <div v-for="(limItem,limIndex) in limitList" :key="limIndex"> -->
              <div class="buttonWrapper" v-if="showHandleRegisterButton">
              <div
                class="handleRegisterButton"
                @click="showHandle = true"
                v-if="showHandleRegisterButton"
              >
                处置登记
              </div>
              </div>
              <!-- <div class="buttonWrapper">
              <div class="handleRegisterButton" @click="showHandle = true">处置登记</div>
              </div> -->
            <!-- 处置登记的弹框 -->
            <van-popup
              v-model="handleRegisterShow"
              position="bottom"
              round
            >
              <div class="headerWrapper">
                  <img src="~@/assets/img/backUp.png" alt="" @click="backUpBefore">
                  <div class="headerTitle">{{ handleRegisterHeader }}</div>
                  <div class="confirmText" @click="confirmHandleRegisterDebounce">确定</div>
              </div>
              <div class="takePictureWrapper">
                <div class="dialogHeader">上传照片</div>
                <van-uploader
                  v-model="handleRegisterFileList"
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
              <div class="optional">
                <div class="optionalTitleRemark">备注:</div>
                <!-- <input type="text" v-model="handleRegisterRemark" /> -->
                <textarea name="" id="" cols="30" rows="10" v-model="handleRegisterRemark" placeholder="请在此输入备注（选填）"></textarea>
              </div>
              <!-- <div class="confirmClockIn" @click="confirmHandleRegister">
                确定
              </div> -->
            </van-popup>
          </van-tab>
          <!-- 考勤打卡 -->
          <van-tab
            title="考勤打卡"
            name="b"
            class="attendanceWrapper"
            v-if="limitItem.menuCode == 'KQDK'"
          >
            <div class="attendanceClockIn">
              <!-- 人员信息 -->
              <div class="personContainer">
                <div class="personMessageWrapper">
                  <img :src="personObj.imgList[0].allUrl" alt class="personAvatar"  @click="showPreviewImage(personObj.imgList[0].allUrl)"/>
                  <div class="personWrapper">
                    <div class="personNameWrapper">
                      <div class="personName">{{ personObj.name }}</div>
                      <div class="isPartyMember" v-if="personObj.isParty == 1">
                        （党员）
                      </div>
                    </div>
                    <div class="place">{{ personObj.unit }}</div>
                  </div>
                </div>
                <div class="attendanceRecord" @click="enterAttendanceRecord()">
                  考勤记录
                </div>
                <!-- <img src="~@/assets/img/add.png" alt class="statusImg" /> -->
              </div>
              <div class="clockInContainer">
                <div class="attendanceTime">
                  <img src="~@/assets/img/leftContainer.png" alt="" class="beforeTime">
                  <div class="timeWrapper">
                      本班次考勤时间：{{ classStartTime }}~{{ classEndTime }}
                  </div>
                  <img src="~@/assets/img/rightContainer.png" alt="" class="afterTime">
                </div>
                <div class="attendanceClockInContainer">
                  <div
                    class="ClockInSlide"
                    v-for="(cItem, cIndex) in classClockList"
                    :key="cIndex"
                  >
                    <div class="trueIcon">
                      <img src="~@/assets/img/success.png" alt />
                    </div>
                    <div class="clockInTitle" v-if="cItem.type == '1'">
                      {{ cItem.punchclockTime.split(' ')[1] }}签到打卡
                    </div>
                    <div class="clockInTitle" v-if="cItem.type == '2'">
                      {{ cItem.punchclockTime.split(' ')[1] }}离岗打卡
                    </div>
                    <div class="clockInTitle" v-if="cItem.type == '3'">
                      {{ cItem.punchclockTime.split(' ')[1] }}更新签到打卡
                    </div>
                    <div class="clockInTitle" v-if="cItem.type == '4'">
                      {{ cItem.punchclockTime.split(' ')[1] }}更新离岗打卡
                    </div>
                    <div class="clockInTitle" v-if="cItem.type == '0'">
                      {{ cItem.punchclockTime.split(' ')[1] }}缺勤
                    </div>
                  </div>
                  <div class="refreshAttendanceSlide" v-if="isRefreshExist">
                    <!-- <div class="refreshIcon">
                      <img src alt />
                    </div> -->
                    <div class="refreshTitle" @click="openRefreshDialog">更新打卡</div>
                  </div>
                </div>
                <!-- 准许打卡 -->
                <div
                  class="InOfCompass"
                 v-if="
                    clockObj.type == '1' &&
                    clockObj.canPunchClock 
                  "
                >
                  <div class="InOfGlobal" @click="openAllowClockInDialog">
                    <div class="outOfTitle">打卡签到</div>
                    <div class="attendanceTime">{{ newDate }}</div>
                  </div>
                  <div class="locationWrapper">
                    <div class="locationIcon">
                      <img src="~@/assets/img/trueLocation.png" alt />
                    </div>
                    <div class="locationTitle">已进入考勤范围：{{clockAddress}}</div>
                  </div>
                </div>
                <!-- 离岗打卡 -->
                <div
                  class="leaveClockIn"
                  v-else-if="clockObj.type == '2' && clockObj.canPunchClock"
                >
                  <div class="leaveOfGlobal" @click="openLeaveDialog">
                    <div class="outOfTitle">离岗打卡</div>
                    <div class="attendanceTime2">{{ newDate }}</div>
                  </div>
                  <div class="locationWrapper">
                    <div class="locationIcon">
                      <img src="~@/assets/img/trueLocation.png"  alt />
                    </div>
                    <div class="locationTitle">已进入考勤范围：{{clockAddress}}</div>
                  </div>
                </div>
                <!-- 不准打卡 -->
                <div
                  class="outOfCompass"
                  v-else-if="clockObj.canPunchClock == false"
                >
                  <div class="outOfGlobal">
                    <div class="outOfTitle">无法打卡</div>
                    <div class="attendanceTime">{{ newDate }}</div>
                  </div>
                  <div class="locationWrapper">
                    <div class="locationIcon">
                      <img src="~@/assets/img/unLocation.png" alt />
                    </div>
                    <div class="locationTitle">未进入考勤范围：{{clockAddress}}</div>
                    <div class="refreshIcon" @click="refreshMyLocation">
                      <img src="~@/assets/img/refresh.png" alt />
                    </div>
                  </div>
                </div>
                <!-- 已打卡 -->
                <!-- <div
                  class="outOfCompass"
                  v-else-if="
                    clockObj.type == '1' &&
                    clockObj.canPunchClock &&
                    classClockList.length > 1
                  "
                >
                  <div class="outOfGlobal">
                    <div class="outOfTitle">已打卡</div>
                    <div class="attendanceTime">{{ newDate }}</div>
                  </div>
                  <div class="locationWrapper">
                    <div class="locationIcon">
                      <img src="~@/assets/img/unLocation.png" alt />
                    </div>
                    <div class="locationTitle">{{clockAddress}}</div>
                  </div>
                </div> -->
              </div>
              <!-- 底部上次考勤记录 -->
              <div
                v-for="(lastItem, lastIndex) in lastClassClockList"
                :key="lastIndex"
              >
                <div
                  class="bottomRecord"
                  v-if="lastItem.garbagePunchClockList != null && lastItem.orderNum == clockOrderNum-1"
                >
               <!-- <div
                  class="bottomRecord"
                  v-if="lastItem.garbagePunchClockList != null"
                > -->
                  <van-collapse v-model="lastRecord">
                    <van-collapse-item :name="lastIndex">
                      <template #title>
                        <div class="titleContainer">
                          <div class="lastTime">
                            上一班次考勤时间：{{ lastItem.startTime }}~{{
                              lastItem.endTime
                            }}
                          </div>
                          <div class="statusTitle">已打卡</div>
                        </div>
                      </template>
                      <div class="attendanceClockInContainer">
                        <!-- <div class="ClockInSlide">
                          <div class="trueIcon">
                            <img src="~@/assets/img/success.png" alt />
                          </div>
                          <div class="clockInTitle">07：15签到打卡</div>
                        </div> -->
                    <div
                    class="ClockInSlide"
                    v-for="(lItem, lIndex) in lastItem.garbagePunchClockList"
                    :key="lIndex"
                  >
                    <div class="trueIcon">
                      <img src="~@/assets/img/success.png" alt />
                    </div>
                    <div class="clockInTitle" v-if="lItem.type == '1'">
                      {{ lItem.punchclockTime.split(' ')[1] }}签到打卡
                    </div>
                    <div class="clockInTitle" v-if="lItem.type == '2'">
                      {{ lItem.punchclockTime.split(' ')[1] }}离岗打卡
                    </div>
                    <div class="clockInTitle" v-if="lItem.type == '3'">
                      {{ lItem.punchclockTime.split(' ')[1] }}更新签到打卡
                    </div>
                    <div class="clockInTitle" v-if="lItem.type == '4'">
                      {{ lItem.punchclockTime.split(' ')[1] }}更新离岗打卡
                    </div>
                    <div class="clockInTitle" v-if="lItem.type == '0'">
                      {{ lItem.punchclockTime.split(' ')[1] }}缺勤
                    </div>
                  </div>
                        <!-- <div class="refreshAttendanceSlide">
                          <div class="refreshIcon">
                            <img src alt />
                          </div>
                          <div class="refreshTitle">更新打卡</div>
                        </div> -->
                      </div>
                    </van-collapse-item>
                  </van-collapse>
                </div>
                <!-- 底部上次考勤记录未打卡 -->
                <div class="bottomkaoqRecordNotClock" v-else-if="lastItem.garbagePunchClockList == null && lastItem.orderNum == clockOrderNum-1">
                  <div class="titleContainer">
                    <div class="lastTime">
                      上一班次考勤时间：{{ lastItem.startTime }}~{{
                        lastItem.endTime
                      }}
                    </div>
                    <div class="statusTitle">未打卡</div>
                  </div>
                </div>
              </div>
              <!-- 签到打卡弹框 -->
              <van-popup v-model="show" position="bottom">
                <div class="titleWrapper">
                    <img src="~@/assets/img/closeDialog.png" alt="" @click="show = false">
                    <div class="dialogHeader">{{ clockInTitle }}</div>
                </div>
                <!-- <van-uploader
                  v-model="fileList"
                  multiple
                  :after-read="afterRead"
                  @delete="afterRead"
                >
                  <img src="~@/assets/img/Picture.svg" alt />
                </van-uploader> -->
            <div class="takePictureWrapper">
                <div class="dialogHeader">拍照签到<span style="color: #ff0000">*</span></div>
                <!-- <van-uploader
                  v-model="fileList"
                  multiple
                  :after-read="afterRead"
                  @delete="afterRead"
                >
                <div class="pictureWrapper">
                  <img src="~@/assets/img/Picture.svg" alt />
                  <div class="titleText">打开相机</div>
                </div>
                </van-uploader> -->
                <!-- 拍照上传组件 -->
                <fileUpload ref="picUpload" @getImgList="getImgList"></fileUpload>
            </div>
                <!-- <div class="optional">
                  <div class="optionalTitle">备注（选填）</div>
                  <input type="text" v-model="clockRemark" />
                </div> -->
            <div class="remarkContainer">
                <div class="remarkTitle">备注：</div>
                <textarea type="text" v-model="clockRemark" placeholder="请在此输入备注（选填）"></textarea>
            </div>
                <div class="confirmClockIn" @click="confirmMyClockDebounce">
                  确认打卡
                </div>
              </van-popup>
              <!-- 打卡成功弹框 -->
               <van-popup v-model="clockSuccessShow" position="bottom">
                 <div class="titleWrapper">
                    <div class="dialogHeader">{{ clockInTitle }}</div>
                 </div>
                 <div class="successImgWrapper">
                   <img src="~@/assets/img/clockSuccess.png" alt="">
                 </div>
                 <div class="successText">{{successTime}}&nbsp;{{ clockInTitle }}成功</div>
                 <div class="enterNextClock" v-if="clockInTitle == '离岗打卡'">进入下一班次考勤！</div>
                 <div class="confirmButton" @click="clockSuccessShow = false">确定</div>
               </van-popup>
              <!-- 打卡详情弹框 -->
              <van-popup
                v-model="clockInDetailShow"
                position="bottom"
                round
                closeable
              >
                <div class="headerTitle">打卡详情</div>
                <div class="clockInIcon">
                  <img src alt />
                </div>
                <div class="clockInTime">07:15更新打卡</div>
                <div class="imgContainer">
                  <img src="~@/assets/img/add.png" alt />
                  <img src="~@/assets/img/add.png" alt />
                </div>
                <div class="remarkContainer">
                  <div class="remarkTitle">备注</div>
                  <div class="remarkContent">无</div>
                </div>
              </van-popup>
            </div>
          </van-tab>
          <!-- 保洁登记 -->
          <van-tab
            title="保洁登记"
            name="c"
            class="cleaningRegisterWrapper"
            v-if="limitItem.menuCode == 'BJDJ'"
          >
            <div class="cleaningRegister">
              <div class="recordWrapper">
                <div class="recordTitle">
                  <div class="recordSlide"></div>
                  <div class="recordText">今日保洁记录</div>
                  </div>
                <div class="cleanTimes">
                  保洁次数：{{ cleanDetailArray.length }}
                </div>
              </div>
              <div class="CleanDetainWrapper">
                <div
                  class="cleanSlide"
                  v-for="(item, index) in cleanDetailArray"
                  :key="index"
                  @click="lookCleanDetail(item.id)"
                >
                  <div class="cleanTime">保洁时间：{{ item.withdrawTime }}</div>
                  <div class="cleaner">
                    保洁人员：{{ item.memberName }}
                    <img src="~@/assets/img/personPhone.png" alt="">
                  </div>
                  <img src="~@/assets/img/expand.png" alt="">
                </div>
              </div>
              <div class="recordWrapper2">
              <div class="addCleanRecord" @click="addCleanShow = true">
              添加保洁记录
              </div>
              <div
                class="historyCleanRecord"
                @click="linkCleanHistoryRecord"
              >
                历史保洁记录
              </div>
              </div>
              <!-- 添加保洁记录的弹框 -->
              <!-- <van-popup
                v-model="addCleanShow"
                position="bottom"
                round
                closeable
              >
                <div class="headerTitle">添加保洁记录</div>
                <div class="takePictureWrapper">
                  <div class="dialogHeader">拍照：</div>
                  <van-uploader
                    v-model="cleanFileList"
                    multiple
                    :after-read="afterRead"
                    @delete="afterRead"
                  >
                    <img src="~@/assets/img/Picture.svg" alt />
                  </van-uploader>
                </div>
                <div class="optional">
                  <div class="optionalTitleRemark">备注:</div>
                  <input type="text" v-model="cleanRemark" />

                </div>
                <div class="confirmClockIn" @click="confirmAddCleanRecord">
                  确定
                </div>
              </van-popup> -->
            <van-popup
              v-model="addCleanShow"
              position="bottom"
              round
            >
              <div class="headerWrapper">
                  <img src="~@/assets/img/closeDialog.png" alt="" @click="addCleanShow = false">
                  <div class="headerTitle">添加保洁记录</div>
                  <div class="confirmText" @click="confirmAddCleanRecordDebounce">确定</div>
              </div>
              <div class="takePictureWrapper">
                <div class="dialogHeader">上传照片<span style="color: #ff0000;">*</span></div>
                <van-uploader
                  v-model="cleanFileList"
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
              <div class="optional">
                <div class="optionalTitleRemark">备注:</div>
                <!-- <input type="text" v-model="handleRegisterRemark" /> -->
                <textarea name="" id="" cols="30" rows="3" v-model="cleanRemark" placeholder="请在此输入备注（选填）"></textarea>
              </div>
              <!-- <div class="confirmClockIn" @click="confirmHandleRegister">
                确定
              </div> -->
            </van-popup>
              <!-- 查看保洁详情的弹框 -->
              <van-popup v-model="cleaningDetailShow" round position="bottom">
                <div class="headerWrapper">
                  <img src="~@/assets/img/closeDialog.png" alt="" @click="cleaningDetailShow = false">
                  <div class="headerTitle">保洁详情</div>
              </div>
                <div class="cleanDetail">
                  <div class="cleanTime">
                    保洁时间：{{ singleClean.withdrawTime }}
                  </div>
                  <div class="cleaner">
                    保洁人员：{{ singleClean.memberName }}
                  </div>
                </div>
                <div class="imgWrapper">
                  <div class="takePicTitle">拍照：</div>
                  <div class="imgContainer">
                    <img
                      v-for="(item, index) in singleClean.imgList"
                      :key="index"
                      :src="item.allUrl"
                      alt=""
                      @click="showPreviewImage(item.allUrl)"
                    />
                  </div>
                </div>
                <div class="remarkContainer">
                  <div class="remark">备注：</div>
                  <div class="remarkContent">{{ singleClean.remark }}</div>
                </div>
              </van-popup>
            </div>
          </van-tab>
          <van-tab
            title="撤桶登记"
            name="d"
            class="removeBarrelWrapper"
            v-if="limitItem.menuCode == 'CTDJ'"
          >
            <div class="removeBarrelContainer">
              <div
                class="removeBarrelDetail"
                v-for="(item, index) in removeBarrelList"
                :key="index"
                @click="
                  lookRemoveBarrelDetail(
                    item.withdrawEntity.id,
                    item.status,
                    item.startTime,
                    item.endTime,
                    item.id
                  )
                "
              >
                <div class="removeBarrelSlide">
                  <img  v-if="item.status == '1'" src="~@/assets/img/waitRemove.png">
                
                  <img
                    v-else-if="item.status == '2'"
                    src="~@/assets/img/alreadyRemove.png"
                  >
            
                  <img  v-else src="~@/assets/img/unRemove.png">
                </div>
                <div class="removeBarrelClass">
                  撤桶班次：{{ item.startTime }}~{{ item.endTime }}
                </div>
              </div>
              <div
                class="removeBarrelHistoryRecordTitle"
                @click="linkRemoveBarrelHistoryRecord"
              >
                历史撤桶记录
                <img src="~@/assets/img/enterRemoveBarrelHistory.png" alt="">
              </div>
            </div>
            <div class="removeBarrelClassDialog">
              <van-popup
                v-model="confirmRemoveBarrelshow"
                round
                position="bottom"
              >
                <div class="removeBarrelClassTitle">
                  <img src="~@/assets/img/closeDialog.png" alt="" @click="confirmRemoveBarrelshow = false">
                  <div class="removeBarrelText">
                  撤桶班次：{{ removeBarrel.startTime }}~{{
                    removeBarrel.endTime
                  }}
                  </div>
                </div>
                <div
                  class="removeBarrelDetail"
                  v-if="confirmRemoveBarrel == false"
                >
                  <div class="removeBarrelMember">
                    撤桶人员：{{ removeBarrel.member }}
                  </div>
                  <div class="removeBarrelTime">
                    撤桶时间： {{ removeBarrel.time }}
                  </div>
                </div>
              <div class="addDecreaseContainer">
                <div class="restCook">
                  <div class="restTitle">餐余垃圾（桶）：</div>
                  <div class="barrelNumberContainer">
                    <div
                      class="decreaseButton"
                      @click.stop="decreaseBarrel('rest')"
                    >
                      -
                    </div>
                    <div class="dinnerRestNumber">
                      <!-- <input type="text" v-model="removeBarrel.dinnerNumber" inputmode="decimal"> -->
                      <van-field v-model="removeBarrel.dinnerNumber" type="number" center input-align="center"/>
                    </div>
                    <div class="increaseButton" @click="increaseBarrel('rest')">
                      +
                    </div>
                  </div>
                </div>
                <div class="restCook">
                  <div class="restTitle">其他垃圾（桶）：</div>
                  <div class="barrelNumberContainer">
                    <div
                      class="decreaseButton"
                      @click.stop="decreaseBarrel('other')"
                    >
                      -
                    </div>
                    <div class="dinnerRestNumber">
                      <!-- <input type="text" v-model="removeBarrel.otherNumber" inputmode="decimal"> -->
                      <van-field v-model="removeBarrel.otherNumber" type="number" center input-align="center"/>
                    </div>
                    <div
                      class="increaseButton"
                      @click="increaseBarrel('other')"
                    >
                      +
                    </div>
                  </div>
                </div>
                <div class="restCook">
                  <div class="restTitle">可回收垃圾（桶）：</div>
                  <div class="barrelNumberContainer">
                    <div
                      class="decreaseButton"
                      @click.stop="decreaseBarrel('recycle')"
                    >
                      -
                    </div>
                    <div class="dinnerRestNumber">
                      <!-- <input type="text" v-model="removeBarrel.recycleNumber" inputmode="decimal"> -->
                      <van-field v-model="removeBarrel.recycleNumber" type="number" center input-align="center"/>
                    </div>
                    <div
                      class="increaseButton"
                      @click="increaseBarrel('recycle')"
                    >
                      +
                    </div>
                  </div>
                </div>
                <div class="restCook">
                  <div class="restTitle">有害垃圾（桶）：</div>
                  <div class="barrelNumberContainer">
                    <div
                      class="decreaseButton"
                      @click.stop="decreaseBarrel('harm')"
                    >
                      -
                    </div>
                    <div class="dinnerRestNumber" contenteditable="true">
                      <!-- <input type="text" v-model="removeBarrel.harmNumber" inputmode="decimal"> -->
                      <van-field v-model="removeBarrel.harmNumber" type="number" center input-align="center"/>
                    </div>
                    <div class="increaseButton" @click="increaseBarrel('harm')">
                      +
                    </div>
                  </div>
                </div>
                <!-- <div class="classifyContainer">
                  <div class="classifyPrecise">分类准确率%：</div>
                  <div class="classifyContent">
                    <input
                      type="text"
                      v-model="removeBarrel.classifyPrecisePercent"
                    />
                  </div>
                </div> -->
                <div class="restCook">
                  <div class="restTitle">分类准确率%：</div>
                  <div class="barrelNumberContainer">
                    <div
                      class="decreaseButton"
                      @click.stop="decreaseBarrel('classify')"
                    >
                      -
                    </div>
                    <div class="dinnerRestNumber" contenteditable="true">
                      <!-- <input type="text" v-model="removeBarrel.classifyPrecisePercent" inputmode="decimal"> -->
                      <van-field v-model="removeBarrel.classifyPrecisePercent" type="number" center input-align="center"/>
                    </div>
                    <div class="increaseButton" @click="increaseBarrel('classify')">
                      +
                    </div>
                  </div>
                </div>
                <div class="isStickContainer">
                  <div class="title">是否有人守桶：</div>
                  <van-radio-group
                    v-model="removeBarrel.protectRadio"
                    direction="horizontal"
                  >
                    <van-radio name="1">是</van-radio>
                    <van-radio name="2">否</van-radio>
                  </van-radio-group>
                </div>
              </div>
                <!-- <div class="takePictureContainer">
                  <div class="takePicTitle">拍照：</div>
                  <van-uploader
                    v-model="removeFileList"
                    multiple
                    :after-read="afterRead"
                    @delete="afterRead"
                  >
                    <img src="~@/assets/img/Picture.svg" alt />
                  </van-uploader>
                </div> -->
              <div class="takePictureWrapper">
                <div class="dialogHeader">上传照片</div>
                <van-uploader
                  v-model="removeFileList"
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
                  <input type="text" v-model="removeBarrel.protectRemark" placeholder="请在此输入备注（选填）"/>
                </div>
                <div class="sumContainer">
                  <div class="sum">
                    <div class="sumTitle">总量：</div>
                    <div class="sumNumber">共{{ barrelSum }}桶</div>
                  </div>
                  <div
                    class="saveButton"
                    v-if="confirmRemoveBarrel == false"
                    @click="updateSaveBarrelDebounce"
                  >
                    保存修改
                  </div>
                  <div class="saveButton" v-else @click="confirmRemBarrelDebounce">
                    确认撤桶
                  </div>
                </div>
              </van-popup>
            </div>
          </van-tab>
          <!-- 巡查巡检 -->
          <van-tab
            title="巡查巡检"
            name="e"
            class="checkWrapper"
            v-if="limitItem.menuCode == 'XCXJ'"
          >
            <div
              class="check_wrapper_box"
              v-for="(item, index) in patrolInspection.investigationInforList"
              :key="index"
              @click.capture="patrolInspection.currentIndex = index"
            >
              <van-collapse v-model="patrolInspection.activeNames">
                <van-collapse-item :name="index">
                  <template #title>
                    <div>
                      {{ item.name }}
                      <img
                        v-if="patrolInspection.status[index] == '0'"
                        src="@/assets/img/abnormal.png"
                        alt=""
                      />
                      <img
                        v-else-if="patrolInspection.status[index] == '1'"
                        src="@/assets/img/normal.png"
                        alt=""
                      />
                      <img
                        v-else-if="patrolInspection.status[index] != '1' || '0'"
                        src="@/assets/img/noChecked.png"
                        alt=""
                      />
                    </div>
                  </template>
                  <div class="check_wrapper_box_bottom">
                    <div class="check_wrapper_box_bottom_content">
                      {{ item.content }}
                    </div>
                    <div class="check_wrapper_box_bottom_result">
                      <span>检查结果</span>
                      <div>
                        <i
                          @click="selectCheckResult('1', index)"
                          :class="
                            patrolInspection.checkResultIndex[index] == '1'
                              ? 'check_wrapper_box_bottom_green'
                              : ''
                          "
                          ><img
                            v-if="
                              patrolInspection.checkResultIndex[index] == '1'
                            "
                            src="@/assets/img/normalIcon.png"
                            alt=""
                          />正常</i
                        ><i
                          @click="selectCheckResult('0', index)"
                          :class="
                            patrolInspection.checkResultIndex[index] == '0'
                              ? 'check_wrapper_box_bottom_red'
                              : ''
                          "
                          ><img
                            v-if="
                              patrolInspection.checkResultIndex[index] == '0'
                            "
                            src="@/assets/img/abnormalIcon.png"
                            alt=""
                          />异常</i
                        >
                      </div>
                    </div>
                    <div
                      class="check_wrapper_box_bottom_notice"
                      v-if="patrolInspection.checkResultIndex[index] == '0'"
                    >
                      <span>通知负责人</span>
                      <div>
                        <van-radio-group
                          v-model="patrolInspection.advisePersonIndex[index]"
                          direction="horizontal"
                        >
                          <van-radio
                            @click="selectAdvisePerson('0', index)"
                            name="0"
                            >是</van-radio
                          >
                          <van-radio
                            @click="selectAdvisePerson('1', index)"
                            name="1"
                            >否</van-radio
                          >
                        </van-radio-group>
                      </div>
                    </div>
                    <div class="check_wrapper_box_bottom_photo">
                      <span
                        >拍照说明
                        <div class="check_wrapper_box_bottom_photo_upload">
                          <van-uploader
                            v-model="patrolInspection.fileList[index]"
                            @delete="inspectionDeleterRead"
                            :after-read="inspectionAfterRead"
                          >
                            <div class="uploadImage">
                              <span
                                ><img src="@/assets/img/camera.png" alt="" />
                                <div class="uploadImage_text">
                                  上传照片
                                </div></span
                              >
                            </div>
                          </van-uploader>
                        </div>
                        <div class="check_wrapper_box_bottom_photo_line"></div>
                      </span>
                    </div>
                    <div class="check_wrapper_box_bottom_remark">
                      <span>情况说明：</span>
                      <textarea
                        v-model="patrolInspection.remark[index]"
                        placeholder="请在此输入情况说明（选填）"
                      ></textarea>
                    </div>
                    <button @click="submitSingleCheck(index)">确认</button>
                  </div>
                </van-collapse-item>
              </van-collapse>
            </div>
            <div class="check_wrapper_margin"></div>
            <div class="check_wrapper_bottom">
              <div>
                <img src="@/assets/img/normalIcon.png" alt="" />
                正常：{{ patrolInspection.normal }}
                <img src="@/assets/img/abnormalIcon.png" alt="" />
                异常：{{ patrolInspection.abnormal }}
                <div
                  class="check_wrapper_bottom_history"
                  @click="goHistoryInspectionRecords"
                >
                  历史巡查记录
                </div>
              </div>
              <div class="check_wrapper_bottom_submit">
                <button @click="submitProject">提交</button>
              </div>
            </div>
          </van-tab>
        </div>
      </van-tabs>
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
import AMap from "AMap";
import imagePreview from "../gradeResponse/imagePreview";
import fileUpload from './fileUpload.vue';
export default {
  name: "workAttendanceNew",
  data() {
    return {
      cleanFlag: false,//保洁标志
      clockFlag: false,//考勤打卡标志
      handleFlag: false,
      removeBarrelFlag1: false,//待撤桶
      removeBarrelFlag2: false,//已撤桶
      timer: 0,//定时器
      isRefreshLeave: false,//是否是更新离岗打卡
      isRefreshExist: false,//控制更新打卡按钮是否显示
      enlargeImageUrl: [],//预览图片路径
      clockSuccessShow: false,//打卡成功弹框的显示与否
      successTime: '',//打卡成功时间
      capture:['camera'],//设置只能拍照的属性
      statusId: '',//选择的状态Id
      statusIndexArr: [],//处置登记状态id
      clockAddress: '',//考勤打卡地址
      clockOrderNum: 0,//考勤记录当前班次排序
      InspectionFileList: [], //巡查图片列表
      uploadFileList: [], //上传后返回来的图片列表
      handleRegisterShow: false, //控制处置登记弹框的显示与否
      handleRegisterRemark: "", //处置登记备注
      handleRegisterFileList: [], //处置登记上传图片
      handleRegisterHeader: "", //处置登记弹框标题
      alreadyId: 0, //修改撤桶id
      classId: 0, //班次id
      clockStatus: "", //1代表签到打卡2代表离岗打卡
      clockRemark: "", //打卡备注
      showHandleRegisterButton: false, //是否展示基本信息的处置登记按钮
      lastClassClockList: [], //上一班次所有考勤记录
      classClockList: [], //本班次考勤打卡记录
      clockObj: {
        //是否可以打卡
        type: "-1",
        // canPunchClock: false,
      },
      clockPlace: "", //考勤打卡地理位置
      classStartTime: "", //班次开始时间
      classEndTime: "", //班次结束时间
      newDate: "", //当前考勤时间
      removeFileList: [], //撤桶绑定得图片列表
      cleanRemark: "", //添加保洁记录备注
      imgList: [], //上传后得图片列表
      delectIndex: "", //被删除的位置的索引值
      tabMark: "", //标志点击那个tab
      cleanFileList: [], //保洁图片列表
      classifyId: 0, //分类点Id
      personObj: {}, //用户信息
      showHandle: false, //处置登记弹框
      limitList: [], //权限数组
      classifyName: "", //分类点名称
      lng: 0, //经度
      lat: 0, //纬度
      activeName: "a",
      activeNames: [], //初始化默认是否展示下拉的内容
      show: false, //打卡签到弹框的显示
      fileList: [], //上传图片的文件列表
      clockInDetailShow: false, //签到详情弹框是否展示
      clockInTitle: "签到打卡",
      cleanDetailArray: [], //今日保洁记录
      lastRecord: [], //初始化默认是否展示下拉的上一次打卡内容
      addCleanShow: false, //控制添加保洁记录弹框是否显示
      cleaningDetailShow: false, //控制查看保洁详情是否显示
      confirmRemoveBarrelshow: false, //控制确认撤桶弹框是否弹出

      classifyPrecisePercent: 0, //分类准确率
      dinnerNumber: 0, //餐余
      otherNumber: 0, //其他数目
      recycleNumber: 0, //可回收数目
      harmNumber: 0, //有害数目
      Community: {
        launchType: '0',//定时点或者误时点的标志
        status: 0, //状态
        communityName: "", //所属社区
        villageName: "", //小区
        villageCharacter: "", //小区性质
        delegateMember: "", //委派方
        throwTime: [], //投放时间
        leader: "小王", //负责人
        phone: '',//负责人联系电话
        removeBarrelTimes: 0, //撤桶次数
        removeBarrelPercent: 0, //撤桶率
        cleanTimes: 0, //保洁次数
        recyclePercent: 0, //生活垃圾回收利用率
        otherRubbishDecreasePercent: 0, //其他垃圾减量率
        yellowTimes: 0, //黄牌次数
        redTimes: 0, //红牌次数
        refuseTimes: 0, //拒收次数
        change: "改", //责令整改
        punishContent: "", //行政处罚
        checkTimes: 0, //巡检次数
        abnormalTimes: 0, //检查项目异常次数
        imgList: [], //图片列表
        mailContactorEntity: {},//联系人信息
      },
      columns: [],
      singleClean: {
        //单条保洁记录
        withdrawTime: "",
        remark: "",
        memberName: "",
        imgList: [],
      },
      removeBarrelList: [], //撤桶记录
      confirmRemoveBarrel: true, //是否是确认撤桶
      removeBarrel: {
        startTime: "", //班次开始时间
        endTime: "", //班次结束时间
        member: "", //撤桶人员
        time: "", //撤桶时间
        dinnerNumber: 0, //餐余
        otherNumber: 0, //其他
        recycleNumber: 0, //可回收
        harmNumber: 0, //有害
        classifyPrecisePercent: 0, //分类准确率
        protectRadio: "", //控制单选是否有人守桶
        protectFileList: [], //图片文件列表
        protectRemark: "", //备注
      },
      pictureList: [], //上传成功后返回的图片列表,
      removeBarrelId: 0, //撤桶单条记录的id
      //巡查巡检
      patrolInspection: {
        checkResultIndex: [], //检查结果
        currentIndex: "", //当前选中的索引值
        investigationInforList: [], //基本列表数据
        instanceInforList: [], //选择巡查巡检后获取到的列表数据
        resultList: [], //组合后的列表数据
        instanceId: "",
        remark: [], //说明
        longitude: "", //经度
        latitude: "", //纬度
        place: "", //位置
        imgList: [], //传入后台的图片数据
        advisePersonIndex: [], //是否通知负责人
        fileList: [], //上传图片的数据
        status: [], //状态值
        normal: 0, //正常值
        abnormal: 0, //异常值
        activeNames: [], //初始化默认是否展示下拉的内容
        storeArr:[], //存储中间数组
      },
      compressSize: 1, //压缩比例
    };
  },
  methods: {
    /**
     * @description: 拍照上传或者删除照片所触发的方法
     * @param {list} list:图片列表
     * @return {*}
     */
    getImgList(list) {
      //console.log('拍照后获得的图片为',list)
      this.imgList = list
    },
    /**
     * @description: 文件上传的公共方法
     * @param {*} uploadFileList:绑定的图片列表
     * @return {*}
     */
    zipAndUploadFile(uploadFileList,file) {
          var that = this
          var formData = new FormData();
          new Promise((resolve,reject) => {
            uploadFileList.forEach((v,index) => {
            //console.log('v',v)
            //console.log('上传的图片为',v.file)
          var content = v.content;
          var name = v.file.name;
          // 设置图片的压缩比例
          that.compressImg(v.file.size);
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
                formData.append("files", file1);
                if(index == uploadFileList.length -1) {
                  resolve(formData)
                }
              }else {
                formData.append("files", v.file);
                if(index == uploadFileList.length -1) {
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
     * @description: 显示放大的预览图
     * @param {String} imgurl 被点击的图片传递进来的图片路径
     * @return {}
     */
    showPreviewImage(imgurl) {
      this.enlargeImageUrl = [];
      this.enlargeImageUrl.push(imgurl);
      this.$refs.previewImage.previewShow = true;
    },
    //刷新打卡
    refreshMyLocation() {
      // this.newDate = new Date().toTimeString().split(" ")[0];
      this.getLocation();
    },
    /**
     * @description: 更新打卡
     * @param {} 
     * @return {} 
     */
    openRefreshDialog() {
      //更新签到打卡
        this.clockInTitle = "更新签到打卡";
        this.clockStatus = "3";
        this.show = true;
    },
    backUpBefore() {
      this.handleRegisterShow = false
      this.showHandle = true
    },
    /**
     * @description: 跳转到历史巡查记录
     * @param {}
     * @return {}
     */
    goHistoryInspectionRecords() {
      localStorage.setItem("activeRemark", "e"); //保存原来的tab栏
      this.$router.push({
        name: "historyInspectionRecord",
      });
    },
    /**
     * @description: 分类点基本信息页面跳转到各个记录
     * @param {type} params
     * @return {type}
     */
    linkBasicRecord(index) {
      if (index == "1") {
        //考勤记录
        this.$router.push("/attendanceHistoryRecord");
      } else if (index == "2") {
        //保洁记录
        this.$router.push("/cleanHistoryRecord");
      } else if (index == "3") {
        //撤桶记录
        this.$router.push("/removeBarrelHistoryRecord");
      } else if (index == "4") {
        //巡查记录
        this.$router.push("/historyInspectionRecord");
      } else if (index == "5") {
        //处置记录
        this.$router.push("/disposalHistoryRecord");
      }
      localStorage.setItem("activeRemark", "a");
    },
    linkCleanHistoryRecord() {
      this.$router.push('/cleanHistoryRecord')
      localStorage.setItem('activeRemark','c')
      // //console.log('请姐缓存',localStorage.getItem('activeRemark'))
    },
    linkRemoveBarrelHistoryRecord() {
      this.$router.push("/removeBarrelHistoryRecord");
      localStorage.setItem("activeRemark", "d");
    },
     /**
     * @description: 处置登记节流
     * @param {type} params
     * @return {type}
     */
    confirmHandleRegisterDebounce() {
      if(this.handleFlag == false) {
          this.handleFlag = true
          this.$refs.loading.show = true
          this.confirmHandleRegister()
          
      }
      
    },
    /**
     * @description: 处置登记
     * @param {type} params
     * @return {type}
     */
    confirmHandleRegister() {
      // var status;
      var codeNum = localStorage.getItem("myCodeNum");
     if(!this.statusId) {
       alert('处置状态不能为空')
       this.handleFlag = false
       this.$refs.loading.show = false
       return false
     }
      var ranges = [
        '\ud83c[\udf00-\udfff]', 
        '\ud83d[\udc00-\ude4f]', 
        '\ud83d[\ude80-\udeff]'
        ];
        if(new RegExp(ranges.join('|'), 'g').test(this.handleRegisterRemark)) {
          alert('备注中不能出现表情')
          this.handleFlag = false
          this.$refs.loading.show = false
          return false
        }
      this.$http({
        url: this.$http.adornUrl(`/garbage/garbageHandle/save`),
        method: "post",
        data: this.$http.adornData({
          pointId: this.classifyId,
          remark: this.handleRegisterRemark,
          status: this.statusId,
          handleMan: localStorage.getItem("personObjId"),
          imgList: this.imgList,
        }),
      }).then(({ data }) => {
        //console.log("处置登记后的结果为", data);
        if (data && data.code === 0) {
          this.handleFlag = false
          this.$refs.loading.show = false
          alert("处置成功");
          this.handleRegisterShow = false;
          this.imgList = [];
          this.handleRegisterFileList = [];
          //获取处置登记列表
           this.$http({
            url: this.$http.adornUrl(
              `/sys/sysdictionary/getSysDictionaryListByCode?code=sort_point_status`
            ),
            method: "get",
            params: this.$http.adornParams({}),
          }).then(({ data }) => {
            //console.log("处置登记列表为", data);
            if (data && data.code === 0) {
              var columns = []
              var columnsId = []
              data.data.forEach((item, index) => {
                columns.push(item.name);
                columnsId.push(item.code)
              });
              this.columns = columns
              this.statusIndexArr = columnsId
            }
          });
          this.$http({
            url: this.$http.adornUrl(
              `/garbage/garbageSortPoint/wxInfo?codeNum=${codeNum}`
            ),
            method: "post",
            data: this.$http.adornData({}),
          }).then(({ data }) => {
            //console.log("基本信息数据为", data);
            if (data && data.code == 0) {
              this.classifyId = data.data.data.id;
              localStorage.setItem("classifyId", this.classifyId);
              this.classifyName = data.data.data.name;
              localStorage.setItem("classifyName", this.classifyName);
              this.Community.status = data.data.data.status;
              this.Community.communityName = data.data.data.townName;
              this.Community.villageName = data.data.data.village;
              this.Community.villageCharacter = data.data.data.villageType;
              this.Community.delegateMember = data.data.data.delegating;
              this.Community.throwTime = data.data.data.launchTimeList;
              this.Community.leader = data.data.data.mailContactor.name;
              this.Community.phone = data.data.data.mailContactor.mobile1;
              this.Community.removeBarrelTimes = data.data.barrelCount;
              this.Community.removeBarrelPercent = data.data.barrelPercent;
              this.Community.cleanTimes = data.data.cleanCount;
              this.Community.recyclePercent = data.data.recyclablePercent;
              this.Community.imgList = data.data.data.imgList
              this.Community.mailContactorEntity = data.data.data.mailContactorEntity
              this.Community.otherRubbishDecreasePercent =
                data.data.otherReduce;
              this.Community.launchType = data.data.data.launchType
              this.clockPlace = data.data.data.place;
              this.tabMark = 'a'
            }
          });
        }
      });
    },
    /**
     * @description: 考勤打卡节流
     * @param {*}
     * @return {*}
     */
    confirmMyClockDebounce() {
        if(this.clockFlag == false) {
          this.clockFlag = true
          this.$refs.loading.show = true
          this.confirmMyClock()
        }
        
      },
    /**  考勤打卡
     * @description:
     * @param {type} params
     * @return {type}
     */
    confirmMyClock() {
      var that = this;
      let memberId = localStorage.getItem("personObjId");
      let pointId = this.classifyId;
      let type = this.clockStatus;
      let shiftId = this.classId;
      let remark = this.clockRemark;
      let imgList = this.imgList;
      let place = this.clockAddress
        var ranges = [
        '\ud83c[\udf00-\udfff]', 
        '\ud83d[\udc00-\ude4f]', 
        '\ud83d[\ude80-\udeff]'
        ];
        if(new RegExp(ranges.join('|'), 'g').test(remark)) {
          alert('备注中不能出现表情')
          this.clockFlag = false
          this.$refs.loading.show = false
          return false
        }
        if(imgList.length == 0) {
          alert('打卡失败，必须上传图片')
          this.clockFlag = false
          this.$refs.loading.show = false
          return false
        }
      this.$http({
        url: this.$http.adornUrl(`/garbage/garbagePunchClock/save`),
        method: "post",
        data: this.$http.adornData({
          memberId: memberId,
          pointId: pointId,
          type: type,
          shiftId: shiftId,
          imgList: imgList,
          remark: remark,
          place: place
        }),
      }).then(({ data }) => {
        //console.log("考勤结果为", data);
        if (data && data.code === 0) {
          this.clockFlag = false
          this.$refs.loading.show = false
          this.show = false;
          this.clockSuccessShow = true
          this.$refs.picUpload.imgList = []
          this.imgList = [];
          this.fileList = [];
          this.clockRemark = "";
          this.newDate = new Date().toTimeString().split(" ")[0];
          let timeArr = []
          timeArr.push((new Date().toTimeString().split(' ')[0].split(':'))[0])
          timeArr.push((new Date().toTimeString().split(' ')[0].split(':'))[1])
          this.successTime = timeArr.join(':')
          let memberId2 = localStorage.getItem("personObjId");
          let classifyId2 = localStorage.getItem("classifyId");
          let lng = that.lng;
          let lat = that.lat;
          that
            .$http({
              url: that.$http.adornUrl(
                `/garbage/garbagePunchClock/getNowShiftPunchClockInforAndShiftList?memberId=${memberId2}&point=${classifyId2}&longitude=${lng}&latitude=${lat}`
              ),
              method: "get",
              params: that.$http.adornParams({}),
            })
            .then(({ data }) => {
              //console.log("考勤打卡记录为", data);
              that.classStartTime = data.nowGarbageShift.startTime;
              that.classEndTime = data.nowGarbageShift.endTime;
              that.clockObj.type = data.nowGarbageShift.type;
              that.clockObj.canPunchClock = data.nowGarbageShift.canPunchClock;
              that.classClockList = data.nowGarbageShift.garbagePunchClockList;
               that.classClockList.forEach((clockItem,clockIndex) => {
                 if(clockItem.type == '2' || clockItem.type == '4'){
                   that.isRefreshLeave = true
                 }
              })
              that.lastClassClockList = data.list;
              that.classId = data.nowGarbageShift.id;
              that.clockOrderNum = data.nowGarbageShift.orderNum
            });
        }else {
          alert('打卡失败请重试')
          this.clockFlag = false
          this.$refs.loading.show = false
          return false
        }
      });
    },
    /**
     * @description: 添加保洁记录节流
     * @param {*}
     * @return {*}
     */
    confirmAddCleanRecordDebounce() {
      if(this.cleanFlag == false) {
        this.cleanFlag = true
        this.$refs.loading.show = true
        this.confirmAddCleanRecord()
      }
      
    },
    /**
     * @description: 添加保洁记录
     * @param {type} params
     * @return {type}
     */
    confirmAddCleanRecord() {
       var ranges = [
        '\ud83c[\udf00-\udfff]', 
        '\ud83d[\udc00-\ude4f]', 
        '\ud83d[\ude80-\udeff]'
        ];
        if(new RegExp(ranges.join('|'), 'g').test(this.cleanRemark)) {
          alert('备注中不能出现表情')
          this.cleanFlag = false
          this.$refs.loading.show = false
          return false
        }
        if(this.imgList.length == 0) {
          alert('添加失败，必须上传图片')
          this.cleanFlag = false
          this.$refs.loading.show = false
          return false
        }
      let openId = localStorage.getItem("myOpenId");
      let codeNum = localStorage.getItem("myCodeNum");
      this.$http({
        url: this.$http.adornUrl(`/garbage/garbageWithdraw/save`),
        method: "post",
        data: this.$http.adornData({
          type: "2",
          imgList: this.imgList,
          remark: this.cleanRemark,
          openId: openId,
          codeNum: codeNum,
        }),
      }).then(({ data }) => {
        if (data && data.code == 0) {
          this.cleanFlag = false
          this.$refs.loading.show = false
          this.cleanFileList = [];
          this.imgList = [];
          this.addCleanShow = false;
          this.tabMark = "c";
          var timeArray = new Date().toLocaleDateString().split("/");
          timeArray[1] =
            parseInt(timeArray[1]) < 10 ? "0" + timeArray[1] : timeArray[1];
          timeArray[2] =
            parseInt(timeArray[2]) < 10 ? "0" + timeArray[2] : timeArray[2];
          var time = timeArray.join("-");
          this.$http({
            url: this.$http.adornUrl(`/garbage/garbageWithdraw/showRecord`),
            method: "post",
            data: this.$http.adornData({
              startTime: time,
              endTime: time,
              type: "2",
              id: this.classifyId,
            }),
          }).then(({ data }) => {
            //console.log("保洁数据为", data);
            if (data && data.code === 0) {
              this.cleanDetailArray = data.data;
            }
          });
        }
      });
    },
    afterRead(file) {
      file.status = "uploading";
      file.message = "上传中...";
      if (this.tabMark == "c") {
        //保洁登记
        // this.cleanFileList.forEach((v) => {
        //   formData.append("files", v.file);
        // });
        this.zipAndUploadFile(this.cleanFileList,file) 
      }
      if (this.tabMark == "d") {
        //撤桶登记
        // this.removeFileList.forEach((v) => {
        //   formData.append("files", v.file);
        // });
        this.zipAndUploadFile(this.removeFileList,file)
      }
      if (this.tabMark == "b") {
        //考勤
        // this.fileList.forEach((v) => {
        //   formData.append("files", v.file);
        // });
        //  this.zipAndUploadFile(this.fileList,file)
      }
      if (this.tabMark == "a") {
        //基本信息处置登记
        // this.handleRegisterFileList.forEach((v) => {
        //   formData.append("files", v.file);
        // });
        this.zipAndUploadFile(this.handleRegisterFileList,file)
      }
      // //console.log(formData);
      // this.$http({
      //   url: this.$http.adornUrl(`/level/levelPublish/upload//file`),
      //   method: "post",
      //   headers: {
      //     "content-type": "multipart/form-data",
      //   },
      //   data: formData,
      // }).then((data) => {
      //   file.status = "";
      //   file.message = "";
      //   //console.log("文件上传后返回的数据data===》", data);
      //   let fileName = data.data.fileName;
      //   let filestr = data.data.filestr;
      //   //console.log(fileName);
      //   fileName.forEach((v, i) => {
      //     this.imgList.push({
      //       name: fileName[i],
      //       url: filestr[i],
      //     });
      //   });
      // });
    },
    openAllowClockInDialog() {
      this.clockInTitle = "签到打卡";
      this.clockStatus = "1";
      this.show = true;
    },
    openLeaveDialog() {
      if(this.isRefreshLeave) {
        this.clockInTitle = "更新离岗打卡";
      this.clockStatus = "4";
      }
      else {
         this.clockInTitle = "离岗打卡";
         this.clockStatus = "2";
      }
     
      this.show = true;
    },
    /**
     * @description: 跳转到打卡记录
     * @param {type} 无
     * @return {type}
     */
    enterAttendanceRecord() {
      localStorage.setItem("activeRemark", "b");
      this.$router.push("/attendanceHistoryRecord");
    },
    onConfirm(value, index) {
      //console.log("选择的惩罚是", value, index);
      this.handleRegisterHeader = value;
      this.statusId = this.statusIndexArr[index]
      this.showHandle = false;
      this.handleRegisterShow = true;
    },
    onCancel() {
      this.showHandle = false;
    },
    /**
     * @description: 点击tab栏传递标签栏的信息
     * @param {String,String} tab标签的name属性 tab标签的标签名
     * @return {type} 无
     */
    clickTab(name, title) {
      //console.log("name:", name, "title", title);
      if (name == "c") {
        //保洁登记
         if(this.timer) {
           clearInterval(this.timer)  //清除考勤打卡定时器
        }
        this.tabMark = "c";
        document.title = '保洁登记'
        var timeArray = new Date().toLocaleDateString().split("/");
        timeArray[1] =
          parseInt(timeArray[1]) < 10 ? "0" + timeArray[1] : timeArray[1];
        timeArray[2] =
          parseInt(timeArray[2]) < 10 ? "0" + timeArray[2] : timeArray[2];
        var time = timeArray.join("-");
        this.$http({
          url: this.$http.adornUrl(`/garbage/garbageWithdraw/showRecord`),
          method: "post",
          data: this.$http.adornData({
            startTime: time,
            endTime: time,
            type: "2",
            id: this.classifyId,
          }),
        }).then(({ data }) => {
          //console.log("保洁数据为", data);
          if (data && data.code === 0) {
            this.cleanDetailArray = data.data;
          }
        });
      } else if (name == "d") {
        //撤桶登记
        if(this.timer) {
           clearInterval(this.timer)  //清除考勤打卡定时器
        }
        let codeNum = localStorage.getItem("myCodeNum");
        this.tabMark = "d";
        document.title = '撤桶登记'
        this.$http({
          url: this.$http.adornUrl(
            `/garbage/garbageShift/wxList?codeNum=${codeNum}`
          ),
          method: "get",
          params: this.$http.adornParams({}),
        }).then(({ data }) => {
          //console.log("撤桶登记数据为", data);
          if (data && data.code == 0) {
            data.data.forEach((item, index) => {
              if (item.status == "1") {
                item.withdrawEntity = {};
                item.withdrawEntity.id = item.id;
              }
            });
            this.removeBarrelList = data.data;
          }
        });
      } else if (name == "b") {
        //考勤打卡
        this.tabMark = "b";
        document.title = '考勤打卡'
        this.newDate = new Date().toTimeString().split(" ")[0];
        this.getLocation();
      } else if (name == "a") {
        if(this.timer) {
           clearInterval(this.timer)  //清除考勤打卡定时器
        }
        this.tabMark = "a";
         document.title = '基本信息'
        let codeNum = localStorage.getItem("myCodeNum");
        this.$http({
          url: this.$http.adornUrl(
            `/garbage/garbageSortPoint/wxInfo?codeNum=${codeNum}`
          ),
          method: "post",
          data: this.$http.adornData({}),
        }).then(({ data }) => {
          //console.log("基本信息数据为", data);
          if (data && data.code == 0) {
            this.classifyId = data.data.data.id;
            this.classifyName = data.data.data.name;
            localStorage.setItem("classifyName", this.classifyName);
            this.Community.status = data.data.data.status;
            this.Community.communityName = data.data.data.townName;
            this.Community.villageName = data.data.data.village;
            this.Community.villageCharacter = data.data.data.villageType;
            this.Community.delegateMember = data.data.data.delegating;
            this.Community.throwTime = data.data.data.launchTimeList;
            this.Community.leader = data.data.data.mailContactor.name;
            this.Community.phone = data.data.data.mailContactor.mobile1;
            this.Community.removeBarrelTimes = data.data.barrelCount;
            this.Community.removeBarrelPercent = data.data.barrelPercent;
            this.Community.cleanTimes = data.data.cleanCount;
            this.Community.recyclePercent = data.data.recyclablePercent;
            this.Community.otherRubbishDecreasePercent = data.data.otherReduce;
            this.clockPlace = data.data.data.place;
            this.Community.yellowTimes = data.data.yellowCount;
            this.Community.redTimes = data.data.redCount;
            this.Community.refuseTimes = data.data.rejectCount;
            this.Community.change = data.data.changeCount;
            this.Community.punishContent = data.data.punishCount;
            this.Community.checkTimes = data.data.instanceCount;
            this.Community.abnormalTimes = data.data.errorInvestigation;
            this.Community.imgList = data.data.data.imgList
            this.Community.mailContactorEntity = data.data.data.mailContactorEntity
            this.Community.launchType = data.data.data.launchType
            this.patrolInspection.investigationInforList =
              data.data.data.investigationInforList; //拿到巡查巡检列表数据
            this.patrolInspection.longitude = data.data.data.longitude;
            this.patrolInspection.latitude = data.data.data.latitude;
            this.patrolInspection.place = data.data.data.place;
          }
        });
      } else if (name == "e") {
        //巡查巡检
        if(this.timer) {
           clearInterval(this.timer)  //清除考勤打卡定时器
        }
        this.tabMark = "e";
         document.title = '巡查巡检'
        this.$http({
          url: this.$http.adornUrl(
            `/garbage/garbageInvestigationInstance/getInstanceByPointByMan`
          ),
          method: "post",
          data: this.$http.adornData({
            pointId: this.classifyId, //分类点id
            investigationMan: this.personObj.id, //扫码人员的id
          }),
        }).then((data) => {
          //console.log(data);
          if (data.data.page == null) {
            // 若这个接口返回null,则不做匹配,此时instanceId为-1,保存时instanceId为-1
            this.patrolInspection.instanceId = -1;
            this.patrolInspection.investigationInforList.forEach(
            (item, index) => {
              this.patrolInspection.imgList[index] = [];
              this.uploadFileList[index] = [];
              this.patrolInspection.storeArr[index] = [];
            }
          );
            return;
          } else {
            //console.log(data.data.page.id);
            //清空统计状态值
            this.patrolInspection.normal = this.patrolInspection.abnormal = 0;
            this.patrolInspection.instanceId = data.data.page.id;
            this.patrolInspection.investigationInforList.forEach(
              (item, index) => {
                this.patrolInspection.instanceInforList[index] = "";
                this.patrolInspection.status[index] = "";
                this.patrolInspection.imgList[index] = [];
              }
            );
            this.patrolInspection.investigationInforList.forEach(
              (item, index) => {
                data.data.page.instanceInforList.forEach((v, i) => {
                  if (item.name == v.inforName) {
                    //匹配到相同的项目
                    this.patrolInspection.instanceInforList.splice(
                      index,
                      1,
                      data.data.page.instanceInforList[i]
                    );
                    this.patrolInspection.status.splice(
                      index,
                      1,
                      data.data.page.instanceInforList[i].status
                    );
                    this.patrolInspection.imgList.splice(
                      index,
                      1,
                      data.data.page.instanceInforList[i].imgList
                    );
                  }
                });
              }
            );
            data.data.page.instanceInforList.forEach((val, inx) => {
              //统计状态值
              if (data.data.page.instanceInforList[inx].status == "0") {
                //状态为异常值
                this.patrolInspection.abnormal++;
              }
              if (data.data.page.instanceInforList[inx].status == "1") {
                //状态为正常值
                this.patrolInspection.normal++;
              }
            });
            //console.log(this.patrolInspection.instanceInforList);
            // data.data.page.instanceInforList.forEach((v, i) => {
            this.patrolInspection.instanceInforList.forEach((v, i) => {
              //接收返回的数据
              this.patrolInspection.remark.push(v.remark);
              this.patrolInspection.checkResultIndex.push(v.status);
              this.patrolInspection.advisePersonIndex.push(v.isNotice);
              let arr = [];
              // let item = [];
              if (v.imgList) {
                v.imgList.forEach((val) => {
                  arr.push({ url: val.allUrl, name: val.name });
                });
                this.patrolInspection.fileList.push(arr);
                this.uploadFileList.push(arr);
              } else {
                this.patrolInspection.fileList.push(arr);
                this.uploadFileList.push(arr);
              }
            });
            //console.log(this.patrolInspection.fileList, this.patrolInspection);
          }
        });
      }
    },
    /**
     * @description: 查看单条保洁记录的详情
     * @param {int} 一条保洁记录的id
     * @return {type}
     */
    lookCleanDetail(id) {
      this.$http({
        url: this.$http.adornUrl(`/garbage/garbageWithdraw/wxInfo?id=${id}`),
        method: "get",
        params: this.$http.adornParams({}),
      }).then(({ data }) => {
        //console.log("单条记录的信息为", data);
        if (data && data.code === 0) {
          this.singleClean = data.data;
          this.cleaningDetailShow = true;
        }
      });
    },
    /**
     * @description: 查看单条撤桶记录的详情
     * @param {type} params
     * @return {type}
     */
    lookRemoveBarrelDetail(id, status, startTime, endTime, itemId) {
      this.removeBarrelId = itemId;
      if (status == "1") {
        //待撤桶
        this.removeBarrel.startTime = startTime;
        this.removeBarrel.endTime = endTime;
        this.confirmRemoveBarrel = true;
        this.confirmRemoveBarrelshow = true;
      } else {
        this.confirmRemoveBarrel = false;
      }
      if (status == "2") {
        this.alreadyId = id;
        this.$http({
          url: this.$http.adornUrl(`/garbage/garbageWithdraw/wxInfo?id=${id}`),
          method: "get",
          params: this.$http.adornParams({}),
        }).then(({ data }) => {
          //console.log("班次的详细信息为", data);
          if (data && data.code === 0) {
            if (data.data.garbageShiftEntity != null) {
              this.removeBarrel.startTime =
                data.data.garbageShiftEntity.startTime;
              this.removeBarrel.endTime = data.data.garbageShiftEntity.endTime;
            }
            this.removeBarrel.member = data.data.memberName;
            this.removeBarrel.time = data.data.withdrawTime;
            this.removeBarrel.dinnerNumber =
              data.data.foodWaste == null ? 0 : data.data.foodWaste;
            this.removeBarrel.otherNumber =
              data.data.otherWaste == null ? 0 : data.data.otherWaste;
            this.removeBarrel.recycleNumber =
              data.data.recyclableWaste == null ? 0 : data.data.recyclableWaste;
            this.removeBarrel.harmNumber =
              data.data.harmfulWaste == null ? 0 : data.data.harmfulWaste;
            this.removeBarrel.classifyPrecisePercent =
              data.data.classAccuracy == null ? 0 : data.data.classAccuracy;
            this.removeBarrel.protectRadio = data.data.isKeepbarrel;
            this.removeFileList = data.data.imgList
              ? data.data.imgList.map((item, index) => {
                  return { url: item.allUrl };
                })
              : [];
            //console.log("tupian", this.removeFileList);
            this.removeBarrel.protectRemark = data.data.remark;
            this.confirmRemoveBarrelshow = true;
          }
        });
      }
    },
    /**
     * @description: 减少桶数
     * @param {string} 标识减少哪个桶数
     * @return {type}
     */
    decreaseBarrel(mark) {
      //console.log("mark", mark);
      if (mark == "rest") {
        this.removeBarrel.dinnerNumber == 0
          ? 0
          : --this.removeBarrel.dinnerNumber;
      } else if (mark == "other") {
        this.removeBarrel.otherNumber == 0
          ? 0
          : --this.removeBarrel.otherNumber;
      } else if (mark == "recycle") {
        this.removeBarrel.recycleNumber == 0
          ? 0
          : --this.removeBarrel.recycleNumber;
      } else if (mark == "harm") {
        this.removeBarrel.harmNumber == 0 ? 0 : --this.removeBarrel.harmNumber;
      }else if (mark == "classify") {
        this.removeBarrel.classifyPrecisePercent == 0 ? 0 : --this.removeBarrel.classifyPrecisePercent;
      }
    },
    /**
     * @description: 增加桶数
     * @param {string} 标识增加哪个桶数
     * @return {type}
     */
    increaseBarrel(mark) {
      if (mark == "rest") {
        ++this.removeBarrel.dinnerNumber;
      } else if (mark == "other") {
        ++this.removeBarrel.otherNumber;
      } else if (mark == "recycle") {
        ++this.removeBarrel.recycleNumber;
      } else if (mark == "harm") {
        ++this.removeBarrel.harmNumber;
      } else if (mark == "classify") {
        ++this.removeBarrel.classifyPrecisePercent
      }
    },
    /**
     * @description: 撤桶修改节流
     * @param {*}
     * @return {*}
     */
    updateSaveBarrelDebounce() {
      if(this.removeBarrelFlag2 == false) {
        this.removeBarrelFlag2 = true
        this.$refs.loading.show = true
        this.updateSaveBarrel()
      }
      
    },
    /**
     * @description: 撤桶修改
     * @param {type} params
     * @return {type}
     */
    updateSaveBarrel() {
      var ranges = [
        '\ud83c[\udf00-\udfff]', 
        '\ud83d[\udc00-\ude4f]', 
        '\ud83d[\ude80-\udeff]'
        ];
        if(new RegExp(ranges.join('|'), 'g').test(this.removeBarrel.protectRemark)) {
          alert('备注中不能出现表情')
          this.removeBarrelFlag2 = false
          this.$refs.loading.show = false
          return false
        }
      let openId = localStorage.getItem("myOpenId");
      let codeNum = localStorage.getItem("myCodeNum");
      this.$http({
        url: this.$http.adornUrl(`/garbage/garbageWithdraw/update`),
        method: "post",
        data: this.$http.adornData({
          id: this.alreadyId,
          foodWaste: this.removeBarrel.dinnerNumber,
          otherWaste: this.removeBarrel.otherNumber,
          recyclableWaste: this.removeBarrel.recycleNumber,
          harmfulWaste: this.removeBarrel.harmNumber,
          classAccuracy: this.removeBarrel.classifyPrecisePercent,
          isKeepbarrel: this.removeBarrel.protectRadio,
          type: "1",
          imgList: this.imgList,
          remark: this.removeBarrel.protectRemark,
          openId: openId, //用户标识
          codeNum: codeNum, //用户标识
          shiftId: this.removeBarrelId, //班次点
        }),
      }).then(({ data }) => {
        //console.log("更新撤桶返回的数据为", data);
        if (data && data.code === 0) {
           this.removeBarrelFlag2 = false
          this.$refs.loading.show = false
          this.removeFileList = [];
          this.imgList = [];
          alert("更新成功");
          this.confirmRemoveBarrelshow = false;
        }
      });
    },
    /**
     * @description: 确认撤桶节流
     * @param {*}
     * @return {*}
     */
    confirmRemBarrelDebounce() {
      if(this.removeBarrelFlag1 == false) {
         this.removeBarrelFlag1 = true
         this.$refs.loading.show = true
         this.confirmRemBarrel()
      }
      
    },
    /**
     * @description: 确认撤桶
     * @param {type} params
     * @return {type}
     */
    confirmRemBarrel() {
       var ranges = [
        '\ud83c[\udf00-\udfff]', 
        '\ud83d[\udc00-\ude4f]', 
        '\ud83d[\ude80-\udeff]'
        ];
        if(new RegExp(ranges.join('|'), 'g').test(this.removeBarrel.protectRemark)) {
          alert('备注中不能出现表情')
          this.removeBarrelFlag1 = false
         this.$refs.loading.show = false
          return false
        }
      let openId = localStorage.getItem("myOpenId");
      let codeNum = localStorage.getItem("myCodeNum");
      this.$http({
        url: this.$http.adornUrl(`/garbage/garbageWithdraw/save`),
        method: "post",
        data: this.$http.adornData({
          foodWaste: this.removeBarrel.dinnerNumber,
          otherWaste: this.removeBarrel.otherNumber,
          recyclableWaste: this.removeBarrel.recycleNumber,
          harmfulWaste: this.removeBarrel.harmNumber,
          classAccuracy: this.removeBarrel.classifyPrecisePercent,
          isKeepbarrel: this.removeBarrel.protectRadio,
          type: "1",
          imgList: this.imgList,
          remark: this.removeBarrel.protectRemark,
          openId: openId, //用户标识
          codeNum: codeNum, //用户标识
          shiftId: this.removeBarrelId, //班次点
        }),
      }).then(({ data }) => {
        //console.log("确认撤桶返回的数据为", data);
        if (data && data.code === 0) {
          this.removeBarrelFlag1 = false
         this.$refs.loading.show = false
          this.removeFileList = [];
          this.imgList = [];
          alert("确认成功");
          this.confirmRemoveBarrelshow = false;
          let codeNum2 = localStorage.getItem("myCodeNum");
          this.tabMark = "d";
          this.$http({
            url: this.$http.adornUrl(
              `/garbage/garbageShift/wxList?codeNum=${codeNum2}`
            ),
            method: "get",
            params: this.$http.adornParams({}),
          }).then(({ data }) => {
            //console.log("撤桶列表数据为", data);
            if (data && data.code == 0) {
              data.data.forEach((item, index) => {
                if (item.status == "1") {
                  item.withdrawEntity = {};
                  item.withdrawEntity.id = item.id;
                }
              });
              this.removeBarrelList = data.data;
            }
          });
        }
      });
    },
    getLocation() {
      // 从高德地图api获取浏览器定位
      const that = this;
      AMap.plugin("AMap.Geolocation", function () {
        let geolocation = new AMap.Geolocation({
          // 是否使用高精度定位，默认：true
          enableHighAccuracy: true,
          // 设置定位超时时间，默认：无穷大
          timeout: 10000,
        });
        geolocation.getCurrentPosition();
        // geolocation.getCurrentPosition()
        AMap.event.addListener(geolocation, "complete", onComplete);
        AMap.event.addListener(geolocation, "error", onError);

        function onComplete(data) {
          // data是具体的定位信息
          //console.log("定位成功后获取得位置为", data);
          that.lng = data.position.lng;
          that.lat = data.position.lat;
          let memberId = that.personObj.id;
          let classifyId = that.classifyId;
          let lng = that.lng;
          let lat = that.lat;
          that
            .$http({
              url: that.$http.adornUrl(
                `/investigation/instanceInfor/getAdressFromTencent?lat=${lat}&lng=${lng}`
              ),
              method: "get",
              params: that.$http.adornParams({}),
            }).then(({data}) => {
              //console.log('跟后台获取的位置信息为',data)
              that.clockAddress = data.address
            })
          that
            .$http({
              url: that.$http.adornUrl(
                `/garbage/garbagePunchClock/getNowShiftPunchClockInforAndShiftList?memberId=${memberId}&point=${classifyId}&longitude=${lng}&latitude=${lat}`
              ),
              method: "get",
              params: that.$http.adornParams({}),
            })
            .then(({ data }) => {
              //console.log("考勤打卡记录为", data);
              that.timer = setInterval(function() {
                that.newDate = new Date().toTimeString().split(" ")[0];
              },1000)
              that.classStartTime = data.nowGarbageShift.startTime;
              that.classEndTime = data.nowGarbageShift.endTime;
              that.clockObj.type = data.nowGarbageShift.type;
              that.clockObj.canPunchClock = data.nowGarbageShift.canPunchClock;
              that.classClockList = data.nowGarbageShift.garbagePunchClockList;
              that.classClockList.forEach((clockItem,clockIndex) => {
                 if(clockItem.type == '2' ||  clockItem.type == '4') {
                   that.isRefreshLeave = true
                 }
              })
              if(data.nowGarbageShift.garbagePunchClockList.length != 0) {
                 that.isRefreshExist = true
              }
              if(that.clockObj.type == '2' && that.clockObj.canPunchClock) {
                that.isRefreshExist = false
              }
              that.lastClassClockList = data.list;
              that.classId = data.nowGarbageShift.id;
              that.clockOrderNum = data.nowGarbageShift.orderNum
            });
        }

        function onError() {
          // 定位出错
          that.getLatLngLocation();
        }
      });
    },
    getLatLngLocation() {
      AMap.plugin("AMap.CitySearch", function () {
        let citySearch = new AMap.CitySearch();
        citySearch.getLocalCity(function (status, result) {
          if (status === "complete" && result.info === "OK") {
            // 查询成功，result即为当前所在城市信息
            AMap.plugin("AMap.Geocoder", function () {
              let geocoder = new AMap.Geocoder({
                // city 指定进行编码查询的城市，支持传入城市名、adcode 和 citycode
                city: result.adcode,
              });
              let lnglat = result.rectangle.split(";")[0].split(",");
              geocoder.getAddress(lnglat, function (status, data) {
                if (status === "complete" && data.info === "OK") {
                  // data为对应的地理位置详细信息
                }
              });
            });
          }
        });
      });
    },
    /**
     * @description: 检查完所有项目后进行提交
     * @param {}
     * @return {}
     */
    submitProject() {
      this.$dialog
        .confirm({
          title: "请确认是否提交项目？",
        })
        .then(() => {
          this.$refs.loading.show = true; //开启加载标志
          this.$http({
            url: this.$http.adornUrl(
              `/garbage/garbageInvestigationInstance/submit`
            ),
            method: "post",
            data: this.$http.adornData({
              investigationMan: this.personObj.id,
              id: this.patrolInspection.instanceId,
            }),
          }).then((data) => {
            this.$refs.loading.show = false; //关闭加载标志
            if(data && data.data.code === 0){
              //console.log(data);
              this.$dialog
                .alert({
                  message: "提交成功",
                })
                .then(() => {
                  this.$router.push({
                    name: "historyInspectionRecord",
                  });
                });
            }
            else{
              this.$dialog
                .alert({
                  message: "提交失败",
                })
            }
          });
        });
    },
    /**
     * @description: 保存单个检查项目信息
     * @param {number} index 传入的索引值
     * @return {}
     */
    submitSingleCheck(index) {
      this.$dialog
        .confirm({
          title: "是否确认巡查？",
        })
        .then(() => {
          this.$refs.loading.show = true; //开启加载标志
          if(this.patrolInspection.storeArr[
            this.patrolInspection.currentIndex
          ]){
            this.patrolInspection.imgList[
              this.patrolInspection.currentIndex
            ].push(...this.patrolInspection.storeArr[
              this.patrolInspection.currentIndex
            ]);
            this.uploadFileList[this.patrolInspection.currentIndex].push(
              ...this.patrolInspection.storeArr[
              this.patrolInspection.currentIndex
            ]
            );
          }
          this.$http({
            url: this.$http.adornUrl(
              `/garbage/garbageInvestigationInstance/save`
            ),
            method: "post",
            data: this.$http.adornData({
              instanceId: this.patrolInspection.instanceId,
              inforId: this.patrolInspection.investigationInforList[index].id, //修改项目的id
              pointId: this.classifyId, //分类点id
              remark: this.patrolInspection.remark[index]
                ? this.patrolInspection.remark[index]
                : "",
              imgList: this.patrolInspection.imgList[index]
                ? this.patrolInspection.imgList[index]
                : [],
              status: this.patrolInspection.checkResultIndex[index]
                ? this.patrolInspection.checkResultIndex[index]
                : "", //状态值
              place: this.patrolInspection.place,
              longitude: this.patrolInspection.longitude,
              latitude: this.patrolInspection.latitude,
              isNotice: this.patrolInspection.advisePersonIndex[index]
                ? this.patrolInspection.advisePersonIndex[index]
                : "", //通知处置值
              investigationMan: this.personObj.id, //扫码人员的id,
            }),
          }).then((data) => {
            this.$refs.loading.show = false; //关闭加载标志
            if(data && data.data.code === 0){
              //console.log(data);
              //清空统计状态值
              this.patrolInspection.instanceId = data.data.data.id;
              this.patrolInspection.normal = this.patrolInspection.abnormal = 0;
              this.patrolInspection.investigationInforList.forEach(
                (item, index) => {
                  this.patrolInspection.status[index] = "";
                }
              );
              this.patrolInspection.investigationInforList.forEach(
                (item, index) => {
                  data.data.data.instanceInforList.forEach((v, i) => {
                    if (item.name == v.inforName) {
                      this.$nextTick(() => {
                        this.patrolInspection.status.splice(
                          index,
                          1,
                          data.data.data.instanceInforList[i].status
                        );
                      });
                    }
                  });
                }
              );
              data.data.data.instanceInforList.forEach((val, inx) => {
                //统计状态值
                if (data.data.data.instanceInforList[inx].status == "0") {
                  //状态为异常值
                  this.patrolInspection.abnormal++;
                }
                if (data.data.data.instanceInforList[inx].status == "1") {
                  //状态为正常值
                  this.patrolInspection.normal++;
                }
              });
              //console.log(this.patrolInspection.status);
              this.$dialog.alert({
                message: "巡查成功",
              });
            } else{
              this.$dialog.alert({
                message: "服务器异常",
              });
            }
          });
        });
    },
    inspectionDeleterRead(file) {
      //console.log(
      //   "删除了文件",
      //   file,
      //   this.uploadFileList,
      //   this.patrolInspection.currentIndex,
      //   this.patrolInspection.imgList,
      // );
      var delectIndex;
      if(this.patrolInspection.storeArr[this.patrolInspection.currentIndex]){
        this.patrolInspection.storeArr[this.patrolInspection.currentIndex].forEach(
          (item, index) => {
            //console.log(item, item.url, file);
            if (item.url == file.url) {
              delectIndex = index;
              //console.log(delectIndex, index);
              this.patrolInspection.storeArr[this.patrolInspection.currentIndex].splice(
                delectIndex,
                1
              );
              //console.log(this.patrolInspection.storeArr);
              // this.patrolInspection.imgList = this.uploadFileList;
            }
            if (file.file && item.name == file.file.name) {
              delectIndex = index;
              //console.log(delectIndex, index);
              this.patrolInspection.storeArr[this.patrolInspection.currentIndex].splice(
                delectIndex,
                1
              );
              //console.log(this.patrolInspection.storeArr);
            }
          }
        );
      }
      this.uploadFileList[this.patrolInspection.currentIndex].forEach(
        (item, index) => {
          //console.log(item, item.url, file);
          if (item.url == file.url) {
            delectIndex = index;
            //console.log(delectIndex, index);
            //console.log(
            //   this.uploadFileList,
            //   this.uploadFileList[this.patrolInspection.currentIndex]
            // );
            this.uploadFileList[this.patrolInspection.currentIndex].splice(
              delectIndex,
              1
            );
            this.patrolInspection.imgList[
              this.patrolInspection.currentIndex
            ].splice(delectIndex, 1);
            // this.patrolInspection.imgList = this.uploadFileList;
          }
          if (file.file && item.name == file.file.name) {
            delectIndex = index;
            //console.log(delectIndex, index);
            //console.log(
            //   this.uploadFileList,
            //   this.uploadFileList[this.patrolInspection.currentIndex]
            // );
            this.uploadFileList[this.patrolInspection.currentIndex].splice(
              delectIndex,
              1
            );
            this.patrolInspection.imgList[
              this.patrolInspection.currentIndex
            ].splice(delectIndex, 1);
          }
        }
      );
      //console.log(this.patrolInspection.imgList);
    },
    /**
     * @description:巡查巡检文件上传完毕后触发的回调函数
     * @param {obj} file 对应的file对象
     * @return {}
     */
    inspectionAfterRead(file) {
      var content = file.content;
      var name = file.file.name;
      file.status = "uploading";
      file.message = "上传中...";
      // 设置图片的压缩比例
      this.compressImg(file.file.size);
      new Promise((resolve, reject)=>{
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
            this.patrolInspection.fileList
            [this.patrolInspection.currentIndex]
            [this.patrolInspection.fileList[this.patrolInspection.currentIndex].length - 1] = {
              content,
              file,
            }
          } 
          else {
            resolve();
          }
        };
      }).then(()=>{
        //console.log(
        //   this.patrolInspection.fileList,
        //   this.patrolInspection.currentIndex,
        //   file
        // );
        let formData = new FormData();
        this.patrolInspection.fileList[
          this.patrolInspection.currentIndex
        ].forEach((v) => {
          formData.append("files", v.file);
        });
        //console.log(formData);
        this.$http({
          url: this.$http.adornUrl(`/level/levelPublish/upload//file`),
          method: "post",
          headers: {
            "content-type": "multipart/form-data",
          },
          data: formData,
        }).then((data) => {
          file.status = "";
          file.message = "";
          //console.log("文件上传后返回的数据", data);
          let fileName = data.data.fileName;
          let filestr = data.data.filestr;
          //console.log(
          //   fileName,
          //   this.patrolInspection.currentIndex,
          //   this.patrolInspection.imgList
          // );
          this.patrolInspection.investigationInforList.forEach(
            (item, index) => {
              this.patrolInspection.storeArr[index] = [];
              }
            );
          fileName.forEach((v, i) => {
            this.patrolInspection.storeArr[this.patrolInspection.currentIndex].push({
              name: fileName[i],
              url: filestr[i],
            })
          });
          //console.log(this.patrolInspection.storeArr);
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
     * @description: 选择检查结果
     * @param {number} num 0为正常，1为异常
     * @param {number} index 当前选中的索引值
     * @return {}
     */
    selectCheckResult(num, index) {
      if (num == "1") {
        //选择正常的情况下，isNotice直接传1
        this.patrolInspection.advisePersonIndex[index] = 1;
      }
      this.patrolInspection.investigationInforList.forEach((v) => {
        //根据列表数组长度进行设定
        this.patrolInspection.checkResultIndex.push("-1");
        //根据索引修改指定位置的值
        this.patrolInspection.checkResultIndex.splice(index, 1, num);
        //根据列表数组长度设置检查结果数组长度
        this.patrolInspection.checkResultIndex = this.patrolInspection.checkResultIndex.slice(
          0,
          this.patrolInspection.investigationInforList.length
        );
      });
      // this.patrolInspection.currentIndex = index;
      //console.log(this.patrolInspection.checkResultIndex);
    },
    /**
     * @description: 选择是否通知负责人
     * @param {type} param
     * @return {type} return
     */
    selectAdvisePerson(num, index) {
      this.patrolInspection.investigationInforList.forEach((v) => {
        //根据列表数组长度进行设定
        this.patrolInspection.advisePersonIndex.push("");
        //根据索引修改制定位置的值
        this.patrolInspection.advisePersonIndex.splice(index, 1, num);
        //根据列表数组长度设置通知负责人数组长度
        this.patrolInspection.advisePersonIndex = this.patrolInspection.advisePersonIndex.slice(
          0,
          this.patrolInspection.investigationInforList.length
        );
      });
      //console.log(this.patrolInspection.advisePersonIndex);
    },
    getPatrolInspection() {
      //巡查巡检
      this.tabMark = "e";
      this.$http({
        url: this.$http.adornUrl(
          `/garbage/garbageInvestigationInstance/getInstanceByPointByMan`
        ),
        method: "post",
        data: this.$http.adornData({
          pointId: this.classifyId, //分类点id
          investigationMan: this.personObj.id, //扫码人员的id
        }),
      }).then((data) => {
        //console.log(data);
        if (data.data.page == null) {
          // 若这个接口返回null,则不做匹配,此时instanceId为-1,保存时instanceId为-1
          this.patrolInspection.instanceId = -1;
          this.patrolInspection.investigationInforList.forEach(
            (item, index) => {
              this.patrolInspection.imgList[index] = [];
              this.uploadFileList[index] = [];
              this.patrolInspection.storeArr[index] = [];
            }
          );
          return;
        } else {
          //console.log(
          //   data.data.page.id,
          //   this.patrolInspection.investigationInforList
          // );
          //清空统计状态值
          this.patrolInspection.normal = this.patrolInspection.abnormal = 0;
          this.patrolInspection.instanceId = data.data.page.id;
          this.patrolInspection.investigationInforList.forEach(
            (item, index) => {
              this.patrolInspection.instanceInforList[index] = "";
              this.patrolInspection.status[index] = "";
              this.patrolInspection.imgList[index] = [];
            }
          );
          this.patrolInspection.investigationInforList.forEach(
            (item, index) => {
              data.data.page.instanceInforList.forEach((v, i) => {
                if (item.name == v.inforName) {
                  //匹配到相同的项目
                  //console.log(item.name, v.inforName, i, index);
                  this.patrolInspection.instanceInforList.splice(
                    index,
                    1,
                    data.data.page.instanceInforList[i]
                  );
                  this.patrolInspection.status.splice(
                    index,
                    1,
                    data.data.page.instanceInforList[i].status
                  );
                  this.patrolInspection.imgList.splice(
                    index,
                    1,
                    data.data.page.instanceInforList[i].imgList
                  );
                }
              });
            }
          );
          data.data.page.instanceInforList.forEach((val, inx) => {
            //统计状态值
            if (data.data.page.instanceInforList[inx].status == "0") {
              //状态为异常值
              this.patrolInspection.abnormal++;
            }
            if (data.data.page.instanceInforList[inx].status == "1") {
              //状态为正常值
              this.patrolInspection.normal++;
            }
          });
          //console.log(this.patrolInspection.instanceInforList);
          this.patrolInspection.instanceInforList.forEach((v, i) => {
            //接收返回的数据
            this.patrolInspection.remark.push(v.remark);
            this.patrolInspection.checkResultIndex.push(v.status);
            this.patrolInspection.advisePersonIndex.push(v.isNotice);
            let arr = [];
            // let item = [];
            if (v.imgList) {
              v.imgList.forEach((val) => {
                arr.push({ url: val.allUrl, name: val.name });
              });
              this.patrolInspection.fileList.push(arr);
              this.uploadFileList.push(arr);
            } else {
              this.patrolInspection.fileList.push(arr);
              this.uploadFileList.push(arr);
            }
          });
          //console.log(this.patrolInspection.fileList, this.patrolInspection);
        }
      });
    },
  },
  computed: {
    existRecord() {
      var exist = false
      for(var i = 0 ; i < this.limitList.length; i++) {
        if(this.limitList[i].menuCode == 'KQJL' || this.limitList[i].menuCode == 'BJJL' || this.limitList[i].menuCode == 'CTJL' || this.limitList[i].menuCode == 'XCJL' || this.limitList[i].menuCode == 'CZJL') {
          exist = true
        }
      }
      return exist
    },
    barrelSum() {
      return (
        parseFloat(this.removeBarrel.dinnerNumber) +
        parseFloat(this.removeBarrel.otherNumber) +
        parseFloat(this.removeBarrel.recycleNumber) +
        parseFloat(this.removeBarrel.harmNumber)
      ).toFixed(2);
    },
    trueThrowTime() {
      //分类点投放时间
      let throwTime = [];
      //console.log(typeof this.Community.throwTime);
      if (this.Community.throwTime) {
        this.Community.throwTime.forEach((item, index) => {
          throwTime.push(item.startTime + "~" + item.endTime);
        });
      }
      return throwTime.join("、");
    },
  },
  created() {
    let limitArr = []
    document.title = '基本信息'
    // this.getLocation()
     this.tabMark = "a";
    let urlString = window.location.href
    // let urlString =
    //   "https://scg.chinaemt.com/rpt/garbageClassification.html#/workAttendance?openId=oMHlns_RLG-xu72tvs8lbAR1mDTU&clientFlag=wechat&codeNum=31ffd991438949259a5f5325238337ce-1608885660578";

    let urlArr = urlString.split("?");
    let paramArr = urlArr[1];
    let workString = paramArr.split("&");
    //console.log("length", workString[workString.length - 1]);
    let Mcode = workString[workString.length - 1];
    let Mcod = Mcode.split("=");
    let codeNum = Mcod[1]; //codeNum二维码
    let MopenId = workString[0];
    let Mopen = MopenId.split("=");
    let openId = Mopen[1]; //openId
    localStorage.setItem("myOpenId", openId);
    localStorage.setItem("myCodeNum", codeNum);

    //console.log("myopenId", openId, "mycodenum", codeNum);
    this.activeName = localStorage.getItem("activeRemark")
      ? localStorage.getItem("activeRemark")
      : "a";
    //console.log("activeName", this.activeName);
    //console.log("local", localStorage.getItem("activeRemark"));
    if (this.activeName == "b") {
      //重新返回tab页面记录上一次点击的位置并刷新
      //考勤打卡
      this.tabMark = "b";
       document.title = '考勤打卡'
      this.newDate = new Date().toTimeString().split(" ")[0];
      this.getLocation();
    } else if (this.activeName == "d") {
      //撤桶登记
      let codeNum = localStorage.getItem("myCodeNum");
      this.tabMark = "d";
       document.title = '撤桶登记'
      this.$http({
        url: this.$http.adornUrl(
          `/garbage/garbageShift/wxList?codeNum=${codeNum}`
        ),
        method: "get",
        params: this.$http.adornParams({}),
      }).then(({ data }) => {
        //console.log("撤桶登记数据为", data);
        if (data && data.code == 0) {
          data.data.forEach((item, index) => {
            if (item.status == "1") {
              item.withdrawEntity = {};
              item.withdrawEntity.id = item.id;
            }
          });
          this.removeBarrelList = data.data;
        }
      });
    } else if (this.activeName == "c") {
      //保洁登记
      this.tabMark = "c";
       document.title = '保洁登记'
      var timeArray = new Date().toLocaleDateString().split("/");
      timeArray[1] =
        parseInt(timeArray[1]) < 10 ? "0" + timeArray[1] : timeArray[1];
      timeArray[2] =
        parseInt(timeArray[2]) < 10 ? "0" + timeArray[2] : timeArray[2];
      var time = timeArray.join("-");
      this.$http({
        url: this.$http.adornUrl(`/garbage/garbageWithdraw/showRecord`),
        method: "post",
        data: this.$http.adornData({
          startTime: time,
          endTime: time,
          type: "2",
          id: localStorage.getItem("classifyId"),
        }),
      }).then(({ data }) => {
        //console.log("保洁数据为", data);
        if (data && data.code === 0) {
          this.cleanDetailArray = data.data;
        }
      });
    }
    this.$http({
      url: this.$http.adornUrl(`/garbage/garbageRole/getRole?openId=${openId}`),
      method: "get",
      params: this.$http.adornParams({}),
    }).then(({ data }) => {
      //console.log("权限数据为", data);
      if (data && data.code == 0) {
          if(data.data.memberEntity.menuList.length == 0) {
            this.$router.push('/noLimit')
            return false
          }
          data.data.memberEntity.menuList.forEach((item,index) => {
            limitArr.push(item.menuCode)
          })
          if(!limitArr.includes('KQDK') && !limitArr.includes('BJDJ') && !limitArr.includes('CTDJ') && !limitArr.includes('XCXJ') && !limitArr.includes('CZDJ') && !limitArr.includes('KQJL')
               && !limitArr.includes('BJJL') && !limitArr.includes('CTJL') && !limitArr.includes('XCJL') && !limitArr.includes('CZJL')) {
            this.$router.push('/noLimit')
            return false
          }
        data.data.memberEntity.menuList.unshift({menuCode: "JBXX"})
        this.limitList = data.data.memberEntity.menuList
        // this.limitList = [
        //   { menuCode: "JBXX" },
        //   { menuCode: "KQJL" },
        //   { menuCode: "KQDK" },
        //   { menuCode: "CTDJ" },
        //   { menuCode: "BJDJ" },
        //   { menuCode: "XCXJ" },
        //   {menuCode: "BJJL"},
        //   {menuCode: "CTJL"},
        //   {menuCode: "CZJL"}
        // ];
        this.limitList.forEach((item) => {
          if(item.menuCode == "CZDJ") {
            this.showHandleRegisterButton = true
          }
        })
        this.personObj = data.data.memberEntity;
        localStorage.setItem("personObjId", this.personObj.id);
      }
    });
    this.$http({
      url: this.$http.adornUrl(
        `/sys/sysdictionary/getSysDictionaryListByCode?code=sort_point_status`
      ),
      method: "get",
      params: this.$http.adornParams({}),
    }).then(({ data }) => {
      //console.log("处置登记列表为", data);
      if (data && data.code === 0) {
        var columns = []
        var columnsId = []
        data.data.forEach((item) => {
          columns.push(item.name);
          columnsId.push(item.code)
        });
        this.columns = columns
        this.statusIndexArr = columnsId
      }
    });
    this.$http({
      url: this.$http.adornUrl(
        `/garbage/garbageSortPoint/wxInfo?codeNum=${codeNum}`
      ),
      method: "post",
      data: this.$http.adornData({}),
    }).then(({ data }) => {
      //console.log("基本信息数据为", data);
      if (data && data.code == 0) {
        this.classifyId = data.data.data.id;
        localStorage.setItem("classifyId", this.classifyId);
        this.classifyName = data.data.data.name;
        localStorage.setItem("classifyName", this.classifyName);
        this.Community.status = data.data.data.status;
        this.Community.communityName = data.data.data.townName;
        this.Community.villageName = data.data.data.village;
        this.Community.villageCharacter = data.data.data.villageType;
        this.Community.delegateMember = data.data.data.delegating;
        this.Community.throwTime = data.data.data.launchTimeList;
        this.Community.leader = data.data.data.mailContactor.name;
        this.Community.removeBarrelTimes = data.data.barrelCount;
        this.Community.removeBarrelPercent = data.data.barrelPercent;
        this.Community.cleanTimes = data.data.cleanCount;
        this.Community.recyclePercent = data.data.recyclablePercent;
        this.Community.otherRubbishDecreasePercent = data.data.otherReduce;
        this.Community.yellowTimes = data.data.yellowCount;
        this.Community.redTimes = data.data.redCount;
        this.Community.refuseTimes = data.data.rejectCount;
        this.Community.change = data.data.changeCount;
        this.Community.punishContent = data.data.punishCount;
        this.Community.checkTimes = data.data.instanceCount;
        this.Community.abnormalTimes = data.data.errorInvestigation;
        this.Community.imgList = data.data.data.imgList
        this.Community.mailContactorEntity = data.data.data.mailContactorEntity
        this.clockPlace = data.data.data.place;
        this.Community.launchType = data.data.data.launchType
        this.patrolInspection.investigationInforList =
          data.data.data.investigationInforList; //拿到巡查巡检列表数据
        this.patrolInspection.longitude = data.data.data.longitude;
        this.patrolInspection.latitude = data.data.data.latitude;
        this.patrolInspection.place = data.data.data.place;
        if (this.activeName == "e") {
           document.title = '巡查巡检'
          this.getPatrolInspection();
        }
      }
    });
  },
  watch: {
    removeFileList(newVal, oldVal) {
      //console.log(newVal, oldVal);
      //新值的长度小于旧值，说明图片被删除
      if (newVal.length < oldVal.length) {
        oldVal.forEach((val, index) => {
          if (!newVal.includes(val)) {
            //console.log(newVal.includes(val), index);
            //将被删除的图片通过索引进行删除
            this.imgList.splice(index, 1);
          }
        });
      }
    },
  },
   components: {
    imagePreview,
    fileUpload,
    Loading
  },
};
</script>
<style lang="less" scoped>
  .workAttendanceNew {
    font-size: 0.32rem;
    .navHeader {
      .itemWrapper {
        /deep/ .van-tabs__wrap {
          /deep/ .van-tabs__nav--card {
            margin: 0;
            border: 0;
          }
          /deep/ .van-tab {         
            font-size: .28rem;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #666666;
          }
          /deep/ .van-tab--active {         
            font-size: .28rem;
            font-family: PingFangSC-Semibold, PingFang SC;
            font-weight: 1800;
            color: #333333;
          }
        }
        .basicMessage {
          .messageContainer {
            position: relative;
            background-color: #fff;
            font-size: 0.32rem;
            margin: 0 .2rem;
            margin-top: .2rem;
            .headerTitle {
              text-align: left;
              width: 6.3rem;
              // height: 1.11rem;
              font-size: 0.32rem;
              font-family: PingFangSC-Medium, PingFang SC;
              font-weight: 1000;
              color: #333333;
              line-height: 1.11rem;
              margin-left: 0.38rem;
              border-bottom: 0.01rem solid #ddd;
            }

            .pointStatus {
              display: flex;
              width: 6.3rem;
              margin-left: .38rem;
              height: .9rem;
              align-items: center;
              .statusTitle {               
              font-size: .32rem;
              font-family: PingFangSC-Medium, PingFang SC;
              font-weight: 1000;
              color: #666666;
              margin-right: .22rem;
              }

              .status {
                height: .4rem;
                border-radius: .2rem;               
                font-size: .24rem;
                font-family: PingFangSC-Medium, PingFang SC;
                font-weight: 500;
                color: #16C88B;                
                background: rgba(22, 200, 139, 0.08);
                padding: 0.02rem 0.16rem;
              }
              .yellowstatus {
                height: .4rem;
                background: rgba(248, 177, 12, 0.08);
                border-radius: .2rem;
                font-size: .24rem;
                font-family: PingFangSC-Medium, PingFang SC;
                font-weight: 500;
                color: #FFBB1D;
                padding: 0.02rem 0.16rem;
              }

              .redstatus {           
                height: .4rem;
                background: rgba(249, 78, 54, 0.08);
                border-radius: .2rem;
                font-size: .24rem;
                font-family: PingFangSC-Medium, PingFang SC;
                font-weight: 500;
                color: #F94E36;
                padding: 0.02rem 0.16rem;
              }

              .rejectstatus {               
                height: .4rem;
                background: rgba(0, 0, 0, 0.08);
                border-radius: .2rem;
                font-size: .24rem;
                font-family: PingFangSC-Medium, PingFang SC;
                font-weight: 500;
                color: #999999;
                padding: 0.02rem 0.16rem;
              }

              .punishstatus {
                height: .4rem;
                background: rgba(54, 139, 249, 0.08);
                border-radius: .2rem;
                font-size: .24rem;
                font-family: PingFangSC-Medium, PingFang SC;
                font-weight: 500;
                color: #0091FF;
                padding: 0.02rem 0.16rem;
              }
              .punishstatus2 {
                height: .4rem;
                border-radius: .2rem;
                border: .01rem solid rgba(255, 129, 113, 0.51);
                font-size: .24rem;
                font-family: PingFangSC-Medium, PingFang SC;
                font-weight: 500;
                color: #FF8171;
                padding: 0.02rem 0.16rem;
              }
            }

            .imgWrapper {
              display: flex;
              flex-wrap: wrap;
              padding-left: .12rem;
              img {
                position: static;
                width: 3.13rem;
                height: 1.76rem;
                margin-left: .2rem;
              }
            }
          .topContentWrapper {
            margin: 0 0.4rem;          
            font-size: .28rem;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #999999;
            padding-bottom: .4rem;
            border-bottom: 0.01rem solid #DDDDDD;
            .communityContainer {
              display: flex;
              margin-top: .2rem;
              justify-content: space-between;
              .communityTitle {
              }

              .communityName {              
              font-size: .28rem;
              font-family: PingFangSC-Regular, PingFang SC;
              font-weight: 400;
              color: #333333;
              }
            }

            .villageContainer {
              display: flex;
              margin-top: .2rem;
              justify-content: space-between;
              .villageTitle {
              }

              .village {
                font-size: .28rem;
                font-family: PingFangSC-Regular, PingFang SC;
                font-weight: 400;
                color: #333333;
              }
            }

            .villageCharacter {
              display: flex;
              margin-top: .2rem;
              justify-content: space-between;
              .villageCharacterTitle {
              }

              .character {
                font-size: .28rem;
                font-family: PingFangSC-Regular, PingFang SC;
                font-weight: 400;
                color: #333333;
              }
            }

            .delegateParty {
              display: flex;
              margin-top: .2rem;
              justify-content: space-between;
              .delegateTitle {
              }

              .delegateMember {
                font-size: .28rem;
                font-family: PingFangSC-Regular, PingFang SC;
                font-weight: 400;
                color: #333333;
              }
            }

            .throwTime {
              display: flex;
              margin-top: .2rem;
              justify-content: space-between;
              .throwTitle {
              }

              .throwTim {
                font-size: .28rem;
                font-family: PingFangSC-Regular, PingFang SC;
                font-weight: 400;
                color: #333333;
              }
            }

            .leaderContainer {
              display: flex;
              margin-top: .2rem;
              justify-content: space-between;
              .leaderTitle {
              }
              .personWrapper {
                font-size: .28rem;
                font-family: PingFangSC-Regular, PingFang SC;
                font-weight: 400;
                color: #333333;
                display: flex;
                .leader {

                }

                .phone {

                }

                img {
                  position: static;
                  width: .34rem;
                  height: .44rem;
                }
              }
            }
          }
          .bottomContentWrapper {
            margin: 0 0.4rem;          
            font-size: .28rem;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #999999;
            .removeBarrelContainer {
              display: flex;
              margin-top: .2rem;
              justify-content: space-between;
              .removeBarrelTitle {
              }

              .removeBarrelPercent {
                font-size: .28rem;
                font-family: PingFangSC-Regular, PingFang SC;
                font-weight: 400;
                color: #333333;
              }
            }

            .keepClean {
              display: flex;
              margin-top: .2rem;
              justify-content: space-between;
              .cleanTitle {
              }

              .cleanTimes {
                font-size: .28rem;
                font-family: PingFangSC-Regular, PingFang SC;
                font-weight: 400;
                color: #333333;
              }
            }

            .rubbishRecycleContainer {
              display: flex;
              margin-top: .2rem;
              justify-content: space-between;
              .rubbishRecycleTitle {
              }

              .recyclePercent {
                font-size: .28rem;
                font-family: PingFangSC-Regular, PingFang SC;
                font-weight: 400;
                color: #333333;
              }
            }

            .otherRubbishContainer {
              display: flex;
              margin-top: .2rem;
              justify-content: space-between;
              .otherTitle {
              }

              .rubbishDecreasePercent {
                font-size: .28rem;
                font-family: PingFangSC-Regular, PingFang SC;
                font-weight: 400;
                color: #333333;
              }
            }

            .yellowContainer {
              display: flex;
              margin-top: .2rem;
              justify-content: space-between;
              .yellowTitle {
              }

              .yellowTimes {
                font-size: .28rem;
                font-family: PingFangSC-Regular, PingFang SC;
                font-weight: 400;
                color: #333333;
              }
            }

            .redContainer {
              display: flex;
              margin-top: .2rem;
              justify-content: space-between;
              .redTitle {
              }

              .redTimes {
                font-size: .28rem;
                font-family: PingFangSC-Regular, PingFang SC;
                font-weight: 400;
                color: #333333;
              }
            }

            .refuseContainer {
              display: flex;
              margin-top: .2rem;
              justify-content: space-between;
              .refuseTitle {
              }

              .refuseTimes {
                font-size: .28rem;
                font-family: PingFangSC-Regular, PingFang SC;
                font-weight: 400;
                color: #333333;
              }
            }

            .changeContainer {
              display: flex;
              margin-top: .2rem;
              justify-content: space-between;
              .changeTitle {
              }

              .change {
                font-size: .28rem;
                font-family: PingFangSC-Regular, PingFang SC;
                font-weight: 400;
                color: #333333;
              }
            }

            .punishContainer {
              display: flex;
              margin-top: .2rem;
              justify-content: space-between;
              .punishTitle {
              }

              .punishContent {
                font-size: .28rem;
                font-family: PingFangSC-Regular, PingFang SC;
                font-weight: 400;
                color: #333333;
              }
            }

            .checkContainer {
              display: flex;
              margin-top: .2rem;
              justify-content: space-between;
              .checkTitle {
              }

              .checkTimes {
                font-size: .28rem;
                font-family: PingFangSC-Regular, PingFang SC;
                font-weight: 400;
                color: #333333;
              }
            }

            .projectAbnormalContainer {
              display: flex;
               margin-top: .2rem;
              justify-content: space-between;
              .abnormalTitle {
              }

              .abnormalTimes {
                font-size: .28rem;
                font-family: PingFangSC-Regular, PingFang SC;
                font-weight: 400;
                color: #333333;
              }
            }
          }
            img {
              position: absolute;
              top: 0;
              right: 0;
              width: 0.8rem;
              height: 0.8rem;
            }
            //处置登记状态选择器
            .van-picker {
              position: fixed;
              left: 0;
              right: 0;
              bottom: 0;             
              height: 7.14rem;
              background: #FFFFFF;
              border-radius: .28rem .28rem 0rem 0rem;
            /deep/ .van-picker__toolbar {
              height: .94rem;
            /deep/ .van-picker__title {             
              font-size: .36rem;
              font-family: PingFangSC-Medium, PingFang SC;
              font-weight: 700;
              color: #333333;
            }
            /deep/ .van-picker__cancel {
              width: .48rem;
              height: .48rem;
              color: #666666;
              }
            /deep/ .van-picker__confirm {             
              font-size: .32rem;
              font-family: PingFangSC-Regular, PingFang SC;
              font-weight: 400;
              color: #0091FF;
            }
            }
          /deep/ .van-picker-column__item  {             
              font-size: .32rem;
              font-family: PingFangSC-Regular, PingFang SC;
              font-weight: 400;
              color: #999999;
          }
          /deep/ .van-picker-column__item--selected {
              font-size: .32rem;
              font-family: PingFangSC-Medium, PingFang SC;
              font-weight: 700;
              color: #333333;
          }
            }
          }
          .recordContainer {
              padding-left: .08rem;
              margin-top: .2rem;
              display: flex;
              color: #02a7f0;
              font-size: .32rem;
              height: .85rem;
              background: #FFFFFF;
              align-items: center;
              .recordSlide {
                width: 1.35rem;
                height: .45rem;
                border-radius: .29rem;
                border: 0.01rem solid #999999;
                font-size: .24rem;
                font-family: PingFangSC-Regular, PingFang SC;
                font-weight: 400;
                color: #999999;
                text-align: center;
                line-height: .45rem;
                margin-left: .1rem;
              }
            }
          .buttonWrapper {
            background-color: #fff;
            padding: .42rem .55rem .21rem .55rem;
            border-top: .01rem solid #E8E8E8;
            .handleRegisterButton {
              color: #fff;
              text-align: center;
              width: 6.4rem;
              height: .9rem;             
              background: linear-gradient(360deg, #2B80FF 0%, #65BCFF 100%);
              box-shadow: 0rem .06rem .12rem 0rem rgba(12, 126, 161, 0.35);
              border-radius: .75rem;           
              font-size: .36rem;
              font-family: PingFangSC-Regular, PingFang SC;
              font-weight: 400;
              color: #FFFFFF;
              line-height: .9rem;
            }
          }
          //处置登记弹框
          .van-popup {            
            height: 7.14rem;
            background: #FFFFFF;
            border-radius: .28rem .28rem 0rem 0rem;
            padding-left: .4rem;
            box-sizing: border-box;
           .headerWrapper {
             display: flex;
             height: 1.36rem;
             align-items: center;
              img {
                width: .48rem;
                height: .48rem;
              }

              .headerTitle {
                flex: 1;               
                font-size: .36rem;
                font-family: PingFangSC-Medium, PingFang SC;
                font-weight: 700;
                color: #333333;
                text-align: center;
              }

              .confirmText {              
                font-size: .32rem;
                font-family: PingFangSC-Regular, PingFang SC;
                font-weight: 400;
                color: #0091FF;
                margin-right: .4rem;
              }
            }

            .takePictureWrapper {
              width: 6.7rem;
              padding-bottom: .3rem;
              border-bottom: .01rem solid #DDD;
              .dialogHeader {
                font-size: 0.32rem;
                // padding-top: 0.5rem;
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

            .optional {
              //盒子模型
              width: 6.7rem;
              margin-top: .3rem;
              .optionalTitleRemark {               
              height: .45rem;
              font-size: .32rem;
              font-family: PingFangSC-Regular, PingFang SC;
              font-weight: 400;
              color: #333333;
              }

              textarea {
                border: 0;
                // float: left;
                width: 6.7rem;                
                font-size: .32rem;
                font-family: PingFangSC-Regular, PingFang SC;
                font-weight: 400;
                color: #333333;
              }
            }

            .confirmClockIn {
              width: 98vw;
              color: #fff;
              font-size: 0.32rem;
              background-color: #02a7f0;
              border-radius: 16px;
              text-align: center;
              height: 0.8rem;
              line-height: 0.8rem;
            }
          }
        }
        .attendanceWrapper {
          .attendanceClockIn {
            padding: .2rem;
            .personContainer {
              display: flex;
              position: relative;
              justify-content: space-between;
              font-size: 0.16rem;
              background-color: #fff;
              width: 7.1rem;
              height: 1.4rem;
              .personMessageWrapper {
                display: flex;
                align-items: center;
                padding-left: .24rem;
                img.personAvatar {
                  width: 0.8rem;
                  height: 0.8rem;
                  border-radius: 50%;
                }

                .personWrapper {
                  font-size: 0.32rem;
                  margin-left: .24rem;
                  border-radius: .08rem;
                  .personNameWrapper {
                    display: flex;                  
                    font-size: .32rem;
                    font-family: PingFangSC-Regular, PingFang SC;
                    font-weight: 500;
                    color: #333333;
                    .personName {
                    }

                    .isPartyMember {
                    }
                  }

                  .place {                   
                    font-size: .32rem;
                    font-family: PingFangSC-Regular, PingFang SC;
                    font-weight: 400;
                    color: #999999;
                  }
                }
              }

              .attendanceRecord {
                width: 1.42rem;
                height: .46rem;
                background: rgba(255, 255, 255, 0);
                border-radius: .23rem;
                border: 1px solid #0091FF;
                font-size: .28rem;
                font-family: PingFangSC-Regular, PingFang SC;
                font-weight: 400;
                color: #0091FF;
                text-align: center;
                line-height: .46rem;
                margin-top: .48rem;
                margin-right: .24rem;
              }

              .statusImg {
                width: 0.6rem;
                height: 0.6rem;
                position: absolute;
                right: 0;
                top: 0;
              }
            }

            .clockInContainer {
              background-color: #fff;
              border-radius: .08rem;
              margin-top: 0.2rem;
              padding-top: .3rem;
              padding-bottom: 3.35rem;
              margin-bottom: .2rem;
              .attendanceTime {
                display: flex;
                align-items: center;               
                font-size: .28rem;
                font-family: PingFangSC-Medium, PingFang SC;
                font-weight: 500;
                color: #666666;
                margin-left: 1.24rem;
                .beforeTime {
                  width: .15rem;
                  height: .34rem;
                  }

                  .timeWrapper {
                    margin: 0 .03rem;
                  }

                  .afterTime {
                    width: .15rem;
                    height: .34rem;
                  }
              }

              .attendanceClockInContainer {
                display: flex;
                flex-wrap: wrap;
                margin-top: .1rem;
                padding: 0 .04rem;
                .ClockInSlide {                 
                  background: #F6F6F8;
                  border-radius: .08rem;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  height: 0.9rem;
                  width: 3.21rem;                
                  font-size: .32rem;
                  font-family: PingFangSC-Regular, PingFang SC;
                  font-weight: 400;
                  color: #333333;
                  margin-left: .2rem;
                  margin-top: .2rem;
                  .trueIcon {
                    width: 0.3rem;
                    height: 0.3rem;
                    display: flex;
                    img {
                      width: 0.3rem;
                      height: 0.3rem;
                    }
                  }

                  .clockInTitle {                  
                    font-size: .32rem;
                    font-family: PingFangSC-Regular, PingFang SC;
                    font-weight: 400;
                    color: #333333;
                  }
                }

                .refreshAttendanceSlide {
                  width: 3.21rem;
                  height: .9rem;
                  background: #F6F6F8;
                  border-radius: .08rem;
                  font-size: .32rem;
                  font-family: PingFangSC-Regular, PingFang SC;
                  font-weight: 400;
                  color: #0091FF;                 
                  text-align: center;
                  line-height: .9rem;
                  margin-top: .2rem;
                  margin-left: .2rem;
                  .refreshTitle {
                  }
                }
              }
              .outOfCompass {
                margin-top: .7rem;
                .outOfGlobal {
                  width: 2.76rem;
                  height: 2.76rem;
                  background-color: #ccc;
                  border-radius: 50%;
                  margin: 0 auto;
                  text-align: center;
                  color: #fff;
                  padding-top: 0.8rem;
                  box-sizing: border-box;
                  .outOfTitle {                   
                  font-size: .4rem;
                  font-family: PingFangSC-Medium, PingFang SC;
                  font-weight: 500;
                  color: #FFFFFF;
                  }

                  .attendanceTime {                   
                  font-size: .32rem;
                  font-family: SFProRounded-Regular, SFProRounded;
                  font-weight: 400;
                  color: #FFFFFF;
                  margin-left: 0;
                  margin-left: .7rem;
                  }
                }

                .locationWrapper {
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  margin-top: .46rem;
                  
                  .locationIcon {
                    width: 0.26rem;
                    height: 0.32rem;
                    display: flex;
                    img {
                      width: 0.26rem;
                      height: 0.32rem;
                    }
                  }

                  .locationTitle {                   
                    font-size: .24rem;
                    font-family: PingFangSC-Regular, PingFang SC;
                    font-weight: 400;
                    color: #6D7278;
                    width: 5.3rem;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    margin: 0 .09rem;
                  }

                  .refreshIcon {
                    width: 0.24rem;
                    height: 0.24rem;
                    display: flex;
                    img {
                      width: 0.24rem;
                      height: 0.24rem;
                    }
                  }
                }
              }

              .InOfCompass {
                margin-top: .7rem;
                .InOfGlobal {
                  width: 2.76rem;
                  height: 2.76rem;
                  border-radius: 50%;
                  background: linear-gradient(331deg, #2B80FF 0%, #65BCFF 100%);
                  box-shadow: 0rem .05rem .2rem 0rem rgba(168, 210, 244, 0.83);
                  margin: 0 auto;
                  color: #fff;
                  text-align: center;
                  padding-top: .8rem;
                  box-sizing: border-box;
                  .outOfTitle {                   
                  font-size: .4rem;
                  font-family: PingFangSC-Medium, PingFang SC;
                  font-weight: 500;
                  color: #FFFFFF;
                  }

                  .attendanceTime {                 
                  font-size: .32rem;
                  font-family: SFProRounded-Regular, SFProRounded;
                  font-weight: 400;
                  color: #FFFFFF;
                  margin-left: 0;
                  margin-left: .75rem;
                  }
                }
                //盒子模型
                .locationWrapper {
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  margin-top: .46rem;
                  .locationIcon {
                    width: 0.24rem;
                    height: 0.24rem;
                    display: flex;
                    img {
                      width: 0.24rem;
                      height: 0.24rem;
                    }
                  }

                  .locationTitle {                 
                    font-size: .24rem;
                    font-family: PingFangSC-Regular, PingFang SC;
                    font-weight: 400;
                    color: #6D7278;
                    width: 5.3rem;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    margin-left: .09rem;
                  }
                }
              }

              .leaveClockIn {
                //外观
                margin-top: .7rem;
                .leaveOfGlobal {
                  width: 2.76rem;
                  height: 2.76rem;
                  border-radius: 50%;
                  background: linear-gradient(331deg, #2B80FF 0%, #65BCFF 100%);
                  box-shadow: 0rem .05rem .2rem 0rem rgba(168, 210, 244, 0.83);
                  margin: 0 auto;
                  color: #fff;
                  text-align: center;
                  padding-top: .8rem;
                  box-sizing: border-box;
                  .outOfTitle {                   
                  font-size: .4rem;
                  font-family: PingFangSC-Medium, PingFang SC;
                  font-weight: 500;
                  color: #FFFFFF;
                  .outOfTitle {
                    font-size: .4rem;
                    font-family: PingFangSC-Medium, PingFang SC;
                    font-weight: 500;
                    color: #FFFFFF;
                  }
                  //外观
                  .attendanceTime2 {
                    font-size: 0.32rem;
                    font-family: SFProRounded-Regular, SFProRounded;
                    font-weight: 400;
                    color: #FFFFFF;
                    margin-left: 0;
                    margin-left: .75rem;
                  }
                }
                }

                //盒子模型
                .locationWrapper {
                   display: flex;
                  justify-content: center;
                  align-items: center;
                  margin-top: .46rem;
                  .locationIcon {
                    width: 0.24rem;
                    height: 0.24rem;
                    display: flex;
                    img {
                      width: 0.24rem;
                      height: 0.24rem;
                    }
                  }

                  .locationTitle {
                    font-size: .24rem;
                    font-family: PingFangSC-Regular, PingFang SC;
                    font-weight: 400;
                    color: #6D7278;
                    width: 5.3rem;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    margin-left: .09rem;
                  }
                }
              
            }
            }
            .bottomRecord {
              .van-collapse {
                .van-collapse-item {
                  .titleContainer {
                    display: flex;
                    justify-content: space-between;
                    font-size: 0.32rem;
                  }
                  .attendanceClockInContainer {
                    display: flex;
                    flex-wrap: wrap;
                    
                    .ClockInSlide {                 
                  background: #F6F6F8;
                  border-radius: .08rem;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  height: 0.9rem;
                  width: 3.21rem;                
                  font-size: .32rem;
                  font-family: PingFangSC-Regular, PingFang SC;
                  font-weight: 400;
                  color: #333333;
                  margin-left: .2rem;
                  margin-top: .2rem;
                  .trueIcon {
                    width: 0.3rem;
                    height: 0.3rem;
                    display: flex;
                    img {
                      width: 0.3rem;
                      height: 0.3rem;
                    }
                  }

                  .clockInTitle {                  
                    font-size: .32rem;
                    font-family: PingFangSC-Regular, PingFang SC;
                    font-weight: 400;
                    color: #333333;
                  }
                }

                    .refreshAttendanceSlide {
                      background-color: #f5f5f5;
                      font-size: 0.16rem;
                      display: flex;
                      justify-content: center;
                      align-items: center;
                      color: skyblue;
                      margin-left: 0.2rem;
                      .refreshIcon {
                        width: 0.3rem;
                        height: 0.3rem;
                        display: flex;
                        img {
                          width: 0.3rem;
                          height: 0.3rem;
                        }
                      }

                      .refreshTitle {
                      }
                    }
                  }
                }
              }
            }

            .bottomkaoqRecordNotClock {
              width: 7.1rem;
              height: .98rem;
              background: #FFFFFF;
              border-radius: .08rem;
              line-height: .98rem;
              .titleContainer {
                display: flex;
                align-items: center;
                .lastTime {                  
                font-size: .28rem;
                font-family: PingFangSC-Medium, PingFang SC;
                font-weight: 500;
                color: #999999;
                }

                .statusTitle {
                  width: 1.04rem;
                  height: .4rem;
                  background: rgba(249, 78, 54, 0.08);
                  border-radius: .2rem;
                  font-size: .24rem;
                  font-family: PingFangSC-Medium, PingFang SC;
                  font-weight: 500;
                  color: #F94E36;
                  text-align: center;
                  line-height: .4rem;
                  margin-left: .15rem;
                }
              }
            }
            //打卡弹框
            .van-popup {              
                  height: 7.14rem;
                  background: #FFFFFF;
                  border-radius: .28rem .28rem 0rem 0rem;
                  box-sizing: border-box;
                  padding: 0 .4rem;
              .titleWrapper {
                display: flex;
                height: 1.1rem;
                box-sizing: border-box;
                padding-top: .4rem;
                img {
                  width: .48rem;
                  height: .48rem;
                }
              .dialogHeader {               
                  font-size: .36rem;
                  font-family: PingFangSC-Medium, PingFang SC;
                  font-weight: 700;
                  color: #333333;
                  margin-left: 1.84rem;
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

              .confirmClockIn {
                width: 4.8rem;
                height: .8rem;
                background: linear-gradient(360deg, #2B80FF 0%, #65BCFF 100%);
                box-shadow: 0rem .06rem .12rem 0rem rgba(12, 126, 161, 0.35);
                border-radius: .45rem;
                font-size: .32rem;
                font-family: PingFangSC-Regular, PingFang SC;
                font-weight: 400;
                color: #FFFFFF;
                text-align: center;
                line-height: .8rem;
                margin: 0 auto;
                margin-top: .5rem;
              }
            }
            //打卡成功弹框
            .van-popup {            
              height: 7.14rem;
              background: #FFFFFF;
              border-radius: .28rem .28rem 0rem 0rem;
              .titleWrapper {
                height: .94rem;
                .dialogHeader {
                  
                font-size: .36rem;
                font-family: PingFangSC-Medium, PingFang SC;
                font-weight: 600;
                color: #333333;
                margin: 0 auto;
                }
              }

              .successImgWrapper {
                text-align: center;
                margin-top: .69rem;
                img {
                  width: 1.58rem;
                  height: 1.5rem;
                }
              }

              .successText {
                
                font-size: .32rem;
                font-family: PingFangSC-Medium, PingFang SC;
                font-weight: 500;
                color: #666666;
                margin-top: .52rem;
                text-align: center;
              }

              .enterNextClock {
                
                font-size: .32rem;
                font-family: PingFangSC-Medium, PingFang SC;
                font-weight: 500;
                color: #666666;
                margin-top: .12rem;
                text-align: center;
              }

              .confirmButton {
                width: 4.8rem;
                height: .8rem;
                background: linear-gradient(360deg, #2B80FF 0%, #65BCFF 100%);
                box-shadow: 0rem .06rem .12rem 0rem rgba(12, 126, 161, 0.35);
                border-radius: .45rem;
                text-align: center;
                line-height: .8rem;                
                font-size: .32rem;
                font-family: PingFangSC-Regular, PingFang SC;
                font-weight: 400;
                color: #FFFFFF;
                margin: 0 auto;
                margin-top: 1.35rem;
              }
            }
            .van-popup {
            
              .headerTitle {
                font-size: 0.4rem;
                text-align: center;
                padding-top: 0.3rem;
              }

              .clockInIcon {
                img {
                }
              }

              .clockInTime {
                font-size: 0.16rem;
              }

              .imgContainer {
                display: flex;
                justify-content: center;
                align-items: center;
                img {
                  width: 0.8rem;
                  height: 0.8rem;
                }
              }

              .remarkContainer {
                .remarkTitle {
                  text-align: left;
                  font-size: 0.32rem;
                }

                .remarkContent {
                  font-size: 0.32rem;
                  text-align: left;
                }
              }
            }
          }
        }

        .cleaningRegisterWrapper {
          margin-bottom: 2.36rem;
          .cleaningRegister {
            padding: 0 .2rem;
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

            .CleanDetainWrapper {
              //盒子模型
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
                img {
                  width: .23rem;
                  height: .34rem;
                  position: static;
                }
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
            .recordWrapper2 {
              position: fixed;
              bottom: 0;
              left: 0;
              right: 0;
              height: 2.36rem;
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
            //添加保洁记录的弹框
            .van-popup {            
            height: 7.14rem;
            background: #FFFFFF;
            border-radius: .28rem .28rem 0rem 0rem;
            padding-left: .4rem;
            box-sizing: border-box;
           .headerWrapper {
             display: flex;
             height: 1.36rem;
             align-items: center;
              img {
                width: .48rem;
                height: .48rem;
              }

              .headerTitle {
                flex: 1;               
                font-size: .36rem;
                font-family: PingFangSC-Medium, PingFang SC;
                font-weight: 700;
                color: #333333;
                text-align: center;
              }

              .confirmText {              
                font-size: .32rem;
                font-family: PingFangSC-Regular, PingFang SC;
                font-weight: 400;
                color: #0091FF;
                margin-right: .4rem;
              }
            }

            .takePictureWrapper {
              width: 6.7rem;
              padding-bottom: .3rem;
              border-bottom: .01rem solid #DDD;
              .dialogHeader {
                font-size: 0.32rem;
                // padding-top: 0.5rem;
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

            .optional {
              //盒子模型
              width: 6.7rem;
              margin-top: .3rem;
              .optionalTitleRemark {               
              height: .45rem;
              font-size: .32rem;
              font-family: PingFangSC-Regular, PingFang SC;
              font-weight: 400;
              color: #333333;
              }

              textarea {
                border: 0;
                // float: left;
                width: 6.7rem;                
                font-size: .32rem;
                font-family: PingFangSC-Regular, PingFang SC;
                font-weight: 400;
                color: #333333;
              }
            }

            .confirmClockIn {
              width: 98vw;
              color: #fff;
              font-size: 0.32rem;
              background-color: #02a7f0;
              border-radius: 16px;
              text-align: center;
              height: 0.8rem;
              line-height: 0.8rem;
            }
          }
          //查看保洁详情的弹框
            .van-popup {
              .headerWrapper {
             display: flex;
             height: 1.36rem;
             align-items: center;
              img {
                width: .48rem;
                height: .48rem;
              }

              .headerTitle {
                // flex: 1;               
                font-size: .36rem;
                font-family: PingFangSC-Medium, PingFang SC;
                font-weight: 700;
                color: #333333;
                text-align: center;
                margin-right: .3rem;
              }

              .confirmText {              
                font-size: .32rem;
                font-family: PingFangSC-Regular, PingFang SC;
                font-weight: 400;
                color: #0091FF;
                margin-right: .4rem;
              }
            }
              .cleanDetail {
                // display: flex;
                // justify-content: space-between;
                width: 6.7rem;
                font-size: 0.32rem;
                border-bottom: .01rem solid #ddd;
                padding-bottom: .2rem;
                .cleanTime {                  
                font-size: .32rem;
                font-family: PingFangSC-Medium, PingFang SC;
                font-weight: 500;
                color: #333333;
                }

                .cleaner {                 
                font-size: .28rem;
                font-family: PingFangSC-Regular, PingFang SC;
                font-weight: 400;
                color: #999999;
                margin-top: .08rem;
                
                }
              }

              .imgWrapper {
                // display: flex;
                padding-bottom: .32rem;
                border-bottom: .01rem solid #ddd;
                .takePicTitle {
                width: 1.28rem;
                height: .45rem;
                font-size: .32rem;
                font-family: PingFangSC-Regular, PingFang SC;
                font-weight: 400;
                color: #333333;
                margin-top: .2rem;
                
                }

                .imgContainer {
                  display: flex;
                  flex-wrap: wrap;
                  img {
                    width: 1.53rem;
                    height: 1.53rem;
                  }
                }
              }

              .remarkContainer {
                padding-top: .3rem;
                .remark {                  
                  font-size: .32rem;
                  font-family: PingFangSC-Regular, PingFang SC;
                  font-weight: 400;
                  color: #333333;
                }

                .remarkContent {                 
                  font-size: .32rem;
                  font-family: PingFangSC-Regular, PingFang SC;
                  font-weight: 400;
                  color: #333333;
                }
              }
            }
          }
        }

        .removeBarrelWrapper {
          padding: 0 .2rem;
          .removeBarrelContainer {
            .removeBarrelDetail {
              background-color: #fff;
              position: relative;
              width: 7.1rem;
              height: 1.59rem;
              margin-top: .2rem;              
              box-shadow: 0rem .04rem .04rem -0.1rem rgba(0, 0, 0, 0.1);
              border-radius: .08rem;
              padding-top: .28rem;
              .removeBarrelSlide {
                // display: flex;
                position: absolute;
                right: 0;
                top: 0;
                img {
                  width: .8rem;
                  height: .8rem;
                }
              }

              .removeBarrelClass {               
                font-size: .32rem;
                font-family: PingFangSC-Medium, PingFang SC;
                font-weight: 700;
                color: #333333;
                margin-left: .4rem;
                
              }
            }

            .removeBarrelHistoryRecordTitle {
              height: 0.82rem;             
              font-size: .28rem;
              font-family: PingFangSC-Regular, PingFang SC;
              font-weight: 400;
              color: #0091FF;
              text-align: center;
              display: flex;
              position: fixed;
              bottom: 0;
              left: 0;
              right: 0;
              justify-content: center;
              img {
                width: .34rem;
                height: .34rem;
              }
            }
          }
          .removeBarrelClassDialog {
            .van-popup {             
              height: 12.66rem;
              background: #FFFFFF;
              border-radius: .28rem .28rem 0rem 0rem;
              .removeBarrelClassTitle {
                height: 1.1rem;
                display: flex;
                padding-top: .4rem;
                box-sizing: border-box;
                padding-left: .4rem;
                img {
                  width: .48rem;
                  height: .48rem;
                }
                .removeBarrelText {                  
                  font-size: .36rem;
                  font-family: PingFangSC-Medium, PingFang SC;
                  font-weight: 700;
                  color: #333333;
                  margin-left: .96rem;
                }
              }

              .removeBarrelDetail {              
                font-size: .28rem;
                font-family: PingFangSC-Regular, PingFang SC;
                font-weight: 400;
                color: #999999;
                box-sizing: border-box;
                padding: .1rem .4rem .2rem .4rem;
                display: flex;
                justify-content: space-between;
                .removeBarrelMember {
                }

                .removeBarrelTime {
                }
              }
              //添加和编辑撤桶的弹框
              .addDecreaseContainer {
                width: 6.7rem;
                border-bottom: .01rem solid #DDD;
                height: 6rem;
                background-color: #fff;
                margin-left: .4rem;
                padding-bottom: .2rem;
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

              .classifyContainer {
                display: flex;
                font-size: 0.32rem;
                .classifyPrecise {
                }

                .classifyContent {
                  input {
                    width: 2rem;
                  }
                }
              }

              .isStickContainer {
                display: flex;
                height: 1rem;
                align-items: center;
                justify-content: space-between;
                // border-bottom: .01rem solid #eee;
                .title {                 
                font-size: .32rem;
                font-family: PingFangSC-Regular, PingFang SC;
                font-weight: 400;
                color: #333333;
                }

                .van-radio-group {
                  .van-radio {
                  }
                /deep/ .van-radio__label {                 
                  font-size: .28rem;
                  font-family: PingFangSC-Regular, PingFang SC;
                  font-weight: 400;
                  color: #333333;
                }
                }
              }
              }
               .takePictureWrapper {
              width: 6.7rem;
              padding-bottom: .3rem;
              border-bottom: .01rem solid #DDD;
              margin-left: .4rem;
              .dialogHeader {
                font-size: 0.32rem;
                // padding-top: 0.5rem;
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
                .remarkTitle {                  
                font-size: .32rem;
                font-family: PingFangSC-Regular, PingFang SC;
                font-weight: 400;
                color: #333333;
                margin-top: .3rem;
                margin-left: .4rem;
                }

                input {
                  border: none;
                  margin-left: .4rem;
                  margin-top: .06rem;
                }
              }

              .sumContainer {
                display: flex;
                // position: absolute;
                // bottom: 0;
                // left: 0;
                // right: 0;
                height: 1.08rem;
                align-items: center;
                justify-content: space-between;
                .sum {
                  display: flex;
                  width: 4.6rem;
                  height: 1.08rem;
                  box-sizing: border-box;
                  padding-top: .33rem;
                  padding-left: .4rem;
                  .sumTitle {                  
                  font-size: .3rem;
                  font-family: PingFangSC-Medium, PingFang SC;
                  font-weight: 500;
                  color: #999999;
                  }

                  .sumNumber {                   
                  font-size: .3rem;
                  font-family: PingFangSC-Medium, PingFang SC;
                  font-weight: 500;
                  color: #0091FF;
                  margin-left: .1rem;
                  }
                }

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
        }

        //巡查巡检
        .checkWrapper {
          padding: 0.2rem;
          font-size: 0.32rem;
          //巡查巡检中间盒子
          .check_wrapper_box {
            // border: 0.01rem solid #cccccc;
            margin-bottom: 0.2rem;
            //盒子头部
            /deep/ .van-cell {
              padding: 0 0.38rem;
              font-size: 0.32rem;
              font-family: PingFangSC-Medium, PingFang SC;
              font-weight: bold;
              color: #333333;
              position: relative;
              //标题
              /deep/ .van-cell__title {
                height: 1.1rem;
                line-height: 1.1rem;
                position: relative;
              }
              //标题右箭头
              /deep/ .van-cell__right-icon {
                display: none;
              }
              //标题右侧状态图片
              img {
                position: absolute;
                height: 0.85rem;
                right: -0.38rem;
                top: 0;
              }
            }
            //内容区
            /deep/ .van-collapse-item__content {
              padding: 0.2rem 0.38rem;
              .check_wrapper_box_bottom {
                background-color: #ffffff;
                overflow: hidden;
                //显示内容
                .check_wrapper_box_bottom_content {
                  font-size: 0.28rem;
                  font-family: PingFangSC-Regular, PingFang SC;
                  color: #666666;
                }
                //检查结果
                .check_wrapper_box_bottom_result {
                  margin-top: 0.32rem;
                  i {
                    width: 2.1rem;
                    height: 0.78rem;
                    line-height: 0.78rem;
                    display: inline-block;
                    font-style: normal;
                    margin-top: 0.14rem;
                    margin-right: 0.2rem;
                    background-color: #f5f5f5;
                    border-radius: 0.1rem;
                    text-align: center;
                    position: relative;
                    box-sizing: border-box;
                    border: 0.02rem solid #ffffff;
                    img {
                      // width: 0.35rem;
                      height: 0.29rem;
                      position: absolute;
                      right: -0.1rem;
                      bottom: -0.1rem;
                    }
                  }
                  .check_wrapper_box_bottom_green {
                    color: #16c88b;
                    background-color: rgba(22, 200, 139, 0.1);
                    border: 0.02rem solid #16c88b;
                  }
                  .check_wrapper_box_bottom_red {
                    color: #f66e6e;
                    background-color: rgba(211, 40, 40, 0.1);
                    border: 0.02rem solid #fa7e7e;
                  }
                }
                //是否通知负责人
                .check_wrapper_box_bottom_notice {
                  margin-top: 0.32rem;
                  .van-radio-group--horizontal {
                    margin-top: 0.14rem;
                    margin-bottom: 0.34rem;
                  }
                  .check_wrapper_box_bottom_i {
                    color: red;
                  }
                }
                //拍照说明
                .check_wrapper_box_bottom_photo {
                  margin-top: 0.34rem;
                  .check_wrapper_box_bottom_photo_upload {
                    margin-top: 0.2rem;
                    margin-bottom: 0.2rem;
                  }
                  .check_wrapper_box_bottom_photo_line {
                    height: 0.01rem;
                    background-color: #dddddd;
                  }
                }
                //情况说明
                .check_wrapper_box_bottom_remark {
                  span {
                    display: block;
                    margin-top: 0.3rem;
                  }
                  textarea {
                    border: none;
                    resize: none;
                    width: 100%;
                    height: 0.8rem;
                    margin-top: 0.12rem;
                  }
                  textarea::-webkit-input-placeholder {
                    font-size: 0.26rem;
                    font-family: PingFangSC-Regular, PingFang SC;
                    color: #cccccc;
                  }
                }
                div {
                  span {
                    font-size: 0.32rem;
                    font-family: PingFangSC-Regular, PingFang SC;
                    color: #333333;
                  }
                  .uploadImage {
                    span {
                      display: block;
                      width: 1.5rem;
                      height: 1.5rem;
                      border: 0.01rem dashed #cccccc;
                      position: relative;
                      img {
                        width: 0.6rem;
                        position: absolute;
                        left: 50%;
                        top: 0.2rem;
                        margin-left: -0.3rem;
                      }
                      .uploadImage_text {
                        font-size: 0.2rem;
                        font-family: PingFangSC-Medium, PingFang SC;
                        font-weight: 500;
                        color: #999999;
                        position: absolute;
                        top: 54%;
                        left: 20%;
                      }
                    }
                  }
                  .check_wrapper_box_bottom_i {
                    color: red;
                  }
                }
                //确认按钮
                button {
                  width: 2.8rem;
                  height: 0.72rem;
                  background: rgba(255, 255, 255, 0);
                  border-radius: 0.75rem;
                  border: 0.01rem solid #0091ff;
                  font-size: 0.32rem;
                  font-family: PingFangSC-Regular, PingFang SC;
                  color: #0091ff;
                  display: block;
                  margin: 0 auto;
                }
              }
            }
          }
          //
          .check_wrapper_margin {
            margin-top: 1.08rem;
          }
          //巡查巡检底部
          .check_wrapper_bottom {
            width: 100%;
            min-height: 1.08rem;
            line-height: 1.08rem;
            background-color: #ffffff;
            position: fixed;
            bottom: 0;
            margin-left: -0.2rem;
            font-size: 0.28rem;
            font-family: PingFangSC-Regular, PingFang SC;
            color: #333333;
            display: flex;
            img {
              height: 0.26rem;
              vertical-align: middle;
              margin-left: 0.38rem;
            }
            //历史巡查记录
            .check_wrapper_bottom_history {
              color: #0091ff;
              display: inline-block;
              margin-left: 0.4rem;
            }
            //提交按钮
            .check_wrapper_bottom_submit {
              flex: 0 0 1.6rem;
              button {
                margin-left: 0.2rem;
                width: 1.56rem;
                height: 100%;
                background-color: #02a7f0;
                color: #ffffff;
                border: none;
              }
            }
          }
        }
      }
    
      }
    
  }  
</style>