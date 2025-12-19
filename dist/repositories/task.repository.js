"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskRepository = void 0;
const prisma_1 = require("../lib/prisma");
class TaskRepository {
    create(data, creatorId) {
        return prisma_1.prisma.task.create({
            data: {
                title: data.title,
                description: data.description,
                dueDate: data.dueDate,
                priority: data.priority,
                status: (data.status ?? "TODO"),
                creatorId,
                assignedToId: data.assignedToId ?? null,
            },
            include: {
                creator: { select: { id: true, name: true } },
                assignedTo: { select: { id: true, name: true } },
            },
        });
    }
    findById(id) {
        return prisma_1.prisma.task.findUnique({
            where: { id },
            include: {
                creator: { select: { id: true, name: true } },
                assignedTo: { select: { id: true, name: true } },
            },
        });
    }
    findMany(userId, filters) {
        const where = {};
        if (filters.status)
            where.status = filters.status;
        if (filters.priority)
            where.priority = filters.priority;
        // 🔥 scope support
        if (filters.scope === "assigned") {
            where.assignedToId = userId;
        }
        else if (filters.scope === "unassigned") {
            where.assignedToId = null;
        }
        else if (filters.scope === "created") {
            where.creatorId = userId;
        }
        return prisma_1.prisma.task.findMany({
            where,
            orderBy: {
                dueDate: filters.sortByDueDate ?? "asc",
            },
            include: {
                creator: { select: { id: true, name: true } },
                assignedTo: { select: { id: true, name: true } },
            },
        });
    }
    update(id, data) {
        return prisma_1.prisma.task.update({
            where: { id },
            data: {
                ...(data.title !== undefined ? { title: data.title } : {}),
                ...(data.description !== undefined ? { description: data.description } : {}),
                ...(data.dueDate !== undefined ? { dueDate: data.dueDate } : {}),
                ...(data.priority !== undefined ? { priority: data.priority } : {}),
                ...(data.status !== undefined ? { status: data.status } : {}),
                ...(data.assignedToId !== undefined ? { assignedToId: data.assignedToId } : {}),
            },
            include: {
                creator: { select: { id: true, name: true } },
                assignedTo: { select: { id: true, name: true } },
            },
        });
    }
    delete(id) {
        return prisma_1.prisma.task.delete({ where: { id } });
    }
    findDashboard(userId) {
        const now = new Date();
        const assigned = prisma_1.prisma.task.findMany({
            where: { assignedToId: userId },
            orderBy: { dueDate: "asc" },
            include: {
                creator: { select: { id: true, name: true } },
                assignedTo: { select: { id: true, name: true } },
            },
        });
        const created = prisma_1.prisma.task.findMany({
            where: { creatorId: userId },
            orderBy: { dueDate: "asc" },
            include: {
                creator: { select: { id: true, name: true } },
                assignedTo: { select: { id: true, name: true } },
            },
        });
        const overdue = prisma_1.prisma.task.findMany({
            where: {
                assignedToId: userId,
                dueDate: { lt: now },
                NOT: { status: "COMPLETED" },
            },
            orderBy: { dueDate: "asc" },
            include: {
                creator: { select: { id: true, name: true } },
                assignedTo: { select: { id: true, name: true } },
            },
        });
        return Promise.all([assigned, created, overdue]);
    }
}
exports.TaskRepository = TaskRepository;
//# sourceMappingURL=task.repository.js.map