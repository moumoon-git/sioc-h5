<template>
  <div class="ordersearch">
     <div class="searchheader">
         <div class="searchcontainer">
             <span class="searchicon iconfont iconsousuo">
             </span>
             <input type="text" placeholder="请输入搜索关键字">
         </div>
         <div class="cancel">取消
         </div>
     </div>
     <div class="searchrecordheader">
         <div class="searchrecordtitle">
             搜索记录
         </div>
         <img src="~@/assets/img/deleteslide.png" alt="" class="deleteicon" />
     </div>
     <div class="searchrecordcontent">
         <div class="searchslider">
             重点机房巡查
             <img src="~@/assets/img/deletex.png" class="deletex" />
         </div>
     </div>
  </div>
</template>
<script>
export default {
  name: 'ordersearch'
}
</script>
<style lang="less">
   .ordersearch {
  .searchheader {
      // line-height: 5.3vh;
      height: 5.3vh;
      display: flex;
      justify-content: space-between;
      padding-top: 1.6vh;
      padding-left: 4.3vw;
    .searchcontainer {
      padding-top: 0.5vh;
      padding-left: 2.7vw;
      width: 80vw;
      height: 3.7vh;
      border-radius: 2.7vw;
      background-color: #F2F2F2;
      .searchicon {
        font-size: 4.2vw;
      }

      input {
          margin-left: 1.6vw;
          width: 66.7vw;
          border: none;
          height: 2.9vh;
          background-color: #F2F2F2;
          &::-webkit-input-placeholder {
            font-size: 3.7vw;
            color: #999999;
          }

      }
    }

    .cancel {
      width: 7.5vw;
      height: 3.0vh;
      text-align: center;
      font-size: 3.7vw;
      color: #0091FF;
      margin-right: 4vw;
      margin-top: 0.7vh;

    }
  }

  .searchrecordheader {
    height: 3.14vh;
    margin-top: 2.2vh;
    display: flex;
    justify-content: space-between;
    .searchrecordtitle {
      width:16vw;
      font-size: 4vw;
      color: #333333;
      margin-left: 4.3vw;

    }

    img.deleteicon {
      width: 3.5vw;
      height: 2.0vh;
      margin-right: 2.8vw;
      margin-bottom: 1.3vh;
    }
  }

  .searchrecordcontent {
    padding-top: 1.3vh;
    padding-left: 1.6vw;
    .searchslider {
      position: relative;
      margin-left: 2.7vw;
      width: 22vw;
      height: 4.04vh;
      line-height: 4.04vh;
      text-align: center;
      background-color: #F8F8F8;
      border-radius: 1.5vw;
      font-size: 3.2vw;
      color: #7E7E7E;
       img {
         position: absolute;
         right: -1.1vw;
         top: -0.7vh;
         width: 2.9vw;
         height: 1.6vh;

      }
    }
  }
}
</style>