const router = require("express").Router();

const productController = require("../../controllers/productController");
const upload = require("../../../configs/multer");

router.post("/", upload.array("images", 10), productController.createProduct);

router.put("/:id", upload.array("images", 10), productController.updateProduct);

router.delete("/:id", productController.deleteProduct);

module.exports = router;
