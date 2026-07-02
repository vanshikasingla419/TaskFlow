import api from "../services/api";
import "../styles/TaskCard.css";

function TaskCard({ task, fetchTasks, openEdit }) {
  async function handleDelete() {
    try {
      const token = localStorage.getItem("token");

      await api.delete(`/tasks/${task._id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      fetchTasks();
    } catch (error) {
      console.log(error.response?.data || error.message);
    }
  }

  return (
    <div className="task-card">
      <div className="task-header">
        <h3>{task.title}</h3>

        <span
          className={`status ${
            task.completed ? "completed" : "pending"
          }`}
        >
          {task.completed ? "Completed" : "Pending"}
        </span>
      </div>

      {task.description && (
        <p className="task-description">
          {task.description}
        </p>
      )}

      {task.dueDate && (
        <p className="task-date">
          📅 Due: {new Date(task.dueDate).toLocaleDateString()}
        </p>
      )}

      <div className="task-actions">
        <button
          className="edit-btn"
          onClick={() => openEdit(task)}
        >
          ✏ Edit
        </button>

        <button
          className="delete-btn"
          onClick={handleDelete}
        >
          🗑 Delete
        </button>
      </div>
    </div>
  );
}

export default TaskCard;