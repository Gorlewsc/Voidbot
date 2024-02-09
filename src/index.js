require("dotenv").config();
const fs = require("fs");
const text = fs.readFileSync("./src/blessings.txt", "utf-8");
const blessings = text.split("\n");

const {
  Client,
  GatewayIntentBits,
  EmbedBuilder,
  Events,
  SlashCommandBuilder,
  PermissionsBitField,
  Permissions,
} = require("discord.js");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.on(Events.ClientReady, (x) => {
  console.log(`${x.user.tag} is ready!`);
  client.user.setActivity("Subscribe to twitch.tv/justpeachystreams");

  const fortune = new SlashCommandBuilder()
    .setName("fortune")
    .setDescription("Beseech the blessings of the Old Ones");

  client.application.commands.create(fortune);
});

client.on("interactionCreate", (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === "fortune") {
    const blessing =
      blessings[Math.floor(Math.random() * blessings.length + 1)];
    interaction.reply(blessing);
  }
});

client.on("messageCreate", (interaction) => {
  for (user of interaction.mentions.users) {
    if (user[0] === client.user.id && interaction.mentions.everyone === false) {
      const blessing =
        blessings[Math.floor(Math.random() * blessings.length + 1)];
      interaction.reply(blessing);
    }
  }
});

client.login(process.env.TOKEN);
