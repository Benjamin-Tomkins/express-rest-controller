const path        = require('path');
const Joi         = require('joi');
const express     = require('express');
const router      = express.Router();


const wishlists = [ { id: 1, item: 'toilet paper' },
    { id: 2, item: 'sanitary pads' },
    { id: 3, item: 'tampons' },
    { id: 4, item: 'wet wipes' } ];



router.get('/', (req, res) => {
    res.send(wishlists);
});


router.post('/', (req, res) => {
    const { error } = validateWishlist(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const wishlist = { id: wishlists.length + 1, item: req.body.item };
    wishlists.push(wishlist);

    res.send(wishlist);
});


router.get('/:id', (req, res) => {
    const wishlist = wishlists.find(w => w.id === parseInt(req.params.id));
    const msg_404 = 'The wishlist for the given ID not found';
    if (!wishlist) return res.status(404).send(msg_404);

    res.send(wishlist);
});


router.put('/:id', (req, res) => {
    const wishlist = wishlists.find(w => w.id === parseInt(req.params.id));
    const msg_404 = 'The wishlist for the given ID not found';
    if (!wishlist) return res.status(404).send(msg_404);

    const { error } = validateWishlist(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    wishlist.item = req.body.item;
    res.send(wishlist);
});


router.delete('/:id', (req, res) => {
    const wishlist = wishlists.find(w => w.id === parseInt(req.params.id));
    const msg_404 = 'The wishlist for the given ID not found';
    if (!wishlist) return res.status(404).send(msg_404);

    const index = wishlists.indexOf(wishlist);
    wishlists.splice(index, 1);

    res.send(wishlist);
});




function validateWishlist(wishlist) {
    const schema = { "item": Joi.string().min(3).required() };
    return Joi.validate(wishlist, schema);
}

module.exports = router;