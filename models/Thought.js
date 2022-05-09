const {Schema, model} = require('mongoose');
const reactionSchema = require('./Reaction');
const dateFormat = require('../utils/dateFormat');

const ThoughtSchema = new Schema(
    {
      // set custom id to avoid confusion with parent comment _id
      thoughtText: {
        type: String,
        Required: true,
        minLength: [1, 'make it longer foo'],
        maxLength: [280, 'make it longer foo']
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