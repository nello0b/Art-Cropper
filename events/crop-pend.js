const { Events, AttachmentBuilder } = require('discord.js');
const { createCanvas, loadImage } = require('canvas');
const { pendulumCrop, ignitionSymbol } = require('../crop-details.json');

module.exports = {
	name: Events.MessageCreate,
	async execute(message) {
		// Ignore messages from bots
		if (message.author.bot) return;
		// Check if message has an image attachment
		if (message.content == `${ignitionSymbol}${pendulumCrop.prompt}` && message.attachments.size > 0) {
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

async function processImageAttachment(url) {
	// define the crop dimensions
	const cropLeft = pendulumCrop.left;
	const cropTop = pendulumCrop.top;
	const cropRight = cropLeft + pendulumCrop.imageWidth;
	const cropBottom = cropTop + pendulumCrop.imageHeight;

	// open the image file
	const image = await loadImage(url);

	// create a canvas element with the same dimensions as the image
	const canvas = createCanvas(image.width, image.height);

	// draw the image on the canvas
	const context = canvas.getContext('2d');
	context.drawImage(image, 0, 0);

	// determine the scaling factor for the crop dimensions
	const scalingFactorWidth = image.width / pendulumCrop.cardWidth;
	const scalingFactorHeight = image.height / pendulumCrop.cardHeight;

	// calculate the new crop dimensions based on the scaling factor
	const newCropLeft = Math.round(cropLeft * scalingFactorWidth);
	const newCropTop = Math.round(cropTop * scalingFactorHeight);
	const newCropRight = Math.round(cropRight * scalingFactorWidth);
	const newCropBottom = Math.round(cropBottom * scalingFactorHeight);

	// crop the image
	const croppedImage = context.getImageData(newCropLeft, newCropTop, newCropRight - newCropLeft, newCropBottom - newCropTop);

	// resize the image to a square
	const sizeWidth = croppedImage.width;
	const sizeheighth = croppedImage.height;
	canvas.width = sizeWidth;
	canvas.height = sizeheighth;
	context.clearRect(0, 0, sizeWidth, sizeheighth);
	context.putImageData(croppedImage, 0, 0);

	// return the processed image buffer
	return canvas.toBuffer('image/png');
}
