import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

let router=new Router({
    mode:'hash',
    routes: [ 
        {
            path: "/",
            name: "OverallSituation",
            component: ()=>import('./OverallSituation.vue')     
        }
    ]
})




export default router