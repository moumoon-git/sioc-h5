<!--
 * @Author: yaoweixin
 * @Date: 2020-09-16 20:12:29
 * @LastEditors: liukanglin
 * @LastEditTime: 2020-10-15 16:14:23
 * @Description: 考勤打卡更新
 * @FilePath: \vue-cli-multiPage-master\src\pages\garbageClassification\WorkAttendance.vue
-->
<template>
  <div class="workAttendanceNew">
    <div class="navHeader">
      <van-tabs
        v-model="activeName"
        type="card"
        class="itemWrapper"
        @click="clickTab"
      >
        <!-- 基本信息 -->
        <div v-for="(limitItem, limitIndex) in limitList" :key="limitIndex">
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
                <div class="status" v-else-if="Community.status == '2'">
                  黄牌
                </div>
                <div class="status" v-else-if="Community.status == '3'">
                  红牌
                </div>
                <div class="status" v-else-if="Community.status == '4'">
                  拒收
                </div>
                <div class="status" v-else>责令整改</div>
              </div>
              <div class="imgWrapper">
                <img
                  v-for="(imgItem, imgIndex) in Community.imgList"
                  :key="imgIndex"
                  :src="imgItem.allUrl"
                  alt=""
                />
              </div>
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
                <div class="leader">{{ Community.leader }}</div>
              </div>
              <div class="removeBarrelContainer">
                <div class="removeBarrelTitle">撤桶次数：</div>
                <div class="removeBarrelTimes">
                  {{ Community.removeBarrelTimes }}
                </div>
              </div>
              <div class="removeBarrelContainer">
                <div class="removeBarrelTitle">撤桶率：</div>
                <div class="removeBarrelPercent">
                  {{ Community.removeBarrelPercent }}
                </div>
              </div>
              <div class="keepClean">
                <div class="cleanTitle">保洁次数：</div>
                <div class="cleanTimes">{{ Community.cleanTimes }}</div>
              </div>
              <div class="rubbishRecycleContainer">
                <div class="rubbishRecycleTitle">生活垃圾回收利用率：</div>
                <div class="recyclePercent">{{ Community.recyclePercent }}</div>
              </div>
              <div class="otherRubbishContainer">
                <div class="otherTitle">其他垃圾减量率：</div>
                <div class="rubbishDecreasePercent">
                  {{ Community.otherRubbishDecreasePercent }}
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
              <div
                class="recordContainer"
                v-for="(rItem, rIndex) in limitList"
                :key="rIndex"
              >
                <div class="recordSlide" v-if="rItem.menuCode == 'KQJL'">
                  考勤记录
                </div>
                <div class="recordSlide" v-if="rItem.menuCode == 'BJJL'">
                  保洁记录
                </div>
                <div class="recordSlide" v-if="rItem.menuCode == 'CTJL'">
                  撤桶记录
                </div>
                <div class="recordSlide" v-if="rItem.menuCode == 'XCJL'">
                  巡查记录
                </div>
                <div class="recordSlide" v-if="rItem.menuCode == 'ZFJL'">
                  执法记录
                </div>
              </div>
              <div class="handleRegisterButton" @click="showHandle = true">
                处置登记
              </div>
              <img src="~@/assets/img/add.png" alt="" />
              <van-picker
                title="标题"
                show-toolbar
                :columns="columns"
                @confirm="onConfirm"
                @cancel="onCancel"
                v-show="showHandle"
              />
            </div>
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
                  <img :src="personObj.faceImg" alt class="personAvatar" />

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

                <div class="attendanceRecord" @click="enterAttendanceRecord">
                  考勤记录
                </div>

                <img src="~@/assets/img/add.png" alt class="statusImg" />
              </div>

              <div class="clockInContainer">
                <div class="attendanceTime">本班次考勤时间：07：00~09：00</div>

                <div class="attendanceClockInContainer">
                  <div class="ClockInSlide">
                    <div class="trueIcon">
                      <img src="~@/assets/img/close.png" alt />
                    </div>

                    <div class="clockInTitle">07：15签到打卡</div>
                  </div>

                  <div class="refreshAttendanceSlide">
                    <div class="refreshIcon">
                      <img src alt />
                    </div>

                    <div class="refreshTitle">更新打卡</div>
                  </div>
                </div>

                <!-- 不准打卡 -->

                <div class="outOfCompass">
                  <div class="outOfGlobal">
                    <div class="outOfTitle">超出打卡范围</div>

                    <div class="attendanceTime">07:05:11</div>
                  </div>

                  <div class="locationWrapper">
                    <div class="locationIcon">
                      <img src alt />
                    </div>

                    <div class="locationTitle">广东省广州市天河区</div>

                    <div class="refreshIcon">
                      <img src alt />
                    </div>
                  </div>
                </div>

                <!-- 准许打卡 -->

                <div class="InOfCompass">
                  <div class="InOfGlobal" @click="openAllowClockInDialog">
                    <div class="outOfTitle">打卡签到</div>

                    <div class="attendanceTime">07:05:11</div>
                  </div>

                  <div class="locationWrapper">
                    <div class="locationIcon">
                      <img src alt />
                    </div>

                    <div class="locationTitle">广东省广州市天河区</div>
                  </div>
                </div>

                <!-- 离岗打卡 -->

                <div class="leaveClockIn">
                  <div class="leaveOfGlobal" @click="openLeaveDialog">
                    <div class="outOfTitle">离岗打卡</div>

                    <div class="attendanceTime">07:05:11</div>
                  </div>

                  <div class="locationWrapper">
                    <div class="locationIcon">
                      <img src alt />
                    </div>

                    <div class="locationTitle">广东省广州市天河区</div>
                  </div>
                </div>
              </div>

              <!-- 底部上次考勤记录 -->

              <div class="bottomRecord">
                <van-collapse v-model="lastRecord">
                  <van-collapse-item name="1">
                    <template #title>
                      <div class="titleContainer">
                        <div class="lastTime">
                          上一班次考勤时间：07：00~09:00
                        </div>

                        <div class="statusTitle">已打卡</div>
                      </div>
                    </template>

                    <div class="attendanceClockInContainer">
                      <div class="ClockInSlide">
                        <div class="trueIcon">
                          <img src="~@/assets/img/close.png" alt />
                        </div>

                        <div class="clockInTitle">07：15签到打卡</div>
                      </div>

                      <div class="refreshAttendanceSlide">
                        <div class="refreshIcon">
                          <img src alt />
                        </div>

                        <div class="refreshTitle">更新打卡</div>
                      </div>
                    </div>
                  </van-collapse-item>
                </van-collapse>
              </div>

              <!-- 底部上次考勤记录未打卡 -->

              <div class="bottomRecordNotClock">
                <div class="titleContainer">
                  <div class="lastTime">上一班次考勤时间：07：00~09:00</div>

                  <div class="statusTitle">已打卡</div>
                </div>
              </div>

              <!-- 签到打卡弹框 -->

              <van-popup v-model="show" position="bottom" round closeable>
                <div class="dialogHeader">{{ clockInTitle }}</div>

                <van-uploader
                  v-model="fileList"
                  multiple
                  :after-read="afterRead"
                >
                  <img src="~@/assets/img/close.png" alt />
                </van-uploader>

                <div class="optional">
                  <div class="optionalTitle">备注（选填）</div>

                  <input type="text" />
                </div>

                <div class="confirmClockIn">确认打卡</div>
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
                <div class="recordTitle">今日保洁记录</div>
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
                  <div class="cleaner">保洁人员：{{ item.memberName }}</div>
                </div>
              </div>
              <div
                class="historyCleanRecord"
                @click="$router.push('/cleanHistoryRecord')"
              >
                历史保洁记录
              </div>
              <div class="addCleanRecord" @click="addCleanShow = true">
                添加保洁记录
              </div>
              <!-- 添加保洁记录的弹框 -->
              <van-popup
                v-model="addCleanShow"
                position="bottom"
                round
                closeable
              >
                <div class="headerTitle">添加保洁记录</div>
                <div class="takePictureWrapper">
                  <div class="dialogHeader">拍照：</div>
                  <van-uploader
                    v-model="fileList"
                    multiple
                    :after-read="afterRead"
                  >
                    <img src="~@/assets/img/Picture.svg" alt />
                  </van-uploader>
                </div>
                <div class="optional">
                  <div class="optionalTitleRemark">备注:</div>
                  <input type="text" />
                </div>
                <div class="confirmClockIn">确定</div>
              </van-popup>
              <!-- 查看保洁详情的弹框 -->
              <van-popup v-model="cleaningDetailShow" round position="bottom">
                <div class="topHeader">保洁详情</div>
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
                @click="lookRemoveBarrelDetail(item.id, item.status)"
              >
                <div class="removeBarrelSlide">
                  <div class="barrelStatusWaiting" v-if="item.status == '1'">
                    待撤桶
                  </div>
                  <div
                    class="barrelStatusAlready"
                    v-else-if="item.status == '2'"
                  >
                    已撤桶
                  </div>
                  <div class="barrelStatusUnready" v-else>未撤桶</div>
                </div>
                <div class="removeBarrelClass">
                  撤桶班次：{{ item.startTime }}~{{ item.endTime }}
                </div>
              </div>
              <div
                class="removeBarrelHistoryRecordTitle"
                @click="$router.push('/removeBarrelHistoryRecord')"
              >
                历史撤桶记录
              </div>
            </div>
            <div class="removeBarrelClassDialog">
              <van-popup
                v-model="confirmRemoveBarrelshow"
                round
                position="bottom"
              >
                <div class="removeBarrelClassTitle">
                  撤桶班次：{{ removeBarrel.startTime }}~{{
                    removeBarrel.endTime
                  }}
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
                <div class="restCook">
                  <div class="restTitle">餐余：</div>
                  <div class="barrelNumberContainer">
                    <div
                      class="decreaseButton"
                      @click.stop="decreaseBarrel('rest')"
                    >
                      -
                    </div>
                    <div class="dinnerRestNumber">
                      {{ removeBarrel.dinnerNumber }}
                    </div>
                    <div class="increaseButton" @click="increaseBarrel('rest')">
                      +
                    </div>
                    <div class="barrelTitle">桶</div>
                  </div>
                </div>
                <div class="restCook">
                  <div class="restTitle">其他：</div>
                  <div class="barrelNumberContainer">
                    <div
                      class="decreaseButton"
                      @click.stop="decreaseBarrel('other')"
                    >
                      -
                    </div>
                    <div class="dinnerRestNumber">
                      {{ removeBarrel.otherNumber }}
                    </div>
                    <div
                      class="increaseButton"
                      @click="increaseBarrel('other')"
                    >
                      +
                    </div>
                    <div class="barrelTitle">桶</div>
                  </div>
                </div>
                <div class="restCook">
                  <div class="restTitle">可回收：</div>
                  <div class="barrelNumberContainer">
                    <div
                      class="decreaseButton"
                      @click.stop="decreaseBarrel('recycle')"
                    >
                      -
                    </div>
                    <div class="dinnerRestNumber">
                      {{ removeBarrel.recycleNumber }}
                    </div>
                    <div
                      class="increaseButton"
                      @click="increaseBarrel('recycle')"
                    >
                      +
                    </div>
                    <div class="barrelTitle">桶</div>
                  </div>
                </div>
                <div class="restCook">
                  <div class="restTitle">有害：</div>
                  <div class="barrelNumberContainer">
                    <div
                      class="decreaseButton"
                      @click.stop="decreaseBarrel('harm')"
                    >
                      -
                    </div>
                    <div class="dinnerRestNumber">
                      {{ removeBarrel.harmNumber }}
                    </div>
                    <div class="increaseButton" @click="increaseBarrel('harm')">
                      +
                    </div>
                    <div class="barrelTitle">桶</div>
                  </div>
                </div>
                <div class="classifyContainer">
                  <div class="classifyPrecise">分类准确率：</div>
                  <div class="classifyContent">
                    <input
                      type="text"
                      v-model="removeBarrel.classifyPrecisePercent"
                    />%
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
                <div class="takePictureContainer">
                  <div class="takePicTitle">拍照：</div>
                  <van-uploader
                    v-model="removeBarrel.protectFileList"
                    multiple
                    :after-read="afterRead"
                  >
                    <img src="~@/assets/img/Picture.svg" alt />
                  </van-uploader>
                </div>
                <div class="remarkContainer">
                  <div class="remarkTitle">备注：</div>
                  <input type="text" v-model="removeBarrel.protectRemark" />
                </div>
                <div class="sumContainer">
                  <div class="sum">
                    <div class="sumTitle">总量：</div>
                    <div class="sumNumber">共{{ barrelSum }}桶</div>
                  </div>
                  <div
                    class="saveButton"
                    v-if="confirmRemoveBarrel == false"
                    @click="updateSaveBarrel"
                  >
                    保存修改
                  </div>
                  <div class="saveButton" v-else @click="confirmRemBarrel">
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
              <!-- <div class="check_wrapper_box_title" @click="selectItem(index)"> -->
              <div class="check_wrapper_box_title">
                {{ item.name }}
                <img src="@/assets/img/noChecked.png" alt="" />
              </div>
              <!-- <div v-show="patrolInspection.isSelect[index]" class="check_wrapper_box_bottom"> -->
              <div class="check_wrapper_box_bottom">
                <div>
                  {{ item.content }}
                </div>
                <div>
                  <span>检查结果：</span
                  ><i
                    @click="selectCheckResult('1', index)"
                    :class="
                      patrolInspection.checkResultIndex[index] == '1'
                        ? 'check_wrapper_box_bottom_i'
                        : ''
                    "
                    ><img src="@/assets/img/fileImage.png" alt="" />正常</i
                  ><i
                    @click="selectCheckResult('0', index)"
                    :class="
                      patrolInspection.checkResultIndex[index] == '0'
                        ? 'check_wrapper_box_bottom_i'
                        : ''
                    "
                    ><img src="@/assets/img/fileImage.png" alt="" />异常</i
                  >
                </div>
                <div v-if="patrolInspection.checkResultIndex[index] == '0'">
                  <span>通知负责人：</span>
                  <i
                    @click="selectAdvisePerson('0', index)"
                    :class="
                      patrolInspection.advisePersonIndex[index] == '0'
                        ? 'check_wrapper_box_bottom_i'
                        : ''
                    "
                    ><img src="@/assets/img/fileImage.png" alt="" />是</i
                  >
                  <i
                    @click="selectAdvisePerson('1', index)"
                    :class="
                      patrolInspection.advisePersonIndex[index] == '1'
                        ? 'check_wrapper_box_bottom_i'
                        : ''
                    "
                    ><img src="@/assets/img/fileImage.png" alt="" />否</i
                  >
                </div>
                <div>
                  <span style="margin-top: -1rem; display: inline-block"
                    >情况说明：</span
                  >
                  <textarea
                    v-model="patrolInspection.remark[index]"
                    style="resize: none"
                    cols="30"
                    rows="2"
                  ></textarea>
                </div>
                <div>
                  <span
                    >拍照说明：
                    <!-- <i
                      ><img src="@/assets/img/Picture.svg" alt=""
                    /></i> -->
                    <van-uploader
                      v-model="patrolInspection.fileList[index]"
                      @delete="inspectionDeleterRead"
                      :after-read="inspectionAfterRead"
                      multiple
                    >
                      <div class="uploadImage">
                        <i class="iconfont iconicon-test"></i>
                      </div>
                    </van-uploader>
                  </span>
                </div>
                <button @click="submitSingleCheck(index)">确认</button>
              </div>
            </div>
            <!-- <div class="check_wrapper_box">
              <div class="check_wrapper_box_title">
                守桶人员在岗
                <img src="@/assets/img/noChecked.png" alt="" />
              </div>
              <div class="check_wrapper_box_bottom">
                <div>
                  检查守桶人员是否在岗，及在岗人员分类指引工作是否到位。
                </div>
                <div>
                  <span>检查结果：</span
                  ><i
                    @click="selectCheckResult(0)"
                    :class="
                      patrolInspection.checkResultIndex == 0
                        ? 'check_wrapper_box_bottom_i'
                        : ''
                    "
                    ><img src="@/assets/img/fileImage.png" alt="" />正常</i
                  ><i
                    @click="selectCheckResult(1)"
                    :class="
                      patrolInspection.checkResultIndex == 1
                        ? 'check_wrapper_box_bottom_i'
                        : ''
                    "
                    ><img src="@/assets/img/fileImage.png" alt="" />异常</i
                  >
                </div>
                <div>
                  <span style="margin-top: -1rem; display: inline-block"
                    >情况说明：</span
                  >
                  <textarea style="resize: none" cols="30" rows="2"></textarea>
                </div>
                <div>
                  <span
                    >拍照说明：<i
                      ><img src="@/assets/img/Picture.svg" alt="" /></i
                  ></span>
                </div>
                <button>确认</button>
              </div>
            </div>
            <div class="check_wrapper_box">
              <div class="check_wrapper_box_title">
                周边卫生
                <img src="@/assets/img/normal.png" alt="" />
              </div>
              <div class="check_wrapper_box_bottom">
                <div>
                  1.检查垃圾分类点垃圾堆放是否合理，周边是否存在乱扔现象。
                </div>
                <div>2.垃圾分类点设施摆放是否整洁，是否有人定期清洁。</div>
              </div>
            </div> -->
            <div class="check_wrapper_margin"></div>
            <div class="check_wrapper_bottom">
              <img src="@/assets/img/Picture.svg" alt="" />
              2
              <img src="@/assets/img/Picture.svg" alt="" />
              1
              <div class="check_wrapper_bottom_history">历史巡查记录</div>
              <button @click="submitProject">提交</button>
            </div>
          </van-tab>
        </div>
      </van-tabs>
    </div>
  </div>
</template>
<script>
import AMap from "vue-amap";
export default {
  name: "workAttendanceNew",
  data() {
    return {
      cleanRemark: "", //添加保洁记录备注
      imgList: [], //上传后得图片列表
      uploadFileList:[], //上传后返回来的图片列表
      tabMark: "", //标志点击那个tab
      cleanFileList: [], //保洁图片列表
      InspectionFileList: [], //巡查图片列表
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
        status: 0, //状态
        communityName: "", //所属社区
        villageName: "", //小区
        villageCharacter: "", //小区性质
        delegateMember: "", //委派方
        throwTime: [], //投放时间
        leader: "小王", //负责人
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
      },
      columns: ["正常", "黄牌警告", "红牌警告", "拒收拒运", "责令整改"],
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
        protectRemark: "分类点无人进行分类指导", //备注
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
        longitude: "",
        latitude: "",
        place: "",
        imgList: [],
        advisePersonIndex: [], //是否通知负责人
        fileList: [], //上传图片的数据
      },
    };
  },
  methods: {
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
            //console.log(data);
            this.$dialog.alert({
              message: "提交成功",
            });
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
            //console.log(data);
            this.$dialog.alert({
              message: "巡查成功",
            });
          });
        });
    },
    /**
     * @description: 添加保洁记录
     * @param {type} params
     * @return {type}
     */
    confirmAddCleanRecord() {
      this.$http({
        url: this.$http.adornUrl(`/garbage/garbageWithdraw/update`),
        method: "post",
        data: this.$http.adornData({
          type: "2",
          imgList: this.imgList,
          remark: this.cleanRemark,
        }),
      });
    },
    inspectionDeleterRead(file) {
      //console.log("删除了文件", file);
      var delectIndex;
      Promise.resolve(
        this.uploadFileList[this.patrolInspection.currentIndex].forEach(
          (item, index) => {
            if (item.url == file.url) {
              delectIndex = index;
              //console.log(delectIndex);
            }
          }
        )
      ).then(() => {
        //console.log(this.uploadFileList,this.uploadFileList[this.patrolInspection.currentIndex]);
        this.uploadFileList[this.patrolInspection.currentIndex].splice(delectIndex,1)
        this.patrolInspection.imgList = this.uploadFileList;
      });
    },
    /**
     * @description:巡查巡检文件上传完毕后触发的回调函数
     * @param {obj} file 对应的file对象
     * @return {}
     */
    inspectionAfterRead(file) {
      file.status = "uploading";
      file.message = "上传中...";
      //console.log(
        this.patrolInspection.fileList,
        this.patrolInspection.currentIndex,
        file
      );
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
        //console.log("文件上传后返回的数据data===》", data);
        let fileName = data.data.fileName;
        let filestr = data.data.filestr;
        //console.log(fileName);
        (this.patrolInspection.imgList[
          this.patrolInspection.currentIndex
        ] = []),
          fileName.forEach((v, i) => {
            this.patrolInspection.imgList[
              this.patrolInspection.currentIndex
            ].push({
              name: fileName[i],
              url: filestr[i],
            });
          });
        //console.log(this.patrolInspection.imgList);
      });
    },

    afterRead(file) {
      file.status = "uploading";
      file.message = "上传中...";
      let formData = new FormData();
      if (this.tabMark == "c") {
        //保洁登记
        this.cleanFileList.forEach((v) => {
          formData.append("files", v.file);
        });
      }
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
        //console.log("文件上传后返回的数据data===》", data);
        let fileName = data.data.fileName;
        let filestr = data.data.filestr;
        //console.log(fileName);
        fileName.forEach((v, i) => {
          this.imgList.push({
            name: fileName[i],
            url: filestr[i],
          });
        });
      });
    },
    openAllowClockInDialog() {
      this.clockInTitle = "签到打卡";
      this.show = true;
    },
    openLeaveDialog() {
      this.clockInTitle = "离岗打卡";
      this.show = true;
    },
    /**
     * @description: 跳转到打卡记录
     * @param {type} 无
     * @return {type}
     */
    enterAttendanceRecord() {
      this.$router.push("/attendanceHistoryRecord");
    },
    onConfirm(value, index) {},
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
          }),
        }).then(({ data }) => {
          //console.log("保洁数据为", data);
          if (data && data.code === 0) {
            this.cleanDetailArray = data.data;
          }
        });
      } else if (name == "d") {
        //撤桶登记
        this.tabMark = "d";
        this.$http({
          url: this.$http.adornUrl(
            `/garbage/garbageShift/wxList?codeNum=6fd9bd8f6972463797b6ba08d14b492d-1600822805208`
          ),
          method: "get",
          params: this.$http.adornParams({}),
        }).then(({ data }) => {
          //console.log("撤桶登记数据为", data);
          if (data && data.code == 0) {
            this.removeBarrelList = data.data;
          }
        });
      } else if (name == "b") {
        //考勤打卡
        this.tabMark = "b";
        this.getLocation();
      } else if (name == "a") {
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
            this.patrolInspection.investigationInforList =
              data.data.data.investigationInforList; //拿到巡查巡检列表数据
            this.patrolInspection.longitude = data.data.data.longitude;
            this.patrolInspection.latitude = data.data.data.latitude;
            this.patrolInspection.place = data.data.data.place;
          }
        });
      } else if (name == "e") {
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
            return;
          } else {
            this.patrolInspection.instanceId = data.data.page.id;
            this.patrolInspection.instanceInforList =
              data.data.page.instanceInforList;
            data.data.page.instanceInforList.forEach((v, i) => {
              //接收返回的数据
              // this.uploadImgList.push()
              this.patrolInspection.remark.push(v.remark);
              // this.patrolInspection.imgList.push(v.imgList);
              // this.patrolInspection.fileList.push(v.imgUrl);
              this.patrolInspection.checkResultIndex.push(v.status);
              this.patrolInspection.advisePersonIndex.push(v.isNotice);
              let arr = [];
              // let item = [];
              if (v.imgList) {
                v.imgList.forEach((val) => {
                  arr.push({ url: val.allUrl });
                });
                this.patrolInspection.fileList.push(arr);
                this.uploadFileList.push(arr);
              }
            });
            //console.log(this.patrolInspection.fileList);
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
    lookRemoveBarrelDetail(id, status) {
      this.removeBarrelId = id;
      if (status == "1") {
        //待撤桶
        this.confirmRemoveBarrel = true;
      } else {
        this.confirmRemoveBarrel = false;
      }
      this.$http({
        url: this.$http.adornUrl(`/garbage/garbageWithdraw/wxInfo?id=${id}`),
        method: "get",
        params: this.$http.adornParams({}),
      }).then(({ data }) => {
        //console.log("班次的详细信息为", data);
        if (data && data.code === 0) {
          if (status == "1") {
            if (data.data.garbageShiftEntity != null) {
              this.removeBarrel.startTime =
                data.data.garbageShiftEntity.startTime;
              this.removeBarrel.endTime = data.data.garbageShiftEntity.endTime;
            }
          } else {
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
            this.removeBarrel.protectFileList = data.data.imgList
              ? data.data.imgList.map((item, index) => {
                  return { url: item.allUrl };
                })
              : [];
            //console.log("tupian", this.removeBarrel.protectFileList);
            this.removeBarrel.protectRemark = data.data.remark;
          }
          this.confirmRemoveBarrelshow = true;
        }
      });
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
      } else {
        this.removeBarrel.harmNumber == 0 ? 0 : --this.removeBarrel.harmNumber;
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
      } else {
        ++this.removeBarrel.harmNumber;
      }
    },
    /**
     * @description: 撤桶修改
     * @param {type} params
     * @return {type}
     */
    updateSaveBarrel() {
      this.$http({
        url: this.$http.adornUrl(`/garbage/garbageWithdraw/update`),
        method: "post",
        data: this.$http.adornData({
          id: this.removeBarrelId,
          foodWaste: this.removeBarrel.dinnerNumber,
          otherWaste: this.removeBarrel.otherNumber,
          recyclableWaste: this.removeBarrel.recycleNumber,
          harmfulWaste: this.removeBarrel.harmNumber,
          classAccuracy: this.removeBarrel.classifyPrecisePercent,
          isKeepbarrel: this.removeBarrel.protectRadio,
          type: "1",
          imgList: this.pictureList,
          remark: this.removeBarrel.protectRemark,
          openId: "1", //用户标识
          codeNum: "1", //用户标识
          shiftId: "1", //班次点
        }),
      }).then(({ data }) => {
        //console.log("更新撤桶返回的数据为", data);
        if (data && data.code === 0) {
          this.pictureList = [];
          alert("更新成功");
        }
      });
    },
    /**
     * @description: 确认撤桶
     * @param {type} params
     * @return {type}
     */
    confirmRemBarrel() {
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
          imgList: this.pictureList,
          remark: this.removeBarrel.protectRemark,
          openId: "1", //用户标识
          codeNum: "1", //用户标识
          shiftId: "1", //班次点
        }),
      }).then(({ data }) => {
        //console.log("确认撤桶返回的数据为", data);
        if (data && data.code === 0) {
          this.pictureList = [];
          alert("确认成功");
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
                `/garbage/garbagePunchClock/getNowShiftPunchClockInforAndShiftList?memberId=${memberId}&point=${classifyId}&longitude=${lng}&latitude=${lat}`
              ),
              method: "get",
              params: that.$http.adornParams({}),
            })
            .then(({ data }) => {
              //console.log("考勤打卡记录为", data);
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
  },
  computed: {
    barrelSum() {
      return (
        parseInt(this.removeBarrel.dinnerNumber) +
        parseInt(this.removeBarrel.otherNumber) +
        parseInt(this.removeBarrel.recycleNumber) +
        parseInt(this.removeBarrel.harmNumber)
      );
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
    // this.getLocation()
    // let urlString = window.location.href
    let urlString =
      "https://scg.chinaemt.com/rpt/garbageClassification.html#/workAttendance?openId=oMHlns_BgriWEGYv1ezpeSxI5gyc&clientFlag=wechat&codeNum=affb0310a8854dfb9eb3bd82973ac85b-1601187833987";
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
    this.$http({
      url: this.$http.adornUrl(`/garbage/garbageRole/getRole?openId=${openId}`),
      method: "get",
      params: this.$http.adornParams({}),
    }).then(({ data }) => {
      //console.log("权限数据为", data);
      if (data && data.code == 0) {
        // this.limitList = data.data.menuList
        this.limitList = [
          { menuCode: "JBXX" },
          { menuCode: "KQJL" },
          { menuCode: "KQDK" },
          { menuCode: "XCXJ" },
        ];
        this.personObj = data.data.memberEntity;
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
        this.classifyName = data.data.data.name;
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
        this.patrolInspection.investigationInforList =
          data.data.data.investigationInforList; //拿到巡查巡检列表数据
        this.patrolInspection.longitude = data.data.data.longitude;
        this.patrolInspection.latitude = data.data.data.latitude;
        this.patrolInspection.place = data.data.data.place;
      }
    });
  },
};
</script>
<style lang="less" scoped>
  .workAttendanceNew {
    .navHeader {
      .itemWrapper {
        /deep/ .van-tabs__wrap {
          /deep/ .van-tabs__nav--card {
            margin: 0;
            border: 0;
          }
          /deep/ .van-tab {
            border: 0;
          }
        }
        .basicMessage {
          .messageContainer {
            background-color: #fff;
            font-size: 0.32rem;
            .headerTitle {
              text-align: center;
            }

            .pointStatus {
              display: flex;

              .statusTitle {
              }

              .status {
              }
            }

            .imgWrapper {
              display: flex;
              img {
              }
            }

            .communityContainer {
              display: flex;
              .communityTitle {
              }

              .communityName {
              }
            }

            .villageContainer {
              display: flex;
              .villageTitle {
              }

              .village {
              }
            }

            .villageCharacter {
              display: flex;
              .villageCharacterTitle {
              }

              .character {
              }
            }

            .delegateParty {
              display: flex;
              .delegateTitle {
              }

              .delegateMember {
              }
            }

            .throwTime {
              display: flex;
              .throwTitle {
              }

              .throwTim {
              }
            }

            .leaderContainer {
              display: flex;
              .leaderTitle {
              }

              .leader {
              }
            }

            .removeBarrelContainer {
              display: flex;
              .removeBarrelTitle {
              }

              .removeBarrelTimes {
              }
            }

            .keepClean {
              display: flex;
              .cleanTitle {
              }

              .cleanTimes {
              }
            }

            .rubbishRecycleContainer {
              display: flex;
              .rubbishRecycleTitle {
              }

              .recyclePercent {
              }
            }

            .otherRubbishContainer {
              display: flex;
              .otherTitle {
              }

              .rubbishDecreasePercent {
              }
            }

            .yellowContainer {
              display: flex;
              .yellowTitle {
              }

              .yellowTimes {
              }
            }

            .redContainer {
              display: flex;
              .redTitle {
              }

              .redTimes {
              }
            }

            .refuseContainer {
              display: flex;
              .refuseTitle {
              }

              .refuseTimes {
              }
            }

            .changeContainer {
              display: flex;
              .changeTitle {
              }

              .change {
              }
            }

            .punishContainer {
              display: flex;
              .punishTitle {
              }

              .punishContent {
              }
            }

            .checkContainer {
              display: flex;
              .checkTitle {
              }

              .checkTimes {
              }
            }

            .projectAbnormalContainer {
              display: flex;
              .abnormalTitle {
              }

              .abnormalTimes {
              }
            }

            .recordContainer {
              display: flex;
              justify-content: space-around;
              color: #02a7f0;
              .recordSlide {
              }
            }

            .handleRegisterButton {
              background-color: #02a7f0;
              color: #fff;
              border-radius: 16px;
              text-align: center;
            }

            .recyclePercent {
            }
          }

          .otherRubbishContainer {
            display: flex;
            .otherTitle {
            }

            .rubbishDecreasePercent {
            }
          }

          .yellowContainer {
            display: flex;
            .yellowTitle {
            }

            .yellowTimes {
            }
          }

          .redContainer {
            display: flex;
            .redTitle {
            }

            .redTimes {
            }
          }

          .refuseContainer {
            display: flex;
            .refuseTitle {
            }

            .refuseTimes {
            }
          }

          .changeContainer {
            display: flex;
            .changeTitle {
            }

            .change {
            }
          }

          .punishContainer {
            display: flex;
            .punishTitle {
            }

            .punishContent {
            }
          }

          .checkContainer {
            display: flex;
            .checkTitle {
            }

            .checkTimes {
            }
          }

          .projectAbnormalContainer {
            display: flex;
            .abnormalTitle {
            }

            .abnormalTimes {
            }
          }

          .recordContainer {
            display: flex;
            justify-content: space-around;
            color: #02a7f0;
            .recordSlide {
            }
          }

          .handleRegisterButton {
            background-color: #02a7f0;
            color: #fff;
            border-radius: 16px;
            text-align: center;
          }

          img {
          }
          .van-picker {
            position: fixed;
            left: 0;
            right: 0;
            bottom: 0;
          }
        }
      }
      .attendanceWrapper {
        .attendanceClockIn {
          .personContainer {
            display: flex;
            position: relative;
            justify-content: space-between;
            font-size: 0.16rem;
            background-color: #fff;
            margin-top: 0.3rem;
            .personMessageWrapper {
              display: flex;
              img.personAvatar {
                width: 0.8rem;
                height: 0.8rem;
              }

              .personWrapper {
                .personNameWrapper {
                  display: flex;
                  .personName {
                  }

                  .isPartyMember {
                  }
                }

                .place {
                }
              }
            }

            .attendanceRecord {
              margin-right: 1rem;
              line-height: 0.7rem;
              color: skyblue;
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
            border-radius: 8px;
            margin-top: 0.3rem;
            padding-top: 0.5rem;
            padding-left: 0.3rem;
            .attendanceTime {
              font-size: 0.16rem;
              color: #ccc;
            }

            .attendanceClockInContainer {
              display: flex;
              .ClockInSlide {
                background-color: #f5f5f5;
                display: flex;
                justify-content: center;
                align-items: center;
                height: 0.8rem;
                .trueIcon {
                  width: 0.2rem;
                  height: 0.2rem;
                  display: flex;
                  img {
                    width: 0.2rem;
                    height: 0.2rem;
                  }
                }

                .clockInTitle {
                  font-size: 0.16rem;
                  color: #000;
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
            .outOfCompass {
              .outOfGlobal {
                width: 3rem;
                height: 3rem;
                background-color: #ccc;
                border-radius: 50%;
                font-size: 0.16rem;
                margin: 0 auto;
                text-align: center;
                color: #fff;
                padding-top: 0.8rem;
                box-sizing: border-box;
                .outOfTitle {
                }

                .attendanceTime {
                  color: #fff;
                  margin-top: 0.8rem;
                }
              }

              .locationWrapper {
                display: flex;
                justify-content: center;
                .locationIcon {
                  width: 0.4rem;
                  height: 0.4rem;
                  display: flex;
                  img {
                    width: 0.4rem;
                    height: 0.4rem;
                  }
                }

                .locationTitle {
                  font-size: 0.16rem;
                }

                .refreshIcon {
                  width: 0.4rem;
                  height: 0.4rem;
                  display: flex;
                  img {
                    width: 0.4rem;
                    height: 0.4rem;
                  }
                }
              }
            }

            .InOfCompass {
              .InOfGlobal {
                width: 3rem;
                height: 3rem;
                background-color: #02a7f0;
                border-radius: 50%;
                font-size: 0.16rem;
                margin: 0 auto;
                text-align: center;
                color: #fff;
                padding-top: 0.8rem;
                box-sizing: border-box;
                .outOfTitle {
                }

                .attendanceTime {
                  color: #fff;
                  margin-top: 0.8rem;
                }
              }
              //盒子模型
              .locationWrapper {
                display: flex;
                justify-content: center;
                .locationIcon {
                  width: 0.4rem;
                  height: 0.4rem;
                  display: flex;
                  img {
                    width: 0.4rem;
                    height: 0.4rem;
                  }
                }

                .locationTitle {
                  font-size: 0.16rem;
                }
              }
            }

            .leaveClockIn {
              //外观
              .leaveOfGlobal {
                width: 3rem;
                height: 3rem;
                background-color: #f59a23;
                border-radius: 50%;
                font-size: 0.16rem;
                margin: 0 auto;
                text-align: center;
                color: #fff;
                padding-top: 0.8rem;
                box-sizing: border-box;
                .outOfTitle {
                }
                //外观
                .attendanceTime {
                  color: #fff;
                  margin-top: 0.8rem;
                }
              }

              //盒子模型
              .locationWrapper {
                display: flex;
                justify-content: center;
                .locationIcon {
                  width: 0.4rem;
                  height: 0.4rem;
                  display: flex;
                  img {
                    width: 0.4rem;
                    height: 0.4rem;
                  }
                }

                .locationTitle {
                  font-size: 0.16rem;
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
                }
                .attendanceClockInContainer {
                  display: flex;
                  .ClockInSlide {
                    background-color: #f5f5f5;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    height: 0.8rem;
                    .trueIcon {
                      width: 0.2rem;
                      height: 0.2rem;
                      display: flex;
                      img {
                        width: 0.2rem;
                        height: 0.2rem;
                      }
                    }

                    .clockInTitle {
                      font-size: 0.16rem;
                      color: #000;
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

          .bottomRecordNotClock {
            .titleContainer {
              display: flex;
              justify-content: space-between;
              font-size: 0.16rem;
              height: 0.8rem;
              background-color: #fff;
              align-items: center;
            }
          }

          .van-popup {
            text-align: center;
            .dialogHeader {
              font-size: 0.4rem;
              text-align: center;
              padding-top: 0.3rem;
            }

            .van-uploader {
              margin: 0 auto;
              img {
                width: 4rem;
                height: 4rem;
              }
            }

            .optional {
              .optionalTitle {
                font-size: 0.16rem;
                text-align: left;
              }

              input {
                width: 100vw;
                border: 0;
                outline: none;
                border-bottom: 1px solid #000;
                height: 0.5rem;
              }
            }

            .confirmClockIn {
              font-size: 0.3rem;
              color: #fff;
              background-color: #02a7f0;
              text-align: center;
              border-radius: 16px;
              height: 1rem;
              line-height: 1rem;
              width: 6rem;
              margin: 0.2rem auto;
            }
          }
          .van-popup {
            text-align: center;
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
                font-size: 0.16rem;
              }

              .remarkContent {
                font-size: 0.16rem;
                text-align: left;
              }
            }
          }
        }
      }

      .cleaningRegisterWrapper {
        .cleaningRegister {
          .recordWrapper {
            display: flex;
            justify-content: space-between;
            font-size: 0.16rem;
            .recordTitle {
            }

            .cleanTimes {
            }
          }

          .CleanDetainWrapper {
            //盒子模型
            padding: 0 0.1rem;
            .cleanSlide {
              height: 1rem;
              background-color: #fff;
              font-size: 0.16rem;
              display: flex;
              justify-content: space-between;
              align-items: center;
              margin-top: 0.2rem;
              border-radius: 12px;
              .cleanTime {
                margin-left: 0.1rem;
              }

              .cleaner {
                margin-right: 0.2rem;
              }
            }
          }
          //外观
          .historyCleanRecord {
            background-color: #fff;
            text-align: center;
            font-size: 0.24rem;
            color: #02a7f0;
            border-radius: 16px;
            margin-top: 0.4rem;
            height: 0.6rem;
            line-height: 0.6rem;
          }

          .addCleanRecord {
            background-color: #02a7f0;
            text-align: center;
            font-size: 0.24rem;
            color: #fff;
            border-radius: 16px;
            margin-top: 0.4rem;
            height: 0.6rem;
            line-height: 0.6rem;
          }
          .van-popup {
            .headerTitle {
              font-size: 0.34rem;
              text-align: center;
              padding-top: 0.35rem;
            }

            .takePictureWrapper {
              display: flex;
              .dialogHeader {
                font-size: 0.3rem;
                padding-top: 0.5rem;
              }

              .van-uploader {
                img {
                  width: 0.4rem;
                  height: 0.4rem;
                }
              }
            }

            .optional {
              //盒子模型
              display: flex;
              align-items: center;
              .optionalTitleRemark {
                font-size: 0.2rem;
                width: fit-content;
                text-align: center;
              }

              input {
                border: 0;
                // float: left;
                width: 5rem;
                font-size: 0.32rem;
              }
            }

            .confirmClockIn {
              width: 98vw;
              color: #fff;
              font-size: 0.16rem;
              background-color: #02a7f0;
              border-radius: 16px;
              text-align: center;
              height: 0.8rem;
              line-height: 0.8rem;
            }
          }
          .van-popup {
            .topHeader {
              font-size: 0.38rem;
              text-align: center;
            }

            .cleanDetail {
              display: flex;
              justify-content: space-between;
              .cleanTime {
                font-size: 0.16rem;
              }

              .cleaner {
                font-size: 0.16rem;
              }
            }

            .imgWrapper {
              display: flex;
              font-size: 0.16rem;
              .takePicTitle {
                width: fit-content;
              }

              .imgContainer {
                display: flex;
                img {
                  width: 1rem;
                  height: 1rem;
                }
              }
            }

            .remarkContainer {
              display: flex;
              font-size: 0.16rem;
              .remark {
              }

              .remarkContent {
              }
            }
          }
        }
      }

      .removeBarrelWrapper {
        .removeBarrelContainer {
          .removeBarrelDetail {
            display: flex;
            background-color: #fff;
            align-items: center;
            .removeBarrelSlide {
              display: flex;
              background-color: #fff;
              .barrelStatusWaiting {
                width: 0.3rem;
                background-color: #aaaaaa;
                color: #fff;
                font-size: 0.16rem;
                text-align: center;
              }

              .barrelStatusAlready {
                width: 0.3rem;
                background-color: #70b603;
                color: #fff;
                font-size: 0.16rem;
                text-align: center;
              }

              .barrelStatusUnready {
                width: 0.3rem;
                background-color: #d9001b;
                color: #fff;
                font-size: 0.16rem;
                text-align: center;
              }
            }

            .removeBarrelClass {
              font-size: 0.16rem;
            }
          }

          .removeBarrelHistoryRecordTitle {
            height: 0.7rem;
            background-color: #fff;
            color: #02adf3;
            font-size: 0.16rem;
            text-align: center;
            margin-top: 0.4rem;
            border-radius: 16px;
            line-height: 0.7rem;
          }
        }
        .removeBarrelClassDialog {
          .van-popup {
            .removeBarrelClassTitle {
              font-size: 0.16rem;
              text-align: center;
            }

            .removeBarrelDetail {
              font-size: 0.32rem;
              display: flex;
              justify-content: space-between;
              .removeBarrelMember {
              }

              .removeBarrelTime {
              }
            }

            .restCook {
              display: flex;
              font-size: 0.32rem;
              justify-content: space-between;
              .restTitle {
              }

              .barrelNumberContainer {
                display: flex;
                align-items: center;
                .decreaseButton {
                  border: 1px solid #000;
                  width: 0.5rem;
                  height: 0.5rem;
                  text-align: center;
                }

                .dinnerRestNumber {
                }

                .increaseButton {
                  border: 1px solid #000;
                  width: 0.5rem;
                  height: 0.5rem;
                  text-align: center;
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
              font-size: 0.32rem;
              .title {
              }

              .van-radio-group {
                .van-radio {
                }
              }
            }

            .takePictureContainer {
              display: flex;
              font-size: 0.32rem;
              .takePicTitle {
              }

              .van-uploader {
                img {
                  width: 0.4rem;
                  height: 0.4rem;
                }
              }
            }

            .remarkContainer {
              display: flex;
              font-size: 0.32rem;
              .remarkTitle {
              }

              input {
                border: none;
              }
            }

            .sumContainer {
              display: flex;
              font-size: 0.32rem;
              justify-content: space-between;
              .sum {
                display: flex;
                .sumTitle {
                }

                .sumNumber {
                }
              }

              .saveButton {
                background-color: #02a7f0;
                width: 1.5rem;
                height: 0.8rem;
                border-radius: 16px;
                color: #fff;
                text-align: center;
                line-height: 0.8rem;
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
          border: 0.01rem solid #cccccc;
          margin-bottom: 0.2rem;
          //标题
          .check_wrapper_box_title {
            height: 1.12rem;
            line-height: 1.12rem;
            background-color: #fafbff;
            position: relative;
            padding-left: 0.2rem;
            img {
              position: absolute;
              right: 0;
              top: 0;
              height: 1.12rem;
            }
          }
          //内容区
          .check_wrapper_box_bottom {
            background-color: #ffffff;
            overflow: hidden;
            div {
              margin-left: 0.2rem;
              margin-top: 0.2rem;
              i {
                display: inline-block;
                border: 0.01rem solid #cccccc;
                font-style: normal;
                padding: 2px 2px 2px 2px;
                img {
                  height: 0.4rem;
                  vertical-align: middle;
                }
              }
              .check_wrapper_box_bottom_i {
                color: red;
              }
            }
            //确认按钮
            button {
              width: 1.4rem;
              height: 0.6rem;
              line-height: 0.6rem;
              background-color: #02a7f0;
              color: #ffffff;
              border: none;
              margin-left: 5.4rem;
              margin-bottom: 0.2rem;
            }
          }
        }
        //
        .check_wrapper_margin {
          margin-top: 1rem;
        }
        //巡查巡检底部
        .check_wrapper_bottom {
          width: 94%;
          height: 0.85rem;
          line-height: 0.85rem;
          background-color: #ffffff;
          position: fixed;
          bottom: 0.2rem;
          img {
            height: 0.4rem;
            vertical-align: middle;
          }
          .check_wrapper_bottom_history {
            color: #02a7f0;
            display: inline-block;
            margin-left: 1.8rem;
          }
          button {
            margin-left: 0.2rem;
            width: 1.4rem;
            height: 0.6rem;
            line-height: 0.6rem;
            background-color: #02a7f0;
            color: #ffffff;
            border: none;
          }
        }
      }
    }
  }
</style>