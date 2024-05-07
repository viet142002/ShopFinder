const router = require("express").Router();

const { authorization } = require("../../middlewares/authMiddlewares");
const upload = require("../../../configs/multer");
const InformationController = require("../../controllers/informationController");

router.post(
	"/share-store",
	upload.array("images", 10),
	authorization,
	InformationController.create
);
router.put(
	"/update-store/:id",
	upload.array("images", 10),
	authorization,
	InformationController.update
);
router.get("/store/:id", InformationController.get);
router.get("/stores", InformationController.getAll);

module.exports = router;
