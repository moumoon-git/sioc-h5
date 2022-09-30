
$(function () {
    HWH5.getAuthCode().then(function (data) {
        console.log("获取到code的值",data.code);
        $("#code").val(data.code);
        initData(data.code);
    }).catch(function (error) {
        console.log('获取异常', error);
    });
});

//请求后台
function initData(code){
    $.ajax({
        async: false,
        type: "GET",
        url: SERSVER_BASE_URL + "/welink/getWeLinkUserInfo",
        data: {
            code:code,
            
        },
        success: function (data) {
            window.location.href = data.url;
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert("err:::" + errorThrown);
        }
    });
}

