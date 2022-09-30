<template>
    <div class="example">
      <div @click="this.goBlack" style="display: inline;">返回</div>
      
      <template v-if="!peopleVisible">
        <div v-for="(item,index) in this.groupList" :key="index" style="background: white;border: 1px solid;display: flex;align-items: center;" @click.self="onClick(item)">
          <van-checkbox v-model="item.checked"  @click="checkBoxChange(item)"></van-checkbox>
          {{item.name}}
        </div>
      </template>
      
      <template v-if="peopleVisible">
        <div v-for="(item,index) in peopleList" :key="index" style="background: white;border: 1px solid;display: flex;align-items: center;">
          <van-checkbox v-model="item.checked"  @click="addContacterList(item)"></van-checkbox>
          {{item.name}}
        </div>
      </template>


      <div>
        已选{{contacterList.length}}人
      </div>

    </div>
</template>

<script>
// import { parse } from 'path'

export default {
  name: 'example',
  data() {
    return {
     
      tempaleList:[],
      groupList:[
        {name:"1",id:'1',parentId:'',checked:false,children:[
          {name:'11',parentId:'1',id:'11',checked:false,children:[{name:'111',parentId:'11',id:'111'}] },
          {name:'11',parentId:'1',id:'11',checked:false,children:[{name:'111',parentId:'11',id:'111'}] },
          {name:'11',parentId:'1',id:'11',checked:false,children:[{name:'111',parentId:'11',id:'111'}] }
        ]},
        {name:"2",id:'2',parentId:'',checked:false,children:[
          {name:'22',parentId:'2',id:'22',checked:false,children:[{name:'222',parentId:'22',id:'222'}] },
          {name:'22',parentId:'2',id:'22',checked:false,children:[{name:'222',parentId:'22',id:'222'}] },
          {name:'22',parentId:'2',id:'22',checked:false,children:[{name:'222',parentId:'22',id:'222'}] }
        ]},
        {name:"3",id:'3',parentId:'',checked:false,children:[
          {name:'33',parentId:'3',id:'33',checked:false,children:[{name:'333',parentId:'33',id:'333'}] },
          {name:'33',parentId:'3',id:'33',checked:false,children:[{name:'333',parentId:'33',id:'333'}] },
          {name:'33',parentId:'3',id:'33',checked:false,children:[{name:'333',parentId:'33',id:'333'}] }
        ]},
      ],
      contacterList:[], //获取勾选的所有组下的联系人
      groupIdList:[], //获取勾选的所有组id
      peopleVisible:false,
      peopleList:[]
    }
  },
  components: {
  },
  computed: {
  
  },
  watch: {

  },
  created () {
    this.$http({
      url: this.$http.adornUrl(`/mail/mailgroup/list`),
      method: 'get',
      params: this.$http.adornParams({
      })
    }).then(({data}) => {
      //console.log('/mail/mailgroup/list',data)
      this.addAttribute(data.data)
      var that=this
      Promise.resolve(that.addAttribute(data.data)).then(()=>{
        //console.log("data.data",data.data)
        that.groupList=data.data
        that.tempaleList=data.data
      })
      
    })
   
  },
  mounted () {
    // this.tempaleList=this.groupList
  },
  methods: {
    
    addContacterList(item){
      if(item.checked){
        if(this.contacterList.filter(element=>{return element.id==item.id}).length==0){
          this.contacterList.push(item)
        }
      }else{
        this.contacterList=this.contacterList.filter(element=>{
          return element.id!=item.id
        })
      }
      
    },
    checkBoxChange(item){
      this.groupIdList=[]
      //console.log("checked,item",item)
      var that=this
      if(item.checked){ //当勾选时，添加勾选组下所有联系人
        Promise.resolve(that.getGroupIdRecursion(item)).then(()=>{
          that.$http({
            url: that.$http.adornUrl(`/mail/mailcontactor/list`),
            method: 'post',
            data: that.$http.adornData({
              "limit":100000000,
              "page":1,
              "platformId":"",
              "groupId": that.groupIdList
            })
          }).then(({data}) => {
            //console.log("/mail/mailcontactor/list",data)
            data.data.list.forEach(item=>{
              if(this.contacterList.filter(element=>{return element.id==item.id}).length==0){
                this.contacterList.push(item)
              }
              
            })
            
          })
        })
              
      }else{ //当取消勾选时，去除勾选组下所有联系人
        Promise.resolve(that.getGroupIdRecursion(item)).then(()=>{
          that.$http({
            url: that.$http.adornUrl(`/mail/mailcontactor/list`),
            method: 'post',
            data: that.$http.adornData({
              "limit":100000000,
              "page":1,
              "platformId":"",
              "groupId": that.groupIdList
            })
          }).then(({data}) => {
            //console.log("/mail/mailcontactor/list",data)
            data.data.list.forEach(item=>{
              that.contacterList=that.contacterList.filter(element=>{
                return element.id!=item.id
              })
              
            })
            
          })
        })
      }
     

      this.checkBoxRecursion(item)
    },
    onClick(event){
      //console.log("event",event)
      if(event.children){
        this.groupList=event.children
      }else{
        this.peopleList=[]
        this.$http({
          url: this.$http.adornUrl(`/mail/mailcontactor/list`),
          method: 'post',
          data: this.$http.adornData({
            "limit":100000000,
            "page":1,
            "platformId":"",
            "groupId": [event.id]
          })
        }).then(({data}) => {
          //console.log("/mail/mailcontactor/list",data)
          if(data.data.list.length!=0){
            this.peopleVisible=true
            var that=this
            Promise.resolve(data.data.list.forEach(item=>{
              item.checked=false
            })).then(()=>{
              that.peopleList=data.data.list
              for(let i=0;i<that.contacterList.length;i++){
                for(let j=0;j<that.peopleList.length;j++){
                  if(that.contacterList[i].id==that.peopleList[j].id){
                
                    that.peopleList[j].checked=true
                    
                  }
                }
              }
            })
            
            
            
          }
        })
      }
      
    },
    recursion(parentId,template){
      for(let i=0;i<template.length;i++){

        if(template[i].id==parentId){
          this.groupList=template
          break;
        }
        if(i==template.length-1){
          for(let j=0;j<template.length;j++){
            if(template[j].children){
              this.recursion(parentId,template[j].children)
            }
          }       
        }

      }
    },
    getGroupIdRecursion(list){ //递归获取勾选组下的所有组id
      this.groupIdList.push(list.id)
      if(list.children){
        list.children.forEach(element=>{
          this.groupIdList.push(element.id)
          this.getGroupIdRecursion(element)
        })
      }
    },
    checkBoxRecursion(list){ //递归勾选组下的所有组
      if(list.children){
        list.children.forEach(element=>{
          element.checked=list.checked
          this.checkBoxRecursion(element)
        })
      }
    },
    addAttribute(list){ 
      for(var i=0;i<list.length;i++){
        list[i].checked=false
        if(list[i].children){
          this.addAttribute(list[i].children)
        }
      }
    },
    goBlack(){
      //console.log("返回")
      if(this.peopleVisible){
        this.peopleVisible=false
      }else{
        var parentId=this.groupList[0].parentId
        var template=this.tempaleList
        this.recursion(parentId,template)
      }
      
      
    }
  }
}
</script>

<style lang="less" >
  .example{
    .van-checkbox{
      display: inline-block;
    }
  }
  
  
</style>

