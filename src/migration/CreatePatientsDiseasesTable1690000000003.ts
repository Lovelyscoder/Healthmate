import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreatePatientsDiseasesTable1690000000003 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "patients_diseases",
        columns: [
          {
            name: "id",
            type: "int",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          { name: "patient_id", type: "int", isNullable: false },
          { name: "disease_id", type: "int", isNullable: false },
          {
            name: "createdAt",
            type: "timestamp",
            default: "CURRENT_TIMESTAMP",
          },
        ],
      }),
      true
    );

    await queryRunner.createForeignKey(
      "patients_diseases",
      new TableForeignKey({
        columnNames: ["patient_id"],
        referencedTableName: "patients",
        referencedColumnNames: ["id"],
        onDelete: "CASCADE",
      })
    );

    await queryRunner.createForeignKey(
      "patients_diseases",
      new TableForeignKey({
        columnNames: ["disease_id"],
        referencedTableName: "diseases",
        referencedColumnNames: ["id"],
        onDelete: "CASCADE",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("patients_diseases");
  }
}
