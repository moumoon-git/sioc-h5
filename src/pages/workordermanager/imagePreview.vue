<template>
  <div>
    <van-overlay :show="overlayShow" :lock-scroll="false">
      <div class="wrapper" @click.stop>
        <!-- <div class="block" /> -->
        <img :src="enlargeImageUrl" alt />
        <div class="iconfont iconiconset0127 deleteIcon" @click="closeOverlay"></div>
      </div>
    </van-overlay>
  </div>
</template>
<script>
export default {
  data() {
    return {
      show: false,
    };
  },
  props: {
    overlayShow: {
      type: Boolean,
      required: true,
    },
    enlargeImageUrl: {
      type: String,
      required: true,
    },
  },
  methods: {
      closeOverlay(){
          this.$emit('closeOverlay');
      }
  },
};
</script>
<style lang="less" scoped>
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  img {
    width: 80vw;
    //   background-color: #fff;
  }
  .deleteIcon {
    position: absolute;
    top: 6vh;
    right: 10vw;
    font-size: 0.5rem;
    color: #fff;
    background-color: #000;
    border-radius: 50%;
    padding: 0.7vh;
  }
}
</style>