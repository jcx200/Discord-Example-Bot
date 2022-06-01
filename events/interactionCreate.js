module.exports = {
    name: 'interactionCreate',
    once: false,
    async execute(interaction) {
      if (!interaction.isCommand()) return;
      console.log(`${interaction.user.tag} in #${interaction.channel.name} triggered an interaction.`);
      const command = interaction.client.commands.get(interaction.commandName);

      try {
        await command.execute(interaction);
      } 
      catch (err) {
			  if (err) console.error(err);

        await interaction.reply({
          content: `An error occurred while executing that command. ${err}`,
          ephemeral: true,
        });
      }
  }
}