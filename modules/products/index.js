const express = require('express');
const router = express.Router();
const models = require('../../models');
const config = require('../../config');
const uploadFile = require("../../utils/middleware");

// Get All Products : GET - '/api/product'
router.get('/', async (req, res) => {
    try {
        let products = await models.Product.find();
        return res.status(200).json({
            data: products
        });
    } catch (error) {
        return res.status(500).send(error);
    }
});

// Get Product Details By Product-Id : GET - '/api/product/:id'
router.get('/:id', async (req, res) => {
    try {
        let product = await models.Product.findById(req.params.id);
        return res.status(200).json({
            data: product
        });
    } catch (error) {
        return res.status(500).send(error);
    }
});

// Add Product : POST - '/api/product'
router.post("/", async (req, res) => {
    try {
        await uploadFile(req, res);
        let reqProductDetail = JSON.parse(req.body.productDetail);
        reqProductDetail.image_path = `${reqProductDetail.image_path}/${req.file.filename}`;
        let productDetails = new models.Product(reqProductDetail);
        productDetails.save((_err) => {
            if (_err) return res.status(500).send(_err);

            return res.status(201).json({
                data: {
                    message: "Product added successfully",
                    success: productDetails
                }
            });
        });

    } catch (error) {
        if (error.code == "LIMIT_FILE_SIZE") {
            return res.status(500).send({
                message: "File size cannot be larger than 2MB!",
            });
        }
        return res.status(500).send(error);
    }
});

// Update product detail by id : PUT - '/api/product/:id'
// Add middleware and file upload logic here
router.put("/:id", async (req, res) => {
    try {
        models.Product.findByIdAndUpdate(req.params.id, req.body,
            (_err, _productDetail) => {
                if (_err) return res.status(500).send(_err);

                return res.status(200).json({
                    data: {
                        message: "Product updated successfully",
                        success: _productDetail
                    }
                });
            });
    } catch (error) {
        return res.status(500).send(error);
    }
});

// Delete product by id : DELETE - '/api/product/:id'
router.delete("/:id", async (req, res) => {
    try {
        models.Product.findByIdAndDelete(req.params.id,
            (_err, _productDetail) => {
                if (_err) return res.status(500).send(_err);

                return res.status(200).json({
                    data: {
                        message: "Product deleted successfully",
                        success: _productDetail
                    }
                });
            });
    } catch (error) {
        return res.status(500).send(error);
    }
});


module.exports = router;