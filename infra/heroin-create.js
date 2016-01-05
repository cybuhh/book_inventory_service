var heroin = require('heroin-js');
var configurator = heroin(process.env.HEROKU_API_TOKEN, {debug: false});
var infra = require('./' + process.argv[2]);

configurator(infra);
