const isValidTwitterUser = require('../functions/twitter/validUser');
const sendTweet = require('../functions/twitter/sendTweet');

module.exports = {
    name: 'tweet',
    once: false,
    execute(tweet) {
        if (isValidTwitterUser(tweet))
            sendTweet(tweet);  
    }
}
