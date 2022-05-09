const { User } = require("../models");

const userController = {
  getallusers(req, res) {
    User.find({})
    .populate({
      path: 'friends',
      select: '-__v'
    })
    .select('-__v')
    .sort({ _id: -1 })
      .then((userData) => res.json(userData))
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },
  newuser({ body }, res) {
    User.create(body)
      .then((userData) => res.json(userData))
      .catch((err) => res.status(400).json(err));
  },

  getoneuser({ params }, res) {
    User.findOne({ _id: params.userId })
    .populate({
      path: 'friends',
      select: '-__v'
    })
    .select('-__v')
      .then((userData) => {
        if (!userData) {
          res.status(404).json({ message: "No user found with this id!" });
          return;
        }
        res.json(userData);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  updateuser({ params, body }, res) {
    User.findOneAndUpdate({ _id: params.userId }, body, {
      new: true,
      runValidators: true,
    })
    .then(userData => {
        if (!userData) {
          res.status(404).json({ message: 'No user found with this id!' });
          return;
        }
        res.json(userData);
      })
      .catch(err => res.status(400).json(err));
  },

  deleteuser({ params }, res) {
      User.findByIdAndDelete({ _id: params.userId })
      .then(userData => {
        if (!userData) {
          res.status(404).json({ message: 'No user found with this id!' });
          return;
        }
        res.json(userData);
      })
      .catch(err => res.status(400).json(err));
  },

  newfriend({ params}, res) {
      User.findOneAndUpdate(
        { _id: params.userId },
        {$addToSet: {friends: params.friendId}},
        {new: true, runValidators: true}
        )
        .then(userData => {
            if (!userData) {
              res.status(404).json({ message: 'No user found with this id!' });
              return;
            }
            res.json(userData);
          })
          .catch(err => res.json(err));
  },

  deletefriend({ params}, res) {
    User.findOneAndUpdate(
      { _id: params.userId },
      {$pull:{friends: params.friendId}},
      {new: true}
      )
      .then(userData => {
        if (!userData) {
          res.status(404).json({ message: 'No friend found with this id!' });
          return;
        }
        res.json(userData);
      })
      .catch(err => res.json(err));
  }
};

module.exports = userController;
