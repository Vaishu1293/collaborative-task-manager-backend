import { CreateTaskInput, UpdateTaskInput, TaskFilterInput } from "../dtos/task.dto";
export declare class TaskService {
    private repo;
    createTask(data: CreateTaskInput, creatorId: string): Promise<any>;
    listTasks(userId: string, filters: TaskFilterInput): Promise<any>;
    updateTask(taskId: string, userId: string, data: UpdateTaskInput): Promise<any>;
    deleteTask(taskId: string, userId: string): Promise<{
        id: string;
    }>;
    getDashboard(userId: string): Promise<{
        assigned: any;
        created: any;
        overdue: any;
    }>;
}
//# sourceMappingURL=task.service.d.ts.map