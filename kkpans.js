var rule = {
	title:'KK網盤[磁]',
	host:'https://www.kkpans.com',
	homeUrl:'/',
	url: '/forum-fyclass-fypage.html?',
	//host:'http://192.168.101.1:10078',
	//homeUrl:'/p/0/s/https://www.kkpans.com/',
	//url: '/p/0/s/https://www.kkpans.com/forum-fyclass-fypage.html?',
	filter_url:'{{fl.class}}',
	filter:{
	},
	searchUrl: '/search',
	searchable:2,
	quickSearch:0,
	filterable:0,
	headers:{
		'User-Agent': 'Mozilla/5.0 (Linux; Android 10; SM-G981B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.162 Mobile Safari/537.36',
		'Accept': '*/*',
		'Referer': 'https://www.kkpans.com/'
	},
	timeout:5000,
	class_name:'国外电影&国外电视剧&纪录片资源&综艺资源&动漫资源&音乐资源',
	class_url:'39&40&41&42&46&43',
	play_parse:true,
	play_json:[{
		re:'*',
		json:{
			parse:0,
			jx:0
		}
	}],
	lazy:'',
	limit:6,
	推荐:'',
	一级:'',
	一级:`js:
pdfh=jsp.pdfh;pdfa=jsp.pdfa;pd=jsp.pd;
let d = [];
log("kkpans input>>>>>>>>>>>>>>"+input);
let html = request(input);
//log("kkpans 1level html>>>>>>>>>>>>>>"+html);
let list = pdfa(html, 'div.threadlist ul li.list');
list.forEach(function(it) {
	d.push({
		title: pdfh(it, 'div.threadlist_tit&&Text'),
		desc: pdfh(it, 'div.threadlist_top div:has(>h3) span&&Text'),
		pic_url: '',
		url: pd(it, 'li.list&&a[href^="forum.php"]:eq(1)&&href', HOST)
	});
})
setResult(d);
	`,
	二级:{
		title:"div.viewthread&&div.view_tit&&Text",
		img:"div.viewthread div.message&&img&&src",
		desc:"div.viewthread div.message&&Text",
		content:"div.viewthread div.message&&Text",
		tabs:`js:
pdfh=jsp.pdfh;pdfa=jsp.pdfa;pd=jsp.pd;
TABS=[]
let d = pdfa(html, 'div.viewthread div.message a[href^="https://pan.quark.cn/s/"]');
let index = 1;
d.forEach(function(it) {
	TABS.push("夸克雲盤" + index);
	index = index + 1;
});
log('meijumi TABS >>>>>>>>>>>>>>>>>>' + TABS);
`,
		lists:`js:
log(TABS);
LISTS=[];
pdfh=jsp.pdfh;pdfa=jsp.pdfa;pd=jsp.pd;
let d = pdfa(html, 'div.viewthread div.message a[href^="https://pan.quark.cn/s/"]');
let index = 1;
d.forEach(function(it) {
	let burl = pdfh(it, 'a&&href');
	if (d.length==1){
		burl = "http://127.0.0.1:9978/proxy?do=quark&type=push&confirm=0&url=" + encodeURIComponent(burl);
	}else{
		burl = "http://127.0.0.1:9978/proxy?do=quark&type=push&url=" + encodeURIComponent(burl);
	}
	let title = pdfh(it, 'a&&Text');
	LISTS.push([title + '$' + burl]);
});
`,

	},
	搜索:`js:
pdfh=jsp.pdfh;pdfa=jsp.pdfa;pd=jsp.pd;

let withHeaders = {
    withHeaders: true
};
let _fetch_params = JSON.parse(JSON.stringify(rule_fetch_params));
Object.assign(_fetch_params, withHeaders);

let new_html=request(rule.homeUrl + 'search.php?mod=forum', _fetch_params);
log('kkpans search new_html >>>>>>>>>>>>>>>>>>>>>' + new_html);
let json=JSON.parse(new_html);
let setCk=Object.keys(json).find(it=>it.toLowerCase()==="set-cookie");
let cookie="wpkreporterwid_=cfbd5a16-5341-4ed7-bec7-e5e2442d5b38; ctoken=lPpRt3wc43PBN0hgjyHULe5I; b-user-id=f744000b-650c-20cd-3508-a406b6b543b4; __chkey=; _UP_BT_=html5; _UP_D_=mobile; _UP_A4A_11_=wb9041d4c57c4a168e400513f03b76da; _UP_30C_6A_=st9046201f9oo0tfn0054mc7o13481ob; _UP_TS_=sg1e66fdff5310759c1a5756ad66e9ee88e; _UP_E37_B7_=sg1e66fdff5310759c1a5756ad66e9ee88e; _UP_TG_=st9046201f9oo0tfn0054mc7o13481ob; _UP_335_2B_=1; _UP_F7E_8D_=0z44HdIBxZaE8Hlf5pDjSmopmnezCzd3c0ozaWnXniiz95%2Fn6Lzu%2B6nqo%2BgfwknPFGMl%2B7Cvk%2BZLHpvA%2Fhicy1HUTu2LBlCPY%2BL6ofX53iy8v%2FLz4woFWkhmC6lRs%2F8wX5eOGDqSGLN4QMK1y53OwalxR72Nkj7G90DHop30hNkORIeucE5T%2Fq9SLWXCTocls5EIZ6ByMGtX7oL3ol9ckr3RtPhhFQZjAOft%2Bu2GGmXh2eOx77b6tsC7XIWexh9imR67tcUZl5IyzEv8tTeKTKUKOyV1ip6S7JZL0m0LzCR%2BFM%2F9vkfcPlY2bWIcnRCf3ZXQbwe7a1TB9yIWEqFMNgGExe3jYhflPQ4AEr2%2BFX76LKfhBZe758tEzbHEmTDpfA3H4sZcJGE6cEgmOOeuHxxgPXMsSrLXt6QUVC0k0fAOgu8PFUpkcRvqHxgs7DLpdzRmOsJepQSEmCdnEg0tdNB46oW9xXFri8Ekknbxg8Q%3D";
if (typeof setCk !== "undefined"){
	let d=[];
	for(const key in json[setCk]){
		if (typeof json[setCk][key] === "string"){
			log("kkpans header setCk key>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>" + json[setCk][key] + " " + (typeof json[setCk][key]));
			d.push(json[setCk][key].split(";")[0]);
		}
	}
	cookie=d.join(";");
}
fetch_params.headers.Cookie=cookie;
rule_fetch_params.headers.Cookie=cookie;
log('kkpans search cookie >>>>>>>>>>>>>>>>>>>>>' + cookie);
//log('kkpans search body >>>>>>>>>>>>>>>>>>>>>' + json['body']);

new_html = json['body'];

let formhash = pdfh(new_html, 'input[name="formhash"]&&value');
log("kkpans formhash>>>>>>>>>>>>>>>" + formhash);
let params = 'formhash=' + formhash + '&searchsubmit=yes&srchtxt=' + encodeURIComponent(KEY);
_fetch_params = JSON.parse(JSON.stringify(rule_fetch_params));
let postData = {
    body: params
};
Object.assign(_fetch_params, postData);
log("kkpans search postData>>>>>>>>>>>>>>>" + JSON.stringify(_fetch_params));
let search_html = post(rule.homeUrl + 'search.php?mod=forum', _fetch_params)
//log("kkpans search result>>>>>>>>>>>>>>>" + search_html);
let d=[];
let dlist = pdfa(search_html, 'div.threadlist ul li.list');
dlist.forEach(function(it){
	let title = pdfh(it, 'div.threadlist_tit&&Text');
	if (searchObj.quick === true){
		if (title.includes(KEY)){
			title = KEY;
		}
	}
	let img = "";
	let content = pdfh(it, 'div.threadlist_top div:has(>h3) span&&Text');
	let desc = pdfh(it, 'div.threadlist_top div:has(>h3) span&&Text');
	let url = pd(it, 'a[href^="forum.php?mod=viewthread"]&&href', HOST);
	d.push({
		title:title,
		img:img,
		content:content,
		desc:desc,
		url:url
		})
});
setResult(d);
`,
}
