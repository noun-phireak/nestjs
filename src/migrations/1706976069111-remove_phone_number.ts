import { MigrationInterface, QueryRunner } from "typeorm";

export class RemovePhoneNumber1706976069111 implements MigrationInterface {
    name = 'RemovePhoneNumber1706976069111'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "phone_number"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "phone_number" character varying(15) NOT NULL`);
    }

}
