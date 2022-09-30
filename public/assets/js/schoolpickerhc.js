function citypicker(){
    $('.citybox').empty();
    $(".indexBar").empty();

    //console.log(LSchoolData);
	//console.log(JSON.stringify(LSchoolData,null," "))
	var cityindex = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];

	//打印城市
	for(var e = 0;e<cityindex.length;e++){

		var $cityindex = "<div" + " "+ "num =" + cityindex[e] +">"+"<h1 class = 'cityindex'"+" " + " "+"hidden>" + cityindex[e]  +"</h1>" + "</div>";
		var $creatindex = "<a"+" "+" style = 'display:none;'>"+cityindex[e]+"</a>";

		$('.citybox').append($cityindex);
		$(".indexBar").append($creatindex);
		for(var i = 0;i<LSchoolData.length;i++){

			if(LSchoolData[i].enName.substring(0, 1)==cityindex[e]){
				var $creatcity = "<p style='font-size: 15px' id='"+LSchoolData[i].id+"' attr='"+LSchoolData[i].platformName+"' class = 'cityper'"+ "name = '" +LSchoolData[i].enName.toLowerCase()+"'" +" "+"text='"+ LSchoolData[i].platformName+"'"+">" + LSchoolData[i].platformName + "</p>";
				$(".cityindex").eq(e).show();
				$(".indexBar a").eq(e).show();
				$(".cityindex").eq(e).after($creatcity);
			}
		}
	}
	$(".touchcity").show();

		//选择城市
		$(".cityper").click(function(){

            $('#applicationId').val($(this).attr("id"));
            $("#applicationName").val($(this).attr("attr"));

			$("#cityname").text($(this).text());
			$(".touchcity").hide()
		})
		//导航触摸滑动
		$(".indexBar").on("touchmove", function (e) {
            e.preventDefault();
            var touch = e.originalEvent.touches[0];
            var pos = {"x": touch.pageX, "y": touch.pageY};
            var x = pos.x, y = pos.y;
            $(this).addClass("active");
            $(this).find("a").each(function (i, item) {
                var offset = $(item).offset();
                var width = $(this).width();
                var height = $(this).height();
                var left = offset.left, top = offset.top;
                if (x > left && x < (left + width) && y > top && y < (top + height)) {
                	var letter = $(item).text();
                    $(".locate").show();
                    $(".locate").html(letter);
                    $(".citybox>div").hide();
                    $(".citybox>div[num="+letter+"]").show()
                }
            });
        });
        //触摸结束
        $(".indexBar").on("touchend",function(){
        	$(this).removeClass("active");
        	$(".locate").hide();
        })
        //直接点击
		$(".indexBar a").click(function(){
			$(".citybox>div").hide();
            $(".citybox>div[num="+$(this).text()+"]").show()
		})
		//城市搜索
		$("#cityipt").keyup(function(){
			var myvalue = $(this).val();
			if(myvalue!==""){
				$(".cityindex").hide();
				$(".cityper").hide();
				$(".cityper[name*="+myvalue+"]").show();
				$(".cityper[text*="+myvalue+"]").show()
			}else{
				$(".cityindex").show();
				$(".cityper").show();
			}
		})



}
