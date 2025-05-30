import express from "express";
import { errorHandler } from "./middlewares/errorHandler.middleware";
import CountryRouter from "./routes/country.routes";

const app = express();

app.use(express.json());
app.use(errorHandler);
app.use(express.urlencoded({ extended: true }));

app.use(CountryRouter);


export default app;