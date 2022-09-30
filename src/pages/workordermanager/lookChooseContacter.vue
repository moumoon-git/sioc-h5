<template>
    <div class="lookChooseContacter">
        <div class="dialogwrapper">
            <van-popup v-model="show" position="bottom" round :style="{ height: '55%' }" @click-overlay="closeDialog">
            <div class="bottomslide">
             <div class="choosepeople">
                 <!-- 已选择：{{contacterList.length}}人，{{groupList.length}}个分组 -->
                 已选择：{{personNumber}}人
             </div>
             <div class="yesbutton" @click="transferOrder">
                 确定
              </div>
             </div>
             <div class="contactercontent">
              
                <div class="contactslide" v-for="(item,index) in userArr" :key="index">
                  
                  <div class="personavatar">{{item.name?item.name.substring(item.name.length-2):''}}</div>
                      <div class="personmessage">
                          <div class="personcontainer">
                              <div class="personname">{{item.name}}</div>
                              <div v-if="item.position" class="personcareer">{{item.position}}</div>
                          </div>
                          <div v-if="item.workUnit" class="address">{{item.workUnit}}</div>
                      </div>
                      <img src="~@/assets/img/deletex.png" alt="" class="del" @click="deleteUser(item.id)">
                </div>
               <div class="groupcontent">
             <!-- <div class="contactslide" v-for="(item,index) in groupArr" :key="index">
                  
                  <div class="personavatar">分组</div>
                      <div class="groupname">
                          {{item}}
                      </div>
                      <img src="~@/assets/img/deletex.png" alt="" class="del" @click="deleteGroup(item)">
                </div> -->
         </div>
             
         </div>
         
            </van-popup>
        </div>
    </div>
</template>
<script>
import {mapGetters} from 'vuex'
export default {
    name: 'lookChooseContacter',
    data() {
        return {
            userArr: [],
            groupArr: [],
            dialogShow: false,
            personNumber: 0
        }
    },
    props: {
        show: {
            type: Boolean,
            required: true
        }
    },
    computed: {
    ...mapGetters([
      'contacterList','rankGroupId','isEnterContacter','groupList'
    ])
  },
  created() {
    //    this.userArr = this.contacterList
    //    this.userArr.forEach((item,index) => {
    //        let personAvatar = item.name.substring(item.name.length-2)
    //        item.personAvatar = personAvatar
    //    })
      this.userArr = JSON.parse(localStorage.getItem('checkedContacter'))
       //console.log('弹框用户',this.userArr)
    //    this.groupArr = this.groupList
       //console.log('弹框组用户',this.groupArr)
       
  },
  methods: {
      refreshDialog() {//刷新弹框
         this.userArr = JSON.parse(localStorage.getItem('checkedContacter'))
      },
      deleteUser(userId) {
        //   this.$store.commit('decreaseContacter',userId)
        this.personNumber = this.personNumber -1
        let checkedContacter = JSON.parse(localStorage.getItem('checkedContacter'))
        let pindex = checkedContacter.findIndex(v => v.id === userId)
        checkedContacter.splice(pindex,1)
        localStorage.setItem('checkedContacter',JSON.stringify(checkedContacter))
        this.userArr = JSON.parse(localStorage.getItem('checkedContacter'))
        this.$emit('deleteUser',userId)
      },
      deleteGroup(groupName) {
        //   this.$store.commit('decreaseGroupPlatformId',groupName)
          this.$emit('cancelCheckGroup',groupName)
      },
      closeDialog() {
          this.$emit('closeDialog')
      },
      transferOrder() {//转发工单
          this.$emit('transferOrder')
      }
  }
}
</script>
<style lang="less" scoped>
.lookChooseContacter {
  .dialogwrapper {
    /deep/ .van-popup {
      .bottomslide {
     background-color: #FFFFFF;
     height: 6.67vh;
     border-top: 0.07vh solid #747474;
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
.contactercontent {
    background-color: #FFFFFF;
    height: 86vh;
    padding-left: 2.93vw;
    .contactslide {
        display: flex;
        position: relative;
        // padding-top: 2vh;
          padding-bottom: 2vh;
       .personavatar {
        width: 9.9vw;
        height: 5.55vh;
        margin-top: .5vh;
        margin-left: 3.9vw;
        background-color: #65bcff;
        border-radius: 50%;
        text-align: center;
        line-height: 5.55vh;
        color: #fff;
      }
    
    
      .personmessage {
          margin-left: 2.7vw;
          width: 85%;
          border-bottom: 0.07vh solid #DDDDDD;
          padding-bottom: 2vh;
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
      .del {
          width: 4.27vw;
          height: 2.4vh;
          position: absolute;
          top: 2vh;
          right: 3.87vw;
      }
    }
    .groupcontent {
     background-color: #FFFFFF;
    height: 86vh;
    padding-left: .7vw;
    .contactslide {
        display: flex;
        position: relative;
        // padding-top: 2vh;
          padding-bottom: 2vh;
      .personavatar {
        width: 9.9vw;
        height: 5.55vh;
        margin-top: .5vh;
        margin-left: 3.9vw;
        background-color: #F2B626;
        color: #fff;
        text-align: center;
        line-height: 5.55vh;
        border-radius: 50%;
        font-size: 3vw;
      }
    
    
      .groupname {
          padding-top: 2vh;
          padding-left: 2vw;
          
      }
      .del {
          width: 4.27vw;
          height: 2.4vh;
          position: absolute;
          top: 2vh;
          right: 3.87vw;
      }
    }


}

}

    }
  }
}
</style>