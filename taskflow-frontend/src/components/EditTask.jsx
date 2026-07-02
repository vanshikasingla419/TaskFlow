import { useState } from "react";
import api from "../services/api";
import "../styles/Modal.css";

function EditTask({ task, closeModal, fetchTasks }) {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [dueDate, setDueDate] = useState(
    task.dueDate ? task.dueDate.split("T")[0] : ""
  );
  const [completed, setCompleted] = useState(task.completed);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      await api.put(
        `/tasks/${task._id}`,
        {
          title,
          description,
          dueDate,
          completed,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      await fetchTasks();
      closeModal();
    } catch (error) {
      console.log(error.response?.data || error.message);
      toast.error("Failed to update task.");
    }
  }

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <h2>Edit Task</h2>

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Title</label>

            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter task title"
              required
            />
          </div>

          <div className="input-group">
            <label>Description</label>

            <textarea
              rows="4"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter description"
            />
          </div>

          <div className="input-group">
            <label>Due Date</label>

            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
          </div>

          <div className="checkbox-group">
            <input
              id="completed"
              type="checkbox"
              checked={completed}
              onChange={(e) => setCompleted(e.target.checked)}
            />

            <label htmlFor="completed">
              Mark as Completed
            </label>
          </div>

          <div className="modal-buttons">
            <button
              type="button"
              className="cancel-btn"
              onClick={closeModal}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="save-btn"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditTask;