/*
 * @Author: liukanglin
 * @Date: 2020-09-07
 * @Desc: 存放部分公共函数
 */

/**
 * @description: 按照双指手势缩放图片
 * @param {string} dom 传入需要放大的图片dom元素的ID
 * @return
 */
function scaleImage(dom) {
    var eleImg = document.querySelector('#' + dom);
    var store = {
        scale: 1
    };
    // 缩放事件的处理
    eleImg.addEventListener('touchstart', function (event) {
        var touches = event.touches;
        var events = touches[0];
        var events2 = touches[1];

        event.preventDefault();

        // 第一个触摸点的坐标
        store.pageX = events.pageX;
        store.pageY = events.pageY;

        store.moveable = true;

        if (events2) {
            store.pageX2 = events2.pageX;
            store.pageY2 = events2.pageY;
        }

        store.originScale = store.scale || 1;
    });
    document.addEventListener('touchmove', function (event) {
        if (!store.moveable) {
            return;
        }

        event.preventDefault();

        var touches = event.touches;
        var events = touches[0];
        var events2 = touches[1];
        // 双指移动
        if (events2) {
            // 第2个指头坐标在touchmove时候获取
            if (!store.pageX2) {
                store.pageX2 = events2.pageX;
            }
            if (!store.pageY2) {
                store.pageY2 = events2.pageY;
            }

            // 获取坐标之间的距离
            var getDistance = function (start, stop) {
                return Math.hypot(stop.x - start.x, stop.y - start.y);
            };
            // 双指缩放比例计算
            var zoom = getDistance({
                x: events.pageX,
                y: events.pageY
            }, {
                x: events2.pageX,
                y: events2.pageY
            }) /
                getDistance({
                    x: store.pageX,
                    y: store.pageY
                }, {
                    x: store.pageX2,
                    y: store.pageY2
                });
            // 应用在元素上的缩放比例
            var newScale = store.originScale * zoom;
            // 最大缩放比例限制
            if (newScale > 3) {
                newScale = 3;
            }
            // 记住使用的缩放值
            store.scale = newScale;
            // 图像应用缩放效果
            eleImg.style.transform = 'scale(' + newScale + ')';
        }
    });

    document.addEventListener('touchend', function () {
        store.moveable = false;

        delete store.pageX2;
        delete store.pageY2;
    });
    document.addEventListener('touchcancel', function () {
        store.moveable = false;

        delete store.pageX2;
        delete store.pageY2;
    });

}


/**
 * @description 加载转圈圈效果（使用时需要引入showLoading.css文件，同时添加遮罩层和遮罩层上用于展示元素）
 * @param {any} show 传入值为true则显示转圈效果，在需要关闭时传入值为false或者不传值
 * @param {any} over 传入遮罩层的id值，如果不传则默认为over
 * @param {any} layout 传入遮罩层上元素的id值，如果不传则默认为layout
 * @return
 *  示范遮罩层和遮罩层上元素的HTML代码
 *  <!-- 加载效果loading -->
    <div id="over" class="overLoading"></div>
    <div id="layout" class="layoutLoading"><img src="./assets/images/loading.gif" />
    <div>加载中...</div>
    </div>
 */
function showLoading(show, over = 'over', layout = 'layout') {
    if (show) {
        document.getElementById(over).style.display = "block";
        document.getElementById(layout).style.display = "block";
    } else {
        document.getElementById(over).style.display = "none";
        document.getElementById(layout).style.display = "none";
    }
}
