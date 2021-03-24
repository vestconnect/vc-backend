import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export default class AddColumnUrlContents1616592845295 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn('products_content_videos', new TableColumn({
            name: 'url',
            type: 'varchar',
            isNullable: true
        }));

        await queryRunner.addColumn('products_content_photos', new TableColumn({
            name: 'url',
            type: 'varchar',
            isNullable: true
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('products_content_videos', 'url');
        await queryRunner.dropColumn('products_content_photos', 'url');
    }
}
