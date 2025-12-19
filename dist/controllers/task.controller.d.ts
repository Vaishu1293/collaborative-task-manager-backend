import { Response } from "express";
import { AuthRequest } from "../middlewares/auth.middleware";
export declare class TaskController {
    create(req: AuthRequest, res: Response): Promise<Response<any, Record<string, any>>>;
    list(req: AuthRequest, res: Response): Promise<Response<any, Record<string, any>>>;
    update(req: AuthRequest, res: Response): Promise<Response<any, Record<string, any>>>;
    remove(req: AuthRequest, res: Response): Promise<Response<any, Record<string, any>>>;
    dashboard(req: AuthRequest, res: Response): Promise<Response<any, Record<string, any>>>;
}
//# sourceMappingURL=task.controller.d.ts.map