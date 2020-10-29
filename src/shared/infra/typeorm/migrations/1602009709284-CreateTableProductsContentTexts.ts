import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export default class CreateTableProductsContentTexts1602009709284 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'products_content_texts',
            columns: [{
                name: 'id',
                type: 'uuid',
                isPrimary: true,
                generationStrategy: 'uuid',
                default: 'uuid_generate_v4()'
            }, {
                name: 'title',
                type: 'varchar',
                isNullable: false
            }, {
                name: 'description',
                type: 'varchar'
            }, {
                name: 'content_id',
                type: 'uuid',
                isNullable: false
            }, {
                name: 'background',
                type: 'varchar',
                isNullable: true
            }, {
                name: 'file',
                type: 'varchar',
                isNullable: true
            }]
        }));

        await queryRunner.createForeignKey('products_content_texts', new TableForeignKey({
            name: 'ProductsContentTextsProductsContent',
            columnNames: ['content_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'products_content',
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE'
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('products_content_texts', 'ProductsContentTextsProductsContent');
        await queryRunner.dropTable('products_content_texts');
    }

}
