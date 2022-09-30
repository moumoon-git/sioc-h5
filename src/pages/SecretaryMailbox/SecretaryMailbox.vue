<template>
  <div class="SecretaryMailbox">
    <header>
        <h1>北七家镇</h1>
        <h4>12345接诉即办书记信箱</h4>
    </header>
    <van-tabs v-model="activeName" @change="handleTabsChange">
      <van-tab title="问题上报" name="problemReporting" class="problemReporting">
        <van-form @submit="handleOnSubmit" style="padding-bottom: 1.7rem;">
          <van-field
            v-model="form.username"
            name="姓名"
            label="姓名"
            placeholder="请输入上报人姓名"
            required
            :rules="[{ required: true }]"
            style="margin-top:0.2rem;"
          />
          <van-field
            v-model="form.phone"
            name="联系方式"
            label="联系方式"
            placeholder="请输入手机号码"
            type="tel"
            required
            :rules="[{ required: true, validator: verifyPhone }]"
          />
          <van-field
            v-model="form.title"
            name="标题"
            label="标题"
            placeholder="请输入标题"
            required
            :rules="[{ required: true }]"
            style="margin-top:0.2rem;"
          />
          <van-field
            :value="form.problemTypeName"
            readonly
            clickable
            name="问题类型"
            label="问题类型"
            placeholder="请选择问题类型"
            right-icon="arrow"
            @click="showPicker = true"
            required
            :rules="[{ required: true}]"
          />
          <van-field
            :value="form.problemClassificationName"
            readonly
            clickable
            name="问题分类"
            label="问题分类"
            placeholder="请选择问题分类"
            right-icon="arrow"
            @click="handleClickCascader('problemClassification')"
            required
            :rules="[{ required: true }]"
          />
          <van-field
            :value="form.datetime"
            readonly
            clickable
            name="事发时间"
            label="事发时间"
            placeholder="请选择事发时间"
            right-icon="arrow"
            @click="showDatetime = true"
            required
            :rules="[{ required: true }]"
          />
          <van-field
            :value="form.townStreetName"
            readonly
            clickable
            name="所属镇街"
            label="所属镇街"
            placeholder="请选择所属镇街"
            right-icon="arrow"
            @click="handleClickCascader('townStreet')"
            required
            :rules="[{ required: true }]"
          />
          <van-field
            :value="form.address"
            readonly
            clickable
            left-icon="location-o"
            right-icon="arrow"
            @click="handleLocation"
            required
            :rules="[{ required: true, message: '请选择定位地址' }]"
          />
          <van-field
            v-model="form.remark"
            rows="2"
            autosize
            name="问题内容"
            label="问题内容"
            type="textarea"
            maxlength="50"
            placeholder="请在此描述问题简况"
            show-word-limit
            required
            :rules="[{ required: true }]"
            style="margin-top:0.2rem;"
          />
          <van-field name="附件上传" label="附件上传(最多上传4张图片)" style="margin-top:0.2rem;">
            <template #input>
              <van-uploader v-model="form.fileList" multiple :max-count="4" :after-read="handleAfterRead"  @delete="handleDeleteFile"/>
            </template>
          </van-field>
          <van-popup v-model="showPicker" round position="bottom">
            <van-picker
              show-toolbar
              :columns="pickerColumns"
              @confirm="handleOnConfirm"
              @cancel="showPicker = false"
            />
          </van-popup>
          <van-popup v-model="showCascader" round position="bottom">
            <van-cascader
              v-model="cascaderValue"
              :title="cascaderTitle"
              :options="cascaderOptions"
              @close="showCascader = false"
              @finish="handleOnFinish"
            />
          </van-popup>
          <van-popup v-model="showDatetime" round position="bottom">
            <van-datetime-picker
              type="datetime"
              title="选择完整时间"
              :min-date="minDate"
              :max-date="maxDate"
              @confirm="handleDatetimeConfirm"
              @cancel="handleDatetimeCancel"
            />
          </van-popup>
          <section class="submit-panel">
            <button class="submit-btn">确认提交</button>
          </section>
        </van-form>
      </van-tab>
      <van-tab title="结果查询" name="resultQuery" class="resultQuery">
        <ul>
          <li v-for="(resultItem) in resultList" :key="resultItem.id" @click="handleClickResult(resultItem.id)">
            <header>
              <span>{{resultItem.typeNameSting}}</span>
              <label>{{resultItem.emergencyTypeString}}</label>
            </header>
            <i :class="{
              'to-do-icon': resultItem.status == 0,
              'in-process-icon': resultItem.status == 1,
              'completed-icon': resultItem.status == 2,
            }"></i>
            <article>
              <div>
                <label>标题</label><p>{{resultItem.title}}</p>
              </div>
              <div>
                <label>事发时间</label><p>{{resultItem.time}}</p>
              </div>
              <div>
                <label>所属区域</label><p>{{resultItem.sysTownStringName}}</p>
              </div>
              <div>
                <label>详细地址</label><p>{{resultItem.address}}</p>
              </div>
            </article>
          </li>
        </ul>
      </van-tab>
    </van-tabs>
  </div>
</template>
<script>
export default {
  name: 'SecretaryMailbox',
  data() {
    return {
      activeName: 'problemReporting',
      form: {
        username: '',
        phone: '',
        title: '',
        problemTypeId: '',
        problemTypeName: '',
        problemClassificationId: '',
        problemClassificationName: '',
        townStreetId: '',
        townStreetName: '',
        datetime: '',
        remark: '',
        fileList: [],
        annexs: [],
        address: '',
        longitude: '',
        latitude: ''
      },
      pickerColumns: [],
      showPicker: false,
      showCascader: false,
      cascaderValue: '',
      cascaderOptions: [],
      minDate: new Date(2020, 0, 1),
      maxDate: new Date(),
      showDatetime: false,
      problemTypeColumns: [],
      problemClassificationColumns: [],
      townStreetColumns: [],
      cascaderTitle: '请选择问题分类',
      resultList: [],
      addressInfo: {}
    }
  },
  computed: {
  },
  created() {
    this.initData();
    this.getProblemTypeColumns();
    this.getProblemClassificationColumns();
    this.getTownStreetColumns();
    this.getResultList();
  },
  methods: {
    verifyPhone(val) {
      return /^1[3456789]\d{9}$/.test(val);
    },
    handleTabsChange(event) {
      console.log('this.activeName',this.activeName);
    },
    handleOnSubmit(values) {
      console.log('submit values', values);
      this.$http({
        url: this.$http.adornUrl(`/emergency/emergencyinfo/saveByWechat`),
        method: 'POST',
        data: {
          openId: this.$getQueryString('openId'),
          reportName: this.form.username,
          reportPhone: this.form.phone,
          typeId: this.form.problemTypeId,
          title: this.form.title,
          sysTownId: this.form.townStreetId,
          time: this.form.datetime,
          address: this.form.address,
          detail: this.form.remark,
          longitude: this.form.longitude,
          latitude: this.form.latitude,
          annexs: this.form.annexs,
          emergencyTypeId: this.form.problemClassificationId,
          status: 0,
          reportTime: this.$dateFormatter(new Date()),
          returnVisit: 0
        }
      }).then(({data}) => {
        console.log('/emergency/emergencyinfo/saveByWechat data', data);
        if(data.code == 0) {
          this.$dialog.alert({
            message: '提交成功',
          });
          this.form = {
            username: '',
            phone: '',
            title: '',
            problemTypeId: '',
            problemTypeName: '',
            problemClassificationId: '',
            problemClassificationName: '',
            townStreetId: '',
            townStreetName: '',
            datetime: '',
            remark: '',
            fileList: [],
            annexs: [],
            address: '',
            longitude: '',
            latitude: ''
          }
          this.getResultList();
        }else {
          this.$dialog.alert({
            message: data.msg,
          });
        }
      });

    },
    handleOnConfirm(value, index) {
      console.log(`当前值：${value}, 当前索引：${index}`,this.problemTypeColumns);
      this.form.problemTypeId = this.problemTypeColumns[index].id;
      this.form.problemTypeName = this.problemTypeColumns[index].name;
      this.showPicker = false;
    },
    handleOnFinish({ selectedOptions }) {
      console.log(`selectedOptions`,selectedOptions);
      if(this.cascaderTitle == '请选择问题分类') {
        this.form.problemClassificationId = selectedOptions[selectedOptions.length-1].id;
        this.form.problemClassificationName = selectedOptions[selectedOptions.length-1].text;
      } else {
        this.form.townStreetId = selectedOptions[selectedOptions.length-1].id;
        this.form.townStreetName = selectedOptions[selectedOptions.length-1].text;
      }
      this.showCascader = false;
    },
    handleDatetimeConfirm(value){
      this.showDatetime = false;
      console.log('handleDatetimeConfirm', this.$dateFormatter(value));
      this.form.datetime = this.$dateFormatter(value);
    },
    handleDatetimeCancel(){
      this.showDatetime = false;
    },
    handleAfterRead(file) {
      // 此时可以自行将文件上传至服务器
      console.log(file);
      let fileList = [];
      if(file instanceof Array) {
        fileList = [...file];
      } else {
        fileList = [file];
      }
      fileList.forEach(item=>{
        let formData = new FormData();
        formData.append("file", item.file);
        this.$http({
          url: this.$http.adornUrl(`/upload/mailboxAttachment`),
          method: 'POST',
          data: formData,
          headers: {
            "content-type": "multipart/form-data"
          },
          processData: false
        }).then(({data}) => {
          console.log('/upload/mailboxAttachment data', data);
          if(data.code == 0) {
            this.$dialog.alert({
              message: '上传成功',
            });
            this.form.annexs.push({
              url: data.data.url,
              name: data.data.name
            })
          }else {
            this.$dialog.alert({
              message: data.msg,
            });
          }
        });
      })
      
      
    },
    initData() {
      //传回到前端
      // location.href.split('#')[0])
      var url = encodeURIComponent(location.href.split('#')[0]);
      
      this.$http({
        url: this.$http.adornUrl(`/wechatReport/jsJdkIndex`),
        method: 'get',
        params: {
          url
        }
      }).then(({data}) => {
        console.log('/wechatReport/jsJdkIndex data',data);
        let that = this;
        $('#ticket').val(data.ticket);
        $('#appId').val(data.appId);
        $('#timestamp').val(data.timestamp);
        $('#nonceStr').val(data.nonceStr);
        $('#signature').val(data.signature);
        var openId = this.$getQueryString('openId');
        console.log('openIdopenIdopenId',openId)
        $('#openId').val(openId);
        
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
            'downloadImage',
            'openLocation',
            'getLocation'
          ]
        });
        

        //获取地理位置
        wx.ready(function () {
          // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，
          // 则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
          wx.getLocation({
            type: 'gcj02', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
            success: function (res) {
              console.log('wx.getLocation res', res);

              that.form.latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
              that.form.longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
              var speed = res.speed; // 速度，以米/每秒计
              var accuracy = res.accuracy; // 位置精度

              var geocoder = new qq.maps.Geocoder({
                complete: function (result) {   //解析成功的回调函数
                  console.log('qq.maps.Geocode result', result);
                  that.addressInfo = result.detail;
                  // $('#location').val(result.detail.address);
                  that.form.address = result.detail.address;
                }
              });
              geocoder.getAddress(new qq.maps.LatLng(that.form.latitude, that.form.longitude));


            },
            fail: function (res) {
              console.log('wx.getLocation error', error)
            }
          });

        });

        
        
        

      })

    },
    handleLocation() {
      wx.openLocation({
          latitude: this.form.latitude, // 纬度，浮点数，范围为90 ~ -90
          longitude: this.form.longitude, // 经度，浮点数，范围为180 ~ -180。
          name: this.addressInfo.address, // 位置名
          address: this.addressInfo.address, // 地址详情说明
          scale: 28, // 地图缩放级别,整形值,范围从1~28。默认为最大
          // infoUrl: 'http://34vktx.natappfree.cc/index' // 在查看位置界面底部显示的超链接,可点击跳转
          success(res){
            console.log('wx.openLocation success',res);
          },
          complete(res){
            console.log('wx.openLocation complete',res);
          },
      });
    },
    getProblemTypeColumns() {
      this.$http({
        url: this.$http.adornUrl(`/sys/sysdictionary/getSysDictionaryListByCode?code=emergencyType`),
        method: 'get'
      }).then(({data}) => {
        console.log('/sys/sysdictionary/getSysDictionaryListByCode?code=emergencyType data',data);
        if(data.code == 0) {
          this.problemTypeColumns = data.data;
          this.pickerColumns = data.data.map(item=>{ return item.name });
        }else {
          this.$dialog.alert({
            message: data.msg,
          })
        }
      })
    },
    getProblemClassificationColumns() {
      this.$http({
        url: this.$http.adornUrl(`/work/workProperty/treeListByCodeAndWechat?code=YQMK`),
        method: 'get'
      }).then(({data}) => {
        console.log('/work/workProperty/treeListByCodeAndWechat?code=YQMK data',data);
        if(data.code == 0) {
          this.recursion('problemClassification', data.data);
          this.problemClassificationColumns = data.data;
        }else {
          this.$dialog.alert({
            message: data.msg,
          })
        }
      })
    },
    getTownStreetColumns() {
      this.$http({
        url: this.$http.adornUrl(`/sys/systown/treeListByWechat`),
        method: 'get'
      }).then(({data}) => {
        console.log('/sys/systown/treeListByWechat data',data);
        if(data.code == 0) {
          this.recursion('townStreet', data.list);
          this.townStreetColumns = data.list;
        }else {
          this.$dialog.alert({
            message: data.msg,
          })
        }
      })
    },
    handleClickCascader(value) {
      if(value == 'problemClassification') {
        this.cascaderTitle = '请选择问题分类';
        this.cascaderOptions.splice(0,this.cascaderOptions.length, ...this.problemClassificationColumns);
      } else if(value == 'townStreet') {
        this.cascaderTitle = '请选择所属镇街';
        this.cascaderOptions.splice(0,this.cascaderOptions.length, ...this.townStreetColumns);
      }
      this.showCascader = true;
    },
    recursion(value, data) {
      data.forEach(item=>{
        if(item.children) {
          this.recursion(value, item.children);
        }
        if(value == 'problemClassification') {
          item.text = item.name;
          item.value = item.id;
          
        } else if(value == 'townStreet') {
          item.text = item.townName;
          item.value = item.id;
        }
      })

    },
    handleDeleteFile(value, data) {
      console.log('handleDeleteFile', value, data,this.form.fileList,this.form.annexs);
      this.form.annexs.splice(data.index,1);
    },
    getResultList() {
      this.$http({
        url: this.$http.adornUrl(`/emergency/emergencyinfo/listByWechat`),
        method: 'POST',
        data: {
          limit: 10000,
          page: 1,
          openId: this.$getQueryString('openId')
        }
      }).then(({data}) => {
        console.log('/emergency/emergencyinfo/listByWechat data',data);
        if(data.code == 0) {
          this.resultList = data.page.list;
        }else {
          this.$dialog.alert({
            message: data.msg,
          })
        }
      })
    },
    handleClickResult(id) {
      this.$router.push({name: 'MailboxDetail',params: {id: id}});
    }
  }
}
</script>
<style lang="less" scoped>  
  .SecretaryMailbox {
    & > header {
      width: 100%;
      height: 2.8rem;
      background-size: 100vw 2.8rem;
      background-image: url(./assets/header-background.png);
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      position: fixed;
      top: 0%;
      left: 0%;
      h1 {
        font-size: 30px;
        font-weight: 600;
        color: #FFFFFF;
        letter-spacing: 0.01rem;
        text-shadow: 0rem 0.01rem 0.04rem rgba(0, 0, 0, 0.38);
        margin: 0rem;
      }
      h4 {
        font-size: 23px;
        font-weight: 600;
        color: #FFFFFF;
        letter-spacing: 0.01rem;
        text-shadow: 0rem 0.01rem 0.04rem rgba(0, 0, 0, 0.38);
        margin-top: 0.8rem;
        margin: 0.05rem 0rem 0rem 0rem;
      }
    }
    .van-tabs {
      width: 100vw;  
      display: flex;
      flex-wrap: wrap;
      position: fixed;
      top: 2.8rem;
      left: 0%;
      /deep/ .van-tabs__wrap {
        width: 100%;
        border-bottom: 0.01rem solid #EEEEEE;
        .van-tabs__line {
          background: #0091FF;
        }
      }
      /deep/ .van-tabs__content {
        width: 100%;
        max-height: calc(100vh - 3.7rem);
        overflow: auto;
      }
      /deep/ .van-form {
        background-color: #F5F5F5;
        margin: 0px;
        overflow: auto;
        #location {
          .van-field__control {
            margin-left: 0.1rem;
          }
        }
        .submit-panel {
          margin-top: 0.2rem;
          background: #FFFFFF;
          box-shadow: 0rem -0.01rem 0.01rem 0rem rgba(116, 116, 116, 0.3);
          text-align: center; 
          position: fixed;
          width: 100%;
          bottom: 0%;
          left: 0%;
          .submit-btn {
            border: none;
            padding: 0rem;
            display: inline-block;
            width: 6.4rem;
            height: 0.9rem;
            text-align: center;   
            line-height: 0.9rem;
            background: linear-gradient(360deg, #2B80FF 0%, #65BCFF 100%);
            box-shadow: 0rem 0.06rem 0.12rem 0rem rgba(12, 126, 161, 0.35);
            border-radius: 0.75rem;
            font-size: 20px;
            font-weight: 400;
            color: #FFFFFF;
            margin: 0.3rem auto;
          }
        }
      }
      ul {
        li {
          list-style: none;
          margin: 0.2rem;
          overflow: auto;
          background: #FFFFFF;
          box-sizing: border-box;
          padding: 0rem 0.38rem;
          border-radius: 0.1rem;
          position: relative;
          header {
            height: 1rem;
            line-height: 1rem;
            position: relative;
            &::after {
              content: '';
              width: 100%;
              height: 0.01rem;
              display: block;
              background: rgba(221,221,221,0.5);
              position: absolute;
              bottom: 0%;
            }
            span {
              font-size: 12px;
              font-weight: 400;
              color: #0091FF;
              background: #E6EFFF;
              border-radius: 0.06rem;
              padding: 0.08rem 0.16rem;
            }
            label {
              font-size: 14px;
              font-weight: 500;
              color: #333333;
              margin-left: 0.15rem;
            }
          }
          & > i {
            display: inline-block;
            width: 0.8rem;
            height: 0.8rem;
            position: absolute;
            right: 0%;
            top: 0%;
            &.to-do-icon {
              background: url(./assets/to-do-icon.png);
              background-size: 0.8rem 0.8rem;
            }
            &.in-process-icon {
              background: url(./assets/in-process-icon.png);
              background-size: 0.8rem 0.8rem;
            }
            &.completed-icon {
              background: url(./assets/completed-icon.png);
              background-size: 0.8rem 0.8rem;
            }
          }
          article {
            font-size: 13px;
            & > div {
              display: flex;
              align-items: center;
              white-space: nowrap;
              font-weight: 400;
              margin: 0.35rem 0rem;
              label {
                color: #999999;
                width: 1.4rem;
              }
              p {
                color: #333333;
                width: 5rem;
                overflow: hidden;
                text-overflow: ellipsis;
                margin: 0rem;
              }

            }
            
          }
        }
      }
    }
  }
</style>