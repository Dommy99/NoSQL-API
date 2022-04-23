const router = require('express').Router();

const {
    

} = require('../../controllers/user-controller');



// api/users
router
.route('/')
.get()
.post()
.put()
.delete();

// /api/users/:userId/friends/:friendId

router
.route('/:userId/friends/:friendId')
.post()
.delete();

module.exports = router;