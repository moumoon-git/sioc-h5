<template>
    <div class="handleObjectDetail">
        <div class="handleObjectForm">
            <div class="handleObjectRow">
                <div class="title">检查项目：</div>
                <div class="desc">{{this.handleObject.name}}</div>
            </div>
            <div class="handleObjectRow">
                <div class="title">检查内容：</div>
                <div class="desc">{{this.handleObject.content}}</div>
            </div>
            <div class="handleObjectRow">
                <div class="title">检查类型：</div>
                <div class="desc">{{this.handleObject.typeName}}</div>
            </div>
            <div class="handleObjectRow">
                <div class="title">所属分组：</div>
                <div class="desc">{{this.handleObject.groupIdName}}</div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'handleObjectDetail',
    data() {
      return {
          handleObject: {
              name: '',
              content: '',
              typeName: '',
              groupIdName: ''
          }
      }
    },
    created() {
        let id = parseInt(localStorage.getItem('bussid'))
        //    let id = 4
        //console.log('id',id)
        this.$http({
      url: this.$http.adornUrl(`/investigation/investigationInfor/infor/${id}`),
      method: 'get',
      params: this.$http.adornParams({
      })
    }).then(({data}) => {
        if(data && data.code === 0) {
            //console.log('处置对象的数据为',data)
            this.handleObject = data.InvestigationInfor
        }
    })
    }
}
</script>
<style lang="less" scoped>
.handleObjectDetail {
    padding: 2vh 6vw;
  .handleObjectForm {
      background-color: #fff;
      height: 48vh;
      border-radius: 9px;
    .handleObjectRow {
        display: flex;
        align-items: center;
        font-size: 0.28rem;
        padding-top: 2vh;
        height: 9vh;
      .title {
        margin-left: 8vw;
        color: #ccc;
      }

      .desc {
         
      }
    }
  }
}
</style>