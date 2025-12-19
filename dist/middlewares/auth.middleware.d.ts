import { Request, Response, NextFunction } from "express";
export declare function authMiddleware(req: Request & {
    user?: any;
}, res: Response, next: NextFunction): Response<any, Record<string, any>> | undefined;
export interface AuthRequest extends Request {
    user?: {
        id: string;
    };
}
//# sourceMappingURL=auth.middleware.d.ts.map