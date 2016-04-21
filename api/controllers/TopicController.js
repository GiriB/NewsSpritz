var request = require('request');
var cheerio = require('cheerio');
module.exports = {

	getNews : function (req,res){
		var topic = req.params.topic;
		console.log('received ' + topic );
		if(typeof topic == "undefined"){
			topic ="";
		}

		console.log('new topic' + topic );

		var body = null;
		var news = [];

		// news[0] = {}
	 //  	news[0].title = "test";
	 //  	news[0].img = "test";
	 //  	news[0].body = "test is the body is the \n test test is the body is the \ntest test is the body is the test test is the body is the test";
	 //  	news[0].link = "test";
	 //  	news[0].time =  new Date();

	 //  	news[1] = {}
	 //  	news[1].title = "test";
	 //  	news[1].img = "test";
	 //  	news[1].body = "test is the body is the \n test test is the body is the \ntest test is the body is the test test is the body is the test";
	 //  	news[1].link = "test";
	 //  	news[1].time =  new Date();
	 //  	console.log("news is" + news);

	 //  	news[2] = {}
	 //  	news[2].title = "test";
	 //  	news[2].img = "test";
	 //  	news[2].body = "test is the body is the \n test test is the body is the \ntest test is the body is the test test is the body is the test";
	 //  	news[2].link = "test";
	 //  	news[2].time =  new Date();
		// return res.view('homepage', { news : news });		

		request("http://www.inshorts.com/en/read/"+topic, function(error, response, body) {
		  // got the html, extract data now make a JSON object
		  
		  if(error) {
		  	console.log("Error!!");
		  	news[0] = {}
		  	news[0].title = "Not enough internet speed available ";
		  	news[0].img = "Nothing here.";
		  	news[0].body = "Your internet speed is not sufficient for you to proceed with this demo. Get Airtel 4g dongle. The best of the best.";
		  	news[0].link = "Nowhere";
		  	news[0].time =  new Date();
			return res.view('homepage', { news : news });
		  }
		  else {
			  console.log("loading data");
			  var $ = cheerio.load(body);
			  // var news = [];

			  var news_title = $('.news-card > .news-card-title > a > span');
	  	      var news_image = $('.news-card > .news-card-image > img[itemprop="image"]');
			  var news_body = $('.news-card > .news-card-content > div[itemprop="articleBody"]');
			  var news_time = $('.news-card > .news-card-title > .news-card-author-time > .time' );
			  var news_readmore = $('.news-card > .news-card-footer > .read-more');

			  console.log("loaded data");
			  // console.log(news_readmore.length);
			  // console.log(news_readmore[0].children[1].attribs.href);
			  		  
			  for (key=0; key<news_title.length;key++){
			  	news[key] = {}
			  	news[key].title = news_title[key].children[0].data ;
			  	news[key].img = news_image[key].attribs.src;
			  	news[key].body = news_body[key].children[0].data;
			  	news[key].time = new Date(news_time[key].attribs.content);
			  	news[key].link = news_readmore[key].children[1].attribs.href;
			  }
			
			  // news is list
			  return res.view('homepage', { news : news });
			}

		});
		
		

	}

};



