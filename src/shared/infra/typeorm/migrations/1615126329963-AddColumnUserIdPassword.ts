import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from "typeorm";

export default class AddColumnUserIdPassword1615126329963
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      "passwords",
      new TableColumn({
        name: "client_id",
        type: "uuid",
        isNullable: true,
      })
    );

    await queryRunner.createForeignKey(
      "passwords",
      new TableForeignKey({
        name: "PasswordsClient",
        columnNames: ["client_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "users",
        onDelete: "SET NULL",
        onUpdate: "CASCADE",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey("passwords", "PasswordsClient");
    await queryRunner.dropColumn("passwords", "client_id");
  }
}
