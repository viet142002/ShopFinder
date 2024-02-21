const router = require('express').Router();

const warehouseReceiptController = require('../../controllers/warehouseReceiptController');

router.post(
    '/warehouse-receipts',
    warehouseReceiptController.createWarehouseReceipt
);
router.get(
    '/warehouse-receipts',
    warehouseReceiptController.getWarehouseReceipts
);
router.get(
    '/warehouse-receipts/:id',
    warehouseReceiptController.getWarehouseReceipt
);
router.patch(
    '/warehouse-receipts/:id',
    warehouseReceiptController.updateWarehouseReceipt
);
router.delete(
    '/warehouse-receipts/:id',
    warehouseReceiptController.deleteWarehouseReceipt
);

module.exports = router;
