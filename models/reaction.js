const { Types, Schema, model } = require('mongoose');
const { dateformat } = require('../utils/dateformat');

const reactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
          },
        reactionBody: {
            type: String,
            required: true,
            maxLength: 280
        },
        username: {
            type: String,
            required: true
        },
        date: {
            type: Date,
            default: Date.now,
            get: (timestamp) => {dateformat(timestamp)}
        }
    },
    {
        toJSON: {
            getters: true
        },
        id: false
    }
);