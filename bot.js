require('dotenv').config();
const fs = require('fs');
const path = require('path');
const {Client, Intents, Collection, DiscordAPIError, Collector} = require('discord.js');
const Twitter = require('twit');
const { Routes } = require('discord-api-types/v9');


//Create objects
const TwitterUsers = require("./models/twitterUsers")
const Channels = require("./models/channels")
const Roles = require("./models/roles")

//Import functions
const addEvents = require('./functions/addEvents')
const TwitConf = require('./functions/twitter/createTwitterClient');

//Define clients
global.client = new Client({intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
const TwitterClient = TwitConf();

const commands = [];
client.commands = new Collection();

//Add events
const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));
addEvents(client, eventFiles, eventsPath, commands);

const twitterFeed = TwitterClient.stream('statuses/filter', {
  follow: [
    TwitterUsers.userID1,
    TwitterUsers.userID2, 
    TwitterUsers.userID3
  ]
});

const twitEventsPath = path.join(__dirname, 'twitter-events');
const twitFiles = fs.readdirSync(twitEventsPath).filter(file => file.endsWith('.js'));
addEvents(twitterFeed, twitFiles, twitEventsPath, commands)

client.login(process.env.DISCORD_TOKEN);