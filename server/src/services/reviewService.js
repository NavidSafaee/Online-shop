const Review = require('../models/reviewModel');
const User = require('../models/userModel');
const Product = require('../models/productModel');

async function addReview(reqBody, productId, userId) {
    const {
        rating,
        review
    } = reqBody;
    const user = await User.findById(userId);
    const product = await Product.findById(productId);

    if (!product) {
        const error = new Error('Product not found!');
        error.statusCode = 404;
        throw error;
    }

    const reviewObj = {
        product: productId,
        user: userId,
        username: user.username,
        rating,
        review,
        validationStatus: 'PENDING'
    }

    const reviewDoc = await Review.findOneAndUpdate({ user: userId }, reviewObj, { upsert: true, new: true });
    return reviewDoc;
}

async function getReviews(productId) {
    return await Review.find({ product: productId });
}


async function getMyReviews(userId) {
    const reviews = await Review.find({ user: userId }).populate({
        path: 'product',
        select: 'title imageUrls'
    });
    return reviews;
}

async function changeValidationStatus(reviewId, validationStatus) {
    await Review.findByIdAndUpdate(reviewId, { validationStatus });
}

async function getPendingReviewsCount() {
    const count = await Review.countDocuments({ validationStatus: 'PENDING' });
    return { count };
}  



module.exports = {
    addReview,
    getReviews,
    getMyReviews,
    changeValidationStatus,
    getPendingReviewsCount
}