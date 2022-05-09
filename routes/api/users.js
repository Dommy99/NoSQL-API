const router = require('express').Router();

const {
   getallusers,
   getoneuser,
   newuser,
   updateuser,
   deleteuser,
   newfriend,
   deletefriend,

} = require('../../controllers/user-controller');



// api/users
router
.route('/')
.get(getallusers)
.post(newuser)


// api/users/:userId
router
.route('/:userId')
.get(getoneuser)
.put(updateuser)
.delete(deleteuser);

// /api/users/:userId/friends/:friendId
router
.route('/:userId/friends/:friendId')
.post(newfriend)
.delete(deletefriend);

module.exports = router;

