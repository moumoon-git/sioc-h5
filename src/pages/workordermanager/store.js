import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state:{
        location:{},
        rankList: ['联系人'],//联系人层级列表
        contacterList: [],//联系人列表
        rankGroupId: [],//层级列表id
        isEnterContacter: 0,//判断是否有进入联系人页面
        groupList: [],//选中的平台列表的id集合
    },
    getters:{
        location(state){
            return state.location
        },
        rankList(state) {
            return state.rankList
        },
        contacterList(state) {
           return state.contacterList
        },
        rankGroupId(state) {
            return state.rankGroupId
        },
        isEnterContacter(state) {
            return state.isEnterContacter
        },
        groupList(state) {
            return state.groupList
        }
    },
    mutations:{
        changeLocation(state,location){
            state.location = location
        },
        
        addRank(state,rankValue) {
            state.rankList.push(rankValue)
        },
        decreaseRank(state) {
            state.rankList.pop()
        },
        addContacter(state,person) {
            state.contacterList.push(person)
        },
        decreaseContacter(state,person) {
            let personIndex = state.contacterList.findIndex((item) => {
                item.id === person.id
            })
            state.contacterList.splice(personIndex,1)
        },
        saveContacter(state,arr) {
           state.contacterList = arr
        },
        addGroupId(state,groupid) {
            state.rankGroupId.push(groupid)
        },
        decreaseGroupId(state) {
            state.rankGroupId.pop()
        },
        changeIsEnterContacter(state,status) {
            state.isEnterContacter = status
        },
        addGroupPlatformId(state,id) {
            state.groupList.push(id)
        },
        decreaseGroupPlatformId(state,id) {
            state.groupList.splice(state.groupList.indexOf(id),1)
        },
        setNullContacterList(state) {
            // state.contacterList = state.contacterList.splice(0,state.contacterList.length)
            state.contacterList = []
            // //console.log('hello')
        },
        setNullGroupList(state) {
            // state.groupList = state.groupList.splice(0,state.groupList.length)
            state.groupList = []
            // //console.log('hi')
        },
        setNullRankList(state) {
            state.rankList = ['联系人']
        },
        setNullRankGroupId(state) {
            state.rankGroupId = []
        }
    }
})

export default store