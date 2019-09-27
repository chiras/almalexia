
//# 519232 Auth type discord
//# https://discordapp.com/api/oauth2/authorize?client_id=624936305637195777&scope=bot&permissions=519232


// local data
const tokens = require('./tokens/live.json');
//const setitems = require('./data/setfile.json');

// required modules
const Discord = require("discord.js");
const sql      = require('mysql');
const schedule = require('node-schedule');

const event_signup = require('./modules/event_signup.js');
const event_create = require('./modules/event_create.js');
const tasks = require('./modules/scheduler.js');

// helper functions
const ah = require("./helper/arguments.js")
const dh = require("./helper/db.js")

/**
const mh = require("./helper/messages.js")
const nh = require("./helper/names.js")
const xh = require("./helper/announcement.js")
**/

// setting up global variables
var bot = new Discord.Client({autoReconnect:true});

// mysql database
var mysql = sql.createPool({
  host     : 'localhost',
  user     : tokens["mysqluser"],
  password : tokens["mysqlpass"],
  database : 'almalexia',
  multipleStatements: true
});

// listening for messages
bot.on("message", (msg) => {

  // Set the prefix
  let prefix = "+";

  // Exit and stop if it's not there or another bot or wrong channel
  if (!msg.channel.name.startsWith("eso-")) return;
  if (!msg.content.startsWith(prefix)) return;
  if (msg.content.startsWith(prefix+prefix)) return;
  if (msg.author.bot) return;

  console.log(msg.author.id +" -> " + msg.content)

  ah.argumentSlicer(msg, function(options){

    	var responses = {
    		//v2 ready
        //"+repost" 		: function(){event_create(bot, msg, options, mysql, "repost", Discord);}, //options,
        "+create" 		: function(){event_create(bot, msg, options, mysql, "create", Discord);}, //options,
    		//"+delete" 		: function(){event_create(bot, msg, options, mysql, "delete", Discord);}, //options,
        //"+cancel" 		: function(){event_create(bot, msg, options, mysql, "cancel", Discord);}, //options,

        // "+signup" 		: function(){event_signup(bot, msg, options, mysql, "signup", Discord);},
        // "+maybe" 		  : function(){event_signup(bot, msg, options, mysql, "maybe", Discord);},
        // "+late" 		  : function(){event_signup(bot, msg, options, mysql, "late", Discord);},
        // "+unsign" 		: function(){event_signup(bot, msg, options, mysql, "unsign", Discord);},
    	};

	    var cmd = msg.content.split(" ")[0];

  		options["bot"] = bot.user.id;
  		options["client"] = bot;
      options["officerid"] = bot["alemalexiaguilds"].filter(para => para.guildid == msg.guild.id)[0].officerid;
      options["announcechannel"] = bot["alemalexiaguilds"].filter(para => para.guildid == msg.guild.id)[0].channelid;

  		if (responses[options["command"]]) {responses[options["command"]]()};

  }) // end argument slicer
});

bot.on('ready', () => {
    console.log('Almalexia initiated!');
    querySpecials = "SELECT * FROM specials;"
    queryGuilds = "SELECT * FROM guilds;"

    dh.mysqlQuery(mysql, querySpecials, function(errS, allS) {
      dh.mysqlQuery(mysql, queryGuilds, function(errG, allG) {

        bot["alemalexiaguilds"] = allG;
        bot["alemalexiaspecials"] = allS;

        var myVar = setInterval(function(){
          tasks.update (bot, mysql, Discord);
        }, 10000); // every 10 secs

      });

    });

});


bot.on("warn", (e) => console.warn(e));
//bot.on("debug", (e) => console.info(e));

bot.on('error', error => {
    console.log(error);
    process.exit(1);
});

process.on('unhandledRejection', error => {
    console.log(error);
});

bot.login(tokens["discord"]);
