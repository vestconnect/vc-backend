import { MigrationInterface, QueryRunner, TableForeignKey } from "typeorm";

export default class DropColumnProductIdNotification1616523084138 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE products_user_notifications ALTER COLUMN product_id DROP NOT NULL;')
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE products_user_notifications ALTER COLUMN product_id SET NOT NULL;')
    }

}
