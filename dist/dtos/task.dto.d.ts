import { z } from "zod";
export declare const PriorityEnum: z.ZodEnum<{
    LOW: "LOW";
    MEDIUM: "MEDIUM";
    HIGH: "HIGH";
    URGENT: "URGENT";
}>;
export declare const StatusEnum: z.ZodEnum<{
    TODO: "TODO";
    IN_PROGRESS: "IN_PROGRESS";
    REVIEW: "REVIEW";
    COMPLETED: "COMPLETED";
}>;
export declare const CreateTaskDto: z.ZodObject<{
    title: z.ZodString;
    description: z.ZodString;
    dueDate: z.ZodCoercedDate<unknown>;
    priority: z.ZodEnum<{
        LOW: "LOW";
        MEDIUM: "MEDIUM";
        HIGH: "HIGH";
        URGENT: "URGENT";
    }>;
    status: z.ZodOptional<z.ZodEnum<{
        TODO: "TODO";
        IN_PROGRESS: "IN_PROGRESS";
        REVIEW: "REVIEW";
        COMPLETED: "COMPLETED";
    }>>;
    assignedToId: z.ZodOptional<z.ZodNullable<z.ZodString>>;
}, z.core.$strip>;
export declare const UpdateTaskDto: z.ZodObject<{
    title: z.ZodOptional<z.ZodString>;
    description: z.ZodOptional<z.ZodString>;
    dueDate: z.ZodOptional<z.ZodCoercedDate<unknown>>;
    priority: z.ZodOptional<z.ZodEnum<{
        LOW: "LOW";
        MEDIUM: "MEDIUM";
        HIGH: "HIGH";
        URGENT: "URGENT";
    }>>;
    status: z.ZodOptional<z.ZodEnum<{
        TODO: "TODO";
        IN_PROGRESS: "IN_PROGRESS";
        REVIEW: "REVIEW";
        COMPLETED: "COMPLETED";
    }>>;
    assignedToId: z.ZodOptional<z.ZodNullable<z.ZodString>>;
}, z.core.$strip>;
export declare const TaskScopeEnum: z.ZodEnum<{
    all: "all";
    assigned: "assigned";
    unassigned: "unassigned";
    created: "created";
}>;
export declare const TaskFilterDto: z.ZodObject<{
    status: z.ZodOptional<z.ZodEnum<{
        TODO: "TODO";
        IN_PROGRESS: "IN_PROGRESS";
        REVIEW: "REVIEW";
        COMPLETED: "COMPLETED";
    }>>;
    priority: z.ZodOptional<z.ZodEnum<{
        LOW: "LOW";
        MEDIUM: "MEDIUM";
        HIGH: "HIGH";
        URGENT: "URGENT";
    }>>;
    sortByDueDate: z.ZodOptional<z.ZodEnum<{
        asc: "asc";
        desc: "desc";
    }>>;
    scope: z.ZodOptional<z.ZodEnum<{
        all: "all";
        assigned: "assigned";
        unassigned: "unassigned";
        created: "created";
    }>>;
}, z.core.$strip>;
export type CreateTaskInput = z.infer<typeof CreateTaskDto>;
export type UpdateTaskInput = z.infer<typeof UpdateTaskDto>;
export type TaskFilterInput = z.infer<typeof TaskFilterDto>;
//# sourceMappingURL=task.dto.d.ts.map