import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export default class CreateTableProducts1602009664147 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'products',
            columns: [{
                name: 'id',
                type: 'uuid',
                isPrimary: true,
                generationStrategy: 'uuid',
                default: 'uuid_generate_v4()'
            }, {
                name: 'nfc_id',
                type: 'varchar',
                isNullable: false
            }, {
                name: 'brand_id',
                type: 'uuid',
                isNullable: false
            }, {
                name: 'title',
                type: 'varchar',
                isNullable: false
            }, {
                name: 'subtitle',
                type: 'varchar',
                isNullable: false
            }, {
                name: 'validate',
                type: 'timestamp without time zone',
                isNullable: false
            }, {
                name: 'avatar',
                type: 'varchar',
                isNullable: true
            }, {
                name: 'background',
                type: 'varchar',
                isNullable: true
            }]
        }));

        await queryRunner.createForeignKey('products', new TableForeignKey({
            name: 'ProductsBrand',
            columnNames: ['brand_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'brands',
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE'
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('products', 'ProductsBrand');
        await queryRunner.dropTable('products');
    }
}
