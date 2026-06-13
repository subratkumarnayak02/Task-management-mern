const Task = require("../models/Task");

// ============ CREATE TASK ============
exports.createTask = async (req, res) => {
  try {
    const { title, description, status, priority, dueDate } = req.body;

    // Validate title
    if (!title) {
      return res.status(400).json({
        message: "Task title is required",
      });
    }

    // Create task (createdBy comes from auth middleware)
    const task = await Task.create({
      title,
      description,
      status,
      priority,
      dueDate,
      createdBy: req.userId, // ← Set by authMiddleware!
    });

    res.status(201).json({
      message: "Task created successfully",
      task,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

// ============ GET ALL TASKS ============
exports.getTasks = async (req, res) => {
  try {
    // Only get tasks belonging to logged-in user
    const tasks = await Task.find({
      createdBy: req.userId,
    }).sort({ createdAt: -1 }); // Newest first

    res.json({
      message: "Tasks fetched successfully",
      count: tasks.length,
      tasks,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

// ============ GET SINGLE TASK ============
exports.getTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    // Task not found
    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    // Task belongs to different user
    if (task.createdBy.toString() !== req.userId) {
      return res.status(403).json({
        message: "Not authorized",
      });
    }

    res.json({ task });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

// ============ UPDATE TASK ============
exports.updateTask = async (req, res) => {
  try {
    const { title, description, status, priority, dueDate } = req.body;

    // Find task
    let task = await Task.findById(req.params.id);

    // Task not found
    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    // Check ownership
    if (task.createdBy.toString() !== req.userId) {
      return res.status(403).json({
        message: "Not authorized",
      });
    }

    // Update task
    task = await Task.findByIdAndUpdate(
      req.params.id,
      { title, description, status, priority, dueDate },
      { new: true }, // Return updated task
    );

    res.json({
      message: "Task updated successfully",
      task,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

// ============ DELETE TASK ============
exports.deleteTask = async (req, res) => {
  try {
    // Find task
    const task = await Task.findById(req.params.id);

    // Task not found
    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    // Check ownership
    if (task.createdBy.toString() !== req.userId) {
      return res.status(403).json({
        message: "Not authorized",
      });
    }

    // Delete task
    await Task.findByIdAndDelete(req.params.id);

    res.json({
      message: "Task deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};
