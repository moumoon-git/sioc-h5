<template>
  <div class="inspectionResults">
    <section style="width: 100%;background: rgb(255, 255, 255);border: 1px solid white;">
      <div style="font-size: 16px;font-family: PingFangSC-Medium;font-weight: 1000;color: rgb(51, 51, 51);text-indent: 9vw;margin: 2vh 0px;">巡查时间：{{inspectionTaskItems.inspectionTime}}</div>
      <div style="margin: 2vh 0px;font-size:15px;">
        <div style="width:40%;height:100%;display: inline-block;text-indent: 9vw;white-space: nowrap;">
          巡查人：{{inspectionTaskItems.inspector}}
        </div>
        <div style="width:55%;height:100%;display: inline-block;text-align: center;">
          <div style="display:inline-block;white-space: nowrap;">
            <i class="iconfont iconzhengque" style="color:#19be6b;"></i>
            <span style="font-family:PingFangSC-Regular,PingFang SC;font-weight:400;color:rgba(51,51,51,1);margin-left: 2vw;">正常：{{ inspectionTaskItems.filter(item=>{return item.inspectionResults=='1'}).length }}</span>
          </div>

          <div style="display:inline-block;white-space: nowrap;margin-left: 2vw;">
            <i class="iconfont iconjinggao" style="color:#fa7e7e;"></i>
            <span style="font-family:PingFangSC-Regular,PingFang SC;font-weight:400;color:rgba(51,51,51,1);margin-left: 2vw;">异常：{{inspectionTaskItems.filter(item=>{return item.inspectionResults=='0'}).length}}</span>
          </div>
        </div>
      </div>
    </section>

   
    <section style="width: 93%;margin: 2vh auto auto auto;border-radius: 5px;background: rgb(255, 255, 255);" v-for="(item,index) in inspectionTaskItems" :key="index" @click="expand(index)" >
      <div style="font-size: 16px;font-family: PingFangSC-Medium;font-weight: 1000;color: rgb(51, 51, 51);height: 10vh;line-height: 10vh;position: relative;">
        <span style="margin-left: 5vw;">{{item.name}}</span>
        <img :src="require(item.inspectionResults=='1'?'@/assets/img/normal.png':(item.inspectionResults=='0'?'@/assets/img/abnormal.png':'@/assets/img/noChecked.png'))" style="position: absolute;right: 0%;height: 10vh;">
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
              {{item.inspectionResults=='1'?'正常':'异常'}}
            </div>
          </div>

          <div>
            <span style="font-family:PingFangSC-Regular,PingFang SC;font-weight:400;color:rgba(51,51,51,1);">情况说明</span>
            <div style="padding: 1vh 0px 0px;">
              {{item.situationExplain}}
            </div>
          </div>
          <div style="width:88%;height:1px;background:rgba(221,221,221,1);margin: auto;"></div>

          <div>
            <span style="font-family:PingFangSC-Regular,PingFang SC;font-weight:400;color:rgba(51,51,51,1);">拍照说明</span>
            <div style="padding: 1vh 0px 0px;">
              <van-uploader :deletable="false" v-model="item.fileList" />
            </div>
          </div>
          <div style="width:88%;height:1px;background:rgba(221,221,221,1);margin: auto;"></div>

          <div>
            <span style="font-family:PingFangSC-Regular,PingFang SC;font-weight:400;color:rgba(51,51,51,1);">巡查地址</span>
            <div style="padding: 1vh 0px 0px;">
              <i class="iconfont icondingwei1" style="color:rgba(0,145,255,1);" ></i>
              {{item.location.poiaddress}}
            </div>
          </div>
          
        </div>
        

      </div>
    </section>
    
   

    
  </div>
</template>

<script>

export default {
  name: 'inspectionResults',
  data() {
    return {
      inspectionTaskItems:[],
      resultInstanceEntitiesId:'',
    }
  },
  components: {
  },
  computed: {
  
  },
  watch: {},
  created () {
    //console.log('this.$route',this.$route)
    this.resultInstanceEntitiesId = localStorage.getItem('resultInstanceEntitiesId')
    var that=this

    that.$http({
      // url: that.$http.adornUrl(`/investigation/instanceInfor/info/${that.$route.params.instanceEntitiesId}`),
      url: that.$http.adornUrl(`/investigation/instanceInfor/info/${that.resultInstanceEntitiesId}`),
      method: 'get',
    }).then(({ data })=>{
      //console.log("/investigation/instanceInfor/info",data)
      this.inspectionTaskItems.inspector=data.data.patrolContactorString
      this.inspectionTaskItems.inspectionTime=data.data.gmtModified
      data.data.inforEntitys.forEach(item=>{
        this.inspectionTaskItems.push({
          expandVisible:false,
          name:item.name,
          content:item.content,
          inspectionResults:item.instanceInforEntity?item.instanceInforEntity.status:'',
          situationExplain:item.instanceInforEntity?item.instanceInforEntity.remark:'',
          fileList:item.instanceInforEntity?item.instanceInforEntity.documentList.map(documentListItem=>{return { url:documentListItem.allUrl }}):[],
          location:item.instanceInforEntity?{poiaddress:item.instanceInforEntity.place,latlng:{lng:item.instanceInforEntity.longitude,lat:item.instanceInforEntity.latitude}}:{poiaddress:'',latlng:{lng:'',lat:''}}
        })
        
      })
    })

  },
  mounted () {},
  methods: {
    expand(index){
      // this.inspectionTaskItems[index].expandVisible=true
      this.inspectionTaskItems[index].expandVisible=!this.inspectionTaskItems[index].expandVisible
      this.$set(this.inspectionTaskItems,index,this.inspectionTaskItems[index])
    }
  }
}
</script>

<style lang="less" >
  .inspectionResults{
    .content{
      >div>div{
        width: 90%;
        margin: 2vh auto;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(102,102,102,1);    
      }
      .van-uploader__upload{
        display:none;
      }
    }
  }
  
  
</style>

