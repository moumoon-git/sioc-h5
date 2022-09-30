<!--
 * @Author: yaoweixin
 * @Date: 2020-12-11 17:23:23
 * @LastEditors: yaoweixin
 * @LastEditTime: 2020-12-16 18:16:06
 * @Description: 加载动画
 * @FilePath: \vue-cli-multiPage-master\src\pages\commonLoading\commonLoading.vue
-->
<template>
    <div class="commonLoading">
        <van-overlay :show="show">
            <img src="~@/assets/img/loading.gif" alt="" class="loadingIcon">
        </van-overlay>
    </div>
</template>
<script>
export default {
    name: 'commonLoading',
    data() {
        return {
            show: false
        }
    }
}
</script>
<style lang="less" scoped>
  .commonLoading {
   /deep/ .van-overlay {
       z-index: 999999999!important;
       .loadingIcon {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%,-50%);
  }
   }
  
  }
</style>