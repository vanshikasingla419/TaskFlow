import { useEffect, useState } from "react";
import api from "../services/api";
import "../styles/Dashboard.css";
import TaskCard from "../components/TaskCard";
import AddTask from "../components/AddTask";
import EditTask from "../components/EditTask";

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [loading, setLoading] = useState(true);

  const user = JSON.parse(localStorage.getItem("user")) || {};

  async function fetchTasks() {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const response = await api.get("/tasks", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setTasks(response.data.tasks);
    } catch (error) {
      console.log(error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  }

  function openEdit(task) {
    setSelectedTask(task);
    setShowEditModal(true);
  }

  useEffect(() => {
    fetchTasks();
  }, []);

  const hour = new Date().getHours();

  const greeting =
    hour < 12
      ? "Good Morning"
      : hour < 18
      ? "Good Afternoon"
      : "Good Evening";

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
        <p>Loading Tasks...</p>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <div className="container">

        <div className="dashboard-header">

          <div>
            <h1>
              {greeting}, {user.username} 👋
            </h1>

            <p>Let's make today productive.</p>
          </div>

          <button
            className="add-btn"
            onClick={() => setShowModal(true)}
          >
            + Add Task
          </button>

        </div>

        {showModal && (
          <AddTask
            closeModal={() => setShowModal(false)}
            fetchTasks={fetchTasks}
          />
        )}

        {showEditModal && (
          <EditTask
            task={selectedTask}
            closeModal={() => setShowEditModal(false)}
            fetchTasks={fetchTasks}
          />
        )}

        <div className="tasks-grid">
          {tasks.length === 0 ? (
            <div className="empty-state">
              <h2>📝</h2>

              <h3>No Tasks Yet</h3>

              <p>Create your first task to stay organized.</p>

              <button
                className="add-btn"
                onClick={() => setShowModal(true)}
              >
                + Add Task
              </button>
            </div>
          ) : (
            tasks.map((task) => (
              <TaskCard
                key={task._id}
                task={task}
                fetchTasks={fetchTasks}
                openEdit={openEdit}
              />
            ))
          )}
        </div>

      </div>
    </div>
  );
}

export default Dashboard;