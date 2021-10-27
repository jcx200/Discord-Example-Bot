const Discord = require('discord.js');
const Twitter = require('twit');
const {ReactionRole} = require("reaction-role");
const banned_words = require('./blacklist.json'); //Banned Words - Mentions of these words will be deleted and user will be warned


//CONNECTION TOKEN
const TOKEN = process.env.REACT_ROLES_TOKEN;
const client = new ReactionRole(TOKEN);

//Reaction Roles
// Message IDs, Role IDs, and Channel ID's can be found by enabling Discord Developer settings
// Messages will need to be posted first by the bot or by you, then you will need to get the ID of the message. Roles will need to be created prior to this too
const him = client.createOption("🟦", ["ROLEID"], "You have assigned yourself the following role: He/Him", "You have removed the following role: He/Him");
const her = client.createOption("🟪" , ["ROLEID"], "You have assigned yourself the following role: She/Her", "You have removed the following role: She/Her");
const they = client.createOption("⬜", ["ROLEID"], "You have assigned yourself the following role: They/Them", "You have removed the following role: They/Them"); 

const twitterAnnouncement = client.createOption("🦜", ["ROLEID"], "You have now opted in for tweet notifications", "You have now opted out of tweet notifications");
const youtubeUploads = client.createOption("🎦", ["ROLEID"], "You have opted in to be notified of YouTube uploads", "You have opted out of being notified of YouTube uploads");

const antipolitics = client.createOption("🔐", ["ROLEID"],"You have opted out of the Politics channel. The channel will now be hidden.", "You have opted back into viewing the Politics channel");
//Announcements
const subToAnnounce = client.createOption("✅", ["ROLEID"], "You are now following the announcements channel", "You have unfollowed the announcements channel");


//ROLE

const ROLECHANNEL = 'CHANNEL ID';
const RESTRICTIONS = [];

client.createMessage(ROLECHANNEL, "MESSAGEID", RESTRICTIONS, him, her, they);
client.createMessage(ROLECHANNEL, "MESSAGEID", RESTRICTIONS, subToAnnounce);
client.createMessage(ROLECHANNEL, "MESSAGEID", RESTRICTIONS, twitterAnnouncement, youtubeUploads);
client.createMessage(ROLECHANNEL, "MESSAGEID", RESTRICTIONS, antipolitics);


// Create your own Keys/Twitter connection here https://developer.twitter.com/
const TwitConf = {
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token: process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
}

const UPDATESCHANNEL = 'CHANNELID';
const TwitterClient = new Twitter(TwitConf);


const stream = TwitterClient.stream('statuses/filter', {follow:'2899773086'}); //You can search the ID of a user through here: https://codeofaninja.com/tools/find-twitter-id/

stream.on('tweet', tweet => {
    //If statement makes sure retweets from other users or replies are not included
    if (tweet.user.screen_name.toLowerCase() != "every3minutes"){
    console.log("User is not @every3minutes - tweet is a response, mention, or a retweet");
    }
    else{
        const twitterMessage = `<@&ROLEID> New Tweet from ${tweet.user.name} (${tweet.user,screen_name}): \nhttps://twitter.com/${tweet.user.screen_name}/status/${tweet.id_str}`
        client.channels.cache.get(UPDATESCHANNEL).send(twitterMessage);
        console.log(`${tweet.user.name} Tweet:  ${tweet.text}`);
    }
    return false;
})






//Log the client in. This works the same as client.login(token) provided in Discord.js. .init() comes from reaction roles and does the same thing
client.init();

//Once logged in, console will be updated
client.on('ready', () => {
  console.log("Bot has logged in");
});

//Listen for messages
client.on('message', (message) => {
  //if the message was sent by the bot, or was sent by a user without the right permissions exit
  if (!message.member.roles.cache.has('ADMIN ROLE ID') || !message.member.roles.cache.has('MOD ROLE ID') || message.author.bot) return; //It is possible to just use one role ID. In the instance that I use it for, I require two
  
  //Split the message into command and arguments for certain commands 
  const args = message.content.slice(2).trim().split(/ +/);
  const command = args.shift().toLowerCase();


  //These commands should only need to be used once just for info
  switch(message.content.toLowerCase()){

      case "t?welcome":
        message.delete();
        message.channel.send("Welcome to the Server!");
        break;

    case "t?rules":
        message.delete();
        const embed = new Discord.MessageEmbed()
        .setTitle("Rules")
        .setDescription("Rule 1: A rule\n\n" +
        "Rule 2: A rule\n\n " +
        "Rule 3: A rule\n\n" +
        "Rule 4: A rule\n\n" +
        "Rule 5: A rule\n\n" +
        "Rule 6: A rule\n\n" +
        "Rule 7: A rule\n\n" +
        "Rule 8: A rule\n\n" +
        "Rule 9: A rule\n\n" +
        "Rule 10: A rule\n\n" +
        "Rule 11: A rule")
    
        .setFooter("Please remember to also follow the Discord TOS whilst using this server and Discord as a platform. Moderators may ban users due to other issues unspecified in the rule list. If you feel that you’ve been treated unfairly, please DM a moderator to discuss. If you feel uncomfortable in this server due to another member or due to other issues, please report this to a member of the moderation or a server admin.");
    
        message.channel.send(embed);
        break;

    case "t?pronouns":
        message.delete();
        message.channel.send("You can set your preferred pronouns here. Use the reactions to set your role. \n🟦 = He/Him \n\n🟪 = She/Her \n\n⬜ = They/Them");
        break;

    case "t?optout":
        message.delete();
        message.channel.send("If you want to hide the politics channel, you can opt out of seeing it by reacting with 🗳️ below. Please note that political discussion will not be allowed in other channels");
        break;

    case "t?sub":
        message.delete();
        message.channel.send("To be notified of announcements, use the ✅ reaction to signup");;
        break;
    case "t?socials":
        message.delete();
        message.channel.send("Use the 🐦 emoji to opt into Tweet notifications from Frank and use the 🎦 emoji to opt into YouTube upload notifications");
        break;
    case "t?permalink":
        message.delete();
        message.channel.send("If you want to share the server with anyone, a permanent link is available here: \n\n https://discord.gg/SERVERLINK");
        break;
    case "t?help":
        const embed = new Discord.MessageEmbed()
        .setTitle("Bot Commands")
        .addField("t?welcome", "Display Welcome Message")
        .addField("t?rules", "Display the rules of the server")
        .addField("t?pronouns", "Allow users to select pronouns. Note: If you need to repost this, the message ID will need to be changed in the createMessage() method")
        .addField("t?announcement", "Create an post though the bot. Attatch the desired announcement to as a message at the end of the command")
        .addField("t?everyone", "Create an post though the bot that mentions everyone. Attatch the desired announcement to as a message at the end of the command")
        .addField("t?sub", "Post option to sub to announcements channel")
        .addField("t?permalink", "Display a permanent link for the server")
        .addField("t?partners", "Add an embeded post for partner server. To use command - type t?partners <server name> ENDTITLE <server description> ENDDESC  <link>. Use of ENDTITLE and ENDDESC is important to separate title, description and link")
        .addField("t?optout", "Allow users to opt out of the Politics channel")
        .addField("t?socials", "Allow users to be notified of YT Uploads and Tweets");
        message.channel.send(embed);
        break;
    default:
        if(message.content.toLowerCase().startsWith("t?")){
            console.log("Invalid command entered");
            message.channel.send("You have entered an invalid command! Use t?help to view bot commands");
        }
        else if (message.content.toLowerCase().startsWith("t?announcement")){
            if (!args.length){
              return message.channel.send("Error: No arguments were provided")
            }
            else{ 
        
              var msg = '<@&ROLEID> '; //ROLE ID FOR ANNOUNCEMENTS
              console.log(args);
              for (var i = 0; i < args.length; i++){
                msg += args[i].toString() + " ";
              }
              message.delete();
              message.channel.send(`${msg}`);
            }
        }
        else if (message.content.toLowerCase().startsWith("t?everyone")){
            if (!args.length){
              return message.channel.send("Error: No arguments were provided")
            }
            else{
        
              var msg = '@everyone ';
              console.log(args);
              for (var i = 0; i < args.length; i++){
                msg += args[i].toString() + " ";
              }
              message.delete();
              message.channel.send(`${msg}`);
            }
          }
        else if (message.content.toLowerCase().startsWith("t?partners")){
            if (!args.length){
              return message.channel.send("Error: No arguments were provided")
            }
            else{
        
              var title = ' ';
              console.log(args);
        
              const startDecPos = args.indexOf('ENDTITLE');
              for(var i = 0; i < startDecPos; i++){
                title += args[i].toString() + " "
              }
        
        
              var msg = ' ';
              const endDescPos = args.indexOf('ENDDESC');
              for(var i = startDecPos + 1; i< endDescPos; i++){
                msg += args[i].toString() + " ";
              }
        
              var url = args[args.length - 1];
        
        
              message.delete();
              const embed = new Discord.MessageEmbed().setTitle(title).setDescription(msg).addField("Invite Link", url);
              message.channel.send(embed);
              console.log(url);
              message.channel.send(url);
            }
        }
        else return;
    };


  //Check for mention of banned words
  for (var i = 0; i < banned_words.length; i++){
    if (message.content.toLowerCase().includes(banned_words[i])){
      const user = message.author;
      message.delete().then(msg => console.log(`Deleted message from ${msg.author.username}`)).catch(console.error);
      message.channel.send(`${user} Your message contained inappropriate content and has been removed. Repeat violations may result in a ban`);
      break;
    }
  }

});
