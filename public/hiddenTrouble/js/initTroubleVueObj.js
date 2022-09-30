//分页
var laypage, layer;
layui.use(['laypage', 'layer'], function() {
    laypage = layui.laypage;
    layer = layui.layer;
});


//隐患模块—小区
var hpc =new Vue({
    el:"#hpanel-community",
    data: {
        //小区隐患列表
        communityTroubleList: [{
            id: '',
            townName: '',
            platformName: '',
            status: '',
            eventTypeName: '',
            eventDescription: '',
            imgList: [],
            audioList: [],
            gmtCreate: '',
            validFlag: 0,
            //平台id
            platformId: 0,
        }],
    }

});


//学校
var hps = new Vue({
    el:"#hpanel-school",
    data: {
        //学校隐患列表
        schoolTroubleList: [{
            id: '',
            townName: '',
            platformName: '',
            status: '',
            eventTypeName: '',
            eventDescription: '',
            imgList: [],
            audioList: [],
            gmtCreate: '',
            validFlag: 0,
            //平台id
            platformId: 0,
        }],

    }
});

//人员
var hph =new Vue({
    el:"#hpanel-humman",
    data: {
        humanAlarmList: [{
            id: '',
            alarmId: '',
            indexCode: '',
            cameraName: '',
            bkgPicUrl: '',
            smallPicUrl: '',
            facePicUrl: '',
            bkgPicMinUrl: '',
            humanId: '',
            sex: '',
            humanName: '',
            credentialsNum: '',
            alarmTime: '',
            similarity: '',
            listLibName: '',
        }],

        //平台id
        platformId: 0,

    },
});

//车辆
var hpv =new Vue({
    el:"#hpanel-vehicle",
    data: {
        vehicleAlarmList: [{
            id: '',
            crossingId: '',
            laneId: '',
            plateInfo: '',
            alarmTime: '',
            picAbbreviate: '',
            picPlate: '',
            picVehicle: '',
            type: '',
            picAbbreviateMin: '',
            cameraName: '',
            cameraAddress: '',
        }],

        //平台id
        platformId: 0,

    },

    methods:{
        formatterCarStatus(carType){
            switch (Number(carType)){
                case 0:carType = '其它车型';
                    break;
                case 1:carType = '客车';
                    break;
                case 2:carType = '货车';
                    break;
                case 3:carType = '轿车';
                    break;
                case 4:carType = '面包车';
                    break;
                case 5:carType = '小货车';
                    break;
                case 6:carType = '行人';
                    break;
                case 7:carType = '二轮车';
                    break;
                case 8:carType = '三轮车';
                    break;
                case 9:carType = 'SUV/MPV';
                    break;
                case 10:carType = '中型客车';
                    break;
                default:carType = "其他";
            }

            return carType;
        }
    }

});

