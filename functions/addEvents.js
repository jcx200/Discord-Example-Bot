const path = require('path');

module.exports = function(client, eventFiles, eventsPath, commands) {
    for (const file of eventFiles) {
      const filePath = path.join(eventsPath, file);
      const event = require(filePath);
      
      if(event.once)
        client.once(event.name, (...args) => event.execute(...args, commands));
      else
        client.on(event.name, (...args) => event.execute(...args, commands));
    }
}