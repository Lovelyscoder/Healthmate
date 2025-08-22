import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreatePrescriptionTable1690000000007 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "prescriptions",
        columns: [
          {
            name: "id",
            type: "int",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          { name: "start_date", type: "timestamp", isNullable: false },
          { name: "end_date", type: "timestamp", isNullable: false },
          { name: "frequency", type: "varchar", length: "255", isNullable: true },
          { name: "medicine_id", type: "int", isNullable: false },
          { name: "visit_id", type: "int", isNullable: false },
          {
            name: "createdAt",
            type: "timestamp",
            default: "CURRENT_TIMESTAMP",
          },
          {
            name: "updatedAt",
            type: "timestamp",
            default: "CURRENT_TIMESTAMP",
            onUpdate: "CURRENT_TIMESTAMP",
          },
        ],
      }),
      true
    );

    await queryRunner.createForeignKey(
      "prescriptions",
      new TableForeignKey({
        columnNames: ["medicine_id"],
        referencedTableName: "medicines",
        referencedColumnNames: ["id"],
        onDelete: "RESTRICT",
      })
    );

    await queryRunner.createForeignKey(
      "prescriptions",
      new TableForeignKey({
        columnNames: ["visit_id"],
        referencedTableName: "visits",
        referencedColumnNames: ["id"],
        onDelete: "CASCADE",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("prescriptions");
  }
}
