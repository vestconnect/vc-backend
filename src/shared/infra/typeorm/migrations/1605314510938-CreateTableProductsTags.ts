import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export default class CreateTableProductsTags1605314510938 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'products_tags_nfc',
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
                name: 'tag_nfc',
                type: 'varchar',
                isNullable: false
            }, {
                name: 'active',
                type: 'boolean',
                default: true
            }]
        }));

        await queryRunner.createForeignKey('products_tags_nfc', new TableForeignKey({
            name: 'ProductsTagsNfcProducts',
            columnNames: ['product_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'products',
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE'
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('products_tags_nfc', 'ProductsTagsNfcProducts');
        await queryRunner.dropTable('products_tags_nfc');
    }
}
