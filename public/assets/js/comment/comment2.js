$(function () {

    //获取url的通知noticeId,userId
    var noticeId = getQueryString("noticeId");
    var userId =getQueryString("userId");

    //初始化数据
    $('#noticeId').val(noticeId);
    $('#userId').val(userId);

    //判断是否已读
    judgeIsRead(noticeId, userId);

    //通过公告id获取该条评论的已读者、已收件者、还有评论列表
    selectNoticeById(noticeId);


});

//判断是否已读
function judgeIsRead(noticeId, userId) {
    $.ajax({
        async: true,
        type: "GET",
        url: SERSVER_BASE_URL + "/notice/noticerecord/selectListByNoticeIdUserId",
        data: {
            "noticeId": noticeId,
            "userId": userId,
            
        },
        dataType: "json",
        success: function (data) {

            console.log("/notice/noticerecord/selectListByNoticeIdUserId",data)

        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert("网络异常！");
        }

    });
}

function selectNoticeById(noticeId){
    $.ajax({
        async: true,
        type: "GET",
        url: SERSVER_BASE_URL + "/notice/noticemanagement/noticeById",
        data: {
            "noticeId": noticeId,
            
        },
        dataType: "json",
        success: function (data) {
            console.log("/notice/noticemanagement/noticeById",data.data)
            //平台名称
            var platformNameStr;

            if(data.data.sysPlatformEntity != null){
                platformNameStr = data.data.sysPlatformEntity.platformName;
            }else{
                platformNameStr = "其他";
            }

            //距离时间
            var distanceCurrentTime = data.data.distanceCurrentTime;

            //已读数量
            var readCount = data.data.noticeContactorReadList.length;

            //标题
            var title = data.data.title;

            //发布时间
            var createTime = data.data.createTime;
            //内容
            var content = data.data.content;
            //收件者
            var receiveListStr = data.data.receiveListStr;
            //已读者
            var readListStr = data.data.readListStr;

            //评论列表
            var commentList = data.data.noticeCommentEntityList;


            //清空
            $('#noticeContent').html('');

            var noticeContent = '';

            noticeContent += '<div class="infos panel-heading">';
            noticeContent += '<h1 class="panel-title topic-title">'+title+'</h1>';
            noticeContent += '<div class="meta inline-block">';
            noticeContent += '<a class="author">'+platformNameStr+'</a>';
            noticeContent += '<abbr class="timeago">'+distanceCurrentTime+'</abbr>\n';
            noticeContent += '<abbr>⋅ '+readCount+' 阅读</abbr>';
            noticeContent += '</div><div class="clearfix"></div>';
            noticeContent += '</div>';

            noticeContent += '<div class="content-body entry-content panel-body ">';
            noticeContent += '<div class="markdown-body">';
            noticeContent += '<p>'+content+'</p>';
            noticeContent += '</div>';
            noticeContent += '<div class="copyright">';

            if(receiveListStr){
                noticeContent += '<p>收件人：'+receiveListStr+'</p>';
            }

            if(readListStr){
                noticeContent += '<p>已读人：'+readListStr+'</p>';
            }

            noticeContent += '</div></div>';

            $('#noticeContent').html(noticeContent);


            //评论头部
            $('#chat_header').html('');
            var comentHeader = '<h4>全部评论: <span id="chat_count">'+commentList.length+'</span> 条</h4>';
            $('#chat_header').html(comentHeader);

            //评论列表
            $('#chat_container').html('');

            var commentContent = '';
            for(var i=0; i<commentList.length; i++){

                //标识id
                var flag = "chat"+commentList[i].id;
                //图片
                var imgStr = commentList[i].imageUrl;
                var imagArray = [];

                if (imgStr != null && imgStr != "") {
                    if(imgStr.indexOf(",")){
                        //说明有多张图片
                        imagArray = imgStr.split(",");
                    }else{
                        //一张图片
                        imagArray.push(imgStr)
                    }
                }else{
                    //没有图片
                    imagArray = [];
                }


                if(commentList[i].parentId !=0 ){

                    //不为空是回复模板
                    commentContent += '<li id="'+flag+'">';
                    commentContent += '<a class="avt fl" target="_blank">'
                    commentContent += '<img src="./images/person1.png">';
                    commentContent += '</a>';
                    commentContent += '<div class="chat_body">';
                    commentContent += '<h5>';
                    commentContent += '<div class="fl"><a class="chat_name">'+commentList[i].fromUname+'</a>';
                    commentContent += '<span>'+commentList[i].createTime+'</span></div>';
                    commentContent += '<div class="fr reply_this">';
                    commentContent += '<a href="javascript:void(0);" onclick=goto("'+commentList[i].id+'","'+commentList[i].fromUname+'")>';
                    commentContent += '<i class="icon icon-action-redo"></i></a></div>';
                    commentContent += '<div class="clear"></div>';
                    commentContent += '</h5>';
                    commentContent += '<div class="chat_p">';
                    commentContent += '<div class="chat_pct">'+commentList[i].content+'</div> ';
                    for(var j=0; j<imagArray.length; j++){
                        var img = SERSVER_BASE_HOME + imagArray[j];
                        commentContent += '<img onclick="imgDisplay(this)" src=' + img + ' style="width: 80px;height: 90px;margin-top:8px;margin-left:5%"/>';
                    }
                    commentContent += '<div class="quote"><a>@'+commentList[i].fromUname2+'</a>:'+commentList[i].content2+'</div>';
                    commentContent += '</div>';
                    commentContent += '</div>';
                    commentContent += '<div class="clear"></div>';
                    commentContent += '<div class="chat_reply"></div>';
                    commentContent += '</li>';

                }else{
                    //标识评论
                    var comentFlag = "chat"+commentList[i].id;
                    //为空是评论模板
                    commentContent += '<li id="'+comentFlag+'">';
                    commentContent += '<a class="avt fl" target="_blank">';
                     commentContent += '<img src="./images/person1.png">\n';
                     commentContent += '</a>';
                     commentContent += '<div class="chat_body">';
                     commentContent += '<h5>';
                     commentContent += '<div class="fl"><a class="chat_name">'+commentList[i].fromUname+'</a>';
                     commentContent += '<span>'+commentList[i].createTime+'</span></div>';
                     commentContent += '<div class="fr reply_this"><a href="javascript:void(0);" onclick=goto("'+commentList[i].id+'","'+commentList[i].fromUname+'")>';
                     commentContent += '<i class="icon icon-action-redo"></i></a></div>';
                     commentContent += '<div class="clear"></div>';
                     commentContent += '</h5>';
                     commentContent += '<div class="chat_p">';
                     commentContent += '<div class="chat_pct">'+commentList[i].content+'</div>';
                     for(var j=0; j<imagArray.length; j++){
                         var img = SERSVER_BASE_HOME + imagArray[j];
                         commentContent += '<img onclick="imgDisplay(this)" src=' + img + ' style="width: 80px;height: 90px;margin-top:8px;margin-left:5%"/>';
                     }
                     commentContent += '</div></div>';
                     commentContent += '<div class="clear"></div>';
                     commentContent += '<div class="chat_reply"></div>';
                     commentContent += '</li>';

                }


                $('#chat_container').html(commentContent);
            }


        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert("网络异常！");
        }

    });


}

//点击转发
function goto(pid, user) {
    document.getElementById('chat_text').scrollIntoView();
    $('#chat_text').focus();
    $('#chat_text').val('');
    $('#chat_to').text(user);
    $('#chat_pid').val(pid);

    $('#chat_reply').show();

    //清空原先图片
    $('#imgs').val('');
    $('#pics').html('');

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
            //var mediaName ="cm"+ (res.fileName).substr(0,res.fileName.lastIndexOf("."));
            var mediaName = res.fileName.substring(res.fileName.lastIndexOf("/")+1,res.fileName.lastIndexOf("."));

            divContent = "<div id='"+mediaName+"' class='imgContainer'>" +
                "<img title='"+mediaName+"' alt='"+mediaName+"' style='height: 80px;width: 90px;' src='"+filePath+"' onclick=\"imgDisplay(this)\" />" +
                "<p onclick=\"removeImg('"+this+"','"+mediaName+"')\" class=\"imgDelete\" style='display: block'>删除</p>" +
                "</div>" + divContent;

            $('#pics').html(divContent);

        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert("err:::" + errorThrown);
        }
    });
}

//点击上传图片按钮
function takeMobilePicture() {
    var file = $("#uplaodMobileImageBtn")[0].files[0];
    console.log("点击上传图片按钮",file)
    let files = compressFile(file,upFileImg)
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
            data = canvas.toDataURL('image/jpeg') // 输出压缩后的base64
            let arr = data.split(','), mime = arr[0].match(/:(.*?);/)[1], // 转成blob
                bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
            while (n--) {
                u8arr[n] = bstr.charCodeAt(n);
            }
            let files = new window.File([new Blob([u8arr], {type: mime})], 'test.jpeg', {type: 'image/jpeg'}) // 转成file
            callback(files) // 回调
        }
    }
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

//删除
function removeImg(obj, index) {
    console.log("点击删除按钮")

    //询问框
    layer.confirm('您确定要删除此图片吗？', {
        btn: ['确定','取消'] //按钮
    }, function(data){
        //点击右侧按钮：失败
        removeImgOperation(index);
        layer.close(data);
    }, function(data){
        //点击左侧按钮：成功
        layer.close(data);
        return false;
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

//关闭
function closePicture(obj) {
    $(obj).parent("div").remove();
}


//提交
function sendComment() {

    if ($('#chat_text').val().length == 0) {
        layer.msg('请输入内容再提交!', {icon: 2});
        return false;
    }
    if ($('#chat_text').val().length > 255) {
        layer.msg('内容过长，请输入140以内个字符', {icon: 2});
        return false;
    }



    var comment = {
        "parentId": $('#chat_pid').val(),
        "fromUid": $('#userId').val(),
        "noticeId": $('#noticeId').val(),
        "content": $('#chat_text').val(),
        "toUname": $('#chat_to').text(),
        "imageUrl": $('#imgs').val()
    };

    $.ajax({
        async: false,
        type: "POST",
        contentType: 'application/json;charset=utf-8',
        url: SERSVER_BASE_URL + "/notice/noticecomment/save",
        data: JSON.stringify({
            ...comment,
            
        }),
        dataType: "json",
        success: function (data) {
            console.log("data",data)
            if(data.code === 0){
                //layer.msg("发表成功", {icon: 1});
                //alert("发表成功");
                layer.alert('发表成功', {
                    skin: 'layui-layer-lan' //样式类名
                    ,closeBtn: 0
                }, function(){
                    $('#chat_text').val('');
                    $('#chat_reply').hide();
                    $('#chat_pid').val('0');

                    //清空原先图片
                    $('#imgs').val('');
                    $('#pics').html('');

                    window.location.reload();
                });



            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert("网络异常！");
        }
    })
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


//点击返回
function gobackClick(){
    console.log("点击返回")
    window.location.href=`./commentIndex.html`;
}
