$(function() {

    var date =new Date().getTime();

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
});