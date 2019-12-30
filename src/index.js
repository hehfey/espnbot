const Discord = require("discord.js");
const client = new Discord.Client();
const axios = require("axios");

client.on("ready", () => {
  console.log(
    `Bot has started, with ${client.users.size} users, in ${
      client.channels.size
    } channels of ${client.guilds.size} guilds.`
  );
});

client.on("message", async message => {
  if (message.author.bot) return;

  if (message.content.indexOf("!") !== 0) return;

  const args = message.content
    .slice(config.prefix.length)
    .trim()
    .split(/ +/g);
  const command = args.shift().toLowerCase();

  if (command === "score") {
    //message.reply(`Sure! Let me get you the score.`);
    axios
      .get("http://hehfey.com/webhooks/scrape.php")
      .then(function(response) {})
      .catch(function(error) {
        console.log(error);
      });
  }

  if (command === "purge") {
    const deleteCount = parseInt(args[0], 10);
    if (!deleteCount || deleteCount < 2 || deleteCount > 100)
      return message.reply(
        "Please provide a number between 2 and 100 for the number of messages to delete"
      );

    const fetched = await message.channel.fetchMessages({ limit: deleteCount });
    message.channel
      .bulkDelete(fetched)
      .catch(error =>
        message.reply(`Couldn't delete messages because of: ${error}`)
      );
  }
});

client.login("NjYxMDc0NzYxNDU1MjM5MTcx.XgmdFA.OQf-YvqzjB6jFPWQIqmUZs5SYEc");
