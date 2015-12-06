var express = require('express');
var request = require('request');
var cheerio = require('cheerio');
var router = express.Router();

var url = "http://www.thenews.com.pk/CitySubIndex.aspx?ID=14";

/* GET users listing. */
router.get('/', function (req, res) {
    request(url, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            var data = scrapeDataFromHtml(body);
            res.send(data);
        }
        return console.log(error);
    });
});

var scrapeDataFromHtml = function (html) {
    var data = {};
    var $ = cheerio.load(html);
    var j = 1;
    $('div.DetailPageIndexBelowContainer').each(function () {
        var a = $(this);
        var fullNewsLink = a.children().children().attr("href");
        var description = a.children().first().text().trim();
        var story = a.children().children().children().last().text();
        var metadata = {
            description: description,
            story: story,
            fullNewsLink : fullNewsLink
        };
        
        data[j] = metadata;
        j++;
    });
    return data;
};



module.exports = router;