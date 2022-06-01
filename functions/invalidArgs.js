module.exports = function(message) {
    message.reply('Invalid argument length: Please provide arguments')
        .then(msg => {
            setTimeout(() => msg.delete(), 4000)
        })
  .catch(console.error);
  setTimeout(() => { message.delete() }, 5000);
}