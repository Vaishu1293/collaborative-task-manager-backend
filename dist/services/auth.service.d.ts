export declare class AuthService {
    register(data: {
        name: string;
        email: string;
        password: string;
    }): Promise<any>;
    login(data: {
        email: string;
        password: string;
    }): Promise<{
        user: any;
        token: string;
    }>;
    getProfile(userId: string): Promise<any>;
}
//# sourceMappingURL=auth.service.d.ts.map