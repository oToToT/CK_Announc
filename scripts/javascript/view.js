var searchC;
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
function Search(){
	searchC = '';
	if($_GET('myday') != null)
		searchC += 'myday=' + encodeURIComponent($_GET('myday'));
	if($_GET('mysearch') != null)
		searchC += '&mysearch=' + encodeURIComponent($_GET('mysearch'));
	if($_GET('mysearch') != null)
		searchC += '&stxt=1';
	if($_GET('mypartid') != null)
		searchC += '&mypartid=' + encodeURIComponent($_GET('mypartid'));
	if($_GET('myclass') != null)
		searchC += '&myclass=' + encodeURIComponent($_GET('myclass'));
}
$(function(){
	$('.btn').on('click',function(){
		if($(this).hasClass('download')){
			var a = document.createElement("a");
			a.href = $(this).parent().data("link");
			a.target = '_blank';
			a.click();
		}else if($(this).hasClass('preview')){
			var a = document.createElement("a");
			a.href = "https://docs.google.com/viewer?url="+encodeURIComponent($(this).parent().data("link"));
			a.target = '_blank';
			a.click();
		}
	});
	$(".back").on('click',function(){
		Search();
		location.href = 'index.php?' + searchC;
	});
	$(window).on('resize',function(){
		changeSize();
	})
	function changeSize(){
		if($('#header').height() > 60){
			$("#title").css("line-height",'inherit');
		}
		$("#headerHolder").height($('#header').height());
	}
	changeSize();
});