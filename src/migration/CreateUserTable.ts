import { MigrationInterface, QueryRunner } from "typeorm";
export class CreateUserTable1690000000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const tableExists = await queryRunner.hasTable("user");
    if (tableExists) {
    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "user" (
        "id" SERIAL PRIMARY KEY,
        "name" VARCHAR NOT NULL,
        "email" VARCHAR(255)
      )
    `);
    console.log("Table creates or already exists");
    }else{
      console.warn("Error creating table:");
  }
}

  public async down(queryRunner: QueryRunner): Promise<void> {
    const tableExists = await queryRunner.hasTable("user");
    if (!tableExists) {
    await queryRunner.query(`DROP TABLE "user"`);
    console.log("Table dropped successfully");
    }else{
      console.warn("Error dropping table: Table does not exist");
    }
  }
}
 
