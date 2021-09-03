const express = require('express');
const app = express();

const productsRouter = require('../products/index');
const cartRouter = require('../cart/index');

app.use('/api/product', productsRouter);
app.use('/api/cart', cartRouter);

module.exports = app;