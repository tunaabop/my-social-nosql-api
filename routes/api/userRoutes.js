const router = require("express").Router();

// import user crud ops from corresponding controller
const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  deleteFriend,
} = require("../../controller/userController");

// setup POST/GET all users @ /api/users
router.route("/").get(getAllUsers).post(createUser);
// setup GET one user/PUT/DELETE @ /api/users/:id
router.route("/:id").get(getUserById).put(updateUser).delete(deleteUser);
// add/delete a friend @ /api/users/:id/friends/:friendsid
router.route("/:id/friends/:friendsId").post(addFriend).delete(deleteFriend);

module.exports = router;