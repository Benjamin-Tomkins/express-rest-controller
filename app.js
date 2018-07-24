const path    = require('path');
const Joi     = require('joi');
const express = require('express');
const app = module.exports = express();


// on mac, set env with "export PORT=5000"
const PORT = process.env.PORT || 3000;


// includig MIDDLEWARE in the resource processing pipeline
app.disable('x-powered-by');
app.use(express.json());


const wishlists = [ { id: 1, item: 'toilet paper' },
                    { id: 2, item: 'sanitary pads' },
                    { id: 3, item: 'tampons' },
                    { id: 4, item: 'wet wipes' } ];

const buildUrl = (version, path) => `/api/${version}/${path}`;




app.get(buildUrl('v1','wishlists'), (req, res) => {
    res.send(wishlists);
});


app.post(buildUrl('v1','wishlists'), (req, res) => {

    // If invalid, return 400 - Bad request and terminate
    const { error } = validateWishlist(req.body); // using object destructuring syntax
    if (error) return res.status(400).send(error.details[0].message);

    const wishlist = { id: wishlists.length + 1, item: req.body.item };
    wishlists.push(wishlist);

    res.send(wishlist);
});


app.get(buildUrl('v1','wishlists/:id'), (req, res) => {

    // If not existing, return 404
    const wishlist = wishlists.find(w => w.id === parseInt(req.params.id));
    const msg_404 = 'The wishlist for the given ID not found';
    if (!wishlist) return res.status(404).send(msg_404);

    res.send(wishlist);
});


app.put(buildUrl('v1', 'wishlists/:id'), (req, res) => {

    // If not existing, return 404
    const wishlist = wishlists.find(w => w.id === parseInt(req.params.id));
    const msg_404 = 'The wishlist for the given ID not found';
    if (!wishlist) return res.status(404).send(msg_404);

    // If invalid, return 400 - Bad request and terminate
    const { error } = validateWishlist(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    wishlist.item = req.body.item;
    // If all good, update the wishlist to be http compliant
    res.send(wishlist);
});


app.delete(buildUrl('v1', 'wishlists/:id'), (req, res) => {

    // If not existing, return 404
    const wishlist = wishlists.find(w => w.id === parseInt(req.params.id));
    const msg_404 = 'The wishlist for the given ID not found';
    if (!wishlist) return res.status(404).send(msg_404);

    // Delete
    const index = wishlists.indexOf(wishlist);
    wishlists.splice(index, 1); // goto wishlists[index] and remove 1 object

    // If all good, update the wishlist to be http compliant
    res.send(wishlist);
});




function validateWishlist(wishlist) {
    const schema = { "item": Joi.string().min(3).required() };
    return Joi.validate(wishlist, schema);
}



app.listen(PORT, () => {
    console.log(`App is listening on port ${PORT}!`)
});