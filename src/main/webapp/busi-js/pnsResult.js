$(function() {

    $.datetimepicker.setLocale('zh');
    $("#date_yy-mm-dd").datetimepicker({
        format: 'Y-m-d',
        minView:'month',
        onShow:function( ct ){
            this.setOptions({
                maxDate: new Date(),
            });
        },

    });


    var nowdate = new Date().Format("yyyy-MM-dd");
    $("#date_yy-mm-dd").val(nowdate);
    var dateFirst =new Date().getTime();
    getPnsData(dateFirst);

    var sel1=document.getElementById("date_yy-mm-dd");
    sel1.onchange=function(){
        $("#resultPns").empty();
        var date =new Date($("#date_yy-mm-dd").val()).getTime();
        getPnsData(date);
    }

});


function getPnsData(date) {
    req = {
        "date" : date
    }
    $.ajax({
        type: 'POST',
        url: fillPath("readPnsData.do"),
        data:  req,
        dataType: "json",
        success: function (data) {
            var $tr = $("<tr>");
            $tr.append('<td style="width:50px;">通知ID</td>');
            $tr.append('<td style="width:50px;">通知时间</td>');
            $tr.append('<td style="width:50px;">通知类型</td>');
            $tr.append('<td style="width:50px;">签名类型</td>');
            $tr.append('<td style="width:50px;">版本</td>');
            $tr.append('<td style="width:50px;">字符编码</td>');
            $tr.append('<td width="30%">其他通知消息</td>');
            $("#resultPns").append($tr);
            for(item in data){
                var $tr = $("<tr>");
                $tr.append('<td style="width:50px;">'+data[item].notify_id+'</td>');
                $tr.append('<td style="width:50px;">'+data[item].notify_time+'</td>');
                $tr.append('<td style="width:50px;">'+data[item].notify_type+'</td>');
                $tr.append('<td style="width:50px;">'+data[item].sign_type+'</td>');
                $tr.append('<td style="width:50px;">'+data[item].version+'</td>');
                $tr.append('<td style="width:50px;">'+data[item]._input_charset+'</td>');
                delete data[item]["notify_id"];
                delete data[item]["notify_time"];
                delete data[item]["notify_type"];
                delete data[item]["sign_type"];
                delete data[item]["version"];
                delete data[item]["_input_charset"];
                delete data[item]["sign"];
                $tr.append('<td width="30%">'+JSON.stringify(data[item])+'</td>');
                $("#resultPns").append($tr);
            }
        },

    });
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