<template>
  <div style="width:100%;height:-webkit-fill-available;background:rgba(245,245,245,1);">
   <img :src="require('@/assets/img/invalidQRCode.png')" style="width: 27vw;margin: 32vw 50% 0px 50%;transform: translateX(-50%);">
   <div style="font-family:PingFangSC-Regular,PingFang SC;font-weight:400;color:rgba(153,153,153,1);text-align: center;">无效二维码</div>
   
  </div>
</template>

<script>
export default {
  name: 'invalidQRCode',
  data() {
    return {
    }
  },
  components: {},
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    
  }
}
</script>

<style lang="less" scoped>
 

</style>

