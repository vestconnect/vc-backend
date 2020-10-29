import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export default class AddColumnReadProductsUserNotifications1602336983144 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn('products_user_notifications', new TableColumn({
            name: 'read',
            type: 'boolean',
            isNullable: true,
            default: false
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('products_user_notifications', 'read');
    }
}
