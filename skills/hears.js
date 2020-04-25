// Botkit is powered by "skills". For example this one is "hears"
// Basically the bot listens to to direct mentions and mentions (of the bot)
// and if it hears the word "!thanks" then the skill is triggered
// try changing the trigger word
// here are the docs for more info https://botkit.ai/docs/v0/core.html
// and the Botkit Discord code which has some great examples!
// https://github.com/brh55/botkit-discord

module.exports = function(controller) {
  controller.hears("!thanks", ["direct_mention", "mention"], (bot, message) => {
    let response;
    let sender = message.user;

    // Many bots use the this method but sometimes it doesn't work, for example if you mention more than one person
    //let recipient = message.mentions.users.last();

    // this method filters out any users that aren't bots
    // if you have a bot that does more administrative things like blocking people, you might want to filter even more
    // like filter out admins or the person sending the message
    // it's using Discord.js for all this, yep that's right you have access to everything in Botkit AND Discord.js
    // https://discord.js.org/#/docs/main/master/class/User
    let recipient = message.mentions.users
      .filter(user => user.bot === false)
      .last();

    // this is a list of potential responses, it chooses from them randomly.
    // Try changing them or adding your own.
    let responses = [
      `${recipient} got kudos from ${sender} 🎉`,
      `${sender} thinks ${recipient} is awesome! ✨`,
      `Hey ${recipient}! ${sender} appreciates you! 😍`,
      `Hey ${recipient}! ${sender} thinks you rule! 💪`
    ];

    response = responses[Math.floor(Math.random() * responses.length)];

    bot.reply(message, response);
  });
};

("use strict");

/**
 * An example of how you can send embeds
 */

// Extract the required classes from the discord.js module
const { Client, MessageEmbed } = require("discord.js");

// Create an instance of a Discord client
const about = new Client();

/**
 * The ready event is vital, it means that only _after_ this will your bot start reacting to information
 * received from Discord
 */
about.on("ready", () => {
  console.log("About ✅");
});

about.on("message", message => {
  // If the message is "how to embed"
  if (message.content === "/about") {
    // We can create embeds using the MessageEmbed constructor
    // Read more about all that you can do with the constructor
    // over at https://discord.js.org/#/docs/main/master/class/MessageEmbed
    const About = new MessageEmbed()
      // Set the title of the field
      .setTitle("About Prima")
      // Set the color of the embed
      .setColor(0xef3138)
      // Set the main content of the embed
      .setDescription(
        "Prima Bot was a bot made by <@380326826972545024> with the goal to simplify the amount of bots needed in a server."
      );
    // Send the embed to the same channel as the message
    message.channel.send(About);
    const Commands = new MessageEmbed()
      // Set the title of the field
      .setTitle("Available Commands")
      // Set the color of the embed
      .setColor(0xef3138)
      // Set Timestamp
      .setTimestamp()
      // Set the Author
      .setAuthor("Prima by adrien#8830", "https://i.ibb.co/2kNbcLd/Image-from-i-OS-59.png")
      // Set the Thumbnail
      .setThumbnail("https://i.ibb.co/2kNbcLd/Image-from-i-OS-59.png")
      // Set the main content of the embed
      .setDescription("Prima Bot is still a work in progress. We are still in active development and adding new commands daily.")
      // Commands-INFO Field
        .addField("Info Commands", "/about - What your reading right now! Use this if you need any help! \n", true)
      // Commands-Mod Field
        .addField("Mod Commands", "/kick {@user} - Kicks the Mentionned User \n /ban {@user} Bans the mentionned user", true)
    // Send the embed to the same channel as the message
    message.channel.send(Commands);
  }
});

about.login("NzAyNzk2NjA0OTg1NDQyMzM1.XqKnRg.ZLS4j4BAQmj81d8ykaVydpgTiWg");

("use strict");

/**
 * Send a user a link to their avatar
 */

// Import the discord.js module
const Discord = require("discord.js");

// Create an instance of a Discord client
const avatar = new Discord.Client();

/**
 * The ready event is vital, it means that only _after_ this will your bot start reacting to information
 * received from Discord
 */
avatar.on("ready", () => {
  console.log("Avatar ✅");
});

// Create an event listener for messages
avatar.on("message", message => {
  // If the message is "what is my avatar"
  if (message.content === "/avatar") {
    const avatar = new MessageEmbed()
      // Set the title of the field
      .setTitle("Avatar")
      // Set the color of the embed
      .setColor(0xef3138)
      // Set the main content of the embed
      .setImage(message.author.displayAvatarURL());

    // Send the embed to the same channel as the message
    message.channel.send(avatar);
  }
});

// Log our bot in using the token from https://discordapp.com/developers/applications/me
avatar.login("NzAyNzk2NjA0OTg1NDQyMzM1.XqKnRg.ZLS4j4BAQmj81d8ykaVydpgTiWg");

// Create an instance of a Discord client
const kick = new Discord.Client();

/**
 * The ready event is vital, it means that only _after_ this will your bot start reacting to information
 * received from Discord
 */
kick.on("ready", () => {
  console.log("Kick ✅");
});

kick.on("message", message => {
  // Ignore messages that aren't from a guild
  if (!message.guild) return;

  // If the message content starts with "!kick"
  if (message.content.startsWith("/kick")) {
    // Assuming we mention someone in the message, this will return the user
    // Read more about mentions over at https://discord.js.org/#/docs/main/master/class/MessageMentions
    const user = message.mentions.users.first();
    // If we have a user mentioned
    if (user) {
      // Now we get the member from the user
      const member = message.guild.member(user);
      // If the member is in the guild
      if (member) {
        /**
         * Kick the member
         * Make sure you run this on a member, not a user!
         * There are big differences between a user and a member
         */
        member
          .kick("they got yeeted")
          .then(() => {
            // We let the message author know we were able to kick the person
            message.reply(`Successfully kicked ${user.tag}`);
          })
          .catch(err => {
            // An error happened
            // This is generally due to the bot not being able to kick the member,
            // either due to missing permissions or role hierarchy
            message.reply("I was unable to kick the member");
            // Log the error
            console.error(err);
          });
      } else {
        // The mentioned user isn't in this guild
        message.reply("That user isn't in this guild!");
      }
      // Otherwise, if no user was mentioned
    } else {
      message.reply("You didn't mention the user to kick!");
    }
  }
});

// Log our bot in using the token from https://discordapp.com/developers/applications/me
kick.login("NzAyNzk2NjA0OTg1NDQyMzM1.XqKnRg.ZLS4j4BAQmj81d8ykaVydpgTiWg");

// Create an instance of a Discord client
const ban = new Discord.Client();

/**
 * The ready event is vital, it means that only _after_ this will your bot start reacting to information
 * received from Discord
 */
ban.on('ready', () => {
  console.log('Ban ✅');
});

ban.on('message', message => {
  // Ignore messages that aren't from a guild
  if (!message.guild) return;

  // if the message content starts with "!ban"
  if (message.content.startsWith('/ban')) {
    // Assuming we mention someone in the message, this will return the user
    // Read more about mentions over at https://discord.js.org/#/docs/main/master/class/MessageMentions
    const user = message.mentions.users.first();
    // If we have a user mentioned
    if (user) {
      // Now we get the member from the user
      const member = message.guild.member(user);
      // If the member is in the guild
      if (member) {
        /**
         * Ban the member
         * Make sure you run this on a member, not a user!
         * There are big differences between a user and a member
         * Read more about what ban options there are over at
         * https://discord.js.org/#/docs/main/master/class/GuildMember?scrollTo=ban
         */
        member
          .ban({
            reason: 'lol bye felicia',
          })
          .then(() => {
            // We let the message author know we were able to ban the person
            message.reply(`Successfully banned ${user.tag}`);
          })
          .catch(err => {
            // An error happened
            // This is generally due to the bot not being able to ban the member,
            // either due to missing permissions or role hierarchy
            message.reply('I was unable to ban the member');
            // Log the error
            console.error(err);
          });
      } else {
        // The mentioned user isn't in this guild
        message.reply("That user isn't in this guild!");
      }
    } else {
      // Otherwise, if no user was mentioned
      message.reply("You didn't mention the user to ban!");
    }
  }
});

// Log our bot in using the token from https://discordapp.com/developers/applications/me
ban.login("NzAyNzk2NjA0OTg1NDQyMzM1.XqKnRg.ZLS4j4BAQmj81d8ykaVydpgTiWg");


// Create an instance of a Discord client
const Mute = new Discord.Client();

/**
 * The ready event is vital, it means that only _after_ this will your bot start reacting to information
 * received from Discord
 */
Mute.on('ready', () => {
  console.log('Mute ✅');
});

Mute.on('message', message => {
module.exports.run = async (bot, message, args) => {

    if(!message.member.hasPermission(["MANAGE_ROLES", "ADMINISTRATOR"])) return message.channel.send("You dont have permission to perform this command!")

    let rMember = message.mentions.members.first() || message.guild.members.find(m => m.user.tag === args[0]) || message.guild.members.get(args[0])
    if(!rMember) return message.channel.send("Please provide a user to add a role too.")
    let role = message.guild.roles.find(r => r.name == args[1]) || message.guild.roles.find(r => r.id == args[1]) || message.mentions.roles.first()
    if(!role) return message.channel.send("Please provide a role to add to said user.") 
    let reason = args.slice(2).join(" ")
    if(!reason) return message.channel.send("Please provide a reason")

    if(!message.guild.me.hasPermission(["MANAGE_ROLES", "ADMINISTRATOR"])) return message.channel.send("I don't have permission to perform this command.")

    if(rMember.roles.has(role.id)) {
        return message.channel.send(`${rMember.displayName}, already has the role!`)
    } else {
        await rMember.addRole(role.id).catch(e => console.log(e.message))
        message.channel.send(`The role, ${role.name}, has been added to ${rMember.displayName}.`)
    }

    let embed = new Discord.RichEmbed()
    .setColor(0xEF3138)
    .setAuthor(`${message.guild.name} Modlogs`, message.guild.iconURL)
    .addField("Moderation:", "Addrole")
    .addField("Mutee:", rMember.user.username)
    .addField("Moderator:", message.author.username)
    .addField("Reason:", reason)
    .addField("Date:", message.createdAt.toLocaleString())
    
        let sChannel = message.guild.channels.find(c => c.name === "tut-modlogs")
        sChannel.send(embed);
  
  module.exports.config = {
    name: "addrole",
    description: "Adds a role to a member of the guild!",
    usage: "!addrole",
    accessableby: "Moderators",
    aliases: ["ar", "roleadd"]
});