const express = require('express');
const router = express.Router();
const models = require('../../models');


// Get Cart Products : GET - '/api/cart'
router.get('/', async (req, res) => {
    try {
        let cartProducts = await models.Cart.find().populate('product').lean();
        Array.from(cartProducts).map((_cartDetail) => {
            _cartDetail.id = _cartDetail._id;
            _cartDetail.product_id = _cartDetail.product._id;

            _cartDetail.product.id = _cartDetail.product._id;

            delete _cartDetail._id;
            delete _cartDetail.__v;
            delete _cartDetail.product._id;
            delete _cartDetail.product.__v;
            return _cartDetail;
        })
        return res.status(200).json({
            data: cartProducts
        });
    } catch (error) {
        return res.status(500).send(error);
    }
});

// Get Cart Details By Cart-Id : GET - '/api/cart/:id'
router.get('/:id', async (req, res) => {
    try {
        let cartProduct = await models.Cart.findById(req.params.id).populate('product').lean();
        if (cartProduct) {
            cartProduct.id = cartProduct._id;
            cartProduct.product.id = cartProduct.product_id = cartProduct.product._id;

            delete cartProduct._id;
            delete cartProduct.product._id;
            delete cartProduct.__v;
            delete cartProduct.product.__v;
        }
        
        return res.status(200).json({
            data: cartProduct
        });
    } catch (error) {
        return res.status(500).send(error);
    }
});

// Add Cart : POST - '/api/cart'
router.post("/", async (req, res) => {
    try {
        let cartDetails = new models.Cart(req.body);
        cartDetails.save((_err) => {
            if (_err) return res.status(500).send(_err);

            return res.status(201).json({
                data: {
                    message: "Product added into cart successfully",
                    success: cartDetails
                }
            });
        });

    } catch (error) {
        return res.status(500).send(error);
    }
});

// Update cart by product-id : PUT - '/api/cart/:id'
router.put("/:id", async (req, res) => {
    try {
        let exisitingCProdCounts = await models.Cart.countDocuments({ product: req.params.id });
        if (exisitingCProdCounts != null && typeof exisitingCProdCounts != "undefined"
            && exisitingCProdCounts > 0) {
            models.Cart.findOneAndUpdate({ product: req.params.id }, { $set: req.body },
                (_err, _cartProductDetail) => {
                    if (_err) return res.status(500).send(_err);

                    return res.status(200).json({
                        data: {
                            message: "Cart updated successfully",
                            success: _cartProductDetail
                        }
                    });
                });
        }
        else {
            return res.status(404).json({
                data: {
                    message: "Requested product doesn't exist in cart",
                }
            });
        }
    } catch (error) {
        return res.status(500).send(error);
    }
});

// Delete product from cart by product-id : DELETE - '/api/cart/:id'
router.delete("/clear-product/:id", async (req, res) => {
    try {
        let exisitingCProdCounts = await models.Cart.countDocuments({ product: req.params.id });
        if (exisitingCProdCounts != null && typeof exisitingCProdCounts != "undefined"
            && exisitingCProdCounts > 0) {
            models.Cart.findOneAndDelete({ product: req.params.id },
                (_err, _cartDetail) => {
                    if (_err) return res.status(500).send(_err);

                    return res.status(200).json({
                        data: {
                            message: "Product deleted from cart successfully",
                            success: _cartDetail
                        }
                    });
                });
        }
        else {
            return res.status(404).json({
                data: {
                    message: "Requested product doesn't exist in cart",
                }
            });
        }
    } catch (error) {
        return res.status(500).send(error);
    }
});

// Clear all products from cart : DELETE - '/api/cart/clear-cart'
router.delete("/clear-cart", async (req, res) => {
    try {
        let cartProducts = await models.Cart.deleteMany({});
        return res.status(200).json({
            data: {
                message: "Cart cleared successfully",
                success: cartProducts
            }
        });
    } catch (error) {
        return res.status(500).send(error);
    }
});

module.exports = router;