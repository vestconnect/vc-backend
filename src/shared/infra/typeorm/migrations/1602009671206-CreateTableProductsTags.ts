import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export default class CreateTableProductsTags1602009671206 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'products_tags',
            columns: [{
                name: 'id',
                type: 'uuid',
                isPrimary: true,
                generationStrategy: 'uuid',
                default: 'uuid_generate_v4()'
            }, {
                name: 'product_id',
                type: 'uuid',
                isNullable: false
            }, {
                name: 'description',
                type: 'varchar',
                isNullable: false
            }]
        }));

        await queryRunner.createForeignKey('products_tags', new TableForeignKey({
            name: 'ProductsTagsProducts',
            columnNames: ['product_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'products',
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE'
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('products_tags', 'ProductsTagsProducts');
        await queryRunner.dropTable('products_tags');
    }
}
