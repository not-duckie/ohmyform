import { QueryRunner } from 'typeorm'
import { SqliteMigration } from '../sqlite.migration'

export class layout1621078163528 extends SqliteMigration {
  name = 'layout1621078163528'

  public async realUp(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('CREATE TABLE "temporary_form" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "title" varchar NOT NULL, "language" varchar(10) NOT NULL, "showFooter" boolean NOT NULL, "isLive" boolean NOT NULL, "created" datetime NOT NULL DEFAULT (datetime(\'now\')), "lastModified" datetime NOT NULL DEFAULT (datetime(\'now\')), "adminId" integer, "startPageId" integer, "endPageId" integer, "analyticsGacode" varchar, "designFont" varchar, "designColorsBackground" varchar, "designColorsQuestion" varchar, "designColorsAnswer" varchar, "designColorsButton" varchar, "designColorsButtonactive" varchar, "designColorsButtontext" varchar, "designLayout" varchar, CONSTRAINT "FK_e5d158932e43cfbf9958931ee01" FOREIGN KEY ("endPageId") REFERENCES "page" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_023d9cf1d97e93facc96c86ca70" FOREIGN KEY ("startPageId") REFERENCES "page" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_a7cb33580bca2b362e5e34fdfcd" FOREIGN KEY ("adminId") REFERENCES "user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)');
    await queryRunner.query('INSERT INTO "temporary_form"("id", "title", "language", "showFooter", "isLive", "created", "lastModified", "adminId", "startPageId", "endPageId", "analyticsGacode", "designFont", "designColorsBackground", "designColorsQuestion", "designColorsAnswer", "designColorsButton", "designColorsButtonactive", "designColorsButtontext") SELECT "id", "title", "language", "showFooter", "isLive", "created", "lastModified", "adminId", "startPageId", "endPageId", "analyticsGacode", "designFont", "designColorsBackground", "designColorsQuestion", "designColorsAnswer", "designColorsButton", "designColorsButtonactive", "designColorsButtontext" FROM "form"');
    await queryRunner.query('DROP TABLE "form"');
    await queryRunner.query('ALTER TABLE "temporary_form" RENAME TO "form"');
  }

  public async realDown(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "form" RENAME TO "temporary_form"');
    await queryRunner.query('CREATE TABLE "form" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "title" varchar NOT NULL, "language" varchar(10) NOT NULL, "showFooter" boolean NOT NULL, "isLive" boolean NOT NULL, "created" datetime NOT NULL DEFAULT (datetime(\'now\')), "lastModified" datetime NOT NULL DEFAULT (datetime(\'now\')), "adminId" integer, "startPageId" integer, "endPageId" integer, "analyticsGacode" varchar, "designFont" varchar, "designColorsBackground" varchar, "designColorsQuestion" varchar, "designColorsAnswer" varchar, "designColorsButton" varchar, "designColorsButtonactive" varchar, "designColorsButtontext" varchar, CONSTRAINT "FK_e5d158932e43cfbf9958931ee01" FOREIGN KEY ("endPageId") REFERENCES "page" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_023d9cf1d97e93facc96c86ca70" FOREIGN KEY ("startPageId") REFERENCES "page" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_a7cb33580bca2b362e5e34fdfcd" FOREIGN KEY ("adminId") REFERENCES "user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)');
    await queryRunner.query('INSERT INTO "form"("id", "title", "language", "showFooter", "isLive", "created", "lastModified", "adminId", "startPageId", "endPageId", "analyticsGacode", "designFont", "designColorsBackground", "designColorsQuestion", "designColorsAnswer", "designColorsButton", "designColorsButtonactive", "designColorsButtontext") SELECT "id", "title", "language", "showFooter", "isLive", "created", "lastModified", "adminId", "startPageId", "endPageId", "analyticsGacode", "designFont", "designColorsBackground", "designColorsQuestion", "designColorsAnswer", "designColorsButton", "designColorsButtonactive", "designColorsButtontext" FROM "temporary_form"');
    await queryRunner.query('DROP TABLE "temporary_form"');
  }
}
