(function(window, document, $){
	function KjtPagination(settings){
		this.pageSize = Number(settings.pageSize);
		this.amount = Number(settings.amount);
		this.pageId = settings.pageId;
		this.pageShowNum = Number(settings.pageShowNum);
		this.firstPage = 1;
		this.isToPage = settings.isToPage;
		this.init();
	}
	
	KjtPagination.prototype = {
		init: function(){
			this.pageNum = this.amount % this.pageSize == 0 ? this.amount / this.pageSize : (this.amount / this.pageSize) + 1;
			this.render();
		},
		render: function(){
			var _html = '<dl class="pagination clearfix">';
			if(this.firstPage == 1){
				_html += '<dd class="pre-page not-operation">上一页</dd>';
			}else{
				_html += '<dd class="pre-page">上一页</dd>';
			}
			if(this.pageShowNum + this.firstPage < this.pageNum){
				for(i=this.firstPage;i<this.pageShowNum + this.firstPage;i++){
					if(i == this.firstPage){
						_html += '<dd class="page-num active">'+i+'</dd>'
					}else{
						_html += '<dd class="page-num">'+i+'</dd>'
					}
				}
				
				_html += '<dd class="more-page">...</dd><dd class="page-num">'+this.pageNum+'</dd>';
				
				
			}else{
				if(this.firstPage > this.pageNum - this.pageShowNum){
					for(i=this.pageNum - this.pageShowNum;i<this.firstPage;i++){
						_html += '<dd class="page-num">'+i+'</dd>'
					}
				}
				for(i=this.firstPage;i<=this.pageNum;i++){
					if(i == this.firstPage){
						_html += '<dd class="page-num active">'+i+'</dd>'
					}else{
						_html += '<dd class="page-num">'+i+'</dd>'
					}
				}
			}
			
			if(this.pageShowNum + this.firstPage < this.pageNum){
				_html += '<dd class="next-page">下一页</dd></dl>'
			}else{
				_html += '<dd class="next-page not-operation">下一页</dd></dl>'
			}
			
			if(this.isToPage){
				_html += '<dl class="pagination-toPage">'
					   + '<dd>跳转</dd>'
					   + '<dd><input class="toPage-num" value="'+this.firstPage+'" /></dd>'
					   + '<dd>页</dd>'
					   + '<dd><input type="button" value="确定" class="toPage-btn" /></dd>'
					   + '</dl>'
			}
			
			$("#"+this.pageId).html(_html);
			
			this.pageEvent(this);
		},
		pageEvent: function(obj){
			$(".pre-page").click(function(){
				if(!$(this).hasClass("not-operation")){
					obj.firstPage --;
					obj.render();
				}
			})
			$(".next-page").click(function(){
				if(!$(this).hasClass("not-operation")){
					obj.firstPage ++;
					obj.render();
				}
			})
			$(".page-num").click(function(){
				$(".page-num").removeClass("active")
				$(this).addClass("active");
				obj.firstPage = Number($(this).text());
				obj.render();
			})
			$(".toPage-btn").click(function(){
				var _toPageNum = Number($(".toPage-num").val());
				if(_toPageNum <= obj.pageNum){
					obj.firstPage = _toPageNum;
					obj.render();
				}
			})
		},
	}
	
	window.KjtPagination = KjtPagination;
	
})(window, document, jQuery);