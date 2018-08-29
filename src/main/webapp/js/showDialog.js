function objValue(obj){
	//滚动条距顶部的距离
	var scrollTop=document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop;
	//滚动条距左边的距离
	var scrollLeft=document.documentElement.scrollLeft ? document.documentElement.scrollLeft : document.body.scrollLeft;
	var ch=document.documentElement.clientHeight;//屏幕的高度
	var cw=document.documentElement.clientWidth;//屏幕的宽度
	var objH=$("#"+obj).height();//浮动对象的高度
	var objW=$("#"+obj).width();//浮动对象的宽度
	var objT=Number(scrollTop)+(Number(ch)-Number(objH))/2;
	var objL=Number(scrollLeft)+(Number(cw)-Number(objW))/2;
	return objT+"|"+objL;
}

function closeSW()
{
	$("#fullBg-new").fadeOut(function(){$("#fullBg-new").remove();});
	$("#fullBg-iframe").fadeOut(function(){$("#fullBg-iframe").remove();});
	$("#sw-box-new").fadeOut(function(){$("#sw-box-new").remove()});
	$("body").css("overflow","auto");
}
//火狐页面返回的时候 初始化关闭弹窗
if($("#sw-box-new").attr("id") == "sw-box-new")	closeSW();

//显示灰色背景和操作窗口
//vType:窗口加载的是html代码还是文件，参数可能为html或url或txt
//url为代码或文件名 args 为传递的参数 格式为{arg1:"",arg2:""} w为窗口的宽 h为窗口的高
//args更改：用来传递更多的其他参数：mode：1【没有关闭按钮、点击背景不消失】
//title为打开窗体的标题
//typecss可单独为当前窗口设置不同的样式
//time可为打开的窗口设置消失的时间
function showDialog(vType,url,args,w,h,title,typecss,time){
	
	var loadingHtml = '<div style="padding:10px;">正在加载中......</div>';
	var mode = 0;
	if(args != ""){
		mode = args.mode == undefined ? 0 : args.mode;
	}
	
	if( $("#fullBg_iframe, #fullBg-new").css("display") != "block" )
	{
		var bW=$("body").width();
		var wH=$(window).height();
		var bH=$("body").height();
		
		//alert("wH:" + wH + "；；bH:" + bH);
		bH = bH > wH ? bH : wH;
		//alert("bH:" + bH);
		var typeCss = "";
		if( typecss != "" && typecss != undefined ) typeCss = typecss;
		
		var swHtml = '<iframe id="fullBg-iframe" src="" frameborder="0" scrolling="no"></iframe>';
		swHtml += '<div id="fullBg-new"></div>';
		swHtml += '<div id="sw-box-new" class="sw-0-new '+typeCss+'">';
		
		if(mode == 0 || mode == 2) swHtml += '<a class="iconfont" id="sw_close" href="javascript:void(0);" title="关闭">&#xe689;</a>';
		
		swHtml += '<div id="sw_title"></div>';
		swHtml += '<div id="sw_msg"></div>';
		swHtml += '</div>';
		
		$("body").prepend(swHtml);
	}

	$("#sw-box-new").width(w);
	$("#sw-box-new").height(h);
	
	if( title != "" && title != undefined )
		$("#sw_title").text(title);
	else
		$("#sw_title").text("系统提示");

	if(mode == 0)
		$("body").delegate("#sw_close, #fullBg-iframe, #fullBg-new, .sw_btn_close","click",function(){
			closeSW();
		});
	else if(mode == 1)
		$("body").delegate(".sw_btn_close","click",function(){
			closeSW();
		});
	else if(mode == 2)
		$("body").delegate("#sw_close, .sw_btn_close","click",function(){
			closeSW();
		});
	$("#sw_msg").html('<div id="sw_loading" class="sw-txt-new">'+loadingHtml+'</div>');
	if(vType=="url") $("#sw_msg").load(url,args,function(){if(time != "" && time != undefined) setTimeout("closeSW()",time);});
	else if(vType=="iframe") {
		$("#sw_msg").html('<iframe id="sw_iframe" frameborder="0" src="'+url+'" scrolling="auto" style="border:0 none; width:'+w+'px; height:'+(h-50)+'px"></iframe>');
		if(time != "" && time != undefined) setTimeout("closeSW()",time);
	}
	else if(vType=="txt") { $("#sw_msg").html('<div class="sw-txt-new">'+url+'</div>'); if(time != "" && time != undefined) setTimeout("closeSW()",time); }
	else  $("#sw_msg").html(url);
		
	var objWH = objValue("sw-box-new");
	$("#fullBg-iframe, #fullBg-new").css({width:"100%",height:bH,display:"block"});
	
	var tbT=objWH.split("|")[0]+"px";
	var tbL=objWH.split("|")[1]+"px";
	//alert("tbT:" + tbT + ";; tbL:" + tbL);
	$("#sw-box-new").css({top:tbT,left:tbL,display:"block"});
	
	$("body").css("overflow","hidden");
}
	
function resetShowWin(){
	if( $("#fullBg-iframe, #fullBg-new").css("display") == "block" )
	{		
		var bW=$("body").width();
		var wH=$(window).height();
		var bH=$("body").height();
		bH = bH > wH ? bH : wH;
		
		$("#fullBg-iframe, #fullBg-new").css({width:bW,height:bH});
		
		var objV=objValue("sw-box-new");
		var tbT=objV.split("|")[0]+"px";
		var tbL=objV.split("|")[1]+"px";
		$("#sw-box-new").css({top:tbT,left:tbL});
	}
}

function resetShowWinWH(w,h){
	$("#sw-box-new").width(w);
	$("#sw-box-new").height(h);
	if($("#sw_iframe").attr("id") == "sw_iframe") { $("#sw_iframe").width(w); $("#sw_iframe").height(h-50);}
	resetShowWin();
}

$(function(){
	$(window).scroll(resetShowWin);
	$(window).resize(resetShowWin);
});