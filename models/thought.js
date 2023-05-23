const { Schema, model } = require('mongoose');
const reactionSchema = require('./reaction');
const dateformat = require('../utils/dateformat');

const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            maxLength: 280
        },
        date: {
            type: Date,
            default: Date.now,
            get: (timestamp) => dateformat(timestamp)
        },
        username: {
            type: String,
            required: true
        },
        reactions: [
            reactionSchema
        ],
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }
);



thoughtSchema
    .virtual('reactionCount')
    .get(function () {
        return this.reactions.length
    });

const Thought = model('thought', thoughtSchema);

module.exports = Thought;