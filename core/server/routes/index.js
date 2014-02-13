
/*
 * GET home page.
 */

var api = require('./api');
var auth = require('./auth');

module.exports = {
    api: api,
    auth: auth
};

exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};