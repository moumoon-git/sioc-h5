import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

let router = new Router({
    mode: 'hash',
    routes: [
        {
            path: "/",
            name: "districtUnitGradeResponse",
            component: () => import('./districtUnitGradeResponse.vue')
        },
        {
            path: "/districtUnitDetail",
            name: "districtUnitDetail",
            component: () => import('./districtUnitDetail.vue')
        },
        {
            path: "/districtUnitListBackUp",
            name: "districtUnitListBackUp",
            component: () => import('./districtUnitListBackUp.vue')
        },
        {
            path: "/districtUnitAddRectification",
            name: "districtUnitAddRectification",
            component: () => import('./districtUnitAddRectification.vue')
        },
        {
            path: "/subordinateUnitDetail",
            name: "subordinateUnitDetail",
            component: () => import('./subordinateUnitDetail.vue')
        },
        {
            path: "/responseUnitSearch",
            name: "responseUnitSearch",
            component: () => import('./responseUnitSearch.vue')
        },
        {
            path: "/subordinateUnitSubmitResponse",
            name: "subordinateUnitSubmitResponse",
            component: () => import('./subordinateUnitSubmitResponse.vue')
        },
        {
            path: "/subordinateUnitRectificationProcess",
            name: "subordinateUnitRectificationProcess",
            component: () => import('./subordinateUnitRectificationProcess.vue')
        },
        {
            path: "/subordinateUnitGradePesponse",
            name: "subordinateUnitGradePesponse",
            component: () => import('./subordinateUnitGradePesponse.vue')
        },
        {
            path: '/init',
            name: 'init',
            component: () => import('./init.vue')
        },
        {
            path: '/chooseContacterDialog',
            name: 'chooseContacterDialog',
            component: () => import('./chooseContacterDialog.vue')
        },
        {
            path: '/chooseContacterList',
            name: 'chooseContacterList',
            component: () => import('./chooseContacterList.vue')
        },
    ]
})




export default router