$(function() {

    base();


});

function base(){
    var orderTime = new Date().Format("yyyyMMddHHmmss");
    var lstStr=Math.round(Math.random()*1000000);//产生0-1000000的整数随机数
    var requestNo = orderTime + lstStr;
    var outTradeNo = orderTime + lstStr;

    var requestTime = new Date().Format("yyyy-MM-dd HH:mm:ss");
    $("#requestNo").val(requestNo);
    $("#requestTime").val(requestTime);
    $("#outTradeNo").val(outTradeNo);
}

Date.prototype.Format = function (fmt) { //author: meizz
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "H+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}