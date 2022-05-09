const router = require('express').Router();

const {
    getAllThoughts,
    newThought,
    getOneThought,
    updateThought,
    deleteThought,
    newReaction,
    deleteReaction

} = require('../../controllers/thought-controller');


// api/thoughts
router
.route('/')
.get(getAllThoughts)
.post(newThought)


// /api/thoughts/:thoughtId
router
.route('/:thoughtId')
.get(getOneThought)
.put(updateThought)
.delete(deleteThought);

// /api/thoughts/:thoughtId/reactions/
router
.route('/:thoughtId/reactions/')
.post(newReaction)

// /api/thoughts/:thoughtId/reactions/:reactionId
router
.route('/:thoughtId/reactions/:reactionId')
.delete(deleteReaction);

module.exports = router;

