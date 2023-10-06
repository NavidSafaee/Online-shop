const express = require('express');
const path = require('path');


const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');
const cartRoutes = require('./routes/cartRoutes');
const { errorHandler } = require('./controllers/errorController');

const app = express();



app.use(express.json());

app.use('/users', userRoutes);
app.use('/products', productRoutes);
app.use('/carts', cartRoutes);
app.use(authRoutes);
app.use(errorHandler);

// static serve
app.use('/public', express.static(path.join(__dirname, '..', 'public')));

module.exports = app;
