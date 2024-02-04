import { MigrationInterface, QueryRunner } from "typeorm";

export class AddNullableUsername1707032833849 implements MigrationInterface {
    name = 'AddNullableUsername1707032833849'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "username" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "username" SET NOT NULL`);
    }

}
