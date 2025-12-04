# I have not updated this bot recently, the last I checked the youtube playback functionality was broken

# Environment variable setup
* Create a file named `.env`
* Copy the contents of `example.env` and paste it into `.env`
* Fill in the values for each of your keys
* `TOKEN` is the api key of your discord bot
* `YT_KEY` is the api key for your youtube-api key
* `PALM_API_KEY` is optional, but required if you want the `/ask` command to work
* See the section labeled `Setup` for more information

# Using Docker
* Run `docker build -t catjam .`
* Once the image is built, run `docker run catjam`

Alternatively, you can run the bot without docker following the steps below

# Requirements
* Node, initally setup with v17.0.1 
* npm
* pm2 `npm install -g pm2` will install pm2 globally
* ts-node `npm install -g ts-node` will install ts-node globally
* ffmpeg (finnicky on windows but can work, linux is strongly recommended for running the bot)

# Setup
1) Clone this repo
2) Run `npm install`
3) If you haven't already, create a bot in discords developer portal https://www.sitepoint.com/discord-bot-node-js/ this guide can help with that
4) Copy your bots auth token and place it in a .env file at the root of this repo under a variable named `TOKEN` ie `TOKEN=[your key here]`
5) Following the guide here https://developers.google.com/youtube/v3/getting-started register for a youtube-api-v[N] API access key
6) Copy your youtube api access key and put it in a variable in the .env named `YT_KEY`
7) If you want to use the /ask command, create a google PALM api key (https://makersuite.google.com/app/apikey) and place it in a variable named `PALM_API_KEY`
8) To start the bot, run `npm start` at the root of the repo


# How to auto launch the bot on startup
1) Run `pm2 start ts-node -- -P tsconfig.json ./src/index.ts` 
2) Run `pm2 startup` and follow the instructions printed to run the command as a root user, this will auto run pm2 on startup
3) Run `pm2 save`, this will auto launch all currently running pm2 processes when pm2 starts for the first time (step 2 makes pm2 launch on startup) 
For further reference, https://pm2.keymetrics.io/docs/usage/startup/

# Commands
* Once you have added the bot to a discord server, use the command `/help` to get a list of all available commands

# Issues
* If you encounter an issue, open an issue in this repo and I'll look into it (no guarantees on how long a fix will take)
* Alternatively, Feel free to open a pull request to either fix issues / improve the bot

# TODO
* Implement voice commands using https://github.com/evancohen/sonus
