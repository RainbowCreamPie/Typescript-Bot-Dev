import { EmbedBuilder } from '@discordjs/builders';
import type { CommandData, SlashCommandProps } from 'commandkit';
import { ApplicationCommandOptionType } from 'discord.js';
import moment from 'moment';
 
export const data: CommandData = {
    name: 'profile',
    description: "See your/someone's in profile",
    options :[
        {
            name : 'user',
            description : "Show other user profile",
            type : ApplicationCommandOptionType.Mentionable
        },
    ]
}
 
export async function run({ interaction, client, handler }: SlashCommandProps) {
    const user = interaction.options.getUser('user') || interaction.user;
    const member = await interaction.guild?.members.fetch(user.id);
    const avatarUser = user.displayAvatarURL({ size : 256 });
    const roleMember = member?.roles.cache
        .filter((role) => role.id !== interaction.guild?.id)
        .map((role) => role.toString());
    const nickname = member?.displayName || 'None'

    const embedProfile = new EmbedBuilder()
        .setTitle(`${nickname}'s Profile`)
        .setColor(0xE579FF)
        .setThumbnail(avatarUser)
        .setTimestamp()
        .setFooter({ text : `Username : ${user.username}`})
        .addFields(
            { 
                name : 'Joined Server',
                value : `${moment.utc(member?.joinedAt).format('DD/MM/YYYY')}`,
                inline : true
            },
            { 
                name : 'Joined Discord',
                value : `${moment.utc(user.createdAt).format('DD/MM/YYYY')}`,
                inline : true
            },
            {
                name: "Role Server",
                value : `${roleMember}`,
                inline: false,
            }
        )
    
    interaction.reply({ embeds: [embedProfile] })
}