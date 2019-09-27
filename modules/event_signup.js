const mh = require("../helper/messages.js")
const dh = require("../helper/db.js")
const fh = require("../helper/functions.js")

// bot, msg, options, mysql, "signup", Discord

function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
}

module.exports = (bot, msg, options, mysql, type, Discord) => {

var queryEvent;
var eventdate = "";
	if (options["date"].length > 0){
		eventdate = options["date"][0];
		queryEvent = "SELECT eventid, announceid, announceid2 FROM events  WHERE channelid = '" + msg.channel.id + "' AND date = '" + eventdate + "' ORDER BY eventid DESC LIMIT 1;";
	}else{
		queryEvent = "SELECT eventid, announceid, announceid2 FROM events  WHERE channelid = '" + msg.channel.id + "' ORDER BY eventid DESC LIMIT 1;";
	}

		var role = "NA";
		const symbols = ["✅","❌","⏰","❓"];

	//console.log("SIGNUP")
	// if (eventdate === ""){
	// 	var queryEvent = "SELECT eventid, announceid, announceid2 FROM events  WHERE channelid = '" + msg.channel.id + "' ORDER BY eventid DESC LIMIT 1;";
	// }

	//console.log("1: " + queryEvent)

	eventid = dh.mysqlQuery(mysql, queryEvent, function(err, all) {

			if (all.length <1){
				fh.success(msg,"FALSE")
				return

			}else{


			var eventid = all[0].eventid;
			//var announceid = all[0].announceid;
			//var announceid2 = all[0].announceid2;

			var query = "";

			switch (type) {
			  case 'signup':
					query = "INSERT INTO signups (eventid, duserid, role, type) VALUES ('" +all[0].eventid + "','" + msg.author.id + "','" + symbols[0] + "','" + type +"');";
			    break;
			  case 'unsign':
					query = "DELETE FROM signups WHERE  eventid = '" + all[0].eventid + "' AND duserid = '" + msg.author.id + "';";
					break;
			  case 'late':
					query = "INSERT INTO signups (eventid, duserid, role, type) VALUES ('" +all[0].eventid + "','" + msg.author.id + "','" + symbols[2] + "','" + type +"');";
					break;
				case 'maybe':
					query = "INSERT INTO signups (eventid, duserid, role, type) VALUES ('" +all[0].eventid + "','" + msg.author.id + "','" + symbols[3] + "','" + type +"');";
					break;
				//else?
			}



			//console.log("2: " + query)
			dh.mysqlQuery(mysql, query, function(err2, all2) {
				fh.updateSignups(all[0].eventid, bot, mysql, Discord, msg)

			//
			// 	var querySignups = "SELECT duserid FROM signups  WHERE eventid = '" + eventid + "';";
			// 	dh.mysqlQuery(mysql, querySignups, function(err2, all2) {
			// 		var signups = all2.map(function(all2){
    	// 				return "<@"+all2.duserid+">";
			// 			}).filter( onlyUnique ).join(",");
			//
			// 		if (signups === ""){signups="<none>"};
			//
			// 		msg.channel.fetchMessage(announceid)
			// 		  .then(message => {
			// 			//	console.log("3: " + message.embeds[0].fields[1].value);
			// 				var oldDescr = message.embeds[0].fields[1].value;
			// 				//message.embeds[0].fields[1].value = oldDescr + ", <@" + msg.author.id +">";
			// 				message.embeds[0].fields[1].value = signups;
			// 		//		console.log("4: " + message.embeds[0].fields[1].value);
			// 				message.edit(new Discord.RichEmbed(message.embeds[0]));
			// 			}).catch(console.error);
			//
			// 		bot.channels.get(options["announcechannel"]).fetchMessage(announceid2)
			// 		  .then(message => {
			// 			message.embeds[0].fields[1].value = signups;
			// 		//	console.log("4b: " + message.embeds[0].fields[1].value);
			// 			message.edit(new Discord.RichEmbed(message.embeds[0]));
			// 		}).catch(console.error);
			//
			// 		fh.success(msg,"TRUE")
			//
			// }); // querySignups

			return (all)
		}); // query



			//message.embeds[0].fields[0] = "Some much like;
			//message.edit(new Discord.RichEmbed(message.embeds[0]));
		} // if no event
	}) // query events
};
