const router = require('express').Router();

const informationController = require('../../controllers/informationController');

router.get('/', informationController.getAll);
router.get('/:id', informationController.get);
router.put('/:id', informationController.update);

module.exports = router;
