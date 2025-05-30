import { Router } from 'express';
import CountryController from '../controllers/country.controller';
import { validate } from '../middlewares/validation.middleware';
import { getAllCountriesValidation } from '../validators';

const CountryRouter = Router();

CountryRouter.get('/countries', validate({ query: getAllCountriesValidation }), CountryController.getAllCountries)

export default CountryRouter;