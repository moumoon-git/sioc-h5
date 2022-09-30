

//小区
var pc =new Vue({
    el:"#panel-community",
    data: {
        //类型统计
        // typeCount:{
        //     security: 0,
        //     other:0,
        //     manager:0,
        //     fire:0,
        //     trafficSafety:0,
        //     commnunityTotal: 0,
        // },
        typeCount: [],
        areaTotalCount: 0,
        //列表
        platformCountList:{
            num: 0,
            platformId: 0,
            platformName: "无数据"
        }


    },
    mounted () {
        var that = this;
        that.$nextTick(function(){
            var mySwiper4 = new Swiper('.area-swiper .swiper-container', {
                direction:"horizontal",
                slidesPerView: 3,
                spaceBetween: 1,
                slidesPerGroup: 3,
                loopFillGroupWithBlank: true,
                pagination: '.area-swiper .swiper-pagination',
                clickable: true,
            });
        })
    },
});


//学校
var ps =new Vue({
    el:"#panel-school",
    data: {
        //类型统计
        // typeCount:{
        //     public: 0,
        //     traffic:0,
        //     food:0,
        //     manager:0,
        //     other:0,
        //     schoolTotal: 0,
        // },
        typeCount: [],
        schoolTotalCount: 0,
        //列表
        platformCountList:{
            num: 0,
            platformId: 0,
            platformName: "无数据"
        }
    },
    mounted () {
        var that = this;
        that.$nextTick(function(){
            var mySwiper5 = new Swiper('.school-swiper .swiper-container', {
                direction:"horizontal",
                slidesPerView: 3,
                spaceBetween: 1,
                slidesPerGroup: 3,
                loopFillGroupWithBlank: true,
                pagination: '.school-swiper .swiper-pagination',
                clickable: true,
            });
        })
    },
});

//面板切换
// var mySwiper2 = new Swiper('.swiper-container', {
//     slidesPerView: 3,
//     spaceBetween: 1,
//     slidesPerGroup: 3,
//     loopFillGroupWithBlank: true,
//     pagination: '.swiper-pagination',
//     clickable: true,
//
// });


