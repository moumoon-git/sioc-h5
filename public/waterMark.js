    setWatermark(localStorage.getItem('mobile'));
    window.onresize = () => {
        setWatermark(localStorage.getItem('mobile'));
    };

    function setWatermark(str) {
        if (document.getElementById("fixed-water-mark") !== null) {
            document.body.removeChild(document.getElementById("fixed-water-mark"));
        }
        var wrap = document.createElement("div");//创建一个div
        wrap.id = "fixed-water-mark";//给div添加类名
        var wm = document.createElement("canvas");//单个水印画布
        wm.id = "watermark";//给canvas标签添加id
        wm.width = 100;//设置canvas宽
        wm.height = 80;//设置canvas高
        wm.style.display = "none";//设置画布隐藏属性
        wrap.appendChild(wm);//在div中添加画布
        var rwm = document.createElement("canvas");//重复绘制水印画布，用于整个页面
        rwm.id = "repeat-watermark";
        wrap.appendChild(rwm);
        wrap.style.pointerEvents = "none";
        wrap.style.top = "0px";
        wrap.style.left = "0px";
        wrap.style.position = "fixed";
        wrap.style.zIndex = "100000";
        document.body.appendChild(wrap);
        //绘制单个水印
        var cw = document.getElementById('watermark');
        var ctx = cw.getContext("2d");
        ctx.clearRect(0, 0, 100, 80);//清空矩形
        ctx.font = "15px 黑体";//设置字体
        ctx.rotate(-20 * Math.PI / 180);//逆时针旋转20度
        ctx.fillStyle = "rgba(100,100,100,0.2)";//填充透明度为0.2的灰色
        ctx.fillText(str, -10, 60);//填充内容为工号
        //在另一个画布上重复绘制单个水印
        var crw = document.getElementById('repeat-watermark');
        crw.width = window.innerWidth;//设置画布宽度等于窗口显示宽度
        crw.height = window.innerHeight;//设置画布高度等于窗口显示高度
        var ctxr = crw.getContext("2d");
        ctxr.clearRect(0, 0, crw.width, crw.height);
        var pat = ctxr.createPattern(cw, "repeat");//在水平和垂直方向重复绘制单个水印
        ctxr.fillStyle = pat;
        ctxr.fillRect(0, 0, crw.width, crw.height);
    }