"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskController = void 0;
const task_service_1 = require("../services/task.service");
const task_dto_1 = require("../dtos/task.dto");
const service = new task_service_1.TaskService();
class TaskController {
    async create(req, res) {
        try {
            const parsed = task_dto_1.CreateTaskDto.parse(req.body);
            const task = await service.createTask(parsed, req.user.id);
            return res.status(201).json(task);
        }
        catch (err) {
            return res.status(400).json({ message: err.message });
        }
    }
    async list(req, res) {
        try {
            const parsed = task_dto_1.TaskFilterDto.parse(req.query);
            const tasks = await service.listTasks(req.user.id, parsed);
            return res.json(tasks);
        }
        catch (err) {
            return res.status(400).json({ message: err.message });
        }
    }
    async update(req, res) {
        try {
            const taskId = req.params.id;
            const parsed = task_dto_1.UpdateTaskDto.parse(req.body);
            const task = await service.updateTask(taskId, req.user.id, parsed);
            return res.json(task);
        }
        catch (err) {
            const msg = err.message || "Error";
            const code = msg.includes("Forbidden") ? 403 :
                msg.includes("not found") ? 404 :
                    400;
            return res.status(code).json({ message: msg });
        }
    }
    async remove(req, res) {
        try {
            const taskId = req.params.id;
            await service.deleteTask(taskId, req.user.id);
            return res.status(204).send();
        }
        catch (err) {
            const msg = err.message || "Error";
            const code = msg.includes("not found") ? 404 :
                msg.includes("Only creator") ? 403 :
                    400;
            return res.status(code).json({ message: msg });
        }
    }
    async dashboard(req, res) {
        try {
            const data = await service.getDashboard(req.user.id);
            return res.json(data);
        }
        catch {
            return res.status(500).json({ message: "Failed to load dashboard" });
        }
    }
}
exports.TaskController = TaskController;
//# sourceMappingURL=task.controller.js.map