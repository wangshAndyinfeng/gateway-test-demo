$(function() {
    $("#resultId").empty();
    var data =JSON.parse(localStorage.getItem("data"));
    console.log(data);
    if(data) {
        // localStorage.removeItem("data")
        if(data.code == "0000"){
            for(y in data.result) {
                var obj = data.result[y];
                if (obj instanceof Array) {
                    for (i = 0; i < obj.length; i++) {
                        var $tr = $("<tr>");
                        for (item in obj[i]) {
                            $tr.append('<td width="15%">' + item + '</td>');
                            //如果是数组就解析转换成字符串
                            if(obj[i][item] instanceof Array){
                                $tr.append('<td >' + JSON.stringify(obj[i][item]) + '</td>');
                            }else{
                                $tr.append('<td >' + obj[i][item] + '</td>');
                            }

                        }
                        $("#resultId").append($tr);
                    }
                } else if(obj instanceof Object) {
                    for (item in obj) {
                        var $tr = $("<tr>");
                        $tr.append('<td width="15%">' + item + '</td>');
                        $tr.append('<td >' + obj[item] + '</td>');
                        $("#resultId").append($tr);
                    }
                } else {
                    var $tr = $("<tr>");
                    $tr.append('<td width="15%">' + y + '</td>');
                    $tr.append('<td >' + obj + '</td>');
                    $("#resultId").append($tr);
                }
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
            var $tr = $("<tr>");
            $tr.append('<td width="15%">子错误信息：</td>');
            $tr.append('<td >'+data.submsg+'</td>');
            $("#resultId").append($tr);
        }
    }
});