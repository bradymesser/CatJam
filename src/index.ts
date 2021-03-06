import dotenv from 'dotenv'
dotenv.config();
import Discord, { Interaction } from 'discord.js'
import BotCommands from './commands/index';
import MediaPlayer from './classes/MediaPlayer';

declare global {
  var mediaPlayers: Map<string, MediaPlayer>;
  var commandHelp: string;
}

const bot = new Discord.Client({
  intents: ['GUILD_MESSAGES', 'GUILDS', 'GUILD_MEMBERS', 'GUILD_PRESENCES', 'GUILD_VOICE_STATES']
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
  await bot.application?.commands.set(BotCommands);
});

bot.on('interactionCreate', async (interaction: Interaction) => {
  if (interaction.isCommand() || interaction.isContextMenu()) {
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

    guild?.members.fetch(interaction.user);
    const member = await guild?.members.fetch(interaction.user);
    const voiceChannel = member?.voice.channel; // don't need to get it this way anymore; fixed intents array
    if (!voiceChannel) {
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