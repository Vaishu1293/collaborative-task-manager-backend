import { TaskRepository } from "../repositories/task.repository";
import { CreateTaskInput, UpdateTaskInput, TaskFilterInput } from "../dtos/task.dto";
import { getIO } from "../lib/socket";

export class TaskService {
  private repo = new TaskRepository();

  async createTask(data: CreateTaskInput, creatorId: string) {
    // default status if not provided
    const task = await this.repo.create(
      {
        ...data,
        status: data.status ?? "TODO",
      },
      creatorId
    );

    getIO().to("tasks").emit("task:created", task);

    if (task.assignedToId) {
      getIO().to(task.assignedToId).emit("notification:new", {
        type: "TASK_ASSIGNED",
        message: `You were assigned: ${task.title}`,
        taskId: task.id,
      });
    }

    return task;
  }

  async listTasks(userId: string, filters: TaskFilterInput) {
    return this.repo.findMany(userId, filters);
  }

  async updateTask(taskId: string, userId: string, data: UpdateTaskInput) {
    const existing = await this.repo.findById(taskId);
    if (!existing) throw new Error("Task not found");

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
    getIO().to("tasks").emit("task:updated", updated);

    // if assignee changed, notify new assignee
    if (updated.assignedToId && updated.assignedToId !== prevAssignedToId) {
      getIO().to(updated.assignedToId).emit("notification:new", {
        type: "TASK_ASSIGNED",
        message: `You were assigned: ${updated.title}`,
        taskId: updated.id,
      });
    }

    return updated;
  }

  async deleteTask(taskId: string, userId: string) {
    const existing = await this.repo.findById(taskId);
    if (!existing) throw new Error("Task not found");

    if (existing.creatorId !== userId) {
      throw new Error("Only creator can delete task");
    }

    await this.repo.delete(taskId);

    getIO().to("tasks").emit("task:deleted", { id: taskId });

    return { id: taskId };
  }

  async getDashboard(userId: string) {
    const [assigned, created, overdue] = await this.repo.findDashboard(userId);
    return { assigned, created, overdue };
  }
}
