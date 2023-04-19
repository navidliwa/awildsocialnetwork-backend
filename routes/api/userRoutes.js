const router = require('express').Router();
const {
  getUsers,
  getSingleUser,
  updateUser,
  createUser,
  deleteUser,
} = require('../../controllers/userController');

// /api/user
router.route('/')
.get(getUsers)
.post(createUser);

// /api/users/:studentId
router.route('/:userId')
.get(getSingleUser)
.put(updateUser)
.delete(deleteUser);

module.exports = router;