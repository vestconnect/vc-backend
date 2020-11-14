import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from "typeorm";

export default class AddColumnUserPasswords1605387257950 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn('passwords', new TableColumn({
            name: 'user_id',
            type: 'uuid',
            isNullable: true
        }));

        await queryRunner.createForeignKey('passwords', new TableForeignKey({
            name: 'PasswordsUser',
            columnNames: ['user_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'users',
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE'
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('passwords', 'PasswordsUser');
        await queryRunner.dropColumn('passwords', 'user_id');
    }
}
