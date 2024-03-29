import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export default class AddColumnNeedPasswordProduct1621187288636 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn('products', new TableColumn({
            name: 'need_password',
            type: 'boolean',
            default: false
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('products', 'need_password')
    }
}