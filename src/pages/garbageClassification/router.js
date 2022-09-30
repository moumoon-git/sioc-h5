/*
 * @Author: liukanglin
 * @Date: 2020-09-16 09:48:31
 * @LastEditors: yaoweixin
 * @LastEditTime: 2020-12-14 16:22:40
 * @Desc: file content
 * @FilePath: \vue-cli-multiPage-master\src\pages\garbageClassification\router.js
 */
import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
let router = new Router({
    mode: 'hash',
    routes: [
        {
            path: "/",
            name: "garbageClassification",
            component: () => import('./garbageClassification.vue')
        },
        {
            path: "/garbageClassificationRegister",
            name: "garbageClassificationRegister",
            meta: {
                title: '注册'
            },
            component: () => import('./garbageClassificationRegister.vue')
        },
        {
            path: '/workAttendance',
            name: 'workAttendance',
            meta: {
                title: '基本信息'
            },
            component: () => import('./WorkAttendanceNew.vue')
        },
        {
            path: '/attendanceHistoryRecord',
            name: 'attendanceHistoryRecord',
            meta: {
                title: '考勤记录'
            },
            component: () => import('./ClockHistoryRecord.vue')
        },
        {
            path: '/cleanHistoryRecord',
            name: 'cleanHistoryRecord',
            meta: {
                title: '保洁记录'
            },
            component: () => import('./CleanHistoryRecord.vue')
        },
        {
            path: '/disposalHistoryRecord',
            name: 'disposalHistoryRecord',
            meta: {
                title: '处置记录'
            },
            component: () => import('./DisposalHistoryRecord.vue')
        },
        {
            path: "/organizingActivities",
            name: "organizingActivities",
            meta: {
                title: '宣传活动'
            },
            component: () => import('./organizingActivities.vue')
        },
        {
            path: '/removeBarrelHistoryRecord',
            name: 'removeBarrelHistoryRecord',
            meta: {
                title: '历史撤桶记录'
            },
            component: () => import('./RemoveBarrelHistoryRecord.vue')
        },
        {
            path: '/collectPointRegister',
            name: 'collectPointRegister',
            meta: {
                title: '垃圾分类管理'
            },
            component: () => import('./CollectPointRegister.vue')
        },
        {
            path: '/transferHistoryRecord',
            name: 'transferHistoryRecord',
            meta: {
                title: '历史收运记录'
            },
            component: () => import('./TransferHistoryRecord.vue')
        },
        {
            path: '/transitRegister',
            name: 'transitRegister',
            meta: {
                title: '垃圾分类管理'
            },
            component: () => import('./TransitRegister.vue')
        },
        {
            path: '/transitHistoryRecord',
            name: 'transitHistoryRecord',
            meta: {
                title: '历史转运记录'
            },
            component: () => import('./TransitHistoryRecord.vue')
        },
        {
            path: "/organizingActivitiesDetail",
            name: "organizingActivitiesDetail",
            meta: {
                title: '活动详情'
            },
            component: () => import('./organizingActivitiesDetail.vue')
        },
        {
            path: "/organizingActivitiesPublish",
            name: "organizingActivitiesPublish",
            meta: {
                title: '发布活动'
            },
            component: () => import('./organizingActivitiesPublish.vue')
        },
        {
            path: "/organizingActivitiesHistory",
            name: "organizingActivitiesHistory",
            meta: {
                title: '历史宣传活动'
            },
            component: () => import('./organizingActivitiesHistory.vue')
        },
        {
            path: "/massPublicityAndEducation",
            name: "massPublicityAndEducation",
            meta: {
                title: '分类答题'
            },
            component: () => import('./massPublicityAndEducation.vue')
        },
        {
            path: "/staffRegistrationActivation",
            name: "staffRegistrationActivation",
            meta: {
                title: '工作人员激活'
            },
            component: () => import('./staffRegistrationActivation.vue')
        },
        {
            path: "/organizingActivitiesUpdata",
            name: "organizingActivitiesUpdata",
            meta: {
                title: '修改活动'
            },
            component: () => import('./organizingActivitiesUpdata.vue')
        },
        {
            path: "/registrationActivation",
            name: "registrationActivation",
            meta: {
                title: '激活'
            },
            component: () => import('./registrationActivation.vue')
        },
        {
            path: "/historyInspectionRecord",
            name: "historyInspectionRecord",
            meta: {
                title: '历史巡查记录'
            },
            component: () => import('./historyInspectionRecord.vue')
        },
        {
            path: "/registrationSuccess",
            name: "registrationSuccess",
            component: () => import('./registrationSuccess.vue')
        },
        {
            path: '/noLimit',
            name: 'noLimit',
            meta: {
                title: '无权限'
            },
            component: () => import('./noLimit.vue')
        },
       
    ]
})




export default router