$(function() {

    base();
    changeselect();
    changeTable($("#dropdown-select").val());
    $("#version").val($("#dropdown-select2").val());
    $("#service").val($("#dropdown-select").val());
    var sel=document.getElementById("dropdown-select");
    sel.onchange=function(){
        $("#service").val($("#dropdown-select").val());
        changeTable($("#dropdown-select").val());
    }
    var sel=document.getElementById("dropdown-select2");
    sel.onchange=function(){
        $("#version").val($("#dropdown-select2").val());
    }




    $('#submitBtn').click(function(){

        var signData ={
            "request_no" : $("#requestNo").val(),
            "service" : $("#service").val(),
            "version" : $("#version").val(),
            "partner_id" : $("#partner_id").val(),
            "charset" : $("#charset").val(),
            "sign_type" : $("#sign_type").val(),
            "sign" : $("#sign").val(),
            "timestamp" : $("#requestTime").val(),
            "format" : $("#format").val(),
            "biz_content" : $("#biz_content").val(),

        };
        var req = {
            "signData" : JSON.stringify(signData)
        }

        $.ajax({
            type: 'POST',
            url: fillPath("sign.do"),
            data: req,
            dataType: "json",
            success: function (data) {
                if(data.code == "0000"){
                    $('#sign').val(data.result);
                    //2.编码
                    var inputTexts = $('#form1 input[type="text"]');
                    for(var i=0; i<inputTexts.length; i++){
                        $(inputTexts[i]).val(encodeURL( inputTexts[i].value));
                    }
                    debugger
                    //3.提交
                    submitGateway();
                }else{
                    alert(data.message);
                }
            },

        });
    })

});

//生成请求号
function requestNoCreate() {
    var orderTime = new Date().Format("yyyyMMddHHmmss");
    var lstStr=Math.round(Math.random()*1000000);//产生0-1000000的整数随机数
    var requestNo = orderTime + lstStr;
    var outTradeNo = orderTime + lstStr;

    var requestTime = new Date().Format("yyyy-MM-dd HH:mm:ss");
    $("#requestNo").val(requestNo);
}

//生成时间
function requestTimeCreate() {
    var orderTime = new Date().Format("yyyyMMddHHmmss");
    var lstStr=Math.round(Math.random()*1000000);//产生0-1000000的整数随机数
    var requestNo = orderTime + lstStr;
    var outTradeNo = orderTime + lstStr;
    var requestTime = new Date().Format("yyyy-MM-dd HH:mm:ss");
    var requestTime = new Date().Format("yyyy-MM-dd HH:mm:ss");
    $("#requestTime").val(requestTime);
}

//生成所有的基础
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

function changeselect() {
    var $select = $("<select id='dropdown-select' placeholder='请选择'>");
    for(key in data1){
        var $option = $("<option>");
        $option.attr("value",key);
        $option.text(key);
        $select.append($option);
    }
    $("#selectInjs").append("<span>接口名：</span>")
    $("#selectInjs").append($select);
    $("#selectInjs").append("<span>&nbsp版本号：</span>")
    var $select2 = $("<select id='dropdown-select2' placeholder='请选择'>");
    $select2.append("<option value=1.0>1.0</option>");
    $select2.append("<option value=1.1>1.1</option>");
    $("#selectInjs").append($select2);
}


function changeTable(mes) {
    var tableData =data1[mes];
    $("#busiTable").empty();
    $("#busiTable").append('<tr>' +
        '<th colspan="3">以下是业务参数，业务参数都会加密后放入请求参数集合(biz_content)参数中<input type="button" id="encryptBtn" onclick="encrypt()" value="加密业务参数并设置到请求参数集合中" /></th>' +
        '</tr>');


    for(ss in tableData) {
        var $tr = $("<tr>");
        $tr.append('<td width="15%">'+ss+'</td>');
        $tr.append('<td width="15%"><input type="text" name="'+ss+'" value=""></td>');
        $tr.append('<td >'+tableData[ss]+'</td>');
        $("#busiTable").append($tr);
    }
}


function encrypt() {

    var params = $("#form").serializeArray();
    var values = {};
    for( x in params ){
        values[params[x].name] = params[x].value;
    }
    var idata = JSON.stringify(values)

    var req ={
        'req' : idata,
        "charset": $('#charset').val(),
        "service": $('#service').val(),
        "sign_type": $('#sign_type').val()
    }

    $.ajax({
        type: 'POST',
        url: fillPath("gateway/encrypt.do"),
        data: req,
        dataType: "json",
        success: function (data) {
            if(data.code == "0000"){
                $('#biz_content').val(data.result);
            }else{
                alert(data.message);
            }
        },

    });
}


function submitGateway() {
    var formOb = $("#form1").serializeArray();
    var values = {};
    for( x in formOb ){
        values[formOb[x].name] = formOb[x].value;
    }
    values["url"] = "https://zgateway.kjtpay.com/recv.do";
    var signData = JSON.stringify(values)

    var req ={
        'signData' : signData,
    }


    $.ajax({
        type: 'POST',
        url: fillPath("gateway.do"),
        data:  req,
        dataType: "json",
        success: function (data) {
            localStorage.setItem("data",JSON.stringify(data));
            debugger
            var domain = window.location.host;
            var openUrl ="http://"+domain+"/demo/viewGate/result.html";
            window.open(openUrl);
        },

    });
}






/**
 * 编码
 */
var encodeURL = function (encodeString){
    if(!(encodeString==null||encodeString==undefined||encodeString=="")){
        return encodeURIComponent(encodeString);
    }
};




