const router = require('express').Router();

const {
    getLocations,
    createTest,
    getNear,
} = require('../../controllers/locationController');

router.get('/', getLocations);
router.post('/create', createTest);
router.get('/near', getNear);

module.exports = router;
