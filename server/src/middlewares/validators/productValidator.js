const { body } = require('express-validator');

const createOrEditProductValidator = [
    body('title', 'title should not be empty')
        .trim()
        .notEmpty(),


    body('price', 'invalid price')
        .isFloat({ min: 0.01 })
        .isLength({ max: 4 }),

    body('category', 'category should not be empty')
        .trim()
        .notEmpty()
        .custom((value, { req }) => {
            if (!['CHAIR', 'SOFA', 'BENCH', 'STORAGE', 'FURNITURE', 'TABLE'].includes(value)) {
                throw new Error('Please enter a valid category');
            }
            return true;
        }),

    body('discount', 'invalid discount percentage')
        .isFloat({ min: 0.01, max: 1 })
        .isLength({ max: 4 }),

    body('description', 'description should not be empty')
        .trim()
        .notEmpty()
];


module.exports = {
    createOrEditProductValidator
}