import { NextFunction, Request, Response } from "express";
import { ZodError, ZodSchema } from "zod";

interface ValidationSchemas {
    query?: ZodSchema;
    params?: ZodSchema;
    body?: ZodSchema;
}

export const validate = (schemas: ValidationSchemas): any => {
    return async (req: Request, res: Response, next: NextFunction) => {
        let parsedData: any;
        try {
            if (schemas.query) {
                parsedData = await schemas.query.parseAsync(req.query);
                Object.assign(req.query, parsedData);
            }

            if (schemas.params) {
                parsedData = await schemas.params.parseAsync(req.params);
                Object.assign(req.params, parsedData);
            }

            if (schemas.body) {
                parsedData = await schemas.body.parseAsync(req.body);
                Object.assign(req.body, parsedData);
            }
            next();
        } catch (err: ZodError | any) {
            return res.status(400).json({
                status: 400,
                message: "Validation error",
                error: err?.errors?.map((er: any) => `${er.path.join('.')} - ${er.message}`),
                success: false,
            });
        }
    };
};