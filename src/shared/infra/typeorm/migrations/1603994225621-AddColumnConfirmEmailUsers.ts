import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export default class AddColumnConfirmEmailUsers1603994225621 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn('users', new TableColumn({
            name: 'confirm_email',
            type: 'boolean',
            default: false
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('users', 'confirm_email');
    }

}
