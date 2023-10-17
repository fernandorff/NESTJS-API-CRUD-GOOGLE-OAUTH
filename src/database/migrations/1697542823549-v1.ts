import { MigrationInterface, QueryRunner } from "typeorm";

export class V11697542823549 implements MigrationInterface {
    name = 'V11697542823549'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."user_status_enum" AS ENUM('Resquest sent', 'Request denied', 'Request approved', 'Request cancels')`);
        await queryRunner.query(`CREATE TABLE "user" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "displayName" character varying NOT NULL, "email" character varying NOT NULL, "dominio" character varying NOT NULL, "photo" character varying NOT NULL, "admin" boolean NOT NULL DEFAULT false, "status" "public"."user_status_enum" NOT NULL DEFAULT 'Resquest sent', CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "role" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "description" character varying NOT NULL, CONSTRAINT "PK_b36bcfe02fc8de3c57a8b2391c2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "employee_role" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "membershipDate" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "membershipCancelationDate" TIMESTAMP WITH TIME ZONE, "employeeId" uuid, "roleId" uuid, CONSTRAINT "PK_1c105b756816efbdeae09a9ab65" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "employee" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "cpf" character varying NOT NULL, "phone" character varying NOT NULL, "userId" uuid, CONSTRAINT "REL_f4b0d329c4a3cf79ffe9d56504" UNIQUE ("userId"), CONSTRAINT "PK_3c2bc72f03fd5abbbc5ac169498" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "employee_sector" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "membershipDate" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "membershipCancelationDate" TIMESTAMP WITH TIME ZONE, "employeeId" uuid, "sectorId" uuid, CONSTRAINT "PK_e5870b1e86c26a972599192b020" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "sector" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "description" character varying NOT NULL, CONSTRAINT "PK_668b2ea8a2f534425407732f3ab" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "employee_role" ADD CONSTRAINT "FK_607b4ff74f9698b5ceb556cac36" FOREIGN KEY ("employeeId") REFERENCES "employee"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "employee_role" ADD CONSTRAINT "FK_4dbe0daece0cd855070580d6d1e" FOREIGN KEY ("roleId") REFERENCES "role"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "employee" ADD CONSTRAINT "FK_f4b0d329c4a3cf79ffe9d565047" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "employee_sector" ADD CONSTRAINT "FK_7aaa2dcca17a4d26f236a5d0ece" FOREIGN KEY ("employeeId") REFERENCES "employee"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "employee_sector" ADD CONSTRAINT "FK_fa825d954fcd8dca555a321d7ad" FOREIGN KEY ("sectorId") REFERENCES "sector"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee_sector" DROP CONSTRAINT "FK_fa825d954fcd8dca555a321d7ad"`);
        await queryRunner.query(`ALTER TABLE "employee_sector" DROP CONSTRAINT "FK_7aaa2dcca17a4d26f236a5d0ece"`);
        await queryRunner.query(`ALTER TABLE "employee" DROP CONSTRAINT "FK_f4b0d329c4a3cf79ffe9d565047"`);
        await queryRunner.query(`ALTER TABLE "employee_role" DROP CONSTRAINT "FK_4dbe0daece0cd855070580d6d1e"`);
        await queryRunner.query(`ALTER TABLE "employee_role" DROP CONSTRAINT "FK_607b4ff74f9698b5ceb556cac36"`);
        await queryRunner.query(`DROP TABLE "sector"`);
        await queryRunner.query(`DROP TABLE "employee_sector"`);
        await queryRunner.query(`DROP TABLE "employee"`);
        await queryRunner.query(`DROP TABLE "employee_role"`);
        await queryRunner.query(`DROP TABLE "role"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TYPE "public"."user_status_enum"`);
    }

}
