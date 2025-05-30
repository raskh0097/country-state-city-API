import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateCitiesTable1748499178685 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'cities',
                columns: [
                    { name: 'id', type: 'int', isPrimary: true },
                    { name: 'name', type: 'varchar' },
                    { name: 'state_id', type: 'int' },
                    { name: 'state_code', type: 'varchar', isNullable: true },
                    { name: 'state_name', type: 'varchar', isNullable: true },
                    { name: 'country_id', type: 'int' },
                    { name: 'country_code', type: 'varchar', isNullable: true },
                    { name: 'country_name', type: 'varchar', isNullable: true },
                    { name: 'latitude', type: 'varchar', isNullable: true },
                    { name: 'longitude', type: 'varchar', isNullable: true },
                ],
            }));

        await queryRunner.createForeignKey('cities', new TableForeignKey({
            columnNames: ['state_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'states',
            onDelete: 'CASCADE',
        }));

        await queryRunner.createForeignKey('cities', new TableForeignKey({
            columnNames: ['country_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'countries',
            onDelete: 'CASCADE',
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('cities');
    }

}
