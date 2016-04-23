// Thanks for Abu Farhan original from http://www.abu-farhan.com
// Revised by Louis Lui
// add blogspot max-result 500+
// add back to top
// add load more icon

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
var increment = 100;
var startIndex = 1;
var totalJSON = [];

var ajax = '<div class="ajax_loading" style="text-align: center; width:50px;height: 50px;margin: 50px auto;"><img src="https://cdn.rawgit.com/louisluich/blogspot/master/ajax-loader.gif" style="width: 100%;height: 100%; box-shadow: none; border: 0px; padding: 0px;"></div>';
var load_more = '<div class=\'load_more\' onclick=\'startCount()\' style=\'  text-align: center; font-size: 16px; margin: 30px 0px; display: block;\'><a href=\'javascript:void(0)\'>Load More</a></div>';
var back_to_top = '<div class=\'back_to_top\' style="margin: 20px auto;"><a href="javascript:void(0)" onclick="scroll(0,0)" style="font-size: 14px; text-decoration:none; color: #616469;">Back to Top</a></div>';

var x = document.getElementsByClassName("post-header-line-1")[0];
x.innerHTML = ajax;

var totalResults;
var currentStartIndex;


function defer(method) {
    if (window.jQuery)
        method();
    else
        setTimeout(function() { defer(method) }, 50);
}

window.onload = function(e) {

	var script = document.createElement('script');
	script.src = "https://code.jquery.com/jquery-1.11.3.min.js";
	document.body.appendChild(script);

	defer(startCount);	
};

function startCount() {

	if ($(".load_more").length) {
		$(".load_more").html("").append(ajax);
	}

	var script = document.createElement('script');

	script.src = "http://" + blogger_url + ".blogspot.hk/feeds/posts/summary?max-results=" + increment + "&alt=json-in-script&callback=myIncrement&start-index=" + startIndex;

	document.body.appendChild(script);
}

function myIncrement(json) {

	totalResults = parseInt(json.feed.openSearch$totalResults.$t);
	currentStartIndex = parseInt(json.feed.openSearch$startIndex.$t);

	var totalJSON = [];

	totalJSON = totalJSON.concat(json.feed.entry);
	startIndex = startIndex + increment;

	var tmp = {};
	var feed = {};
	feed.entry = totalJSON;
	tmp.feed = feed;

	var x = document.getElementsByClassName("post-header-line-1")[0];
	x.innerHTML = '';

	loadtoc(tmp);
}

function loadtoc(a) {

	postTitle = new Array();
	postDate = new Array();
	postUrl = new Array();
	postYearMonth = new Array();
	postYearMonth2 = new Array();
	postTanggal = new Array();


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
}

function displayToc2() {
	var a = 0;
	var b = 0;
	var html = '';
	while (b < postTitle.length) {
		temp1 = postYearMonth[b];
		html = html + "<p/>";
		html = html + '<p><a href="' + postYearMonth2[b] + '">' + temp1 + "</a></p><ul>";

		firsti = a;
		do {

			html = html + "<li>";
			html = html + "[" + postTanggal[a] + '] <a target="_blank" href="' + postUrl[a] + '">' + postTitle[a] + "</a>";
			html = html + "</li>";

			a = a + 1
		} while (postYearMonth[a] == temp1);
		b = a;
		html = html + "</ul>";
		if (b > postTitle.length) {
			break 
		}
	}

	if ((currentStartIndex + increment) >= totalResults) {

	} else {

		html += load_more;
	}

	var div = document.createElement('div');

	div.className = 'row';
	div.innerHTML = html;

	$("#TOC_date_inPost").append(div).promise().done(function() {

		$(".ajax_loading").remove();

		if(!$(".back_to_top").length) {
			$(".post-footer").before(back_to_top);
		}		
	});
}
