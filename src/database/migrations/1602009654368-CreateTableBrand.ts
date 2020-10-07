import { MigrationInterface, QueryRunner, Table } from "typeorm";

export default class CreateTableBrand1602009654368 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'brands',
            columns: [{
                name: 'id',
                type: 'uuid',
                isPrimary: true,
                generationStrategy: 'uuid',
                default: 'uuid_generate_v4()'
            }, {
                name: 'description',
                type: 'varchar',
                isNullable: false
            }, {
                name: 'avatar',
                type: 'varchar',
                isNullable: true
            }]
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('brands');
    }
}
