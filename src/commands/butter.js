const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('버터야')
        .setDescription('버터에게 인사해보세요!'),

    async execute(interaction) {
        const butterEmbed = new EmbedBuilder()
            .setColor(0x2a2d31)
            .setDescription("**네! " + `${interaction.user.displayName}` + "교주님!**")

        await interaction.reply({embeds : [butterEmbed]})
    }
}