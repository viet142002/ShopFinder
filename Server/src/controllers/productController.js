const Product = require('../Models/productModel');

const imageController = require('./imageController');

const productController = {
    createProduct: async (req, res) => {
        try {
            const { name, price, description, discount, category, status } =
                req.body;
            const files = req.files;
            const retailer = req.user._id;

            const images = await imageController.createImage(files);

            const newProduct = new Product({
                status,
                retailer,
                category,
                discount,
                name,
                price,
                description,
                images,
            });

            await newProduct.save();

            return res.status(200).json({
                newProduct,
                message: 'Product created successfully',
            });
        } catch (error) {
            return res.status(500).json({
                message: error.message,
            });
        }
    },

    updateProduct: async (req, res) => {
        try {
            const {
                name,
                price,
                description,
                discount,
                category,
                status,
                deleteImages,
            } = req.body;
            const files = req.files;
            const retailer = req.user._id;
            const productId = req.params.id;

            const product = await Product.findById(productId)
                .populate('images')
                .exec();

            if (!product) {
                return res.status(404).json({
                    message: 'Product not found',
                });
            }

            if (product.retailer.toString() !== retailer.toString()) {
                return res.status(403).json({
                    message: 'Permission denied',
                });
            }

            if (deleteImages) {
                for (let i = 0; i < deleteImages.length; i++) {
                    await imageController.deleteImage(deleteImages[i]);
                }
            }

            if (files) {
                const newImages = await imageController.createImage(files);
                product.images = product.images.concat(newImages);
            }

            product.name = name;
            product.price = price;
            product.description = description;
            product.discount = discount;
            product.category = category;
            product.status = status;

            const updatedProduct = await product.save();

            return res.status(200).json({
                updatedProduct,
                message: 'Product updated successfully',
            });
        } catch (error) {
            return res.status(500).json({
                message: error.message,
            });
        }
    },

    getProducts: async (req, res) => {
        try {
            const search = req.query.search || '';
            const limit = parseInt(req.query.limit) || 10;
            const page = parseInt(req.query.page) || 1;

            const products = await Product.find({
                name: { $regex: search, $options: 'i' },
            })
                .populate('images')
                .populate('retailer')
                .limit(limit)
                .skip(limit * (page - 1))
                .exec();

            return res.status(200).json(products);
        } catch (error) {
            return res.status(500).json({
                message: error.message,
            });
        }
    },

    addQuantity: async products => {
        try {
            for (let i = 0; i < products.length; i++) {
                const product = await Product.findById(
                    products[i]?._id || products[i].product
                );
                product.quantity += products[i].quantity;
                if (product.quantity < 0) {
                    product.quantity = 0;
                    product.status = 'unavailable';
                } else {
                    product.status = 'available';
                }
                await product.save();
            }
        } catch (error) {
            throw error;
        }
    },

    getProductById: async (req, res) => {
        try {
            const productId = req.params.id;
            const product = await Product.findById(productId)
                .populate('images')
                .populate('retailer')
                .exec();

            if (!product) {
                return res.status(404).json({
                    message: 'Product not found',
                });
            }

            return res.status(200).json(product);
        } catch (error) {
            return res.status(500).json({
                message: error.message,
            });
        }
    },

    // Only can delete product have status is draft and retailer is the owner and delete all images of product
    deleteProduct: async (req, res) => {
        try {
            const productId = req.params.id;
            const retailer = req.user._id;

            const product = await Product.findById(productId)
                .populate('images')
                .exec();

            if (!product) {
                return res.status(404).json({
                    message: 'Product not found',
                });
            }

            if (product.retailer.toString() !== retailer.toString()) {
                return res.status(403).json({
                    message: 'Permission denied',
                });
            }

            if (product.status !== 'draft') {
                return res.status(403).json({
                    message: 'Product can not be deleted',
                });
            }

            for (let i = 0; i < product.images.length; i++) {
                await imageController.deleteImage(product.images[i].name);
            }

            await product.remove();

            return res.status(200).json({
                message: 'Product deleted successfully',
            });
        } catch (error) {
            return res.status(500).json({
                message: error.message,
            });
        }
    },
};

module.exports = productController;
