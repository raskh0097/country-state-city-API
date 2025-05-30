import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateCountriesTable1748498916683 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'countries',
                columns: [
                    { name: 'id', type: 'int', isPrimary: true },
                    { name: 'name', type: 'varchar' },
                    { name: 'iso3', type: 'varchar', length: '3', isNullable: true },
                    { name: 'iso2', type: 'varchar', length: '2', isNullable: true },
                    { name: 'numeric_code', type: 'varchar', length: '3', isNullable: true },
                    { name: 'phonecode', type: 'varchar', isNullable: true },
                    { name: 'capital', type: 'varchar', isNullable: true },
                    { name: 'currency', type: 'varchar', isNullable: true },
                    { name: 'currency_name', type: 'varchar', isNullable: true },
                    { name: 'currency_symbol', type: 'varchar', isNullable: true },
                    { name: 'native', type: 'varchar', isNullable: true },
                    { name: 'region', type: 'varchar', isNullable: true },
                    { name: 'nationality', type: 'varchar', isNullable: true },
                    { name: 'latitude', type: 'varchar', isNullable: true },
                    { name: 'longitude', type: 'varchar', isNullable: true },
                    { name: 'emoji', type: 'varchar', length: '4', isNullable: true },
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('countries');
    }

}
