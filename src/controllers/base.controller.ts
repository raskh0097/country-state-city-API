import { Response } from 'express';

export interface ApiResponse<T> {
    status: number;
    message?: string | null;
    data?: T | null;
    error: string | null;
    success: boolean;
}

class BaseController {
    protected success<T>(res: Response, data: T, message: string = 'Success', status = 200) {
        const response: ApiResponse<T> = {
            status,
            ...(message ? { message } : {}),
            data,
            error: null,
            success: true,
        };
        return res.status(status).json(response);
    }

    protected error(res: Response, errorMessage: string = 'Something went wrong', status = 500) {
        const response: ApiResponse<null> = {
            status,
            message: null,
            error: errorMessage,
            success: false,
        };
        return res.status(status).json(response);
    }

    protected notFound(res: Response, message = 'Not found') {
        return this.error(res, message, 404);
    }

    protected badRequest(res: Response, message = 'Bad request') {
        return this.error(res, message, 400);
    }

    protected unauthorized(res: Response, message = 'Unauthorized') {
        return this.error(res, message, 401);
    }
}

export default BaseController;