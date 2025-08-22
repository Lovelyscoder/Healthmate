import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateDoctorsTable1690000000004 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "doctors",
        columns: [
          {
            name: "id",
            type: "int",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          { name: "name", type: "varchar", isNullable: false },
          { name: "location", type: "varchar", isNullable: true },
          { name: "specialization", type: "varchar", isNullable: true },
          { name: "phone_no", type: "varchar", isNullable: true },
          { name: "createdAt", type: "timestamp", default: "now()" },
          { name: "updatedAt", type: "timestamp", default: "now()" },
        ],
      }),
      true
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("doctors");
  }
}
