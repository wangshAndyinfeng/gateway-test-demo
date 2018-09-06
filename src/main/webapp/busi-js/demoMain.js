$(function() {

    base();
    changeselect();
    changeTable($("#dropdown-select").val());
    $("#service").val($("#dropdown-select").val());
    $("#version").val($("#dropdown-select2").val());
    var sel=document.getElementById("dropdown-select");
    sel.onchange=function(){

        //如果选择的版本中包含了"1" 标识版本只能用1.1
        if($("#dropdown-select").val().indexOf("1") > 0){

            var strser = $("#dropdown-select").val().replace("1","");
            $("#service").val(strser);
            $("#dropdown-select2").val("1.1");
            $("#version").val($("#dropdown-select2").val());
            // $("#dropdown-select2").attr("disabled","disabled");
        }else{
            // $("#dropdown-select2").attr("disabled",false);
            $("#dropdown-select2").val("1.0");
            $("#version").val($("#dropdown-select2").val());
            $("#service").val($("#dropdown-select").val());
        }

        changeTable($("#dropdown-select").val());
    }
    var sel1=document.getElementById("dropdown-select2");
    sel1.onchange=function(){
        $("#version").val($("#dropdown-select2").val());
    }

    // var textarea = document.getElementById("jsonView");
    // textarea.onchange=function(){
    //     refillForm();
    // }


    //提交到demo后端
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

//选择接口跟版本号
function changeselect() {
    var $select = $("<select id='dropdown-select' placeholder='请选择'>");
    for(item in data1){
        var $option = $("<option>");
        $option.attr("value",item);
        $option.text(enToCN[item]);
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

//拼接业务table
function changeTable(mes) {
    var tableData =data1[mes];
    $("#busiTable").empty();
    $("#busiTable").append('<tr>' +
        '<th colspan="3">以下是业务参数，业务参数都会加密后放入请求参数集合(biz_content)参数中<input class="mybtn" type="button" id="encryptBtn" onclick="encrypt()" value="加密业务参数并设置到请求参数集合中" /></th>' +
        '</tr>');


    for(ss in tableData) {
        var $tr = $("<tr>");
        $tr.append('<td width="15%">'+ss+'</td>');
        var str = tableData[ss].split("&");
        var tableDataVal1= str[0];
        var tableDataVal2= str[1];
        if(ss == 'cashier_type'){
            $tr.append('<td width="15%"><select  id="cashier_type" name="cashier_type"><option value="WEB">WEB</option ><option value="H5">H5</option><option value="SDK">SDK</option></select></td>')
        }else{
            $tr.append('<td width="15%"><input  type="text" id="'+ss+'" name="'+ss+'" value="'+tableDataVal1+'"></td>');
        }

        if(ss == 'trade_info') {
            $tr.append('<td ><input class="mybtn" id="getTradeInfoBtn" type="button" onclick="getTradeInfo()"  value="获取交易信息" />' + '<input class="mybtn" id="deleteTradeInfoBtn" type="button" onclick="deleteTradeInfo()"  value="清空(0)" />' +tableDataVal2+ '</td>');
        }else if(ss == 'out_trade_no'){
            $tr.append('<td ><input class="mybtn" id="setMainTableTradeNoBtn" type="button" onclick="setMainTableTradeNo()"  value="设置outTradeNo" />'+tableDataVal2+'</td>');
        }else if(ss == 'transfer_list') {
            $tr.append('<td ><input class="mybtn" id="getTransfer_listBtn" type="button" onclick="getTransfer_list()"  value="设置转账列表" />'+tableDataVal2+ '</td>');
        }else if(ss == 'royalty_info') {
            $tr.append('<td ><input class="mybtn" id="setRoyaltyInfoBtn" type="button" onclick="setRoyaltyInfo()"  value="设置分润信息" />'+tableDataVal2+ '</td>');
        }else if(ss == 'pay_method'){
            $tr.append('<td ><input  class="mybtn" id="getPaymethodBtn" type="button" onclick="getPaymethod()"  value="获取支付方式" />'+tableDataVal2+'</td>');
        }else if(ss == 'terminal_info'){
            $tr.append('<td ><input  class="mybtn" id="getTerminalInfoBtn" type="button" onclick="getTerminalInfo()"  value="获取终端信息域" />'+tableDataVal2+'</td>');
        }else if(ss == 'merchant_custom'){
            $tr.append('<td ><input  class="mybtn" id="getMerchantCustomBtn" type="button" onclick="getMerchantCustom()"  value="获取商户自定义域" />'+tableDataVal2+'</td>');
        }else{
            $tr.append('<td >'+tableDataVal2+'</td>');
        }
        $("#busiTable").append($tr);
    }
}

//拼接交易相关table
function getTradeInfo() {
    var tableData =trade_info_ensure;
    $("#tradeTable").append("</br>");
    $("#tradeTable").append('<hr>===我是交易信息===<hr><input class="mybtn" type="button" onclick="setTradeInfo()"  value="装填交易信息" />');

    for(ss in tableData) {
        var str = tableData[ss].split("&");
        var tableDataVal1= str[0];
        var tableDataVal2= str[1];
        var $tr = $("<tr>");
        $tr.append('<td width="15%">'+ss+'</td>');
        $tr.append('<td width="15%"><input  type="text" id="'+ss+'" name="'+ss+'" value="'+tableDataVal1+'"></td>');

        if(ss == 'out_trade_no') {
            $tr.append('<td ><input class="mybtn" id="setTradeInfoTradeNoBtn" type="button" onclick="setMainTableTradeNo()"  value="设置outTradeNo" />'+tableDataVal2+ '</td>');
        }else if(ss == 'royalty_info') {
            $tr.append('<td ><input class="mybtn" id="setRoyaltyInfoBtn" type="button" onclick="setRoyaltyInfo()"  value="设置分润信息" />'+tableDataVal2+ '</td>');
        }else{
            $tr.append('<td >'+tableDataVal2+'</td>');
        }
        $("#tradeTable").append($tr);
    }
    $("#getTradeInfoBtn").attr("disabled","disabled");
}

//设置交易table的outTradeNo
function setTradeInfoTradeNo() {
    var orderTime = new Date().Format("yyyyMMddHHmmss");
    var lstStr=Math.round(Math.random()*1000000);//产生0-1000000的整数随机数
    var requestNo = orderTime + lstStr;
    $("#out_trade_no").val(requestNo);
}
//设置主table的outTradeNo   同上，有时间合一个
function setMainTableTradeNo() {
    var orderTime = new Date().Format("yyyyMMddHHmmss");
    var lstStr=Math.round(Math.random()*1000000);//产生0-1000000的整数随机数
    var requestNo = orderTime + lstStr;
    $("#out_trade_no").val(requestNo);
}

//设置分润信息
function setRoyaltyInfo(){
    $("#royalty_info").val('[{"payee_identity_type":"1","payee_member_id":"100000112694","payee_identity_type":"1","amount":"0.02"}]');
}

//拼接获取终端信息table
function getTerminalInfo() {
    var tableData =terminal_info;
    $("#terminal_infoTable").append("</br>");
    $("#terminal_infoTable").append('<hr>===我是终端信息===<hr><input class="mybtn" type="button" onclick="setTerminalInfo()"  value="装填终端信息" />');

    for(ss in tableData) {
        var str = tableData[ss].split("&");
        var terminaltableVal1= str[0];
        var terminaltableVal2= str[1];

        var $tr = $("<tr>");
        $tr.append('<td width="15%">'+ss+'</td>');
        $tr.append('<td width="15%"><input type="text" id="'+ss+'" name="'+ss+'" value="'+terminaltableVal1+'"></td>');
        $tr.append('<td >'+terminaltableVal2+'</td>');
        $("#terminal_infoTable").append($tr);
    }
    $("#getTerminalInfoBtn").attr("disabled","disabled");
}

//拼接转账列表信息table
function getTransfer_list() {
    if($("#service").val() == "batch_transfer_card"){
        var tableData =CardPartyInfo;
    }else if($("#service").val() == "batch_transfer_account"){
        var tableData =AcctPartyInfo;
    }

    $("#terminal_infoTable").append("</br>");
    $("#terminal_infoTable").append('<hr>===我是转账列表信息===<hr><input class="mybtn" type="button" onclick="setTransfer_list()"  value="装填转账列表信息" />');

    for(ss in tableData) {
        var str = tableData[ss].split("&");
        var terminaltableVal1= str[0];
        var terminaltableVal2= str[1];

        var $tr = $("<tr>");
        $tr.append('<td width="15%">'+ss+'</td>');
        $tr.append('<td width="15%"><input type="text" id="'+ss+'" name="'+ss+'" value="'+terminaltableVal1+'"></td>');
        $tr.append('<td >'+terminaltableVal2+'</td>');
        $("#terminal_infoTable").append($tr);
    }
    $("#getTransfer_listBtn").attr("disabled","disabled");
}


//拼接获取商户自定义域 table
function getMerchantCustom() {
    var tableData =merchant_custom;
    $("#merchant_customTable").append("</br>");
    $("#merchant_customTable").append('<hr>===我是商户自定义域===<hr><input  class="mybtn" type="button" onclick="setMerchantCustom()"  value="装填商户自定义域" />');

    for(ss in tableData) {
        var str = tableData[ss].split("&");
        var merchanttableVal1= str[0];
        var merchanttableVal2= str[1];
        var $tr = $("<tr>");
        $tr.append('<td width="15%">'+ss+'</td>');
        $tr.append('<td width="15%"><input  type="text" id="'+ss+'" name="'+ss+'" value="'+merchanttableVal1+'"></td>');
        $tr.append('<td >'+merchanttableVal2+'</td>');
        $("#merchant_customTable").append($tr);
    }
    $("#getMerchantCustomBtn").attr("disabled","disabled");
}

//拼接支付方式相关
function getPaymethod() {
    var tableData =paymethod;
    $("#selectPaymethod").append("</br>");
    $("#selectPaymethod").append('<hr>===我是支付方式===<hr><input class="mybtn" type="button" onclick="setPaymethod()"  value="装填paymethod" />');
    var $select = $("<select id='payMethodSelect' onchange='paymethodTable()' placeholder='请选择'>");
    for(key in tableData){
        var $option = $("<option>");
        $option.attr("value",key);
        $option.text(key);
        $select.append($option);
    }
    $("#selectPaymethod").append("<span>payMethod：</span>")
    $("#selectPaymethod").append($select);
    $("#selectPaymethod").append('<table  id="payMethodTabel" border="1px;" cellspacing="0px;" cellpadding="0px;" width="100%"></table>');
    //装填支付方式table
    paymethodTable();
    $("#getPaymethodBtn").attr("disabled","disabled");
}

//装填支付方式table
function paymethodTable() {
    $("#payMethodTabel").empty();
    var tableData2 = paymethod[$("#payMethodSelect").val()];
    for(ss in tableData2) {
        var str = tableData2[ss].split("&");
        var  paymethodVal1= str[0];
        var  paymethodVal2= str[1];
        var $tr = $("<tr>");
        $tr.append('<td width="15%">'+ss+'</td>');
        $tr.append('<td width="15%"><input class="mybtn" type="text" id="'+ss+'" name="'+ss+'" value="'+paymethodVal1+'"></td>');
        $tr.append('<td >'+paymethodVal2+'</td>');
        $("#payMethodTabel").append($tr);
    }

}

//装填支付方式table
function setPaymethod() {
    var tableData2 = paymethod[$("#payMethodSelect").val()];
    var json = {};
    for(ss in tableData2) {
        json[ss]=$("#"+ss+"").val();
    }
    $("#pay_method").val(JSON.stringify(json))
    $("#selectPaymethod").empty();
    $("#getPaymethodBtn").attr("disabled",false);
}

//装填终端信息域table
function setTerminalInfo() {
    var tableData2 = terminal_info;
    var json = {};
    for(ss in tableData2) {
        json[ss]=$("#"+ss+"").val();
    }
    $("#terminal_info").val(JSON.stringify(json))
    $("#terminal_infoTable").empty();
    $("#getTerminalInfoBtn").attr("disabled",false);
}

//装填客户自定义域table
function setMerchantCustom() {
    var tableData2 = merchant_custom;
    var json = {};
    for(ss in tableData2) {
        json[ss]=$("#"+ss+"").val();
    }
    $("#merchant_custom").val(JSON.stringify(json))
    $("#merchant_customTable").empty();
    $("#getMerchantCustomBtn").attr("disabled",false);
}

//装填转账列表table
function setTransfer_list() {
    if($("#service").val() == "batch_transfer_card"){
        var tableData2 =CardPartyInfo;
    }else if($("#service").val() == "batch_transfer_account"){
        var tableData2 =AcctPartyInfo;
    }
     //如果值为空
    if($("#transfer_list").val() == null || $("#transfer_list").val() == ""){
        var jsonArray = [];
        var json = {};
        for(ss in tableData2) {
            json[ss]=$("#"+ss+"").val();
        }
        jsonArray.push(json);
        $("#transfer_list").val(JSON.stringify(jsonArray));
    }else{
        var result = JSON.parse($("#transfer_list").val());
        var json = {};
        for(ss in tableData2) {
            json[ss]=$("#"+ss+"").val();
        }
        result.push(json);
        $("#transfer_list").val(JSON.stringify(result));
    }

    $("#terminal_infoTable").empty();
    $("#getTransfer_listBtn").attr("disabled",false);
}


//回填交易信息到
function setTradeInfo(mes) {
    //如果值为空就直接输入 第一次输入的是json 后面再添加就转成数组
    if($("#trade_info").val() == null || $("#trade_info").val() == ""){
        var json = {};
        for(ss in trade_info_ensure){
            json[ss]=$("#"+ss+"").val();
        }
        // var jsonArray = [];
        // jsonArray.push(json);
        //塞值
        $("#trade_info").val(JSON.stringify(json));
    }else{
        //不为空就拼接

        var result = JSON.parse($("#trade_info").val());
        if(result instanceof Array){
            var json1 = {};
            for(yy in trade_info_ensure){
                json1[yy]=$("#"+yy+"").val();
            }
            result.push(json1);
            $("#trade_info").val(JSON.stringify(result));
        }else if(result instanceof Object){
            var jsonArray = [];
            //先把已存在的装填进去
            jsonArray.push(result);
            var json2 = {};
            //然后遍历装填
            for(zz in trade_info_ensure){
                json2[zz]=$("#"+zz+"").val();
            }
            jsonArray.push(json2);
            $("#trade_info").val(JSON.stringify(jsonArray));
        }


    }
    var jsonArrayTrade = JSON.parse($("#trade_info").val())
    if(jsonArrayTrade instanceof Array){
        $("#deleteTradeInfoBtn").val('清空('+jsonArrayTrade.length+')');
    }else{
        $("#deleteTradeInfoBtn").val('清空(1)');
    }



    $("#tradeTable").empty();
    $("#getTradeInfoBtn").attr("disabled",false);
}

//删除交易信息
function deleteTradeInfo() {
    $("#trade_info").val("");
    $("#deleteTradeInfoBtn").val('清空(0)');
}

//加密
function encrypt() {

    var params = $("#form").serializeArray();
    var values = changeToJSON(params)
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

//提交给gateway 从java端提交，便于解析验签
function submitGateway() {
    if($("#pay_method") != undefined && $("#pay_method").val() == ""){
        $("#form1").attr("action",$("#getUrl").val());
        $("#form1").submit();
        return;
    }

    var formOb = $("#form1").serializeArray();
    var values = {};
    for( x in formOb ){
        values[formOb[x].name] = formOb[x].value;
    }
    values["url"] = $("#getUrl").val();
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
            if(data != null && data.form != null){
                $("#shouyintai").html(data.form);
            }else{
                localStorage.setItem("data",JSON.stringify(data));
                debugger
                var domain = window.location.host;
                var openUrl ="http://"+domain+"/demo/viewGate/result.html";
                window.open(openUrl);
            }

        },

    });
}

function cuozuojson(id) {
    if(id == "caozuobutton3"){
        var formOb = $("#form1").serializeArray();
        $("#tradeJson2").attr("style","");
        $("#caozuoTrade4").attr("style","");
        $("#caozuoTrade3").attr("style","display: none");
    }else{
        var formOb = $("#form").serializeArray();
        $("#tradeJson").attr("style","");
        $("#caozuoTrade2").attr("style","");
        $("#caozuoTrade1").attr("style","display: none");
    }

    var values = changeToJSON(formOb);

    if(id == "caozuobutton3"){
        $("#jsonView2").val(JSON.stringify(values,null,4));
    }else{
        $("#jsonView").val(JSON.stringify(values,null,4));
    }
}

function guanbijson(id) {
    if(id == "caozuobutton4"){
        $("#tradeJson2").attr("style","display: none");
        $("#caozuoTrade4").attr("style","display: none");
        $("#caozuoTrade3").attr("style","");
    }else{
        $("#tradeJson").attr("style","display: none");
        $("#caozuoTrade2").attr("style","display: none");
        $("#caozuoTrade1").attr("style","");
    }

}
//转换
function changeToJSON(formOb) {
    var values = {};
    //为了解析form里面可能存在的对象
    for( x in formOb ){
        var name = formOb[x].name;
        var value = formOb[x].value;
        if(name == 'trade_info' && value != null && value != "") {
            values[name] = JSON.parse(value);
            //为了解析trade_ext
            var trade_ext = {};
            for(i=0;i<values[name].length;i++){
                for(y in values[name][i])
                    if(y == 'trade_ext' && values[name][i].trade_ext != ""){
                        trade_ext = JSON.parse(values[name][i][y]);
                        values[name][i].trade_ext = trade_ext;
                    }
                    if(y == 'royalty_info' && values[name][i].royalty_info != ""){
                        royalty_info = JSON.parse(values[name][i][y]);
                        values[name][i].royalty_info = royalty_info;
                    }
            }
        }
        else if(name == 'terminal_info' && value != "") {
            values[name] = JSON.parse(value);
        }
        else if(name == 'transfer_list' && value != "") {
            values[name] = JSON.parse(value);
        }
        else if(name == 'merchant_custom' && value != "") {
            values[name] = JSON.parse(value);
        }
        else if(name == 'pay_method' && value != "") {
            values[name] = JSON.parse(value);
        }
        else if(name == 'pay_param' && value != "") {
                values[name] = JSON.parse(value);
        }else{
            values[name] = value;
        }
    }
    return values;
}


/**
 * 编码
 */
var encodeURL = function (encodeString){
    if(!(encodeString==null||encodeString==undefined||encodeString=="")){
        return encodeURIComponent(encodeString);
    }
};

function refillForm(){
    if($("#jsonView").val() != ""){
        var value = JSON.parse($("#jsonView").val());
        if(value instanceof Object){
            for(item in value){
                if(value[item] instanceof Object){
                    $("#"+item+"").val(JSON.stringify(value[item]));
                }else{
                    $("#"+item+"").val(value[item]);
                }
            }
        }
    }
}


