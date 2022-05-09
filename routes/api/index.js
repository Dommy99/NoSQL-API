const router = require('express').Router();
const userRouter = require('./users');
const thoughtRouter = require('./thoughts');

router.use('/users', userRouter);
router.use('/thoughts', thoughtRouter);

module.exports = router;