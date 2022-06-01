const path = require('path');

module.exports = function (commandList, commandPath, commandFiles) {
    for (const file of commandFiles) {
        const filePath = path.join(commandPath, file);
        const command = require(filePath);
        commandList.push(command.data.toJSON());
        client.commands.set(command.data.name, command);
    }
}