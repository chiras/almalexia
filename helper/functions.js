const dh = require("../helper/db.js")

//var isUserID = new RegExp(/\<\@[0-9]+\>/g)
var isUserID = new RegExp(/\S+#[0-9]+/g)


function editMessages(bot,channelid,messageid, outputText, count, field, Discord){
  bot.channels.get(channelid).fetchMessage(messageid).then(message => {
    if (outputText.length>0){
   			message.embeds[0].fields[field].value = outputText;
    }else{
      message.embeds[0].fields[field].value = "<none>";
    }
    var name = "Unspecified";
    switch (field) {
        case 1:
          name = 'Signups';
          break;
        case 3:
          name = 'Declines';
          break;
        case 2:
          name = 'Reserves';
          break;
        //else?
    };
    message.embeds[0].fields[field].name = name + ": " + count;
   	message.edit(new Discord.RichEmbed(message.embeds[0]));
  }).catch(console.error);
}

function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
}

exports.success = function(msg, truex) {
	if (truex === "TRUE"){
			msg.react("✅")
		}else{
			msg.react("❌")
		};
}



exports.updateSignups = function(eventid, bot, mysql, Discord, reactsignup) {
  // querySignups = "SELECT duserid FROM signups WHERE eventid = '" + eventid + "';";

  querySignups = "SELECT signups.duserid, signups.role, signups.type, events.channelid, events.channelid2, events.announceid, events.announceid2 FROM signups INNER JOIN events ON signups.eventid=events.eventid WHERE signups.eventid = '" + eventid + "';"
  // // 	var querySignups = "SELECT duserid FROM signups  WHERE eventid = '" + sqlStatements[1] + "';";

  dh.mysqlQuery(mysql, querySignups, function(err2, all2) {
    console.log(all2)

  		  var signups = all2.map(function(all2){
//  				return {role: all2.role, user: "<@"+all2.duserid+">", type : all2.type};
          const dev = bot.users.get(all2.duserid) //|| await bot.fetchUser(all2.duserid);
          console.log(dev);
//          return {role: all2.role, user: bot.fetchUser(all2.duserid).username, type : all2.type};
          return {role: all2.role, user: bot.users.get(all2.duserid).tag, type : all2.type};

  			})//.join(",");//.filter( onlyUnique ).join(",");

        var counts = {  Signups : 0, Reserves : 0, Declines : 0};
        var counted = [];

        console.log(signups)

          var output = [];

          signups.forEach(function(item) {
            var existing = output.filter(function(v, i) {
              return v.role == item.role;
            });
            if (existing.length) {
              var existingIndex = output.indexOf(existing[0]);
              output[existingIndex].user = output[existingIndex].user.concat(item.user);
            } else {
              if (typeof item.user == 'string')
                item.user = [item.user];
              output.push(item);
            }
          });

          console.log(signups);

          var outputText = output.map(role => {

            var type;

            switch (role.type) {
        			  case 'signup':
        					type = 0;
        			    break;
        			  case 'decline':
        					type = 2;
                //  counts.Declines++;
        					break;
        			  case 'reserve':
        					type = 1;
                //  counts.Reserves++;
        					break;
        				//else?
            };

            var outtxt = type + "|" + role.role + " " + role.user.filter( onlyUnique ).join(", ");
            return outtxt
          });

          // what happens if empty?

          //console.log(outputText.join("\n"));

//    		if (signups.length === ""){signups="<none>"};

          Promise.all(outputText).then(outputText => {
            console.log("-----");
            console.log(outputText);

            console.log("-----");

            var signed = outputText.filter(type => type.startsWith("0")).join("\n").replace(/0\|/g,"");
            var reserve = outputText.filter(type => type.startsWith("1")).join("\n").replace(/1\|/g,"");
            var declined = outputText.filter(type => type.startsWith("2")).join("\n").replace(/2\|/g,"");

            console.log(signed);

            counts.Signups = (signed.match(isUserID) || []).filter( onlyUnique ).length;
            counts.Reserves = (reserve.match(isUserID) || []).filter( onlyUnique ).length;
            counts.Declines = (declined.match(isUserID) || []).filter( onlyUnique ).length;

            console.log(signed)

              editMessages(bot,all2[0].channelid,all2[0].announceid, signed, counts.Signups, 1, Discord)
              editMessages(bot,all2[0].channelid2,all2[0].announceid2, signed, counts.Signups, 1, Discord)
              editMessages(bot,all2[0].channelid,all2[0].announceid, reserve, counts.Reserves, 2, Discord)
              editMessages(bot,all2[0].channelid2,all2[0].announceid2, reserve, counts.Reserves, 2, Discord)
              editMessages(bot,all2[0].channelid,all2[0].announceid, declined, counts.Declines, 3, Discord)
              editMessages(bot,all2[0].channelid2,all2[0].announceid2, declined, counts.Declines, 3, Discord)

            //return;

            // outputText.forEach(test => {
            //   var outputText = test.split("|");
            //   for (var i = 0; i <3; i++){
            //     outputText
            //   }
            //   console.log(outputText[0]+"--->"+outputText[1]);
            //
            //   // .join("\n")
            //   // editMessages(bot,all2[0].channelid,all2[0].announceid,outputText[1], outputText[0])
            //   // editMessages(bot,all2[0].channelid2,all2[0].announceid2,outputText[1], outputText[0])
            // })

            // editMessages(bot,all2[0].channelid,all2[0].announceid,outputText, field)

            //console.log("reactionCollection:"+inserts2);

            //console.log("CID:"+all2[0].channelid);
            //console.log(bot.channels.get(all2[0].channelid));

            // bot.channels.get(all2[0].channelid).fetchMessage(all2[0].announceid).then(message => {
            //  			message.embeds[0].fields[1].value = outputText.join("\n");
            // // 		//	console.log("4b: " + message.embeds[0].fields[1].value);
            //  			message.edit(new Discord.RichEmbed(message.embeds[0]));
            //  		}).catch(console.error);
            //
            // bot.channels.get(all2[0].channelid2).fetchMessage(all2[0].announceid2).then(message => {
            //  			message.embeds[0].fields[1].value = outputText.join("\n");
            // // 		//	console.log("4b: " + message.embeds[0].fields[1].value);
            //  			message.edit(new Discord.RichEmbed(message.embeds[0]));
            //  		}).catch(console.error);

          });


  //
  // 		// msg.channel.fetchMessage(announceid)
  // 		// 	.then(message => {
  // 		// 	//	console.log("3: " + message.embeds[0].fields[1].value);
  // 		// 		var oldDescr = message.embeds[0].fields[1].value;
  // 		// 		//message.embeds[0].fields[1].value = oldDescr + ", <@" + msg.author.id +">";
  // 		// 		message.embeds[0].fields[1].value = signups;
  // 		// //		console.log("4: " + message.embeds[0].fields[1].value);
  // 		// 		message.edit(new Discord.RichEmbed(message.embeds[0]));
  // 		// 	}).catch(console.error);
  //
  // 		bot.channels.get(announcechannel).fetchMessage(announceid2)
  // 			.then(message => {
  // 			message.embeds[0].fields[1].value = signups;
  // 		//	console.log("4b: " + message.embeds[0].fields[1].value);
  // 			message.edit(new Discord.RichEmbed(message.embeds[0]));
  // 		}).catch(console.error);
  //
   		 if (reactsignup != "reaction"){exports.success(reactsignup,"TRUE")};
  //
  }); // querySignups
}

exports.pad = function(n) {
    return n < 10 ? '0' + n : n
}



exports.isNumeric = function(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}

exports.uniqArray = function(a) {
    var seen = {};
    return a.filter(function(item) {
        return seen.hasOwnProperty(item) ? false : (seen[item] = true);
    });
}

exports.capitalFirstLetter = function(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

exports.kFormatter = function(num) {
    return num > 999 ? (num/1000).toFixed(1) + 'k' : num
}

exports.uniq = function(a) {
    return a.sort().filter(function(item, pos, ary) {
        return !pos || item != ary[pos - 1];
    })
}

exports.containsNonLatinCodepoints = function(s) {
    return /[^\u0000-\u00ff]/.test(s);
}

exports.removeElement = function(ary, elem) {
    var i = ary.indexOf(elem);
    if (i >= 0) ary.splice(i, 1);
    return ary;
}

exports.getKeyByValue = function(object, value) {
  return Object.keys(object).find(key => object[key] === value);
}
