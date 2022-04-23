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



// api/user
router
.route('/')
.get(getallusers)
.post(newuser)


// api/user/:userId
router
.route('/:userId')
.get(getoneuser)
.put(updateuser)
.delete(deleteuser);

// /api/user/:userId/friends/:friendId
router
.route('/:userId/friends/:friendId')
.post(newfriend)
.delete(deletefriend);

module.exports = router;

// 62642ab59351bec30a30a062 62642aca9351bec30a30a064 62642ad09351bec30a30a066