import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateScheduleTable1690000000004 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "schedules",
        columns: [
          {
            name: "id",
            type: "int",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          {
            name: "user_id",
            type: "int",
            isNullable: false,
          },
          { name: "title", type: "varchar", length: "255", isNullable: false },
          { name: "description", type: "text", isNullable: true },
          { name: "start_time", type: "timestamp", isNullable: false },
          { name: "end_time", type: "timestamp", isNullable: false },
          {
            name: "status",
            type: "enum",
            enum: ["pending", "completed", "cancelled"],
            default: "'pending'",
          },
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
      "schedules",
      new TableForeignKey({
        columnNames: ["user_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "users",
        onDelete: "CASCADE",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("schedules");
  }
}
