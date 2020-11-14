import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateTablePasswords1605379769655 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'passwords',
            columns: [{
                name: 'id',
                type: 'uuid',
                isPrimary: true,
                generationStrategy: 'uuid',
                default: 'uuid_generate_v4()'
            }, {
                name: 'pass',
                type: 'varchar',
                isNullable: false
            }, {
                name: 'active',
                type: 'boolean',
                default: true
            }]
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('passwords');
    }

}
