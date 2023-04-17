const { Events } = require('discord.js');

module.exports = {
	name: Events.InteractionCreate,
	async execute(interaction) {
		// challengeInvite
		const buttonIds = ['challengeInviteAccept', 'challengeInviteDecline'];
		if (interaction.isButton() && buttonIds.includes(interaction.customId)) {
			await interaction.update(`Button with custom ID ${interaction.customId} was pressed in message with ID ${interaction.message.id}, by the user ${interaction.user}.`);
			// await interaction.reply(`Button with custom ID ${interaction.customId} was pressed in message with ID ${interaction.message.id}, by the user ${interaction.user}.`);
		}
	},
};