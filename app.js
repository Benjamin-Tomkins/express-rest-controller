const path    = require('path');
const Joi     = require('joi');
const helmet  = require('helmet');

const wishlists = require('./routes/wishlists');

const express = require('express');
const app = module.exports = express();


// on mac, set env with "export PORT=5000"
const PORT = process.env.PORT || 3000;


app.disable('x-powered-by');
app.use(express.json());
app.use(helmet());
app.use('/api/wishlists', wishlists);




app.listen(PORT, () => {
    console.log(`App is listening on port ${PORT}!`)
});