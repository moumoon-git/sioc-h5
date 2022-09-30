/*
 * @Author: yaoweixin
 * @Date: 2020-10-13 11:42:43
 * @LastEditors: yaoweixin
 * @LastEditTime: 2020-10-13 14:55:32
 * @Description: 获取banner标题
 * @FilePath: \luoYangRpt\assets\js\getBannerTitle.js
 */

/**
 * @description: 
 * @param {type} params
 * @return {type} 
 */
function getBannerTitle(className,key) {
    $.ajax({
        type: "get",
        url: SERSVER_BASE_URL+`/sys/config/infoByKey?key=${key}`,
        dataType: "json",
        data: {
            
        },
        success: function (data) {
          console.log("从后台获取得banner标题为",data);
          document.getElementsByClassName(className)[0].innerHTML = data.config.paramValue

        }
      })
}