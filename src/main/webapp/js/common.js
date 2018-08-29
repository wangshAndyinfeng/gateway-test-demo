/**
 * 下拉框
 * @param {Object} params
 * inputId 值存放inputId
 */
function newSelect(params){
	var inputIdArr = params.inputId.split("#"),
		_callback = params.callback,
		_dataValue = [];
	$(".select-new").each(function(index){
		$(this).find(".no-value").click(function(){
			$(".select-more").hide();
			var _index = index;
			if($(".select-more").eq(_index).is(":visible")){
				$(".select-more").eq(_index).hide();
				$(this).find(".iconfont").html("&#xe64b;")
			}else{
				$(".select-more").eq(_index).show();
				$(this).find(".iconfont").html("&#xe64a;")
			}
			$(".select-more").eq(_index).find("dd").find("span").removeClass("c_2695f3");
			$(".select-more").eq(_index).find("dd").show();
			$(".no_select").hide();
			$(".select_input").val("");
			$(".no_select").html("");
		})
	})
	
	$(".select-more").each(function(index){
		$(this).on("click", "dd",function(){
			var _index = index;
			$(".select-more").hide();
			$(".select-more").eq(_index).find("dd").find("span").removeClass("c_2695f3");
			$(".no_select").hide();
			$(".no_select").html("");
			$(this).parent().parent().find(".no-value").find(".iconfont").html("&#xe64b;")
			$(this).parent().parent().find(".no-value").css("color", "#676767").find("span").html($(this).text().length > 15 ? $(this).text().substr(0, 15) + "..." : $(this).text());
			var _seleceValue = $(this).attr("data-value");
			$("#"+inputIdArr[_index]).val(_seleceValue);
			if(_callback && _callback[_index] && _dataValue[_index] != _seleceValue){
				_dataValue[_index] = _seleceValue;
				_callback[_index](_seleceValue, $(this).text());
			}
		});
	})
	
	$(".select_input").each(function(index){
		$(this).bind('input propertychange', function() {  
	    	var _this = $(this),
	    		_val = _this.val();
	    		
	    	$(".no_select").eq(index).hide();
			$(".no_select").eq(index).html("");
	    	if(_val != ""){
	    		var _flag = false;
	    		_this.parent().parent().find("dd").each(function(index){
		    		var _t = $(this),
		    			_text = _t.text();
		    			
		    		if(_text.indexOf(_val) == -1){
		    			_t.hide();
		    		}else{
		    			_flag = true;
		    			var _texts = _text.split(""+_val);
		    			_t.html(_texts[0] + '<span class="c_2695f3">' + _val + '</span>' + _texts[1])
		    			_t.show();
		    		}
		    	})
	    		if(!_flag){
	    			$(".no_select").eq(index).html("没有找到'"+_val+"'");
	    			$(".no_select").eq(index).show();
	    		}
	    	}else{
	    		_this.parent().parent().find("dd").find("span").removeClass("c_2695f3");
				_this.parent().parent().find("dd").show();
	    	}
		});  
	})
	
	$(document).bind('click',function(e){
		var e = e || window.event; //浏览器兼容性
		var elem = e.target || e.srcElement;
		while (elem) { //循环判断至跟节点，防止点击的是div子元素
			if(elem.className && elem.className=='select-more' || elem.className == 'select-new'){
				return;
			}else {
				elem = elem.parentNode;
			}
		}
		
		$('.select-more').hide(); //点击的不是div或其子元素
	});
}

/**
 * 获取验证码
 * @param {Object} params
 * buttonId 按钮id
 * url
 * data 请求参数
 * errorId 错误信息展示
 */
function getCode(params){
	var _num = 60,
		_buttonId = params.buttonId,
		_url = params.url,
		_data = params.data,
		_errorId = params.errorId;
	
	$("#"+_buttonId).click(function(){
		jQuery.ajax({
            type: 'GET',
			cache: false,
            url: _url ,
			data: _data,
			dataType: "json",
            success: function(response) {
             	if(response.success) {
            	 	var _this = $(this);
						_this.val(_num + "秒后重获");
						_this.attr("disabled", "disabled").addClass("disabled-btn");
						var _setInterval = setInterval(function(){
							_num --;
							_this.val(_num + "秒后重获");
							
							if(_num < 1){
								_num = 60;
								clearInterval(_setInterval);
								_this.val("免费获取");
								_this.removeAttr("disabled").removeClass("disabled-btn");
							}
						}, 1000)
             	} else {
            	 	$("#"+_errorId).html("若长时间未收到校验码，请联系客服 400-611-0909");
             	}
            },
			error:function(){
				$("#"+_errorId).html("若长时间未收到校验码，请联系客服 400-611-0909");
			}
        });
	})
}

/**
 * 选择生僻字
 * @param {Object} params 
 * rareWordId 输入框id
 */
function rareWord(params){
	var uncharArray = [["a","奡靉叆"],
					   ["b","仌昺竝霦犇愊贲琲礴埗別骉錶"],
					   ["c","旵玚棽琤翀珵楮偲赪瑒篪珹捵茝鷐铖宬査嶒"],
					   ["d","耑昳菂頔遆珰龘俤叇槙璗惇"],
					   ["e","峩"],
					   ["f","仹汎沨昉璠雰峯洑茀渢棻棻頫"],
					   ["g","玍冮芶姏堽粿筦嘏釭"],
					   ["h","郃浛訸嗃瓛翃隺鋐滈翚翯竑姮葓皜袆淏皞翙銲鉷澒澔閤婳黃峘鸻鈜褘锽谹嫮"],
					   ["i",""],
					   ["j","冏泂劼莙濬暕珒椈珺璟競煚傑玦鑑瑨瑨琎勣寯烱浕斚倢瑴畯雋傢峤"],
					   ["k","凱堃蒯鹍崑焜姱衎鵾愷鎧"],
					   ["l","玏呂俍冧倞琍綝壘孋瓅璘粦琍麗樑秝鍊崚链镠皊箖菻竻鸰琭瓈騄浬瑠嶺稜欐昽"],
					   ["m","劢忞旻旼濛嫚媺铓鋩洺媌媔祃牻慜霂楙媄瑂"],
					   ["n","婻寗嫟秾迺柟薿枏"],
					   ["o",""],
					   ["p","芃玭玶罴毰珮蘋慿弸掽逄砯"],
					   ["q","玘佺耹踆骎啟蒨慬勍嵚婍璆碏焌駸綪锜荍釥嶔啓"],
					   ["r","汭瑈瑢讱镕婼叡蒻羢瀼"],
					   ["s[sh]","屾昇妽珅姼甡湦骦塽挻甦鉥燊遂陞莦湜奭佀聖骕琡"],
					   ["t","沺凃禔慆弢颋譚曈榃湉珽瑱橦镋渟黇頲畑媞鰧"],
					   ["u",""],
					   ["v",""],
					   ["w","卍彣炆溦娬韡暐偉湋妏硙珷娒"],
					   ["x","仚旴忺炘昍烜爔斅豨勲敩虓鈃禤燮瑄晞賢翾譞諕璿琇晛焮珣晅郤禼皛哓肸谞迿咲婞昫缐姁猇欻箮翛暁"],
					   ["y","乂冘弌贠伝伃杙沄旸玙玥垚訚堯溁嫈澐颺熤儀赟祎瑀湧燚嬿鋆嫄愔贇彧崟韻龑颙晹媖顒禕羕炀弇湲霙嫕浥飏峣曣億雲愔洢暘钖垟詠燿鹓歈貟瑩燏暎畇娫矞祐溳崯颍煬靷谳異軏繄"],
					   ["z[zh]","烝梽喆禛誌曌衠淽枬詟炤昝珘赒"]],
		uncommon 	= $(".uncommon-character"),
		accNameArr  = params.rareWordId.split("#"),
		num         = 0,
		html        = '<div class="uncomm-box"><i class="arrow"> </i>',
		sortHtml    = '<div class="sort"><ul>',
		charsHtml   = '<div class="uncomm-char-item"><ul>';

	//从数组中获取内容
	var length = uncharArray.length;
	for(var i=0;i < length;i++){
		var h = '';
		if(i==0){
			h = '<li class="selected">'+uncharArray[0][0]+'</li>';
		}else{
			h = '<li>'+uncharArray[i][0]+'</li>';
		}
		sortHtml += h;
	}
	sortHtml+='</ul></div>'
	html += sortHtml;
	
	//默认选中第一个a
	var defalutItem = uncharArray[0][1],
		defaultLength = defalutItem.length;
	for(var j=0;j<defaultLength;j++){
		var item = '<li>'+defalutItem.substring(j,j+1)+'</li>';
		charsHtml+=item;
	}
	html += charsHtml;

	html+='</div>';
	$("body").append(html);
			
	uncommon.each(function(index){
		var offTop 		= $(this).offset().top,
			offLeft 	= $(this).offset().left;
		
		$(this).click(function(){
			num = index;
			$(".uncomm-box").css({top:offTop+30,left:offLeft-370});
			$(".uncomm-box").show();
		});
	})
	
	$(".uncomm-box .uncomm-char-item li").live("click",function(){
		var _this = $(this),
			orgVal = $("#"+accNameArr[num]).val(),
			selectedChar = _this.text();
		$("#"+accNameArr[num]).val(orgVal+selectedChar);
		//关闭生僻字弹框
		$(".uncomm-box").hide();
	})
	
	$(".uncomm-box .sort li").live("hover", function(){
		var _this = $(this),
			index = _this.index(),
			charsStr = uncharArray[index][1],
			charsLenght = charsStr.length,
			ulHtml = '';
		$(".uncomm-box .sort li").removeClass("selected");
		_this.addClass("selected");
		for(var k=0; k<charsLenght;k++){
			ulHtml += '<li>'+charsStr.substring(k,k+1)+'</li>'; 
		}
		$(".uncomm-char-item ul").html(ulHtml);
	});
		
	$(document).bind('click',function(e){
		var e = e || window.event; //浏览器兼容性
		var elem = e.target || e.srcElement;
		while (elem) { //循环判断至跟节点，防止点击的是div子元素
			if (elem.id && elem.id=='uncomm-box') {
				return;
			}else if(elem.className && elem.className=='uncommon-character'){
				return;
			}else {
				elem = elem.parentNode;
			}
		}
		
		$('.uncomm-box').hide(); //点击的不是div或其子元素
	});
}

/**
 * 改变按钮颜色
 * @param {Object} buttonId
 * @param {Object} isDisabled
 */
function changeBtn(buttonId,isDisabled){
	if(isDisabled){
		$("#"+_buttonId).attr("disabled", "disabled").addClass("disabled-btn");
	}else{
		$("#"+_buttonId).removeAttr("disabled").removeClass("disabled-btn");
	}
}

$(function(){
	$("body").delegate("input[type='text'], input[type='password']","focus",function(){
		if($(this).attr("data-input") != undefined) $("#" + $(this).attr("data-input")).addClass("input_focus");
		else $(this).addClass("input_focus");
	}).delegate("input[type='text'], input[type='password']","blur",function(){
		if($(this).attr("data-input") != undefined) $("#" + $(this).attr("data-input")).removeClass("input_focus").removeClass("input_error");
		else $(this).removeClass("input_focus").removeClass("input_error");
	});
})
