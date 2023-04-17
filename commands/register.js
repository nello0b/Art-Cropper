const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');



module.exports = {
	data: new SlashCommandBuilder()
		.setName('register')
		.setDescription('Register to ladder'),
	async execute(interaction) {

		let { title, description } = registrationFormats.getError();
		try {
			if (!(await user.isRegistered(interaction.user))) {
				const formattedDay = time.string(new Date());

				await db.getDatabase().collection('users').insertOne({
					user: interaction.user,
					joiningTime: formattedDay,
				});

				({ title, description } = registrationFormats.getSuccess());

			}
			else {
				({ title, description } = registrationFormats.getFail());
			}
		}
		catch (e) {
			console.error(e);
		}

		const embed = new EmbedBuilder()
			.setColor(0xAA6600)
			.setTitle(title)
			.setDescription(description);


		await interaction.reply({ ephemeral: false, embeds: [embed] });

	},
};
