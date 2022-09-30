<template>
  <div>
    <van-tabs v-model="active" animated @click="onClickTabs" v-if="JSON.stringify(inspectionTask) != '{}'">
      <van-tab title="巡查信息" class="information">
        <section style="width: 93%;margin: 2vh auto auto auto;border-radius: 5px;background: rgb(255, 255, 255);" >
          <div style="font-size: 16px;font-family: PingFangSC-Medium;font-weight: 1000;color: rgb(51, 51, 51);height: 10vh;line-height: 10vh;position: relative;">
            <span style="margin-left: 5vw;">任务名称：</span><span>{{inspectionTask.name}}</span>
            <img :src="require(inspectionTask.instanceStatus=='1'?'@/assets/img/haveInspected.png':'@/assets/img/toBeInspected.png' )" style="position: absolute;right: 0%;height: 10vh;">
          </div>
          <div style="width:88%;height:1px;background:rgba(221,221,221,1);margin: auto;"></div>
          <div style="width:100%;padding-bottom: 1vh;font-size: 15px;" class="content">
            <div>
              <span>巡查区域</span> <span>{{inspectionTask.groupIdName}}</span>
            </div>
            <div>
              <span>巡查部门</span> <span>{{inspectionTask.patrolDepString}}</span>
            </div>
            <div>
              <span>巡查负责人</span> <span>{{inspectionTask.patrolContactorString}}</span>
            </div>
            <div>
              <span>处置部门</span> <span>{{inspectionTask.handleDepString}}</span>
            </div>
            <div>
              <span>处置负责人</span> <span>{{inspectionTask.handleContactorString}}</span>
            </div>
            <div>
              <span>巡查地点</span> <span>{{inspectionTask.place}}</span>
            </div>
            <div>
              <span>巡查周期</span> <span>{{inspectionTask.period=="1"?'每天':(inspectionTask.period=="2"?'每周':(inspectionTask.period=="3"?'每月':'每年' ) )}}</span>
            </div>
            <div>
              <span>巡查说明</span> <span>{{inspectionTask.remark}}</span>
            </div>
          </div>
        </section>

        <section v-if="inspectionTask.lastInstanceEntity" style="width: 93%;margin: 2vh auto auto auto;border-radius: 5px;background: rgb(255, 255, 255);">
          <div style="font-size: 16px;font-family: PingFangSC-Medium;font-weight: 1000;color:rgba(187,187,187,1);height: 10vh;line-height: 10vh;">
            <span style="margin-left: 5vw;">上一次巡查：</span><span>{{inspectionTask.lastInstanceEntity.gmtModified}}</span>
          </div>
          <div style="width:88%;height:1px;background:rgba(221,221,221,1);margin: auto;"></div>
          <div style="width:100%;font-size: 15px;" class="content">
            <div>
              <span>巡查区域</span> <span>{{inspectionTask.groupIdName}}</span>
            </div>
            <div>
              <span>巡查部门</span> <span>{{inspectionTask.patrolDepString}}</span>
            </div>
            <div style="display: flex;align-items: center;">
              <span>巡查结果</span> 
              <span>
                <div style="display:inline-block;white-space: nowrap;">
                  <i class="iconfont iconzhengque" style="color:#19be6b;"></i>
                  <span style="font-family:PingFangSC-Regular,PingFang SC;font-weight:400;color:rgba(51,51,51,1);">正常：{{inspectionTask.lastInstanceEntity.usual}}</span>
                </div>
                <div style="display:inline-block;white-space: nowrap;margin-left: 6vw;">
                  <i class="iconfont iconjinggao" style="color:#fa7e7e;"></i>
                  <span style="font-family:PingFangSC-Regular,PingFang SC;font-weight:400;color:rgba(51,51,51,1);">异常：{{inspectionTask.lastInstanceEntity.unusual}}</span>
                </div>
              </span>
            </div>
          </div>
          <!-- <div style="font-size: 15px;font-family:PingFangSC-Regular,PingFang SC;font-weight:800;color:rgba(0,145,255,1);text-align:center;padding-bottom: 2vh;" @click="$router.push({name:'inspectionResults',params:{instanceEntitiesId:inspectionTask.lastInstanceEntity.id} })">查看上次巡查结果</div> -->
          <div style="font-size: 15px;font-family:PingFangSC-Regular,PingFang SC;font-weight:800;color:rgba(0,145,255,1);text-align:center;padding-bottom: 2vh;" @click="changeToInspectionResults">查看上次巡查结果</div>
        </section>

        <div style="width:88%;height:8vh;line-height:8vh;background:linear-gradient(360deg,rgba(43,128,255,1) 0%,rgba(101,188,255,1) 100%);
        box-shadow:0px 6px 12px 0px rgba(12,126,161,0.35);border-radius:75px;text-align:center;margin: 2vh auto;
        font-size:20px;font-family:PingFangSC-Regular,PingFang SC;color:rgba(255,255,255,1);" @click="changeToInspectionItems">
          开始巡查
        </div>
      </van-tab>
        <!-- font-size:20px;font-family:PingFangSC-Regular,PingFang SC;color:rgba(255,255,255,1);" @click="$router.push({name:'inspectionItems',params:{inspectionTaskItems:inspectionTask.investigationInforEntities,taskId:inspectionTask.id,instanceEntitiesId:inspectionTask.instanceEntities&&inspectionTask.instanceEntities[0]?inspectionTask.instanceEntities[0].id:''}})"> -->




      <van-tab title="巡查记录" class="results" style="padding-bottom: 2vh;">
        <section style="width:100%;background: rgb(255, 255, 255);height: 10vh;line-height: 10vh;text-align: center;margin-top: 2vh;">
          <span style="font-size: 20px;font-family: PingFangSC-Medium;font-weight: 500;color: rgb(51, 51, 51);">{{date[0]+'年'+date[1]+'月'+date[2]+'日'}}</span>
          <i class="iconfont iconrili" style="color:rgba(0,145,255,1);font-size: 20px;margin-left: 5vw;" @click="showCalendar=true"></i>
        </section>

        <div v-if="!inspectionVisible">
          <img :src="require('@/assets/img/noPatrol.png')" style="width: 27vw;margin: 32vw 50% 0px 50%;transform: translateX(-50%);">
          <div style="font-family:PingFangSC-Regular,PingFang SC;font-weight:400;color:rgba(153,153,153,1);text-align: center;">本期暂未巡查</div>
        </div>

        <div v-if="inspectionVisible">
          <!-- <section style="width: 93%;margin: 2vh auto auto auto;border-radius: 5px;background: rgb(255, 255, 255);" @click="expandVisible=true">
            <div style="font-size: 16px;font-family: PingFangSC-Medium;font-weight: 1000;color: rgb(51, 51, 51);height: 10vh;line-height: 10vh;">
              <span style="margin-left: 5vw;">总变开关柜</span>
            </div>
            <div style="width:88%;height:1px;background:rgba(221,221,221,1);margin: auto;"></div>
            <div :style="{width:'100%','font-size': '15px','padding-bottom':'0.1px'}" class="content" >
              <div style="width: 90%;margin: 2vh auto;">
                1.认真执行《电力安全作业规程》等电业法规；定期检修、定期试验、定期清理。
              </div>
              <div style="width: 90%;margin: 2vh auto;">
                2、落实好检修规程、运行规程、试验规程、安全作业规程、事故处理规程。做好检修记录、运行记录、试验记录、事故记录设备缺陷记录。各项作业都要严格落实安全措施。
              </div>

              <div v-if="expandVisible">
                <div>
                  <span style="font-family:PingFangSC-Regular,PingFang SC;font-weight:400;color:rgba(51,51,51,1);">检查结果</span>
                  <div style="padding: 1vh 0px 0px;">
                    
                  </div>
                </div>

                <div>
                  <span style="font-family:PingFangSC-Regular,PingFang SC;font-weight:400;color:rgba(51,51,51,1);">情况说明</span>
                  <div style="padding: 1vh 0px 0px;">
                    已检查完毕暂未发现问题
                  </div>
                </div>
                <div style="width:88%;height:1px;background:rgba(221,221,221,1);margin: auto;"></div>

                <div>
                  <span style="font-family:PingFangSC-Regular,PingFang SC;font-weight:400;color:rgba(51,51,51,1);">拍照说明</span>
                  <div style="padding: 1vh 0px 0px;">
                    
                  </div>
                </div>
                <div style="width:88%;height:1px;background:rgba(221,221,221,1);margin: auto;"></div>

                <div>
                  <span style="font-family:PingFangSC-Regular,PingFang SC;font-weight:400;color:rgba(51,51,51,1);">巡查地址</span>
                  <div style="padding: 1vh 0px 0px;">
                    <i class="iconfont icondingwei1" style="color:rgba(0,145,255,1);" ></i>
                    {{}}
                  </div>
                </div>         
              </div>
            </div>
          </section> -->

          <section style="width: 100%;background: rgb(255, 255, 255);border: 1px solid white;margin-top: 2vh;">
            <div style="font-size: 16px;font-family: PingFangSC-Medium;font-weight: 1000;color: rgb(51, 51, 51);text-indent: 9vw;margin: 2vh 0px;">巡查时间：{{inspectionTaskRecordsItem.gmtModified}}</div>
            <div style="margin: 2vh 0px;font-size:15px;">
              <div style="width:40%;height:100%;display: inline-block;text-indent: 9vw;white-space: nowrap;">
                巡查人：{{inspectionTaskRecordsItem.patrolContactorString}}
              </div>
              <div style="width:55%;height:100%;display: inline-block;text-align: right;">
                <div style="display:inline-block;white-space: nowrap;">
                  <i class="iconfont iconzhengque" style="color:#19be6b;"></i>
                  <span style="font-family:PingFangSC-Regular,PingFang SC;font-weight:400;color:rgba(51,51,51,1);margin-left: 2vw;">正常：{{ inspectionTaskRecordsItem.inforEntitys.filter(item=>{return item.instanceInforEntity&&item.instanceInforEntity.status=='1'}).length }}</span>
                </div>
                <div style="display:inline-block;white-space: nowrap;margin-left: 5vw;">
                  <i class="iconfont iconjinggao" style="color:#fa7e7e;"></i>
                  <span style="font-family:PingFangSC-Regular,PingFang SC;font-weight:400;color:rgba(51,51,51,1);margin-left: 2vw;">异常：{{inspectionTaskRecordsItem.inforEntitys.filter(item=>{return item.instanceInforEntity&&item.instanceInforEntity.status=='0'}).length}}</span>
                </div>
              </div>
            </div>
          </section>

        
          <section style="width: 93%;margin: 2vh auto auto auto;border-radius: 5px;background: rgb(255, 255, 255);" v-for="(item,index) in inspectionTaskRecordsItem.inforEntitys" :key="index" @click="expand(index)" >
            <div style="font-size: 16px;font-family: PingFangSC-Medium;font-weight: 1000;color: rgb(51, 51, 51);height: 10vh;line-height: 10vh;position: relative;">
              <span style="margin-left: 5vw;">{{item.name}}</span>
              <img :src="item.instanceInforEntity?require(item.instanceInforEntity.status=='1'?'@/assets/img/normal.png':(item.instanceInforEntity.status=='0'?'@/assets/img/abnormal.png':'@/assets/img/noChecked.png')):''" style="position: absolute;right: 0%;height: 10vh;">
            </div>
            <div style="width:88%;height:1px;background:rgba(221,221,221,1);margin: auto;"></div>
            <div :style="{width:'100%','font-size': '15px','padding-bottom':'0.1px'}" class="content" >
              <div style="width: 90%;margin: 2vh auto;">
                {{item.content}}
              </div>   

              <div v-if="item.expandVisible">
                <div>
                  <span style="font-family:PingFangSC-Regular,PingFang SC;font-weight:400;color:rgba(51,51,51,1);">检查结果</span>
                  <div style="padding: 1vh 0px 0px;">
                    {{item.instanceInforEntity?(item.instanceInforEntity.status=='1'?'正常':'异常'):''}}
                  </div>
                </div>

                <div>
                  <span style="font-family:PingFangSC-Regular,PingFang SC;font-weight:400;color:rgba(51,51,51,1);">情况说明</span>
                  <div style="padding: 1vh 0px 0px;">
                    {{item.instanceInforEntity?(item.instanceInforEntity.remark):''}}
                  </div>
                </div>
                <div style="width:88%;height:1px;background:rgba(221,221,221,1);margin: auto;"></div>

                <div>
                  <span style="font-family:PingFangSC-Regular,PingFang SC;font-weight:400;color:rgba(51,51,51,1);">拍照说明</span>
                  <div style="padding: 1vh 0px 0px;">
                    <van-uploader :deletable='false' v-model="item.instanceInforEntity.documentList"/>
                  </div>
                </div>
                <div style="width:88%;height:1px;background:rgba(221,221,221,1);margin: auto;"></div>

                <div>
                  <span style="font-family:PingFangSC-Regular,PingFang SC;font-weight:400;color:rgba(51,51,51,1);">巡查地址</span>
                  <div style="padding: 1vh 0px 0px;">
                    <i class="iconfont icondingwei1" style="color:rgba(0,145,255,1);" ></i>
                    {{item.instanceInforEntity?(item.instanceInforEntity.place):''}}
                  </div>
                </div>
                
              </div>
              

            </div>
          </section>

        </div>
        
        

      </van-tab>
    </van-tabs> 
    <van-calendar v-model="showCalendar" @confirm="onCalendarConfirm" :min-date="new Date('2000/01/01')"/>
  </div>
</template>

<script>
export default {
  name: 'inspectionInformation',
  data() {
    return {
      active: 0,
      expandVisible:false,
      inspectionVisible:false,
      showCalendar:false,
      date:this.dateFormatter(new Date()).split(' ')[0].split('-'), 
      inspectionTask:{
      },
      inspectionTaskRecords:[],
      inspectionTaskRecordsItem:{}
    }
  },
  components: {},
  computed: {},
  watch: {},
  created () {},
  mounted () {
    this.$http({
      url: this.$http.adornUrl('/weChatHandleTask/getPlatformByOpenId'),
      method: 'get',
      params: this.$http.adornParams({
        openId:this.$getQueryString('openId')
        // openId:"oMHlns9GVz2HOkNw5ubfasT_GHv0"
      })
    }).then( res => {
      // //console.log('/weChatHandleTask/getPlatformByOpenId',res)
      if (res.data.mailContactorEntity == "null" || res.data.mailContactorEntity == null) {
        alert("该用户还没有激活，请先激活！");
        window.location.href = `./activate.html?openId=` + this.$getQueryString('openId');
      }else{
        this.$http({
          url: this.$http.adornUrl('/sys/wxLogin'),
          method: 'post',
          data: this.$http.adornData({
            openId: this.$getQueryString('openId')
          })
        }).then(({ data }) => {
          // //console.log("/sys/wxLogin",data)
          localStorage.setItem('token',data.token)
        })
      } 
    })


    this.$http({
      url: this.$http.adornUrl('/investigation/investigationTask/infoByCodeNum'),
      method: 'get',
      params: this.$http.adornParams({
        codeNum:this.$getQueryString('codeNum')
        // codeNum:"7b2f9ebd9de44941ae6c01ddf5f5081a-1605261883622"
      })
    }).then(({ data }) => {
      // //console.log("data",data)
      if(data.status=='-1'){
        this.$router.push({path:'/invalidQRCode'})
      }
      if(data.status=='1'){
        this.$router.push({path:'/inspectionDisabled'})
      }

      this.inspectionTask=data.data
      
      data.data.allInforEntities.forEach(item=>{
        if(item.inforEntitys){
          item.inforEntitys.forEach(element=>{
            element.expandVisible=false
          })
        }
        item.taskInfor=JSON.parse(item.taskInfor)
      })
      this.inspectionTaskRecords=data.data.allInforEntities
      // //console.log("JSON.parse(this.inspectionTaskRecords[0].taskInfor)",this.inspectionTaskRecords)
      
    })
  },
  methods: {
    /**
     * @description: 跳转到巡查结果页面
     * @param {}
     * @return {}
     */
    changeToInspectionResults(){
      localStorage.setItem('resultInstanceEntitiesId',this.inspectionTask.lastInstanceEntity.id)
      this.$router.push({name:'inspectionResults'});
    },
    /**
     * @description: 跳转到巡查项目页面
     * @param {}
     * @return {}
     */
    changeToInspectionItems(){
      localStorage.setItem('inspectionTaskItems',JSON.stringify(this.inspectionTask.investigationInforEntities));
      localStorage.setItem('taskId',this.inspectionTask.id);
      localStorage.setItem('instanceEntitiesId',this.inspectionTask.instanceEntities&&this.inspectionTask.instanceEntities[0]?this.inspectionTask.instanceEntities[0].id:'');
      this.$router.push({
        name:'inspectionItems',
        params:{
          inspectionTaskItems:this.inspectionTask.investigationInforEntities,taskId:this.inspectionTask.id,instanceEntitiesId:this.inspectionTask.instanceEntities&&this.inspectionTask.instanceEntities[0]?this.inspectionTask.instanceEntities[0].id:''
          }
      })
    },
    onCalendarConfirm(date){
      this.showCalendar=false
      this.date=this.dateFormatter(date).split(' ')[0].split('-')
      // //console.log(date)
      for(let i=0;i<this.inspectionTaskRecords.length;i++){
        if(this.inspectionTaskRecords[i].gmtCreate.split(' ')[0]==this.date.join('-')){
          this.inspectionTaskRecordsItem=this.inspectionTaskRecords[i]
          this.inspectionVisible=true
          break;
        }else{
          this.inspectionTaskRecordsItem={}
          this.inspectionVisible=false
        }
      }
    },
    onClickTabs(name){
      // //console.log("name, title",name, title,typeof name,this)
      
      if(name==1){
        for(let i=0;i<this.inspectionTaskRecords.length;i++){
          if(this.inspectionTaskRecords[i].gmtCreate.split(' ')[0]==this.date.join('-')){
            this.inspectionTaskRecordsItem=this.inspectionTaskRecords[i]
            this.inspectionVisible=true
            break;
          }else{
            this.inspectionTaskRecordsItem={}
            this.inspectionVisible=false
          }
        }     
      }
      
    },
    expand(index){
      // this.inspectionTaskRecordsItem.inforEntitys[index].expandVisible=true
      this.inspectionTaskRecordsItem.inforEntitys[index].expandVisible=!this.inspectionTaskRecordsItem.inforEntitys[index].expandVisible
      this.$set(this.inspectionTaskRecordsItem.inforEntitys,index,this.inspectionTaskRecordsItem.inforEntitys[index])
      if(this.inspectionTaskRecordsItem.inforEntitys[index].instanceInforEntity&&this.inspectionTaskRecordsItem.inforEntitys[index].instanceInforEntity.documentList){
      //  //console.log('2',this.inspectionTaskRecordsItem.inforEntitys[index].instanceInforEntity.documentList)
        if( this.inspectionTaskRecordsItem.inforEntitys[index].instanceInforEntity.documentList.filter(item=>{return item.allUrl!=null }).length!=0  ){
          this.inspectionTaskRecordsItem.inforEntitys[index].instanceInforEntity.documentList=this.inspectionTaskRecordsItem.inforEntitys[index].instanceInforEntity.documentList.map(item=>{return {url:item.allUrl} }) 
        }
        
      }
      if(!this.inspectionTaskRecordsItem.inforEntitys[index].instanceInforEntity){
        // //console.log('3')
        this.inspectionTaskRecordsItem.inforEntitys[index].instanceInforEntity={
          documentList:[]
        }
      }
      
    },
    //格式化起始时间结束时间
    dateFormatter(str) {
      //默认返回yyyy-MM-dd HH-mm-ss
      var hasTime = arguments[1] != false ? true : false; //可传第二个参数false，返回yyyy-MM-dd
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
          [year, month, day].join("-") + " " + [hour, minute, second].join(":")
        );
      } else {
        return [year, month, day].join("-");
      }
    }
  }
}
</script>

<style lang="less" scoped>
 
  .van-tabs{
    font-family:PingFangSC-Semibold,PingFang SC;
    color:rgba(102,102,102,1);
    /deep/ .van-tabs__line {
      background-color: rgba(0,145,255,1);
    }
    /deep/ .van-tab--active {
      color: rgba(51,51,51,1);
      font-weight: 600;
    }
    
  }

  .information .content{
    >div{
      margin: 2vh 0px;
      span:first-child{
        width: 30%;
        text-indent: 5vw;
        display: inline-block;
        white-space: nowrap;
        font-family:PingFangSC-Regular,PingFang SC;
        font-weight:400;
        color:rgba(153,153,153,1);
        float: left;
      }
      span:last-child{
        width: 60%;
        margin-left: 5%;
        display: inline-block;
        font-family:PingFangSC-Regular,PingFang SC;
        font-weight:400;
        color:rgba(51,51,51,1);

      }
    }
  }

  .results .content{
    >div>div{
      width: 90%;
      margin: 2vh auto;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(102,102,102,1);    
    }
    /deep/ .van-uploader__upload{
      display:none;
    }
  }

</style>
