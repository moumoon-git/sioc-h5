
$(function () {

  //初始化参数
  initParams();

  //初始化页面核实或者处置标志
  initPage();

  //初始化工单
  initHistory();

  $('body').on('click', '#present', function () {
    rptSubmit()
  });


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
        alert("该工单已失效");
      }

    },
    error: function () {
      alert("网络受限");
    }

  });


}

//适应以下两种模式，来获取url参数值：
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


//页面动态初始化
function initPage() {

  $("title").html("工单审批");

  //tab标记
  $("#tabStatus").html("工单审批");

  var textarea = '<textarea name="verifyTextData" id="verifyTextData" required lay-verify="required"\n' +
    'placeholder="请填写处置描述" class="layui-textarea"></textarea>';

  //事件标记
  var eventStatus = '<label style="width: 30%;">审批结果：</label>\n' +
    '              <select name="city" id="veracity" name="veracity">\n' +
    '                <option value="1">同意</option>\n' +
    '                <option value="2">驳回</option>\n' +
    '              </select>';

  $('#verifyText').append(textarea);
  $('#eventStatus').append(eventStatus);

}



//初始化历史记录，查询历史记录表表
function initHistory() {

  //事件标志
  var infoId = $('#infoId').val();
  var flag = $('#flag').val();

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
      if (data.list.length > 0) {
        //拼接事件基本信息
        var index = data.list.length - 1;
        var eventTypeName = data.list[index].eventTypeName;
        var content = data.list[index].content;
        var reportTime = data.list[index].gmtCreate;
        var townName = data.list[index].townName;
        var periodName = data.list[index].periodName;
        var platformName = data.list[index].platformName;

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

        if (areaName != null && areaName != "") {
          eventInfo += '区域：' + areaName + '<br>\n';
        }

        if (reportTime != null && reportTime != "") {
          eventInfo += '时间：' + reportTime + '<br>\n';
        }
        if (content != null && content != "") {
          eventInfo += '内容：' + content + '<br>\n';
        }


        //判断图片
        if (data.list[index].imageUrl != null && data.list[index].imageUrl != "") {
          imgUrlList = [];
          //单个图片
          var url = data.list[index].imageUrl;
          var newUrl;
          if (url.indexOf("http") > -1) {
            //是外网推过来的链接
            newUrl = url;
          } else {
            newUrl = SERSVER_BASE_HOME + data.list[index].imageUrl;
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
        if (data.list[index].imageArr != null) {
          imgUrlList = [];
          //多个图片

          for (var j = 0; j < data.list[index].imageArr.length; j++) {

            var url = data.list[index].imageArr[j];
            var newUrl;
            if (url.indexOf("http") > -1) {
              //是外网推过来的链接
              newUrl = url;
            } else {
              newUrl = SERSVER_BASE_HOME + data.list[index].imageArr[j];
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

        }

        // //判断图片
        // if (data.list[index].imageUrl != null && data.list[index].imageUrl != "") {

        //   //单个图片
        //   var url = data.list[index].imageUrl;
        //   var newUrl;
        //   if (url.indexOf("http") > -1) {
        //     //是外网推过来的链接
        //     newUrl = url;
        //   } else {
        //     newUrl = SERSVER_BASE_HOME + data.list[index].imageUrl;
        //   }
        //   imgUrlList.push(newUrl)
        //   eventInfo += '<img  id="imginfo" src=' + newUrl + ' style="width: 100px;height: 100px"/>';

        //   setTimeout(() => {
        //     layui.use('upload', function () {
        //       document.querySelectorAll("#imginfo").forEach((item, index) => {
        //         item.onclick = function () {

        //           $('#imgDialog').append(`
        //                                      <img src="${imgUrlList[index]}"  style="width: 80vw;display: block;margin: auto auto;">
        //                                  `)
        //           layer.open({
        //             type: 1,
        //             content: $('#imgDialog'), //这里content是一个DOM，注意：最好该元素要存放在body最外层，否则可能被其它的相对元素所影响
        //             cancel: function () {

        //               $('#imgDialog').html('')
        //             }
        //           });
        //         }
        //       })
        //     })

        //   })


        // }
        // if (data.list[index].imageArr != null) {
        //   //多个图片

        //   for (var j = 0; j < data.list[index].imageArr.length; j++) {

        //     var url = data.list[index].imageArr[j];
        //     var newUrl;
        //     if (url.indexOf("http") > -1) {
        //       //是外网推过来的链接
        //       newUrl = url;
        //     } else {
        //       newUrl = SERSVER_BASE_HOME + data.list[index].imageArr[j];
        //     }
        //     eventInfo += '<img id="imginfo" src=' + newUrl + ' style="width: 100px;height: 100px"/>';
        //     imgUrlList.push(newUrl)
        //   }

        //   setTimeout(() => {
        //     layui.use('upload', function () {
        //       document.querySelectorAll("#imginfo").forEach((item, index) => {
        //         item.onclick = function () {

        //           $('#imgDialog').append(`
        //                                          <img src="${imgUrlList[index]}"  style="width: 80vw;display: block;margin: auto auto;">
        //                                      `)
        //           layer.open({
        //             type: 1,
        //             content: $('#imgDialog'), //这里content是一个DOM，注意：最好该元素要存放在body最外层，否则可能被其它的相对元素所影响
        //             cancel: function () {

        //               $('#imgDialog').html('')
        //             }
        //           });
        //         }
        //       })
        //     })

        //   })

        // }

        // //判断图片
        // if (data.list[index].imageUrl != null && data.list[index].imageUrl != "") {
        //   //单个图片
        //   var url = data.list[index].imageUrl;
        //   var newUrl;
        //   if (url.indexOf("http") > -1) {
        //     //是外网推过来的链接
        //     newUrl = url;
        //   } else {
        //     newUrl = SERSVER_BASE_HOME + data.list[index].imageUrl;
        //   }
        //   eventInfo += '<img  onclick="imgDisplay(this)" src=' + newUrl + ' style="width: 80px;height: 80px;margin-left:10px"/>';
        // }


        // if (data.list[index].imageArr != null) {
        //   //多个图片
        //   for (var j = 0; j < data.list[index].imageArr.length; j++) {
        //     var url = data.list[index].imageArr[j];
        //     var newUrl;

        //     if (url.indexOf("http") > -1) {
        //       //是外网推过来的链接
        //       newUrl = url;
        //     } else {
        //       newUrl = SERSVER_BASE_HOME + data.list[index].imageArr[j];
        //     }
        //     eventInfo += '<img onclick="imgDisplay(this)" src=' + newUrl + ' style="width: 80px;height: 80px;margin-left:10px"/>';
        //   }
        // }

        //判断音频
        if (data.list[index].audioUrl != null && data.list[index].audioUrl != "") {
          //单个音频
          var url = SERSVER_BASE_HOME + data.list[index].audioUrl;

          eventInfo += '<audio controls="controls"><source src="' + url + '" type="audio/mpeg" /></audio>';
        }

        if (data.list[index].audioUrlArr != null) {
          //多个音频
          for (var j = 0; j < data.list[index].audioUrlArr.length; j++) {
            var url = SERSVER_BASE_HOME + data.list[index].audioUrlArr[j];
            eventInfo += '<audio controls="controls"><source src="' + url + '" type="audio/mpeg" /></audio>';
          }
        }

        eventInfo += '</div>\n';
        eventInfo += '</div>';
        $("#eventInfo").append(eventInfo);
      }

      //拼接工单,歷史記錄的
      var historyRecord = '<ul class="layui-timeline">\n';

      if (data.list.length > 0) {
        // var imgUrlList = [];

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
            //多个图片
            imgUrlHistoryList = [];
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
          //   imgUrlList.push(newUrl)
          //   strcontent += '<img  id="imginfo" src=' + newUrl + ' style="width: 100px;height: 100px"/>';

          //   setTimeout(() => {
          //     layui.use('upload', function () {
          //       document.querySelectorAll("#imginfo").forEach((item, index) => {
          //         item.onclick = function () {

          //           $('#imgDialog').append(`
          //                            <img src="${imgUrlList[index]}"  style="width: 80vw;display: block;margin: auto auto;">
          //                        `)
          //           layer.open({
          //             type: 1,
          //             content: $('#imgDialog'), //这里content是一个DOM，注意：最好该元素要存放在body最外层，否则可能被其它的相对元素所影响
          //             cancel: function () {

          //               $('#imgDialog').html('')
          //             }
          //           });
          //         }
          //       })
          //     })

          //   })


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
          //     strcontent += '<img id="imginfo" src=' + newUrl + ' style="width: 100px;height: 100px"/>';
          //     imgUrlList.push(newUrl)
          //   }

          //   setTimeout(() => {
          //     layui.use('upload', function () {
          //       document.querySelectorAll("#imginfo").forEach((item, index) => {
          //         item.onclick = function () {

          //           $('#imgDialog').append(`
          //                                <img src="${imgUrlList[index]}"  style="width: 80vw;display: block;margin: auto auto;">
          //                            `)
          //           layer.open({
          //             type: 1,
          //             content: $('#imgDialog'), //这里content是一个DOM，注意：最好该元素要存放在body最外层，否则可能被其它的相对元素所影响
          //             cancel: function () {

          //               $('#imgDialog').html('')
          //             }
          //           });
          //         }
          //       })
          //     })

          //   })

          // }


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
          //   strcontent += '<img  onclick="imgDisplay(this)" src=' + newUrl + ' style="width: 100px;height: 100px;margin-left:10px"/>';
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
    error: function () {
      alert("网络受限");
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

        saveDanger();


      }, 8000)
    }
  });
}

//用户信息
function getUserInfo() {
  //微信公众号唯一识别用户
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

        if (mailGroups.length > 0) {
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


//确认提交
function saveDanger() {

  // if (!$('#imgs').val()) {
  //   $('#btn').attr('disabled', false);
  //   alert('请上传图片');
  //   return;
  // }

  //微信公众号唯一识别用户
  var openId = $('#openId').val();
  var contactorId = $("#contactorId").val();
  var contactorName = $('#mailContactorName').val();
  var infoId = $('#infoId').val();
  var platformId = $('#platformId').val();
  var flag = $('#flag').val();
  var imgs = $('#imgs').val();

  // 核实内容
  var verifyTextData = $('#verifyTextData').val();

  // 事件真实性
  var veracity = $('#veracity').val();


  var reportData = {
    "platformId": platformId, // 平台id
    "dataSourceId": infoId, //数据来源id
    "flagType": flag, //标志
    "content": verifyTextData, // 事件描述
    "examineFlag": veracity,
    "mailContactorName": contactorName,
    "mailContactorId": contactorId,
    "openId": openId,
    "imageUrl": imgs
  };


  $.ajax({
    async: false,
    type: "POST",
    contentType: 'application/json;charset=utf-8',
    url: SERSVER_BASE_URL + "/weChatHandleTask/weChatExamination",
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
      }
      if (data.code == 500) {
        alert(data.msg)
        showLoading(false);
      }

    },
    error: function () {
      $('#present').attr('disabled', false);
      alert("提交失败，请稍后重试！");
      showLoading(false);
    }

  });
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
