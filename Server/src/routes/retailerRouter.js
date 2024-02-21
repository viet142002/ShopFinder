const router = require('express').Router();

const retailerController = require('../controllers/retailerController');
const authMiddlewares = require('../middlewares/authMiddlewares');

router.post(
    '/register',
    authMiddlewares.authorization,
    retailerController.register
);
router.get(
    '/infoMyRetailer',
    authMiddlewares.authorization,
    retailerController.infoMyRetailer
);
router.get(
    '/requests',
    authMiddlewares.authentication('admin'),
    retailerController.getRequestsRetailer
);
router.put(
    '/acceptRequest/:id',
    authMiddlewares.authentication('admin'),
    retailerController.acceptRequestRetailer
);
router.put(
    '/rejectRequest/:id',
    authMiddlewares.authentication('admin'),
    retailerController.rejectRequestRetailer
);

module.exports = router;
