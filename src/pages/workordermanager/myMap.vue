<template>
  <div class="myMap">
    <iframe id="mapPage" width="100%" height="100%" frameborder=0 style="height:-webkit-fill-available;"
        src="https://apis.map.qq.com/tools/locpicker?search=1&type=1&key=XIGBZ-SL2WF-6TXJP-J3PN2-4ZX7J-ZBFRC&referer=myapp">
    </iframe>
  </div>
</template>

<script>

export default {
  name: 'myMap',
  data() {
    return {
      index:''
    }
  },
  components: {},
  computed: {
  },
  watch: {},
  created () {},
  mounted () {
    var that=this
    window.addEventListener('message', function(event) {
        // 接收位置信息，用户选择确认位置点后选点组件会触发该事件，回传用户的位置信息
        var loc = event.data;
        if (loc && loc.module == 'locationPicker') {//防止其他应用也会向该页面post信息，需判断module是否为'locationPicker'
          //console.log('location', loc);
          that.$store.commit('changeLocation',loc);
          
          that.$emit('closeMap',that.index)
          

        }
    }, false);
  },
  methods: {
    
  }
}
</script>

<style lang="less" >
  
  
  
</style>

