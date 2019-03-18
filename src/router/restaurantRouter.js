const express = require('express');
const controllers = require('../controllers/restaurantControllers');
const router = express.Router();

/* /api/restaurant
    GET:  Read all restaurants
    POST: Create one restaurant 
*/
router.route('/').get(controllers.getMany).post(controllers.createOne);

/* /api/restaurant/:id
    GET: Read one restaurant
    PUT: Update one restaurant
    DELETE: delete one restaurant
    
*/
router.route('/:id').get(controllers.getOne).put(controllers.updateOne).delete(controllers.removeOne);
module.exports = router;
