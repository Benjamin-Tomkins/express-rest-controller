const path      = require('path');
const Joi       = require('joi');
const helmet    = require('helmet');
const wishlists = require('./routes/wishlists');
const express   = require('express');
const app       = module.exports = express();


// SET PORT :
const PORT = process.env.PORT || 3000;


// MIDDLEWARE :
app.disable('x-powered-by');
app.use(express.json());
app.use(helmet());
app.use('/api/wishlists', wishlists);


// CONSOLE HELPER
app.listen(PORT, () => {
    console.log(`App is listening on port ${PORT}!`)
});