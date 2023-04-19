const { ObjectId } = require('mongoose').Types;
const { User, Thought, Reaction } = require('../models');

// const userThoughts = async (userId) =>
//   User.get([
//     // only include the given student by using $match
//     { $match: { _id: new ObjectId(userId) } },
//     {
//       $unwind: '$thoughts',
//     },
//     {
//       $group: {
//         _id: new ObjectId(userId),
//         overallGrade: { $avg: '$assignments.score' },
//       },
//     },
//   ]);

module.exports = {
    // Retrieves all Users
    async getUsers(req, res) {
      try {
        const users = await User.find();
        res.json(users);
      } catch (err) {
        console.log(err);
        return res.status(500).json(err);
      }
    },

    // Retrieves a single user along with their posted thoughts and their friend list
    async getSingleUser(req, res) {
        try {
          const user = await User.findOne({ _id: req.params.userId })
            .select('-__v')
            .populate('thoughts')
            .populate('friends');
          if (!user) {
            return res.status(404).json({ message: 'No student with that ID' })
          }
    
          res.json(user);
        } catch (err) {
          console.log(err);
          return res.status(500).json(err);
        }
      },

      // Posts a new User
      async createUser(req, res) {
        try {
          const user = await User.create(req.body);
          res.json(user);
        } catch (err) {
          res.status(500).json(err);
        }
      },

      // Updates a User
      async updateUser(req, res) {
        try {
          const user = await User.findOneAndUpdate(
            { _id: req.params.userId },
            { $set: req.body },
            { runValidators: true, new: true }
          );
    
          if (!user) {
            res.status(404).json({ message: 'No user with this id!' });
          }
    
          res.json(user);
        } catch (err) {
          res.status(500).json(err);
        }
      },

      // Delete a User
      async deleteUser(req, res) {
        try {
          const user = await User.findOneAndRemove({ _id: req.params.userId });
    
          if (!user) {
            return res.status(404).json({ message: 'No such user exists' });
          }
    
          res.json({ message: 'User successfully deleted' });
        } catch (err) {
          console.log(err);
          res.status(500).json(err);
        }
      },
}