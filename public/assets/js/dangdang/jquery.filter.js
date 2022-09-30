//最大页码数
var pageSize;
$(function () {

	/*动态初始化搜索条件*/
	initTypeSearchCondition();

	/*请求列表数据*/
	getOperationList();

	/**筛选**/
	/*进入筛选*/
	$("#headerFiltrate").click(function () {
		$("#header").hide();
		$("#filtratePage").show();
	});

	// 上一页点击事件
	$("#pageBefore").click(function () {
		if (parseInt($("#pageNumber").text()) == 1) {
			//如果当前是第一页，则不执行后面操作
			alert("当前已经是第一页了")
			return;
		}
		var getNumber = parseInt($("#pageNumber").text()) - 1;
		$("#pageNumber").text(getNumber);
		//根据页数请求数据
		getOperationList();
	});

	//下一页点击事件
	$("#pageNext").click(function () {
		if (parseInt($("#pageNumber").text()) == pageSize) {
			//如果当前是最后一页，则不执行后面操作
			alert('当前已经是最后一页了');
			return;
		}
		var getNumber = parseInt($("#pageNumber").text()) + 1;
		$("#pageNumber").text(getNumber);
		//根据页数请求数据
		getOperationList();
	});

	/*选择分类=======工单状态*/
	var classifyHeight, classifyListHeight, classify = $(".filtrate-classify-list li.active>a").html();
	$(".filtrate-classify-list li a").click(function () {
		$(".filtrate-classify-list li").removeClass("active");		//取消其他分类的选中状态
		$(this).parent("li").addClass("active");						//给被点击分类标记选中状态
		$(this).next("ul").find("ul").hide();						//关闭被点击分类的孙分类
		$(this).parent("li").siblings("li").children("ul").hide();	//关闭父分类其他同等级类的子分类
		$(this).next("ul").show();									//显示被点击分类的子分类
		classify = $(this).html();									//获取被选中的分类值
		classifyHeight = parseInt($(".filtrate-classify").css("height"));			//获取分类盒子的高度
		classifyListHeight = parseInt($(".filtrate-classify-list").css("height"));//获取分类列表的高度

		if (classifyHeight != classifyListHeight) {								//盒子高度与列表高度不同
			$("#classify").addClass("show");
			$("#classify a span").html("收起");									//显示为可收起
			$(".filtrate-classify").animate({ height: classifyListHeight });		//展开或收起盒子
		}

	});
	/*收起&展开分类*/
	$("#classify a").click(function () {
		var classifyState = $(this).find("span").html();
		classifyHeight = parseInt($(".filtrate-classify").css("height"));			//获取分类盒子的高度
		classifyListHeight = parseInt($(".filtrate-classify-list").css("height"));//获取分类列表的高度
		if (classifyState != "收起" && classifyHeight != classifyListHeight) {//展开分类
			$("#classify").addClass("show");
			$("#classify a span").html("收起");
			$(".filtrate-classify").animate({ height: classifyListHeight });
		} else if (classifyState == "收起") {//收起分类
			$("#classify").removeClass("show");
			if (classify != "") {//已选分类
				$("#classify a span").html(classify);
			} else {//未选分类
				$("#classify a span").html("展开");
			}
			$(".filtrate-classify").animate({ height: 0 });
		}
	});
	/*选择收货地==========工单类型*/
	var address = "";
	$(".filtrate-address li a").click(function () {
		var addressLi = $(this).parent("li");
		var addressState = addressLi.hasClass("active");
		if (addressState == true) {
			addressLi.removeClass("active");
			address = "";
		} else {
			addressLi.addClass("active").siblings("li").removeClass("active");
			address = $(this).html();
		}
	});
	/*收起&展开收货地区*/
	$("#address a").click(function () {
		var categoryState = $(this).find("span").html();
		var addressHeight = $(".filtrate-address ul").css("height");
		if (categoryState != "收起") {//展开收货地区
			$("#address").addClass("show");
			$("#address a span").html("收起");
			$(".filtrate-address").animate({ height: addressHeight });
		} else {//收起收货地区
			$("#address").removeClass("show");
			if (address == "") {//未选收货地
				address = "全部";
			}
			$("#address a span").html(address);
			$(".filtrate-address").animate({ height: 0 });
		}
	});


	/*第一个时间插件====起始时间*/
	new Jdate({
		el: '#date-group1-1',
		format: 'YYYY-MM-DD',
		beginYear: 2000,
		endYear: 2022
	});

	/*第二个时间插件====结束时间*/
	new Jdate({
		el: '#date-group1-2',
		format: 'YYYY-MM-DD',
		beginYear: 2000,
		endYear: 2022,
		confirm: function (date) {

			var d = $('#date-group1-1').val();

			if (d) {
				var d1 = new Date(date.replace(/\-/g, "\/"));

				var d2 = new Date(d.replace(/\-/g, "\/"));

				if (d1 < d2) {
					alert('不能小于起始日期');
					return false;
				}
			} else {
				alert("请先选择起始日期");
				return false;
			}


		}
	})

	/*清空筛选条件*/
	$(".filtrate-reset").click(function () {
		/*清空分类*/
		//$("#classify").removeClass("show");
		//$("#classify a span").html("收起");
		//$(".filtrate-classify-list li:first-child>a").addClass("active");
		//classify = $(".filtrate-classify-list li.active>a").html();

		$(".filtrate-classify-list li").removeClass("active");
		$(".filtrate-classify-list li:first-child").addClass("active");
		classify = $(".filtrate-classify-list li.active>a").html();

		//$(".filtrate-classify-list>li").addClass("active");
		//$(".filtrate-classify-list li ul li ul").hide();
		/*收起分类*/
		//classifyHeight = parseInt($(".filtrate-classify").css("height"));
		//if (classifyHeight > 0) {
		//$(".filtrate-classify").animate({height: 0});
		//}

		/*清空价格*/
		//$("#minPrice, #maxPrice").val("");

		/*清空收货地*/
		//$("#address").removeClass("show");
		//$("#address a span").html("展开");
		address = "";
		/*收起收货地*/
		//var addressBoxHeight = parseInt($(".filtrate-address ul").css("height"));
		//if (addressBoxHeight > 0) {
		//$(".filtrate-address").animate({height: 0});
		//}
		/*清空已选收货地*/
		$(".filtrate-address ul li").removeClass("active");

		//清空时间
		$('#date-group1-1').val('');
		$('#date-group1-2').val('');

	});
	/*从筛选返回主体页面*/
	$("#filtrateBackContains, .filtrate-submit").click(function () {
		$("#header").show();
		$("#filtratePage").hide();

		//工单类型
		//alert("工单类型,"+address);

		//工单状态
		//alert("工单状态，"+classify);

		//工单时间
		//var startTime = $('#test31').val();
		//var endTime = $('#test32').val();

		//alert("工单起始时间"+startTime);
		//alert("工单结束时间"+endTime);

		var disposeFlag = null;
		var forwardFlag = null;
		var examineFlag = null;
		var status = null;
		var flagType = null;
		var platformTypeId = null;
		var keyword = null;
		var isClickTransform = 0;
		switch (address) {
			case "疫情":
				//flagType = 5;
				//$('#flagType').val(flagType);
				platformTypeId = 5;
				$('#platformTypeId').val(platformTypeId);
				flagType = null;
				$('#flagType').val(0);
				break;
			case "市场":
				//flagType = 5;
				//$('#flagType').val(flagType);
				platformTypeId = 6;
				$('#platformTypeId').val(platformTypeId);
				flagType = null;
				$('#flagType').val(0);
				break;
			case "人员":
				flagType = 3;
				$('#flagType').val(flagType);
				platformTypeId = null;
				$('#platformTypeId').val(0);
				//platformTypeId = 3;
				//$('#platformTypeId').val(platformTypeId);
				break;
			case "车辆":
				flagType = 4;
				$('#flagType').val(flagType);
				platformTypeId = null;
				$('#platformTypeId').val(0);
				//platformTypeId = 3;
				//$('#platformTypeId').val(platformTypeId);
				break;
			case "监控":
				flagType = 6;
				$('#flagType').val(flagType);
				platformTypeId = null;
				$('#platformTypeId').val(0);
				//platformTypeId = 3;
				//$('#platformTypeId').val(platformTypeId);
				break;
			default:
				platformTypeId = null;
				flagType = null;
				$('#platformTypeId').val(0);
				$('#flagType').val(0);
				break;
		}


		switch (classify) {
			case "驳回":
				examineFlag = 2;
				isClickTransform = 0;
				$('#isClickTransform').val(isClickTransform);
				$('#examineFlag').val(examineFlag);
				disposeFlag = null;
				forwardFlag = null;
				status = null;
				$('#disposeFlag').val(0);
				$('#status').val(0);
				break;
			case "待处理":
				disposeFlag = 1;
				isClickTransform = 0;
				$('#isClickTransform').val(isClickTransform);
				$('#disposeFlag').val(disposeFlag);
				examineFlag = null;
				forwardFlag = null;
				status = 3;
				$('#examineFlag').val(0);
				$('#status').val(3);
				break;
			case "处理中":
				status = 4;
				isClickTransform = 0;
				$('#isClickTransform').val(isClickTransform);
				$('#status').val(status);
				disposeFlag = null;
				examineFlag = null;
				forwardFlag = null;
				$('#examineFlag').val(0);
				$('#disposeFlag').val(0);
				break;
			case "已处理":
				disposeFlag = 2;
				isClickTransform = 0;
				$('#isClickTransform').val(isClickTransform);
				$('#disposeFlag').val(disposeFlag);
				examineFlag = null;
				forwardFlag = null;
				status = 5;
				$('#examineFlag').val(0);
				$('#status').val(5);
				break;
			case "已转发":
				forwardFlag = 2;
				isClickTransform = 1;
				$('#isClickTransform').val(isClickTransform);
				$('#forwardFlag').val(forwardFlag);
				examineFlag = null;
				disposeFlag = null;
				status = null;
				$('#examineFlag').val(0);
				$('#disposeFlag').val(0);
				$('#status').val(0);
				break;
			case "超出范围":
				status = 6;
				isClickTransform = 0;
				$('#isClickTransform').val(isClickTransform);
				$('#status').val(status);
				examineFlag = null;
				disposeFlag = null;
				forwardFlag = null;
				$('#examineFlag').val(0);
				$('#disposeFlag').val(0);
				break;
			default:
				examineFlag = null;
				disposeFlag = null;
				forwardFlag = null;
				status = null;
				$('#examineFlag').val(0);
				$('#disposeFlag').val(0);
				$('#status').val(0);
				isClickTransform = 0;
				$('#isClickTransform').val(isClickTransform);
				break;
		}

		//调用
		getOperationList();

	});


});

/*动态加载请求类型搜索条件*/
function initTypeSearchCondition() {

	$.ajax({
		async: false,
		type: "get",
		url: SERSVER_BASE_URL + "/weChatHandleTask/getPlatformByOpenId",
		data: {
			'openId': localStorage.getItem('openId'),

		},
		dataType: "json",
		success: function (data) {
			console.log("weChatHandleTask/getPlatformByOpenId", data);

			if (data.sysPlatformEntity != null && data.mailContactorEntity != "") {

				var platformTypeId = data.sysPlatformEntity.platformTypeId;

				if (platformTypeId === 5) {
					//小区
					$('#search-condition-type').html('');
					var strContent = '';
					strContent += '<li><a href="javascript:void(0)">预警信息</a></li>';
					$('#search-condition-type').html(strContent);

				} else if (platformTypeId === 6) {
					//学校
					$('#search-condition-type').html('');
					var strContent = '';
					strContent += '<li><a href="javascript:void(0)">预警信息</a></li>';
					$('#search-condition-type').html(strContent);

				} else if (platformTypeId === 3) {
					//镇街
					$('#search-condition-type').html('');
					var strContent = '';
					strContent += '<li><a href="javascript:void(0)">人员</a></li>';
					strContent += '<li><a href="javascript:void(0)">监控</a></li>';
					strContent += '<li><a href="javascript:void(0)">预警信息</a></li>';
					strContent += '<li><a href="javascript:void(0)">风险排查</a></li>';
					$('#search-condition-type').html(strContent);

				} else {
					$('#search-condition-type').html('');
					var strContent = '';
					strContent += '<li><a href="javascript:void(0)">人员</a></li>';
					strContent += '<li><a href="javascript:void(0)">监控</a></li>';
					strContent += '<li><a href="javascript:void(0)">预警信息</a></li>';
					strContent += '<li><a href="javascript:void(0)">风险排查</a></li>';
					$('#search-condition-type').html(strContent);
				}
			}
		},
		error: function (XMLHttpRequest, textStatus, errorThrown) {
			alert("网络受限");
		}

	});
}



/*请求数据*/
function getOperationList() {
	var startTime = $('#date-group1-1').val();
	var endTime = $('#date-group1-2').val();

	if (startTime) {
		startTime = startTime + " 00:00:00";
	}
	if (endTime) {
		endTime = endTime + " 23:59:59";
	}
	$.ajax({
		async: false,
		type: "POST",
		url: SERSVER_BASE_URL + "/wechatMobile/selectOperationListByCondition",
		data: {
			forwardFlag: $('#isClickTransform').val() == 1 ? $('#forwardFlag').val() : 0,
			disposeFlag: $('#disposeFlag').val(),
			processFlag: null,
			confirmFlag: null,
			status: $('#status').val(),
			examineFlag: $('#examineFlag').val(),
			flagType: $('#flagType').val(),
			platformTypeId: $('#platformTypeId').val(),
			keyword: $('#keyword').val().trim(),
			startTime: startTime,
			endTime: endTime,
			page: $("#pageNumber").text(),
			limit: 20,
			openId: localStorage.getItem('openId'),
		},
		dataType: "json",
		success: function (data) {

			console.log('/wechatMobile/selectOperationListByCondition', data);
			var element = data.list.list;
			pageSize = data.list.pageSize; //获取最大页码数
			$('#wordContent').html('');

			var strContent = '';

			if (element.length > 0) {
				for (var i = 0; i < element.length; i++) {
					//图片路径
					var imgUrl = element[i].eventInfoEntity.imageUrl
						?
						(
							element[i].eventInfoEntity.imageUrl.split(',')[0].substring(0, 4) === 'http'
								? element[i].eventInfoEntity.imageUrl.split(',')[0]
								: SERSVER_BASE_HOME + element[i].eventInfoEntity.imageUrl.split(',')[0]
						)
						: "https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png";

					//跳转路径
					var url = "#";
					if (element[i].disposeFlag === 1 || element[i].disposeFlag === 6) {
						//未处理，跳转到处理
						url = element[i].operationUrl;
					} else {
						//已处理，跳转到查看历史记录
						url = "./historicalRecord2.html?eventInfoId=" + element[i].eventInfoId;
					}


					strContent += '<li onclick="location.href=\'' + url + '\'" style="display: flex;align-items:center;position: relative;">';
					strContent += '<img src="' + imgUrl + '" style="width:40px;height:40px;margin-left: 20px;">';
					strContent += '<div style="margin-left: 10px;height: 60px;position: relative;">';
					strContent += '<span style="position: absolute;top: 15%;white-space: nowrap;font-weight: bold;">' + element[i].eventInfoEntity.eventTypeName + '</span>';
					strContent += '<span style="position: absolute;bottom: 15%;color: gray;white-space: nowrap;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;width:100px;">' + element[i].eventInfoEntity.eventDescription + '</span>';
					strContent += '</div>';
					// strContent += '<span style="position: absolute;right: 32%;">' + (element[i].eventInfoEntity.status == '1' ? '待核实' : (element[i].eventInfoEntity.status == '2' ? '核实中' : (element[i].eventInfoEntity.status == '3' ? '待处理' : (element[i].eventInfoEntity.status == '4' ? '处理中' : (element[i].eventInfoEntity.status == '5' ? '已处理' : (element[i].eventInfoEntity.status == '6' ? '超出范围' : '已关闭')))))) + '</span>';
					strContent += '<span style="position: absolute;right: 32%;">' + (element[i].eventInfoEntity.status == '1' ? '待核实' : (element[i].eventInfoEntity.status == '2' ? '核实中' : (element[i].eventInfoEntity.status == '3' ? '待处理' : (element[i].eventInfoEntity.status == '4' ? '处理中' : (element[i].eventInfoEntity.status == '5' ? '已处理' : (element[i].eventInfoEntity.status == '6' ? '超出范围' : '已关闭')))))) + '</span>';
					strContent += '<span style="position: absolute;right: 5%;">' + element[i].eventInfoEntity.gmtCreate.substr(0, 10) + '</span>';
					strContent += '</li>';
				}

			} else {
				strContent += '<div style="margin-top:25px;text-align:center;color: #3181d2;"><h3>暂无数据!!!</h3></div>';
			}


			$('#wordContent').html(strContent);

		},
		error: function (XMLHttpRequest, textStatus, errorThrown) {
			alert("网络受限");
		}

	});
}


/*点击搜索*/
function searchKeyword() {
	console.log("keyword", $('#keyword').val());
	getOperationList();
}
