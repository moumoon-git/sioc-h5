$(function () {


    //获取平台类型
    var platformId = getQueryString("platformId");
    $('#platformId').val(platformId);
    //人车带着平台
    hph.platformId = ($('#platformId').val());
    hpv.platformId = ($('#platformId').val());
    getPlatformByOpenId(platformId);
    //判断权限授权标志，有物业、市场、人、车
    judgeAccreditFlag();
    console.log('platformId',platformId)



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
            console.log("res",res);
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
    //     var strUl = '<li class="active">疫情</li>\n' +
    //         '        <li>市场</li>\n' +
    //         '        <li>人员</li>\n' +
    //         '        <li>车辆</li>';
    //     // $("#accreditFlag").html(strUl);
    //     $('#globalPlatformTypeId').val(5);


    // }else if( val == 5){ //小区
    //     $("#accreditFlag").html('');
    //     var strUl = '<li class="active">疫情</li>';
    //     // $("#accreditFlag").html(strUl);
    //     $('#globalPlatformTypeId').val(5);


    //     $("#hpanel-school").remove();
    //     $("#hpanel-humman").remove();
    //     $("#hpanel-vehicle").remove();

    // }else if(val == 6){ //学校
    //     $("#accreditFlag").html('');
    //     var strUl = '<li class="active">学校</li>';
    //     // $("#accreditFlag").html(strUl);
    //     $('#globalPlatformTypeId').val(6);

    //     $("#hpanel-community").remove();
    //     $("#hpanel-humman").remove();
    //     $("#hpanel-vehicle").remove();

    // }
    // else{ //其他
    //     $("#accreditFlag").html('');
    //     var strUl = '<li class="active">未知</li>';
    //     // $("#accreditFlag").html(strUl);
    //     $('#globalPlatformTypeId').val(0);

    //     $("#hpanel-school").remove();
    //     $("#hpanel-community").remove();
    //     $("#hpanel-humman").remove();
    //     $("#hpanel-vehicle").remove();
    // }
    //不管有没有，初始化面板页面
    let globalTypeId = $('#globalPlatformTypeId').val();
    console.log('globalTypeId',globalTypeId);
    if(globalTypeId != 0){
        communityTroubleList(globalTypeId);
    }

}

//小区学校隐患列表
function communityTroubleList(globalTypeId) {
    var StartTime;
    var EndTime;
    var KeyWord;
    if(globalTypeId == 5){
        StartTime = $('#laydate1').val()+($('#laydate1').val()?' 00:00:00':'')
        EndTime = $('#laydate2').val()+($('#laydate2').val()?' 23:59:59':'')
        KeyWord = $('#search1').val() 
    }
    if(globalTypeId == 6){
        StartTime = $('#laydate3').val()+($('#laydate3').val()?' 00:00:00':'')
        EndTime = $('#laydate4').val()+($('#laydate4').val()?' 23:59:59':'')
        KeyWord = $('#search2').val()
    }
    $.ajax({
        async: true,
        type: "post",
        url: SERSVER_BASE_URL + "/wechatMobile/selectEventInfoListByPlatformId",
        contentType: 'application/json',
        data: JSON.stringify({
            platformId: Number($('#platformId').val()),
            platformTypeId: Number(globalTypeId),
            flagType: 5,
            pageIndex: Number($('#pageIndex').val()),
            pageSize: Number($('#pageSize').val()),
            startTime: StartTime,
            endTime: EndTime,
            keyword:KeyWord,   
        }),
        dataType: "json",
        success: function (res) {
            console.log("selectEventInfoListByPlatformId", res);
            if (res.code == 0) {
                
                
                if(globalTypeId == 5){
                    $('#laydate3').val('')
                    $('#laydate4').val('')
                    let communityArray = [];
                    for(let i=0; i<res.list.length; i++){
                        //状态
                        let status = setEventStatus(res.list[i].status);
                        let imageUrl = setEventImage(res.list[i].imageUrl);
                        let audioList = setEventVideo(res.list[i].audioUrl);

                        let obj = {
                            id: res.list[i].id,
                            townName: res.list[i].townName,
                            platformName: res.list[i].platformName,
                            status: status,
                            eventTypeName: res.list[i].eventTypeName,
                            eventDescription: res.list[i].eventDescription,
                            imgList: imageUrl,
                            audioList: audioList ,
                            gmtCreate: res.list[i].gmtCreate,
                            validFlag: res.list[i].validFlag,
                            platformId: Number($('#platformId').val()),
                        };
                        communityArray.push(obj);
                    }

                    hpc.communityTroubleList = communityArray;

                    console.log("小区数据：",hpc.communityTroubleList)

                }else if(globalTypeId == 6){
                    $('#laydate1').val('')
                    $('#laydate2').val('')
                    let schoolArray = [];
                    for(let i=0; i<res.list.length; i++){

                        let status = setEventStatus(res.list[i].status);
                        let imageUrl = setEventImage(res.list[i].imageUrl);
                        let audioList = setEventVideo(res.list[i].audioUrl);

                        let obj = {
                            id: res.list[i].id,
                            townName: res.list[i].townName,
                            platformName: res.list[i].platformName,
                            status: status,
                            eventTypeName: res.list[i].eventTypeName,
                            eventDescription: res.list[i].eventDescription,
                            imgList: imageUrl,
                            audioList: audioList,
                            gmtCreate: res.list[i].gmtCreate,
                            validFlag: res.list[i].validFlag,
                            platformId: Number($('#platformId').val()),
                        };
                        schoolArray.push(obj);
                    }

                    hps.schoolTroubleList = schoolArray;

                    console.log("学校数据：",hps.schoolTroubleList)
                }

                //分页
                if(globalTypeId == 5){

                    layui.use('laydate', function(){
                        var laydate = layui.laydate;
                        laydate.render({
                            elem: '#laydate1'
                            ,done: function(value, date){ //监听日期被切换
                                console.log('上')
                                $('#laydate1').val(value)
                                if($('#laydate1').val()&&$('#laydate2').val()){
                                    communityTroubleList(5)
                                }
                                
                            }
                        });
                        laydate.render({
                            elem: '#laydate2'
                            ,done: function(value, date){ //监听日期被切换
                                console.log('下')
                                $('#laydate2').val(value)
                                if($('#laydate1').val()&&$('#laydate2').val()){
                                    communityTroubleList(5)
                                }
                                
                            }
                        });
                    })

                    $('#onSearch1').click(function(){
                        communityTroubleList(5)
                    })
            

                    laypage.render({
                        elem: 'demo7'
                        ,count: res.totalPage  //总数
                        ,limit: $('#pageSize').val()
                        ,curr: $('#pageIndex').val()
                        ,layout: ['count', 'prev', 'next','skip']
                        ,jump: function(obj, first){
                            if(!first){
                                $('#pageSize').val(obj.limit);
                                $('#pageIndex').val(obj.curr);
                                //再请求
                                communityTroubleList(5);
                            }
                        }
                    });

                }else if(globalTypeId == 6){

                    layui.use('laydate', function(){
                        var laydate = layui.laydate;
                        laydate.render({
                            elem: '#laydate3'
                            ,done: function(value, date){ //监听日期被切换
                                console.log('左')
                                $('#laydate3').val(value)
                                if($('#laydate3').val()&&$('#laydate4').val()){
                                    communityTroubleList(6)
                                }
                                
                            }
                        });
                        laydate.render({
                            elem: '#laydate4'
                            ,done: function(value, date){ //监听日期被切换
                                console.log('右',value,date)
                                $('#laydate4').val(value)
                                if($('#laydate3').val()&&$('#laydate4').val()){
                                    communityTroubleList(6)
                                }
                                
                            }
                        });
                    })

                    $('#onSearch2').click(function(){
                        communityTroubleList(6)
                    })

                    laypage.render({
                        elem: 'demo8'
                        ,count: res.totalPage  //总数
                        ,limit: $('#pageSize').val()
                        ,curr: $('#pageIndex').val()
                        ,layout: ['count', 'prev', 'next','skip']
                        ,jump: function(obj, first){
                            if(!first){
                                $('#pageSize').val(obj.limit);
                                $('#pageIndex').val(obj.curr);
                                //再请求
                                communityTroubleList(6);
                            }
                        }
                    });

                }

            }
        }
    });

}

//状态判断
function setEventStatus(eventStatus) {
    var status;
    switch (eventStatus) {
        case 1:
            status = "待核实";
            break;
        case 2:
            status = "核实中";
            break;
        case 3:
            status = "待处理";
            break;
        case 4:
            status = "处理中";
            break;
        case 5:
            status = "已处理";
            break;
        case 6:
            status = "超出范围";
            break;
        default:
            status = "其他";

    }

    return status;
}

//图片判断
function setEventImage(url) {
    var urlArray = [];
    if(url != null && url != '') {
        if(url.indexOf(",") > -1){
            //多个图片
            urlArray = url.split(",");
        }else{
            //是外网推过来的链接
            urlArray.push(url);
        }
    }
    

    return urlArray;
}

//语音判断
function setEventVideo(url) {
    var urlArray = [];
    if(url != null && url != '') {
        if(url.indexOf(",") > -1){
            //多个图片
            urlArray = url.split(",");
        }else{
            urlArray.push(url);
        }
    }
    

    return urlArray;
}


//人员列表
function humanTroubleList() {
    $.ajax({
        async: true,
        type: "GET",
        url: SERSVER_BASE_URL + "/wechatMobile/riskHumanAlarm",
        data: {
            page: Number($('#pageIndex').val()),
            limit: Number($('#pageSize').val()),
            platformId: Number($('#platformId').val()),
            startAt:$('#laydate5').val()+($('#laydate5').val()?' 00:00:00':''),
            endAt:$('#laydate6').val()+($('#laydate6').val()?' 23:59:59':''),
            key:$('#search3').val(),
            type:$('#select1').val()
            
        },
        dataType: "json",
        success: function (res) {
            console.log("humanTroubleList",res);
            let count = 0;
            if(res.code == 0 && res.page){
                hph.humanAlarmList =  res.page.records;
                count = res.page.total;
            }else{
                $('#pageSize').val(5);
                $('#pageIndex').val(1);
                count = 0;
            }

            layui.use('laydate', function(){
                var laydate = layui.laydate;
                laydate.render({
                    elem: '#laydate5'
                    ,done: function(value, date){ //监听日期被切换
                        if($('#laydate5').val()&&$('#laydate6').val()){
                            humanTroubleList();
                        }
                        
                    }
                });
                laydate.render({
                    elem: '#laydate6'
                    ,done: function(value, date){ //监听日期被切换
                        if($('#laydate5').val()&&$('#laydate6').val()){
                            humanTroubleList();
                        }
                        
                    }
                });
            })

            $('#onSearch3').click(function(){
                humanTroubleList();
            })

            laypage.render({
                elem: 'demo9'
                ,count: count  //总数
                ,limit: $('#pageSize').val()
                ,curr: $('#pageIndex').val()
                ,layout: ['count', 'prev', 'next','skip']
                ,jump: function(obj, first){
                    if(!first){
                        $('#pageSize').val(obj.limit);
                        $('#pageIndex').val(obj.curr);
                        //再请求
                        humanTroubleList();
                    }
                }
            });
        }
    });
}

//车辆列表
function vehicleTroubleList() {
    $.ajax({
        async: true,
        type: "GET",
        url: SERSVER_BASE_URL + "/wechatMobile/riskVehicleAlarm",
        data: {
            page: Number($('#pageIndex').val()),
            limit: Number($('#pageSize').val()),
            platformId: Number($('#platformId').val()),
            startAt:$('#laydate7').val()+($('#laydate7').val()?' 00:00:00':''),
            endAt:$('#laydate8').val()+($('#laydate8').val()?' 23:59:59':''),
            key:$('#search4').val(),
            type:$('#select2').val()
            
        },
        dataType: "json",
        success: function (res) {
            console.log("vehicleTroubleList",res);
            let count = 0;
            if(res.code == 0 && res.page){
                hpv.vehicleAlarmList =  res.page.records;
                count = res.page.total;
            }else{
                $('#pageSize').val(5);
                $('#pageIndex').val(1);
                count = 0;
            }
            
            layui.use('laydate', function(){
                var laydate = layui.laydate;
                laydate.render({
                    elem: '#laydate7'
                    ,done: function(value, date){ //监听日期被切换
                        if($('#laydate7').val()&&$('#laydate8').val()){
                            vehicleTroubleList();
                        }
                        
                    }
                });
                laydate.render({
                    elem: '#laydate8'
                    ,done: function(value, date){ //监听日期被切换
                        if($('#laydate7').val()&&$('#laydate8').val()){
                            vehicleTroubleList();
                        }
                        
                    }
                });
            })

            $('#onSearch4').click(function(){
                vehicleTroubleList();
            })

            laypage.render({
                elem: 'demo10'
                ,count: count  //总数
                ,limit: $('#pageSize').val()
                ,curr: $('#pageIndex').val()
                ,layout: ['count', 'prev', 'next','skip']
                ,jump: function(obj, first){
                    if(!first){
                        $('#pageSize').val(obj.limit);
                        $('#pageIndex').val(obj.curr);
                        //再请求
                        vehicleTroubleList();
                    }
                }
            });
        }
    });
}

$.ajax({
    async: false,
    type: "GET",
    url: SERSVER_BASE_URL + "/event/eventType/selectTypeList?typeFlag=3",
    headers:{
    },
    contentType:'application/json',
    dataType: "json",
    success: function (data) {
        console.log("/event/eventType/selectTypeList",data)
        $('#select1').html('')
        $('#select1').append('<option value="">请选择管控类型</option>');
        data.list.forEach(item=>{
            var option = $("<option>").val(item.id).text(item.name);
            $('#select1').append(option);
        })
        
    },
    error: function (XMLHttpRequest, textStatus, errorThrown) {
        alert("err:::" + errorThrown);
    }
});

$('#select1').change(function(){
    humanTroubleList()
})

$.ajax({
    async: false,
    type: "GET",
    url: SERSVER_BASE_URL + "/event/eventType/selectTypeList?typeFlag=4",
    headers:{
    },
    contentType:'application/json',
    dataType: "json",
    success: function (data) {
        console.log("/event/eventType/selectTypeList",data)
        $('#select2').html('')
        $('#select2').append('<option value="">请选择管控类型</option>');
        data.list.forEach(item=>{
            var option = $("<option>").val(item.id).text(item.name);
            $('#select2').append(option);
        })
        
    },
    error: function (XMLHttpRequest, textStatus, errorThrown) {
        alert("err:::" + errorThrown);
    }
});

$('#select2').change(function(){
    vehicleTroubleList()
})

//图片灯箱
function imgDisplay(obj) {

    var src = $(obj).attr("src");

    var imgHtml = '<div style="width: 100%;height: 100vh;overflow: auto;background: rgba(0,0,0,0.5);text-align: center;position: fixed;top: 0;left: 0;z-index: 1000;">' +
        '<img src=' + src + ' style="margin-top: 100px;width: 70%;margin-bottom: 100px;"/>' +
        '<p style="font-size: 50px;position: fixed;top: 30px;right: 30px;color: white;cursor: pointer;" onclick="closePicture(this)">×</p>' +
        '</div>';
    $('body').append(imgHtml);
}

//关闭图片
function closePicture(obj) {
    $(obj).parent("div").remove();
}



