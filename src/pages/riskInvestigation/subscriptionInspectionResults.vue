<template>
  <div class="subscriptionInspectionResults">
    <van-tabs v-model="active" animated @click="onClickTabs">
        <van-tab title="我的巡查" style="padding-bottom: 2vh;" v-if="myTaskVisible">
            <section  class="top" style="width: 100%;height: 8vh;line-height: 8vh;background: rgb(255, 255, 255);border: 1px solid white;text-align: center;font-size:15px;margin-top:2vh;">
                <div style="display:inline-block;white-space: nowrap;">
                <i class="iconfont iconzhengque" style="color:#19be6b;"></i>
                <span style="font-family:PingFangSC-Regular,PingFang SC;font-weight:400;color:rgba(51,51,51,1);margin-left: 2vw;">正常：{{ myInspectionTaskRecords.filter(item=>{return item.resultStatus=='1'}).length }}</span>
                </div>

                <div style="display:inline-block;white-space: nowrap;margin-left: 6vw;">
                <i class="iconfont iconjinggao" style="color:#fa7e7e;"></i>
                <span style="font-family:PingFangSC-Regular,PingFang SC;font-weight:400;color:rgba(51,51,51,1);margin-left: 2vw;">异常：{{ myInspectionTaskRecords.filter(item=>{return item.resultStatus=='2'}).length }}</span>
                </div>  

                <div style="display:inline-block;white-space: nowrap;margin-left: 6vw;">
                <i class="iconfont iconguanbi" style="color:rgba(153,153,153,1);"></i>
                <span style="font-family:PingFangSC-Regular,PingFang SC;font-weight:400;color:rgba(51,51,51,1);margin-left: 2vw;">未巡查：{{ myInspectionTaskRecords.filter(item=>{return item.status=='0'}).length }}</span>
                </div> 
            </section>

            <section style="width: 93%;margin: 2vh auto auto auto;border-radius: 5px;background: rgb(255, 255, 255);" v-for="(item,index) in myInspectionTaskRecords" :key="index" @click="enterToCheckDetail(item)">
                <div style="height: 10vh;line-height: 10vh;position:relative;">
                    <span style="font-size: 16px;font-family: PingFangSC-Medium;font-weight: 1000;color: rgb(51, 51, 51);margin-left: 5vw;"></span><span>{{item.taskEntity.name}}</span>
                    <span style="font-size: 15px;font-family: PingFangSC-Medium;font-weight: 400;color: rgba(51,51,51,1);position:absolute;right:5vw;">{{item.gmtModified}}</span>
                    <img v-if="item.status=='0'" :src="require('@/assets/img/noChecked.png')" style="position: absolute;right: 0%;height: 10vh;">
                    <img v-if="item.status=='-1'" :src="require('@/assets/img/toBeInspected.png')" style="position: absolute;right: 0%;height: 10vh;">
                    <img v-if="item.status=='1'" :src="require('@/assets/img/haveInspected.png')" style="position: absolute;right: 0%;height: 10vh;">
                </div>
                <div style="width:88%;height:1px;background:rgba(221,221,221,1);margin: auto;"></div>
                <div style="width:100%;padding-bottom: 1vh;font-size: 15px;" class="content">
                    <div>
                        <span>巡查区域：</span> <span>{{item.taskEntity.groupIdName}}</span>
                    </div>

                    <div style="display: flex;">
                        <div style="width:40%;height:100%;display: inline-block;text-indent: 5vw;white-space: nowrap;">
                            <span>巡查人：</span> <span style="overflow: hidden;text-overflow: ellipsis;">{{item.patrolContactorString}}</span>
                        </div>
                        <div style="width:60%;height:100%;display: inline-block;text-align: center;">
                            <div style="display:inline-block;white-space: nowrap;">
                                <i class="iconfont iconzhengque" style="color:#19be6b;"></i>
                                <span style="font-family:PingFangSC-Regular,PingFang SC;font-weight:400;color:rgba(51,51,51,1);margin-left: 2vw;">正常：{{item.usual}}</span>
                            </div>

                            <div style="display:inline-block;white-space: nowrap;margin-left: 2vw;">
                                <i class="iconfont iconjinggao" style="color:#fa7e7e;"></i>
                                <span style="font-family:PingFangSC-Regular,PingFang SC;font-weight:400;color:rgba(51,51,51,1);margin-left: 2vw;">异常：{{item.unusual}}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <van-pagination v-model="myCurrentPage" :page-count="myPageCount" mode="simple" @change="myPageChange" style="margin: 2vh auto 0px auto;width: 90%;"/>
        </van-tab>

        <van-tab title="领导巡查" style="padding-bottom: 2vh;" v-if="bossTaskVisible">
            <section class="top" style="width: 100%;height: 8vh;line-height: 8vh;background: rgb(255, 255, 255);border: 1px solid white;text-align: center;font-size:15px;margin-top:2vh;">
                <div style="display:inline-block;white-space: nowrap;">
                <i class="iconfont iconzhengque" style="color:#19be6b;"></i>
                <span style="font-family:PingFangSC-Regular,PingFang SC;font-weight:400;color:rgba(51,51,51,1);margin-left: 2vw;">正常：{{ bossInspectionTaskRecords.filter(item=>{return item.resultStatus=='1'}).length }}</span>
                </div>

                <div style="display:inline-block;white-space: nowrap;margin-left: 6vw;">
                <i class="iconfont iconjinggao" style="color:#fa7e7e;"></i>
                <span style="font-family:PingFangSC-Regular,PingFang SC;font-weight:400;color:rgba(51,51,51,1);margin-left: 2vw;">异常：{{ bossInspectionTaskRecords.filter(item=>{return item.resultStatus=='2'}).length }}</span>
                </div>  

                <div style="display:inline-block;white-space: nowrap;margin-left: 6vw;">
                <i class="iconfont iconguanbi" style="color:rgba(153,153,153,1);"></i>
                <span style="font-family:PingFangSC-Regular,PingFang SC;font-weight:400;color:rgba(51,51,51,1);margin-left: 2vw;">未巡查：{{ bossInspectionTaskRecords.filter(item=>{return item.status=='0'}).length }}</span>
                </div> 
            </section>

            <section style="width: 93%;margin: 2vh auto auto auto;border-radius: 5px;background: rgb(255, 255, 255);" v-for="(item,index) in bossInspectionTaskRecords" :key="index" @click="$router.push({name:'inspectionResults',params:{instanceEntitiesId:item.id} })">
                <div style="height: 10vh;line-height: 10vh;position:relative;">
                    <span style="font-size: 16px;font-family: PingFangSC-Medium;font-weight: 1000;color: rgb(51, 51, 51);margin-left: 5vw;"></span><span>{{item.taskEntity.name}}</span>
                    <span style="font-size: 15px;font-family: PingFangSC-Medium;font-weight: 400;color: rgba(51,51,51,1);position:absolute;right:5vw;">{{item.gmtModified}}</span>
                    <img v-if="item.status=='0'" :src="require('@/assets/img/noChecked.png')" style="position: absolute;right: 0%;height: 10vh;">
                    <img v-if="item.status=='-1'" :src="require('@/assets/img/toBeInspected.png')" style="position: absolute;right: 0%;height: 10vh;">
                    <img v-if="item.status=='1'" :src="require('@/assets/img/haveInspected.png')" style="position: absolute;right: 0%;height: 10vh;">
                </div>
                <div style="width:88%;height:1px;background:rgba(221,221,221,1);margin: auto;"></div>
                <div style="width:100%;padding-bottom: 1vh;font-size: 15px;" class="content">
                    <div>
                        <span>巡查区域：</span> <span>{{item.taskEntity.groupIdName}}</span>
                    </div>

                    <div style="display: flex;">
                        <div style="width:40%;height:100%;display: inline-block;text-indent: 5vw;white-space: nowrap;">
                            <span>巡查人：</span> <span style="overflow: hidden;text-overflow: ellipsis;">{{item.patrolContactorString}}</span>
                        </div>
                        <div style="width:60%;height:100%;display: inline-block;text-align: center;">
                            <div style="display:inline-block;white-space: nowrap;">
                                <i class="iconfont iconzhengque" style="color:#19be6b;"></i>
                                <span style="font-family:PingFangSC-Regular,PingFang SC;font-weight:400;color:rgba(51,51,51,1);margin-left: 2vw;">正常：{{item.usual}}</span>
                            </div>

                            <div style="display:inline-block;white-space: nowrap;margin-left: 2vw;">
                                <i class="iconfont iconjinggao" style="color:#fa7e7e;"></i>
                                <span style="font-family:PingFangSC-Regular,PingFang SC;font-weight:400;color:rgba(51,51,51,1);margin-left: 2vw;">异常：{{item.unusual}}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <van-pagination v-model="bossCurrentPage" :page-count="bossPageCount" mode="simple" @change="bossPageChange" style="margin: 2vh auto 0px auto;width: 90%;"/>
        </van-tab>
    </van-tabs>
    
   

    
  </div>
</template>

<script>

export default {
  name: 'subscriptionInspectionResults',
  data() {
    return {
        active: 0,
        myInspectionTaskRecords:[],
        bossInspectionTaskRecords:[],
        myCurrentPage:1,
        myPageCount:0,
        bossCurrentPage:1,
        bossPageCount:0,
        myTaskVisible:false,
        bossTaskVisible:false
    }
  },
  components: {
  },
  computed: {
  
  },
  watch: {},
  created () {},
  mounted () {
    // this.$cookie.set('token','WX_155ac11beb07cf990901a1ece18da137')
    // var that = this
    //console.log("this.$getQueryString('openId')",this.$getQueryString('openId'),this)
    // this.$http({
    //     url: this.$http.adornUrl('/sys/wxLogin'),
    //     method: 'post',
    //     data: this.$http.adornData({
    //         openId: this.$getQueryString('openId')
    //     })
    // }).then(({ data }) => {
    //     //console.log("/sys/wxLogin",data)
    // })

    this.$http({
        url: this.$http.adornUrl('/sys/menu/wxnav'),
        method: 'get',
        params: this.$http.adornParams({   
        })
    }).then(({ data }) => {
        //console.log("/sys/menu/wxnav",data)
        if(data.permissions.filter(item=>item=='wechatInvestigation:investigation:wechatInvestigationList').length!=0){
            this.myTaskVisible=true
           
        }
        if(data.permissions.filter(item=>item=='wechatInvestigation:investigation:wechatInvestigationListInplatform').length!=0){
            this.bossTaskVisible=true     
        }
        this.onClickTabs(0)
        if(!(this.myTaskVisible&&this.bossTaskVisible)){
            this.$('.van-tabs__wrap').css('display','none')
             //console.log('$(.top)',that.$('.top'))
                // that.$('.top')[0].style['margin-top']='0px'
        }
    })

    
    
    

    
  },
  methods: {
     enterToCheckDetail(item) {
        localStorage.setItem('resultInstanceEntitiesId',item.id)
        this.$router.push({name:'inspectionResults',params:{instanceEntitiesId:item.id} })
    },
    myPageChange(){
        this.$http({
            url: this.$http.adornUrl('/wechatInvestigation/investigation/wechatInvestigationList'),
            method: 'post',
            data: this.$http.adornData({
                "page":this.myCurrentPage,
                "limit":10,
                "groupIds":[],
                "startTime":"",
                "endTime":"",
                "search":"",
                "period":"",
                "status":"",
                "resultStatus":""
            })
        }).then(({ data }) => {
            //console.log("/wechatInvestigation/investigation/wechatInvestigationList",data)
            this.myInspectionTaskRecords=data.page.list
            this.myPageCount=data.page.totalPage
        })
    },
    bossPageChange(){
        this.$http({
            url: this.$http.adornUrl('/wechatInvestigation/investigation/wechatInvestigationList'),
            method: 'post',
            data: this.$http.adornData({
                "page":this.bossCurrentPage,
                "limit":10,
                "groupIds":[],
                "startTime":"",
                "endTime":"",
                "search":"",
                "period":"",
                "status":"",
                "resultStatus":""
            })
        }).then(({ data }) => {
            //console.log("/wechatInvestigation/investigation/wechatInvestigationList",data)
            this.bossInspectionTaskRecords=data.page.list
            this.bossPageCount=data.page.totalPage
        })
    },
    onClickTabs(name){
        if(name==0){
            this.$http({
                url: this.$http.adornUrl('/wechatInvestigation/investigation/wechatInvestigationList'),
                method: 'post',
                data: this.$http.adornData({
                    "page":this.myCurrentPage,
                    "limit":10,
                    "groupIds":[],
                    "startTime":"",
                    "endTime":"",
                    "search":"",
                    "period":"",
                    "status":"",
                    "resultStatus":""
                })
            }).then(({ data }) => {
                //console.log("/wechatInvestigation/investigation/wechatInvestigationList",data)
                this.myInspectionTaskRecords=data.page.list
                this.myPageCount=data.page.totalPage
            })
        }
        if(this.myTaskVisible==true&&this.bossTaskVisible==true&&name==1||this.myTaskVisible==false&&this.bossTaskVisible==true&&name==0 ){
            this.$http({
                url: this.$http.adornUrl('/wechatInvestigation/investigation/wechatInvestigationListInplatform'),
                method: 'post',
                data: this.$http.adornData({
                    "page":this.bossCurrentPage,
                    "limit":10,
                    "groupIds":[],
                    "startTime":"",
                    "endTime":"",
                    "search":"",
                    "period":"",
                    "status":"",
                    "resultStatus":"" 
                })
            }).then(({ data }) => {
                //console.log("/wechatInvestigation/investigation/wechatInvestigationListInplatform",data)
                this.bossInspectionTaskRecords=data.page.list
                this.bossPageCount=data.page.totalPage
            })     
        }
    }
  }
}
</script>

<style lang="less" >
  .subscriptionInspectionResults{
    .content{
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
                display: inline-block;
                font-family:PingFangSC-Regular,PingFang SC;
                font-weight:400;
                color:rgba(51,51,51,1);

            }
        }
    }
  }
  
  
</style>

