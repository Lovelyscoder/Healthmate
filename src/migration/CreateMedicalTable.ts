import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateMedicalInfoTable1690000000002 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "medical_info",
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
          // Add other medical info specific columns here
        ],
      })
    );

    await queryRunner.createForeignKey(
      "medical_info",
      new TableForeignKey({
        columnNames: ["userId"],
        referencedColumnNames: ["id"],
        referencedTableName: "users",
        onDelete: "CASCADE",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("medical_info");
  }
}