# Art_Cropper

This is a Discord bot programmed with Node.js that can crop the art out of Yugioh cards. All the user needs to do to use the bot is write `~crop` or `~crop-pend` (for Pendulum Monsters) and attach the images of the cards they want cropped. The bot will then send back the art of those cards.

## Demo

![image](https://user-images.githubusercontent.com/72969087/232903501-5f5230be-4d3d-42ca-abef-e9a660b275de.png)

## Setup

To set up the project, follow these steps:

1. Clone the repository using `git clone https://github.com/nello0b/Art-Cropper.git`.
2. Navigate to the project directory using `cd Art-Cropper`.
3. Run `npm install` to install the dependencies.
4. Set up a Discord bot and give it the "MESSAGE CONTENT INTENT" in the "Discord Developer Portal".
5. Take the token ID and place it in the `config-demo.json` file.
6. Rename `config-demo.json` to `config.json`.
7. Create an invite link for the bot by going to your Discord Developer Portal and clicking on your bot application. Under the "OAuth2" tab, select `bot` as the scope and then select the permissions: `Send Messages`,`Send Messages in Threads`, `Attach Files` and `Read Message History`. Copy the generated link and invite the bot to your Discord server.
8. Start the bot using `node .`.

If you see "Ready! Logged in as [Your Bot Name]" you are done and ready to crop!

## Usage

To use the bot, follow these steps:

1. Invite the bot to your Discord server.
2. Type `~crop` or `~crop-pend` in the channel where you want to use the bot.
3. Attach the images of the cards you want cropped.
4. The bot will send back the art of the cards.

## Contributing

If you want to contribute to the project, please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Make your changes and test them thoroughly.
4. Submit a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## Contact

If you have any questions or suggestions, feel free to contact the project owner at nello0b@gmail.com.
