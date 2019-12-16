const moment = require('moment-timezone');
const momentx = require('moment');

exports.getNextDayOfTheWeek = function (dayName, excludeToday = true, refDate = new Date()) {
      const dayOfWeek = ["sun","mon","tue","wed","thu","fri","sat"]
                        .indexOf(dayName.slice(0,3).toLowerCase());
      if (dayOfWeek < 0) return;
      refDate.setHours(0,0,0,0);
      refDate.setDate(refDate.getDate() + !!excludeToday +
                      (dayOfWeek + 7 - refDate.getDay() - !!excludeToday) % 7);
      return refDate;
  }

exports.searchZone = function (zone) {
    var z = zone.toLowerCase();

    // We probably want US EST, not the non-DST obeying EST (used in some islands near the equator)
    if (z == 'est')
        return ['EST5EDT'];

    var matches = [];
    var exact = '';
    if (zone.length >= 3)
        moment.tz.names().forEach(function (val) {
            if (val.toLowerCase() == zone.z)
                exact = val;

            if (val.toLowerCase().indexOf(zone.toLowerCase()) >= 0)
                matches.push(val);
        });

    if (exact.length > 1)
        matches = [exact];

    if (matches.length > 1) {
        // We don't care about duplicates if they are aliases of the same zone
        var off = moment.tz(matches[0]).utcOffset();
        var sameOff = true;
        for (var i = 1; i < matches.length && sameOff; ++i) {
            sameOff = moment.tz(matches[i]).utcOffset() == off;
        }
        if (sameOff)
            matches = [matches[0]];
    }

    return matches;
}
