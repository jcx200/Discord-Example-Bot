const { REST } = require('@discordjs/rest');
require('dotenv').config();
const fs = require('fs');
const path = require('path');
const { Routes } = require('discord-api-types/v9');
const addCommands = require('../functions/addCommands');
const Channels = require('../models/channels');

module.exports = {
    name: 'ready',
    once: true,
    execute(client) {
        const clientID = process.env.CLIENT_ID;
        const guildID = process.env.GUILD_ID;
        const token = process.env.DISCORD_TOKEN;

        const commands = [];
        const commandsPath = path.join(__dirname, '../', 'commands');
        const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
        addCommands(commands, commandsPath, commandFiles);

        const rest = new REST({ version: '9' }).setToken(token);

        rest.put(Routes.applicationGuildCommands(clientID, guildID), { body: commands })
            .then(() => console.log('Successfully registered application commands.'))
            .catch(console.error);

        var onReadyMessage = `Bot logged in at: \n${new Date(Date.now()).toString()}`;
        client.channels.cache.get(Channels.bot_logs).send(onReadyMessage);
        console.log(onReadyMessage);
    }   
}