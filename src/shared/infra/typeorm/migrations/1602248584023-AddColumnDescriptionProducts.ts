import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export default class AddColumnDescriptionProducts1602248584023 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn('products', new TableColumn({
            name: 'description',
            type: 'varchar',
            isNullable: true
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('products', 'description');
    }
}
