const { Thought, User } = require('../models');

module.exports = {
    // Retrieves all Thoughts
    async getThoughts(req, res) {
        try {
            const thoughts = await Thought.find();
            res.json(thoughts);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },

    // Retrieves a single thought
    async getSingleThought(req, res) {
        try {
            const thought = await Thought.findOne({ _id: req.params.thoughtId })
                .select('-__v');
            if (!thought) {
                return res.status(404).json({ message: 'No Thought with that ID!' })
            }
            res.json(thought);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },

    // Posts a new thought
    async createThought(req, res) {
        try {
            const thought = await Thought.create(req.body);
            const thoughtUser = await User.findOneAndUpdate(
                {
                    _id: req.body.userId,
                    thoughts: { $ne: thought._id },
                },
                {
                    $push: { thoughts: thought._id }
                },
                {
                    new: true,
                    unique: true,
                }
            )
            res.json(thought);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    // Updates an existing thought
    async updateThought(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $set: req.body },
                { new: true }
            );

            if (!thought) {
                res.status(404).json({ message: 'No Thought with this id!' });
            }

            res.json(thought);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    // Deletes an existing thought
    async deleteThought(req, res) {
        try {
            const thought = await Thought.findOneAndRemove({ _id: req.params.thoughtId });

            if (!thought) {
                return res.status(404).json({ message: 'No such thought exists!' });
            }

            res.json({ message: 'Thought succesfully deleted' });
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    // Adds reaction to existing thought
    async addReaction(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $addToSet: { reactions: req.body } },
                { runValidators: true, new: true }
            );

            res.json({ message: `Added reaction: ${thought}`})
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    // Removes reaction from existing thought
    async deleteReaction(req, res) {
        try {
                await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $pull: { reactions: req.body } },
                { runValidators: true, new: true }
            );

            res.json({ message: `Deleted reaction`})
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
}
