const { createCanvas, loadImage } = require('canvas');
const { normalCrop } = require('../crop-details.json');

async function processImageAttachment(url) {
    // define the crop dimensions
    const cropLeft = normalCrop.left;
    const cropTop = normalCrop.top;
    const cropRight = cropLeft + normalCrop.imageWidth;
    const cropBottom = cropTop + normalCrop.imageHeight;

    // open the image file
    const image = await loadImage(url);

    // create a canvas element with the same dimensions as the image
    const canvas = createCanvas(image.width, image.height);

    // draw the image on the canvas
    const context = canvas.getContext('2d');
    context.drawImage(image, 0, 0);

    // determine the scaling factor for the crop dimensions
    const scalingFactor = Math.min(image.width / normalCrop.cardWidth, image.height / normalCrop.cardHeight);

    // calculate the new crop dimensions based on the scaling factor
    const newCropLeft = Math.round(cropLeft * scalingFactor);
    const newCropTop = Math.round(cropTop * scalingFactor);
    const newCropRight = Math.round(cropRight * scalingFactor);
    const newCropBottom = Math.round(cropBottom * scalingFactor);

    // crop the image
    const croppedImage = context.getImageData(newCropLeft, newCropTop, newCropRight - newCropLeft, newCropBottom - newCropTop);

    // resize the image to a square
    const size = Math.min(croppedImage.width, croppedImage.height);
    canvas.width = size;
    canvas.height = size;
    context.clearRect(0, 0, size, size);
    context.putImageData(croppedImage, 0, 0);

    // return the processed image buffer
    return canvas.toBuffer('image/png');
}

module.exports = { processImageAttachment };