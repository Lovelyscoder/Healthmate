import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateVisitsTable1690000000005 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "visits",
        columns: [
          {
            name: "id",
            type: "int",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          { name: "visit_date", type: "timestamp", isNullable: false },
          { name: "reason", type: "text", isNullable: true },
          { name: "notes", type: "text", isNullable: true },
          { name: "doctor_id", type: "int", isNullable: true }, // allows SET NULL
          { name: "patient_id", type: "int", isNullable: false },
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

    // Foreign key: doctor_id → doctors(id)
    await queryRunner.createForeignKey(
      "visits",
      new TableForeignKey({
        columnNames: ["doctor_id"],
        referencedTableName: "doctors",
        referencedColumnNames: ["id"],
        onDelete: "SET NULL",
      })
    );

    // Foreign key: patient_id → patients(id)
    await queryRunner.createForeignKey(
      "visits",
      new TableForeignKey({
        columnNames: ["patient_id"],
        referencedTableName: "patients",
        referencedColumnNames: ["id"],
        onDelete: "CASCADE",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("visits");
  }
}
