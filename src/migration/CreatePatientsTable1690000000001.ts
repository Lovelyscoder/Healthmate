import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreatePatientsTable1690000000001 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "patients",
        columns: [
          {
            name: "id",
            type: "int",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          { name: "name", type: "varchar", length: "255", isNullable: false },
          { name: "age", type: "int", isNullable: true },
          { name: "email", type: "varchar", length: "255", isNullable: true, isUnique: true },
          { name: "password", type: "varchar", length: "255", isNullable: false },
          { name: "gender", type: "varchar", length: "50", isNullable: true },
          { name: "phone_no", type: "varchar", length: "20", isNullable: true },
          { name: "blood_group", type: "varchar", length: "10", isNullable: true },
          { name: "dob", type: "timestamp", isNullable: true },
          { name: "height", type: "decimal", precision: 5, scale: 2, isNullable: true },
          { name: "weight", type: "decimal", precision: 5, scale: 2, isNullable: true },
          { name: "image", type: "varchar", length: "255", isNullable: true },
          { name: "relation", type: "varchar", length: "50", isNullable: true },
          { name: "user_id", type: "int", isNullable: false },
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
      "patients",
      new TableForeignKey({
        columnNames: ["user_id"],
        referencedTableName: "users",
        referencedColumnNames: ["id"],
        onDelete: "CASCADE",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("patients");
  }
}
