import { Response } from "express";
import { TaskService } from "../services/task.service";
import { CreateTaskDto, UpdateTaskDto, TaskFilterDto } from "../dtos/task.dto";
import { AuthRequest } from "../middlewares/auth.middleware";

const service = new TaskService();

export class TaskController {
  async create(req: AuthRequest, res: Response) {
    try {
      const parsed = CreateTaskDto.parse(req.body);
      const task = await service.createTask(parsed, (req as any).user.id);
      return res.status(201).json(task);
    } catch (err: any) {
      return res.status(400).json({ message: err.message });
    }
  }

  async list(req: AuthRequest, res: Response) {
    try {
      const parsed = TaskFilterDto.parse(req.query);
      const tasks = await service.listTasks((req as any).user.id, parsed);
      return res.json(tasks);
    } catch (err: any) {
      return res.status(400).json({ message: err.message });
    }
  }

  async update(req: AuthRequest, res: Response) {
    try {
      const taskId = req.params.id;
      const parsed = UpdateTaskDto.parse(req.body);
      const task = await service.updateTask(taskId as any,(req as any).user.id, parsed);
      return res.json(task);
    } catch (err: any) {
      const msg = err.message || "Error";
      const code =
        msg.includes("Forbidden") ? 403 :
        msg.includes("not found") ? 404 :
        400;
      return res.status(code).json({ message: msg });
    }
  }

  async remove(req: AuthRequest, res: Response) {
    try {
      const taskId = req.params.id;
      await service.deleteTask(taskId as any, (req as any).user.id);
      return res.status(204).send();
    } catch (err: any) {
      const msg = err.message || "Error";
      const code =
        msg.includes("not found") ? 404 :
        msg.includes("Only creator") ? 403 :
        400;
      return res.status(code).json({ message: msg });
    }
  }

  async dashboard(req: AuthRequest, res: Response) {
    try {
      const data = await service.getDashboard((req as any).user.id);
      return res.json(data);
    } catch {
      return res.status(500).json({ message: "Failed to load dashboard" });
    }
  }
}
