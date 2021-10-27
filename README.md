# Discord Bot Example Code

I use the following code for my own Discord Bot on one of the servers I run geared towards an Artist/Band. If you wish to use this, you will need to change some of the code to fit the IDs for your Discord Server. You will also need to have a Twitter Dev application setup, a Discord , as well as a Heroku app for deployment (or your prefered hosting platform). Tokens are not included as these are private. You will get these from the [Discord Developer Application Portal](https://discord.com/developers/applications) and [Twitter Developer Dashboard](https://developer.twitter.com/en/portal/dashboard).


## What does this bot do?
This bot was designed for formatting/posting messages rather than a user posting it themselves. This will post messages such as the server rules, role assignment messages (used with reaction-roles dependency, and will keep an eye out for banned words. This will also allow you to connect a Twitter app to allow tweets of a certain user to be sent to the server. Compared to other service that do this such as Zapier, this will update a lot faster with the messages being posted (in my case) less than a minute after tweeting. For testing purposes, the twitter account @Every3Minutes is used.

The reaction roles function uses the format I use for my server. Feel free to change them to your liking.

## Dependancies
Run the following to install the needed packages (npm has been used for this process)

`npm i discord.js`

`npm i dotenv`

`npm i reaction-role`

`npm i twit`

This bot currently works on the following dependency versions

> discord.js: 12.5.1

> dotenv: 8.2.0

> reaction-role: 4.1.0

> twit: 2.2.11
