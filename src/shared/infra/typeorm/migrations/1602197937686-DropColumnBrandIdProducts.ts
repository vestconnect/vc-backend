import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from "typeorm";

export default class DropColumnBrandIdProducts1602197937686 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('products', 'ProductsBrand');
        await queryRunner.dropColumn('products', 'brand_id');
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn('products', new TableColumn({
            name: 'brand_id',
            type: 'uuid',
            isNullable: true
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
}
