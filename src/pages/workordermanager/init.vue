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
        this.$http({
      url: this.$http.adornUrl(`/sys/sysKeyValue/getUrlByKey?key=${key}`),
      method: 'get',
      params: this.$http.adornParams({
      })
    }).then(({data}) => {
        if(data && data.code === 0) {
        let urlString = data.data.dataValue 
        //console.log('url',data)  
          let urlArr = urlString.split('?')
          let paramArr = urlArr[1]
          let workString = paramArr.split('&')
          //console.log('length',workString[workString.length-2])
          let userString = workString[workString.length-2]
          let Muser = userString.split('=')
          let userId = Muser[1]
          localStorage.setItem("contactorId",userId)
          let workIdString = workString[0]
          let openIdString = workString[2]
          let MopenId = openIdString.split('=')
          let openId = MopenId[1]
          this.openId = openId
          let Mworkid = workIdString.split('=')
          let workId = Mworkid[1]
          this.workId = workId
          let tokenString = workString[workString.length-1]
          let Mtoken = tokenString.split('=')
          let token = Mtoken[1]
          if(token == '' || token == undefined || token == null) {
            let formdata = new FormData();
            formdata.append('username', 'WX');
            formdata.append('password', this.openId);
          this.$http({
            url: `${window.SERSVER_BASE_HOME}/oauth/login`,
            method: 'post',
            data: formdata,
            contentType:false,
            processData:false,
          }).then((res) => {
            console.log("/oauth/login", res);
            if(res.data.code==0){
              localStorage.setItem("token",res.data.token)
              localStorage.setItem('workId',this.workId)
              this.$router.push({name: 'orderdetail',params: {id: this.workId}})
            }
            
          });
          } else {
            localStorage.setItem("token",token)
            localStorage.setItem('workId',this.workId)
            this.$router.push({name: 'orderdetail',params: {id: this.workId}})
          }
           
          
        }

    })
    }
}
</script>
<style lang="less" scoped>

</style>
