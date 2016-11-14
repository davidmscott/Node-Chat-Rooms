// Jan 1, 1970 00:00:00 am UTC => UNIX epoch

const moment = require('moment');

// var date = moment();

// date.add(100, 'year').subtract(2, 'days');

// console.log(date.format('MMM Do, YYYY'));

var date = moment();

console.log(date.format('h:mm a'));