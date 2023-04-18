const { Events, AttachmentBuilder } = require('discord.js');
const { createCanvas, loadImage } = require('canvas');
const { normalCrop, ignitionSymbol } = require('../crop-details.json');
const { processImageAttachment } = require('../crop_functions/normalCrop.js');

module.exports = {
	name: Events.MessageCreate,
	async execute(message) {
		// Ignore messages from bots
		if (message.author.bot) return;
		// Check if message has an image attachment
		if (message.content == `${ignitionSymbol}${normalCrop.prompt}` && message.attachments.size > 0) {
			const attachmentFiles = [];
			await Promise.all(message.attachments.map(async (attachment) => {
				if (attachment.contentType.startsWith('image/')) {
					try {
						const response = await processImageAttachment(attachment.url);
						const attachmentName = `processed-${attachment.name}`;
						const attachmentFile = new AttachmentBuilder(response, { name: attachmentName });
						attachmentFiles.push(attachmentFile);
					}
					catch (err) {
						console.error(err);
						await message.reply('An error occurred while processing the image.');
					}
				}
			}));
			if (attachmentFiles.length > 0) {
				await message.reply({ files: attachmentFiles });
				// await message.delete();
			}
		}
	},
};