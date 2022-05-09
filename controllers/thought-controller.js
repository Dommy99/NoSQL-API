const {Thought, User} = require("../models");

const thoughtController = {
    getAllThoughts(req, res) {
        Thought.find({})
        
        .select('-__v')
        .then((userData) => res.json(userData))
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
    },

    newThought ({ body }, res) {
    Thought.create(body)
.then ((thoughtData) => 
    
    User.findOneAndUpdate(
        {_id: body.userId},
        {$addToSet: {thoughts: thoughtData._id}},
        {new: true, runValidators: true})
        .populate([{
          path: 'thoughts',
          select: '-__v'
        }, 
        {
          path: 'friends',
          select: '-__v'
        }
      ])
        .select('-__v')
        .then((userData) => res.json({thoughtData, userData}))
)
    .catch((err) =>{ 
        console.error(err);
        res.status(400).json(err)
        
    });
},

    getOneThought({ params }, res) {
        Thought.findOne({ id: params._id })
        .select('-__v')
          .then((thoughtData) => {
            if (!thoughtData) {
              res.status(404).json({ message: "No thought found with this id!" });
              return;
            }
            res.json(thoughtData);
          })
          .catch((err) => {
            console.log(err);
            res.status(400).json(err);
          });
      },

      updateThought({ params, body }, res) {
        Thought.findOneAndUpdate({ id: params._id }, body, {
          new: true,
          runValidators: true,
        })
        .select('-__v')
        .then(thoughtData => {
            if (!thoughtData) {
              res.status(404).json({ message: 'No thought found with this id!' });
              return;
            }
            res.json(thoughtData);
          })
          .catch(err => res.status(400).json(err));
      },

      deleteThought({ params }, res) {
        Thought.findByIdAndDelete({ _id: params.thoughtId })
        .then(thoughtData => {
          if (!thoughtData) {
            res.status(404).json({ message: 'No thought found with this id!' });
            return;
          }
          res.json(thoughtData);
        })
        .catch(err => res.status(400).json(err));
    },

    newReaction({ params, body }, res) {   
      Thought.findOneAndUpdate(
          {_id: params.thoughtId},
          {$push: {reactions: body}},
          {new: true, runValidators: true})
          .then((userData) => res.json({ userData }))
  
      .catch((err) =>{ 
          console.error(err);
          res.status(400).json(err)
          
      });
  },

    deleteReaction({ params}, res) {
      Thought.findOneAndUpdate(
        {_id: params.thoughtId},
        {$pull: {reactions: {reactionId: params.reactionId}}},
        {new: true, runValidators: true})
        .then(userData => {
          if (!userData) {
            res.status(404).json({ message: 'No reaction found with this id!' });
            return;
          }
          res.json(userData);
        })

    .catch((err) =>{ 
        console.error(err);
        res.status(400).json(err)
        
    });
    }

}

module.exports = thoughtController;

