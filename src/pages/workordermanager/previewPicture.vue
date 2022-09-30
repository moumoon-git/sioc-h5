<!--
 * @Author: yaoweixin
 * @Date: 2020-07-20 14:23:34
 * @LastEditors: yaoweixin
 * @LastEditTime: 2020-09-03 10:22:51
 * @Description: file content
 * @FilePath: \vue-cli-multiPage-master\src\pages\workordermanager\previewPicture.vue
-->
<template>
    <div class="previewPicture">
       <van-overlay :show="show" :lock-scroll="false">
          <div class="wrapper" @click.stop>
             <img :src="imgSrc" alt="">
             <div class="iconfont iconiconset0127 deleteIcon" @click="closeDialog"></div>
           </div>
       </van-overlay>
    </div>
</template>
<script>
export default {
    name: 'previewPicture',
     data() {
    return {
      imgSrc: ''
    };
  },
  props: {
      show: {
          type: Boolean,
          required: true
      }
  },
  methods: {
      closeDialog() {
          this.$emit('closePreview')
      }
  }
    
}
</script>
<style lang="less" scoped>
.wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    height: 100%;
    img {
        width: 80vw;
        height: 60vh;
    }
    .deleteIcon {
        position: absolute;
        top: 6vh;
        right: 10vw;
        font-size: 8vw;
        color: #fff;
    }
  }
</style>