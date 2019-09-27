
const roles = {
		"heal" : "Heal",
		"hps" : "Heal",
		"healer" : "Heal",
		"h" : "Heal",
		"dd" : "DD",
		"damage dealer" : "DD",
		"damage" : "DD",
		"dps" : "DD",
		"d" : "DD",
		"tank" : "Tank",
		"t" : "Tank"
}

exports.getRole = function (type) {
	var rrole;
	if (roles[type.replace(/\"/g, "").replace(/ /g, "").toLowerCase()]){
		rrole= roles[type.replace(/\"/g, "").replace(/ /g, "").toLowerCase()];
	}else{
		rrole = type;
	}
	return rrole
}
