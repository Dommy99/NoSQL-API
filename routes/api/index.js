const router = require('express').Router();
const userRouter = require('./users');
const thoughtRouter = require('./thoughts');

router.use('/user', userRouter);
router.use('/thought', thoughtRouter);

module.exports = router;