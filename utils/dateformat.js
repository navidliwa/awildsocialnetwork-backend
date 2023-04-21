var moment = require('moment');

module.exports = function dateHelper () {
    console.log( moment().format('MMMM Do YYYY, h:mm:ss a'));
    const date = moment().format('MMMM Do YYYY, h:mm:ss a');
    return date
};