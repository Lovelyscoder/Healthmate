import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateDiseaseTable1690000000002 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "diseases",
        columns: [
          {
            name: "id",
            type: "int",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          { name: "name", type: "varchar", isNullable: false },
          {
            name: "symptoms",
            type: "json",
            isNullable: false,
          },
          {
            name: "precautions",
            type: "json",
            isNullable: false,
          },
          { name: "createdAt", type: "timestamp", default: "CURRENT_TIMESTAMP" },
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
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("diseases");
  }
}
