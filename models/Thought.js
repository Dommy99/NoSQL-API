const {Schema, model} = require('mongoose');
const reactionSchema = require('./Reaction');

const ThoughtSchema = new Schema(
    {
      // set custom id to avoid confusion with parent comment _id
      thoughtText: {
        type: String,
        Required: true,
      // Must be between 1 and 280 characters
      },
      createdAt: {
        type: Date,
        default: Date.now,
        get: createdAtVal => dateFormat(createdAtVal)
      },
      username: {
        type: String,
        Required: true,
      },
      reactions: [reactionSchema]
    },
    {
        toJSON: {
          virtuals: true,
          getters: true
        },
      }
  );

  ThoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
  });

  const Thought = model('thought', ThoughtSchema)

  module.exports = Thought;