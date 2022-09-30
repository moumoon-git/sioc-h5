
$(function () {

  //获取url的通知noticeId,userId
  var platformId = getQueryString("platformId");
  $('#platformId').val(platformId);

  var openId = localStorage.getItem("openId");
  //var userId = $('#userId').val();

  getPlatformByOpenId(openId);

  initCommentIndexDataList()

});

//适应以下两种模式，来获取url参数值：
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

//判断openId
function getPlatformByOpenId(cookieOpenId) {
  $.ajax({
    async: false,
    type: "GET",
    url: SERSVER_BASE_URL + "/weChatHandleTask/getPlatformByOpenId",
    data:
        {
          'openId':cookieOpenId,
          
        },
    dataType: "json",
    success: function (res) {

      if(res.mailContactorEntity == 'null' || res.mailContactorEntity == null){
        //location.href.search('token')==-1
        alert('该用户还没有激活，请先激活！');
        window.location.href=`./activate.html?openId=`+cookieOpenId;

      }else{
        var  userId = res.mailContactorEntity.id;
        $('#userId').val(userId);
      }

    }
  });
}

//初始化列表
function  initCommentIndexDataList() {
  let val = $('#platformId').val();
  var paramData = {
    //startAt: this.startAt,
    //endAt: this.endAt,
    platformId: String(val),
    keyword: $('#keyword').val().trim(),
    selectedNode: null,
    limit: $('#pageSize').val(),
    page: $('#currentPage').val()
  };

  $.ajax({
    async: false,
    type: "POST",
    contentType: 'application/json;charset=utf-8',
    url: SERSVER_BASE_URL + "/notice/noticemanagement/page",
    data: JSON.stringify({
      ...paramData,
      
    }),
    success: function (data) {
      console.log("通知公告列表", data);
      if(data.page != null && data.page.list.length > 0){
        $('#noticeData').html('');
        var totalCount = 0;
        for(var i=0; i<data.page.list.length; i++){

          //用户数组
          var userArray = data.page.list[i].noticeContactorReceiveList;
          
          for(var j=0; j<userArray.length; j++){
            console.log('fuckyou',j,userArray.length)
            var userId = $('#userId').val();
            var contactorId = userArray[j].contactorId;
            //取出该用户通知 公告
            if(userId == contactorId){

              totalCount = totalCount + 1;

              //分组类型id
              var noticeTypeId = data.page.list[i].noticeTypeId;
              var noticeTypeName = '';
              
              $.ajax({
                async: false,
                type: "GET",
                url: SERSVER_BASE_URL + "/notice/noticetype/noticeTypeById",
                data: {
                  "typeId": noticeTypeId,
                  
                },
                dataType: "json",
                success: function (data) {
                  if(data.data){
                    noticeTypeName = data.data.name;
                  }
                }
              })

              //通知id
              var noticeId = data.page.list[i].id;
              //分组名称判断
              if(noticeTypeName != null && noticeTypeName != '' && noticeTypeName.length >6){
                noticeTypeName = noticeTypeName.substring(0,5);
              }
              //标题
              var title = data.page.list[i].title;
              if(title != null && title != '' && title.length >8){
                title = title.substring(0,7)+"...";
              }
              //时间
              var noticeTime = data.page.list[i].createTime;

              //已读
              var readed = data.page.list[i].noticeContactorReadList.length;
              //回复
              var commented = data.page.list[i].noticeCommentEntityList.length;

              var strcotent = '';

              strcotent += '<div onclick="skipComment('+noticeId+','+userId+')" style="width: 89vw;position: relative;margin: 2vh 5vw;background:rgba(255,255,255,1);box-shadow:0px 0.5vw 2vh -1vw rgba(0,0,0,0.1);border-radius:1vw;">\n' +
                  '            <div style="width: 100%;font-size: 16px;font-family: PingFangSC-Medium,PingFang SC;font-weight: 500;color: rgba(51,51,51,1);position: relative;height: 7vh;line-height: 7vh;">\n' +
                  '                <span style="margin-left: 5vw;font-weight: bold;">'+noticeTypeName+'</span>\n' +
                  '                <span style="font-weight: bold;margin-left: 2vw;">|</span>\n' +
                  '                <span style="font-weight: bold;margin-left: 2vw;">'+title+'</span>\n' +
                  '            </div>\n' +
                  '            <div style="width: 100%;position: relative;font-size:12px;font-family:PingFangSC-Regular,PingFang SC;font-weight:400;color:rgba(153,153,153,1);">\n' +
                  '                <span style="margin-left: 5vw;">时间：</span>\n' +
                  '                <span>'+noticeTime+'</span>\n' +
                  '            </div>\n' +
                  '            <div style="width: 100%;height:6vh;line-height:5vh;position: relative;font-size:12px;font-family:PingFangSC-Regular,PingFang SC;font-weight:400;color:rgba(153,153,153,1);">\n' +
                  '                <span style="margin-left: 5vw; color: #67c23a;">已读：'+readed+'</span>\n' +
                  '                <span style="margin-left: 5vw; color: #e6a23c;">回复: '+commented+'</span>\n' +
                  '            </div>\n' +
                  '            <img src="./images/rightArrow.png" style="width: 5vw;height: 5vw;position: absolute;right: 4vw;top: 50%;transform: translateY(-50%);">\n' +
                  '        </div>';

              $('#noticeData').append(strcotent)
            }
          }

        }

      }else{
        $('#noticeData').html('')
        var str = '<div style="text-align:center;font-weight: bold;font-size: 16px;">暂无数据</div>';
        $('#noticeData').html(str)

      }


      //分页
      //var totalCount = data.page.totalCount;
      layui.use(['laypage', 'layer'], function(){
        var laypage = layui.laypage
            ,layer = layui.layer;

        //完整功能
        laypage.render({
          elem: 'demo7'
          ,count: totalCount
          ,limit: $('#pageSize').val()
          ,curr: $('#currentPage').val()
          ,layout: ['count', 'prev', 'next','skip']
          ,jump: function(obj, first){
            if(!first){
              $('#pageSize').val(obj.limit);
              $('#currentPage').val(obj.curr);
              initCommentIndexDataList();
            }
          }
        });

      });




    },
    error: function (XMLHttpRequest, textStatus, errorThrown) {
      alert("网络受限，请稍后重试");
    }
  })
}


//跳转到评论页面
function skipComment(noticeId,userId) {
  console.log("跳转",noticeId)
  window.location.href=`./comment.html?noticeId=`+noticeId+"&userId="+userId;
}

//搜索
function keywordClick() {
  var keyword = $('#keyword').val();
  console.log("搜索",keyword)
  initCommentIndexDataList();

}
