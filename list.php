<?php
if(isset($_GET['max']) && isset($_GET['min'])){
	include('config.php');
	if(isset($_GET['argv'])){
		$result = shell_exec($pythonPath.' "'.$filePath.'list.py'.'" "'.$_GET['min'].'" "'.$_GET['max']."\" \"".$_GET['argv']."\"");
	}else{
		$result = shell_exec($pythonPath.' '.$filePath.'list.py'.' '.$_GET['min'].' '.$_GET['max']);
	}
	if($codecBig5 === 1){
		$result = iconv("BIG5","UTF-8", $result);
	}
	$json = json_decode($result, true);
	$DanWei = array("校長室" => "15",
				"教務處" => "16",
				"學務處" => "17",
				'總務處' => '18',
				'輔導室' => '19',
				'圖書館' => '20',
				'教官室' => '21',
				'人事室' => '22',
				'會計室' => '23',
				'校友會' => '24',
				'網管中心' => '25',
				'家長會' => '26',
				'教師會' => '27',
				'班聯會' => '28',
				'合作社' => '29',
				'畢聯會' => '30',
				'委員會' => '31',
				'重要訊息' => '32');
	if(gettype($json) != 'NULL' or $json != []){ 
		foreach ($json as $val) {
?>
<div class="ib bar">
	<div class="annTitle">
		<a href="./view.php?tid=<?php echo $val['mytid'];?><?php if(isset($_GET['argv'])) echo '&'.$_GET['argv']?>">
			<?php echo $val['title'];?>
		</a>
	</div>
	<div class="ib annTime">
		公告時間：<a target="_self" data-time="<?php echo $val['time'];?>"><?php echo explode('/',$val['time'])[2];?>年<?php echo explode('/',$val['time'])[0];?>月<?php echo explode('/',$val['time'])[1];?>日</a>
	</div>
	<div class="ib annPost">
		by <a onclick="(function(){$('#mypartid>li[data-mypartid=<?php echo $DanWei[trim($val['DanWei'])];?>]').click();$('.searchIcon').click();})()" href="#"><?php echo $val['DanWei'];?></a> <a href="#"><?php echo $val['poster'];?></a>
	</div>
</div>
<?php
}}
else{
?>
<!--
<?php
print_r(gettype($json));
print_r($json);
?>
-->
	<div style="font-size: 1.5rem;text-align:center;">
		沒有公告囉!
	</div>
	<script>
		con = false;
		$("#load").hide();
	</script>
<?php
}
if(sizeof($json) != 5){
?>
<!--
<?php
print_r(sizeof($json));
?>
-->
<div style="font-size: 1.5rem;text-align:center;">
		沒有公告囉!
	</div>
	<script>
		con = false;
		$("#load").hide();
	</script>
<?php
}
}
?>