$(function() {
    $("#resultId").empty();
    var data =JSON.parse(localStorage.getItem("data"));
    console.log(data);
    if(data) {
        localStorage.removeItem("data")
        if(data.code == "0000"){
            for(item in data.result){
                var $tr = $("<tr>");
                $tr.append('<td width="15%">'+item+'</td>');
                $tr.append('<td >'+data.result[item]+'</td>');
                $("#resultId").append($tr);
            }
            var $tr = $("<tr>");
            $tr.append('<td width="15%">验签结果：</td>');
            $tr.append('<td >'+data.verifymsg+'</td>');
            $("#resultId").append($tr);
        }else if(data.code == "9999"){
            alert(data.msg);
        }else{
            var $tr = $("<tr>");
            $tr.append('<td width="15%">错误码：</td>');
            $tr.append('<td >'+data.code+'</td>');
            $("#resultId").append($tr);
            var $tr = $("<tr>");
            $tr.append('<td width="15%">错误信息：</td>');
            $tr.append('<td >'+data.msg+'</td>');
            $("#resultId").append($tr);
        }
    }
});