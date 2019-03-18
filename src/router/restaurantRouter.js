const express = require('express');
const controllers = require('../controllers/restaurantControllers');
const router = express.Router();

// /api/restaurant

router.route('/').get(controllers.getMany).post(controllers.createOne);

// /api/restaurant/:id
router.route('/:id').get(controllers.getOne).put(controllers.updateOne).delete(controllers.removeOne);
module.exports = router;
