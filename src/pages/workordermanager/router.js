import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

let router=new Router({
    mode:'hash',
    routes: [ 
        {
            path: "/",
            name: "workordermanager",
            component: ()=>import('./workordermanager.vue')     
        },
        {
            path: '/ordersearch',
            name: 'ordersearch',
            component: () => import('./ordersearch.vue')
        },
        {
            path: '/orderchoose',
            name: 'orderchoose',
            component: () => import('./orderchoose.vue')
        },
        {
            path: '/orderdetail',
            name: 'orderdetail',
            component: () => import('./orderdetail.vue')
        },
        {
            path: '/handleorder',
            name: 'handleorder',
            component: () => import('./handleorder.vue')
        },
        {
            path: '/searchcontacter',
            name: 'searchcontacter',
            component: () => import('./searchcontacter.vue')
        },
        {
            path: '/choosecontacter',
            name: 'choosecontacter',
            component: () => import('./choosecontacter.vue')
        },
        {
            path: '/choosecontacternext',
            name: 'choosecontacternext',
            component: () => import('./choosecontacternext.vue')
        },
        {
            path: '/submitHandleMessageJoiner',
            name: 'submitHandleMessageJoiner',
            component: () => import('./submitHandleMessageJoiner.vue')
        },
        {
            path: '/submitHandleMessageLeader',
            name: 'submitHandleMessageLeader',
            component: () => import('./submitHandleMessageLeader.vue')
        },
        {
            path: '/transmitOrder',
            name: 'transmitOrder',
            component: () => import('./transmitOrder.vue')
        },
        {
            path: '/handleOrderJoiner',
            name: 'handleOrderJoiner',
            component: () => import('./handleOrderJoiner.vue')
        },
        {
            path: '/handleOrderLeader',
            name: 'handleOrderLeader',
            component: () => import('./handleOrderLeader.vue')
        },
        {
            path: '/handleOrderLeaderBackup',
            name: 'handleOrderLeaderBackup',
            component: () => import('./handleOrderLeaderBackup.vue')
        },
        {
            path: '/applyMessageJoiner',
            name: 'applyMessageJoiner',
            component: () => import('./applyMessageJoiner.vue')
        },
        {
            path: '/applyMessageResponse',
            name: 'applyMessageResponse',
            component: () => import('./applyMessageResponse.vue')
        },
        {
            path: '/lookChooseContacter',
            name: 'lookChooseContacter',
            component: () => import('./lookChooseContacter.vue')
        },
        {
            path: '/init',
            name: 'init',
            component: () => import('./init.vue')
        },
        {
            path: '/contacterList',
            name: 'contacterList',
            component: () => import('./contacterList.vue')
        },
        {
            path: '/previewPicture',
            name: 'previewPicture',
            component: () => import('./previewPicture.vue')
        },
        {
            path: '/chooseContacterList',
            name: 'chooseContacterList',
            component: () => import('./chooseContacterListNew.vue')
        },
        {
            path: '/handleObject',
            name: 'handleObjectDetail',
            component: () => import('./handleObjectDetail.vue')
        }
    ]
})




export default router