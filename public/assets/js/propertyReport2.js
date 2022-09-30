
$(function () {
  //先初始化jsjdk的变量
  initData();

  //镇街
  initAppData();

  //隐患类型
  hiddenDangerData();
});

var mobileSelect1 = new MobileSelect({
  trigger: '#trigger',
  title: '单项选择',
  wheels: [
    {
      data: [
        {
          id: '0',
          name: '暂无数据',
          children: [
            { id: '0', name: '暂无数据' },
          ]
        }
      ]
    }
  ],
  keyMap: {
    id: 'id',
    value: 'name',
    childs: 'children'
  },
  callback: function (indexArr, data) {
    //保存选择数据
    $('#dangerCategory-child-one').val(data[data.length - 1]['id']);
    $('#trigger').text(data[data.length - 1]['name'])
  },
  connector: '-',
  position: [0, 1] //初始化定位
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

function initData() {
  //传回到前端
  var url = encodeURIComponent(location.href.split('#')[0]);

  $.ajax({
    async: true,
    type: "GET",
    url: SERSVER_BASE_URL + "/wechatReport/jsJdkIndex",
    data: {
      url: url,
      
    },
    success: function (data) {

      $('#ticket').val(data.ticket);
      $('#appId').val(data.appId);
      $('#timestamp').val(data.timestamp);
      $('#nonceStr').val(data.nonceStr);
      $('#signature').val(data.signature);
      console.log('jssdkjssdkjssdkjssdk',SERSVER_BASE_URL,data)
      wx.config({
        debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId: data.appId, // 必填，公众号的唯一标识
        timestamp: data.timestamp, // 必填，生成签名的时间戳
        nonceStr: data.nonceStr, // 必填，生成签名的随机串
        signature: data.signature,// 必填，签名，见附录1
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

// 镇街
function initAppData() {
  $.ajax({
    async: false,
    type: "GET",
    url: SERSVER_BASE_URL + "/wechatMobile/townList",
    data:{
      
    },
    success: function (data) {

      if (data.list.length > 0) {
        for (var i = 0; i < data.list.length; i++) {
          //镇街 townId
          var townId = data.list[i].id;
          //镇街名称
          var townName = data.list[i].townName;
          //拼接
          var option = $("<option>").val(townId).text(townName);
          $("#town").append(option);

        }
      }


    },
    error: function (XMLHttpRequest, textStatus, errorThrown) {
      alert("err:::" + errorThrown);
    }

  });

  //默认选择小区
  initSelectDangerData();

}


//选择小区
function initSelectDangerData() {

  //镇街 townId
  var townId = $("#town").val();
  $.ajax({
    async: false,
    type: "POST",
    url: SERSVER_BASE_URL + "/wechatMobile/selectPlatformListByTownId",
    data: {
      townId: townId,
      platformTypeId: 5,
      
    },
    dataType: "json",
    success: function (data) {
      if (data.list != null && data.list != undefined) {
        // 清空子级
        //$("#dangerMenu").empty('select');
        if (data.list.length > 0) {
          LAreaData = [];
          LAreaData = data.list;
          $("#cityname").text('请选择区域');

        } else {
          LAreaData = [];
          $("#cityname").text('当前没有区域');
        }
      }


    },
    error: function (XMLHttpRequest, textStatus, errorThrown) {
      alert("err:::" + errorThrown);
    }

  });
}

function hiddenDangerData() {

  $.ajax({
    async: true,
    type: "POST",
    url: SERSVER_BASE_URL + "/wechatMobile/selectTypeListByPlatformId",
    data: {
      platformTypeId: 5,
      
    },
    dataType: "json",
    success: function (data) {
      if (data.list.length > 0) {
        // 切换隐患初始化
        $('#dangerCategory-child-one').val('');
        // $('#trigger').text('请选择隐患类型')

        // 动态添加三级联动
        leaveNull(data.list)
        mobileSelect1.updateWheels(data.list)
      } else {
        alert('当前区域暂无隐患类型')
        // 切换隐患初始化
        $('#dangerCategory-child-one').val('');
        $('#trigger').text('区域暂无隐患类型')
        mobileSelect1.updateWheels([{
          id: '1',
          name: '暂无数据',
          children: [
            { id: '1', name: '暂无数据' },
          ]
        }])
      }
    },
    error: function (XMLHttpRequest, textStatus, errorThrown) {
      alert("err:::" + errorThrown);
    }

  });
}

function leaveNull(data = []) {
  data.forEach(item => {
    item.children === null ? item.children = [] : leaveNull(item.children)
  })
}


//点击镇街下拉框事件
function getApplication(o) {
  // 获取小区下拉框数据，选择小区
  initSelectDangerData();
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
  const imgLength = $('.imgDelete').length;
  console.log(imgLength);
  if(imgLength === 4){
    alert('最多只允许上传四张照片');
    // return
    // divContent = divContent;
    var divContent = $('#pics').html();
    $('#pics').html(divContent);
    $('.imgContainer:eq(0)').css({"margin-left": "0px"})
  }else{
    var formData = new FormData();
    formData.append("file", files); //file是blob数据
    console.log("files",files,...formData)
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
  
        divContent =divContent + "<div id='"+mediaName+"' class='imgContainer'>" +
            "<img title='"+mediaName+"' alt='"+mediaName+"' style='height: 11.47vh;width: 20.4vw;' src='"+filePath+"' onclick=\"imgDisplay(this)\" />" +
            "<img onclick=\"removeImg('"+this+"','"+mediaName+"')\" class=\"imgDelete\" src=\"./assets/images/Home/closeUploadImg.png\">" +
            "</div>" ;
  
        $('#pics').html(divContent);
        $('.imgContainer:eq(0)').css({"margin-left": "0px"})
  
      },
      error: function (XMLHttpRequest, textStatus, errorThrown) {
        alert("网络受限");
      }
    });

  }
}

//上传图片
function takePicture() {
  wx.chooseImage({
    count: 1, // 默认9
    sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
    sourceType: ['camera'], // 可以指定来源是相册还是相机，默认二者都有
    success: function (res) {
      var localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
      wx.uploadImage({
        localId: localIds.toString(), // 需要上传的图片的本地ID，由chooseImage接口获得
        isShowProgressTips: 1, // 默认为1，显示进度提示
        success: function (res) {
          $('#uploadImageLoading').css('display', 'block');
          var mediaId = res.serverId; // 返回图片的服务器端ID，即mediaId
          $.ajax({
            async: false,
            type: "POST",
            url: SERSVER_BASE_URL + "/wechatReport/uploadImg",
            data: {
              serverId: mediaId,
              
            },
            dataType: "json",
            success: function (res) {
              $('#uploadImageLoading').css('display', 'none');
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

              var mediaName ="chr"+ (res.fileName).substr(0,res.fileName.lastIndexOf("."));

              divContent = divContent +"<div id='"+mediaName+"' class='imgContainer'>" +
                  "<img title='"+mediaName+"' alt='"+mediaName+"' style='height: 11.47vh;width: 20.4vw;' src='"+filePath+"' onclick=\"imgDisplay(this)\" />" +
                  "<p onclick=\"removeImg('"+this+"','"+mediaName+"')\" class=\"imgDelete\" style='display: block;'>删除</p>" +
                  "</div>" ;

              $('#pics').html(divContent);
            },
            error: function () {
              alert("网络延迟,请稍后重试!");
            }

          });

        },
        fail: function (res) {
          alert('暂不支持同时多张图片上传');
        }
      });
    }
  });
}


var voice = { localId: '', serverId: '' };//全局变量
var soundTimer;//全局录音定时器
var downTime = 59;//全局计数器
// 录音开始时间、结束时间
var beginTimeDate, endTimeDate;
// 4 音频接口
// 4.2 开始录音
//手指触摸屏幕时触发事件

// $('#startRecord').on('touchstart', function () {

//   //失去焦点
//   $('#eventDescribe').on('blur',function () {
//     console.log("失去焦点")
//   });

//   $('#startRecord').css({ 'background': 'wheat' });
//   $('#startRecord').text("正在录音...");
//   $('#recording-img').css('display', 'block');

//   wx.startRecord({
//     cancel: function () {
//       alert('用户拒绝授权录音');
//     }
//   });
// });
$('#startRecord').on('click',function() {
  downTime = 59
  $('.startTitle').text("按住录音")
  $('.soundRecordContainer').show()
})
$('#clickSoundRecordButton').on('touchstart',function() {
  beginTimeDate = new Date().getTime();
  $('.toastTitle').text('松开结束录音')
  if(soundTimer) {
    clearInterval(soundTimer)
  }
  wx.startRecord({
    cancel: function () {
      alert('用户拒绝授权录音');
      return;
    }
  });
  soundTimer = setInterval(function() {
    $('.startTitle').text("00:"+downTime)
    if(downTime == 0) {
      clearInterval(soundTimer)
    }
    downTime--
    console.log("倒计时时间为",downTime)
  },1000)
})
//手指离开屏幕时触发
// $('#startRecord').on('touchend', function () {

//   $('#startRecord').css({ 'background': '#fff' });
//   $('#startRecord').text("继续录音");
//   $('#recording-img').css('display', 'none');

//   setTimeout(function () {
//     //停止录音
//     wx.stopRecord({
//       success: function (res) {
//         voice.localId = res.localId;
//         //上传录音
//         uploadVoice();
//       },
//       fail: function (res) {
//         $('#startRecord').text("继续录音");
//         alert("录音结束，时长超过1分钟!");
//       }
//     });

//   }, 800);

// });
$('#clickSoundRecordButton').on('touchend',function() {
  endTimeDate = new Date().getTime();
  const differTime = endTimeDate - beginTimeDate;
  if(differTime < 1000 ){
    alert('录音时间太短，请重新录制');
    $('.toastTitle').text('请录制1分钟以内录音')
    clearInterval(soundTimer)
  }else{
    $('.toastTitle').text('请录制1分钟以内录音')
    clearInterval(soundTimer)
    setTimeout(function () {
      //停止录音
      wx.stopRecord({
        success: function (res) {
          console.log('录音成功res',res)
          voice.localId = res.localId;
          //上传录音
          uploadVoice();
        },
        fail: function (res) {
          console.log('录音出错了res',res)
          // $('#startRecord').text("继续录音");
          // alert("录音结束，时长超过1分钟!");
          $('.startTitle').text('录音时长超过1分钟，请重录')
        }
      });
  
    }, 800);
  }

})
//点击关闭按钮关闭录音弹框
$('.closeSound').on('click',function() {
$('.soundRecordContainer').hide()
})
// 4.3 停止录音
document.querySelector('#stopRecord').onclick = function () {
  wx.stopRecord({
    success: function (res) {
      voice.localId = res.localId;
      //上传录音
      uploadVoice();
    },
    fail: function (res) {
      alert("录音结束，时长超过1分钟!");
    }
  });
};


// 4.4 监听录音自动停止
wx.onVoiceRecordEnd({
  complete: function (res) {
    voice.localId = res.localId;
    alert('录音结束，时长超过1分钟!');
    //上传录音
    uploadVoice();
  }
});

//删除语音
function removeAudio(obj, index){

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

function removeAudioOperation(index){
    $("#"+index).remove();
    //取出选中删除的图片
    var audioSelectedValue = index;
    //取出图片集合
    var audiosValue = $('#audios').val();

    var newAudiosValue = '';
    //说明是有张图片
    if(audiosValue.indexOf(",") > -1){
        //分隔成数组
        var audioArray = audiosValue.split(",");

        //检索
        for(var i=0; i<audioArray.length; i++){
          //检索
          var index = audioArray[i].indexOf(audioSelectedValue);
          if (index > -1) {

            //移除，形成新的数组
            audioArray.splice(i, 1);
          }
        }

        //检索
        // var index = audioArray.indexOf(audioSelectedValue);
        // if (index > -1) {
        //     //移除，形成新的数组
        //     audioArray.splice(index, 1);
        // }

        //重新构成新字符串
        newAudiosValue = audioArray.join();

    }else{

        newAudiosValue = newAudiosValue.replace(audioSelectedValue,'');
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
    alert('请先使用【开始录音】按钮录音');
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
          var filePath = SERSVER_BASE_HOME+ data.fileName;

          //var mediaName =(data.fileName).substr(0,data.fileName.lastIndexOf("."));
          var mediaName = data.fileName.substring(data.fileName.lastIndexOf("/")+1,data.fileName.lastIndexOf("."));

          //展开
          $('#manager-audio').css('display','block');

          let audioContent = $('#manager-audio').html();

          audioContent = "<div id='"+mediaName+"' style='width: 94%;height: 44px;margin-left: 10px;margin-top:5px; margin-bottom: 10px;'>\n" +
              "                            <div style='display: inline'>\n" +
              "                                <audio controls='controls' style='height: 40px;width: 76%;margin-left: 10px;'>\n" +
              "                                    <source src='"+filePath+"' type='audio/mpeg' />\n" +
              "                                </audio>\n" +
              "                            </div>\n" +
              "                            <div class='deleteicon' style='display: inline' onclick=\"removeAudio('"+this+"','"+mediaName+"')\"></div>\n" +
              "                        </div>" + audioContent;


          $('#manager-audio').html(audioContent);
          $('.soundRecordContainer').hide()
        },
        error: function () {
          alert("录音结束，时长超过1分钟!");
        }
      });

    }
  });
}

//提交表彰
function rptSubmit() {
  $('#btn').attr('disabled', true);
  $.mbox({
    area: ["280", "160"], //弹框大小
    border: [0, .5, "#666"],
    dialog: {
      msg: "您确定要上报吗？",
      btns: 2,   //1: 只有一个按钮   2：两个按钮  3：没有按钮 提示框
      type: 2,   //1:对钩   2：问号  3：叹号
      btn: ["取消", "确认"],  //自定义按钮
      yes: function () {
        //点击左侧按钮：成功
        $('#btn').attr('disabled', false);
        return false;
      },
      no: function () {
        //点击右侧按钮：失败
        // throttle(saveDanger(),4000);
        saveDangerThrottle()
      }
    }
  });


}
/**
 * @description: 节流函数
 * @param {type}:callback 回调函数
 * @param {type}:wait 节流时间(默认1000ms)
 * @return: callback 函数
 */
function throttle (callback, wait = 1000) {
  var timeId = null
  var startTime = new Date()
  return function () {
    var self = this
    var args = arguments
    if (timeId !== null) {
      clearTimeout(timeId)
    }
    var currentTime = new Date()
    // 当前的时间差
    var spaceTime = currentTime - startTime
    if (spaceTime >= wait) {
      // TODO:调用apply或者call将this指向Vue
      callback.apply(self, args)
      // 执行完之后需要重置开始的时间
      startTime = new Date()
    } else {
      timeId = setTimeout(() => {
        // TODO:调用apply或者call将this指向Vue
        callback.apply(self, args)
      }, wait)
    }
  }
}
var flag1 = false
function saveDangerThrottle() {
  if(flag1 == false) {
    flag1 = true
    $('#loadingContainer').show()
    saveDanger()
  }
}
//确认提交
function saveDanger() {

  // 镇街
  var townId = $('#town').val();
  var townName = $("#town option:selected").text();

  // 隐患类型id  隐患类型name
  var dangerCategoryId = $('#dangerCategory-child-one').val();
  var dangerName = $('#trigger').text();


  //平台应用ID (小区id)
  var application = $('#applicationId').val();
  var applicationName = $("#applicationName").val();

  //描述
  var eventDescribe = $('#eventDescribe').val();

  //微信的
  var imgs = $('#imgs').val();
  var audios = $('#audios').val();
  var videos = $('#videos').val();


  if (application === undefined || application == '') {
    $('#btn').attr('disabled', false);
    alert('请选择社区/村居');
    flag1 = false
    $('#loadingContainer').hide()
    return
  }

  if(dangerCategoryId == undefined || dangerCategoryId == ''){

    $('#btn').attr('disabled', false);
    alert('请选择隐患类型');
    flag1 = false
    $('#loadingContainer').hide()
    return
  }

  if(eventDescribe == undefined || eventDescribe == ''){

    $('#btn').attr('disabled', false);
    alert('请填写隐患描述');
    flag1 = false
    $('#loadingContainer').hide()
    return;
  }

  if (!$('#imgs').val()) {
    $('#btn').attr('disabled', false);
    alert('请上传图片');
    flag1 = false
    $('#loadingContainer').hide()
    return;
  }

  var reportData = {
    "title": dangerName,
    "townId": townId,
    "townName": townName,
    "platformId": application,
    "platformName": applicationName,
    "dataSourceId": dangerCategoryId,
    "eventType": dangerCategoryId,
    "flagType": 5,
    "eventTypeName": dangerName,
    "eventDescription": eventDescribe,
    "imageUrl": imgs,
    "audioUrl": audios,
    "videoUrl": videos,
    "status": 1,
    "surveyFlag": 0,
    "reportMethod": 10
  };

  $.ajax({
    async: false,
    type: "POST",
    contentType: 'application/json;charset=utf-8',
    url: SERSVER_BASE_URL + "/weChatHandleTask/report",
    data: JSON.stringify({
      ...reportData,
      
    }),
    dataType: "json",
    //processData : false,//是否序列化
    success: function (data) {
      if(data && data.code===0){
        alert("上传成功");
        flag1 = false
        $('#loadingContainer').hide()
        $('#btn').attr('disabled', false);
        //window.location.href = './rpt/index.html'
        history.go(-1)
      }else {
        flag1 = false
        $('#loadingContainer').hide()
        alert(data.msg)
      }

    },
    error: function (XMLHttpRequest, textStatus, errorThrown) {
      alert("err:::" + errorThrown);
      flag1 = false
      $('#loadingContainer').hide()
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
    $("#"+index).remove();

    //取出选中删除的图片
    var imgSelectedValue = index + ".png";
    //取出图片集合
    var imgsValue = $('#imgs').val();

    var newImgsValue = '';
    //说明是有张图片
    if(imgsValue.indexOf(",") > -1){
        //分隔成数组
        var imgArray = imgsValue.split(",");

        for(var i=0; i<imgArray.length; i++){
          //检索
          var index = imgArray[i].indexOf(imgSelectedValue);
          if (index > -1) {

            //移除，形成新的数组
            imgArray.splice(i, 1);
          }
        }

        //重新构成新字符串
        newImgsValue = imgArray.join();

    }else{

        newImgsValue = imgsValue.replace(imgSelectedValue,'');
    }

    $('#imgs').val(newImgsValue);
}


//图片灯箱
function imgDisplay(obj) {

  var src = $(obj).attr("src");

  var imgHtml = '<div style="width: 100%;height: 100vh;overflow: auto;background: rgba(0,0,0,0.5);text-align: center;position: fixed;top: 0;left: 0;z-index: 1000;">' +
      '<img src=' + src + ' style="margin-top: 100px;width: 70%;margin-bottom: 100px;"/>' +
      '<p style="font-size: 50px;position: fixed;top: 30px;right: 30px;color: white;cursor: pointer;" onclick="closePicture(this)">×</p>' +
      '</div>';
  $('body').append(imgHtml);
}

//关闭
function closePicture(obj) {
  $(obj).parent("div").remove();
}


//防抖
function debounce(func,wait) {
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
