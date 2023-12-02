
const validator = require('../utils/validator');
const {
    getCart,
    addToCart,
    getCartItemQuantity
} = require('../services/cartService');

async function httpGetCart(req, res, next) {
    try {
        const result = await getCart(req.userId);
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
}

async function httpAddToCart(req, res, next) {
    try {
        validator(req);
        const productId = req.body.productId;
        
        const response = await addToCart(req.userId, productId);
        res.status(200).json(response);
    } catch (error) {
        next(error);
    }
}

async function httpGetCartItemQuantity(req, res, next) {
    try {
        const productId = req.params.productId;
        const response = await getCartItemQuantity(productId);
        res.status(200).json({quantity: response});
    } catch (error) {
        next(error);
    }
}


module.exports = {
    httpGetCart,
    httpAddToCart,
    httpGetCartItemQuantity
}