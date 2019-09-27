const mh = require("../helper/messages.js")
const dh = require("../helper/db.js")
const nh = require("../helper/names.js")
const fh = require("../helper/functions.js")


// bot, msg, options, mysql, "signup", Discord

exports.update = (bot, mysql, Discord) => {
	console.log('This job ran at ' + new Date());

	// check if event is still actual or set to inactive
	// select all active events SQL
//	querySignups = "SELECT signups.duserid, signups.role, events.channelid, events.channelid2, events.announceid, events.announceid2 FROM signups INNER JOIN events ON signups.eventid=events.eventid WHERE signups.eventid = '" + eventid + "';"

	queryEvent = "SELECT * FROM events WHERE active = '1';";
	queryRoles = "SELECT eventid, rolename, rolesymbol, rolemax FROM roles;";

	dh.mysqlQuery(mysql, queryEvent, function(err, all) {
		dh.mysqlQuery(mysql, queryRoles, function(errRoles, allRoles) {

		var bothannounces = [];
		bothannounces.push(all.map(function(all){
				var bothannounces = [all.eventid,all.channelid, all.announceid, all.restriction];
				return bothannounces;
			}));

		bothannounces.push(all.map(function(all){
				var bothannounces = [all.eventid,all.channelid2, all.announceid2, all.restriction];
				return bothannounces;
			}));
		var allannounces = [].concat.apply([], bothannounces);

		//console.log(allannounces);
		//return;

		var messageCollection = [];

		allannounces.forEach(function(element) {
			//console.log("0:"+element[0]);

			bot.channels.get(element[1]).fetchMessage(element[2])
				.then(message => {
					if (message.reactions.length != 0) {

						var reactionCollection = message.reactions.map(emote =>{

									return emote.fetchUsers().then(users => {
										//console.log("0x:"+ element[0] +emote._emoji.name + users.array());

										var insertCollection = users.array().map(id =>{
											if (id != "<@"+bot.user.id+">"){
												emote.remove(id); // if not bot?
											}
												//console.log("0yyy:"+id);
												var x = { event : element[0],
																	emote : emote._emoji.name,
																	userid: id.id,
																	restriction : element[3]};
												return x;
											//}else{
											//	return
											//} // end if bot id
										}); // user promise

									  return Promise.all(insertCollection).then(function(inserts){
										    //console.log("insertCollection:"+inserts);
												return inserts
										})

									}).then(inserts => {
										//console.log("then:"+inserts)
										return inserts
										}
									); // emote then

						}); // end reaction collection promise

						return Promise.all(reactionCollection).then(inserts2 => {
								//console.log("reactionCollection:"+inserts2);
								return inserts2
						});
					} // end if no reacts

				}).then( allReacts => {
					//console.log(allReacts);

					var allReactsX = [].concat.apply([], allReacts);
					//console.log(allReactsX);

					var availableRoles = allRoles.filter( roles => roles.eventid == element[0]).map(roles => {
						return roles.rolesymbol;
					});


					
					//bot["alemalexiaspecials"].filter(para => para.special == "ECG")[0].rolerestriction;

					//var roleId = "626472574871928842";


					var sqlInserts = allReactsX.map(reaction => {
						if (reaction.userid !== bot.user.id){
							var roleId = reaction.restriction;
							console.log(roleId);

							if (roleId === "undefined" | bot.channels.get(element[1]).guild.member(reaction.userid).roles.has(roleId)){
							if(availableRoles.includes(reaction.emote)){

							// var emotetype = availableRoles.find(function(element) {
							//   return element.rolesymbol === reaction.emote;
							// });

							var emotetype = allRoles.filter(roles => roles.rolesymbol === reaction.emote & roles.eventid == element[0])[0].rolename;
							//console.log(emotetype);

							var sqlStatement = "";
							var removeEntries = "DELETE FROM signups WHERE  eventid = '" +reaction.event + "' AND duserid = '" + reaction.userid + "';"
							var removeDeclines = "DELETE FROM signups WHERE  eventid = '" +reaction.event + "' AND type  != 'signup' AND duserid = '" + reaction.userid + "';"
							//+ "INSERT INTO signups (eventid, duserid, role, type) VALUES ('" + reaction.event + "','" + reaction.userid + "','" + reaction.emote + "','" + emotetype +"');";

							switch (reaction.emote) {
							  case '❌':
									sqlStatement = removeEntries + "INSERT INTO signups (eventid, duserid, role, type) VALUES ('" + reaction.event + "','" + reaction.userid + "','" + reaction.emote + "','" + "decline" +"');";
								break;
							  case '⏰':
									sqlStatement = removeEntries + "INSERT INTO signups (eventid, duserid, role, type) VALUES ('" + reaction.event + "','" + reaction.userid + "','" + reaction.emote + "','" + "reserve" +"');";
									break;
								case '❓':
									sqlStatement = removeEntries + "INSERT INTO signups (eventid, duserid, role, type) VALUES ('" + reaction.event + "','" + reaction.userid + "','" + reaction.emote + "','" + "reserve" +"');";
									break;
								// else ROLES?
							}
							if (sqlStatement === ""){
								sqlStatement = removeDeclines + "INSERT INTO signups (eventid, duserid, role, type) VALUES ('" + reaction.event + "','" + reaction.userid + "','" + reaction.emote + "','" + "signup" +"');";
							}

							var rArray = [sqlStatement,reaction.event];

							return rArray
						}else{
							return
						};
						}else{
							return
						};
						}else{
							return
						};
					}); // END sqlInserts

					Promise.all(sqlInserts).then(sqlStatements => {
							//console.log(sqlStatements)

							/// begin copy from signups
							var query = sqlStatements.filter(function(el) { return el; }).map(sql => {
								return sql[0]
							}).join(" ");

							var event = sqlStatements.filter(function(el) { return el; }).map(sql => {
								return sql[1]
							}).join(" ");

							//console.log(query);

							if (query.length > 0){

							dh.mysqlQuery(mysql, query, function(err, all) {

								// TRIGGER function reevaluate signups

								fh.updateSignups(event, bot, mysql, Discord, "reaction")

							return (all)
						}); // query
						/// end copy from signups
					} // if query > 0
					});

				})
  			.catch(console.error);


		}); // end foreach allannounces
	}); // end dh query roles
}); // end dh query events


	// check their messages for new reactions FOREACH
	// add reactions to database FOREACH
	// remove reaction FOREACH
}; // end exports.update
