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
5) To start the bot, run `node index.js` at the root of the repo


# How to auto launch the bot on startup
1) Run `pm2 start index.js` 
2) Run `pm2 startup` and follow the instructions printed to run the command as a root user, this will auto run pm2 on startup
3) Run `pm2 save`, this will auto launch all currently running pm2 processes when pm2 starts for the first time (step 2 makes pm2 launch on startup) 
For further reference, https://pm2.keymetrics.io/docs/usage/startup/
