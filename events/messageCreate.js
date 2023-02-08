const { categories, informations } = require('../config.json');
const button = require('../modules/buttons.js');
const { ActionRowBuilder, ButtonStyle } = require('discord.js');

module.exports = {
    name: 'messageCreate',
    async execute(message) {
        if (message.channel.parent != categories.dev) return;
        if (message.author.id == informations.clientId) return;

        if (!message.content.startsWith("BUG")){
            var buttons = new ActionRowBuilder()
			    .addComponents(
                    button('bug','BUG',ButtonStyle.Danger,null,false),
                    button('processing','PROCESSING',ButtonStyle.Primary,null,false),
                    button('finish','FINISH',ButtonStyle.Success,null,false)
                );
            await message.channel.send({ content: ">>> Status ...", components: [buttons] })
            await message.channel.setName(`🔵 ${message.channel.name}`);
        }
    },
};