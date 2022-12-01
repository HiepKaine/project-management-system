import { MigrationInterface, QueryRunner } from "typeorm";

export class HighlightTableSeeder1657783371348 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    const items = [
      {
        "resourceId": 1,
        "resourceType": "course",
        "relatedId": 1,
        "relatedType": "exam-pack"
      },
      {
        "resourceId": 2,
        "resourceType": "course",
        "relatedId": 1,
        "relatedType": "exam-pack"
      },
      {
        "resourceId": 3,
        "resourceType": "course",
        "relatedId": 1,
        "relatedType": "exam-pack"
      },
      {
        "resourceId": 1,
        "resourceType": "course",
        "relatedId": 2,
        "relatedType": "exam-pack"
      },
      {
        "resourceId": 2,
        "resourceType": "course",
        "relatedId": 2,
        "relatedType": "exam-pack"
      },
      {
        "resourceId": 3,
        "resourceType": "course",
        "relatedId": 2,
        "relatedType": "exam-pack"
      },
      {
        "resourceId": 1,
        "resourceType": "exam-pack",
        "relatedId": 1,
        "relatedType": "course"
      },
      {
        "resourceId": 2,
        "resourceType": "exam-pack",
        "relatedId": 1,
        "relatedType": "course"
      },
      {
        "resourceId": 3,
        "resourceType": "exam-pack",
        "relatedId": 1,
        "relatedType": "course"
      },
      {
        "resourceId": 1,
        "resourceType": "exam-pack",
        "relatedId": 2,
        "relatedType": "course"
      },
      {
        "resourceId": 2,
        "resourceType": "exam-pack",
        "relatedId": 2,
        "relatedType": "course"
      },
      {
        "resourceId": 3,
        "resourceType": "exam-pack",
        "relatedId": 2,
        "relatedType": "course"
      },
    ]

    const query = queryRunner.manager.createQueryBuilder()
      .insert()
      .into('highlight')

    for (const item of items) {
      await query.values(item).execute()
    }
  }


  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.clearTable('highlight')

  }

}
