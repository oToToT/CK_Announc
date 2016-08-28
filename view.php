<?php
function time2t($inp){
	$temp = explode(' ', $inp);
	$day = explode('-', $temp[0]);
	$time = explode(':', $temp[1]);
	return $day[0].'年'.$day[1].'月'.$day[2].'日 '.$time[0].'時'.$time[1].'分'.$time[2].'秒';
}
if(isset($_GET['tid']) && is_numeric($_GET['tid'])){
	include('config.php');
	$result = shell_exec($pythonPath.' '.$filePath.'get.py'.' '.$_GET['tid'].' 2>&1');
	if($codecBig5)
		$result = iconv("BIG5","UTF-8", $result);
	$json = json_decode($result, true);
	$json['content'] = htmlspecialchars($json['content']);
	$json['content'] = preg_replace('/([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6})/', '<a href="mailto:$1">$1</a>', $json['content']);
	$json['content'] = preg_replace('#((https?)://(\S*?\.\S*?))([\s)\[\]{},;"\':<]|\.\s|$)#i',"<a href=\"$1\" target=\"_blank\">$1</a>", $json['content']);
	$json['content'] = nl2br($json['content']);

?>
<!DOCTYPE html>
<html lang="zh-Hant-TW">
<head>
	<meta charset="UTF-8">
	<title><?php echo $json['title'];?>@建國中學公告</title>
	<link rel="shortcut icon" type="image/png" href="./resources/images/logo.png"/>
	<meta name="viewport" content="width=device-width; initial-scale=1.0; maximum-scale=1.0; user-scalable=0;">
	<link rel="stylesheet" href="./scripts/css/view.css">
	<script src="./scripts/javascript/jquery.min.js"></script>
	<script src="./scripts/javascript/view.js"></script>
</head>
<body>
	<div id="header">
			<div class="ib back"><span class="arrow arrow-left"></span></div>
			<div class="ib" id="title">
				<a target="_blank" href="http://web.ck.tp.edu.tw/ann/show.php?mytid=<?php echo $_GET['tid']; ?>"><?php echo $json['title'];?></a>
			</div>
	</div>
	<div id="headerHolder" style="height: 60px;"></div>
	<div class="container">
		<div class="ib block">
			<div class="subtitle">詳細內容：</div>
			<div class="content"><?php echo $json['content']?>
			</div>
		</div>
		<div class="ib block">
			<div class="subtitle">詳細資訊</div>
			<div class="content" style="font-size: 1.2rem">
				<?php if(strpos($json['time'],'最')){ ?>
				公告時間：<?php echo time2t(explode(" (", $json['time'])[0]); ?>
				<br>
				最後修改時間：<?php echo time2t(str_replace(Array('最新編修時間 ',')'), Array('',''), explode(" (", $json['time'])[1])); 
				 }else{?>
				公告時間：<?php echo time2t($json['time']); ?>
				<?php } ?>
				<br>
				發布者：<?php echo $json['DanWei'].' '.$json['poster'];?>
			</div>
		</div>
		<div style="width: 30%;" class="ib block">
			<div class="subtitle">相關連結：</div>
			<div class="content">
			<?php if($json['link'] == Array()){?>
				<span class="no">本篇公告無相關連結</span>
			<?php }else{ 
						foreach ($json['link'] as $val){
			?>
				<div><a target="_blank" class="link" href="<?php echo $val;?>"><?php echo $val;?></a></div>
			<?php }} ?>	
			</div>
		</div>
		<div style="position:relative;left:-4%;width:30%;float:right;" class="ib block">
			<div class="subtitle">附件：</div>
			<div class="content">
				<?php if($json['attachment'] == Array()){?>
					<span class="no">本篇公告無附件</span>
				<?php }else{ 
						foreach ($json['attachment'] as $val){
				?>
				<div>
					<div class="ib fileName" style="width: calc(100% - 70px)">
						<?php echo $val['name']?>
					</div>
					<div class="ib" style="width:60px; ">
						<div data-link="<?php echo $val['link']?>" class="ib fileLink">
							<div class="btn preview" style="">
								<div class="eye"></div>
							</div>
							<br />
							<div class="btn download" style="">
								<div class="down"></div>
							</div>
						</div>
					</div>
				</div>
				<?php }} ?>
			</div>
		</div>
	</div>
</body>
</html>
<?php
}else{
	http_response_code(403);
}
?>