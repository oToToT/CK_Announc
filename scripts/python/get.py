#! /usr/bin/env python3
from bs4 import BeautifulSoup
import requests, sys
import json as JSON
if len(sys.argv) == 2:
    linkLen = 0
    attachLen = 0
    opt = {}
    opt['link'] = {}
    opt['attachment'] = {}
    mytid = sys.argv[1]
    r = requests.get('http://web.ck.tp.edu.tw/ann/show.php?mytid='+mytid)
    r.encoding = r.apparent_encoding
    soup = BeautifulSoup(r.text, 'html.parser')
    opt['DanWei'] = soup.findAll("table")[0].findAll("tr")[0].findAll("td")[0].findAll("font")[0].text.strip()
    opt['poster'] = soup.findAll("table")[0].findAll("tr")[0].findAll("td")[1].findAll("font")[0].text
    opt['title'] = soup.findAll("table")[0].findAll("tr")[1].findAll("td")[0].findAll("font")[0].text.strip()
    opt['time'] = soup.findAll("table")[0].findAll("tr")[2].findAll("td")[0].findAll("font")[0].text
    opt['content'] = soup.findAll("table")[0].findAll("tr")[3].findAll("td")[0].findAll("font")[0].text
    for i in range(4,len(soup.findAll("table")[0].findAll("tr"))):
        if soup.findAll("table")[0].findAll("tr")[i].findAll("a") != []:
            now = soup.findAll("table")[0].findAll("tr")[i].findAll("a")[0]
            if '網址' in now.text:
                opt['link'][linkLen] = now['href']
                linkLen += 1
            elif '附件' in now.text:
                opt['attachment'][attachLen] = {}
                opt['attachment'][attachLen]['name'] = now.text.split("：")[1].split("(大小：")[0][0:-4]
                opt['attachment'][attachLen]['link'] = now['href']
                attachLen += 1
    print(JSON.dumps(opt))
            
