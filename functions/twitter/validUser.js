const TwitterUsers = require("../../models/twitterUsers")

module.exports = function(tweet){
    return (tweet.user.id == TwitterUsers.userID1 || tweet.user.id == TwitterUsers.userID2|| tweet.user.id == TwitterUsers.userID3)
}