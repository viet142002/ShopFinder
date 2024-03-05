const router = require('express').Router();

const warehouseReceiptController = require('../../controllers/warehouseReceiptController');

router.post('/', warehouseReceiptController.createWarehouseReceipt);
router.get('/', warehouseReceiptController.getWarehouseReceipts);
router.get('/:id', warehouseReceiptController.getWarehouseReceipt);

module.exports = router;
