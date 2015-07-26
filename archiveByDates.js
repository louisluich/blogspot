// Thanks for Abu Farhan
// original from http://www.abu-farhan.com

var postTitle = new Array();
var postUrl = new Array();
var postMp3 = new Array();
var postDate = new Array();
var postYear = new Array();
var postMonth = new Array();
var postYearMonth = new Array();
var postYearMonth2 = new Array();
var postTanggal = new Array();
var postLabels = new Array();
var postBaru = new Array();
var sortBy = "titleasc";
var tocLoaded = false;
var numChars = 250;
var postFilter = "";
var numberfeed = 0;
var month2 = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

function mycallback(json) {
	console.log("------>");
	console.log(json);
	console.log("<------");
	loadtoc(json);
}

function loadtoc(a) {
	function b() {
		if ("entry" in a.feed) {
			var d = a.feed.entry.length;
			numberfeed = d;
			ii = 0;
			for (var h = 0; h < d; h++) {
				var m = a.feed.entry[h];
				var e = m.title.$t;
				var l = m.published.$t.substring(0, 10);
				var p = m.published.$t.substring(5, 7);
				var g = m.published.$t.substring(8, 10);
				var n = month2[parseInt(p, 10) - 1] + " " + m.published.$t.substring(0, 4);
				var c = "/" + m.published.$t.substring(0, 4) + "_" + p + "_01_archive.html";
				var j;
				for (var f = 0; f < m.link.length; f++) {
					if (m.link[f].rel == "alternate") {
						j = m.link[f].href;
						break
					}
				}
				var o = "";
				for (var f = 0; f < m.link.length; f++) {
					if (m.link[f].rel == "enclosure") {
						o = m.link[f].href;
						break
					}
				}
				postTitle.push(e);
				postDate.push(l);
				postUrl.push(j);
				postYearMonth.push(n);
				postYearMonth2.push(c);
				postTanggal.push(g)
			}
		}
	}
	b();
	displayToc2();
	//document.write('<br/><a href="http://www.abu-farhan.com" style="font-size: 8px; text-decoration:none; color: #616469;">Widget by Abu Farhan</a></br/>')
	document.write('<br/><a href="javascript:void(0)" onclick="scroll(0,0)" style="font-size: 14px; text-decoration:none; color: #616469;">Back to Top</a></br/>')
}

function displayToc2() {
	var a = 0;
	var b = 0;
	while (b < postTitle.length) {
		temp1 = postYearMonth[b];
		document.write("<p/>");
		document.write('<p><a href="' + postYearMonth2[b] + '">' + temp1 + "</a></p><ul>");
		firsti = a;
		do {
			document.write("<li>");
			document.write("[" + postTanggal[a] + '] <a href="' + postUrl[a] + '">' + postTitle[a] + "</a>");
			document.write("</li>");
			a = a + 1
		} while (postYearMonth[a] == temp1);
		b = a;
		document.write("</ul>");
		if (b > postTitle.length) {
			break
		}
	}
};