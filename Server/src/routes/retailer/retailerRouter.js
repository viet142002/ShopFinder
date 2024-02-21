const router = require('express').Router();

const retailerController = require('../../controllers/retailerController');
const { authorization } = require('../../middlewares/authMiddlewares');

router.post('/register', authorization, retailerController.register);
router.get('/infoMyRetailer', authorization, retailerController.infoMyRetailer);

module.exports = router;
