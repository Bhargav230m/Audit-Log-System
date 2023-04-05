const {
  Client,
  GatewayIntentBits,
  Partials,
  Collection,
  EmbedBuilder,
} = require("discord.js");
const logs = require("discord-logs");
const { Start } = require("./Structure/StartUp");


const client = new Client({
  intents: [Object.keys(GatewayIntentBits)],
  partials: [Object.keys(Partials)],
});

const config = require("./config.json");

logs(client, {
  debug: true,
});

client.events = new Collection();
client.subCommands = new Collection(); //SubCommand handler
client.commands = new Collection();

process.on("unhandledRejection", (reason, p) => {
  const ChannelID = config.Setup.Anti_Crash_System_Channel_ID;
  console.error("Unhandled promise rejection:", reason, p);
  const Embed = new EmbedBuilder()
    .setColor("Random")
    .setTimestamp()
    .setFooter({ text: "⚠️Anti Crash system" })
    .setTitle("Error Encountered");
  const Channel = client.channels.cache.get(ChannelID);
  if (!Channel) return;
  Channel.send({
    embeds: [
      Embed.setDescription(
        "**Unhandled Rejection/Catch:\n\n** ```" + reason + "```"
      ),
    ],
  });
});

Start(client);
