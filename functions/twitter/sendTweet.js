const Roles = require('../../models/roles')
const Channels = require ('../../models/channels');

module.exports = function(tweet){
    const twitterMessage = `<@&${Roles.twitter_announcements}> New Tweet from ${tweet.user.name}: \nhttps://twitter.com/${tweet.user.screen_name}/status/${tweet.id_str}`
    try{
        client.channels.cache.get(Channels.updates).send(twitterMessage);
    }
    catch(e){}
}