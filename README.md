# Requirements
* Node, initally setup with v17.0.1 but others probably work
* npm
* pm2 `npm install -g pm2`
* ffmpeg (finnicky on windows but can work, linux is strongly recommended for running the bot)

# Setup
1) Clone this repo
2) Run `npm install`
3) If you haven't already, create a bot in discords developer portal https://www.sitepoint.com/discord-bot-node-js/ this guide can help with that
4) Copy your bots auth token and place it in a .env file at the root of this repo under a variable named `TOKEN` ie `TOKEN=[your key here]`
5) Following the guide here https://developers.google.com/youtube/v3/getting-started register for a youtube-api-v[N] API access key
6) Copy your youtube api access key and put it in a variable in the .env named `YT_KEY`
7) To start the bot, run `node index.js` at the root of the repo


# How to auto launch the bot on startup
1) Run `pm2 start index.js` 
2) Run `pm2 startup` and follow the instructions printed to run the command as a root user, this will auto run pm2 on startup
3) Run `pm2 save`, this will auto launch all currently running pm2 processes when pm2 starts for the first time (step 2 makes pm2 launch on startup) 
For further reference, https://pm2.keymetrics.io/docs/usage/startup/

# Commands
* Once you have added the bot to a discord server, use the command `!help` to get a list of all available commands

# Issues
* If you encounter an issue, open an issue in this repo and I'll look into it (no guarantees on how long a fix will take)
* Alternatively, Feel free to open a pull request to either fix issues / improve the bot
