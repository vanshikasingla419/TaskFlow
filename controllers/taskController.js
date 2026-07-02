const Task = require('../models/task');
const mongoose = require('mongoose');
async function createTask(req, res) {
    const { title, description, dueDate } = req.body;
    if (!title) {
        return res.status(400).json({ success: false, message: 'Title is required' });
    }
    const newTask = await Task.create({ title, description, dueDate, user: req.user.id });
    return res.status(201).json({ success: true, message: 'Task created successfully', task: newTask });
}
async function getAllTasks(req, res) {
    try {
        const { completed, search, sort, page, limit } = req.query;

        // Create filter object
        const filter = {
            user: req.user.id,
        };

        // Completed filter
        if (completed !== undefined) {
            filter.completed = completed === "true";
        }

        // Search filter
        if (search) {
            filter.$or = [
                {
                    title: {
                        $regex: search,
                        $options: "i",
                    },
                },
                {
                    description: {
                        $regex: search,
                        $options: "i",
                    },
                },
            ];
        }

        // Sorting
        let sortOption = {};

        if (sort === "newest") {
            sortOption.createdAt = -1;
        } else if (sort === "oldest") {
            sortOption.createdAt = 1;
        }

        // Pagination
        const pageNumber = parseInt(page) || 1;
        const limitNumber = parseInt(limit) || 10;
        const skip = (pageNumber - 1) * limitNumber;

        // Final query
        const tasks = await Task.find(filter)
            .sort(sortOption)
            .skip(skip)
            .limit(limitNumber);

        return res.status(200).json({
            success: true,
            message: "Tasks fetched successfully",
            count: tasks.length,
            page: pageNumber,
            limit: limitNumber,
            tasks,
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error fetching tasks",
            error: error.message,
        });
    }
}
async function getTaskById(req, res) {
    try {
        const id = req.params.id;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid Task ID",
            });
        }
        const task = await Task.findOne({
            _id: id,
            user: req.user.id
        });
        if (!task) {
            return res.status(404).json({
                success: false,
                message: "Task not found",
            });
        }
        return res.status(200).json({
            success: true,
            message: "Task fetched successfully",
            task,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error fetching task",
            error: error.message,
        });
    }
}
async function UpdateTask(req, res) {
    try {
        const id = req.params.id;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid Task ID",
            });
        }
        const task = await Task.findOneAndUpdate(
            {
                _id: id,
                user: req.user.id
            },
            req.body,
            {
                new: true,
                runValidators: true
            }
        );
        if (!task) {
            return res.status(404).json({
                success: false,
                message: "Task not found",
            });
        }
        return res.status(200).json({
            success: true,
            message: "Task updated successfully",
            task,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error updating task",
            error: error.message,
        });
    }
}
async function DeleteTask(req, res) {
    try {
        const id = req.params.id;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid Task ID",
            });
        }
        const task = await Task.findOneAndDelete({
            _id: id,
            user: req.user.id
        });
        if (!task) {
            return res.status(404).json({
                success: false,
                message: "Task not found",
            });
        }
        return res.status(200).json({
            success: true,
            message: "Task deleted successfully",
            task,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error deleting task",
            error: error.message,
        });
    }
}
module.exports = {
    createTask,
    getAllTasks,
    getTaskById,
    UpdateTask,
    DeleteTask
};