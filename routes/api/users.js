const router = require('express').Router();

const {
   getallusers,
   getoneusers,
   newuser

} = require('../../controllers/user-controller');



// api/user
router
.route('/')
.get(getallusers)
.post(newuser)


// api/user/:userId
router
// .get(getoneusers)
// .put()
// .delete();

// /api/user/:userId/friends/:friendId

router
// .route('/:userId/friends/:friendId')
// .post()
// .delete();

module.exports = router;