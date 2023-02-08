const { informations } = require('../config.json');

module.exports = {
    name: 'interactionCreate',
    async execute(interaction) {
        if (interaction.member.id == informations.clientId) return;

        if (interaction.isChatInputCommand()){
            // Commands interaction
            const command = interaction.client.commands.get(interaction.commandName);

            if (!command) return;

            try {
                console.log(`${interaction.user.tag} in #${interaction.channel.name} triggered an interaction.`);
                await command.execute(interaction);
            } catch (error) {
                console.error(error);
                await interaction.reply({ content: 'There was an error while executing this command.', ephemeral: true });
            }
        }

        if (interaction.isButton()){
            try {
                var channelName = interaction.channel.name
                console.log(`${interaction.user.tag} in #${channelName} triggered an interaction.`);
                
                if (interaction.customId == 'bug'){
                    await interaction.reply({ content: ">>> Don't forget to describe the bug!", ephemeral: true });
                    await interaction.channel.setName(channelName.replace(channelName[0],'🟣'));
                };

                if (interaction.customId == 'processing'){
                    await interaction.reply({ content: ">>> Good luck!", ephemeral: true });
                    await interaction.channel.setName(channelName.replace(channelName[0],'🟠'));
                };

                if (interaction.customId == 'finish'){
                    await interaction.reply({ content: ">>> Good job!", ephemeral: true });
                    await interaction.channel.setName(channelName.replace(channelName[0],'🟢'));
                };

            } catch (error) {
                console.error(error);
                await interaction.reply({ content: 'There was an error while executing this command.', ephemeral: true });
            }
        }
        
    },
};