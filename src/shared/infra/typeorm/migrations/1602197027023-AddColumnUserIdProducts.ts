import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from "typeorm";

export default class AddColumnUserIdProducts1602197027023 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn('products', new TableColumn({
            name: 'user_id',
            type: 'uuid',
            isNullable: true
        }));

        await queryRunner.createForeignKey('products', new TableForeignKey({
            name: 'ProductsUser',
            columnNames: ['user_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'users',
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE'
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('products', 'ProductsUser');
        await queryRunner.dropColumn('products', 'user_id');
    }
}
