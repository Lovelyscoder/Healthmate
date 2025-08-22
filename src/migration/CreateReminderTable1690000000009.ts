import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateReminderTable1690000000001 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "reminders",
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
          { name: "message", type: "text", isNullable: true },
          { name: "reminder_time", type: "timestamp", isNullable: false },
          {
            name: "status",
            type: "enum",
            enum: ["pending", "completed", "missed"],
            default: "'pending'",
          },
          {
            name: "type",
            type: "enum",
            enum: ["medicines", "activity"],
            isNullable: false,
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
      "reminders",
      new TableForeignKey({
        columnNames: ["user_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "users",
        onDelete: "CASCADE",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("reminders");
  }
}
