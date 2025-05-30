import { DataSource, EntityTarget, Repository, ObjectLiteral } from "typeorm";
import dataSource from "../data-source";

class BaseService {
    private readonly dataSource: DataSource;

    constructor() {
        this.dataSource = dataSource;
    }

    protected getRepo<T extends ObjectLiteral>(entity: EntityTarget<T>): Repository<T> {
        return this.dataSource.getRepository<T>(entity);
    }
}
export default BaseService;