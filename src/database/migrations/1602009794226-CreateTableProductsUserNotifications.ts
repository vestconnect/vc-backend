import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export default class CreateTableProductsUserNotifications1602009794226 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'products_user_notifications',
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
                name: 'user_id',
                type: 'uuid',
                isNullable: false
            }]
        }));

        await queryRunner.createForeignKey('products_user_notifications', new TableForeignKey({
            name: 'ProductsUserNotificationsProducts',
            columnNames: ['product_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'products',
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE'
        }));

        await queryRunner.createForeignKey('products_user_notifications', new TableForeignKey({
            name: 'ProductsUserNotificationsUser',
            columnNames: ['user_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'users',
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE'
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('products_user_notifications', 'ProductsUserNotificationsUser');
        await queryRunner.dropForeignKey('products_user_notifications', 'ProductsUserNotificationsProducts');
        await queryRunner.dropTable('products_user_notifications');
    }
}
