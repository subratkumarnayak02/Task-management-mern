const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const {
  createTask,
  getTasks,
  getTask,
  updateTask,
  deleteTask,
} = require("../controllers/taskController");

// All routes require authentication
router.use(protect); // ← Protects ALL routes below!

// Task CRUD routes
router.post("/", createTask); // POST   /api/tasks
router.get("/", getTasks); // GET    /api/tasks
router.get("/:id", getTask); // GET    /api/tasks/:id
router.put("/:id", updateTask); // PUT    /api/tasks/:id
router.delete("/:id", deleteTask); // DELETE /api/tasks/:id

module.exports = router;
