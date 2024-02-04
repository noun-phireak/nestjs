import { MigrationInterface, QueryRunner } from "typeorm";

export class AddUserBack1706973015318 implements MigrationInterface {
    name = 'AddUserBack1706973015318'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "phone_number"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "gender"`);
        await queryRunner.query(`DROP TYPE "public"."user_gender_enum"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."user_gender_enum" AS ENUM('m', 'f', 'u')`);
        await queryRunner.query(`ALTER TABLE "user" ADD "gender" "public"."user_gender_enum" NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ADD "phone_number" character varying(15) NOT NULL`);
    }

}
