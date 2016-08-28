<!DOCTYPE html>
<html lang="zh-Hant-TW">
<head>
	<meta charset="UTF-8">
	<title>建國中學公告</title>
	<link rel="shortcut icon" type="image/png" href="./resources/images/logo.png"/>
	<meta name="viewport" content="width=device-width; initial-scale=1.0; maximum-scale=1.0; user-scalable=0;">
	<script src="./scripts/javascript/jquery.min.js"></script>
	<script src="./scripts/javascript/index.js"></script>
	<link rel="stylesheet" href="./scripts/css/index.css">
</head>
<body>
	<div id="header">
		<div class="container">
				<span id="logo" class="ib">&nbsp;</span>
				<span id="searchBar" class="ib">
					<input disabled='true' id="search" class="ib" type="text">
					<img class="searchIcon" src="./resources/images/searchW.png">
					<img style="position:absolute;z-index:1;opacity:0;" src="./resources/images/search.png">
				</span>
				<span id="searchConfig" class="ib">
					﹀
				</span>
		</div>
	</div>
	<div style="display:none;" id="searchConfigBar">
		<div class="container">
			<span class="ib choice">
				<span class="choiceTitle">公告群組：</span>
				<br>
				<span class="choose ib">
					<span class="curChoice">不限群組</span>
					<span class="ib dropdown">▼</span>
				</span>
				<ul id="mypartid" style="opacity: 0;" class="select">
					<li data-mypartid='0' class="selected">不限群組</li>
					<li data-mypartid='15'>校長室</li>
					<li data-mypartid='16'>教務處</li>
					<li data-mypartid='17'>學務處</li>
					<li data-mypartid='18'>總務處</li>
					<li data-mypartid='19'>輔導室</li>
					<li data-mypartid='20'>圖書館</li>
					<li data-mypartid='21'>教官室</li>
					<li data-mypartid='22'>人事室</li>
					<li data-mypartid='23'>會計室</li>
					<li data-mypartid='24'>校友會</li>
					<li data-mypartid='25'>網管中心</li>
					<li data-mypartid='26'>家長會</li>
					<li data-mypartid='27'>教師會</li>
					<li data-mypartid='28'>班聯會</li>
					<li data-mypartid='29'>合作社</li>
					<li data-mypartid='30'>畢聯會</li>
					<li data-mypartid='31'>委員會</li>
					<li data-mypartid='32'>重要訊息</li>
				</ul>
			</span>
			<span class="ib choice">
				<span class="choiceTitle">公告類別：</span>
				<br>
				<span class="choose ib">
					<span class="curChoice">不限類別</span>
					<span class="ib dropdown">▼</span>
				</span>
				<ul id="myclass" style="opacity: 0;" class="select">
					<li data-myclass="0" class="selected">不限類別</li>
					<li data-myclass="2">研習資訊</li>
					<li data-myclass="3">學藝競賽</li>
					<li data-myclass="4">法令宣導</li>
					<li data-myclass="5">榮譽榜</li>
					<li data-myclass="6">租賃資訊</li>
				</ul>
			</span>
			<span class="ib choice">
				<span class="choiceTitle">時間：</span>
				<br>
				<span class="choose ib">
					<span class="curChoice">不限時間</span>
					<span class="ib dropdown">▼</span>
				</span>
				<ul id="myday" style="opacity: 0;" class="select">
					<li data-myday='9999' class="selected">不限時間</li>
					<li data-myday="1">一天內</li>
					<li data-myday="7">一周內</li>
					<li data-myday="30">一個月內</li>
					<li data-myday="365">一年內</li>
					<hr>
					<li data-myday="me">
						<input placeholder="1~9999" id="mydayMe" min="1" max="9999" type="number">
						天內
					</li>
				</ul>
			</span>
		</div>
	</div>
	<div id="main">
		<div class="container">
			<div id='loading'>
				<img height='200' width='200' src="./resources/images/loading.svg">
			</div>
		</div>
	</div>
	<div style="display:none;" id='load'>
		<img width='50' src="./resources/images/load.svg">
	</div>
</body>
</html>