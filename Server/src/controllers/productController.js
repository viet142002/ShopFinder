const Product = require('../Models/productModel');
const Retailer = require('../Models/retailerModel');
const Information = require('../Models/informationModel');
const Rate = require('../Models/rateModel');

const imageController = require('./imageController');

const productController = {
    // create product by retailer
    createProduct: async (req, res) => {
        try {
            const { name, price, description, discount = 0 } = req.body;
            let status = 'draft';
            const files = req.files;

            if (!name || !price || !description) {
                return res.status(400).json({
                    message: 'Missing required fields',
                });
            }

            if (price < 0) {
                return res.status(400).json({
                    message: 'Invalid price',
                });
            }

            if (discount < 0 || discount > 100) {
                return res.status(400).json({
                    message: 'Invalid discount',
                });
            }

            if (files.length < 1) {
                return res.status(400).json({
                    message: 'Missing images',
                });
            }

            const distributor = await Retailer.findOne({ owner: req.user._id });

            if (!distributor || distributor.status !== 'approved') {
                return res.status(403).json({
                    message: 'Permission denied',
                });
            }

            if (distributor.mode === 'only-pickup') {
                status = 'only-display';
            }

            const images = await imageController.createImage(files);

            const newProduct = new Product({
                status,
                distributor,
                distributorType: 'Retailer',
                description,
                discount,
                name,
                price,
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
    // create product by user share product
    createProductByUser: async (req, res) => {
        try {
            // distributor is information id
            const { name, price, description, distributor } = req.body;

            const files = req.files;
            const user = req.user._id;

            if (!name || !price) {
                return res.status(400).json({
                    message: 'Missing required fields',
                });
            }

            if (price < 0) {
                return res.status(400).json({
                    message: 'Invalid price',
                });
            }

            if (files.length < 1) {
                return res.status(400).json({
                    message: 'Missing images',
                });
            }

            const images = await imageController.createImage(files);

            const newProduct = new Product({
                status: 'only-display',
                distributor,
                distributorType: 'Information',
                name,
                price,
                description,
                images,
                userCreate: user,
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
    // update detail product by retailer
    updateProduct: async (req, res) => {
        try {
            // deleteImages is array of image id
            let { name, price, description, discount, status, deleteImages } =
                req.body;
            const files = req.files;

            if (!['available', 'stop'].includes(status)) {
                return res.status(400).json({
                    message: 'Invalid status',
                });
            }

            if (typeof deleteImages === 'string') {
                deleteImages = [deleteImages];
            }
            const retailer = await Retailer.findOne({ owner: req.user._id });

            const productId = req.params.id;

            const product = await Product.findById(productId)
                .populate('images')
                .exec();

            if (!product) {
                return res.status(404).json({
                    message: 'Product not found',
                });
            }

            if (product.distributor.toString() !== retailer._id.toString()) {
                return res.status(403).json({
                    message: 'Permission denied',
                });
            }

            if (deleteImages) {
                await imageController.deleteImages(deleteImages);
            }

            if (files) {
                const newImages = await imageController.createImage(files);
                product.images = product.images.concat(newImages);
            }
            if (name) product.name = name;
            if (price) product.price = price;
            if (description) product.description = description;
            if (discount) product.discount = discount;
            if (status) product.status = status;

            await product.save();

            return res.status(200).json({
                message: 'Product updated successfully',
            });
        } catch (error) {
            return res.status(500).json({
                message: error.message,
            });
        }
    },

    // update detail product by user share product
    updateProductByUser: async (req, res) => {
        try {
            // deleteImages is array of image id
            let { name, price, description, deleteImages, discount } = req.body;
            const files = req.files;
            if (typeof deleteImages === 'string') {
                deleteImages = [deleteImages];
            }
            const user = req.user._id;
            const productId = req.params.id;

            const product = await Product.findById(productId)
                .populate('images')
                .exec();

            if (!product) {
                return res.status(404).json({
                    message: 'Product not found',
                });
            }

            if (product.userCreate.toString() !== user.toString()) {
                return res.status(403).json({
                    message: 'Permission denied',
                });
            }

            if (deleteImages) {
                await imageController.deleteImages(deleteImages);
            }

            if (files) {
                const newImages = await imageController.createImage(files);
                product.images = product.images.concat(newImages);
            }

            if (name) product.name = name;
            if (price) product.price = price;
            if (description) product.description = description;
            if (discount) product.discount = discount;

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

    getProductsFromDistributor: async (req, res) => {
        try {
            let status = req.query.status || ['available', 'only-display'];
            if (status === 'all') {
                status = [
                    'draft',
                    'available',
                    'only-display',
                    'sold-out',
                    'stop',
                ];
            }
            if (typeof status === 'string') {
                status = [status];
            }

            const search = req.query.search || '';
            const limit = parseInt(req.query.limit) || 10;
            const page = parseInt(req.query.page) || 1;
            // distributor is retailer id or information id
            const distributor = req.params.id;

            if (limit < 1 || page < 1) {
                return res.status(400).json({
                    message: 'Invalid limit or page',
                });
            }

            if (search.length > 100) {
                return res.status(400).json({
                    message: 'Search too long',
                });
            }

            if (!distributor) {
                return res.status(400).json({
                    message: 'Invalid distributor',
                });
            }

            const products = await Product.find({
                name: { $regex: search, $options: 'i' },
                status: { $in: status },
                distributor,
            })
                .populate('images')
                .limit(limit)
                .skip(limit * (page - 1))
                .select('name price images status _id quantity discount');

            const total = await Product.countDocuments({
                name: { $regex: search, $options: 'i' },
                distributor,
                // status: { $in: status },
            });

            return res.status(200).json({
                products,
                total,
                page,
            });
        } catch (error) {
            return res.status(500).json({
                message: error.message,
            });
        }
    },

    /*
     * @returns {Promise} { distributor, averageRate, totalProduct, totalRate }
     * Get distributor by product id
     * distributor: Distributor of product
     * averageRate: Average rate of distributor
     * totalProduct: Total product of distributor
     * totalRate: Total rate of distributor
     * */
    getDistributorByProductId: async (req, res) => {
        try {
            const product = await Product.findById(req.params.id);
            let distributor = null;

            if (!product) {
                return res.status(404).json({
                    message: 'Product not found',
                });
            }

            if (product.distributorType === 'Retailer') {
                distributor = await Retailer.findById(
                    product.distributor
                ).populate('location logo');
            } else {
                distributor = await Information.findById(
                    product.distributor
                ).populate('location logo');
            }

            const rateDistributor = await Rate.find({
                to: distributor._id,
            });

            const averageRate =
                rateDistributor.reduce((sum, rate) => sum + rate.rate, 0) /
                rateDistributor.length;

            const totalProduct = await Product.countDocuments({
                distributor: distributor._id,
                status: {
                    $in: ['available', 'only-display'],
                },
            });

            return res.status(200).json({
                distributor,
                averageRate: averageRate || 0,
                totalProduct: totalProduct || 0,
                totalRate: rateDistributor.length || 0,
                message: 'Get distributor successfully',
            });
        } catch (error) {
            return res.status(500).json({
                message: error.message,
            });
        }
    },

    getProductById: async (req, res) => {
        try {
            const productId = req.params.id;
            const product = await Product.findById(productId)
                .populate('images')
                .populate('distributor')
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

    /*
     * @returns {Promise} { message }
     * Delete product by user
     * */
    deleteProductByUser: async (req, res) => {
        try {
            const productId = req.params.id;
            const user = req.user._id;

            const product = await Product.findByIdAndDelete(productId).populate(
                'images'
            );

            if (!product) {
                return res.status(404).json({
                    message: 'Product not found',
                });
            }

            if (product.userCreate.toString() !== user.toString()) {
                return res.status(403).json({
                    message: 'Permission denied',
                });
            }

            await imageController.deleteImages(
                product.images.map(image => image._id)
            );

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

    deleteProductByAdmin: async (req, res) => {
        try {
            const productId = req.params.id;

            const product = await Product.findById.populate('images').exec();

            if (!product) {
                return res.status(404).json({
                    message: 'Product not found',
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

    /**
     * @param {Array} products
     * @returns {Promise<void>}
     * @description Add quantity of products
     */
    addQuantity: async products => {
        try {
            for (let i = 0; i < products.length; i++) {
                const product = await Product.findById(
                    products[i]?._id || products[i].product
                );

                if (products[i].quantity < 0) {
                    throw new Error('Invalid quantity');
                }
                product.quantity += products[i].quantity;

                product.status = 'available';

                await product.save();
            }
        } catch (error) {
            throw error;
        }
    },

    /**
     * @param {Array} products
     * @returns {Promise<void>}
     * @description Subtract quantity of products
     */
    subtractQuantity: async products => {
        try {
            for (let i = 0; i < products.length; i++) {
                const product = await Product.findById(
                    products[i]?._id || products[i].product
                );
                if (product.quantity < products[i].quantity) {
                    throw new Error('Not enough quantity');
                }

                product.quantity -= products[i].quantity;

                if (product.quantity === 0) {
                    product.status = 'sold-out';
                }

                await product.save();
            }
        } catch (error) {
            throw error;
        }
    },
};

module.exports = productController;
