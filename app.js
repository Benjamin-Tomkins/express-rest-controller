const debug       = require('debug')('app:startup');
const config      = require('config');
const morgan      = require('morgan');
const helmet      = require('helmet');
const home       = require('./routes/home');
const wishlists   = require('./routes/wishlists');
const express     = require('express');
const cors        = require('cors');
const app         = module.exports = express();


// Configuration
console.log(config.get('name'));
console.log(config.get('heroku.repo'));
// console.log('Heroku password: ' + config.get('heroku.password'));
// export heroku_password=


// export NODE_ENV=development
if (app.get('env') === 'development') {
    app.use(morgan('tiny'));
    debug('Morgan http enabled :');
}


// SET PORT :
const PORT = process.env.PORT || 3000;


// MIDDLEWARE :
app.set('view engine', 'pug');
app.set('views', './views');
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.disable('x-powered-by');


// ROUTES :
app.use('/', home);
app.use('/api/wishlists', wishlists);


// CONSOLE HELPER :
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}!`)
});