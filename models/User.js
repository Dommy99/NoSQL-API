const {Schema, model} = require('mongoose');
const thoughtSchema = require('./Thought');

const UserSchema = new Schema(
    {
      // set custom id to avoid confusion with parent comment _id
      username: {
        type: String,
        unique: true,
        Required: true,
        Trim: true
      },
      email: {
        type: String,
        required: true,
        Unique: true,
        match: [/.+@.+\..+/]
      },
      thoughts: [thoughtSchema],
      friends: [User]
    },
    {
        toJSON: {
          virtuals: true,
        },
      }
    
  );

  UserSchema.virtual('friendCount').get(function() {
    return this.friends.length;
  });

  const User = model('User', UserSchema);

  module.exports = User