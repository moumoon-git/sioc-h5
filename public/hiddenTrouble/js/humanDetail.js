$(function () {
    //获取平台类型
    let humanId = getQueryString("humanId");
    let platformId = getQueryString("platformId");
    let id = getQueryString("id");
    console.log("人员id",humanId);
    hphh.humanId = humanId;
    hphh.platformId = platformId;
    hphh.id = id;

    //初始化
    $('#humanPageIndex').val(1);
    $('#humanPageSize').val(5);

    //人员基本信息
    humanInfo(id);

    //抓拍记录
    humanTroubleHistoryList(humanId,platformId);

});

//分页
var laypage3, layer3,layer4;
layui.use(['laypage', 'layer'], function() {
    laypage3 = layui.laypage;
    layer3 = layui.layer;
    layer4 = layui.layer;
});

function humanInfo(id) {
    $.ajax({
        async: true,
        type: "GET",
        url: SERSVER_BASE_URL + "/wechatMobile/getHumanInfo",
        data: {
            id: id,
            
        },
        dataType: "json",
        success: function (res) {
            console.log("getHumanInfo",res);

            if(res.code == 0 && res.info){
                hphh.humanInfo = res.info;
            }else{
                hphh.humanInfo = {};
            }

        }
    });
}

//人员抓拍列表
function humanTroubleHistoryList(humanId,platformId) {
    $.ajax({
        async: true,
        type: "GET",
        url: SERSVER_BASE_URL + "/wechatMobile/getHumanAlarmList",
        data: {
            page: Number($('#humanPageIndex').val()),
            limit: Number($('#humanPageSize').val()),
            platformId: Number(platformId),
            humanId: humanId,
            
        },
        dataType: "json",
        success: function (res) {
            console.log("getHumanAlarmList",res);
            let count = 0;
            if(res.code == 0 && res.page){
                count = res.page.total;
                hphh.humanHistoryList = res.page.records;
            }else{
                count = 0;
            }

            laypage3.render({
                elem: 'demo11'
                ,count: count  //总数
                ,limit: $('#humanPageSize').val()
                ,curr: $('#humanPageIndex').val()
                ,layout: ['count', 'prev', 'next']
                ,jump: function(obj, first){
                    if(!first){
                        $('#humanPageSize').val(obj.limit);
                        $('#humanPageIndex').val(obj.curr);
                        //再请求
                        humanTroubleHistoryList(humanId,platformId);
                    }
                }
            });

        }
    });
}

//查看人员处置列表
function getHumanDisposeRecord(eventInfoId,platformId){
    $.ajax({
        async: false,
        type: "POST",
        url: SERSVER_BASE_URL + "/wechatMobile/selectHistoryByDataSourceId",
        contentType:'application/x-www-form-urlencoded',
        data: {
            dataSourceId: eventInfoId,
            flagType: 3,
            platformId: platformId,
            
        },
        dataType: "json",
        success: function (data) {
            console.log(data);

            if(data.code == 0){

                //拼接工单,歷史記錄的
                var historyRecord = '<ul class="layui-timeline">\n';

                if (data.list.length > 0) {
                    for (var i = 0; i < data.list.length; i++) {
                        var strcontent = '';

                        var eventCreateTime = data.list[i].gmtCreate;
                        var eventRecord = data.list[i].title;
                        var eventContactorName = data.list[i].mailContactorName;
                        var eventContent = data.list[i].content;
                        var eventStatus = data.list[i].eventStatusAfter;
                        var status = setEventStatus(eventStatus);
                        var townName = data.list[i].townName;
                        var periodName = data.list[i].periodName;
                        var platformName = data.list[i].platformName;

                        historyRecord += '<li class="layui-timeline-item">\n' +
                            '    <i class="layui-icon layui-timeline-axis"></i>\n' +
                            '    <div class="layui-timeline-content layui-text">\n';

                        strcontent += '<h3 class="layui-timeline-title">' + eventCreateTime + '</h3>\n';
                        strcontent += '<p>状态：' + status + '\n';

                        if (eventRecord != null && eventRecord != "") {
                            strcontent += '<br>记录：' + eventRecord + '\n';
                        }

                        if (eventContactorName != null && eventContactorName != "") {
                            strcontent += '<br>人员：' + eventContactorName + '\n';
                        }

                        if (eventContent != null && eventContent != "") {
                            strcontent += '<br>内容：' + eventContent + '\n';
                        }

                        var areaName = '';

                        if (townName != null && townName != "") {
                            areaName = areaName + townName;
                        }
                        if (periodName != null && periodName != "") {
                            areaName = areaName + periodName;
                        }
                        if (platformName != null && platformName != "") {
                            areaName = areaName + platformName;
                        }

                        if(areaName !=null && areaName != "" && eventStatus ===1){
                            strcontent += '<br>区域：' + areaName + '\n';
                        }

                        strcontent += '</p>\n';


                        //判断图片
                        if (data.list[i].imageUrl != null && data.list[i].imageUrl != "") {
                            //单个图片
                            var url = data.list[i].imageUrl;
                            var newUrl;
                            if (url.indexOf("http") > -1) {
                                //是外网推过来的链接
                                newUrl = url;
                            } else {
                                newUrl = SERSVER_BASE_HOME + data.list[i].imageUrl;
                            }
                            strcontent += '<img onclick="imgDisplay(this)" src=' + newUrl + ' style="width: 100px;height: 100px;margin-left:10px"/>';
                        }
                        if (data.list[i].imageArr != null) {
                            //多个图片
                            for (var j = 0; j < data.list[i].imageArr.length; j++) {

                                var url = data.list[i].imageArr[j];
                                var newUrl;
                                if (url.indexOf("http") > -1) {
                                    //是外网推过来的链接
                                    newUrl = url;
                                } else {
                                    newUrl = SERSVER_BASE_HOME  + data.list[i].imageArr[j];
                                }
                                strcontent += '<img onclick="imgDisplay(this)" src=' + newUrl + ' style="width: 100px;height: 100px;margin-left:10px"/>';
                            }
                        }

                        //判断音频
                        if (data.list[i].audioUrl != null && data.list[i].audioUrl != "") {
                            //单个音频
                            var url = SERSVER_BASE_HOME + data.list[i].audioUrl;

                            strcontent += '<audio controls="controls"><source src="' + url + '" type="audio/mpeg" /></audio>';
                        }

                        if (data.list[i].audioUrlArr != null) {
                            //多个音频
                            for (var j = 0; j < data.list[i].audioUrlArr.length; j++) {
                                var url = SERSVER_BASE_HOME + data.list[i].audioUrlArr[j];
                                strcontent += '<audio controls="controls"><source src="' + url + '" type="audio/mpeg" /></audio>';
                            }
                        }

                        historyRecord += strcontent;
                        historyRecord += '</div></li>';
                    }
                } else {
                    historyRecord += ' <li class="layui-timeline-item">\n' +
                        '    <i class="layui-icon layui-timeline-axis"></i>\n' +
                        '    <div class="layui-timeline-content layui-text">\n' +
                        '      <h3 class="layui-timeline-title">暂无历史信息!!!</h3>\n' +
                        '      <p>\n' +
                        '        暂无历史信息!!!\n' +
                        '        <br>暂无历史信息!!!\n' +
                        '      </p>\n' +
                        '    </div>\n' +
                        '  </li>';
                }

                historyRecord += '</ul>';

                //自定义标题风格
                layer3.open({
                    title: [
                        '处置流程',
                        'background-color: #2089E7; color:#fff;'
                    ]
                    ,content: historyRecord
                });
            }else{


            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert("网络受限:" + errorThrown);
        }
    });
}


//派单
function humanOrder(alarmId,platformId,type,id) {
    console.log(alarmId,platformId,type,id);

    //自定义标题风格
    layer4.open({
        type: 2,
        title: [
            '派单',
            'background-color: #2089E7; color:#fff;'
        ],
        shadeClose: true,
        shade: false,
        area: ['85%', '80%'],
        content: '../SelectPage/index.html?alarmId='+alarmId+"&platformId="+platformId+"&type="+type+"&id="+id
    });
}


// 获取地址栏参数
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

//设置状态
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

//点击返回
function gobackClick(){
    console.log("点击返回")
    window.location.href=`./commentIndex.html`;
}


//图片灯箱
function imgDisplay(obj) {

    var src = $(obj).attr("src");

    var imgHtml = '<div style="width: 100%;height: 100vh;overflow: auto;background: rgba(0,0,0,0.5);text-align: center;position: fixed;top: 0;left: 0;z-index: 99999999 !important;">' +
        '<img src=' + src + ' style="margin-top: 100px;width: 70%;margin-bottom: 100px;"/>' +
        '<p style="font-size: 50px;position: fixed;top: 30px;right: 30px;color: white;cursor: pointer;" onclick="closePicture(this)">×</p>' +
        '</div>';
    $('body').append(imgHtml);
}

//关闭图片
function closePicture(obj) {
    $(obj).parent("div").remove();
}
