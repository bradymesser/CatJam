// require('dotenv').config();
import dotenv from 'dotenv'
dotenv.config();
// const Discord = require('discord.js');
import Discord from 'discord.js'
// const botCommands = require('./commands');
import botCommands from './commands/index.js';
import { getVoiceConnection } from '@discordjs/voice';
const bot = new Discord.Client();
bot.commands = new Discord.Collection();
global.mediaPlayers = new Map();
const listenStreams = new Map();

Object.keys(botCommands).map(key => {
  bot.commands.set(botCommands[key].name, botCommands[key]);
});

const TOKEN = process.env.TOKEN;

bot.login(TOKEN);

bot.on('ready', () => {
  console.info(`Logged in as ${bot.user.tag}!`);
});

bot.on('message', msg => {
  const args = msg.content.split(/ +/);
  const command = args.shift().toLowerCase();
  console.info(`Called command: ${command}`);

  if (!bot.commands.has(command)) return;

  try {
    bot.commands.get(command).execute(msg, args);
  } catch (error) {
    console.error(error);
    msg.reply('There was an error trying to execute that command! Try running !restart');
  }
});

bot.on('interactionCreate', async (interaction) => {
  console.log('asdf')

})
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
