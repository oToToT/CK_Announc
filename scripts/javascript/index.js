var configSwitch = true, con = false, other = false;
var mypartid = 0, myclass = 0, page = 1;
var searchC = '';
function $_GET(index){
	var g = location.search.slice(1,location.search.length);
	var d = g.split("&");
	var val = null;
	for(var i = 0; i < d.length;i++){
		var k = d[i].split("=");
		if(k[0] == index)
			val = k[1];
	}
	if (val != null)
		return decodeURIComponent(val);
	else
		return null;
}
function join(str, arr){
	var r = '';
	for(var i = 0;i < arr.length;i++){
		r+=arr[i];
		if(i != arr.length - 1){
			r+=str;
		}
	}
	return r;
}
Date.prototype.minus = function(interval,objDate){
	var dtEnd = new Date(objDate);
	if(isNaN(dtEnd)) return undefined;
	switch (interval) {
		case "s":return parseInt((dtEnd - this) / 1000);
		case "n":return parseInt((dtEnd - this) / 60000);
		case "h":return parseInt((dtEnd - this) / 3600000);
		case "d":return parseInt((dtEnd - this) / 86400000);
		case "w":return parseInt((dtEnd - this) / (86400000 * 7));
		case "m":return (dtEnd.getMonth()+1)+((dtEnd.getFullYear()-this.getFullYear())*12) - (this.getMonth()+1);
		case "y":return dtEnd.getFullYear() - this.getFullYear();
	}
}
$(function(){
	function Search(){
		searchC = '';
		if($('#myday>.selected').data('myday') != 'me'){
			searchC += 'myday=' + encodeURIComponent($('#myday>.selected').data('myday'))
		}else{
			searchC += 'myday=' + encodeURIComponent($('#mydayMe').val())
		}
		searchC += '&mysearch=' + encodeURIComponent($("#search").val());
		searchC += '&stxt=1';
		searchC += '&mypartid=' + encodeURIComponent($("#mypartid>.selected").data('mypartid'));
		searchC += '&myclass=' + encodeURIComponent($("#myclass>.selected").data('myclass'));
	}
	function dateLink(){
		$('.annTime>a').on('click',function(){
			var t = $(this).data('time');
			var d = new Date(join("/",[t.split("/")[0],t.split("/")[1],Number(t.split("/")[2]) + 1911]));
			var a = new Date();
			if(d.minus('d',a)+1>0){
				switch(d.minus('d',a)+1){
					case 1:
						$("#myday>li[data-myday=1]").click();
						break;
					case 7:
						$("#myday>li[data-myday=7]").click();
						break;
					case 30:
						$("#myday>li[data-myday=30]").click();
						break;
					case 365:
						$("#myday>li[data-myday=365]").click();
						break;
					default:
						$("#mydayMe").val(d.minus('d',a)+1);
						$("#myday>li[data-myday=me]").click();
				}
			}else{
				$("#myday>li[data-myday=1]").click();
			}
			console.log(d.minus('d',a)+1)
			$(".searchIcon").click();
		});
	}
	$("img[src='./resources/images/search.png']").css("top", $("img[src='./resources/images/searchW.png']").position().top);
	$("img[src='./resources/images/search.png']").css("left", $("img[src='./resources/images/searchW.png']").position().left);
	$('#logo').on('click',function(){
		location.href="./index.php"
	})
	$(window).on("resize", function(){
		$("img[src='./resources/images/search.png']").css("top", $("img[src='./resources/images/searchW.png']").position().top);
		$("img[src='./resources/images/search.png']").css("left", $("img[src='./resources/images/searchW.png']").position().left);
	});
	$(window).on("scroll",function(){
		checkBottom()
	})
	$("#search").on("focus", function(){
		$("img[src='./resources/images/searchW.png']").css("opacity", 0);
		$("img[src='./resources/images/search.png']").css("opacity", 1);
	});
	$("#search").on("focusout", function(){
		$("img[src='./resources/images/searchW.png']").css("opacity", 1);
		$("img[src='./resources/images/search.png']").css("opacity", 0);
	});
	$("#searchConfig").on("click", function(){
		if(configSwitch){
			this.innerHTML = "︿";
			this.style.lineHeight = '50px';
			$("#searchConfigBar").css("display","block");
			$("#searchConfigBar").css("opacity",0);
			setTimeout(function(){
				$("#searchConfigBar").css("opacity",0.8);
			},1);
		}else{
			this.innerHTML = "﹀";
			this.style.lineHeight = '60px';
			$("#searchConfigBar").css("opacity",0);
			setTimeout(function(){
				$("#searchConfigBar").css("display","none");
			},300)
		}
		configSwitch = !configSwitch;
	});
	$(".choose").on("click", function(e){
		var x = this
		e.stopPropagation();
		$('.select>li').parent().not($(x).next()).css("opacity", 0);
		$(x).next().show();
		setTimeout(function(){
			$(x).next().css("opacity", 1);
		},10)
		setTimeout(function(){
			$('.select>li').parent().not($(x).next()).hide();
		},300)
	});
	$(".select").on("click",function(e){
		e.stopPropagation();
	});
	$(".select>li").on("click",function(e){
		var x = this;
		e.stopPropagation();
		$(x).parent().find(".selected").removeClass();
		$(x).addClass("selected");
		if($(x).data("myday") != 'me')
			$(x).parent().parent().find(".curChoice").text($(x).text());
		else
			$(x).parent().parent().find(".curChoice").text("自訂："+$(x).children().val()+'天內');
		$(x).parent().css("opacity", 0);
		setTimeout(function(){
			$(x).parent().hide();
		},300)
	});
	$(window).on("click", function(){
		$('.select>li').parent().css("opacity", 0);
		setTimeout(function(){
			$('.select>li').parent().hide();
		},300)
	});
	$("#mydayMe").on('click',function(e){
		e.stopPropagation();
		var x = this;
		$(x).parent().parent().find(".selected").removeClass();
		$(x).parent().addClass("selected");
		$(x).parent().parent().parent().find(".curChoice").text("自訂："+$(x).val()+"天內");
		$(x).parent().data("myday",$(x).val());
	});
	$("#mydayMe").on('keyup',function(e){
		var x = this;
		$(x).parent().data("myday",$(x).val());
		$(x).parent().parent().parent().find(".curChoice").text("自訂："+$(x).val()+"天內");
		if(e.keyCode == 13){
			$(window).click();
		}
	});
	$("#mydayMe").on('change', function(){
		var x = this;
		$(x).parent().parent().parent().find(".curChoice").text("自訂："+$(x).val()+"天內");
		$(x).parent().data("myday",$(x).val());
	});
	function checkBottom(){
		var _height = $(document.body).height(),
		    _scrollHeight =  $(document.body).prop('scrollHeight'),
		    _maxScrollHeight = _scrollHeight - _height - 20,
		    _least = 60;
		if(_maxScrollHeight - $(document.body).scrollTop() <= _least && con){
			con = false;
			if(!other){
				$.get('./list.php', { min: (page*5-5), max: (page*5-1) })
					.done(function(data){
						con = true;
						$('#main>.container').append(data);
					});					
					dateLink();
			}else{
				$.get('./list.php', { min: (page*5-5), max: (page*5-1), argv: searchC})
					.done(function(data){
						con = true;
						$('#main>.container').append(data);
						dateLink();
					});
			}
			page+=1;
		}
	}
	if($_GET('myday') != null){
		other = true;
		$("#search").val($_GET('mysearch'));
		if($_GET('mypartid') != null)
			$("#mypartid>li[data-mypartid="+$_GET('mypartid')+"]").click()
		if($_GET('myclass') != null)
			$("#myclass>li[data-myclass="+$_GET('myclass')+"]").click()
		var md = $_GET('myday')
		if(md != 9999 && md != 365 && md != 1 && md != 30 && md != 7){
			$('#mydayMe').val(md);
			$('#mydayMe').parent().click();
		}else{
			$("#myday>li[data-myday="+md+"]").click()
		}
		Search();
	}
	if(!other){
		$.get('./list.php', { min: (0), max: (4) })
			.done(function(data){
				$("#load").show();
				page+=1;
				con = true;
				$('#main>.container').html(data);
				$("img[src='./resources/images/search.png']").css("top", $("img[src='./resources/images/searchW.png']").position().top);
				$("img[src='./resources/images/search.png']").css("left", $("img[src='./resources/images/searchW.png']").position().left);
				$("#search").prop("disabled", false);
				dateLink();
			});
	}else{
		$.get('./list.php', { min: (0), max: (4),argv: searchC })
			.done(function(data){
				con = true;
				$("#load").show();
				$('#main>.container').html(data);
				page+=1;
				$("img[src='./resources/images/search.png']").css("top", $("img[src='./resources/images/searchW.png']").position().top);
				$("img[src='./resources/images/search.png']").css("left", $("img[src='./resources/images/searchW.png']").position().left);
				$("#search").prop("disabled", false);
				dateLink();
			});
	}
	$('.searchIcon').click(function(){
		Search();
		location.href = 'index.php?'+searchC;
	});
	$("#search").on('keyup',function(e){
		if(e.keyCode == '13'){
			Search();
			location.href = 'index.php?'+searchC;
		}
	});
});