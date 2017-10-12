const Discord = require("discord.js");

const client = new Discord.Client();


const config = require("./config.json");


client.on("ready", () => {

  console.log(`Bot launched... with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds.`);

  client.user.setGame(`on ${client.guilds.size} servers`, `https://twitch.tv/lemundesigns`);
});

client.on("guildCreate", guild => {

  console.log(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
  client.user.setGame(`with ${client.guilds.size} servers`);
});
client.on("message", async message => {
let args2 = message.content.split(' ').slice(1);
  var result = args2.join(' ');
});
client.on("guildDelete", guild => {

  console.log(`I have been removed from: ${guild.name} (id: ${guild.id})`);
client.user.setGame(`on ${client.guilds.size} servers`);
});
exports.run = (client, message, args) => {
    if (message.content.startsWith(config.prefix + "8ball")) {
    /*
    List of answers that the bot can randomize
    */
    const answers = [
        'As I See It Yes',
        'Ask Again Later',
        'Better Not Tell You Now',
        'Cannot Predict Now',
        'Concentrate and Ask Again',
        'Don\'t Count On It',
        'It Is Certain', 'It Is Decidely So',
        'Most Likely',
        'My Reply Is No',
        'My Sources Say No',
        'Outlook Good',
        'Outlook Not So Good',
        'Reply Hazy Try Again',
        'Signs Point to Yes',
        'Very Doubtful',
        'Without A Doubt',
        'Yes',
        'Yes - Definitely'
    ];
    /*
    If author didn't ask a question return
    */
    if (!question) {
        return message.reply('What question should I answer on? **Usage:** `~8ball is Lemun sexy?`');
    }
    const embed = new Discord.RichEmbed()
  .setAuthor(`8ball`, 'http://8ballsportsbar.com/wp-content/uploads/2016/02/2000px-8_ball_icon.svg_.png')
  .addField('Info:', `**Your Question:** ${args}\n**My Prediction:** ${answers[~~(Math.random() * answers.length)]}`);
    message.channel.send({embed}).catch(e => logger.error(e))
};


client.on("message", async message => {

  if(message.author.bot) return;

  if(message.content.indexOf(config.prefix) !== 0) return;

  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  if(command === "ping") {

    const m = await message.channel.send("Ping?");
    m.edit(`Pong! Latency is ${m.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(client.ping)}ms`);
  }

  if(command === "say") {

    const sayMessage = args.join(" ");

    message.delete().catch(O_o=>{});

    message.channel.send(sayMessage);
  }


  if(command === "kick") {

    if(!message.member.roles.some(r=>["Administrator", "Moderator", "Founder", "lemun"].includes(r.name)) )
      return message.reply("Sorry, you don't have permissions to use this!");


    let member = message.mentions.members.first();
    if(!member)
      return message.reply("Please mention a valid member of this server");
    if(!member.kickable)
      return message.reply("I cannot kick this user! Do they have a higher role? Do I have kick permissions?");


    let reason = args.slice(1).join(' ');
    if(!reason)
      return message.reply("Please indicate a reason for the kick!");


    await member.kick(reason)
      .catch(error => message.reply(`Sorry ${message.author} I couldn't kick because of : ${error}`));
    message.reply(`${member.user.tag} has been kicked by ${message.author.tag} because: ${reason}`);

  }

  if(command === "ban") {
    if(!message.member.roles.some(r=>["Administrator", "Founder", "lemun"].includes(r.name)) )
      return message.reply("HEY! Thats not nice! and you also have no permissions to use this!");

    let member = message.mentions.members.first();
    if(!member)
      return message.reply("Please mention a valid member of this server. For example: `.ban @lemun#1318`");
    if(!member.bannable)
      return message.reply("I cannot ban this user! Do they have a higher role? Do I have ban permissions?");

    let reason = args.slice(1).join(' ');
    if(!reason)
      return message.reply("Please indicate a reason for the ban!");

    await member.ban(reason)
      .catch(error => message.reply(`Sorry ${message.author} I couldn't ban because of : ${error}`));
    message.reply(`${member.user.tag} has been banned by ${message.author.tag} because: ${reason}`);
  }
  if(command === "help") {

    message.channel.send("\n```fix" +
    "\n Things I can do:" +
    "\n >help - Show's what I can do" +
    "\n >ping - Calculates ping between sending a message and editing it, The second ping is an average latency between the bot and the websocket server" +
    "\n >kick - Kicks a mentioned id" +
    "\n >ban - Don't need to explain what a BanHammer is" +
    "\n >purge - Deletes a set amount of messages, between 2-100" +
    "\n >invite - invite me to your server!" +
    "\n >inch - Something in your mom ツ" +
    "\n >soon - upcoming commands" +
    "\n >youtube - a little story about the bot creator" +
    "\n >die - Will bring you some suicde info" +
    "\n >fuckgirl - Something that you should have know about me" +
    "\n >lemun - also the creators name" +
    "\n >server - invite link to my server!" +
    "\n >8ball - ask the magic ball a question!" +
    "\n [$Creator Of The Bot] lemun#1318```");
  }

  if(command === "soon") {
    message.channel.send("Coming soon: `please play` = Music commands, `please 8ball` = The nostalgic eight ball!(Note- 8ball is out!)");
  }
  if(command === "invite") {
    message.channel.send("Invite me to your server! https://discordapp.com/oauth2/authorize?client_id=365944251491811338&scope=bot&permissions=8");
  }

  if(command === "youtube") {
    message.channel.send("hmmm.. There was this guy, called **Lemun**. He always was the cool kid at school; but then things changed. He found out about YouTube. So he started his meme career and made this channel: https://www.youtube.com/c/lemundesigns");
  }
  if(command === "inch") {
    message.channel.send("5 inches deep in your mom!");
  }
  if(command === "die") {
    message.channel.send("Sure, remind me, where is the bleach again?")
  }
  if(command === "purge") {
    message.channel.send("Sorry, but `>purge` is currently unstable. `Lemun#1318` will fix it as soon as possible!");
  }
  if(command === "fuckgirl") {
    message.channel.send("Fuckgirl is my second name! how did you know that?");
  }
  if(command === "lemun") {
    message.channel.send("Lemun is bae! -Suggested by Smaug#8534-")
  }
  if(command === "server") {
    message.channel.send("My discord community server! https://discord.gg/MmSrEEy")
  }


});

client.login(process.env.BOT_TOKEN);
