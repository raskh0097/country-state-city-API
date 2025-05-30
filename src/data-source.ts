import { DataSource } from "typeorm";
import config from "./configs";
import { join } from "path";
import { Country } from "./entities/country.entity";
import { State } from "./entities/state.entity";
import { City } from "./entities/city.entity";

const dataSource = new DataSource({
    database: config.db_name,
    host: config.db_host,
    port: config.db_port,
    username: config.db_user_name,
    password: config.db_password,
    type: "postgres",
    logging: config.node_env === 'development' ? true : false,
    ssl: config.node_env === 'production' ? true : false,
    migrationsTableName: 'migrations',
    entities: [Country, State, City],
    migrations: [join(__dirname, '/../dist/migrations/*.migration{.ts,.js}')],
});

export default dataSource;