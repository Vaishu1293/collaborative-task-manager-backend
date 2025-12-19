import { CreateTaskInput, UpdateTaskInput, TaskFilterInput } from "../dtos/task.dto";
export declare class TaskRepository {
    create(data: CreateTaskInput, creatorId: string): any;
    findById(id: string): any;
    findMany(userId: string, filters: TaskFilterInput): any;
    update(id: string, data: UpdateTaskInput): any;
    delete(id: string): any;
    findDashboard(userId: string): Promise<any>;
}
//# sourceMappingURL=task.repository.d.ts.map