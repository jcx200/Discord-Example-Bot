# Discord Bot Example Code

I use the following code for my own Discord Bot on one of the servers I run geared towards an Artist/Band. If you wish to use this, you will need to change some of the code to fit the IDs for your Discord Server. You will also need to have a Twitter Dev application setup, a Discord , as well as a Heroku app for deployment (or your prefered hosting platform). Tokens are not included as these are private. You will get these from the [Discord Developer Application Portal](https://discord.com/developers/applications) and [Twitter Developer Dashboard](https://developer.twitter.com/en/portal/dashboard).


## What does this bot do?
This bot was designed for formatting/posting messages rather than a user posting it themselves. Some example slash commands have been added as well as an example of prefixed commands.

The bot will also allow you to connect a Twitter app to allow tweets of a certain user to be sent to the server. Compared to other services that do this such as Zapier, this will update a lot faster with the messages being posted (in my case) less than a minute after tweeting.

## Dependancies
This bot was buildt on NodeJS version 16.15.0. I cannot verify if it works on other versions.
If using the included package.json file, you can install required packages using.

> npm i 

OR

> npm i -S

This bot currently works on the following dependency versions

>"@discordjs/builders": "^0.13.0"

> "@discordjs/rest": "^0.4.1"
   
> "concurrently": "^7.2.1"  

> "discord-api-types": "^0.30.0"

> "discord.js": "^13.7.0"

> "dotenv": "^8.2.0"

> "twit": "^2.2.11"
