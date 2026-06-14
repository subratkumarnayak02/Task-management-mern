import { useState } from "react";
import { taskAPI } from "../services/api";

function TaskCard({ task, onTaskUpdated, onTaskDeleted }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    title: task.title,
    description: task.description,
    priority: task.priority,
    status: task.status,
    dueDate: task.dueDate
      ? new Date(task.dueDate).toISOString().split("T")[0]
      : "",
  });
  const [loading, setLoading] = useState(false);

  // Color coding
  const priorityColors = {
    low: "#28a745",
    medium: "#ffc107",
    high: "#dc3545",
  };

  const statusColors = {
    pending: "#6c757d",
    "in-progress": "#007bff",
    completed: "#28a745",
  };

  // Handle edit input changes
  const handleChange = (e) => {
    setEditData({
      ...editData,
      [e.target.name]: e.target.value,
    });
  };

  // Save updated task
  const handleUpdate = async () => {
    setLoading(true);
    try {
      const response = await taskAPI.updateTask(task._id, editData);
      onTaskUpdated(response.data.task);
      setIsEditing(false);
    } catch (err) {
      console.error("Update failed:", err);
    } finally {
      setLoading(false);
    }
  };

  // Delete task
  const handleDelete = async () => {
    if (!window.confirm("Delete this task?")) return;

    setLoading(true);
    try {
      await taskAPI.deleteTask(task._id);
      onTaskDeleted(task._id);
    } catch (err) {
      console.error("Delete failed:", err);
    } finally {
      setLoading(false);
    }
  };

  // Quick status change (without opening edit mode)
  const handleStatusChange = async (newStatus) => {
    try {
      const response = await taskAPI.updateTask(task._id, {
        ...editData,
        status: newStatus,
      });
      onTaskUpdated(response.data.task);
      setEditData({ ...editData, status: newStatus });
    } catch (err) {
      console.error("Status update failed:", err);
    }
  };

  return (
    <div
      style={{
        backgroundColor: "white",
        border: "1px solid #dee2e6",
        borderRadius: "8px",
        padding: "15px",
        marginBottom: "15px",
        borderLeft: `4px solid ${priorityColors[task.priority]}`,
      }}
    >
      {/* VIEW MODE */}
      {!isEditing ? (
        <>
          {/* Task Header */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              marginBottom: "10px",
            }}
          >
            {/* Title */}
            <h4
              style={{
                margin: 0,
                textDecoration:
                  task.status === "completed" ? "line-through" : "none",
                color: task.status === "completed" ? "#6c757d" : "#212529",
              }}
            >
              {task.title}
            </h4>

            {/* Action Buttons */}
            <div style={{ display: "flex", gap: "8px" }}>
              <button
                onClick={() => setIsEditing(true)}
                style={{
                  padding: "4px 10px",
                  backgroundColor: "#ffc107",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                  fontSize: "12px",
                }}
              >
                Edit
              </button>
              <button
                onClick={handleDelete}
                disabled={loading}
                style={{
                  padding: "4px 10px",
                  backgroundColor: "#dc3545",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                  fontSize: "12px",
                }}
              >
                Delete
              </button>
            </div>
          </div>

          {/* Description */}
          {task.description && (
            <p
              style={{
                margin: "0 0 10px",
                color: "#6c757d",
                fontSize: "14px",
              }}
            >
              {task.description}
            </p>
          )}

          {/* Badges Row */}
          <div
            style={{
              display: "flex",
              gap: "8px",
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            {/* Priority Badge */}
            <span
              style={{
                padding: "3px 8px",
                backgroundColor: priorityColors[task.priority],
                color: "white",
                borderRadius: "12px",
                fontSize: "12px",
              }}
            >
              {task.priority}
            </span>

            {/* Status Badge (clickable!) */}
            <select
              value={task.status}
              onChange={(e) => handleStatusChange(e.target.value)}
              style={{
                padding: "3px 8px",
                backgroundColor: statusColors[task.status],
                color: "white",
                border: "none",
                borderRadius: "12px",
                fontSize: "12px",
                cursor: "pointer",
              }}
            >
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>

            {/* Due Date */}
            {task.dueDate && (
              <span
                style={{
                  fontSize: "12px",
                  color: "#6c757d",
                }}
              >
                📅 Due: {new Date(task.dueDate).toLocaleDateString()}
              </span>
            )}
          </div>
        </>
      ) : (
        /* EDIT MODE */
        <>
          <input
            type="text"
            name="title"
            value={editData.title}
            onChange={handleChange}
            style={{
              width: "100%",
              padding: "8px",
              marginBottom: "10px",
              border: "1px solid #ced4da",
              borderRadius: "4px",
              boxSizing: "border-box",
            }}
          />

          <textarea
            name="description"
            value={editData.description}
            onChange={handleChange}
            rows={2}
            style={{
              width: "100%",
              padding: "8px",
              marginBottom: "10px",
              border: "1px solid #ced4da",
              borderRadius: "4px",
              boxSizing: "border-box",
              resize: "vertical",
            }}
          />

          <div
            style={{
              display: "flex",
              gap: "10px",
              marginBottom: "10px",
            }}
          >
            <select
              name="priority"
              value={editData.priority}
              onChange={handleChange}
              style={{
                flex: 1,
                padding: "8px",
                border: "1px solid #ced4da",
                borderRadius: "4px",
              }}
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>

            <select
              name="status"
              value={editData.status}
              onChange={handleChange}
              style={{
                flex: 1,
                padding: "8px",
                border: "1px solid #ced4da",
                borderRadius: "4px",
              }}
            >
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>

            <input
              type="date"
              name="dueDate"
              value={editData.dueDate}
              onChange={handleChange}
              style={{
                flex: 1,
                padding: "8px",
                border: "1px solid #ced4da",
                borderRadius: "4px",
              }}
            />
          </div>

          {/* Save + Cancel buttons */}
          <div style={{ display: "flex", gap: "8px" }}>
            <button
              onClick={handleUpdate}
              disabled={loading}
              style={{
                padding: "6px 15px",
                backgroundColor: "#28a745",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              {loading ? "Saving..." : "Save"}
            </button>
            <button
              onClick={() => setIsEditing(false)}
              style={{
                padding: "6px 15px",
                backgroundColor: "#6c757d",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              Cancel
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default TaskCard;
