var request = require('request');
var cheerio = require('cheerio');
module.exports = {

	getNews : function (req,res){
		var topic = req.params.topic;
		
		console.log('received ' + topic );
		var body = null;

		request("http://www.inshorts.com/en/read/"+topic, function(error, response, body) {
		  // got the html, extract data now make a JSON object
		  console.log("loading data");
		  var $ = cheerio.load(body);
		  var news = {};
		  
		  // console.log(body);


		  // news title 
		  // console.log(news[0].children[0].data);

		  var news_title = $('.news-card > .news-card-title > a > span');
  	      var news_image = $('.news-card > .news-card-image > img[itemprop="image"]');
		  var news_body = $('.news-card > .news-card-content > div[itemprop="articleBody"]');
		  var news_time = $('.news-card > .news-card-title > .news-card-author-time > .time' );

		  		  
		  for (key=0; key<news_title.length;key++){
		  	news[key] = {}
		  	news[key].title = news_title[key].children[0].data ;
		  	news[key].img = news_image[key].attribs.src;
		  	news[key].body = news_body[key].children[0].data;
		  	news[key].time = news_time[key].attribs.content;
		  }
		  res.json(news);
		});
		
		

	}

};



