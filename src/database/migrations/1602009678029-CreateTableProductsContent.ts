import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export default class CreateTableProductsContent1602009678029 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'products_content',
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
                name: 'type',
                type: 'varchar',
                isNullable: false
            }, {
                name: 'product_id',
                type: 'uuid',
                isNullable: false
            }, {
                name: 'background',
                type: 'varchar',
                isNullable: true
            }]
        }));

        await queryRunner.createForeignKey('products_content', new TableForeignKey({
            name: 'ProductsContentProducts',
            columnNames: ['product_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'products',
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE'
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('products_content', 'ProductsContentProducts');
        await queryRunner.dropTable('products_content');
    }

}
