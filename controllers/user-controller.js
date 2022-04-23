const { User } = require("../models");

const userController = {
  getallusers(req, res) {
    User.find({})
    .then(userData => res.json(userData))
    .catch(err => {
        console.log(err);
        res.status(400).json(err);
      });
  },
  newuser({ body }, res) {
      User.create(body)
      .then(userData => res.json(userData))
      .catch(err => res.status(400).json(err));
  }

//   getoneusers(req, res) {
//       User.findOne({})
//       .then
//   }
};


module.exports = userController;