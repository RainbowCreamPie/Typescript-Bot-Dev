import type { CommandData, SlashCommandProps } from 'commandkit';

export const data: CommandData = {
    name : 'ping',
    description: 'Run execution time',
};

export async function run ({ interaction, client } : SlashCommandProps) {
    await interaction.deferReply();

    const reply = await interaction.fetchReply();

    const ping = reply.createdTimestamp - interaction.createdTimestamp;

    interaction.editReply(
        `Pong! Client ${ping}ms | Websocket: ${client.ws.ping}ms`
    );
}