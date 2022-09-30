
$(function () {
  var openId = getQueryString("openId");
  $('#openId').val(openId);

  //先初始化jsjdk的变量
  initData();

  //获取地理位置
  wx.ready(function () {
    // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，
    // 则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
    wx.getLocation({
      type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
      success: function (res) {
        console.log(res);

        var latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
        var longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
        var speed = res.speed; // 速度，以米/每秒计
        var accuracy = res.accuracy; // 位置精度

        //传回去给后台的经纬度
        $('#nowLatitude').val(latitude);
        $('#nowLongitude').val(longitude);

        var geocoder = new qq.maps.Geocoder({
          complete: function (result) {   //解析成功的回调函数
            console.log(result);
            var address = result.detail.address;  //获取详细地址信息 
            //alert("获取到你当前的上报位置："+address);
            $('#nowAddress').val('');
            $('#nowAddress').val(address); //将解析出来的地址渲染到页面
            $('#nowAddress2').val(address); //传回去给后台的地址
          }
        });
        geocoder.getAddress(new qq.maps.LatLng(latitude, longitude));

        /*wx.openLocation({
            latitude: latitude, // 纬度，浮点数，范围为90 ~ -90
            longitude: longitude, // 经度，浮点数，范围为180 ~ -180。
            name: '位置名', // 位置名
            address: '获取社区地址', // 地址详情说明
            scale: 28, // 地图缩放级别,整形值,范围从1~28。默认为最大
            infoUrl: 'http://34vktx.natappfree.cc/index' // 在查看位置界面底部显示的超链接,可点击跳转
        });*/

      }
    });

  });

  //初始化应用列表数据
  initAppData();

  //$("#application option:first").prop("selected", 'selected');

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
    console.log(data[data.length - 1]);
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
      //$('#openId').val(data.openId);

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
  var openId = $('#openId').val();
  //var openId = "oS3Kt1TkXVlF2KpJ4sfBDGuHrvik";
  $.ajax({
    async: false,
    type: "POST",
    url: SERSVER_BASE_URL + "/wechatMobile/townList",
    data: {
      openId: openId,
      
    },
    dataType: "json",
    success: function (data) {
      console.log("selectListByOpenId", data.list);
      //var option = $("<option>").val("0").text("选择街道");
      //$("#sel3").append(option);
      if (data.list != null && data.list.length > 0) {
        for (var i = 0; i < data.list.length; i++) {
          //镇街 townId
          var applicationId = data.list[i].id;
          //镇街名称
          var applicationName = data.list[i].townName;
          //拼接
          var option = $("<option>").val(applicationId).text(applicationName);
          $("#town").append(option);

        }
      }


    },
    error: function (XMLHttpRequest, textStatus, errorThrown) {
      alert("err:::" + errorThrown);
    }

  });

  //判断是否有cookie
  /*var getCookieAppId = getCookie("appId");
  if(getCookieAppId != null && getCookieAppId != undefined){
      $("#application ").val(getCookieAppId);   // 设置Select的Value值为4的项选中
  }*/


  //默认选中隐患
  schoolPeriod()
  initSelectDangerData();


}

//学段
function schoolPeriod(){
  $.ajax({
    async: false,
    type: "POST",
    url: SERSVER_BASE_URL + "/wechatMobile/periodList",
    data: {
      
    },
    dataType: "json",
    success: function (data) {
      console.log("/wechatMobile/periodList", data.list);

      if (data.list != null && data.list.length > 0) {
        for (var i = 0; i < data.list.length; i++) {
          //镇街 townId
          var applicationId = data.list[i].id;
          //镇街名称
          var applicationName = data.list[i].name;
          //拼接
          var option = $("<option>").val(applicationId).text(applicationName);

          $("#schoolPeriod").append(option);

        }
      }


    },
    error: function (XMLHttpRequest, textStatus, errorThrown) {
      alert("err:::" + errorThrown);
    }

  });
}

//学校选择器
function initSelectDangerData() {

  //镇街 townId
  var townId = $("#town").val();
  var schoolId = $("#schoolPeriod").val();
  console.log('schoolIdschoolIdschoolIdschoolIdschoolIdschoolIdschoolIdschoolIdschoolIdschoolIdschoolId',schoolId)
  $.ajax({
    async: false,
    type: "POST",
    url: SERSVER_BASE_URL + "/wechatMobile/selectPlatformListByTownId",
    data: {
      townId: townId,
      periodId:schoolId,
      
      // id: appId
    },
    dataType: "json",
    success: function (data) {
      console.log('/wechatMobile/selectPlatformListByTownId',data.list);

      if (data.list != null && data.list != undefined) {
        // 清空子级
        $("#dangerMenu").empty('select');
        if (data.list.length > 0) {
          //动态创建第一级联
          var select = '<select class="input-small" id="application" style="" name="application"  onchange = "getDangerCategoryParent(this)" ></select >';
          $('#dangerMenu').append(select);

          // let option = $("<option>").val('0').text('-请选择学校-');
          // $("#application").append(option);

          for (var i = 0; i < data.list.length; i++) {
            //类别id
            let dangerId = data.list[i].id;
            //类别名称
            let dangerName = data.list[i].platformName;
            // if (dangerName.length > 6) {
            //   dangerName = data.list[i].platformName.substring(0, 6);
            // }
            //拼接
            option = $("<option>").val(dangerId).text(dangerName);
            $("#application").append(option);

            // 拼接隐患类型名称
            // var dangerCategoryParentObj = document.getElementById('dangerMenu');
            // dangerCategoryParentObj.item(i).setAttribute('danger-name', dangerName);

          }
          hiddenDangerData()
          //初始化
          //initSelectCascader(2,$("#dangerCategory-parent").val())
        } else {
          // 清空
          $("#dangerMenu").empty();

          // $("#dangerMenu").empty();
          alert('当前学段没有学校')
        }
      }


    },
    error: function (XMLHttpRequest, textStatus, errorThrown) {
      alert("err:::" + errorThrown);
    }

  });
}
function hiddenDangerData() {
  //平台id(小区) townId
  var platformId = $("#application").val();
  console.log('$("#application")$("#application")$("#application")',$("#application"),platformId)
  $.ajax({
    async: false,
    type: "POST",
    url: SERSVER_BASE_URL + "/wechatMobile/selectTypeListByPlatformId",
    data: {
      platformId: platformId,
      

      // id: appId
    },
    dataType: "json",
    success: function (data) {
      console.log(data);
      if (data.list.length > 0) {
        // 切换隐患初始化
        $('#dangerCategory-child-one').val('');
        $('#trigger').text('请选择隐患类型')

        // 动态添加三级联动
        leaveNull(data.list)
        mobileSelect1.updateWheels(data.list)
      } else {
        alert('当前小区暂无隐患类型')
        // 切换隐患初始化
        $('#dangerCategory-child-one').val('');
        $('#trigger').text('小区暂无隐患类型')
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

// //默认选中隐患类型,第二级联
// function initSelectChildOneByParentId() {

//     var dangerCategoryParentId = $("#dangerCategory-parent").val();
//     var applicationId = $("#application").val();

//     $.ajax({
//         async:false,
//         type : "POST",
//         url: SERSVER_BASE_URL + "/weChatHandleTask/selectChildrenTypeListByParentId",
//         data: {
//             platformId: applicationId,
//             id:dangerCategoryParentId
//         },
//         dataType : "json",
//         success : function(data) {
//             console.log(data.list);

//             if(data.list != null && data.list != undefined){
//                 if(data.list.length > 0){
//                    //动态创建第二级联
//                     var select = '<select class="input-small" name="dangerCategory-child-one" id="dangerCategory-child-one" onchange="getDangerCategoryChild(this)"></select>';
//                     $('#dangerMenu').append(select);

//                     for(var i=0; i<data.list.length; i++){

//                         //类别id
//                         var dangerId = data.list[i].id;
//                         //类别名称
//                         var dangerName = data.list[i].name;
//                         if(dangerName.length > 6){
//                             dangerName = data.list[i].name.substring(0,6);
//                         }

//                         //拼接
//                         var option = $("<option>").val(dangerId).text(dangerName);
//                         $("#dangerCategory-child-one").append(option);

//                         //拼接隐患类型名称
//                         var dangerCategoryParentObj = document.getElementById('dangerCategory-child-one');
//                         dangerCategoryParentObj.item(i).setAttribute('danger-name',dangerName);

//                     }


//                     //初始化
//                     //initSelectCascader(3,$("#dangerCategory-child-one").val())



//                 }else{
//                     //清除第二级、第三级
//                     clearAllCascader(2,);

//                 }



//             }


//         },
//         error : function(XMLHttpRequest, textStatus, errorThrown) {
//             alert("err:::"+errorThrown);
//         }

//     });
// }


// //默认选中隐患类型,第三级联
// function initSelectChildTwoByParentId() {

//     var dangerCategoryParentId = $("#dangerCategory-child-one").val();

//     var applicationId = $("#application").val();

//     $.ajax({
//         async: false,
//         type : "POST",
//         url: SERSVER_BASE_URL + "/weChatHandleTask/selectChildrenTypeListByParentId",
//         data: {
//             platformId: applicationId,
//             id: dangerCategoryParentId
//         },
//         dataType : "json",
//         success : function(data) {
//             console.log(data.list);

//             if(data.list != null && data.list != undefined){
//                 if(data.list.length > 0){

//                     //动态创建第二级联
//                     var select = '<select class="input-small" name="dangerCategory-child-two" id="dangerCategory-child-two"></select>';
//                     $('#dangerMenu').append(select);

//                     for(var i=0; i<data.list.length; i++){

//                         //类别id
//                         var dangerId = data.list[i].id;
//                         //类别名称
//                         var dangerName = data.list[i].name;
//                         if(dangerName.length > 7){
//                             dangerName = data.list[i].name.substring(0,7);
//                         }

//                         //拼接
//                         var option = $("<option>").val(dangerId).text(dangerName);
//                         $("#dangerCategory-child-two").append(option);

//                         //拼接隐患类型名称
//                         var dangerCategoryParentObj = document.getElementById('dangerCategory-child-two');
//                         dangerCategoryParentObj.item(i).setAttribute('danger-name',dangerName);


//                     }


//                 }else{
//                     //清除第三级
//                     clearAllCascader(3);

//                 }


//             }


//         },
//         error : function(XMLHttpRequest, textStatus, errorThrown) {
//             alert("err:::"+errorThrown);
//         }

//     });
// }

// //默认
// function initSelectCascader(flag,dangerCategoryParentId){

//     var applicationId = $("#application").val();

//     $.ajax({
//         async:false,
//         type : "POST",
//         url: SERSVER_BASE_URL + "/wechatMobile/selectTypeListByPlatformId",
//         data: {
//             platformId: applicationId,
//             id: dangerCategoryParentId
//         },
//         dataType : "json",
//         success : function(data) {

//             if(data.list != null || data.list != undefined){
//                 if(data.list.length > 0){
//                     //动态创建第二级联
//                     if(data.list.length > 0){
//                         initSelectChildOneByParentId()
//                     }else{
//                         //清除第二级、第三级
//                         clearAllCascader(flag);
//                     }

//                 }else{
//                     //清除第二级、第三级
//                     clearAllCascader(flag);
//                 }
//             }
//         }

//     });
// }

//清除级联
function clearAllCascader(flag) {
  $("#dangerMenu").empty('option');
  // if(flag == 1){
  //     //清除第一级、第二级、第三级
  //     $("#dangerCategory-parent").remove();
  //     $("#dangerCategory-child-one").remove();
  //     $("#dangerCategory-child-two").remove();
  // }else if(flag == 2){
  //     //清除第二级、第三级
  //     $("#dangerCategory-child-one").remove();
  //     $("#dangerCategory-child-two").remove();
  // }else if(flag == 3){
  //     //清除第三级
  //     $("#dangerCategory-child-two").remove();
  // }
}


//点击镇街下拉框事件
function getApplication(o) {
  // 获取小区下拉框数据


  initSelectDangerData();
}

//点击学校选择器
function getDangerCategoryParent(o) {
  console.log('点击学校选择器', o.value);
  //设置选择值
  $("#application").val(o.value);
  // 获取平台隐患
  hiddenDangerData()
}

//点击学校选择器
function getDangerCategoryChild() {
  //清除第三联级
  clearAllCascader(3);
  initSelectChildTwoByParentId();
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


//上传图片
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
              //alert(filePath);
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


var voice = { localId: '', serverId: '' };//全局变量
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

//重写上传录音

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
  $('#btn').attr('disabled', true);
  $.mbox({
    area: ["280", "160"], //弹框大小
    border: [0, .5, "#666"],
    dialog: {
      msg: "您确定要上报吗？",
      btns: 2,   //1: 只有一个按钮   2：两个按钮  3：没有按钮 提示框
      type: 2,   //1:对钩   2：问号  3：叹号
      btn: ["取消", "确认"],  //自定义按钮
      yes: function () {  //点击左侧按钮：成功
        $('#btn').attr('disabled', false);
        return false;
      },
      no: function () { //点击右侧按钮：失败
        //先获取用户信息
        // getUserInfo();
        saveDanger();
      }
    }
  });


}

//用户信息
function getUserInfo() {
  //微信公众号唯一识别用户
  var openId = $('#openId').val();
  var platformId = $('#application').val();

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
    //processData : false,//是否序列化
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

  //微信公众号用户信息，存在于通讯录中的单位分组人
  var mailGroupName = $('#mailGroupName').val();
  var mailContactorName = $('#mailContactorName').val();
  var mailContactorMobile = $('#mailContactorMobile').val();

  /*var getCookieAppId = getCookie("appId");
  if(getCookieAppId == null || getCookieAppId == undefined){
      setCookie("appId",application,"d30");
  }else{
      delCookie("appId");
      setCookie("appId",application,"d30");
  }*/
  // 镇街
  var townId = $('#town').val()
  var periodId = $('#schoolPeriod').val()
  var periodName  = $('#schoolPeriod').text().trim()
  var townName = $("#town option:selected").text()
  //隐患类型
  var dangerCategoryParent = $('#dangerCategory-parent').val();
  var dangerCategoryChildOne = $('#dangerCategory-child-one').val();
  var dangerCategoryChildTwo = $('#dangerCategory-child-two').val();

  // 隐患类型id  隐患类型name
  var dangerCategoryId = $('#dangerCategory-child-one').val();
  var dangerName = $('#trigger').text()


  //平台应用ID (小区id)
  var application = $('#application').val();
  var applicationName = $("#application option:selected").text()
  // 验证小区不能为空
  if (application === undefined) {
    $('#btn').attr('disabled', false);
    alert('请选择有学校的镇街')
    return
  }

  if (application === '0') {
    $('#btn').attr('disabled', false);
    // alert('请选择学校')
    return
  }

  // if (dangerCategoryChildTwo != null && dangerCategoryChildTwo != undefined) {
  //   //存在三级
  //   dangerCategoryId = dangerCategoryChildTwo;
  //   //隐患编码
  //   var childTwo = document.getElementById('dangerCategory-child-two');
  //   var childTwoCode = childTwo.item(childTwo.selectedIndex).getAttribute('danger-name');
  //   dangerName = childTwoCode;

  // } else {
  //   if (dangerCategoryChildOne != null && dangerCategoryChildOne != undefined) {
  //     //存在二级
  //     dangerCategoryId = dangerCategoryChildOne;
  //     //隐患类型名称,作为事件工单搜索
  //     var childTwo = document.getElementById('dangerCategory-child-one');
  //     var childTwoCode = childTwo.item(childTwo.selectedIndex).getAttribute('danger-name');
  //     dangerName = childTwoCode;

  //   } else {
  //     if (dangerCategoryParent != null && dangerCategoryParent != undefined) {
  //       //存在一级
  //       dangerCategoryId = dangerCategoryParent;
  //       //隐患编码
  //       var childTwo = document.getElementById('dangerCategory-parent');
  //       var childTwoCode = childTwo.item(childTwo.selectedIndex).getAttribute('danger-name');
  //       dangerName = childTwoCode;
  //     }
  //   }
  // }


  //描述
  var eventDescribe = $('#eventDescribe').val();

  //微信的
  var nowAddress = $('#nowAddress').val();
  var nowLatitude = $('#nowLatitude').val();
  var nowLongitude = $('#nowLongitude').val();
  var imgs = $('#imgs').val();
  var audios = $('#audios').val();
  var videos = $('#videos').val();

  var reportData = {
    "openId": openId,
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
    "longitude": nowLongitude,
    "latitude": nowLatitude,
    "eventPosition": nowAddress,
    "reportName": mailContactorName,
    "reportUnit": mailGroupName,
    "reportContactorMobile": mailContactorMobile,
    "reportMethod": 3,
    "periodId":periodId,
    "periodName":periodName
  };

  if (application === null) {
    $('#btn').attr('disabled', false);
    alert('请先关注平台二维码!')
    return
  }

  if (!$('#imgs').val()) {
    $('#btn').attr('disabled', false);
    alert('请上传图片');
    return;
  }

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
        console.log(data);
        alert("上传成功");
        $('#btn').attr('disabled', false);
        window.location.href = './index.html?openId=' + getQueryString('openId')
      }else {
        alert(data.msg)
      }

      /* $.mbox({
           area: [ "auto", "auto" ], //弹框大小
           border: [ 0, .5, "#666" ],
           dialog: {
               msg: "该隐患上报已成功",
               btns: 2,   //1: 只有一个按钮   2：两个按钮  3：没有按钮 提示框
               type: 1,   //1:对钩   2：问号  3：叹号
               btn: [ "继续上报", "关闭网页"],  //自定义按钮
               yes: function() {  //点击左侧按钮：成功
                   window.location.href = "http://shahe.natapp1.cc";
                   return false;
               },
               no: function() { //点击右侧按钮：失败
                   window.close();
                   wx.closeWindow()
               }
           }
       });*/
    },
    error: function (XMLHttpRequest, textStatus, errorThrown) {
      alert("err:::" + errorThrown);
    }

  });
}
