<!--
 * @Author: liukanglin
 * @Date: 2020-09-10
-->
<template>
  <div>
    <van-image-preview closeable v-model="previewShow" :images="enlargeImageUrl"></van-image-preview>
  </div>
</template>
<script>
export default {
  props: {
    enlargeImageUrl: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      previewShow: false,
    };
  },
};
</script>
<style lang="less" scoped>
  /deep/ .van-image-preview__index {
    display: none;
  }
  /deep/ .van-image-preview__overlay {
    background-color: rgba(0, 0, 0, 0.7);
  }
</style>