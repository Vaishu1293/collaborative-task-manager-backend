"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskFilterDto = exports.TaskScopeEnum = exports.UpdateTaskDto = exports.CreateTaskDto = exports.StatusEnum = exports.PriorityEnum = void 0;
const zod_1 = require("zod");
exports.PriorityEnum = zod_1.z.enum(["LOW", "MEDIUM", "HIGH", "URGENT"]);
exports.StatusEnum = zod_1.z.enum(["TODO", "IN_PROGRESS", "REVIEW", "COMPLETED"]);
exports.CreateTaskDto = zod_1.z.object({
    title: zod_1.z.string().min(1).max(100),
    description: zod_1.z.string().min(1),
    dueDate: zod_1.z.coerce.date(), // accepts string -> Date
    priority: exports.PriorityEnum,
    status: exports.StatusEnum.optional(), // default applied in service/repo
    assignedToId: zod_1.z.string().uuid().nullable().optional(),
});
exports.UpdateTaskDto = zod_1.z.object({
    title: zod_1.z.string().min(1).max(100).optional(),
    description: zod_1.z.string().min(1).optional(),
    dueDate: zod_1.z.coerce.date().optional(),
    priority: exports.PriorityEnum.optional(),
    status: exports.StatusEnum.optional(),
    assignedToId: zod_1.z.string().uuid().nullable().optional(),
});
exports.TaskScopeEnum = zod_1.z.enum(["all", "assigned", "unassigned", "created"]);
exports.TaskFilterDto = zod_1.z.object({
    status: exports.StatusEnum.optional(),
    priority: exports.PriorityEnum.optional(),
    sortByDueDate: zod_1.z.enum(["asc", "desc"]).optional(),
    scope: exports.TaskScopeEnum.optional(), // 🔥 NEW
});
//# sourceMappingURL=task.dto.js.map