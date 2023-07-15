import {
  ChannelType,
  ChatInputCommandInteraction,
  GuildMember,
  SlashCommandBuilder,
  PermissionFlagsBits,
} from "discord.js";

import { SlashCommand } from "../commands";

const command: SlashCommand = {
  data: new SlashCommandBuilder()
    .setName("kill")
    .setDescription("Kills someone")
    .addUserOption((option) =>
      option.setName("user").setDescription("User to kill").setRequired(true)
    ),
  callback: async (interaction: ChatInputCommandInteraction) => {
    const deathReasons = [
      "<user> just randomly fucking died",
      "<user> got an anvil dropped on their head lmao",
      "<user> let the rot get to them",
      "<user> was stabbed by <randomUser>",
      "<user> exploded, popped like a balloon if you will.",
      "<user> morphed into a balloon and floated away",
      "<user> death.accident.water",
      "<user> was churned like butter",
      "<user> was popped like popcorn",
      "<user> went splat",
      "<user> turned into a silly salamander",
      "<user> blundered<:blunder:1106357379462864937><:blunder:1106357379462864937><:blunder:1106357379462864937>",
      "<user> lost their autism card",
      "<user> made like a bomb and BOOM!",
      "<user> barked too hard",
      "<user> meowed too hard",
      "<user> got unscrewed with a screwdriver",
      "<user> got their brain eaten by <randomUser>",
      "<user> turned into powder",
      "<randomUser> went big cat mode and bit <user>'s head off",
      "<user> took a dive in a nuclear power plant",
      "<user> caused the heat death of the universe",
      "<user> got late-onset sudden infant death syndrome",
      "<randomUser> poked a bendy straw thru <user>'s soft spot",
      "<user> said cya later alligator",
      "<user> died of easily preventable illnesses",
      "<user> died of the common cold",
      "<user> took a bath with a toaster",
      "<user> is more than 85% helium",
      "<user> fell down the stairs, family guy style",
      "<user> flew out of a car window like a mcdonalds napkin",
      "<user> poured water on their electrical breaker",
      "<user> experienced a kami-level event",
      "<user> was caught in a fortnite event",
      "<user> ate chalk",
      "<user> really fucked up their homemade nuclear power plant and has died due to hawking radiation born of a black hole!",
      "<user> made a hammock using electrical wires",
      "<user> clipped out of reality",
      "<user> uses lightmode and was finally found and killed for it",
      "<user> leaned back in their chair a little too much",
      "<user> aaaaaaaaasdjiasdhsudoisasasasasasasasaasduiashdasuiodhasudiosahdiuohsahhhdhhhhshahuhihodhhasuiodhsauiohdsaduiddddddooooooooooooooohdhdhdhdhdhdhdsddddadiouhdnsajkldsa9i8hudonjas9udhiojasdjhioupsadjuiosad89aswud8907as9d5a*^DS%*^ADS9das7d798A^SD6as^&D5A$^&45da$%&SD56sa^&*(D679aSD&%4sa*%$sda9787*(SA7dsa%^54sdA546AS&*^",
      "<user> got a brick thrown at them",
      "<user> was just straight up fucking murdered like killed like just shot with a gun",
      "<user> had their ceiling fan fall on them",
      "<user> experienced radiant heat coming from within 50 miles of Arizona",
      `<user>'s location is ${Math.random() * (180 + 1) - 90} Latitude ${
        Math.random() * (360 + 1) - 180
      } Longitude`,
      "<user> went in a submarine to explore the titanic wreckage",
      "dna matching <user> was discovered in ancient ruins and thus <user> fails to exist in the current age",
      "<user> was hit by the battle bus",
      "<user> toyed with the time space continuium",
    ];
    const target = interaction.options.get("user", true);

    let death = deathReasons[Math.floor(Math.random() * deathReasons.length)];

    death = death.replaceAll("<user>", `<@${target.user?.id}>`);

    if (death.includes("<randomUser>")) {
      const users = await interaction.guild?.members.fetch({ limit: 1000 });
      let usersArray: GuildMember[] = [];
      users?.forEach((member) => usersArray.push(member));

      usersArray = usersArray.filter((member) => !member.user.bot);
      usersArray = usersArray.filter((member) => member.id !== target.user?.id);

      const chosenUser =
        usersArray[Math.floor(Math.random() * usersArray.length)];
      death = death.replaceAll("<randomUser>", `<@${chosenUser.id}>`);
    }

    interaction.reply({
      content: death,
      allowedMentions: { users: [target.user!.id] },
    });
  },
};

export default command;
