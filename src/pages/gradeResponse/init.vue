<template>
    <div class="init">
        
    </div>
</template>
<script>
export default {
    name: 'init',
    data() {
      return {
       openId: '',
       workId: ''
       
      }
    },
    created() {
      let netUrl = window.location.href
      let urlString = netUrl.split('?')
      let keyString = urlString[1]
      let Mkey = keyString.split('=')
      let key = Mkey[1]
      //console.log('key的值====》',key)
        this.$http({
      url: this.$http.adornUrl(`/sys/sysKeyValue/getUrlByKey?key=${key}`),
      method: 'get',
      params: this.$http.adornParams({
      })
    }).then(({data}) => {
        if(data && data.code === 0) {
            //console.log('data====》',data)  
        let urlString = data.data.dataValue 
          let urlArr = urlString.split('?')
          let paramArr = urlArr[1]
          let workString = paramArr.split('&')
          //console.log('workString====>',workString)
          let workIdString = workString[0]
          let openIdString = workString[2]
          let MopenId = openIdString.split('=')
          let openId = MopenId[1]
          this.openId = openId
          let Mworkid = workIdString.split('=')
          let workId = Mworkid[1]
          this.workId = workId
          //console.log('workId====>',this.workId,'openId====>',this.openId);
           this.$http({
            url: this.$http.adornUrl('/sys/wxLogin'),
            method: 'post',
            data: this.$http.adornData({
                   "openId": this.openId
            })
          }).then(({data}) => {
            let token = data.token
            //console.log('token====>',data);
            localStorage.setItem("token",token)
            localStorage.setItem('id',this.workId)
            this.$router.push({name: 'subordinateUnitDetail'})
          })
          
        }

    })
    }
}
</script>
<style lang="less" scoped>

</style>
