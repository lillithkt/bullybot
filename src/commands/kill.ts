import {
  ChannelType,
  ChatInputCommandInteraction,
  GuildMember,
  SlashCommandBuilder,
  PermissionFlagsBits,
} from "discord.js";

import { SlashCommand } from "../commands";

const deathReasons = [
  "just randomly fucking died",
  "got an anvil dropped on their head lmao",
  "let the rot get to them",
  "was stabbed by <randomUser>",
  "exploded, popped like a balloon if you will.",
  "morphed into a balloon and floated away",
];

const command: SlashCommand = {
  data: new SlashCommandBuilder()
    .setName("kill")
    .setDescription("Kills someone")
    .addUserOption((option) =>
      option.setName("user").setDescription("User to kill").setRequired(true)
    ),
  callback: async (interaction: ChatInputCommandInteraction) => {
    const target = interaction.options.get("user", true);

    let death = deathReasons[Math.floor(Math.random() * deathReasons.length)];

    if (death.includes("<randomUser>")) {
      const users = await interaction.guild?.members.fetch({ limit: 1000 });
      let usersArray: GuildMember[] = [];
      users?.forEach((member) => usersArray.push(member));

      usersArray = usersArray.filter((member) => !member.user.bot);
      usersArray = usersArray.filter((member) => member.id !== target.user?.id);

      const chosenUser =
        usersArray[Math.floor(Math.random() * usersArray.length)];
      const nickname =
        chosenUser.nickname ||
        chosenUser.displayName ||
        chosenUser.user.username;
      death = death.replaceAll("<randomUser>", nickname);
    }

    interaction.reply(`${target.user} ${death}`);
  },
};

export default command;
