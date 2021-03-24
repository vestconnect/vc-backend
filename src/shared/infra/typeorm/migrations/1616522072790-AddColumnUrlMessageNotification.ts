import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export default class AddColumnUrlMessageNotification1616522072790 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumns('products_user_notifications', [new TableColumn({
            name: 'message',
            type: 'varchar',
            isNullable: true
        }), new TableColumn({
            name: 'url',
            type: 'varchar',
            isNullable: true
        })]);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('products_user_notifications', 'message');
        await queryRunner.dropColumn('products_user_notifications', 'url');
    }
}
