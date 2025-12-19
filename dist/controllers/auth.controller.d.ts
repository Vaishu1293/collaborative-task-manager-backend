import { Request, Response } from "express";
export declare class AuthController {
    register(req: Request, res: Response): Promise<void>;
    login(req: Request, res: Response): Promise<void>;
    me(req: any, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    logout(_req: Request, res: Response): Promise<void>;
}
//# sourceMappingURL=auth.controller.d.ts.map