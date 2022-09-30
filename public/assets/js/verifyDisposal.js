
$(function () {

  //初始化参数
  initParams();

  //初始化页面核实或者处置标志
  initPage($('#statusType').val());

  //初始化工单
  initHistory();

  //检查工单阅读状态
  checkReadStatus();

  //点击确认按钮
  $('body').on('click', '#commitBtn', function () {

    submitStatusBtn()
  });
  /**
   * @param  
   * @desc 点击快速核实按钮
   * @return
   */
  $('body').on('click', '#quickBtn', function () {

    submitQuickSave()
  });


  initData();


  //先初始化jsjdk的变量
  // var openId = $('#statusType').val();
  //
  // if(openId != null && openId != "null"){
  //
  //   $("#pics").html('');
  //
  //   var strContent = '';
  //   strContent += '<button id="uplaodImageBtn" type="button" class="button button-block" style="cursor:pointer;">上传照片</button>';
  //
  //   $('#pics').html(strContent);
  //
  //   //提交
  //   initData();
  //
  //   // 上传图片
  //   $('body').on('click', '#uplaodImageBtn', function () {
  //     takePicture();
  //   });
  //
  // }else{
  //
  //   $('#uplaodVideo').attr('style','display:none;');
  //
  //   $('#pics').html('');
  //
  //   var strContent = '';
  //   strContent += '<input id="uplaodMobileImageBtn" name="file"  accept="image/*" type="file" onchange="takeMobilePicture()" \n' +
  //       'style=" width:95%;margin:auto auto;display:block;opacity: 0;height: 40px;position: absolute;margin-left: 0px; z-index: 1000;margin-top: 0px;"/>';
  //   strContent += '<button type="button" class="button button-block" style="cursor:pointer;">上传照片</button>';
  //
  //   $('#pics').html(strContent);
  //
  // }


  $('body').on('click', '#present', function () {
    rptSubmit()
  });

  // $('body').on('click','#testBtn',function(){
  //   showLoading(true)
  //   setTimeout(function(){
  //     showLoading(false)
  //   },4000)
  // })


});


function initParams() {

  var key = getQueryString("id");

  $.ajax({
    async: false,
    type: "GET",
    url: SERSVER_BASE_URL + "/wechatMobile/selectValueByKey",
    data: {
      "key": key,

    },
    dataType: "json",
    success: function (data) {

      if (data.urlValue != null) {
        //从url中取出键值
        var infoId = getUrlString(data.urlValue, "infoId");
        var contactorId = getUrlString(data.urlValue, "contactorId");
        var mobile = getUrlString(data.urlValue, "mobile");
        var openId = getUrlString(data.urlValue, "openId");
        var platformId = getUrlString(data.urlValue, "platformId");
        var flag = getUrlString(data.urlValue, "flagType");
        var statusType = getUrlString(data.urlValue, "statusType");


        $('#openId').val(openId);
        $('#infoId').val(infoId);
        $('#platformId').val(platformId);
        $('#flag').val(flag);
        $('#statusType').val(statusType);
        $('#contactorId').val(contactorId);
        $('#mobile').val(mobile);

      } else {
        $('#page-content').html('');
        var strContent = '<div>' +
          '<h3 style="margin-top: 60%;text-align: center;color: #3181d2;font-size: 36px">该工单已失效</h3>' +
          '<button type="button"' +
          'onclick="goback()" ' +
          'class="layui-btn layui-btn-normal" ' +
          'style="margin: 0 auto;margin-left: 35%;height: 34px; margin-top: 25px;background-color: #d2b77d;line-height: 33px;}">' +
          '点击返回</button>' +
          '</div>';
        $('#page-content').append(strContent);
        return;
      }

    },
    error: function () {
      alert("网络受限");
    }

  });


}

function goback() {
  //window.history.go(-1);
  window.location.href = SERSVER_BASE_HOME + "/rpt/unhandleList2.html"
}


//适应以下两种模式，来获取url参数值：
//User/vip_card_manager/useless/219/id/18
//User/vip_card_manager?useless=219&id=18
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

function getUrlString(url, name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
  var r = url.split('?')[1].substr(0).match(reg); //匹配目标参数
  if (r != null) return unescape(r[2]);
  return null; //返回参数值
}


//初始化转发人员
function initForwarHuman() {
  //用户openId
  //var openId = $('#openId').val();
  //用户id
  var contactorId = $('#contactorId').val();

  //获取通讯录人员
  $.ajax({
    async: true,
    type: "GET",
    url: SERSVER_BASE_URL + "/weChatHandleTask/getContactor",
    data: {
      "contactorId": contactorId,

    },
    dataType: "json",
    success: function (data) {
      var humanArray = [];
      for (var i = 0; i < data.list.length; i++) {
        var humanList = {
          'id': data.list[i].id,
          'value': data.list[i].name,
          'openId': data.list[i].openId
        };
        humanArray.push(humanList);
      }
      console.log("humanArray", humanArray);
      mobileSelectHuman.updateWheel(0, humanArray);
    },
    error: function (XMLHttpRequest, textStatus, errorThrown) {
      alert("err:::" + errorThrown);
    }

  });
}

var mobileSelectHuman = new MobileSelect({
  trigger: '#forwardBtn',
  title: '选择处置人员',
  ensureBtnText: '转发',
  wheels: [
    { data: [{ id: '1', value: '暂无人员', 'openId': "0" }] }
  ],
  connector: '-',
  position: [0, 1], //初始化定位
  transitionEnd: function (indexArr, data) {
    console.log("选择人员", data);
  },
  callback: function (indexArr, data) {
    console.log("确认转发?", data);
    //转发通知
    var performTaskContactorId = data[0].id;
    var humanName = data[0].value;

    if (performTaskContactorId != null) {
      forwardStatusBtn(performTaskContactorId, humanName);

    } else {
      $('#forwardBtn').text("转发失败");
      alert("转发失败，请稍后重试!!!");
    }
  }
});


//页面动态初始化
function initPage(statusType) {
  if (statusType == '1') {

    //标题
    $("title").html("任务核实");

    //tab标记
    $("#tabStatus").html("任务核实");

    //内容
    var textarea = '<textarea name="verifyTextData" id="verifyTextData" required lay-verify="required"\n' +
      'placeholder="请填写核实描述" class="layui-textarea"></textarea>';


    //事件标记
    var eventStatus = '<label style="width: 30%;">核实标记：</label>\n' +
      '              <select name="city" id="veracity" name="veracity">\n' +
      '                <option value="8">真实</option>\n' +
      '                <option value="9">虚假</option>\n' +
      '              </select>';

    $('#verifyText').append(textarea);
    $('#eventStatus').append(eventStatus);
    // $('#quickBtn').attr('style', 'display:block;');
  }

  if (statusType == '2') {

    $("title").html("工单处置");

    //tab标记
    $("#tabStatus").html("工单处置");

    var textarea = '<textarea name="verifyTextData" id="verifyTextData" required lay-verify="required"\n' +
      'placeholder="请填写处置描述" class="layui-textarea"></textarea>';

    //事件标记
    var eventStatus = '<label style="width: 30%;">处置标记：</label>\n' +
      '              <select name="city" id="veracity" name="veracity">\n' +
      '                <option value="11">已处置</option>\n' +
      '                <option value="10">超出范围</option>\n' +
      '              </select>';

    $('#verifyText').append(textarea);
    $('#eventStatus').append(eventStatus);

    //如果是工单处置则隐藏快速核实按钮
    $('#quickBtn').attr('style', 'display:none;');
  }

}

//检查是否已读
function checkReadStatus() {

  //事件标志
  var infoId = $('#infoId').val();
  var openId = $('#openId').val();
  var statusType = $('#statusType').val();
  var contactorId = $('#contactorId').val();

  //获取阅读和确认状态
  $.ajax({
    async: false,
    type: "POST",
    url: SERSVER_BASE_URL + "/weChatHandleTask/selectLastOneByInfoId",
    data: {
      'dataSourceId': infoId,
      'contactorId': contactorId,
      'personnelFlag': statusType === '1' ? '3' : '4',

    },
    dataType: "json",
    //processData : false,//是否序列化
    success: function (data) {
      console.log('/weChatHandleTask/selectLastOneByInfoId', data);

      //初始化历史id
      $('#historyId').val(data.data.id);

      //平台管理员 list是人员,而且类型是小区或者学校
      if (data.list.length > 0 && (data.platformTypeId === 5 || data.platformTypeId === 6)) {
        //调用人员数据
        initForwarHuman();
      } else {
        //关闭
        $('#forwardBtn').attr('style', 'display:none;');
      }

      if (data.data.processFlag === 1 && data.data.confirmFlag === 1) {
        console.log("未读未确认!!!");
        //获取阅读和确认状态
        var id = data.data.id;

        $.ajax({
          async: false,
          type: "POST",
          url: SERSVER_BASE_URL + "/weChatHandleTask/updateProcessFlag",
          dataType: "json",
          data: {
            historyId: id,
            eventInfoId: infoId,
            personnelFlag: statusType === '1' ? '3' : '4',
            contactorId: contactorId,

          },
          //processData : false,//是否序列化
          success: function (data) {
            console.log('/weChatHandleTask/updateProcessFlag', data);
          },
          error: function () {
            alert("网络受限");
          }

        });
      } else if (data.data.processFlag === 2 && data.data.confirmFlag === 1) {
        console.log("已读未确认!!!");
        //已读未确认
        $('#commitArea').attr('style', 'display:none;')

      } else if (data.data.processFlag === 2 && data.data.confirmFlag === 2) {
        //已读已确认
        console.log("已读已确认!!!");
        $('#commitArea').attr('style', 'display:block;');
        $('#commitBtn').attr('style', 'display:none;');
        $('#quickBtn').attr('style', 'display:none;');
        $('#forwardBtn').attr('style', 'display:none;');
      }
    },
    error: function () {
      alert("网络受限");
    }

  });
}

//点击确认按钮
function submitStatusBtn() {
  //关闭分享按钮
  $('#forwardBtn').attr('style', 'display:none;');

  //事件标志
  var infoId = $('#infoId').val();
  //var openId = $('#openId').val();
  var statusType = $('#statusType').val();
  var historyId = $('#historyId').val();
  var contactorId = $('#contactorId').val();

  //获取阅读和确认状态
  //var id = data.data.id;
  $.ajax({
    async: false,
    type: "POST",
    url: SERSVER_BASE_URL + "/weChatHandleTask/updateConfirmFag",
    dataType: "json",
    data: {
      historyId: historyId,
      eventInfoId: infoId,
      personnelFlag: statusType === '1' ? '3' : '4',
      contactorId: contactorId,

    },
    //processData : false,//是否序列化
    success: function (data) {
      console.log('/weChatHandleTask/updateConfirmFag', data);

      if (data.code === 0) {
        //已读未确认
        $('#commitArea').attr('style', 'display:block;');
        $('#commitBtn').attr('style', 'display:none;');
        $('#quickBtn').attr('style', 'display:none;');
      }

    },
    error: function (XMLHttpRequest, textStatus, errorThrown) {
      alert("err:::" + errorThrown);
    }

  });
}


// //快速核实点击确认按钮
// function quickSubmitStatusBtn() {
//   //关闭分享按钮
//   $('#forwardBtn').attr('style', 'display:none;');

//   //事件标志
//   var infoId = $('#infoId').val();
//   //var openId = $('#openId').val();
//   var statusType = $('#statusType').val();
//   var historyId = $('#historyId').val();
//   var contactorId = $('#contactorId').val();

//   //获取阅读和确认状态
//   //var id = data.data.id;
//   $.ajax({
//     async: false,
//     type: "POST",
//     url: SERSVER_BASE_URL + "/weChatHandleTask/updateConfirmFag",
//     dataType: "json",
//     data: {
//       historyId: historyId,
//       eventInfoId: infoId,
//       personnelFlag: statusType === '1' ? '3' : '4',
//       contactorId: contactorId,

//     },
//     //processData : false,//是否序列化
//     success: function (data) {
//       console.log('/weChatHandleTask/updateConfirmFag', data);

//       if (data.code === 0) {
//         //已读未确认
//         $('#commitArea').attr('style', 'display:block;');
//         $('#commitBtn').attr('style', 'display:none;');
//         $('#quickBtn').attr('style', 'display:none;');
//       }

//     },
//     error: function (XMLHttpRequest, textStatus, errorThrown) {
//       alert("err:::" + errorThrown);
//     }

//   });
// }

//点击转发按钮
function forwardStatusBtn(performTaskContactorId, humanName) {
  //事件标志
  var infoId = $('#infoId').val();
  var openId = $('#openId').val();
  var statusType = $('#statusType').val();
  var historyId = $('#historyId').val();
  var flagType = $('#flag').val();
  var contactorId = $('#contactorId').val();

  $.ajax({
    async: false,
    type: "POST",
    url: SERSVER_BASE_URL + "/weChatHandleTask/updateOrderForward",
    dataType: "json",
    data: {
      historyId: historyId,
      eventInfoId: infoId,
      flagType: flagType,
      personnelFlag: statusType === '1' ? '3' : '4',
      contactorId: contactorId,
      performTaskContactorId: performTaskContactorId,
      humanName: humanName,

    },
    //processData : false,//是否序列化
    success: function (data) {
      console.log('/weChatHandleTask/updateOrderForward', data);
      if (data.code == 0) {
        alert("转发成功");
        //window.location.replace("http://zc.chinaemt.com/rpt/home.html?openId="+openId)
        window.history.go(-1);
        //window.location.replace(SERSVER_BASE_HOME+"/rpt/home.html?contactorId="+contactorId)
      } else {
        $('#forwardBtn').text("转发成功");
        alert(data.msg);
      }
    },
    error: function (XMLHttpRequest, textStatus, errorThrown) {
      alert("err:::" + errorThrown);
    }

  });
}

//初始化历史记录，查询历史记录表表
function initHistory() {

  //事件标志
  var infoId = $('#infoId').val();
  var flag = $('#flag').val();
  var platformId = $('#platformId').val();
  var statusType = $('#statusType').val();

  var data = {
    "dataSourceId": infoId, //数据来源
    "flagType": flag, //数据来源标记，如果flag是1是事件，或者是5工单
  };

  $.ajax({
    async: true,
    type: "POST",
    url: SERSVER_BASE_URL + "/wechatMobile/selectHistoryByDataSourceId",
    data: {
      ...data,

    },
    dataType: "json",
    success: function (data) {
      console.log(data);

      var imgUrlList = [];
      var imgUrlHistoryList = [];
      if (data.info) {
        //拼接事件基本信息
        var eventTypeName = data.info.eventTypeName;
        var title = data.info.title;
        var content = data.info.eventDescription;
        var reportTime = data.info.gmtCreate;
        var townName = data.info.townName;
        var periodName = data.info.periodName;
        var platformName = data.info.platformName;
        var status = setEventStatus(data.info.status);
        var eventPosition = data.info.eventPosition;
        var longitude = data.info.longitude
        var latitude = data.info.latitude
        //取出最后一条，也就是刚上报信息
        var eventInfo = '';

        eventInfo += '<div class="layui-card" style="padding: 0px;margin-bottom: 22px;border: 1px solid #2196F3;color: #000000;">\n';
        eventInfo += '<div class="layui-card-header" style="text-align: center;height: 30px;line-height: 30px;">' + eventTypeName + '</div>\n';
        eventInfo += '<div class="layui-card-body">\n';

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

        if (status != null && status != "") {
          eventInfo += '状态：' + status + '<br>\n';
        }

        if (areaName != null && areaName != "") {
          eventInfo += '区域：' + areaName + '<br>\n';
        }

        if (reportTime != null && reportTime != "") {
          eventInfo += '时间：' + reportTime + '<br>\n';
        }
        if (title != null && title != "") {
          eventInfo += '记录：' + title + '<br>\n';
        }
        if (content != null && content != "") {
          eventInfo += '内容：' + content + '<br>\n';
        }
        let href = "https://api.map.baidu.com/marker?location=" + latitude + "," + longitude +
        "&title=" + eventPosition + "&content=" + eventPosition + "&coord_type=wgs84&output=html";
        let navigation = `<a href="${href}" target="_blank" style="color: #09c;position: absolute;right: 1%;">导航</a>`
        // if (eventPosition != null && eventPosition != "") {
        eventInfo += '位置：' + (eventPosition ? eventPosition += navigation : '') + '<br>\n';
        // }
        
        

        //判断图片
        if (data.info.imageUrl != null && data.info.imageUrl != "") {
          imgUrlList = [];
          if (data.info.imageUrl.indexOf(',') > -1) {
            let imageArr = data.info.imageUrl.split(",");
            //多个图片
            for (var j = 0; j < imageArr.length; j++) {
              var url = imageArr[j]
              var newUrl;

              if (url.indexOf("http") > -1) {
                //是外网推过来的链接
                newUrl = url;
              } else {
                newUrl = SERSVER_BASE_HOME + imageArr[j];
              }
              eventInfo += '<img id="imginfo" src=' + newUrl + ' style="width: 100px;height: 100px"/>';
              imgUrlList.push(newUrl)
            }
            setTimeout(() => {
              document.querySelectorAll("#imginfo").forEach((item, index) => {
                item.onclick = function () {
                  wx.previewImage({
                    current: imgUrlList[index], // 当前显示图片的http链接
                    urls: imgUrlList // 需要预览的图片http链接列表
                  });
                }
              })

            })

          } else {
            //单个图片
            var url = data.info.imageUrl;
            var newUrl;
            if (url.indexOf("http") > -1) {
              //是外网推过来的链接
              newUrl = url;
            } else {
              newUrl = SERSVER_BASE_HOME + data.info.imageUrl;
            }
            imgUrlList.push(newUrl)
            eventInfo += '<img  id="imginfo" src=' + newUrl + ' style="width: 100px;height: 100px"/>';

            setTimeout(() => {
              document.querySelectorAll("#imginfo").forEach((item, index) => {
                item.onclick = function () {
                  wx.previewImage({
                    current: imgUrlList[index], // 当前显示图片的http链接
                    urls: imgUrlList // 需要预览的图片http链接列表
                  });
                }
              })

            })
          }

        }

        // //判断图片
        // if (data.info.imageUrl != null && data.info.imageUrl != "") {
        //   if (data.info.imageUrl.indexOf(',') > -1) {
        //     let imageArr = data.info.imageUrl.split(",");
        //     //多个图片
        //     for (var j = 0; j < imageArr.length; j++) {
        //       var url = imageArr[j]
        //       var newUrl;

        //       if (url.indexOf("http") > -1) {
        //         //是外网推过来的链接
        //         newUrl = url;
        //       } else {
        //         newUrl = SERSVER_BASE_HOME + imageArr[j];
        //       }
        //       eventInfo += '<img id="imginfo" src=' + newUrl + ' style="width: 100px;height: 100px"/>';
        //       imgUrlList.push(newUrl)
        //     }
        //     setTimeout(() => {
        //       layui.use('upload', function () {
        //         document.querySelectorAll("#imginfo").forEach((item, index) => {
        //           item.onclick = function () {

        //             $('#imgDialog').append(`
        //                                  <img src="${imgUrlList[index]}"  style="width: 80vw;display: block;margin: auto auto;">
        //                              `)
        //             layer.open({
        //               type: 1,
        //               content: $('#imgDialog'), //这里content是一个DOM，注意：最好该元素要存放在body最外层，否则可能被其它的相对元素所影响
        //               cancel: function () {

        //                 $('#imgDialog').html('')
        //               }
        //             });
        //             scaleImage();
        //           }
        //         })
        //       })

        //     })

        //   } else {
        //     //单个图片
        //     var url = data.info.imageUrl;
        //     var newUrl;
        //     if (url.indexOf("http") > -1) {
        //       //是外网推过来的链接
        //       newUrl = url;
        //     } else {
        //       newUrl = SERSVER_BASE_HOME + data.info.imageUrl;
        //     }
        //     imgUrlList.push(newUrl)
        //     console.log('imgUrlList===>', imgUrlList, 'newUrl===>', newUrl);
        //     eventInfo += '<img  id="imginfo" src=' + newUrl + ' style="width: 100px;height: 100px"/>';

        //     setTimeout(() => {
        //       layui.use('upload', function () {
        //         document.querySelectorAll("#imginfo").forEach((item, index) => {
        //           item.onclick = function () {

        //             $('#imgDialog').append(`
        //      <img src="${imgUrlList[index]}"  style="width: 80vw;display: block;margin: auto auto;">
        //  `)
        //             layer.open({
        //               type: 1,
        //               content: $('#imgDialog'), //这里content是一个DOM，注意：最好该元素要存放在body最外层，否则可能被其它的相对元素所影响
        //               cancel: function () {

        //                 $('#imgDialog').html('')
        //               }
        //             });
        //             scaleImage();
        //           }
        //         })
        //       })

        //     })
        //   }

        // }

        // //判断图片
        // if (data.info.imageUrl != null && data.info.imageUrl != "") {
        //   if (data.info.imageUrl.indexOf(',') > -1) {
        //     let imageArr = data.info.imageUrl.split(",");
        //     //多个图片
        //     for (var j = 0; j < imageArr.length; j++) {
        //       var url = imageArr[j]
        //       var newUrl;

        //       if (url.indexOf("http") > -1) {
        //         //是外网推过来的链接
        //         newUrl = url;
        //       } else {
        //         newUrl = SERSVER_BASE_HOME + imageArr[j];
        //       }
        //       eventInfo += '<img onclick="imgDisplay(this)" src=' + newUrl + ' style="width: 80px;height: 80px;margin-left:10px"/>';
        //     }

        //   } else {
        //     //单个图片
        //     var url = data.info.imageUrl;
        //     var newUrl;
        //     if (url.indexOf("http") > -1) {
        //       //是外网推过来的链接
        //       newUrl = url;
        //     } else {
        //       newUrl = SERSVER_BASE_HOME + data.info.imageUrl;
        //     }
        //     eventInfo += '<img  onclick="imgDisplay(this)" src=' + newUrl + ' style="width: 80px;height: 80px;margin-left:10px"/>';
        //   }

        // }

        //判断图片
        if (data.info.audioUrl != null && data.info.audioUrl != "") {
          if (data.info.audioUrl.indexOf(',') > -1) {
            let audioUrlArr = data.info.audioUrl.split(",");
            for (var j = 0; j < audioUrlArr.length; j++) {
              var url = audioUrlArr[j];
              var newUrl;

              if (url.indexOf("http") > -1) {
                //是外网推过来的链接
                newUrl = url;
              } else {
                newUrl = SERSVER_BASE_HOME + audioUrlArr[j];
              }
              eventInfo += '<audio controls="controls"><source src="' + newUrl + '" type="audio/mpeg" /></audio>';
            }

          } else {
            //单个图片
            var url = data.info.audioUrl;
            var newUrl;
            if (url.indexOf("http") > -1) {
              //是外网推过来的链接
              newUrl = url;
            } else {
              newUrl = SERSVER_BASE_HOME + data.info.audioUrl;
            }
            eventInfo += '<audio controls="controls"><source src="' + newUrl + '" type="audio/mpeg" /></audio>';
          }

        }

        eventInfo += '</div>\n';
        eventInfo += '</div>';
        $("#eventInfo").append(eventInfo);
      }

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

          if (areaName != null && areaName != "" && eventStatus === 1) {
            strcontent += '<br>区域：' + areaName + '\n';
          }

          strcontent += '</p>\n';


          //判断图片
          if (data.list[i].imageUrl != null && data.list[i].imageUrl != "") {
            imgUrlHistoryList = [];
            //单个图片
            var url = data.list[i].imageUrl;
            var newUrl;
            if (url.indexOf("http") > -1) {
              //是外网推过来的链接
              newUrl = url;
            } else {
              newUrl = SERSVER_BASE_HOME + data.list[i].imageUrl;
            }
            imgUrlHistoryList.push(newUrl)
            strcontent += '<img  id="imginfoHistory" src=' + newUrl + ' style="width: 100px;height: 100px"/>';
            setTimeout(() => {
              document.querySelectorAll("#imginfoHistory").forEach((item, index) => {
                item.onclick = function () {
                  wx.previewImage({
                    current: imgUrlHistoryList[index], // 当前显示图片的http链接
                    urls: imgUrlHistoryList // 需要预览的图片http链接列表
                  });
                }
              })

            })
          }
          if (data.list[i].imageArr != null) {
            imgUrlHistoryList = [];
            //多个图片
            for (var j = 0; j < data.list[i].imageArr.length; j++) {

              var url = data.list[i].imageArr[j];
              var newUrl;
              if (url.indexOf("http") > -1) {
                //是外网推过来的链接
                newUrl = url;
              } else {
                newUrl = SERSVER_BASE_HOME + data.list[i].imageArr[j];
              }
              strcontent += '<img id="imginfoHistory" src=' + newUrl + ' style="width: 100px;height: 100px"/>';
              imgUrlHistoryList.push(newUrl)
            }
            setTimeout(() => {
              document.querySelectorAll("#imginfoHistory").forEach((item, index) => {
                item.onclick = function () {
                  wx.previewImage({
                    current: imgUrlHistoryList[index], // 当前显示图片的http链接
                    urls: imgUrlHistoryList // 需要预览的图片http链接列表
                  });
                }
              })

            })
          }


          //     //判断图片
          //     if (data.list[i].imageUrl != null && data.list[i].imageUrl != "") {
          //       //单个图片
          //       var url = data.list[i].imageUrl;
          //       var newUrl;
          //       if (url.indexOf("http") > -1) {
          //         //是外网推过来的链接
          //         newUrl = url;
          //       } else {
          //         newUrl = SERSVER_BASE_HOME + data.list[i].imageUrl;
          //       }
          //       imgUrlList.push(newUrl)
          //       strcontent += '<img  id="imginfo" src=' + newUrl + ' style="width: 100px;height: 100px"/>';
          //       setTimeout(() => {
          //         layui.use('upload', function () {
          //           document.querySelectorAll("#imginfo").forEach((item, index) => {
          //             item.onclick = function () {

          //               $('#imgDialog').append(`
          //      <img src="${imgUrlList[index]}"  style="width: 80vw;display: block;margin: auto auto;">
          //  `)
          //               layer.open({
          //                 type: 1,
          //                 content: $('#imgDialog'), //这里content是一个DOM，注意：最好该元素要存放在body最外层，否则可能被其它的相对元素所影响
          //                 cancel: function () {

          //                   $('#imgDialog').html('')
          //                 }
          //               });
          //               scaleImage();
          //             }
          //           })
          //         })

          //       })
          //     }
          //     if (data.list[i].imageArr != null) {
          //       //多个图片
          //       for (var j = 0; j < data.list[i].imageArr.length; j++) {

          //         var url = data.list[i].imageArr[j];
          //         var newUrl;
          //         if (url.indexOf("http") > -1) {
          //           //是外网推过来的链接
          //           newUrl = url;
          //         } else {
          //           newUrl = SERSVER_BASE_HOME + data.list[i].imageArr[j];
          //         }
          //         strcontent += '<img id="imginfo" src=' + newUrl + ' style="width: 100px;height: 100px"/>';
          //         imgUrlList.push(newUrl)
          //       }
          //       setTimeout(() => {
          //         layui.use('upload', function () {
          //           document.querySelectorAll("#imginfo").forEach((item, index) => {
          //             item.onclick = function () {

          //               $('#imgDialog').append(`
          //          <img src="${imgUrlList[index]}"  style="width: 80vw;display: block;margin: auto auto;">
          //      `)
          //               layer.open({
          //                 type: 1,
          //                 content: $('#imgDialog'), //这里content是一个DOM，注意：最好该元素要存放在body最外层，否则可能被其它的相对元素所影响
          //                 cancel: function () {

          //                   $('#imgDialog').html('')
          //                 }
          //               });
          //               scaleImage();
          //             }
          //           })
          //         })

          //       })
          //     }


          // //判断图片
          // if (data.list[i].imageUrl != null && data.list[i].imageUrl != "") {
          //   //单个图片
          //   var url = data.list[i].imageUrl;
          //   var newUrl;
          //   if (url.indexOf("http") > -1) {
          //     //是外网推过来的链接
          //     newUrl = url;
          //   } else {
          //     newUrl = SERSVER_BASE_HOME + data.list[i].imageUrl;
          //   }
          //   strcontent += '<img onclick="imgDisplay(this)" src=' + newUrl + ' style="width: 100px;height: 100px;margin-left:10px"/>';
          // }
          // if (data.list[i].imageArr != null) {
          //   //多个图片
          //   for (var j = 0; j < data.list[i].imageArr.length; j++) {

          //     var url = data.list[i].imageArr[j];
          //     var newUrl;
          //     if (url.indexOf("http") > -1) {
          //       //是外网推过来的链接
          //       newUrl = url;
          //     } else {
          //       newUrl = SERSVER_BASE_HOME + data.list[i].imageArr[j];
          //     }
          //     strcontent += '<img onclick="imgDisplay(this)" src=' + newUrl + ' style="width: 100px;height: 100px;margin-left:10px"/>';
          //   }
          // }



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
      //拼接工单时间轴
      $("#historyRecord").append(historyRecord)


    },
    error: function (XMLHttpRequest, textStatus, errorThrown) {
      alert("err:::" + errorThrown);
    }

  });
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


// 获取微信权限
function initData() {
  //传回到前端
  var url = encodeURIComponent(location.href.split('#')[0]);

  $.ajax({
    async: false,
    type: "get",
    url: SERSVER_BASE_URL + "/wechatReport/jsJdkIndex",
    data: {
      url: url,

    },
    dataType: "json",
    success: function (data) {
      $('#ticket').val(data.ticket);
      $('#appId').val(data.appId);
      $('#timestamp').val(data.timestamp);
      $('#nonceStr').val(data.nonceStr);
      $('#signature').val(data.signature);

      wx.config({
        debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId: data.appId, // 必填，公众号的唯一标识
        timestamp: data.timestamp, // 必填，生成签名的时间戳
        nonceStr: data.nonceStr, // 必填，生成签名的随机串
        signature: data.signature, // 必填，签名，见附录1
        jsApiList: [
          'translateVoice',
          'startRecord',
          'stopRecord',
          'onRecordEnd',
          'playVoice',
          'pauseVoice',
          'stopVoice',
          'uploadVoice',
          'downloadVoice',
          'chooseImage',
          'previewImage',
          'uploadImage',
          'downloadImage'
        ]
      });

    },
    error: function (XMLHttpRequest, textStatus, errorThrown) {
      alert("err:::" + errorThrown);
    }

  });
}


//写cookies
//这是有设定过期时间的使用示例：
//s20是代表20秒
//h是指小时，如12小时则是：h12
//d是天数，30天则：d30
function setCookie(name, value, time) {
  var strsec = getsec(time);
  var exp = new Date();
  exp.setTime(exp.getTime() + strsec * 1);
  document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
}

//读取cookies
function getCookie(name) {
  var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
  if (arr = document.cookie.match(reg)) return unescape(arr[2]);
  else return null;
}

//删除cookies
function delCookie(name) {
  var exp = new Date();
  exp.setTime(exp.getTime() - 1);
  var cval = getCookie(name);
  if (cval != null) document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
}

function getsec(str) {
  var str1 = str.substring(1, str.length) * 1;
  var str2 = str.substring(0, 1);
  if (str2 == "s") {
    return str1 * 1000;
  } else if (str2 == "h") {
    return str1 * 60 * 60 * 1000;
  } else if (str2 == "d") {
    return str1 * 24 * 60 * 60 * 1000;
  }
}


//点击上传图片按钮
function takeMobilePicture() {
  var file = $("#uplaodMobileImageBtn")[0].files[0];
  compressFile(file, upFileImg)
}

//压缩图片
function compressFile(file, callback) {
  let fileObj = file;
  let reader = new FileReader()
  reader.readAsDataURL(fileObj) //转base64
  reader.onload = function (e) {
    let image = new Image() //新建一个img标签（还没嵌入DOM节点)
    image.src = e.target.result
    image.onload = function () {
      let canvas = document.createElement('canvas'), // 新建canvas
        context = canvas.getContext('2d'),
        imageWidth = image.width / 2,    //压缩后图片的大小
        imageHeight = image.height / 2,
        data = ''
      canvas.width = imageWidth
      canvas.height = imageHeight
      context.drawImage(image, 0, 0, imageWidth, imageHeight)
      data = canvas.toDataURL('image/png') // 输出压缩后的base64
      let arr = data.split(','), mime = arr[0].match(/:(.*?);/)[1], // 转成blob
        bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      let files = new window.File([new Blob([u8arr], { type: mime })], 'test.png', { type: 'image/png' }) // 转成file
      callback(files) // 回调

    }
  }
}

//手机端上传图片
function upFileImg(files) {
  // 开启加载提示
  showLoading(true);
  var formData = new FormData();
  formData.append("file", files); //file是blob数据

  $.ajax({
    async: true, // 此处开启了异步请求，应尽量避免在ajax请求后面执行其它操作
    type: "POST",
    url: SERSVER_BASE_URL + "/upload/uploadMobileFile",
    data: formData,
    cache: false,
    processData: false,
    contentType: false,
    success: function (res) {
      //返回后台的图像数组名称
      //原来的
      var value = $('#imgs').val();
      //多张再拼接
      if (value == null || value == "") {
        //第一次
        value = res.fileName;
      } else {
        value = res.fileName + "," + value;
      }

      $('#imgs').val(value);

      var filePath = SERSVER_BASE_HOME + res.fileName;

      var divContent = $('#pics').html();
      //var mediaName ="es"+ (res.fileName).substr(0,res.fileName.lastIndexOf("."));
      var mediaName = res.fileName.substring(res.fileName.lastIndexOf("/") + 1, res.fileName.lastIndexOf("."));

      divContent = "<div id='" + mediaName + "' class='imgContainer'>" +
        "<img title='" + mediaName + "' alt='" + mediaName + "' style='height: 100px;width: 100px;' src='" + filePath + "' onclick=\"imgDisplay(this)\" />" +
        "<p onclick=\"removeImg('" + this + "','" + mediaName + "')\" class=\"imgDelete\" style='display: block'>删除</p>" +
        "</div>" + divContent;

      $('#pics').html(divContent);
      // 关闭加载提示
      showLoading(false);

    },
    error: function (XMLHttpRequest, textStatus, errorThrown) {
      // 关闭加载提示
      showLoading(false);
      alert("err:::" + errorThrown);
    }
  });



}


// 微信上传图片
function takePicture() {
  wx.chooseImage({
    count: 3, // 默认9
    sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
    sourceType: ['camera', 'album'], // 可以指定来源是相册还是相机，默认二者都有
    success: function (res) {
      var localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
      //var mediaId = res.serverId; // 返回图片的服务器端ID，即mediaId
      wx.uploadImage({
        localId: localIds.toString(), // 需要上传的图片的本地ID，由chooseImage接口获得
        isShowProgressTips: 1, // 默认为1，显示进度提示
        success: function (res) {
          var mediaId = res.serverId; // 返回图片的服务器端ID，即mediaId
          //定义图像名称，可能上传多个,
          $.ajax({
            async: false,
            type: "POST",
            url: SERSVER_BASE_URL + "/wechatReport/uploadImg",
            data: {
              serverId: mediaId,

            },
            dataType: "json",
            success: function (res) {
              //返回后台的图像数组名称
              //原来的
              var value = $('#imgs').val();
              //多张再拼接
              if (value == null || value == "") {
                //第一次
                value = res.fileName;
              } else {
                value = res.fileName + "," + value;
              }

              $('#imgs').val(value);

              var filePath = SERSVER_BASE_URL + "/wx/images/" + res.fileName;

              var divContent = $('#pics').html();
              var mediaName = "verify" + (res.fileName).substr(0, res.fileName.lastIndexOf("."));

              divContent = "<div id='" + mediaName + "' class='imgContainer'>" +
                "<img title='" + mediaName + "' alt='" + mediaName + "' style='height: 100px;width: 100px;' src='" + filePath + "' onclick=\"imgDisplay(this)\" />" +
                "<p onclick=\"removeImg('" + this + "','" + mediaName + "')\" class=\"imgDelete\" style='display: block'>删除</p>" +
                "</div>" + divContent;

              $('#pics').html(divContent);

            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
              alert("err:::" + errorThrown);
            }

          });

        },
        fail: function (res) {
          alert('上传图片失败，请重试');
        }
      });
    }
  });
}

var voice = { localId: '', serverId: '' }; //全局变量
// 录音开始时间、结束时间
var beginTimeDate, endTimeDate;

// 4 音频接口
// 4.2 开始录音
//手指触摸屏幕时触发事件
$('#startRecord').on('touchstart', function () {
  $('#startRecord').css({ 'background': 'wheat' });
  $('#startRecord').text("正在录音...");
  $('#recording-img').css('display', 'block');
  beginTimeDate = new Date().getTime();
  wx.startRecord({
    cancel: function () {
      alert('用户拒绝授权录音');
    }
  });
});

//手指离开屏幕时触发
$('#startRecord').on('touchend', function () {
  endTimeDate = new Date().getTime();
  const differTime = endTimeDate - beginTimeDate;
  if(differTime < 1000){
    alert('录音时间太短，请重新录制');
    $('#startRecord').css({ 'background': '#fff' });
    $('#startRecord').text("长按录音");
    $('#recording-img').css('display', 'none');
  }else{
    $('#startRecord').css({ 'background': '#fff' });
    $('#startRecord').text("继续录音");
    $('#recording-img').css('display', 'none');
  
    setTimeout(function () {
      //停止录音
      wx.stopRecord({
        success: function (res) {
          voice.localId = res.localId;
          //上传录音
          uploadVoice();
        },
        fail: function (res) {
          $('#startRecord').text("继续录音");
          alert("录音结束，时长超过1分钟!");
        }
      });
  
    }, 800);

  }

});

// 4.3 停止录音
document.querySelector('#stopRecord').onclick = function () {
  wx.stopRecord({
    success: function (res) {
      voice.localId = res.localId;
      //上传录音
      uploadVoice();
    },
    fail: function (res) {
      $('#startRecord').text("继续录音");
      alert("录音结束，时长超过1分钟!");
    }
  });
};


// 4.4 监听录音自动停止
wx.onVoiceRecordEnd({
  complete: function (res) {
    voice.localId = res.localId;
    //上传录音
    uploadVoice();
    $('#startRecord').text("继续录音");
    alert("录音结束，时长超过1分钟!");
  }
});

// 4.5 播放音频
// document.querySelector('#playVoice').onclick = function () {
//
//   if (voice.localId == '') {
//     alert('请先使用 startRecord 接口录制一段声音');
//     return;
//   }
//   wx.playVoice({
//     localId: voice.localId
//   });
// };

//删除语音
function removeAudio(obj, index) {

  $.mbox({
    area: ["280", "160"], //弹框大小
    border: [0, .5, "#666"],
    dialog: {
      msg: "您确定要删除该语音吗？",
      btns: 2,   //1: 只有一个按钮   2：两个按钮  3：没有按钮 提示框
      type: 2,   //1:对钩   2：问号  3：叹号
      btn: ["取消", "确认"],  //自定义按钮
      yes: function () {
        //点击左侧按钮：成功
        return false;
      },
      no: function () {
        removeAudioOperation(index);
      }
    }
  });

}

function removeAudioOperation(index) {
  $("#" + index).remove();
  //取出选中删除的语音
  var audioSelectedValue = index;
  //取出语音集合
  var audiosValue = $('#audios').val();

  var newAudiosValue = '';
  //说明是有张语音
  if (audiosValue.indexOf(",") > -1) {
    //分隔成数组
    var audioArray = audiosValue.split(",");

    //检索
    for (var i = 0; i < audioArray.length; i++) {
      //检索
      var index = audioArray[i].indexOf(audioSelectedValue);
      if (index > -1) {

        //移除，形成新的数组
        audioArray.splice(i, 1);
      }
    }

    //重新构成新字符串
    newAudiosValue = audioArray.join();

  } else {
    newAudiosValue = newAudiosValue.replace(audioSelectedValue, '');
  }

  $('#audios').val(newAudiosValue);
}


// 4.6 暂停播放音频
document.querySelector('#pauseVoice').onclick = function () {
  wx.pauseVoice({
    localId: voice.localId
  });
};

// 4.7 停止播放音频
document.querySelector('#stopVoice').onclick = function () {
  wx.stopVoice({
    localId: voice.localId
  });
};

// 4.8 监听录音播放停止
wx.onVoicePlayEnd({
  complete: function (res) {
    alert('录音（' + res.localId + '）播放结束');
  }
});

// 4.8 上传语音
document.querySelector('#uploadVoice').onclick = function () {
  if (voice.localId == '') {
    alert('请先使用 startRecord 接口录制一段声音');
    return;
  }
  wx.uploadVoice({
    localId: voice.localId,
    success: function (res) {
      alert('上传语音成功，serverId 为' + res.serverId);
      voice.serverId = res.serverId;
    }
  });
};

// 4.9 下载语音
document.querySelector('#downloadVoice').onclick = function () {
  if (voice.serverId == '') {
    alert('请先使用 uploadVoice 上传声音');
    return;
  }
  wx.downloadVoice({
    serverId: voice.serverId,
    success: function (res) {
      alert('下载语音成功，localId 为' + res.localId);
      voice.localId = res.localId;
    }
  });
};

//上传录音
function uploadVoice() {
  wx.uploadVoice({
    localId: voice.localId,
    success: function (res) {
      voice.serverId = res.serverId;
      //上传到服务器
      var voiceUrl = SERSVER_BASE_URL + "/wechatReport/uploadVoice";
      $.ajax({
        async: false,
        url: voiceUrl,
        type: 'POST',
        dataType: 'json',
        data: {
          mediaId: voice.serverId,

        },

        success: function (data) {

          voice.serverId = res.serverId;
          //原来的
          var value = $('#audios').val();

          //多张再拼接
          if (value == null || value == "") {
            //第一次
            value = data.fileName;
          } else {
            value = data.fileName + "," + value;
          }

          //赋值
          $('#audios').val(value);

          //路径
          var filePath = SERSVER_BASE_HOME + data.fileName;

          //var mediaName =(data.fileName).substr(0,data.fileName.lastIndexOf("."));
          var mediaName = data.fileName.substring(data.fileName.lastIndexOf("/") + 1, data.fileName.lastIndexOf("."));

          //展开
          $('#manager-audio').css('display', 'block');

          let audioContent = $('#manager-audio').html();

          audioContent = "<div id='" + mediaName + "' style='width: 94%;height: 36px;margin-left: 10px;margin-top:5px; margin-bottom: 10px;'>\n" +
            "                            <div style='display: inline'>\n" +
            "                                <audio controls='controls' style='height: 40px;width: 76%;margin-left: 10px;'>\n" +
            "                                    <source src='" + filePath + "' type='audio/mpeg' />\n" +
            "                                </audio>\n" +
            "                            </div>\n" +
            "                            <div class='deleteicon' style='display: inline' onclick=\"removeAudio('" + this + "','" + mediaName + "')\"></div>\n" +
            "                        </div>" + audioContent;


          $('#manager-audio').html(audioContent);
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
          alert("err:" + errorThrown);
        }
      });

    }
  });
}

//提交表彰
function rptSubmit() {
  $.mbox({
    area: ["280", "160"], //弹框大小
    border: [0, .5, "#666"],
    dialog: {
      msg: "您确定要提交吗？",
      btns: 2, //1: 只有一个按钮   2：两个按钮  3：没有按钮 提示框
      type: 2, //1:对钩   2：问号  3：叹号
      btn: ["取消", "确认"], //自定义按钮
      yes: function () { //点击左侧按钮：成功
        return false;
      },
      no: debounce(function () { //点击右侧按钮：失败
        //显示加载效果
        showLoading(true);
        //获取用户信息
        getUserInfo();
        //判重
        judgeEventStatus();
        //saveDanger();
      }, 8000)
    }
  });
}

//用户信息
function getUserInfo() {
  //微信公众号唯一识别用户
  var openId = $('#openId').val();
  var platformId = $('#platformId').val();
  var contactorId = $('#contactorId').val();

  var userData = {
    "contactorId": contactorId
  };

  $.ajax({
    async: false,
    type: "POST",
    url: SERSVER_BASE_URL + "/weChatHandleTask/selectContactor",
    data: {
      ...userData,

    },
    dataType: "json",
    success: function (data) {
      console.log(data);
      if (data.data != null && data.data != "") {
        //说明不是普通分组
        var mailGroupName = "";
        //一定有分组，或多个分组
        var mailGroups = data.data.mailGroups;

        if (mailGroups != null && mailGroups.length > 0) {
          for (var i = 0; i < mailGroups.length; i++) {
            //拼接分组 中大，测试，
            var mgname = mailGroups[i].name + ",";
            mailGroupName = mgname + mailGroupName;
          }
          //去除最后一个逗号
          mailGroupName = (mailGroupName.substring(mailGroupName.length - 1) == ',') ? mailGroupName.substring(0, mailGroupName.length - 1) : mailGroupName;
          $('#mailGroupName').val(mailGroupName);

        } else {
          $('#mailGroupName').val();
        }


        $('#mailContactorName').val(data.data.name);
        $('#mailContactorMobile').val(data.data.mobile1);


      } else {
        //普通分组
        $('#mailContactorName').val("群众");
        $('#mailContactorMobile').val("暂无");
        $('#mailGroupName').val("普通群众");
      }

      console.log($('#mailGroupName').val())

    },
    error: function (XMLHttpRequest, textStatus, errorThrown) {
      alert("err:::" + errorThrown);
    }

  });
}



//判重
function judgeEventStatus() {

  var infoId = $('#infoId').val();
  var flag = $('#flag').val();
  var platformId = $('#platformId').val();
  //var openId = $('#openId').val();
  var contactorId = $('#contactorId').val();
  // 事件真实性
  var veracity = $('#veracity').val();


  var judgData = {
    "infoId": infoId, //工单id
    "flagType": flag, //工单标志
    "contactorId": contactorId,
    "platformId": platformId, // 平台id
    "webSubmitFlag": veracity  //提交的标志
  };

  $.ajax({
    async: false,
    type: "POST",
    url: SERSVER_BASE_URL + "/weChatHandleTask/judgeEventStatus",
    data: {
      ...judgData,

    },
    dataType: "json",
    success: function (data) {
      console.log(data);
      if (data.msg == "success" && data.code == 0) {
        //经过判重，才能提交
        updateOperationConfirmFag();
        setTimeout(() => {
          saveDanger();
        }, 1000)

      } else {
        alert(data.msg);
        showLoading(false);
      }
    },
    error: function (XMLHttpRequest, textStatus, errorThrown) {
      alert("err:::" + errorThrown);
      showLoading(false);

    }

  });
}

//改变操作表为状态已经处置
function updateOperationConfirmFag() {
  //微信公众号唯一识别用户
  var infoId = $('#infoId').val();
  //var openId = $('#openId').val();
  var statusType = $('#statusType').val();
  var contactorId = $('#contactorId').val();


  var data = {
    "eventInfoId": infoId, //工单id
    "personnelFlag": statusType === '1' ? '3' : '4',
    "contactorId": contactorId
  };
  $.ajax({
    async: false,
    type: "POST",
    url: SERSVER_BASE_URL + "/weChatHandleTask/updateOperationConfirmFag",
    data: {
      ...data,

    },
    dataType: "json",
    success: function (data) {
      console.log("操作表状态已经更改为已处置");
    },
    error: function (XMLHttpRequest, textStatus, errorThrown) {
      alert("err:::" + errorThrown);
      showLoading(false);
    }

  });
}


/**
 * @param
 * @desc 提交快速核实
 * @return return
 */
function submitQuickSave() {
  $.mbox({
    area: ["280", "160"], //弹框大小
    border: [0, .5, "#666"],
    dialog: {
      msg: "您确定要提交吗？",
      btns: 2, //1: 只有一个按钮   2：两个按钮  3：没有按钮 提示框
      type: 2, //1:对钩   2：问号  3：叹号
      btn: ["取消", "确认"], //自定义按钮
      yes: function () { //点击左侧按钮：成功
        return false;
      },
      no: debounce(function () { //点击右侧按钮：失败
        //显示加载效果
        showLoading(true);
        submitStatusBtn();
        //获取用户信息
        getUserInfo();
        //判重
        judgeQuickSave();
        //saveDanger();
      }, 8000)
    }
  });
}
/**
 * @param
 * @desc 快速核实判重
 * @return return
 */
function judgeQuickSave() {
  var infoId = $('#infoId').val();
  var flag = $('#flag').val();
  var platformId = $('#platformId').val();
  //var openId = $('#openId').val();
  var contactorId = $('#contactorId').val();
  // 事件真实性
  var veracity = $('#veracity').val();


  var judgData = {
    "infoId": infoId, //工单id
    "flagType": flag, //工单标志
    "contactorId": contactorId,
    "platformId": platformId, // 平台id
    "webSubmitFlag": veracity  //提交的标志
  };

  $.ajax({
    async: false,
    type: "POST",
    url: SERSVER_BASE_URL + "/weChatHandleTask/judgeEventStatus",
    data: {
      ...judgData,

    },
    dataType: "json",
    success: function (data) {
      console.log(data);
      if (data.msg == "success" && data.code == 0) {
        //经过判重，才能提交
        updateOperationConfirmFag();
        setTimeout(() => {
          saveQuick();
        }, 1000)

      } else {
        alert(data.msg);
        showLoading(false);
      }
    },
    error: function (XMLHttpRequest, textStatus, errorThrown) {
      alert("err:::" + errorThrown);
      showLoading(false);
    }

  });
}
/**
 * @param
 * @desc 确认快速核实
 * @return return
 */
function saveQuick() {

  //微信公众号唯一识别用户
  var contactorId = $('#contactorId').val();
  var openId = $('#openId').val();
  var infoId = $('#infoId').val();
  var platformId = $('#platformId').val();
  var flag = $('#flag').val();


  //微信公众号用户信息，存在于通讯录中的单位分组人
  var mailGroupName = $('#mailGroupName').val();
  var mailContactorName = $('#mailContactorName').val();
  var mailContactorMobile = $('#mailContactorMobile').val();

  // 核实内容
  var verifyTextData = $('#verifyTextData').val();

  // 事件真实性
  var veracity = $('#veracity').val();

  //图片
  var imgs = $('#imgs').val();
  //音频
  var audios = $('#audios').val();

  // if (!$('#imgs').val()) {
  //   $('#btn').attr('disabled', false);
  //   alert('请上传图片');
  //   return
  // }

  var title;
  var status;

  if (veracity == '8') {
    //真实事件
    title = mailContactorName + "核实该事件为真实";
    status = "3"
  } else if (veracity == '9') {
    //虚假事件
    title = mailContactorName + "核实该事件为虚假";
    status = "3"
  } else if (veracity == '11') {
    //处置完成
    title = mailContactorName + "处置完成该事件";
    status = "5"
  } else if (veracity == '10') {
    //超出范围
    title = mailContactorName + "确认该事件不在管辖范围";
    status = "6"
  }

  var reportData = {
    "title": title,  //核实上报标志
    "platformId": platformId, // 平台id
    "dataSourceId": infoId, //数据来源id
    "flagType": flag, //标志
    "surveyFlag": 0,  //调查问卷
    "mailContactorId": contactorId,
    "mailContactorName": mailContactorName, //核实处置人名称
    "mailContactorMobile": mailContactorMobile, //核实处置人电话
    "content": "快速核实", // 事件描述
    "imageUrl": imgs,  // 图片
    "audioUrl": audios,  // 语音
    "videoUrl": "",  // 视频
    "eventStatusAfter": status, //状态
    "webSubmitFlag": veracity  //前端提交的标志
  };


  $.ajax({
    async: false,
    type: "POST",
    contentType: 'application/json;charset=utf-8',
    url: SERSVER_BASE_URL + "/weChatHandleTask/verifyOrDisposal",
    data: JSON.stringify({
      ...reportData,

    }),
    dataType: "json",
    //processData : false,//是否序列化
    success: function (data) {
      console.log(data);
      if (data.code == 0) {
        showLoading(false);
        // successTips('提交成功')
        alert('提交成功')
        //提交成功，更改状态为确认
        $('#present').attr('disabled', false);
        //window.location.href = './index.html'
        window.history.go(-1);
        // goback();
      }

    },
    error: function (XMLHttpRequest, textStatus, errorThrown) {
      $('#present').attr('disabled', false);
      showLoading(false);
      alert("提交失败，请稍后重试！");
    }

  });
}



//确认提交
function saveDanger() {

  //微信公众号唯一识别用户
  var contactorId = $('#contactorId').val();
  var openId = $('#openId').val();
  var infoId = $('#infoId').val();
  var platformId = $('#platformId').val();
  var flag = $('#flag').val();


  //微信公众号用户信息，存在于通讯录中的单位分组人
  var mailGroupName = $('#mailGroupName').val();
  var mailContactorName = $('#mailContactorName').val();
  var mailContactorMobile = $('#mailContactorMobile').val();

  // 核实内容
  var verifyTextData = $('#verifyTextData').val();

  // 事件真实性
  var veracity = $('#veracity').val();

  //图片
  var imgs = $('#imgs').val();
  //音频
  var audios = $('#audios').val();

  // if (!$('#imgs').val()) {
  //   $('#btn').attr('disabled', false);
  //   alert('请上传图片');
  //   return
  // }

  var title;
  var status;

  if (veracity == '8') {
    //真实事件
    title = mailContactorName + "核实该事件为真实";
    status = "3"
  } else if (veracity == '9') {
    //虚假事件
    title = mailContactorName + "核实该事件为虚假";
    status = "3"
  } else if (veracity == '11') {
    //处置完成
    title = mailContactorName + "处置完成该事件";
    status = "5"
  } else if (veracity == '10') {
    //超出范围
    title = mailContactorName + "确认该事件不在管辖范围";
    status = "6"
  }

  var reportData = {
    "title": title,  //核实上报标志
    "platformId": platformId, // 平台id
    "dataSourceId": infoId, //数据来源id
    "flagType": flag, //标志
    "surveyFlag": 0,  //调查问卷
    "mailContactorId": contactorId,
    "mailContactorName": mailContactorName, //核实处置人名称
    "mailContactorMobile": mailContactorMobile, //核实处置人电话
    "content": verifyTextData, // 事件描述
    "imageUrl": imgs,  // 图片
    "audioUrl": audios,  // 语音
    "videoUrl": "",  // 视频
    "eventStatusAfter": status, //状态
    "webSubmitFlag": veracity  //前端提交的标志
  };


  $.ajax({
    async: false,
    type: "POST",
    contentType: 'application/json;charset=utf-8',
    url: SERSVER_BASE_URL + "/weChatHandleTask/verifyOrDisposal",
    data: JSON.stringify({
      ...reportData,

    }),
    dataType: "json",
    //processData : false,//是否序列化
    success: function (data) {
      console.log(data);
      if (data.code == 0) {
        showLoading(false);
        // successTips('提交成功')
        alert('提交成功')
        //提交成功，更改状态为确认
        $('#present').attr('disabled', false);
        //window.location.href = './index.html'
        // goback();
        window.history.go(-1)
      }

    },
    error: function (XMLHttpRequest, textStatus, errorThrown) {
      $('#present').attr('disabled', false);
      showLoading(false);
      alert("提交失败，请稍后重试！");
    }

  });
}

//删除
function removeImg(obj, index) {

  $.mbox({
    area: ["280", "160"], //弹框大小
    border: [0, .5, "#666"],
    dialog: {
      msg: "您确定要删除该图片吗？",
      btns: 2,   //1: 只有一个按钮   2：两个按钮  3：没有按钮 提示框
      type: 2,   //1:对钩   2：问号  3：叹号
      btn: ["取消", "确认"],  //自定义按钮
      yes: function () {
        //点击左侧按钮：成功
        return false;
      },
      no: function () {
        //点击右侧按钮：失败
        removeImgOperation(index);
      }
    }
  });

}


function removeImgOperation(index) {
  $("#" + index).remove();

  //取出选中删除的图片
  var imgSelectedValue = index + ".png";
  //取出图片集合
  var imgsValue = $('#imgs').val();

  var newImgsValue = '';
  //说明是有张图片
  if (imgsValue.indexOf(",") > -1) {
    //分隔成数组
    var imgArray = imgsValue.split(",");

    //检索
    for (var i = 0; i < imgArray.length; i++) {
      //检索
      var index = imgArray[i].indexOf(imgSelectedValue);
      if (index > -1) {

        //移除，形成新的数组
        imgArray.splice(i, 1);
      }
    }

    //重新构成新字符串
    newImgsValue = imgArray.join();

  } else {

    newImgsValue = imgsValue.replace(imgSelectedValue, '');
  }

  $('#imgs').val(newImgsValue);
}


//图片灯箱
function imgDisplay(obj) {

  var src = $(obj).attr("src");

  var imgHtml = '<div style="width: 100%;height: 100vh;overflow: auto;background: rgba(0,0,0,0.5);text-align: center;position: fixed;top: 0;left: 0;z-index: 1000;">' +
    '<img id="imgScale" src=' + src + ' style="margin-top: 100px;width: 70%;margin-bottom: 100px;"/>' +
    '<p style="font-size: 50px;position: fixed;top: 30px;right: 30px;color: white;cursor: pointer;" onclick="closePicture(this)">×</p>' +
    '</div>';
  $('body').append(imgHtml);
  scaleImage('imgScale');
}

//关闭
function closePicture(obj) {
  $(obj).parent("div").remove();
}



//防抖
function debounce(func, wait) {
  let timeout;
  return function () {
    let context = this;
    let args = arguments;

    if (timeout) clearTimeout(timeout);

    let callNow = !timeout;
    timeout = setTimeout(() => {
      timeout = null;
    }, wait)

    if (callNow) func.apply(context, args)
  }
}
// /**
//  * @description 加载转圈圈效果
//  * @param {any} show 传入为真的值则显示转圈效果，在需要关闭时传入fasle或者不传值
//  * @return
//  */
// function showLoading(show) {
//   if (show) {
//     document.getElementById("over").style.display = "block";
//     document.getElementById("layout").style.display = "block";
//   } else {
//     document.getElementById("over").style.display = "none";
//     document.getElementById("layout").style.display = "none";
//   }
// }
/**
 * @description 成功提示
 * @param {string} text 传入需要的提示文字
 * @return  
 */
function successTips(text) {
  document.getElementById("success_tips").innerHTML = `<img style="width:40px" src="./assets/images/success_tips.svg" alt=""><br>${text}`;
  document.getElementById("success_tips").style.display = "block";
  setTimeout(function () {
    document.getElementById("success_tips").style.display = "none";
  }, 1000)
}
