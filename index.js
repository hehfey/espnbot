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
  console.log("Received message from channel (" + message.channel.id + ")");
  if (message.channel.id == "661221966593654785" || message.channel.id == "613136324274159616" || message.channel.id == "613136367219769391" || message.channel.id == "613136415944867917"){
    if (message.author.bot) return;

    if (message.content.indexOf(process.env.PREFIX) !== 0) return;

    var args = message.content
      .slice(process.env.PREFIX.length)
      .trim()
      .split(/ +/g);

    const command = args.shift().toLowerCase();

    if (command === "score") {
      const type = args.join(" ").toString().replace(/[^\w\s!?]/g,'');
      console.log(type);
      //message.reply(`Sure ${message.author}! Let me get you the score.`);
      axios
        .get("http://hehfey.com/webhooks/scrape.php?type=" + type + "&channel=" + message.channel.id)
        .then(function(response) {
          console.log("http://hehfey.com/webhooks/scrape.php?type=" + type + "&channel=" + message.channel.id);
          })
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
  }
});

client.login(process.env.SECRET);
