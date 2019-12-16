const nh = require("../helper/names.js")
const fh = require("../helper/functions.js")

const emojiRegex = require('emoji-regex/es2015/index.js');
const isEmoji = emojiRegex();

	var isGuildRole = new RegExp("\<\@\&[0-9]+\>","i")
	var command = new RegExp("\\+[a-zA-Z0-9]+","i")
	var name = new RegExp('"[^"]*"',"i")
	var isDate = new RegExp('[0-9]{4}-[0-9]{2}-[0-9]{2}', 'i');
	var isRole = new RegExp('[a-zA-Z]+:[0-9]+', 'i');
	var isTime = new RegExp('[0-9]+:[0-9][0-9][ap]m', 'i');
	var isEventID = new RegExp('\#[0-9]+', 'i');

	const dayOfWeek = ["sun","mon","tue","wed","thu","fri","sat"];
/**
Argument Types:

!command
-option
NA/EU/PTS/NA-XBOX/EU-XBOX/NA-PS4/EU-PS4
$/@account
$poll
question?
answer.
1,2,... votes
blablup sets

qualities
levels/cp
traits

!command $account, NA, -op1 -op2 ballal 1,2  superior,
**/

exports.argumentSlicer = function(msg, callback){ // add required / optional?
	var args = msg.content;

	var returnObj = {
		"user" 			: msg.author.id,
		"channel" 		: msg.channel.id,
		"command" 		: [],
		"name" 		: [],
		"options" 		: [],
		"role" 			: [],
		"date"			: [],
		"weekday"			: [],
		"eventid"			: [],
		"restriction"	: [],
		"time"			: [],
		"others" 			: []
	}


	if (args.match(command)){
		returnObj["command"].push(args.match(command)[0].trim())
	}else{
		returnObj["command"].push(msg.content.split(" ")[0])
	}

	if (args.match(name)){
		returnObj["name"].push(args.match(name)[0].trim())
	}else{
		returnObj["name"].push(msg.content.split(" ")[0])
	}

	args = args.replace(command,"").trim();
	args = args.replace(name,"").trim();


	if (args != ""){
		var argsArray = args.replace(/ /g, ",").replace(/\n/g, ",").replace(/\"/g, "'").replace(/\"/g, '"').replace(/\`/g, "'").split(",")

    	for (var i = 0; i < argsArray.length; i++){
			//	console.log("X:" + argsArray[i])
				argsArray[i]=argsArray[i].trim();

				if (argsArray[i].match(isEmoji)){
					returnObj["role"].push([argsArray[i], Number(argsArray[i-1]), "signup"])
				}else if (argsArray[i].startsWith("-")){
    	    returnObj["options"].push(argsArray[i])
    		}else if (argsArray[i] == ""){
     		}else if(argsArray[i].match(isDate)){
    			returnObj["date"].push(argsArray[i])
	    	}else if(argsArray[i].match(isTime)){
    			returnObj["time"].push(argsArray[i])
	    	}else if(argsArray[i].match(isGuildRole)){
    			returnObj["restriction"].push(argsArray[i].substring(3).slice(0, -1))
				}else if(argsArray[i].match(isEventID)){
    			returnObj["eventid"].push(argsArray[i].substring(1))
	    	}else if(argsArray[i].match(isRole)){
    			//returnObj["role"].push(argsArray[i])
					//console.log("R:" + argsArray[i])
	    	}else if(dayOfWeek.includes(argsArray[i].slice(0,3).toLowerCase())){
					returnObj["weekday"].push(argsArray[i])
				}else{
    			returnObj["others"].push(argsArray[i])
	    	}
       	} // end for
	}

	console.log(returnObj)
	callback(returnObj);
}
