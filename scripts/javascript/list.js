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

$('.annTime>a').on('click',function(){
	var t = $(this).data('time');
	join("/",[t.split("/")[0],t.split("/")[1],Number(t.split("/")[2]) + 1911]);
})