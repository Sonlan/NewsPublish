$(document).ready(function(){
	//轮播图控件初始化
	$('.flexslider').flexslider({
		directionNav: true,
		pauseOnAction: false,
		slideshowSpeed: 2000});
	//iscroll插件相关全局变量定义
	var myScroll,
	pullDownEl, pullDownOffset,
	pullUpEl, pullUpOffset,
	generatedCount = 0; 
	//iscroll相关控件实例化
	pullDownEl = document.getElementById('pullDown');
	pullDownOffset = pullDownEl.offsetHeight;
	pullUpEl = document.getElementById('pullUp');	
	pullUpOffset = pullUpEl.offsetHeight;
	//下拉动作响应函数
	function pullDownAction () {
		
		getMoreData(1,0);  //轮播图
		getMoreData(0,1);	//下拉信息
		return ;
	}
	//上拉动作响应函数
	function pullUpAction () {
		getMoreData(0,0);	//获取下拉列表信息并显示
		return;
	}
	//iscroll插件实例化及其配置
	myScroll = new iScroll('wrapper', {
		click :true,
		useTransition: true,
		topOffset: pullDownOffset,
		onRefresh: function () {
			if (pullDownEl.className.match('loading')) {
				pullDownEl.className = '';
				pullDownEl.querySelector('.pullDownLabel').innerHTML = '下拉发现更多精彩...';
			} else if (pullUpEl.className.match('loading')) {
				pullUpEl.className = '';
				pullUpEl.querySelector('.pullUpLabel').innerHTML = '上拉发现更多精彩...';
			}
		},
		onScrollMove: function () {
			$("#pullUp").attr("style","display:block");
			if((this.y < this.maxScrollY) && (this.pointY < 1)){   
				this.scrollTo(0, this.maxScrollY, 400);   return;  
			} else if (this.y > 0 && (this.pointY > window.innerHeight - 1)) {
				this.scrollTo(0, 0, 400);   return;  
			} 
			if (this.y > 5 && !pullDownEl.className.match('flip')) {
				pullDownEl.className = 'flip';
				pullDownEl.querySelector('.pullDownLabel').innerHTML = '松开刷新...';
				this.minScrollY = 0;
			} else if (this.y < 5 && pullDownEl.className.match('flip')) {
				pullDownEl.className = '';
				pullDownEl.querySelector('.pullDownLabel').innerHTML = '下拉发现更多精彩...';
				this.minScrollY = -pullDownOffset;
			} else if (this.y < (this.maxScrollY - 5) && !pullUpEl.className.match('flip')) {
				pullUpEl.className = 'flip';
				pullUpEl.querySelector('.pullUpLabel').innerHTML = '松开刷新...';
				this.maxScrollY = this.maxScrollY;
			} else if (this.y > (this.maxScrollY + 5) && pullUpEl.className.match('flip')) {
				pullUpEl.className = '';
				pullUpEl.querySelector('.pullUpLabel').innerHTML = '上拉发现更多精彩...';
				this.maxScrollY = pullUpOffset;
			}
		},
		onScrollEnd: function () {
			$("#pullUp").attr("style","display:none");
			if (pullDownEl.className.match('flip')) {
				pullDownEl.className = 'loading';
				pullDownEl.querySelector('.pullDownLabel').innerHTML = '拼命加载中...';				
				pullDownAction();	// Execute custom function (ajax call?)
			} else if (pullUpEl.className.match('flip')) {
				pullUpEl.className = 'loading';
				pullUpEl.querySelector('.pullUpLabel').innerHTML = '拼命加载中...';				
				pullUpAction();	// Execute custom function (ajax call?)
			}
		}
	});

	setTimeout(function () { document.getElementById('wrapper').style.left = '0'; }, 800);
		/**
		 * 
		 * @param index 用于区分当前查询下拉列表信息或是轮播图信息 0 下拉信息  1 轮播图信息
		 * @param flag 下拉列表信息是否刷新的标志位，1 代表重新获取最新下拉信息 0 从上一条数据开始获取历史信息
		 */
		function getMoreData(index,flag){
			//
			var infourl = "";  //消息链接
			var infoid = "";  //由消息链接处理得到的消息ID
			var count = 0;  //当前已加载的信息数目
			var path = "getMoreData.jspx";  //后台数据请求路径
			var list = new Array();  //用于取得当前页面链接后缀，区分index以及52.jspx页面，因为二者共用一个js文件
			var type = "news";  //区分上述页面，产品信息请求以及新闻信息请求
			list = window.location.href.split("/");
			var url = list[list.length-1];  //获取请求页面
			if(index==0) {  //请求下拉信息
					infourl = $(".secLi a:first-child").attr("href");
					infoid = infourl.substring(18).replace(".jspx","");
					count = $("#thelist > li").length-1;
				path = "getMoreData.jspx";
			}
			else if(index==1) {
				path = "getMorePicData.jspx";
			}
			/***************************/
			if(url!="52.jspx"){
				type="news";
			}else {
				type="products";
				count = ($("#thelist > li").length-1)*2;
			}
			if(flag!=0) {infoid="";count = 0;}
			/*****************************/
			 $.ajax({
			  type: "post", 
	          url: "/NewsPublish/"+path+"?limit="+count+"&firstID="+infoid+"&type="+type, 
	          contentType:"application/json",
	          dataType: "json",
	          success: function (data) {
	         	 var length = data.length;
	         	 if (length <= 0) {
	         		 //
	         		 myScroll.refresh();
	         		 return false;
	         	 }
	         	 if(index==0){
	             	 //是否重新加载
	         		 if(flag!=0) $(".secLi").remove();
	         		 if(type=="news"){
	         			for (var i = 0; i < length; i++) {
							var div0 = "<li class='secLi'>";
							var div2 = "<div class='toutiao_list_li'><a class='left imgbox' href='"
									+ data[i].url
									+ "' target='_blank' title='"
									+ data[i].title
									+ "'><img src='"
									+ data[i].smallImageUrl + "' /></a>";
							var div3 = "<div class='right infbox'><div class='title_box'><a class='fs14 fs14_1 b a-hover c-infoem' href='"
									+ data[i].url
									+ "' title='"
									+ data[i].title
									+ "' target='_blank'>"
									+ data[i].title_cut
									+ "</a></div><div class='mt5_1 mt5 c-desc'>"
									+ data[i].description_cut
									+ "<a class='c-node_1 c-node a-all' href='"
									+ data[i].url
									+ "' target='_blank'>[详细]</a></div></div>";
							var div4 = "</div><div class='clear'></div></li>";
						   $("#thelist").append(div0 + div2 + div3 + div4);
						}
	         			myScroll.refresh();
	         		 }else if(type=="products"){
	         			var i = 0;
	         			for ( i = 0; i <= length/2+1;) {
	         			  var div = "<li style='overflow:hidden;' class='secLi'>"
	         				  for(var j=0;j<2;j++){
	         					  if(i+j<length){
		         					  div += "<div class='left find_pro_list'>"
		     	    					+"	<a href='"+data[i+j].url+"' target='_blank' title='"+data[i+j].title+"'>"
		     	    					+"		<img src='"+data[i+j].smallImageUrl+"' alt='"+data[i+j].title+"'/>"
		     	    					+	"</a>"
		     	    					+"	<span class='ff-yh fs12'>"+data[i+j].title+"</span>"
		     	    					+"</div>";
	         					  }
	         				  }
	         			  i+=2;
	         			 div += "</li>";
	         			$("#thelist").append(div);
	         			}
						myScroll.refresh();
	         		 }
						
	         	 }else if(index==1){
	         		var div = "";
	         		$('.flexslider').remove();
	         		$('.silder_b').append('<div class="flexslider"><ul class="slides" id="ImgList"></ul></div>');
	         		if(type=="news"){
		         		 for (var i = 0; i < length; i++) {
		             		  div += 
		             		 			"<li>"+
		        						"<a href='"+data[i].url+"' title='"+data[i].title+"' target='_blank'>"+
		        						"	<img src='"+data[i].attrImageUrl+"' alt='"+data[i].title+"' height='200' />"+
		        						"</a>"+
			        					"</li>";
		         		 }
	         		}else if(type=="products"){
	         			for (var i = 0; i < length; i++) {
		             		  div += 
		             		 			"<li>"+
		        						"<a href='"+data[i].url+"' title='"+data[i].title+"' target='_blank'>"+
		        						"	<img src='"+data[i].attrImageUrl+"' alt='"+data[i].title+"' height='200' />"+
		        						"</a>"+
			        					"</li>";
		         		 }
	         		}
	         		$("#ImgList").html(div);
	         		$('.flexslider').flexslider({
	         			directionNav: true,
	         			pauseOnAction: false,
	         			slideshowSpeed: 2000});
	         	 }
	         	 return true;
	          }, 
	          error: function (XMLHttpRequest, textStatus, errorThrown) { 
	                  alert("error: "+errorThrown); 
	                  myScroll.refresh();
	                  return false;
	          } 
				
			}); 
		}
});
