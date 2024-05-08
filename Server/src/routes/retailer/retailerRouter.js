const router = require("express").Router();

const upload = require("../../../configs/multer");

const retailerController = require("../../controllers/retailerController");
const { authentication } = require("../../middlewares/authMiddlewares");

router.post(
	"/register",
	upload.array("images", 10),
	retailerController.register
);
router.put(
	"/update-retailer",
	authentication("retailer"),
	upload.array("images", 10),
	retailerController.update
);
router.get(
	"/infoMyRetailer",
	authentication("retailer"),
	retailerController.infoMyRetailer
);

module.exports = router;
