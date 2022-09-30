/*
 * @Author: liukanglin
 * @Date: 2020-07-21 08:40:21
 * @LastEditors: liukanglin
 * @LastEditTime: 2020-11-16 10:08:45
 * @Desc: file content
 * @FilePath: \vue-cli-multiPage-master\src\pages\riskInvestigation\router.js
 */
import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

let router=new Router({
    mode:'hash',
    routes: [ 
        {
            path: "/",
            name: "inspectionInformation",
            meta: {
                title: '隐患巡查'
            },
            component: ()=>import('./inspectionInformation.vue')     
        },
        {
            path: "/inspectionItems",
            name: "inspectionItems",
            meta: {
                title: '巡查项目'
            },
            component: ()=>import('./inspectionItems.vue')     
        },
        {
            path: "/inspectionResults",
            name: "inspectionResults",
            meta: {
                title: '巡查项目'
            },
            component: ()=>import('./inspectionResults.vue')     
        },
        {
            path: "/invalidQRCode",
            name: "invalidQRCode",
            meta: {
                title: '隐患巡查'
            },
            component: ()=>import('./invalidQRCode.vue')     
        },
        {
            path: "/inspectionDisabled",
            name: "inspectionDisabled",
            meta: {
                title: '隐患巡查'
            },
            component: ()=>import('./inspectionDisabled.vue')     
        },
        {
            path: "/subscriptionInspectionResults",
            name: "subscriptionInspectionResults",
            component: ()=>import('./subscriptionInspectionResults.vue')     
        },
        {
            path: "/example",
            name: "example",
            component: ()=>import('./example.vue')     
        }
        
    ]
})




export default router