if(window.location.href.search('home.html')==-1){
    XMLHttpRequest.prototype.open = (function (open) {
        return function () {
            // 执行原生 open 方法
            open.apply(this, arguments);

            // 设置默认的 header
            this.setRequestHeader('token', localStorage.getItem('token'))
            console.log("getAllResponseHeaders()",this.status)
        }
    })((new XMLHttpRequest()).open);
}

