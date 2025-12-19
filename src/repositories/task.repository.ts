import { prisma } from "../lib/prisma";
import { CreateTaskInput, UpdateTaskInput, TaskFilterInput } from "../dtos/task.dto";

export class TaskRepository {
  create(data: CreateTaskInput, creatorId: string) {
    return prisma.task.create({
      data: {
        title: data.title,
        description: data.description,
        dueDate: data.dueDate,
        priority: data.priority,
        status: (data.status ?? "TODO") as any,
        creatorId,
        assignedToId: data.assignedToId ?? null,
      },
      include: {
        creator: { select: { id: true, name: true } },
        assignedTo: { select: { id: true, name: true } },
      },
    });
  }

  findById(id: string) {
    return prisma.task.findUnique({
      where: { id },
      include: {
        creator: { select: { id: true, name: true } },
        assignedTo: { select: { id: true, name: true } },
      },
    });
  }

  findMany(userId: string, filters: TaskFilterInput) {
    const where: any = {};

    if (filters.status) where.status = filters.status;
    if (filters.priority) where.priority = filters.priority;

    // 🔥 scope support
    if (filters.scope === "assigned") {
      where.assignedToId = userId;
    } else if (filters.scope === "unassigned") {
      where.assignedToId = null;
    } else if (filters.scope === "created") {
      where.creatorId = userId;
    }

    return prisma.task.findMany({
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

  update(id: string, data: UpdateTaskInput) {
    return prisma.task.update({
      where: { id },
      data: {
        ...(data.title !== undefined ? { title: data.title } : {}),
        ...(data.description !== undefined ? { description: data.description } : {}),
        ...(data.dueDate !== undefined ? { dueDate: data.dueDate } : {}),
        ...(data.priority !== undefined ? { priority: data.priority as any } : {}),
        ...(data.status !== undefined ? { status: data.status as any } : {}),
        ...(data.assignedToId !== undefined ? { assignedToId: data.assignedToId } : {}),
      },
      include: {
        creator: { select: { id: true, name: true } },
        assignedTo: { select: { id: true, name: true } },
      },
    });
  }

  delete(id: string) {
    return prisma.task.delete({ where: { id } });
  }

  findDashboard(userId: string) {
    const now = new Date();

    const assigned = prisma.task.findMany({
      where: { assignedToId: userId },
      orderBy: { dueDate: "asc" },
      include: {
        creator: { select: { id: true, name: true } },
        assignedTo: { select: { id: true, name: true } },
      },
    });

    const created = prisma.task.findMany({
      where: { creatorId: userId },
      orderBy: { dueDate: "asc" },
      include: {
        creator: { select: { id: true, name: true } },
        assignedTo: { select: { id: true, name: true } },
      },
    });

    const overdue = prisma.task.findMany({
      where: {
        assignedToId: userId,
        dueDate: { lt: now },
        NOT: { status: "COMPLETED" as any },
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
