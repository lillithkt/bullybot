import {
  ChannelType,
  ChatInputCommandInteraction,
  SlashCommandBuilder,
} from "discord.js";

import { SlashCommand } from "../commands";
import bot from "..";

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
    const target = interaction.options.getUser("user", true);
    const message = interaction.options.getString("message", true);

    if (!interaction.guild?.members.me?.permissions.has("ManageWebhooks"))
      return interaction.reply({
        content: "Bot does not have permission",
        ephemeral: true,
      });

    if (!interaction.channel)
      return interaction.reply({
        content: "Channel not found",
        ephemeral: true,
      });

    let channel = interaction.channel;

    if (channel.partial) channel = await channel.fetch();
    if (channel.type !== ChannelType.GuildText)
      return interaction.reply({
        content: "Channel is not a text channel",
        ephemeral: true,
      });

    await interaction.deferReply({ ephemeral: true });

    let webhook = (await channel.fetchWebhooks()).find(
      (webhook) => webhook.name === `${bot.user!.username}_sayas`
    );

    if (!webhook) {
      webhook = await channel.createWebhook({
        name: `${bot.user!.username}_sayas`,
        avatar: bot.user!.displayAvatarURL(),
      });
    }

    await webhook.send({
      content: message,
      username: target.username,
      avatarURL: target.displayAvatarURL(),
    });

    await interaction.followUp({
      content: `Done!`,
    });
  },
};

export default command;
