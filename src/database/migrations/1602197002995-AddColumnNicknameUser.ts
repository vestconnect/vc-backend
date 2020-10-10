import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export default class AddColumnNicknameUser1602197002995 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn('users', new TableColumn({
            name: 'nickname',
            type: 'varchar',
            isNullable: true
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('users', 'nickname');
    }
}
