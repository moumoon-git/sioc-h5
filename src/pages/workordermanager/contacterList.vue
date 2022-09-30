<template>
    <div class="contacterList">
      <div class="searchcontainer">
            <div class="searchwrap">
                <span class="iconfont iconsousuo searchicon"></span>
                <input type="text" placeholder="请搜索关键字">
            </div>
            <div class="contacterrank">
                <div @click="goBlack" class="returnButton">返回</div>
               <div v-for="(item,index) in rankList" :key="index" class="rankSlide">
                <span class="next iconfont iconjf-row" v-if="index != 0"></span>
                <div class="nowrank">{{item}}</div>
               </div>
            </div>
        </div>
      <div v-for="(item,index) in list" :key="index"  @click.self="onClick(item)" class="contacterListContainer">
        <!-- <van-checkbox v-model="item.checked" @change="checkBoxChange(item)"></van-checkbox> -->
        {{item.name}}
        <span class="iconfont iconjf-row entericon"></span>
      </div>
      <!-- <div class="bottomslide">
             <div class="choosepeople">
                 已选择：{{contacterList.length}}人，{{groupList.length}}个分组
             </div>
             <div class="yesbutton" @click.stop="showAllChooseContacter">
                 确定
             </div>
         </div> -->
      <!-- <LookChooseContacter :show="isShow" @closeDialog="closePopup" @transferOrder="transferOrd" @cancelCheckGroup="quitCheckGroup"></LookChooseContacter> -->
    </div>
</template>

<script>
// import LookChooseContacter from './lookChooseContacter.vue'
import { mapGetters } from 'vuex'
export default {
  name: 'contacterList',
  data() {
    return {
      isShow: false,//是否显示所有联系人弹框
      allList: [],//初始获得的所有分组数据
      uncheckedGroupId: [],//选中之后取消选中的组的节点id以及子孙节点id
      groupId: [],//选中的组的节点id以及子孙节点的id
      tempaleList:[],
      // list:[
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
      // ]
      list: [],
      canAdd: false
    }
  },
  components: {
    // LookChooseContacter
  },
  computed: {
    ...mapGetters([
      'rankList','contacterList','rankGroupId','isEnterContacter','groupList'
    ])
  },
  watch: {
    // contacterList(newVal,oldVal) {
    //    //console.log('contacterlist',newVal)
    // }
  },
  created () {
  
      // this.rankList = this.$store.getters.rankList
      if(this.isEnterContacter == 0) {
       this.$http({
      url: this.$http.adornUrl(`/mail/mailgroup/list`),
      method: 'get',
      params: this.$http.adornParams({
      })
    }).then(({data}) => {
        //console.log('联系人分组数据为',data)
        data.data.forEach((item) => {
            this.addChecked(item)
        })
        //console.log('改变后的数组为',data.data)
        this.list = data.data
        this.tempaleList=this.list
        this.allList = data.data
    })
      }else {
        this.list = JSON.parse(localStorage.getItem('list'))
        this.tempaleList = JSON.parse(localStorage.getItem('tempaleList'))
      }
  },
  mounted () {
    //  this.tempaleList=this.list
    
  },
  
  methods: {
    quitCheckGroup(groupName) {  //当联系人弹框取消分组时，外面的分组也要取消选中
        this.list.forEach((item) => {
           this.queryGroupByName(item,groupName)
        })
        
    },
    queryGroupByName(item,Gname) {
         if(item.name === Gname) {
             item.checked = false
         }
         if(!item.children || item.children == null) {
              return
         }
         item.children.forEach((citem) => {
             this.queryGroupByName(citem,Gname)
         })
    },
    transferOrd() {//转发工单给联系人
     let workId = parseInt(localStorage.getItem('workId'))
     let userIdArr = []
     let allContacterArr = this.$store.getters.contacterList
     if(allContacterArr.length === 0) {
         this.$notify({
           type: "warning",
           message: "联系人为空无法转发"
         })
         return 
     }
     if(allContacterArr.length !== 0) {
       allContacterArr.forEach((item) => {
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
          this.isShow = false
          var that = this
          this.$dialog.alert({
          message: '转发成功',
           }).then(() => {
             that.$store.commit('setNullContacterList')
             that.$store.commit('setNullGroupList')
             that.$store.commit('setNullRankList')
             that.$store.commit('setNullRankGroupId')
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
    closePopup() {
       this.isShow = false
    },
    showAllChooseContacter() {//显示所有联系人的弹框
        this.isShow = true
    },
    getNoCheckedContacterAndDelete(groupId) {
      let GroupId = [...new Set(groupId)]
        this.$http({
        url: this.$http.adornUrl(`/mail/mailcontactor/list`),
        method: 'post',
        data: this.$http.adornData({
             "limit":9,
             "page":1,
             "platformId":"",
             "groupId": GroupId
        })
      }).then(({data}) => {
        //console.log('未选中组的数据为',data)
        data.data.list.forEach((item) => {
           this.$store.commit('decreaseContacter',item)
        })
        //  if(this.canAdd) {
        //    let chooseContacter = JSON.parse(localStorage.getItem('chooseContacter'))
        //   chooseContacter.forEach((item,index) => {
        //         this.$store.commit('addContacter',item)})
        //  }
      })
    },
    getCheckedContacter(groupId) {//获得分组下的联系人
       this.$http({
        url: this.$http.adornUrl(`/mail/mailcontactor/list`),
        method: 'post',
        data: this.$http.adornData({
             "limit":9,
             "page":1,
             "platformId":"",
             "groupId": groupId
        })
      }).then(({data}) => {
        //console.log('获得的分组联系人数据为',data)
        data.data.list.forEach((item) => {
          this.$store.commit('addContacter',item)
        })
      })
    },
    addChecked(item) {
      
      item.checked = false
      if(!item.children || item.children == null) {
          return 
      }
      item.children.forEach((nodeitem) => {
          this.addChecked(nodeitem)
      })

    },
    findUncheckChildrenAndGrandChildrenId(item) {
           this.uncheckedGroupId.push(parseInt(item.id))
           if(!item.children || item.children == null) {
             return 
           }
           if(item.children.length !== 0 || item.children != null) {
               item.children.forEach((item) => {
                   this.findUncheckChildrenAndGrandChildrenId(item)
               })
           }
    },
    findChildrenAndGrandChildrenId(item) {
           this.groupId.push(parseInt(item.id))
           if(!item.children || item.children == null) {
             return 
           }
           if(item.children.length !== 0 || item.children != null) {
               item.children.forEach((item) => {
                   this.findChildrenAndGrandChildrenId(item)
               })
           }
    },
    DeleteChildrenAndGrandChildrenId(item) {
           let itemIndex = this.groupId.findIndex((idItem) => {
              idItem == item
           })
            this.groupId.splice(itemIndex,1)
            if(!item.children || item.children == null) {
             return 
           }
           if(item.children.length !== 0 || item.children != null) {
               item.children.forEach((item) => {
                   this.DeleteChildrenAndGrandChildrenId(item)
               })
           }

    },
    checkBoxChange(item){
      if(item.checked) {
           let gIndex = this.groupList.findIndex((gitem) => gitem === item.name)
           if(gIndex === -1) {
             this.$store.commit('addGroupPlatformId',item.name)
           }
      this.findChildrenAndGrandChildrenId(item)
      this.getCheckedContacter(this.groupId)
      }else {
          this.$store.commit('decreaseGroupPlatformId',item.name)
        this.DeleteChildrenAndGrandChildrenId(item)
        this.findUncheckChildrenAndGrandChildrenId(item)
        this.getNoCheckedContacterAndDelete(this.uncheckedGroupId)
        //console.log('uncheckgroupid',this.uncheckedGroupId)
         
      }
      //console.log('groupid',this.groupId)
      //console.log("checked,item",item)
      if(item.children){
        item.children.forEach(element=>{
          element.checked=item.checked
        })
      }
         
    },
    onClick(event){
      // this.canAdd = true
      //console.log('组组id',this.rankGroupId)
       localStorage.setItem('chooseContacter',JSON.stringify(this.contacterList))
      if(event.children && event.children != null){
      this.$store.commit('addRank',event.name)
      this.$store.commit('addGroupId',event.id)
      }
      if(event.children == null) {
          this.$store.commit('addGroupId',event.id)
          this.$http({
        url: this.$http.adornUrl(`/mail/mailcontactor/list`),
        method: 'post',
        data: this.$http.adornData({
             "limit":9,
             "page":1,
             "platformId":"",
             "groupId": [...new Set(this.rankGroupId)]
        })
      }).then(({data}) => {
        //console.log('要跳转的联系人数据为',data)
        if(data && data.code === 0) {
            if(data.data.list.length != 0) {
                this.$store.commit('addRank',event.name)
                localStorage.setItem('contacterList',JSON.stringify(data.data.list))
                localStorage.setItem('allCheckContacterList',JSON.stringify(this.contacterList))
                this.$router.push('choosecontacternext')
            }
        }
      })

      }
      // this.rankList = this.$store.getters.rankList
      // this.rankList.sort((item)=>{
      //   return item
      // })
      
      // //console.log('ranklist',this.rankList)
      //console.log("event",event)
      if(event.children){
        if(event.checked){
          event.children.forEach(element => {
            element.checked=true
          });
        }else{
          event.children.forEach(element => {
            element.checked=false
          });
        }
        this.list=event.children
        // let that = this
        // this.$nextTick(() => {
          // let chooseContacter = JSON.parse(localStorage.getItem('chooseContacter'))
          // chooseContacter.forEach((item,index) => {
          //       that.$store.commit('addContacter',item)
        //         //console.log('wowowowowo')
        //   })
          
        // })
      }
      localStorage.setItem('list',JSON.stringify(this.list))
        localStorage.setItem('tempaleList',JSON.stringify(this.tempaleList))
      
    },
    callback(parentId,template){
      for(let i=0;i<template.length;i++){

        if(template[i].id==parentId){
          this.list=template
          break;
        }
        if(i==template.length-1){
          for(let j=0;j<template.length;j++){
            if(template[j].children){
              this.callback(parentId,template[j].children)
            }
          }       
        }

      }
    },
    goBlack(){
      //console.log('是否执行')
      this.$store.commit('decreaseGroupId')
      // this.canAdd = false
      if(this.rankList.length !== 1) {
          this.$store.commit('decreaseRank')
         
          this.$store.commit('decreaseGroupId')
      }

      var parentId=this.list[0].parentId
      var template=this.tempaleList
      this.callback(parentId,template)
       
    }
  }
}
</script>

<style lang="less" scoped>
 .contacterList {
   .searchcontainer {
      padding-top: 1.5vh;
      background-color: #FFFFFF;
    //   height: 11.6vh;
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
          &::placeholder {
             font-size: 3.73vw;
             color: #999999;
          }

      }
    }

    .contacterrank {
      margin-bottom: 1.5vh;
        display: flex;
        height: 3.37vh;
        margin-top: 1.5vh;
        // margin-left: 4.3vw;
        line-height: 3.37vh;
      .returnButton {
        font-size: 4.3vw;
          color: #666666;
      }
      .rankSlide{
        display: flex;
      span.next {
          color: #C5C9CC;
          width: 2.26vw;
          height: 1.27vh;
          font-size: 2.26vw;
          margin-left: 1.3vw;
          margin-right: 2vw;
          

      }
      .nowrank {
          font-size: 4.3vw;
          color: #666666;
      }
    
      
      }
    }
  }
  .returnButton {
    margin-right: .8vw;

  }

  .contacterListContainer {
    height: 7.5vh;
    position: relative;
    background: white;
    // border: 1px solid;
    border-bottom: .2vh solid #DDDDDD;
    display: flex;
    align-items: center;
    .van-checkbox {
      display: inline-block;

    }

    span.iconfont.iconjf-row.entericon {
      position: absolute;
      top: 3vh;
      right: 0;

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
     font-size: 4.3vw;
     color: #0091FF;
     }
     .yesbutton {
         width: 18.13vw;
         height: 4.6vh;
         background-color: #0091FF;
         color: #FFFFFF;
         font-size: 4.3vw;
         border-radius: .8vw;
         text-align: center;
         line-height: 4.6vh;
         margin: 1.05vh 1.9vw;
     }
     
 }
}
</style>