import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateStatesTable1748499099950 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'states',
                columns: [
                    { name: 'id', type: 'int', isPrimary: true },
                    { name: 'name', type: 'varchar' },
                    { name: 'country_id', type: 'int' },
                    { name: 'country_code', type: 'varchar', length: '2', isNullable: true },
                    { name: 'country_name', type: 'varchar', isNullable: true },
                    { name: 'state_code', type: 'varchar', isNullable: true },
                    { name: 'latitude', type: 'varchar', isNullable: true },
                    { name: 'longitude', type: 'varchar', isNullable: true },
                ],
            }));

        await queryRunner.createForeignKey('states', new TableForeignKey({
            columnNames: ['country_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'countries',
            onDelete: 'CASCADE',
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('states');
    }

}
