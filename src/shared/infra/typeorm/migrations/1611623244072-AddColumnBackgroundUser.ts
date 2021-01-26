import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export default class AddColumnBackgroundUser1611623244072 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn('users', new TableColumn({
            name: 'background',
            type: 'varchar',
            isNullable: true
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('users', 'background');
    }

}
