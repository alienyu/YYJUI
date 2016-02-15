function Ajax(ops) {
    this.ops = ops;
    this.init();
}

Ajax.prototype = {
    init: function() {
        this.createXHR();
        this.sendXHR();
    },
    createXHR: function() {
        try {  
            this.XHRObject = new ActiveXObject("Msxml2.XMLHTTP");//IE高版本创建XMLHTTP  
        }  
        catch(e) {  
            try {  
                this.XHRObject = new ActiveXObject("Microsoft.XMLHTTP");//IE低版本创建XMLHTTP  
            }  
            catch(e) {  
                this.XHRObject = new XMLHttpRequest();//兼容非IE浏览器，直接创建XMLHTTP对象  
            }  
        } 
    },
    sendXHR: function() {
        //通过使用JS随机字符串解决IE浏览器第二次默认获取缓存的问题
        this.ops.url = this.ops..url + '?rand=' + Math.random();
        this.ops.data = this.params(this.ops.data); //通过params()将名值对转换成字符串
        //若是GET请求，则将数据加到url后面
        if (this.ops.method === 'get') {
            this.ops.url += this.ops.url.indexOf('?') == -1 ? '?' + this.ops.data : '&' + this.ops.data;
        }
        if (this.ops.async === true) { //true表示异步，false表示同步
            //使用异步调用的时候，需要触发readystatechange 事件
            this.XHRObject.onreadystatechange = function() {
                if (this.XHRObject.readyState == 4) { //判断对象的状态是否交互完成
                    this.callback(); //回调
                }
            };
        }       
    },
    callback: function() {
        if (this.XHRObject.status == 200) { //判断http的交互是否成功，200表示成功
            this.ops.success(this.XHRObject.responseText); //回调传递参数
        } else {
            alert('获取数据错误！错误代号：' + this.XHRObject.status + '，错误信息：' + this.XHRObject.statusText);
        }       
    },
    params: function(data) {
        var arr = [];
        for (var i in data) {
            //特殊字符传参产生的问题可以使用encodeURIComponent()进行编码处理
            arr.push(encodeURIComponent(i) + '=' + encodeURIComponent(data[i]));
        }
        return arr.join('&');
    }
}

new Ajax({
    method: 'post',
    url: 'test.php',
    data: {
        'name': 'JR',
        'age': 22
    },
    success: function(message) {
        alert(message);
    },
    async: true
});
