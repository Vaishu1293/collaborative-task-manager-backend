import { z } from "zod";

export const PriorityEnum = z.enum(["LOW", "MEDIUM", "HIGH", "URGENT"]);
export const StatusEnum = z.enum(["TODO", "IN_PROGRESS", "REVIEW", "COMPLETED"]);

export const CreateTaskDto = z.object({
  title: z.string().min(1).max(100),
  description: z.string().min(1),
  dueDate: z.coerce.date(), // accepts string -> Date
  priority: PriorityEnum,
  status: StatusEnum.optional(), // default applied in service/repo
  assignedToId: z.string().uuid().nullable().optional(),
});

export const UpdateTaskDto = z.object({
  title: z.string().min(1).max(100).optional(),
  description: z.string().min(1).optional(),
  dueDate: z.coerce.date().optional(),
  priority: PriorityEnum.optional(),
  status: StatusEnum.optional(),
  assignedToId: z.string().uuid().nullable().optional(),
});

export const TaskScopeEnum = z.enum(["all", "assigned", "unassigned", "created"]);

export const TaskFilterDto = z.object({
  status: StatusEnum.optional(),
  priority: PriorityEnum.optional(),
  sortByDueDate: z.enum(["asc", "desc"]).optional(),
  scope: TaskScopeEnum.optional(), // 🔥 NEW
});

export type CreateTaskInput = z.infer<typeof CreateTaskDto>;
export type UpdateTaskInput = z.infer<typeof UpdateTaskDto>;
export type TaskFilterInput = z.infer<typeof TaskFilterDto>;
