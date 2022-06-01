module.exports = function(arg, message, role){
    var str = ''
    arg.forEach((element) =>  {
        str += `${element} `
    });

    message.delete();
    message.channel.send(`<@&${role}> ${str}`);
}