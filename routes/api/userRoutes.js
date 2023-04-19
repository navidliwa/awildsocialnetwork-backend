const router = require('express').Router();
const {
  getUsers,
  getSingleUser,
  createUser,
  deleteUser,
} = require('../../controllers/userController');

// /api/user
router.route('/').get(getUsers).post(createUser);

// /api/users/:studentId
router.route('/:userId').get(getSingleUser).delete(deleteUser);

module.exports = router;