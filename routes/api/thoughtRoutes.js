const router = require("express").Router();
// import crud op methods from corresponding controller
const {
  getAllThoughts,
  getThoughtById,
  createThought,
  updateThought,
  deleteThought,
  addReaction,
  deleteReaction,
} = require("../../controller/thoughtController");

// setup GET all/POST routes at /api/thoughts
router.route("/").get(getAllThoughts).post(createThought);

// setup GET one/PUT/DELETE routes at /api/thoughts/:id
router
  .route("/:id")
  .get(getThoughtById)
  .put(updateThought)
  .delete(deleteThought);
router.route("/:thoughtId/reactions/:reactionId").delete(deleteReaction);
router.route("/:thoughtId/reactions").post(addReaction);

module.exports = router;