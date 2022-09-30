$(function(){

	//获取平台类型
	let type = getQueryString("type");
	let platformId = getQueryString("platformId");
	let alarmId = getQueryString("alarmId");
	let id = getQueryString("id");

	$('#type').val(type);
	$('#platformId').val(platformId);
	$('#alarmId').val(alarmId);

	//联系人
	getContactorByPlatformId(platformId);

	//抓拍信息
	captureInfo(platformId,alarmId,type,id);

	//提示
	var layer;
	layui.use(['laypage', 'layer'], function() {
		layer = layui.layer;
	});

});

//通过id，获取人员抓拍信息
//通过id，获取车辆抓拍信息
function captureInfo(platformId,alarmId,type,id) {
	$.ajax({
		async: true,
		type: "GET",
		url: SERSVER_BASE_URL + "/wechatMobile/captureInfo",
		data: {
			platformId: platformId,
			alarmId: alarmId, //报警id
			type: type,
			id: id //信息id
			,
		},
		dataType: "json",
		success: function (res) {
			console.log("captureInfocaptureInfo",res);
			if(res.code == 0){
				if(type == 3){
					let facePicUrl = res.alarm.facePicUrl;
					let bkgPicUrl = res.alarm.bkgPicUrl;
					let str = '<img onclick="imgDisplay(this)" src="'+SERSVER_BASE_HOME+facePicUrl+'" alt=""  style="width: 45%; height: 100px; border: 1px solid rgb(0, 145, 255);">\n' +
						'<img onclick="imgDisplay(this)" src="'+SERSVER_BASE_HOME+bkgPicUrl+'" alt="" style="width: 45%; height: 100px; border: 1px solid rgb(0, 145, 255);">';

					$('#vehicleHumanImg').html('');
					$('#vehicleHumanImg').html(str);

					//赋值
					$('#pics').val(facePicUrl+","+bkgPicUrl);
					$('#eventPosition').val(res.alarm.cameraName);
					$('#eventDescription').val(res.info.humanName+"-"+res.info.listLibName);
					$('#eventTypeName').val(res.info.listLibName);

				}else if(type == 4){
					let picPlate = res.alarm.picPlate;
					let picAbbreviate = res.alarm.picAbbreviate;
					let status = formatterCarStatus(res.alarm.type);

					let str = '<img onclick="imgDisplay(this)" src="'+SERSVER_BASE_HOME+picPlate+'" alt=""  style="width: 45%; height: 100px; border: 1px solid rgb(0, 145, 255);">\n' +
						'<img onclick="imgDisplay(this)" src="'+SERSVER_BASE_HOME+picAbbreviate+'" alt="" style="width: 45%; height: 100px; border: 1px solid rgb(0, 145, 255);">';

					$('#vehicleHumanImg').html('');
					$('#vehicleHumanImg').html(str);

					//赋值
					$('#pics').val(picPlate+","+picAbbreviate);
					$('#eventPosition').val(res.info.name);
					$('#eventDescription').val("车辆预警-"+res.alarm.plateInfo);
					$('#eventTypeName').val(status);
				}

			}else{
				$('#pics').val("");
				$('#eventPosition').val("");
				$('#eventDescription').val("");
				$('#eventTypeName').val("");
			}

		}
	});
}


//通过平台，获取联系人，分页
function getContactorByPlatformId(platformId) {
	$.ajax({
		async: true,
		type: "GET",
		url: SERSVER_BASE_URL + "/wechatMobile/getContactorByPlatformId",
		data: {
			platformId: Number(platformId),
            
		},
		dataType: "json",
		success: function (res) {
			console.log("getContactorByPlatformId",res);
			var tag_data = [];
			if(res.code == 0){
				tag_data = res.list;
			}

			$('#selectPage').bSelectPage({
				showField : 'name',
				keyField : 'id',
				data : tag_data
			});

		}
	});
}



//提交派单
function save() {
	let type = $('#type').val();
	let platformId = $('#platformId').val();
	let alarmId =  $('#alarmId').val();
	let pic = $('#pics').val();
	let position = $('#eventPosition').val();
	let description = $('#eventDescription').val();
	let typeName = $('#eventTypeName').val();
	let textarea = $('#textarea').val();
	let selectPageId = $('#selectPage').val();  //联系人id
	let selectPageText = $('#selectPage_text').val();  //联系人名称

	if(!textarea){
		layer.msg('请填写内容!!!',{
			time: 1500 //2秒关闭（如果不配置，默认是3秒）
		});
		return;
	}


	if(!selectPageId){
		layer.msg('请选择联系人!!!',{
			time: 1500 //2秒关闭（如果不配置，默认是3秒）
		});
		return;
	}


	let data = {
		platformId: platformId,
		contactorName: selectPageText,
		performTaskContactorId: selectPageId,
		imageUrl: pic,
		eventDescription: textarea,
		title: description,
		eventTypeName: typeName,
		alarmId: alarmId,
		flagType: type,
		eventPosition: position
	};



	$.ajax({
		async: true,
		type: "POST",
		contentType: 'application/json;charset=utf-8',
		url: SERSVER_BASE_URL + "/weChatHandleTask/monitoringSendSingle",
		data: JSON.stringify({
			...data,
            
		}),
		dataType: "json",
		success: function (data) {
			console.log(data);
			if(data.code == 0){
				layer.msg('派单成功',{
					time: 1500 //2秒关闭（如果不配置，默认是3秒）
				});

			}else{
				layer.msg('派单失败',{
					time: 1500 //2秒关闭（如果不配置，默认是3秒）
				});

			}

			//禁用
			$('#submitBtn').attr('disabled',"true");

			setTimeout(()=>{
				parent.location.reload()();
			},2000);



		}
	});

}

//重置
function reset() {
	$('#pics').val('');
	$('#eventPosition').val('');
	$('#eventDescription').val('');
	$('#eventTypeName').val('');
	$('#textarea').val(''); //内容
	$('#selectPage').val('');
	$('#selectPage_text').val('')
}


function formatterCarStatus(carType){
	switch (Number(carType)){
		case 0:carType = '其它车型';
			break;
		case 1:carType = '客车';
			break;
		case 2:carType = '货车';
			break;
		case 3:carType = '轿车';
			break;
		case 4:carType = '面包车';
			break;
		case 5:carType = '小货车';
			break;
		case 6:carType = '行人';
			break;
		case 7:carType = '二轮车';
			break;
		case 8:carType = '三轮车';
			break;
		case 9:carType = 'SUV/MPV';
			break;
		case 10:carType = '中型客车';
			break;
		default:carType = "其他";
	}

	return carType;
}


// 获取地址栏参数
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


//图片灯箱
function imgDisplay(obj) {

	var src = $(obj).attr("src");

	var imgHtml = '<div style="width: 100%;height: 100vh;overflow: auto;background: rgba(0,0,0,0.5);text-align: center;position: fixed;top: 0;left: 0;z-index: 1000;">' +
		'<img src=' + src + ' style="margin-top: 100px;width: 70%;margin-bottom: 100px;"/>' +
		'<p style="font-size: 50px;position: fixed;top: 30px;right: 30px;color: white;cursor: pointer;" onclick="closePicture(this)">×</p>' +
		'</div>';
	$('body').append(imgHtml);
}

//关闭图片
function closePicture(obj) {
	$(obj).parent("div").remove();
}


