import { ILike, Repository } from "typeorm";
import { Country } from "../entities/country.entity";
import BaseService from "./base.service";

class CountryService extends BaseService {

    private readonly countryRepo: Repository<Country>

    constructor() {
        super();
        this.countryRepo = this.getRepo(Country);
    }

    async getAllCountries(data: {
        page?: string;
        limit?: string;
        sortBy?: string;
        order?: "ASC" | "DESC";
        search?: string;
        type: "full" | "partial";
        select?: string;
    }) {
        const { page = '1', limit = '10', sortBy, order = "ASC", search, type, select } = data;

        const where = search ? { name: ILike(`%${search}%`) } : {};
        const orderBy = sortBy ? { [sortBy]: order } : {};

        const [countries, total] = await this.countryRepo.findAndCount({
            where,
            order: orderBy,
            skip: type === "partial" ? (parseInt(page) - 1) * (parseInt(limit)) : undefined,
            take: type === "partial" ? parseInt(limit) : undefined,
            select: select?.split(',') as (keyof Country)[],
        });

        return {
            countries,
            ...(type === "partial" ? { meta: { page: parseInt(page), limit: parseInt(limit), total } } : { total }),
        };
    }
}

export default new CountryService;