const { SlashCommandBuilder } = require ("@discordjs/builders")
const { execute } = require("../events/ready")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("serverinfo")
        .setDescription("Get server information!"),
    async execute(interaction) {
        var serverAge = Date.now() - interaction.guild.createdAt;
        serverAge = Math.round((serverAge)/(1000*60*60*24));
        await interaction.reply(`Server name: ${interaction.guild.name}\nTotal members: ${interaction.guild.memberCount}` +
                          `\nThis server was created on ${interaction.guild.createdAt} which was ${serverAge} days ago`);

    }
}