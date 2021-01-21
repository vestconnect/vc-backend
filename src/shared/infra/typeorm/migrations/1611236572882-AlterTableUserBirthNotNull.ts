import { MigrationInterface, QueryRunner } from "typeorm";

export default class AlterTableUserBirthNotNull1611236572882 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE users ALTER COLUMN birth DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE users ALTER COLUMN birth SET NOT NULL`);
    }

}
