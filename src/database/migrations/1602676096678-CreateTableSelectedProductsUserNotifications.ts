import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export default class CreateTableSelectedProductsUserNotifications1602676096678 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'selected_products_user_notifications',
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

        await queryRunner.createForeignKey('selected_products_user_notifications', new TableForeignKey({
            name: 'SelectedProductsUserNotificationsProducts',
            columnNames: ['product_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'products',
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE'
        }));

        await queryRunner.createForeignKey('selected_products_user_notifications', new TableForeignKey({
            name: 'SelectedProductsUserNotificationsUser',
            columnNames: ['user_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'users',
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE'
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('selected_products_user_notifications', 'SelectedProductsUserNotificationsUser');
        await queryRunner.dropForeignKey('selected_products_user_notifications', 'SelectedProductsUserNotificationsProducts');
        await queryRunner.dropTable('selected_products_user_notifications');
    }
}
