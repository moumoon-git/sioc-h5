<template>
    <div class="example">
     <div class="searchcontainer">
      <div class="searchwrap">
                <span class="iconfont iconsousuo searchicon"></span>
                <input type="text" placeholder="请搜索关键字">
      </div>
      <div style="display: flex;" class="top">
      <div @click="this.goBlack" style="display: inline;" class="returnButton">返回</div>
         <div style="display: flex;" v-for="(item,index) in groupNameList" :key="index" class="groupWrap">
      <span class="next iconfont iconjf-row" v-if="index !== 0"></span>
      <div class="nextrank" :class="{groupActive: index !== groupNameList.length -1}">{{item}}</div>
         </div>
      </div>
     </div>
     <div class="departmentcontainer">
      <template v-if="!peopleVisible">
        <div v-for="(item,index) in this.groupList" :key="index" @click.self="onClick(item)" class="groupItem">
          <van-checkbox v-model="item.checked"  @click="checkBoxChange(item)"></van-checkbox>
          {{item.name}}
          <span class="iconfont iconjf-row entericon"></span>
        </div>
      </template>
      
      <template v-if="peopleVisible">
        <div v-for="(item,index) in peopleList" :key="index" class="contactslide">
          <van-checkbox v-model="item.checked"  @click="addContacterList(item)"></van-checkbox>
          <div class="personavatar">{{item.name?item.name.substring(item.name.length-2):''}}</div>
                      <div class="personmessage">
                          <div class="personcontainer">
                              <div class="personname">{{item.name}}</div>
                              <div v-if="item.position" class="personcareer">{{item.position}}</div>
                          </div>
                          <div v-if="item.workUnit" class="address">{{item.workUnit}}</div>
                      </div>
        </div>
      </template>
     </div>
      <div class="bottomslide">
             <div class="choosepeople">
                 已选择：{{contacterList.length}}人
             </div>
             <div class="yesbutton" @click="showChooseContacter">
                 确定
             </div>
         </div>
      <chooseContacterDialog :show="dialogShow" :personNumber="personNum" @closeDialog="closeDialog" @transferOrder="transferOrd" :userArr="userList" @deleteUser="deletePerson"></chooseContacterDialog>
    </div>
</template>

<script>
import { parse } from 'path'
import chooseContacterDialog from './chooseContacterDialog.vue'
export default {
  name: 'chooseContacterList',
  data() {
    return {
      userList: [],//弹框的用户数据
      personNum: 0,//选中人数
      dialogShow: false,//控制弹框显示
      groupNameList: ['联系人'],//层级列表
      tempaleList:[],
      // groupList:[
      //   {name:"1",id:'1',parentId:'',checked:false,children:[
      //     {name:'11',parentId:'1',id:'11',checked:false,children:[{name:'111',parentId:'11',id:'111'}] },
      //     {name:'11',parentId:'1',id:'11',checked:false,children:[{name:'111',parentId:'11',id:'111'}] },
      //     {name:'11',parentId:'1',id:'11',checked:false,children:[{name:'111',parentId:'11',id:'111'}] }
      //   ]},
      //   {name:"2",id:'2',parentId:'',checked:false,children:[
      //     {name:'22',parentId:'2',id:'22',checked:false,children:[{name:'222',parentId:'22',id:'222'}] },
      //     {name:'22',parentId:'2',id:'22',checked:false,children:[{name:'222',parentId:'22',id:'222'}] },
      //     {name:'22',parentId:'2',id:'22',checked:false,children:[{name:'222',parentId:'22',id:'222'}] }
      //   ]},
      //   {name:"3",id:'3',parentId:'',checked:false,children:[
      //     {name:'33',parentId:'3',id:'33',checked:false,children:[{name:'333',parentId:'33',id:'333'}] },
      //     {name:'33',parentId:'3',id:'33',checked:false,children:[{name:'333',parentId:'33',id:'333'}] },
      //     {name:'33',parentId:'3',id:'33',checked:false,children:[{name:'333',parentId:'33',id:'333'}] }
      //   ]},
      // ],
      groupList: [],
      contacterList:[], //获取勾选的所有组下的联系人
      groupIdList:[], //获取勾选的所有组id
      peopleVisible:false,
      peopleList:[]
    }
  },
  components: {
    chooseContacterDialog
  },
  computed: {
  
  },
  watch: {},
  created () {
    this.$http({
      url: this.$http.adornUrl(`/mail/mailgroup/list`),
      method: 'get',
      params: this.$http.adornParams({
      })
    }).then(({data}) => {
      //console.log('/mail/mailgroup/list',data)
      this.addAttribute(data.data)
      var that=this
      Promise.resolve(that.addAttribute(data.data)).then(()=>{
        //console.log("data.data",data.data)
        that.groupList=data.data
        that.tempaleList=data.data
      })
      
    })
   
  },
  mounted () {
    // this.tempaleList=this.groupList
  },
  methods: {
    deletePerson(userId) {//删除弹框中的人
      let pIndex =  this.contacterList.findIndex((item,index) => {
        return item.id === userId
      })
      this.contacterList.splice(pIndex,1)
      this.peopleList.forEach((item,index) => {
          if(item.id === userId) {
            item.checked = false
          }
      })
      this.personNum = this.contacterList.length
    },
    transferOrd() {//转发工单
        let workId = parseInt(localStorage.getItem('workId'))
     let userIdArr = []
     let allContacterArr = this.contacterList
     if(allContacterArr.length === 0) {
         this.$notify({
           type: "warning",
           message: "联系人为空无法转发"
         })
         return 
     }
     if(allContacterArr.length !== 0) {
       allContacterArr.forEach((item,index) => {
         userIdArr.push(item.id)
       })
     }
      this.$http({
        url: this.$http.adornUrl(`/work/workSheet/transmit`),
        method: "post",
        data: this.$http.adornData({
          "id": workId,
          "participantsManList": userIdArr,
          'forwarderId': parseInt(localStorage.getItem("forwarderId"))
        })
      }).then(({data}) => {
        //console.log('转发后的结果为',data)
        if(data && data.code === 0) {
          this.dialogShow = false
          var that = this
          this.$dialog.alert({
          message: '转发成功',
           }).then(() => {
             
             that.$router.go(-1)
           });
        }else {
          this.$notify({
            type: 'danger',
            message: '转发失败请重试'
          })
        }
      })

    },
    closeDialog() {//关闭弹框
      this.dialogShow = false
    },
    showChooseContacter() {
      this.dialogShow = true
      this.personNum = this.contacterList.length
      this.userList = this.contacterList
    },
    addContacterList(item){
      if(item.checked){
        if(this.contacterList.filter(element=>{return element.id==item.id}).length==0){
          this.contacterList.push(item)
        }
      }else{
        this.contacterList=this.contacterList.filter(element=>{
          return element.id!=item.id
        })
      }
      
    },
    checkBoxChange(item){
      this.groupIdList=[]
      //console.log("checked,item",item)
      var that=this
      if(item.checked){ //当勾选时，添加勾选组下所有联系人
        Promise.resolve(that.getGroupIdRecursion(item)).then(()=>{
          that.$http({
            url: that.$http.adornUrl(`/mail/mailcontactor/list`),
            method: 'post',
            data: that.$http.adornData({
              "limit":100000000,
              "page":1,
              "platformId":"",
              "groupId": that.groupIdList
            })
          }).then(({data}) => {
            //console.log("/mail/mailcontactor/list",data)
            data.data.list.forEach(item=>{
              if(this.contacterList.filter(element=>{return element.id==item.id}).length==0){
                this.contacterList.push(item)
              }
              
            })
            
          })
        })
              
      }else{ //当取消勾选时，去除勾选组下所有联系人
        Promise.resolve(that.getGroupIdRecursion(item)).then(()=>{
          that.$http({
            url: that.$http.adornUrl(`/mail/mailcontactor/list`),
            method: 'post',
            data: that.$http.adornData({
              "limit":100000000,
              "page":1,
              "platformId":"",
              "groupId": that.groupIdList
            })
          }).then(({data}) => {
            //console.log("/mail/mailcontactor/list",data)
            data.data.list.forEach(item=>{
              that.contacterList=that.contacterList.filter(element=>{
                return element.id!=item.id
              })
              
            })
            
          })
        })
      }
     

      this.checkBoxRecursion(item)
    },
    onClick(event){
      this.groupNameList.push(event.name)
      //console.log("event",event)
      if(event.children){
        this.groupList=event.children
      }else{
        this.peopleList=[]
        this.$http({
          url: this.$http.adornUrl(`/mail/mailcontactor/list`),
          method: 'post',
          data: this.$http.adornData({
            "limit":100000000,
            "page":1,
            "platformId":"",
            "groupId": [event.id]
          })
        }).then(({data}) => {
          //console.log("/mail/mailcontactor/list",data)
          if(data.data.list.length!=0){
            this.peopleVisible=true
            var that=this
            Promise.resolve(data.data.list.forEach(item=>{
              item.checked=false
            })).then(()=>{
              that.peopleList=data.data.list
              for(let i=0;i<that.contacterList.length;i++){
                for(let j=0;j<that.peopleList.length;j++){
                  if(that.contacterList[i].id==that.peopleList[j].id){
                
                    that.peopleList[j].checked=true
                    
                  }
                }
              }
            })
            
            
            
          }
        })
      }
      
    },
    recursion(parentId,template){
      for(let i=0;i<template.length;i++){

        if(template[i].id==parentId){
          this.groupList=template
          break;
        }
        if(i==template.length-1){
          for(let j=0;j<template.length;j++){
            if(template[j].children){
              this.recursion(parentId,template[j].children)
            }
          }       
        }

      }
    },
    getGroupIdRecursion(list){ //递归获取勾选组下的所有组id
      this.groupIdList.push(list.id)
      if(list.children){
        list.children.forEach(element=>{
          this.groupIdList.push(element.id)
          this.getGroupIdRecursion(element)
        })
      }
    },
    checkBoxRecursion(list){ //递归勾选组下的所有组
      if(list.children){
        list.children.forEach(element=>{
          element.checked=list.checked
          this.checkBoxRecursion(element)
        })
      }
    },
    addAttribute(list){ 
      for(var i=0;i<list.length;i++){
        list[i].checked=false
        if(list[i].children){
          this.addAttribute(list[i].children)
        }
      }
    },
    goBlack(){
      if(this.groupNameList.length !== 1) {
      this.groupNameList.pop()
      }
      //console.log("返回")
      if(this.peopleVisible){
        this.peopleVisible=false
      }else{
        var parentId=this.groupList[0].parentId
        var template=this.tempaleList
        this.recursion(parentId,template)
      }
      
      
    }
  }
}
</script>

<style lang="less" scoped>
  .example {
    .searchcontainer {
      padding-top: 1.5vh;
      background-color: #FFFFFF;
    .searchwrap {
        width: 91.5vw;
        height: 3.7vh;
        border-radius: 2.13vw;
        background-color: #F2F2F2;
        
        margin-left: 4.3vw;
        display: flex;
        // box-sizing: border-box;
      span.searchicon {
          width: 4.13vw;
          height: 2.55vh;
          margin: 0.6vh 1.1vw .6vh 2.13vw;

      }

      input {
          border: none;
          background-color: #F2F2F2;
          font-size:0.28rem;
          font-family:PingFangSC-Regular,PingFang SC;
          font-weight:400;
          color:rgba(153,153,153,1);
          &::placeholder {
            //  font-size: 3.73vw;
            //  color: #999999;
             font-size:0.28rem;
            font-family:PingFangSC-Regular,PingFang SC;
            font-weight:400;
            color:rgba(153,153,153,1);
          }

      }
    }
  .top {
    display: flex;
    margin-top: 1vh;
    .returnButton {
      display: inline;
      font-size:0.32rem;
      font-family:PingFangSC-Regular,PingFang SC;
      font-weight:400;
      color:rgba(102,102,102,1);

    }

    .groupWrap {
      display: flex;
      justify-content: center;
      align-items: center;
       .next{
         font-size: 1vw;

      }

      .nextrank {
        font-size: 4.27vw;
        font-size:0.32rem;
        font-family:PingFangSC-Regular,PingFang SC;
        font-weight:400;
        color:rgba(102,102,102,1);
         &.groupActive {
           color: #0091FF;
         }
      }
    }
  }
}
.departmentcontainer {
  background-color: #FFFFFF;
    margin-top: 1.5vh;
    padding-left: 2.93vw;
    height: 82vh;
    overflow: scroll;
  .groupItem {
    height: 7.5vh;
    position: relative;
    background: white;
    // border: 1px solid;
    border-bottom: .2vh solid #DDDDDD;
    display: flex;
    align-items: center;
    font-size:0.32rem;
    font-family:PingFangSC-Regular,PingFang SC;
    font-weight:400;
    color:rgba(51,51,51,1);
    .van-checkbox {
      display: inline-block;
      margin-right: 1.33vw;

    }

    span.iconfont.iconjf-row.entericon {
      position: absolute;
      top: 2.7vh;
      right: 4vw;

    }
}
.contactslide {
        display: flex;
        background: #fff;
        align-items: center;
       .van-checkbox {
      display: inline-block;
  }
       .personavatar {
        width: 9.9vw;
        height: 5.55vh;
        margin-top: .5vh;
        margin-left: 3.9vw;
        // color: #fff;
        background-color: #65bcff;
        text-align: center;
        line-height: 5.55vh;
        border-radius: 50%;
        font-size:0.28rem;
        font-family:PingFangSC-Regular,PingFang SC;
        font-weight:400;
        color:rgba(255,255,255,1);
      }
    
    
      .personmessage {
          margin-left: 2.7vw;
        .personcontainer {
            display: flex;
          .personname {
              height: 3.37vh;
              // font-size: 4.3vw;
              // color: #333333;
              font-size:0.32rem;
              font-family:PingFangSC-Regular,PingFang SC;
              font-weight:400;
              color:rgba(51,51,51,1);

          }

          .personcareer {
              height: 2.1vh;
              border-radius: 1.6vw;
              border: 0.15vh solid #CDD6E1;
              // font-size: 2.7vw;
              // color: #86A0BA;
              text-align: center;
              line-height: 2.1vh;
              margin-top: .5vh;
              padding-left: 1.6vw;
              padding-right: 1.6vw;
              margin-left: 0.8vw;
              font-size:0.2rem;
              font-family:PingFangSC-Regular,PingFang SC;
              font-weight:400;
              color:rgba(134,160,186,1);

          }
        }

        .address {
            height: 2.47vh;
            // font-size: 3.2vw;
            // color: #999999;
            font-size:0.24rem;
            font-family:PingFangSC-Regular,PingFang SC;
            font-weight:400;
            color:rgba(153,153,153,1);

        }
      }
    }
  }
   .bottomslide {
     background-color: #FFFFFF;
     height: 6.67vh;
     border-top: 0.07vh solid #747474;
     position: fixed;
     bottom: 0;
     left: 0;
     right: 0;
     display: flex;
     justify-content: space-between;
     .choosepeople {
     height: 3.37vh;
     margin-top: 1.65vh;
     margin-left: 3.5vw;
    //  font-size: 4.3vw;
    //  color: #0091FF;
     font-size:0.32rem;
    font-family:PingFangSC-Regular,PingFang SC;
    font-weight:400;
    color:rgba(0,145,255,1);
     }
     .yesbutton {
         width: 18.13vw;
         height: 4.6vh;
         background-color: #0091FF;
        //  color: #FFFFFF;
        //  font-size: 4.3vw;
         border-radius: .8vw;
         text-align: center;
         line-height: 4.6vh;
         margin: 1.05vh 1.9vw;
         font-size:0.32rem;
        font-family:PingFangSC-Regular,PingFang SC;
        font-weight:400;
        color:rgba(255,255,255,1);
     }
     
 }
}
  
  
</style>

