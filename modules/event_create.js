const mh = require("../helper/messages.js")
const dh = require("../helper/db.js")
const nh = require("../helper/names.js")
const fh = require("../helper/functions.js")

const symbols = ["✅","❌","⏰","❓"];

async function addReacts(message,eventroles) {
	// symbols.reduce( async (previousPromise, nextID) => {
	//   await previousPromise;
	// 	message.react(nextID);
	//   return
	// }, Promise.resolve());

  for (const symbol of eventroles) {
    await new Promise(resolve => setTimeout(resolve, 1500));
    message.react(symbol);
  }
}


// bot, msg, options, mysql, "signup", Discord

module.exports = (bot, msg, options, mysql, type, Discord) => {

	// split message for date, name, roles

	if (!msg.member.roles.has(options["officerid"])){
			fh.success(msg,"FALSE")
			return
		}

	var eventroles = [];
	var eventdate;
	var eventtime = "9pm";
	var eventname = "";

	if (options["date"].length > 0){
		eventdate = options["date"][0];
	}else{

		var today = new Date();
		var dd = today.getDate();

		var mm = today.getMonth()+1;
		var yyyy = today.getFullYear();

		if(dd<10)
		{
		    dd='0'+dd;
		}

		if(mm<10)
		{
		    mm='0'+mm;
		}

		eventdate = yyyy+'-'+mm+'-'+dd;

	}

  max = 12;

	if (options["role"].length == 0){
		eventroles = [[ symbols[0], max, 'signup' ]];
	}else{
		eventroles = options["role"];
	}
	eventroles.push([ symbols[1], 99, 'decline' ]);
	eventroles.push([ symbols[2], 99, 'reserve' ]);
	eventroles.push([ symbols[3], 99, 'reserve' ]);

	console.log(eventroles);
	//return

	if (options["time"].length > 0){
		eventtime = options["time"][0];
	}

	if (options["name"].length > 0){
		eventname = options["name"][0];
	}


	// var eventroles = [
  // 									{name: "d", max: 2},
  //   								{name: "H", max: 1},
  // 									{name: "T", max: 3}
	// 								 ];

	var eventrolesString = eventroles.filter(roles => roles[2] === "signup").map(r => r[0] + " x " + r[1]).join(', ');

	if (type == "create"){
		var specialid=1;
		var rolerestr = "";

		var embed = mh.prepare(Discord);
		embed.setTitle(eventname)
		embed.addField("Date:", eventdate + " at " + eventtime)
		embed.addField("Signups:", "<none>")
		embed.addField("Reserves:", "<none>")
		embed.addField("Declines:", "<none>")
		embed.addField("Group:", eventrolesString)

		if(eventname.match(/ECG/)){
			specialid=bot["alemalexiaspecials"].filter(para => para.trigg == "ECG")[0].specialid;
			embed.setThumbnail(bot["alemalexiaspecials"].filter(para => para.trigg == "ECG")[0].logourl)
			//embed.addField("Details:", bot["alemalexiaspecials"].filter(para => para.trigg ==  "ECG")[0].docsurl)
			embed.setDescription(bot["alemalexiaspecials"].filter(para => para.trigg == "ECG")[0].description )
		}else if(eventname.match(/ERG/)){
			embed.setThumbnail(bot["alemalexiaspecials"].filter(para => para.trigg == "ERG")[0].logourl)
			//embed.addField("Details:", bot["alemalexiaspecials"].filter(para => para.trigg ==  "ERG")[0].docsurl)
			embed.setDescription(bot["alemalexiaspecials"].filter(para => para.trigg == "ERG")[0].description )
		}else{
			embed.setThumbnail("https://images-ext-1.discordapp.net/external/BMLRG9klXozguEpuGEZVKBiEGd0X7ytyaUpnGhWje_c/https/s3-us-west-2.amazonaws.com/www.guilded.gg/team_images/avatars/e02bcbd00f793d50624b2ec1.jpg")
			embed.setDescription("A new event has been created! ")
}
    if (options["restriction"].length > 0){
      rolerestr = "This event is restricted to the <@&"+options["restriction"][0]+"> role. "
    }
		embed.addField("Notes:", rolerestr +  "For further details ask <@"+msg.author.id+">")
    embed.setFooter("_");


		// for now dont use the helper because of msg id
		// mh.send(msg, embed, options, function(mid){
		// 			console.log("2: "+mid);
		// });

		let messageid;
    let messageid2;

		msg.channel.send({embed: embed}).then( sent => { // 'sent' is that message you just sent
  		messageid = sent.id;
      addReacts(sent,eventroles.map(roles => {return roles[0]}));

			//console.log("1: "+messageid);

			// embed.fields.length-1 not tested yet
			//embed.fields[embed.fields.length-1].value = "Head to <#"+msg.channel.id+"> and type +signup to sign up for this event! "+  "For further details ask <@"+msg.author.id+">";

			bot.channels.get(options["announcechannel"]).send({embed: embed}).then( sent2 => { // 'sent' is that message you just sent
      messageid2 = sent2.id;

      addReacts(sent2,eventroles.map(roles => {return roles[0]}));


			//	console.log("1x: "+messageid2);


			var query = "INSERT into events (guildid, channelid, channelid2, eventname, date, time, announceid, announceid2, creator, special, restriction) VALUES ('" + msg.guild.id + "','"+ msg.channel.id + "','"+ options["announcechannel"] + "','" + eventname + "','" + eventdate +"','" + eventtime +"','" + messageid +"','" + messageid2 +"','" + msg.author.id+"','" + specialid +"','" + options["restriction"][0] +"');";
			//console.log(query)
			dh.mysqlQuery(mysql, query, function(err, all) {
				var queryRoles = "";
				for (var i = 0; i < eventroles.length; i++) {
				    //Do something
						queryRoles = queryRoles + "INSERT into roles (eventid, rolename, rolesymbol, rolemax) VALUES ('" + all.insertId + "','" + eventroles[i][2] + "','"+ eventroles[i][0]+"','" + eventroles[i][1]+"');";
				}
			//	console.log("2:" + queryRoles)

				dh.mysqlQuery(mysql, queryRoles, function(errRoles, allRoles) {
					fh.success(msg,"TRUE")

          bot.channels.get( msg.channel.id).fetchMessage(sent.id).then(message => {
            message.embeds[0].footer.text = 'Event-ID: #' + all.insertId;
     	      message.edit(new Discord.RichEmbed(message.embeds[0]));
          })

          bot.channels.get(options["announcechannel"]).fetchMessage(sent2.id).then(message => {
            message.embeds[0].footer.text = 'Event-ID: #' + all.insertId;
     	      message.edit(new Discord.RichEmbed(message.embeds[0]));
          })

          //.setFooter('Some footer text here', 'https://i.imgur.com/wSTFkRM.png');
					return (allRoles)

				});
				return (all)
			});
		});
	});

}else{
  // need to check  guild, so no cross guild deletes
  if (options["eventid"][0] != "undefined"){
  //console.log(type);

  var query = "SELECT * FROM events WHERE eventid= '"+options["eventid"][0]+"'; ";
  var queryU = "UPDATE events SET active = 0 WHERE eventid= '"+options["eventid"][0]+"';";

  dh.mysqlQuery(mysql, query, function(err, all) {
    //console.log(all)
    console.log(msg.guild.id + "!="+ all[0].guildid);
    if ( msg.guild.id != all[0].guildid){
      fh.success(msg,"FALSE")
      return
    }

    dh.mysqlQuery(mysql, queryU, function(err2, all2) {

  if (type == "cancel"){
    bot.channels.get(all[0].channelid).fetchMessage(all[0].announceid).then(message => {
      message.embeds[0].description = ":no_entry_sign: This event has been canceled! :no_entry_sign: ";
      message.edit(new Discord.RichEmbed(message.embeds[0]));
      message.clearReactions();
    })

    bot.channels.get(all[0].channelid2).fetchMessage(all[0].announceid2).then(message => {
      message.embeds[0].description = ":no_entry_sign: This event has been canceled! :no_entry_sign: ";
      message.edit(new Discord.RichEmbed(message.embeds[0]));
      message.clearReactions();
    })
    fh.success(msg,"TRUE")

  }else	if (type == "delete"){
    bot.channels.get(all[0].channelid).fetchMessage(all[0].announceid).then(message => {
      message.delete();
    })
    bot.channels.get(all[0].channelid2).fetchMessage(all[0].announceid2).then(message => {
      message.delete();
    })
    fh.success(msg,"TRUE")

  }else	if (type == "close"){
    bot.channels.get(all[0].channelid).fetchMessage(all[0].announceid).then(message => {
      message.embeds[0].description = ":star: Signups are closed! Let's rock! :star: ";
      message.edit(new Discord.RichEmbed(message.embeds[0]));
      message.clearReactions();
    })

    bot.channels.get(all[0].channelid2).fetchMessage(all[0].announceid2).then(message => {
      message.embeds[0].description = ":star: Signups are closed! Let's rock! :star: ";
      message.edit(new Discord.RichEmbed(message.embeds[0]));
      message.clearReactions();
    })
    fh.success(msg,"TRUE")

  }
}); // end db query
}); // end db query
  } // end if no event id
} // endif "create"

};
