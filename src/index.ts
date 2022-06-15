// require('dotenv').config();
import dotenv from 'dotenv'
dotenv.config();
// const Discord = require('discord.js');
import Discord, { Message } from 'discord.js'
// const botCommands = require('./commands');
import BotCommands from './commands/index';
import { Command } from './interfaces/command';
import MediaPlayer from 'src/classes/MediaPlayer';
import { Bark } from './commands/bark';

declare global {
  var mediaPlayers: Map<string, MediaPlayer>;
  var commandHelp: string;
}

const bot = new Discord.Client({
  intents: ['GUILD_MESSAGES']
});
const commands = new Discord.Collection();
global.mediaPlayers = new Map();

for (const command of BotCommands) {
  commands.set(command.name, command)
}

const TOKEN = process.env.TOKEN;

bot.login(TOKEN);

bot.on('ready', async () => {
  console.info(`Logged in as ${bot.user?.username}!`);
  await bot.application?.commands.set([Bark]);
  console.log(bot.application?.commands)
});

bot.on('messageCreate', msg => {
  console.log('here')
  if (msg.author.bot) return;
  const args = msg.content.split(/ +/);
  const command = args.shift()?.toLowerCase();
  console.info(`Called command: ${command}`);

  if (!commands.has(command)) return;

  try {
    BotCommands.find(e => e.name === command)?.execute(msg, args);
  } catch (error) {
    console.error(error);
    msg.reply('There was an error trying to execute that command! Try running !restart');
  }
});
// bot.on('guildMemberSpeaking', async (member, speaking) => {
//   console.log('here');
//   if (member.voiceChannel) {
//     console.log('here', speaking)
//   }
//   return;
//   // const args = msg.content.split(/ +/);
//   // const command = args.shift().toLowerCase();
//   // console.info(`Called command: ${command}`);

//   // if (!bot.commands.has(command)) return;

//   // try {
//   //   bot.commands.get(command).execute(msg, args);
//   // } catch (error) {
//   //   console.error(error);
//   //   msg.reply('there was an error trying to execute that command!');
//   // }
// });
