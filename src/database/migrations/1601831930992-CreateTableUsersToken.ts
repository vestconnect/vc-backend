import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export default class CreateTableUsersToken1601831930992 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'users_token',
            columns: [{
                name: 'id',
                type: 'uuid',
                isPrimary: true,
                generationStrategy: 'uuid',
                default: 'uuid_generate_v4()'
            }, {
                name: 'token',
                type: 'varchar',
                isNullable: false
            }, {
                name: 'user_id',
                type: 'uuid',
                isNullable: false
            }]
        }));

        await queryRunner.createForeignKey('users_token', new TableForeignKey({
            name: 'UsersTokenUser',
            columnNames: ['user_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'users',
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE'
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('users_token', 'UsersTokenUser');
        await queryRunner.dropTable('users_token');
    }
}
