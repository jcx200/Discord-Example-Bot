const { Role } = require('discord.js');
const Roles = require('../models/roles');
const hasPrefixCommandPermission = require('../functions/commandPermissions');
const invalidArgs = require('../functions/invalidArgs');
const parseAndSendCommand = require('../functions/parseCommand')
const PREFIX = "t?"

module.exports = {
    name: 'messageCreate',
    once: false,
    async execute(message) {
        if (hasPrefixCommandPermission(message))
            return;

        const arg = message.content.slice(PREFIX.length).split(/ +/)
        const command = arg.shift().toLowerCase()
        try{
            switch(command){
                case "announcement":
                    if(!arg.length) {
                        invalidArgs(message);
                        break;
                    }
              
                    parseAndSendCommand(arg, message, Roles.announcement);
                    break;
    
                case "everyone":
                    if(!arg.length) {
                        invalidArgs(message);
                        break;
                    }
                    parseAndSendCommand(arg, message, Roles.everyone);
                    break;
                default:
                    break;
            }
        }
        catch(e){}
  }
}