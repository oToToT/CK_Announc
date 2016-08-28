from bs4 import BeautifulSoup
import requests, sys
import json as JSON
if len(sys.argv) == 3:
    opt = {}
    c = 0
    minimum = int(sys.argv[1])
    maximum = int(sys.argv[2])
    curPage = int(minimum / 20)
    #size = maximum - minimum + 1
    try:
        while minimum <= maximum:
            s = minimum % 20 + 1
            l = min(20 - s, maximum - minimum) + 1
            r = requests.get("http://web.ck.tp.edu.tw/ann/index.php?myday=9999&show="+ str(curPage*20))
            r.encoding = r.apparent_encoding
            sp = BeautifulSoup(r.text, "html.parser")
            for i in range(s, s+l):
                output = {}
                temp = sp.findAll("table")[1].findAll("tr")[i].findAll("a")[0]['href'].split("?")[1].split("&")
                output['time'] = sp.findAll("table")[1].findAll("tr")[i].findAll("td")[3].findAll("font")[0].text
                for i in temp:
                    if i.split("=")[0] == 'mytid':
                        mytid = (i.split("=")[1])
                req = requests.get("http://web.ck.tp.edu.tw/ann/show.php?mytid=" + mytid)
                req.encoding = req.apparent_encoding
                soup = BeautifulSoup(req.text, "html.parser")
                Title = soup.findAll("table")[0].findAll("tr")[1].findAll("td")[0].findAll("font")[0].text
                DanWei = soup.findAll("table")[0].findAll("tr")[0].findAll("td")[0].findAll("font")[0].text
                Poster = soup.findAll("table")[0].findAll("tr")[0].findAll("td")[1].findAll("font")[0].text
                output['title'] = Title
                output['DanWei'] = DanWei
                output['poster'] = Poster
                output['mytid'] = mytid
                opt[c] = output
                c+=1
            minimum += l
            curPage += 1
        o = JSON.dumps(opt)
        print(o)
    except Exception as e:
        o = JSON.dumps(opt)
        print(o)
if len(sys.argv) == 4:
    opt = {}
    c = 0
    minimum = int(sys.argv[1])
    maximum = int(sys.argv[2])
    curPage = int(minimum / 20)
    #size = maximum - minimum + 1
    try:
        while minimum <= maximum:
            s = minimum % 20 + 1
            l = min(20 - s, maximum - minimum) + 1
            r = requests.get("http://web.ck.tp.edu.tw/ann/index.php?"+sys.argv[3]+"&show="+ str(curPage*20))
            r.encoding = 'utf8'
            sp = BeautifulSoup(r.text, "html.parser")
            for i in range(s, s+l):
                output = {}
                temp = sp.findAll("table")[1].findAll("tr")[i].findAll("a")[0]['href'].split("?")[1].split("&")
                output['time'] = sp.findAll("table")[1].findAll("tr")[i].findAll("td")[3].findAll("font")[0].text
                for i in temp:
                    if i.split("=")[0] == 'mytid':
                        mytid = (i.split("=")[1])
                req = requests.get("http://web.ck.tp.edu.tw/ann/show.php?mytid=" + mytid)
                req.encoding = req.apparent_encoding
                soup = BeautifulSoup(req.text, "html.parser")
                Title = soup.findAll("table")[0].findAll("tr")[1].findAll("td")[0].findAll("font")[0].text
                DanWei = soup.findAll("table")[0].findAll("tr")[0].findAll("td")[0].findAll("font")[0].text
                Poster = soup.findAll("table")[0].findAll("tr")[0].findAll("td")[1].findAll("font")[0].text
                output['title'] = Title
                output['DanWei'] = DanWei
                output['poster'] = Poster
                output['mytid'] = mytid
                opt[c] = output
                c+=1
            minimum += l
            curPage += 1
        o = JSON.dumps(opt)
        print(o)
    except Exception as e:
        o = JSON.dumps(opt)
        print(o)
