const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'interactionCreate',
    once: false,
    run: async interaction => {
        if (!interaction.isChatInputCommand()) return;

        const command = interaction.client.commands.get(interaction.commandName);

        if (!command) return;

        try {
            await command.execute(interaction);
        } catch (error) {
            console.error(error);
            const errorEmbed = new EmbedBuilder()
                .setColor(0xFFCCFF)
                .setDescription('버터가 펜케이크 위에서 녹음.. [오프라인🥞]')
            await interaction.reply({ embeds: [errorEmbed], ephemeral: true });
        }
    }
}