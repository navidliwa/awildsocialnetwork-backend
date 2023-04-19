const { Schema, model } = require('mongoose');
const reactionSchema = require('./reaction');

const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            maxLength: 280
        },
        date: {
            type: Date,
            defautl: Date.now
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
        },
        id: false
    }
);

thoughtSchema
    .virtual('reactionCount')
    .get(function () {
        return `${this.reactions}`
    });

const Thought = model('thought', thoughtSchema);

module.exports = Thought;