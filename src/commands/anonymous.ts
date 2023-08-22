import {
  ChannelType,
  ChatInputCommandInteraction,
  SlashCommandBuilder,
} from "discord.js";

import { SlashCommand } from "../commands";
import { Logger } from "../logger";

const log = new Logger("Anonymous", __filename);

const command: SlashCommand = {
  data: new SlashCommandBuilder()
    .setName("anonymous")
    .setDescription("Anonymously say something")
    .addStringOption((option) =>
      option
        .setName("message")
        .setDescription("The message to say")
        .setRequired(true)
    ),
  callback: async (interaction: ChatInputCommandInteraction) => {
    const messageContent = interaction.options.getString("message", true);

    const message = await interaction.channel?.send({
      embeds: [
        {
          title: `Anonymous`,
          description: messageContent,
          color: Math.floor(Math.random() * 16777215),
        },
      ],
    });

    // Log the author id so it can be used to ban the user if needed
    // Send the id in a way that it cant be easily found out, for privacy reasons
    log.log(
      `https://discord.com/channels/${interaction.guildId}/${
        interaction.channelId
      }/${message?.id}\n**Hidden Author ID:** ${
        Number(interaction.user.id.substring(0, 5)) +
        Number(message!.id.substring(0, 5))
      }\n**Key:** ${message!.id.substring(0, 5)}`
    );

    interaction.reply({
      content: `Done!`,
      ephemeral: true,
    });
  },
};

export default command;
