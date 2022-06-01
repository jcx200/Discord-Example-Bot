const { SlashCommandBuilder } = require ("@discordjs/builders")
const { execute } = require("../events/ready")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("serverlink")
        .setDescription("Get a link to the server to share with others!"),
    async execute(interaction) {
        interaction.reply("Here you go! The link is ________");
    }
}