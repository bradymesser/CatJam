import { ApplicationCommandOptionType, MessageContextMenuCommandInteraction, VoiceBasedChannel } from "discord.js";
import { Command } from "../interfaces/command";
import fetch from "node-fetch";
export const Ask: Command = {
    name: 'ask',
    description: '`/ask` to ask googles language model a question',
    options: [{
        name: 'input',
        description: '[text]',
        type: ApplicationCommandOptionType.String
    }],
    requiresVoiceChannel: false,
    async execute(interaction: MessageContextMenuCommandInteraction, channel: VoiceBasedChannel) {
        const genAI = global.genAI;
        const model = genAI.getGenerativeModel({model: 'gemini-pro'});
        const input = interaction.options.get('input')?.value as string;
        interaction.reply(`\`${input}\``)
        const chat = model.startChat({
            history: [
                {
                    role: 'user',
                    parts: 'You are a sentient monkey named MonkeJam'
                },
                {
                    role: 'model',
                    parts: 'Okay'
                }
            ]
        })
        const result = await chat.sendMessage(input);
        const text = result.response.text();
        const size = 2000;
        const numChunks = Math.ceil(text.length / size)
        for (let i = 0, o = 0; i < numChunks; ++i, o += size) {
        const chunk = text.substring(o, i === numChunks - 1 ? text.length : size) 
        interaction.followUp(chunk)
        }
    },
};
