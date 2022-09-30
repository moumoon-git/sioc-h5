<template>
    <div class="choosecontacter">
        <div class="searchcontainer">
            <div class="searchwrap">
                <span class="iconfont iconsousuo searchicon"></span>
                <input type="text" placeholder="请搜索关键字">
            </div>
            <div class="contacterrank">
                <div class="nowrank">联系人</div>
                <span class="next iconfont iconjf-row"></span>
                <div class="nextrank">管理团队</div>
            </div>
        </div>
        <div class="departmentcontainer">
            <van-checkbox-group v-model="result">
                <div class="departmentcontainerwrap">
                <van-checkbox name="a">区办公室(5)</van-checkbox>
                <div class="iconfont iconjf-row entericon"></div>
                </div>
                 <div class="departmentcontainerwrap">
                <van-checkbox name="b">区政法委(5)</van-checkbox>
                <div class="iconfont iconjf-row entericon"></div>
                </div>
            </van-checkbox-group>
        </div>
        <div class="bottomslide">
             <div class="choosepeople">
                 已选择：2人，1个分组
             </div>
             <div class="yesbutton">
                 确定
             </div>
         </div>
    </div>
</template>
<script>
export default {
    name: 'choosecontacter',
    data() {
    return {
      result: ['a', 'b'],
    };
  },
}
</script>
<style lang="less" scoped>
.choosecontacter {
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
        display: flex;
        height: 3.37vh;
        margin-top: 1.5vh;
        margin-left: 4.3vw;
        line-height: 3.37vh;
      .nowrank {
          font-size: 4.3vw;
          color: #666666;
      }

      span.next {
          color: #C5C9CC;
          width: 2.26vw;
          height: 1.27vh;
          font-size: 2.26vw;
          margin-left: 1.3vw;
          margin-right: 2vw;
          

      }

      .nextrank {
          font-size: 4.3vw;
          color: #666666;
      }
    }
  }

  .departmentcontainer {
      background-color: #FFFFFF;
      margin-top: 1.5vh;
      padding-left: 2.93vw;
      height: 82vh;
      .departmentcontainerwrap {
          height: 7.5vh;
          border-bottom: 0.07vh solid #DDDDDD;
          display: flex;
          line-height: 7.5vh;
          justify-content: space-between;
        .entericon {
          margin-right: 4vw;
          width: 5.3vw;
          height:3.0vh;
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