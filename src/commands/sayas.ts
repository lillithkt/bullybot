import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";

import { SlashCommand } from "../commands";

const command: SlashCommand = {
  data: new SlashCommandBuilder()
    .setName("sayas")
    .setDescription("Say something as a user")
    .addUserOption((option) =>
      option
        .setName("user")
        .setDescription("The user to say as")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("message")
        .setDescription("The message to say")
        .setRequired(true)
    ),
  callback: async (interaction: ChatInputCommandInteraction) => {
    interaction.reply({
      content: "a",
      ephemeral: true,
    });
  },
};

export default command;
