$(function () {
    //获取平台类型
    var platformId = getQueryString("platformId");
    $('#platformId').val(platformId);
    getPlatformByOpenId(platformId);
    //判断权限授权标志，有物业、校园、人、车
    judgeAccreditFlag();


});


//获取url参数值：
function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var reg_rewrite = new RegExp("(^|/)" + name + "/([^/]*)(/|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    var q = window.location.pathname.substr(1).match(reg_rewrite);
    if (r != null) {
        return unescape(r[2]);
    } else if (q != null) {
        return unescape(q[2]);
    } else {
        return null;
    }
}

//获取平台类型
function getPlatformByOpenId(platformId) {
    $.ajax({
        async: false,
        type: "GET",
        url: SERSVER_BASE_URL + "/wechatMobile/platformTypeById",
        data:
            {
                'platformId':platformId,
                
            },
        dataType: "json",
        success: function (res) {
            //console.log("res",res);
            if(res.code == 0){
                $('#platformTypeId').val(res.platformTypeId);
            }
        }
    });
}

//判断权限授权标志，页面初始化
function judgeAccreditFlag() {
    let val = $('#platformTypeId').val();
    $('#globalPlatformTypeId').val();

    // if(val == 3){ //镇街
    //     $("#accreditFlag").html('');
    //     var strUl = '<li class="active">小区</li>\n' +
    //         '        <li>校园</li>\n' +
    //         '        <li>人员</li>\n' +
    //         '        <li>车辆</li>';
    //     // $("#accreditFlag").html(strUl);
    //     $('#globalPlatformTypeId').val(5);

    // }else if( val == 5){ //小区
    //     $("#accreditFlag").html('');
    //     var strUl = '<li class="active">小区</li>';
    //     // $("#accreditFlag").html(strUl);
    //     $('#globalPlatformTypeId').val(5);

    //     $("#panel-school").remove();
    //     $("#panel-humman").remove();
    //     $("#panel-vehicle").remove();

    // }else if(val == 6){ //学校
    //     $("#accreditFlag").html('');
    //     var strUl = '<li class="active">学校</li>';
    //     $("#accreditFlag").html(strUl);
    //     $('#globalPlatformTypeId').val(6);

    //     $("#panel-community").remove();
    //     $("#panel-humman").remove();
    //     $("#panel-vehicle").remove();

    // }else{ //其他
    //     $("#accreditFlag").html('');
    //     var strUl = '<li class="active">未知</li>';
    //     $("#accreditFlag").html(strUl);
    //     $('#globalPlatformTypeId').val(0);

    //     $("#panel-school").remove();
    //     $("#panel-community").remove();
    //     $("#panel-humman").remove();
    //     $("#panel-vehicle").remove();
    // }

    //不管有没有，初始化面板页面
    let globalTypeId = $('#globalPlatformTypeId').val();
    if(globalTypeId != 0){
        communityTypeStatistical(globalTypeId);
        communityTrendStatistical(globalTypeId);
        communityPlatformStatistical(globalTypeId);
    }

}

//小区学校类型统计
function communityTypeStatistical(globalTypeId){
    $.ajax({
        async: true,
        type: "GET",
        url: SERSVER_BASE_URL + "/event/eventShare/statisticsTypeCount",
        data:
            {
                platformId: $('#platformId').val(),
                townId: null,
                platformTypeId: globalTypeId,
                startTime: null,
                endTime: null,
                sharePlatformFlagType: 0,
                
            },
        dataType: "json",
        success: function (res) {
            //console.log("initCommunityData",res);
            // var totalCount = 0;
            // var deCount = 0;
            // var unDeCount = 0;
            if(res.code == 0){
                if(globalTypeId == 5){
                    var security = res.map.security;
                    var other = res.map.other;
                    var manager = res.map.manager;
                   
                    var fire = res.map.fire;
                    var trafficSafety = res.map.trafficSafety;
                    var commnunityTotal =  security+other+manager+fire+trafficSafety;
                    
                    let { totalCount=0,deCount=0,unDeCount=0} =  num(res.map)
                    pc.areaTotalCount = totalCount
                    pc.areaDeCount = deCount
                    pc.areaUnDeCount = unDeCount
                    pc.typeCount =  res.map
                }else if(globalTypeId == 6){
                    let { totalCount=0,deCount=0,unDeCount=0} =  num(res.map)
                    ps.schoolTotalCount = totalCount
                    ps.schoolDeCount = deCount
                    ps.schoolUnCount = unDeCount
                    ps.typeCount = res.map
                }

                function num(data) {
                    let totalCount = 0;
                    let deCount = 0;
                    let unDeCount = 0;
                    for(var i = 0; i < data.length; i++) {
                        console.log('data: ', data);
                        totalCount += data[i].allCount
                        deCount += data[i].deCount
                        unDeCount += data[i].unDeCount
                        
                    }
                    return {totalCount,deCount,unDeCount}
                }
            }
        }
    });
}

//小区学校上报趋势（按月统计）
function communityTrendStatistical(globalTypeId){
    var timeArr = getTime();
    var startTime = timeArr.split("_")[0];
    var endTime = timeArr.split("_")[1];
    $.ajax({
        async: true,
        type: "GET",
        url: SERSVER_BASE_URL + "/event/eventShare/statisticsByTime",
        data:
            {
                platformId: $('#platformId').val(),
                townId: null,
                platformTypeId: globalTypeId,
                startTime: startTime,
                endTime: endTime,
                sharePlatformFlagType: 0,
                
            },
        dataType: "json",
        success: function (res) {
            //console.log("communityTrendStatistical",res);
            if(res.code == 0){
                var x = [];
                var y = [];
                var i = 1;
                for (let j = 0; j < res.data.length; j++) {
                    res.data.forEach(item => {
                        if (item.column === i) {
                            x.push(item.column+"月");
                            y.push(item.count);
                            ++i;
                        }
                    });
                }

                if(globalTypeId == 5){
                    initTimePeriodChart(x,y);
                }else{
                    initSchoolTimePeriodChart(x,y)
                }


            }
        }
    });
}

//小区学校平台统计（前10个）
function communityPlatformStatistical(globalTypeId){
    $.ajax({
        async: true,
        type: "GET",
        url: SERSVER_BASE_URL + "/sys/platform/platformTotalRankList",
        data:
            {
                platformTypeId: globalTypeId,
                platformId: $('#platformId').val(),
                pageIndex: 1,
                pageSize: 10,
                
            },
        dataType: "json",
        success: function (res) {
            //console.log("communityPlatformStatistical",res);
            if(res.code == 0){
                //排序
                function compare(property){
                    return function(a,b){
                        var value1 = a[property];
                        var value2 = b[property];
                        return value1 - value2;
                    }
                }

                //反转
                if(globalTypeId == 5){
                    pc.platformCountList = ( res.data.sort(compare('num'))).reverse();
                }else if(globalTypeId == 6){
                    ps.platformCountList = ( res.data.sort(compare('num'))).reverse();
                }

            }
        }
    });
}

//人员类型统计
function humanTypeStatistical() {
    $.ajax({
        async: true,
        type: "GET",
        url: SERSVER_BASE_URL + "/statisticApi/humanAlarmApi/humanTypeTotalRankList",
        data:
            {
                platformId: $('#platformId').val(),
                indexCode: null,//摄像机路口标志
                startAt: null,
                endAt: null,
                
            },
        dataType: "json",
        success: function (res) {
            //console.log("humanTypeStatistical",res);
            if(res.code == 0){
                var dangerTypeList = [];
                var dangerTypeTotal = 0;
                if(res.data != null){
                    let arr = res.data;
                    for(let i=0; i<res.data.length; i++){
                        let typeName = arr[i].typeName;
                        let typeCount = 0;
                        let countArr = arr[i].typeList;
                        if(countArr.length != null && countArr.length != 0){
                            for(let j=0; j<countArr.length;j++){
                                typeCount = typeCount+countArr[j].num;
                                //总量
                                dangerTypeTotal = dangerTypeTotal + countArr[j].num
                            }
                        }
                        let obj = {'typeName': typeName,'count':typeCount};
                        dangerTypeList.push(obj);
                    }

                    //排序
                    function compare(property){
                        return function(a,b){
                            var value1 = a[property];
                            var value2 = b[property];
                            return value1 - value2;
                        }
                    }

                    //反转
                    ph.typeCountHumman = (dangerTypeList.sort(compare('count'))).reverse();
                    ph.dangerTypeTotal = dangerTypeTotal;

                    //反转
                    // dangerTypeList = (dangerTypeList.sort(compare('count'))).reverse();
                    // var  barAry = [];
                    // for(let i = 0; i < dangerTypeList.length; i += 3){
                    //     barAry.push(dangerTypeList.slice(i, i + 3));
                    // }
                    // ph.typeCountHumman = barAry;
                    // ph.dangerTypeTotal = dangerTypeTotal;

                }
            }
        }
    });
}

//人员类型选择,人是3
function humanSelectType(typeFlag) {
    $.ajax({
        async: true,
        type: "GET",
        url: SERSVER_BASE_URL + "/wechatMobile/selectTypeList",
        data:
            {
                typeFlag: typeFlag,
                
            },
        dataType: "json",
        success: function (res) {
            //console.log("humanSelectType",res);
            if (res.list.length > 0) {
                //leaveNull(res.list)
                var typeArr = []

                var humanTypeItem = {
                    'id': 0,
                    'value': "全部类型",
                };
                typeArr.push(humanTypeItem);

                for(var i=0; i<res.list.length; i++){
                    var humanItemList = {
                        'id': res.list[i].id,
                        'value': res.list[i].name,
                    };
                    typeArr.push(humanItemList);
                }

                mobileSelectHuman.updateWheel(0,typeArr);

                ph.selectedTypeList = typeArr;

            }else{
                // 切换隐患初始化
                $('#trigger').text('暂无管控类型');
                mobileSelectHuman.updateWheel(0,[{
                    id: 0,
                    name: '全部类型'
                }])
            }

        }
    });
}

//人类类型统计排行版
function humanTypeStatisticalRank(controlTypeId) {
    $.ajax({
        async: true,
        type: "GET",
        url: SERSVER_BASE_URL + "/statisticApi/humanAlarmApi/humanRankList",
        data:
            {
                controlTypeId: controlTypeId,
                platformId: $('#platformId').val(),
                startAt: null,
                endAt: null,
                limit: 5,
                
            },
        dataType: "json",
        success: function (res) {
            //console.log("humanTypeStatisticalRank",res);
            if(res.data.length > 0){
                ph.humanTypeRank = res.data;
            }else{
                ph.humanTypeRank = {};
            }
        }
    });
}

//人员摄像机统计排行版
function humanCaremaStatisticalRank(controlTypeId) {
    $.ajax({
        async: true,
        type: "GET",
        url: SERSVER_BASE_URL + "/risk/riskcamera/queryHumanCameraRank",
        data:
            {
                controlTypeId: controlTypeId,
                platformId: $('#platformId').val(),
                startAt: null,
                endAt: null,
                limit: 5,
                
            },
        dataType: "json",
        success: function (res) {
            //console.log("humanCaremaStatisticalRank",res);
            if(res.data.length > 0){
                ph.humanCaremaRank = res.data;
            }else{
                ph.humanCaremaRank = {};
            }
        }
    });
}

//车辆类型统计
function vehicleTypeStatistical() {
    $.ajax({
        async: true,
        type: "GET",
        url: SERSVER_BASE_URL + "/statisticApi/vehicleApi/vehicleTypeTotalRankList",
        data:
            {
                platformId: $('#platformId').val(),
                crossingId: null,
                startAt: null,
                endAt: null,
                
            },
        dataType: "json",
        success: function (res) {
            //console.log("humanTypeStatistical",res);
            if(res.code == 0){
                var dangerTypeList = [];
                var dangerTypeTotal = 0;
                if(res.data != null){
                    let arr = res.data;

                    for(let i=0; i<res.data.length; i++){
                        let typeName = arr[i].typeName;
                        let typeCount = 0;
                        let countArr = arr[i].typeList;
                        if(countArr.length != null && countArr.length != 0){
                            for(let j=0; j<countArr.length;j++){
                                typeCount =typeCount + countArr[j].num;
                                //总量
                                dangerTypeTotal = dangerTypeTotal + countArr[j].num
                            }
                        }
                        let obj = {'typeName': typeName,'count':typeCount};
                        dangerTypeList.push(obj);

                    }

                    //排序
                    function compare(property){
                        return function(a,b){
                            var value1 = a[property];
                            var value2 = b[property];
                            return value1 - value2;
                        }
                    }


                    //反转
                    pv.typeCountVehicle = (dangerTypeList.sort(compare('count'))).reverse();
                    pv.dangerTypeTotal = dangerTypeTotal;

                }

            }
        }
    });
}

//车辆类型选择,人是4
function vehicleSelectType(typeFlag) {
    $.ajax({
        async: true,
        type: "GET",
        url: SERSVER_BASE_URL + "/wechatMobile/selectTypeList",
        data:
            {
                typeFlag: typeFlag,
                
            },
        dataType: "json",
        success: function (res) {
            //console.log("vehicleSelectType",res);
            if (res.list.length > 0) {

                //leaveNull(res.list)
                var typeArr = [];

                var humanTypeItem = {
                    'id': 0,
                    'value': "全部类型",
                };
                typeArr.push(humanTypeItem);

                for(var i=0; i<res.list.length; i++){
                    var humanItemList = {
                        'id': res.list[i].id,
                        'value': res.list[i].name,
                    };
                    typeArr.push(humanItemList);
                }

                mobileSelectVehicle.updateWheel(0,typeArr)

                pv.selectedTypeList = typeArr;


            }else{
                // 切换隐患初始化
                $('#trigger').text('暂无管控类型');
                mobileSelectVehicle.updateWheel(0,[{
                    id: 0,
                    name: '全部类型'
                }])
            }

        }
    });
}

//车辆类型统计排行版
function vehicleTypeStatisticalRank(controlTypeId) {
    $.ajax({
        async: true,
        type: "GET",
        url: SERSVER_BASE_URL + "/statisticApi/vehicleApi/vehicleRankList",
        data:
            {
                controlTypeId: controlTypeId,
                platformId: $('#platformId').val(),
                startAt: null,
                endAt: null,
                limit: 5,
                
            },
        dataType: "json",
        success: function (res) {
            //console.log("humanTypeStatisticalRank",res);
            if(res.data.length > 0){
                var vehicleRankingList = [];
                for(let i=0; i<res.data.length; i++){
                    for(let j=0; j<pv.selectedTypeList.length; j++){
                        if(res.data[i].controlTypeId === pv.selectedTypeList[j].id){
                            let obj = {'num':res.data[i].num,'carNum':res.data[i].carNum,'controlTypeId':res.data[i].controlTypeId,'controlName':pv.selectedTypeList[j].value};
                            vehicleRankingList.push(obj);
                        }
                    }
                }
                pv.vehicleTypeRank = vehicleRankingList;
            }else{
                pv.vehicleTypeRank = {};
            }
        }
    });
}

//车辆摄像机统计排行版
function vehicleCaremaStatisticalRank(controlTypeId) {
    $.ajax({
        async: true,
        type: "GET",
        url: SERSVER_BASE_URL + "/risk/riskcamera/queryVehicleCameraRank",
        data:
            {
                controlTypeId: controlTypeId,
                platformId: $('#platformId').val(),
                startAt: null,
                endAt: null,
                limit: 5,
                
            },
        dataType: "json",
        success: function (res) {
            //console.log("humanCaremaStatisticalRank",res);
            if(res.data.length > 0){
                pv.vehicleCaremaRank = res.data;
            }else{
                pv.vehicleCaremaRank = {};
            }
        }
    });
}


function getTime(){
    var now = new Date();
    var year = now.getFullYear();
    var month =(now.getMonth() + 1).toString();
    var newMoth = Number( month) + 2;
    var day = (now.getDate()).toString();
    var hour = (now.getHours()).toString();
    var minute = (now.getMinutes()).toString();
    var second = (now.getSeconds()).toString();
    if (month.length == 1) {
        month = "0" + month;
        newMoth = "0"+(Number(month)+2);
    }
    if (day.length == 1) {
        day = "0" + day;
    }
    if (hour.length == 1) {
        hour = "0" + hour;
    }
    if (minute.length == 1) {
        minute = "0" + minute;
    }
    if (second.length == 1) {
        second = "0" + second;
    }
    var startDateTime = year + "-" + month + "-" + day +" "+ hour +":"+minute+":"+second;
    var endDateTime = year + "-" + newMoth + "-" + day +" "+ hour +":"+minute+":"+second;

    return startDateTime+"_"+endDateTime;

}


function leaveNull(data = []) {
    data.forEach(item => {
        item.children === null ? item.children = [] : leaveNull(item.children)
    })
}


