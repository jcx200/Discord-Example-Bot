const Roles = require('../models/roles');
const PREFIX = "t?"

module.exports = function(message) {
    return(!message.content.toLowerCase().startsWith(PREFIX) || message.author.bot || !message.member.roles.cache.has(Roles.owner) || !message.member.roles.cache.has(Roles.moderator));
}