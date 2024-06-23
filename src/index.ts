import dotenv from 'dotenv'
dotenv.config();
import Discord, { Interaction } from 'discord.js'
import BotCommands from './commands/index';
import MediaPlayer from './classes/MediaPlayer';
import { ChatSession, GoogleGenerativeAI } from '@google/generative-ai';

declare global {
  var mediaPlayers: Map<string, MediaPlayer>;
  var guildChats: Map<string, ChatSession>;
  var commandHelp: string;
  var genAI: GoogleGenerativeAI
}

const bot = new Discord.Client({
  intents: ['GuildMessages', 'Guilds', 'GuildMembers', 'GuildPresences', 'GuildVoiceStates']
});
const commands = new Discord.Collection();
global.mediaPlayers = new Map();
global.genAI = new GoogleGenerativeAI(process.env.PALM_API_KEY || '')
global.guildChats = new Map();

for (const command of BotCommands) {
  commands.set(command.name, command)
}

const TOKEN = process.env.TOKEN;

bot.login(TOKEN);

bot.on('ready', async () => {
  console.info(`Logged in as ${bot.user?.username}!`);
  await bot.application?.commands.set(BotCommands);
});

bot.on('interactionCreate', async (interaction: Interaction) => {
  if (interaction.isCommand() || interaction.isContextMenuCommand()) {
    const commandName = interaction.commandName;
    const command = BotCommands.find(e => e.name === commandName);
    if (!interaction.guildId) {
      interaction.reply({ content: "guild id null", ephemeral: true });
      return;
    }
    const guild = bot.guilds.cache.get(interaction.guildId);
    if (!interaction.member) {
      interaction.reply({ content: "member id null", ephemeral: true });
      return;
    }
    console.log('Interaction created by ', interaction.user)
    const member = await guild?.members.fetch(interaction.user);
    const voiceChannel = member?.voice.channel; // don't need to get it this way anymore; fixed intents array
    if (!voiceChannel && command?.requiresVoiceChannel) {
      interaction.reply({ content: "voice channel is null", ephemeral: true });
      return;
    }
    if (!command) {
      interaction.reply({ content: "Could not find command.", ephemeral: true })
      return;
    }
    try {
      command.execute(interaction, voiceChannel);
    } catch {
      interaction.reply({ content: 'Failed to execute command', ephemeral: true })
    }

  }
});