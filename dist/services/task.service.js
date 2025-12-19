"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskService = void 0;
const task_repository_1 = require("../repositories/task.repository");
const socket_1 = require("../lib/socket");
class TaskService {
    constructor() {
        this.repo = new task_repository_1.TaskRepository();
    }
    async createTask(data, creatorId) {
        // default status if not provided
        const task = await this.repo.create({
            ...data,
            status: data.status ?? "TODO",
        }, creatorId);
        (0, socket_1.getIO)().to("tasks").emit("task:created", task);
        if (task.assignedToId) {
            (0, socket_1.getIO)().to(task.assignedToId).emit("notification:new", {
                type: "TASK_ASSIGNED",
                message: `You were assigned: ${task.title}`,
                taskId: task.id,
            });
        }
        return task;
    }
    async listTasks(userId, filters) {
        return this.repo.findMany(userId, filters);
    }
    async updateTask(taskId, userId, data) {
        const existing = await this.repo.findById(taskId);
        if (!existing)
            throw new Error("Task not found");
        const isCreator = existing.creatorId === userId;
        const isAssignee = existing.assignedToId === userId;
        if (!isCreator && !isAssignee) {
            throw new Error("Forbidden");
        }
        // Assignee can only update status (optional rule from spec)
        if (!isCreator && isAssignee) {
            const allowed = ["status"];
            const attemptedFields = Object.keys(data);
            const invalid = attemptedFields.some((k) => !allowed.includes(k));
            if (invalid) {
                throw new Error("Assignee can only update task status");
            }
        }
        const prevAssignedToId = existing.assignedToId;
        const updated = await this.repo.update(taskId, data);
        // notify watchers
        (0, socket_1.getIO)().to("tasks").emit("task:updated", updated);
        // if assignee changed, notify new assignee
        if (updated.assignedToId && updated.assignedToId !== prevAssignedToId) {
            (0, socket_1.getIO)().to(updated.assignedToId).emit("notification:new", {
                type: "TASK_ASSIGNED",
                message: `You were assigned: ${updated.title}`,
                taskId: updated.id,
            });
        }
        return updated;
    }
    async deleteTask(taskId, userId) {
        const existing = await this.repo.findById(taskId);
        if (!existing)
            throw new Error("Task not found");
        if (existing.creatorId !== userId) {
            throw new Error("Only creator can delete task");
        }
        await this.repo.delete(taskId);
        (0, socket_1.getIO)().to("tasks").emit("task:deleted", { id: taskId });
        return { id: taskId };
    }
    async getDashboard(userId) {
        const [assigned, created, overdue] = await this.repo.findDashboard(userId);
        return { assigned, created, overdue };
    }
}
exports.TaskService = TaskService;
//# sourceMappingURL=task.service.js.map