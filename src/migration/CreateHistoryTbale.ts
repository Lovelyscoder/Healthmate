// filepath: c:\Users\91914\Desktop\Copy_Healthmate\src\migration\CreateHistoryTable.ts
import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateHistoryTable1690000000003 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "history",
        columns: [
          {
            name: "id",
            type: "int",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          {
            name: "userId",
            type: "int",
          },
          // Add other history-specific columns here
        ],
      })
    );

    await queryRunner.createForeignKey(
      "history",
      new TableForeignKey({
        columnNames: ["userId"],
        referencedColumnNames: ["id"],
        referencedTableName: "users",
        onDelete: "CASCADE",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("history");
  }
}