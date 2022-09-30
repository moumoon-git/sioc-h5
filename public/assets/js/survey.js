
$(function () {

  var openId = getQueryString("openId");
  var platformId = getQueryString("platformId");
  //数据来源标志
  var infoId = getQueryString("infoId");
  //数据来源标志,1是事件，2是隐患，3是人，4是车，5是工单
  var flag = getQueryString("flagType");


  $('#openId').val(openId);
  $('#infoId').val(infoId);
  $('#platformId').val(platformId);
  $('#flag').val(flag);

  //初始化工单
  initHistory();

  //先初始化jsjdk的变量
  initData();

  // 上传图片
  // $('body').on('click', '#uplaodImageBtn', function () {
  //   takePicture()
  // });

  $('body').on('click', '#present', function () {
    rptSubmit()
  });
});


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


//初始化历史记录，查询历史记录表表
function initHistory() {

  //事件标志
  var infoId = $('#infoId').val();

  var data = {
    "dataSourceId": infoId, //数据来源
    "flagType": 0, //数据来源标记，如果flag是1是事件，或者是5工单
    "platformId": 0 // 平台id
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

      if (data.list.length > 0) {
        //拼接事件基本信息
        var index = data.list.length - 1;
        var address = data.list[index].mailContactorAddress;
        var eventTypeName = data.list[index].eventTypeName;
        var content = data.list[index].content;
        var reportTime = data.list[index].gmtCreate;

        //取出最后一条，也就是刚上报信息
        var eventInfo = '';

        eventInfo += '<div class="layui-card" style="padding: 0px;margin-bottom: 22px;border: 1px solid #2196F3;color: #000000;">\n';
        eventInfo += '<div class="layui-card-header" style="text-align: center;height: 30px;line-height: 30px;">' + eventTypeName + '</div>\n';
        eventInfo += '<div class="layui-card-body">\n';

        if (reportTime != null && reportTime != "") {
          eventInfo += '时间：' + reportTime + '<br>\n';
        }
        if (content != null && content != "") {
          eventInfo += '内容：' + content + '<br>\n';
        }
        if (address != null && address != "") {
          eventInfo += '位置：' + address + '<br>\n';
        }
        eventInfo += '</div>\n';
        eventInfo += '</div>';

        $("#eventInfo").append(eventInfo);

      }

      //拼接工单
      var historyRecord = '<ul class="layui-timeline">\n';

      if (data.list.length > 0) {
        for (var i = 0; i < data.list.length; i++) {

          var strcontent = '';

          var eventCreateTime = data.list[i].gmtCreate;

          var eventRecord = data.list[i].title;
          var eventContactorName = data.list[i].mailContactorName;
          var eventContactorMobile = data.list[i].mailContactorMobile;
          var eventMailGroupName = data.list[i].mailGroupName;
          var eventContactorAddress = data.list[i].mailContactorAddress;
          var eventContent = data.list[i].content;

          var eventStatus = data.list[i].eventStatusAfter;
          var status = setEventStatus(eventStatus);

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
          if (eventContactorMobile != null && eventContactorMobile != "") {
            strcontent += '<br>电话：' + eventContactorMobile + '\n';
          }
          if (eventMailGroupName != null && eventMailGroupName != "") {
            strcontent += '<br>部门：' + eventMailGroupName + '\n';
          }
          if (eventContactorAddress != null && eventContactorAddress != "") {
            strcontent += '<br>地址：' + eventContactorAddress + '\n';
          }
          if (eventContent != null && eventContent != "") {
            strcontent += '<br>内容：' + eventContent + '\n';
          }
          strcontent += '</p>\n';

          //判断图片
          if (data.list[i].imageUrl != null && data.list[i].imageUrl != "") {
            //单个图片
            var url = SERSVER_BASE_URL + "/wx/images/" + data.list[i].imageUrl;
            strcontent += '<img id="imginfo" src=' + url + ' style="width: 100px;height: 100px"/>';
          }
          if (data.list[i].imageArr != null) {
            //多个图片
            for (var j = 0; j < data.list[i].imageArr.length; j++) {
              var url = SERSVER_BASE_URL + "/wx/images/" + data.list[i].imageArr[j];
              strcontent += '<img id="imginfo" src=' + url + ' style="width: 100px;height: 100px"/>';
            }
          }

          //判断音频
          if (data.list[i].audioUrl != null && data.list[i].audioUrl != "") {
            //单个音频
            var url = SERSVER_BASE_URL + "/wx/videos/" + data.list[i].audioUrl;

            strcontent += '<audio controls="controls"><source src="' + url + '" type="audio/mpeg" /></audio>';
          }

          //判断视频
          /*  if(data.list[i].videoUrl != null){
              //单个视频
              strcontent += '<video src='+SERSVER_BASE_URL+"/"+data.list[i].videoUrl+' width="320" height="240" controls="controls"></video>';

            }
            if(data.list[i].videoUrlArr != null){
              //多个视频
              for(var m=0; m<data.list[i].videoUrlArr.length; m++){
                strcontent += '<video src='+SERSVER_BASE_URL+"/"+data.list[i].videoUrl[m]+' width="320" height="240" controls="controls"></video>';
              }
            }*/

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
  compressFile(file,upFileImg)
}

//压缩图片
function compressFile(file,callback) {
  let fileObj = file;
  let reader = new FileReader()
  reader.readAsDataURL(fileObj) //转base64
  reader.onload = function(e) {
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
      let files = new window.File([new Blob([u8arr], {type: mime})], 'test.png', {type: 'image/png'}) // 转成file
      callback(files) // 回调

    }
  }
}

//手机端上传图片
function upFileImg (files) {
  var formData = new FormData();
  formData.append("file", files); //file是blob数据

  $.ajax({
    async: false,
    type: "POST",
    url: SERSVER_BASE_URL + "/upload/uploadMobileFile",
    data : formData,
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
      var mediaName = res.fileName.substring(res.fileName.lastIndexOf("/")+1,res.fileName.lastIndexOf("."));

      divContent = "<div id='"+mediaName+"' class='imgContainer'>" +
          "<img title='"+mediaName+"' alt='"+mediaName+"' style='height: 100px;width: 100px;' src='"+filePath+"' onclick=\"imgDisplay(this)\" />" +
          "<p onclick=\"removeImg('"+this+"','"+mediaName+"')\" class=\"imgDelete\" style='display: block'>删除</p>" +
          "</div>" + divContent;

      $('#pics').html(divContent);

    },
    error: function (XMLHttpRequest, textStatus, errorThrown) {
      alert("网络受限");
    }
  });
}


// 上传图片
function takePicture() {
  wx.chooseImage({
    count: 3, // 默认9
    sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
    sourceType: ['camera', 'album'], // 可以指定来源是相册还是相机，默认二者都有
    success: function (res) {
      var localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
      //var mediaId = res.serverId; // 返回图片的服务器端ID，即mediaId
      //alert(res.serverId)
      wx.uploadImage({
        localId: localIds.toString(), // 需要上传的图片的本地ID，由chooseImage接口获得
        isShowProgressTips: 1, // 默认为1，显示进度提示
        success: function (res) {
          var mediaId = res.serverId; // 返回图片的服务器端ID，即mediaId
          //定义图像名称，可能上传多个,
          //var imgNameArray = [];
          //将获取到的 mediaId 传入后台
          $.ajax({
            async: true,
            type: "POST",
            url: SERSVER_BASE_URL + "/wechatReport/uploadImg",
            data: {
              serverId: mediaId,
              
            },
            dataType: "json",
            success: function (res) {
              // alert(JSON.stringify(res))
              //返回后台的图像数组名称
              //imgNameArray.push(res.fileName);
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
              divContent = "<img style='width: 150px;height: 150px' src=" + filePath + "/>" + divContent;
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

// 4 音频接口
// 4.2 开始录音
//手指触摸屏幕时触发事件
$('#startRecord').on('touchstart', function () {

  $('#startRecord').css({ 'background': 'wheat' });
  $('#startRecord').text("正在录音...");
  $('#recording-img').css('display', 'block');

  wx.startRecord({
    cancel: function () {
      alert('用户拒绝授权录音');
    }
  });
});

//手指离开屏幕时触发
$('#startRecord').on('touchend', function () {

  $('#startRecord').css({ 'background': '#fff' });
  $('#startRecord').text("录音完成");
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
        alert(JSON.stringify(res));
      }
    });

  }, 800);

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
      alert(JSON.stringify(res));
    }
  });
};


// 4.4 监听录音自动停止
wx.onVoiceRecordEnd({
  complete: function (res) {
    voice.localId = res.localId;
    alert('录音时间已超过一分钟');
    //上传录音
    uploadVoice();
  }
});

// 4.5 播放音频
document.querySelector('#playVoice').onclick = function () {

  if (voice.localId == '') {
    alert('请先使用 startRecord 接口录制一段声音');
    return;
  }
  wx.playVoice({
    localId: voice.localId
  });
};

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
        async: true,
        url: voiceUrl,
        type: 'POST',
        dataType: 'json',
        data: {
          mediaId: voice.serverId,
          
        },

        success: function (data) {
          voice.serverId = res.serverId;
          // alert(JSON.stringify(data))
          $('#audios').val(data.fileName);
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
    area: ["auto", "auto"], //弹框大小
    border: [0, .5, "#666"],
    dialog: {
      msg: "您确定要提交吗？",
      btns: 2, //1: 只有一个按钮   2：两个按钮  3：没有按钮 提示框
      type: 2, //1:对钩   2：问号  3：叹号
      btn: ["取消", "确认"], //自定义按钮
      yes: function () { //点击左侧按钮：成功
        return false;
      },
      no: function () { //点击右侧按钮：失败
        //获取用户信息
        getUserInfo();
        saveDanger();
      }
    }
  });
}

//用户信息
function getUserInfo() {
  //微信公众号唯一识别用户
  var openId = $('#openId').val();
  var platformId = $('#platformId').val();

  var userData = {
    "openId": openId, // 上报用户微信标识
    "platformId": platformId // 平台id
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

  //微信公众号唯一识别用户
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

  // 满意程度
  var veracity = $('#veracity').val();


  //设置cookie
  /*var getCookieAppId = getCookie("appId");
  if (getCookieAppId == null || getCookieAppId == undefined) {
    setCookie("appId", application, "d30");
  } else {
    delCookie("appId");
    setCookie("appId", application, "d30");
  }*/


  //图片
  var imgs = $('#imgs').val();
  //音频
  var audios = $('#audios').val();

  if (!$('#imgs').val()) {
    $('#btn').attr('disabled', false);
    alert('请上传图片');
    return
  }

  var reportData = {
    "openId": openId, // 上报用户微信标识
    "platformId": platformId, // 平台id
    "eventInfoId": infoId, //数据来源id
    "flagType": flag, //标志
    "reportName": mailContactorName,
    "reportUnit": mailGroupName,
    "reportContactorMobile": mailContactorMobile,
    "advice": verifyTextData, // 事件描述
    "imageUrl": imgs,  // 图片
    "audioUrl": audios,  // 语音
    "videoUrl": "",  // 视频
    "status": veracity //状态
  };


  $.ajax({
    async: false,
    type: "POST",
    contentType: 'application/json;charset=utf-8',
    url: SERSVER_BASE_URL + "/weChatHandleTask/saveSurvey",
    data: JSON.stringify({
      ...reportData,
      
    }),
    dataType: "json",
    //processData : false,//是否序列化
    success: function (data) {
      console.log(data);
      alert("提交成功");
    },
    error: function (XMLHttpRequest, textStatus, errorThrown) {
      alert("err:::" + errorThrown);
    }

  });
}
