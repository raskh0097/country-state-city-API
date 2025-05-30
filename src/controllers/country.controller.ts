import { NextFunction, Request, Response } from "express";
import countryService from "../services/country.service";
import BaseController from "./base.controller";

class CountryController extends BaseController {

    public getAllCountries = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const countries = await countryService.getAllCountries(req.query as any);
            this.success(res, countries, "");
        } catch (error: unknown) {
            next(error);
        }
    }

}

export default new CountryController();