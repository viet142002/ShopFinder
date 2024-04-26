const router = require('express').Router();

const storeController = require('../../controllers/storeController');

router.get('/:storeId', storeController.getStore);

module.exports = router;
