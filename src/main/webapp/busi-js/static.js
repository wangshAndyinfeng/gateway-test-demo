var host = window.location.origin;

if( document.addEventListener ){
	document.addEventListener('AlipayJSBridgeReady',onAliBridgeReady, false);
	document.addEventListener('WeixinJSBridgeReady', onWechatBridgeReady, false);
}else if (document.attachEvent){
	document.attachEvent('WeixinJSBridgeReady', onWechatBridgeReady);
	document.attachEvent('onWeixinJSBridgeReady', onWechatBridgeReady);
}


var myJqueryAlias = jQuery.noConflict();

function keyPress(item){
	// var value  = item.value.replace(/[^\d.,:]/g,'').replace(/[,:]/g,'.');
	// item.value = value;
  //
  // if(parseFloat(value) > 99999999){
  //  item.value = item.value.substring(0,8);
  // }else{
  //   var list = value.split(".");
  //   if(list.length == 1){
  //     if(list[0] == ""){
  //       item.value = "";
  //     }else{
  //       // item.value = value;
  //     }
  //   }else{
  //     if(list[0] == ""){
  //       item.value = "0.";
  //     }else if(list[1].length >2){
  //       item.value = list[0]+"."+list[1].slice(0,2);
  //     }else{
  //       item.value = list[0]+"."+list[1];
  //     }
  //   }
  // }
   if(item.value==""){
  	myJqueryAlias('#tips').css('display','block').html('请输入');
    myJqueryAlias('#submit').css('background-color','#999').attr('disabled',true);
  }else{
  	var ua = navigator.userAgent.toLowerCase();
    if(ua.match(/MicroMessenger/i)=="micromessenger"){
        myJqueryAlias('#submit').removeAttr('disabled').css('background-color','#1aad19');
    }else{
        myJqueryAlias('#submit').attr('disabled',false).css('background-color','#108ee9');

    } 
     myJqueryAlias('#tips').css('display','none');
  }

}



	function   formatDate(now)   {
	     var   year=now.getFullYear();       
	     var   month=now.getMonth()+1;     
	     var   date=now.getDate();       
	     var   hour=now.getHours();       
	     var   minute=now.getMinutes();       
	     var   second=now.getSeconds(); 
	      
	     if(month<10){month="0"+month;} 
	     if(date<10){date="0"+date;} 
	     if(hour<10){hour="0"+hour;}
	     if(minute<10){minute="0"+minute;}
	     if(second<10){second="0"+second;}
	     return   year+"-"+month+"-"+date+" "+hour+":"+minute+":"+second;       
    }  

    function payByWetchat(data){
         if(data.appId==""||data.appId==undefined||data.prepayId==""||data.prepayId==undefined||data.timeStamp==""||data.timeStamp==undefined||data.nonceStr==""||data.nonceStr==undefined||data.package==""||data.package==undefined||data.signType==""||data.signType==undefined||data.paySign==""||data.paySign==undefined){
	        if(data.errorMessage=="" || data.errorMessage == undefined){
    			myJqueryAlias('#model').css('display','block');
                myJqueryAlias('#t-model').html('');
    		}else{
	           myJqueryAlias('#model').css('display','block');
               myJqueryAlias('#t-model').html(data.errorMessage); 
    		}
	        return;
        }
       
        var appId = data.appId,
            prepayId = data.prepayId,
            timeStamp = data.timeStamp+"",
            nonceStr = data.nonceStr,
            package = data.package,
            signType = data.signType,
            paySign = data.paySign;
        // console.log("appId="+appId+",prepayId="+prepayId+",package="+package)
        // console.log(data)
         var time= formatDate(new Date());  
         var c = "name=" + data.name + "&date_time=" + time+ "&voucher_no=" + data.voucherNo + "&amount=" + data.instAmount;
        WeixinJSBridge.invoke(
            'getBrandWCPayRequest', {
                "appId" : appId,                 //公众号Id
                "timeStamp": timeStamp,         //时间戳
                "nonceStr" : nonceStr,          //随机字符串
                "package": package,
                "signType" : signType,          //签名方式
                "paySign" : paySign            //签名
            },
            function(res){
	           if(res.err_msg == "get_brand_wcpay_request:ok") {
	           	   window.location.href = "https://qcs.kjtpay.com/qcs/qrcode/payResult.htm?success=true&"+ c;
	           }else if(res.err_msg == "get_brand_wcpay_request:cancel"){
                    myJqueryAlias('#submit').css('background-color','#999').attr('disabled',true);
	           }else{
	           	 window.location.href ="https://qcs.kjtpay.com/qcs/qrcode/payResult.htm?success=false&"+c;
	           }

            }
        );
    };


    function onWechatBridgeReady(){
	    myJqueryAlias("#submit").click(function(){
	        if(myJqueryAlias("#price").val() == ""){
	            myJqueryAlias('#submit').attr('disabled',true);
	            myJqueryAlias('#tips').html('...').css('display','block');
	        }else{
	            // wechatSumbit();
	        }
	    });
    }

    function onAliBridgeReady() {
    	myJqueryAlias("#submit").click(function(){
	        if(myJqueryAlias("#price").val() == ""){
	            myJqueryAlias('#submit').attr('disabled',true);
	            myJqueryAlias('#tips').html('....').css('display','block');
	        }else{
	            aliSubmit();

	        }
	    });
    }

    var randomWords = function(randomFlag, min, max){
        var str = "",
                range = min,
                arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
        if(randomFlag){
            range = Math.round(Math.random() * (max-min)) + min;
        }
        for(var i=0; i<range; i++){
            pos = Math.round(Math.random() * (arr.length-1));
            str += arr[pos];
        }
        return str
    }



    function mHide(){
        myJqueryAlias('#model').hide();
        
        var ua = navigator.userAgent.toLowerCase();
        if(ua.match(/MicroMessenger/i)=="micromessenger"){
            myJqueryAlias('#submit').attr('disabled',false).css('background-color','#1aad19');
        }else{
            myJqueryAlias('#submit').attr('disabled',false).css('background-color','#108ee9');

        } 
     }
