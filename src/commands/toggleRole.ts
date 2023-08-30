import {
  ChatInputCommandInteraction,
  GuildMemberRoleManager,
  PermissionFlagsBits,
  SlashCommandBuilder,
} from "discord.js";
import { SlashCommand } from "../commands";

const command: SlashCommand = {
  data: new SlashCommandBuilder()
    .setName("togglerole")
    .setDescription("Toggle a role on yourself")
    .addRoleOption((option) =>
      option.setName("role").setDescription("The role").setRequired(true)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageRoles),
  callback: async (interaction: ChatInputCommandInteraction) => {
    const role = interaction.options.getRole("role", true);

    if (
      (interaction.member!.roles as GuildMemberRoleManager).cache.has(role.id)
    ) {
      await (interaction.member!.roles as GuildMemberRoleManager).remove(
        role.id
      );
      return interaction.reply({
        content: `Removed role ${role.name}`,
        ephemeral: true,
      });
    } else {
      await (interaction.member!.roles as GuildMemberRoleManager).add(role.id);
      return interaction.reply({
        content: `Added role ${role.name}`,
        ephemeral: true,
      });
    }
  },
};

export default command;
