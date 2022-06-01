const Twitter = require('twit');

module.exports = function(){
    const TwitConf = require("../../models/twitterKeys");
    return new Twitter(TwitConf)
}