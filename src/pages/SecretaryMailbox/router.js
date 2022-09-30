import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

let router=new Router({
    mode:'hash',
    routes: [ 
        {
            path: "/",
            name: "SecretaryMailbox",
            component: ()=>import('./SecretaryMailbox.vue')     
        },
        {
            path: "/MailboxDetail",
            name: "MailboxDetail",
            component: ()=>import('./MailboxDetail.vue')     
        }
    ]
})




export default router