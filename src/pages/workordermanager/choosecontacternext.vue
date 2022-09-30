<template>
    <div class="choosecontacternext">
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
        <div class="contactercontent">
              <van-checkbox-group v-model="result" >
                <div class="contactslide" v-for="(item,index) in contacterArr" :key="index">
                  <van-checkbox :name="item.id" >
                      
                  </van-checkbox>
                  <div class="personavatar">{{item.name?item.name.substring(item.name.length-2):''}}</div>
                      <div class="personmessage">
                          <div class="personcontainer">
                              <div class="personname">{{item.name}}</div>
                              <div v-if="item.position" class="personcareer">{{item.position}}</div>
                          </div>
                          <div v-if="item.workUnit" class="address">{{item.workUnit}}</div>
                      </div>
                </div>
             </van-checkbox-group>
         </div>
         <div class="bottomslide">
             <div class="choosepeople">
                 <!-- 已选择：{{trueResult.length}}人，{{groupList.length}}个分组 -->
                 已选择：{{trueResult.length}}人
             </div>
             <div class="yesbutton" @click="showChooseContacter">
                 确定
             </div>
         </div>
         <LookChooseContacter :show="isShow" @closeDialog="closePopup" @transferOrder="transferOrd" ref="personDialog" @deleteUser="deletePerson"></LookChooseContacter>
    </div>

</template>
<script>
import {mapGetters} from 'vuex'
import LookChooseContacter from './lookChooseContacter.vue'
export default {
    name: 'choosecontacternext',
    data() {
      return {
          isShow: false,//是否显示所选的联系人的弹框
          contacterArr: [],
          result: [],//选中的联系人的id
          trueResult: [],//选中的人数
          contacterIdArr: [],//选中列表拿到的所有联系人的id
      }
    },
    components: {
       LookChooseContacter
    },
    watch: {
        result(newVal) {
          //console.log(newVal)
          this.trueResult = [...new Set(newVal)]
        },
        // contacterList(newVal,oldVal) {
        //   let userList = newVal
        // userList.forEach((item,index) => {
        //     userIdArr.push(item.id)
        // })
        // this.contacterIdArr = userList
        // }
    },
    computed: {
      ...mapGetters([
      'rankList','contacterList','groupList'
    ])
    },
    created() {
        // let userIdArr = []
        // let userList = this.contacterList
        // //console.log('用户',userList,this.$store.getters.contacterList)
        // userList.forEach((item,index) => {
        //     userIdArr.push(item.id)
        // })
        // this.contacterIdArr = userIdArr
        // this.result = userIdArr
        // this.trueResult = [...new Set(this.result)]
        // //console.log('联系人id列表为',this.$store.getters.contacterList)

        //console.log('联系人列表为',JSON.parse(localStorage.getItem('contacterList')))
        let preContacter = JSON.parse(localStorage.getItem('checkedContacter'))
        if(preContacter) {
            this.contacterArr = [...JSON.parse(localStorage.getItem('contacterList')),...preContacter]
        }else {
        this.contacterArr = JSON.parse(localStorage.getItem('contacterList'))
        }
        // let preResult = []
        // if(preContacter) {
        // preContacter.forEach((item,index) => {
        //   preResult.push(item.id)
        // })
        // this.contacterArr.forEach((item,index) => {
        //      preResult.push(item.id)
        // })
        // this.result = preResult
        // }else {
        //   // this.contacterArr.forEach((item,index) => {
        //   //   preResult.push(item.id)
        //   // })
        //   // this.result = preResult
        // }

    },
    methods: {
      deletePerson(userId) {
         let pindex = this.result.findIndex((item) => {
             return item === userId
         })
         this.result.splice(pindex,1)
      },
      transferOrd() {//转发工单给联系人

     let workId = parseInt(localStorage.getItem('workId'))
     let userIdArr = []
     let allContacterArr = JSON.parse(localStorage.getItem('checkedContacter'))
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
              // let nullArr = []
              // localStorage.setItem('checkedContacter',JSON.stringify(nullArr))
             that.$router.go(-2)
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
       showChooseContacter() {//展示所选的联系人
          let checkedContacter = []
            let allContacter = JSON.parse(localStorage.getItem('contacterList'))
            allContacter.forEach((item) => {
               let pIndex = this.result.findIndex((i) => i === item.id)
               if(pIndex !== -1) {
                   checkedContacter.push(item)
               }
            })
            let hash = {};
            let data2 = checkedContacter.reduce((preVal, curVal) => {
                hash[curVal.id] ? '' : hash[curVal.id] = true && preVal.push(curVal);
                return preVal
            }, [])
            localStorage.setItem('checkedContacter',JSON.stringify(data2)) 
          this.$refs.personDialog.personNumber = this.trueResult.length
          this.isShow = true
          this.$refs.personDialog.refreshDialog()
       },
        goBlack() {
          //console.log('是否执行')
           this.$store.commit('decreaseGroupId')
            //  let checkUserList = this.contacterList
            //  //console.log(checkUserList)
            //  //console.log('cc',this.contacterArr)
            
            //  if(checkUserList.length === 0 && this.result.length !== 0) {
            //      this.result.forEach((idItem) => {
            //        let user = this.contacterArr.find((item) => {
            //          return item.id === idItem
            //        })
            //        //console.log('wowo',user)
            //         this.$store.commit('addContacter',user)
           
            //      })
            // }  else {
            //    this.result.forEach((idItem,index) => {
            //      let userindex = this.contacterList.findIndex((item,index) => {
            //         return idItem === item.id
            //      })
            //      if(userindex === -1) {
            //        let contactuser = this.contacterArr.find((item,index) => {
            //            return  item.id === idItem
            //        })
            //        this.$store.commit('addContacter',contactuser)
            //         //console.log('yyyy',this.$store.getters.contacterList)
            //      }
            //    })
            // }
            // // //console.log('cao',contacterTrue)
           
            
            let checkedContacter = []
            let allContacter = JSON.parse(localStorage.getItem('contacterList'))
            allContacter.forEach((item) => {
               let pIndex = this.result.findIndex((i) => i === item.id)
               if(pIndex !== -1) {
                   checkedContacter.push(item)
               }
            })
            let hash = {};
            let data2 = checkedContacter.reduce((preVal, curVal) => {
              hash[curVal.id] ? '' : hash[curVal.id] = true && preVal.push(curVal);
              return preVal
            }, [])
            localStorage.setItem('checkedContacter',JSON.stringify(data2))  
             this.$store.commit('changeIsEnterContacter',1)
              this.$store.commit('decreaseRank')
              
             
             this.$router.go(-1)
        },
        // chooseCharacter(val) {
        //     //console.log("hello",val)
        //     if(val.length !== 0) {
        //       val.forEach((item,index) => {
        //         if(this.contacterIdArr.indexOf(item) === -1) {
        //            let contacterItem =  this.contacterArr.find((Pitem) => {
        //                Pitem.id === item
        //            })
        //            this.$store.commit('addContacter',contacterItem)
        //            let userIdArr = []
        //             let userList = this.contacterList
        //             //console.log('cao',userList)
        //       //  userList.forEach((item,index) => {
        //       //  userIdArr.push(item.id)
        //       //  })
        //       //  this.contacterIdArr = userIdArr

        //         }
        //       })
        //     }

        // }
    }
}
</script>
<style lang="less" scoped>
.choosecontacternext {
  .searchcontainer {
       padding-top: 1.5vh;
    //   height: 11.6vh;
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

  .contactercontent {
    background-color: #FFFFFF;
    margin-top: 1.5vh;
    height: 82vh;
    padding-left: 2.93vw;
    .contactslide {
        display: flex;
       .personavatar {
        width: 9.9vw;
        height: 5.55vh;
        margin-top: .5vh;
        margin-left: 3.9vw;
        color: #fff;
        background-color: #65bcff;
        text-align: center;
        line-height: 5.55vh;
        border-radius: 50%;
      }
    
    
      .personmessage {
          margin-left: 2.7vw;
        .personcontainer {
            display: flex;
          .personname {
              height: 3.37vh;
              font-size: 4.3vw;
              color: #333333;

          }

          .personcareer {
              height: 2.1vh;
              border-radius: 1.6vw;
              border: 0.15vh solid #CDD6E1;
              font-size: 2.7vw;
              color: #86A0BA;
              text-align: center;
              line-height: 2.1vh;
              margin-top: .5vh;
              padding-left: 1.6vw;
              padding-right: 1.6vw;
              margin-left: 0.8vw;

          }
        }

        .address {
            height: 2.47vh;
            font-size: 3.2vw;
            color: #999999;

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