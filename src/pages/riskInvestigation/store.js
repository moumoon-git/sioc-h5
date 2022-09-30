import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state:{
        location:{}
    },
    getters:{
        location(state){
            return state.location
        } 
    },
    mutations:{
        changeLocation(state,location){
            state.location = location
        }
    }
})

export default store