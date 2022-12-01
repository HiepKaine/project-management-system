import { environment } from './../../../../common/src/environments/environment';
import { MigrationInterface, QueryRunner } from "typeorm";

export class SliderTableSeeder1652867053577 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    const items = [
      {
        "image": `${environment.appUrl}/uploads/banner2.png`,
        "name": "header",
        "alt": "banner header",
        "order": 1,
        "type": 1,
        "group": 1,
      },
      {
        "image": `${environment.appUrl}/uploads/chuvietha.png`,
        "name": "achievement",
        "alt": "Thành tích học viên ôn thi công chức, viên chức",
        "order": 1,
        "type": 2,
        "group": 1,
      },
      {
        "image": `${environment.appUrl}/uploads/5@3x.png`,
        "name": "testimonial",
        "alt": "cảm nhận học viên ôn thi công chức, viên chức",
        "order": 1,
        "type": 3,
        "group": 1,
      },
      {
        "image": `${environment.appUrl}/uploads/1-1@2x.png`,
        "name": "testimonial",
        "alt": "cảm nhận học viên ôn thi công chức, viên chức",
        "order": 2,
        "type": 3,
        "group": 1,
      },
      {
        "image": `${environment.appUrl}/uploads/15.png`,
        "name": "testimonial",
        "alt": "cảm nhận học viên ôn thi công chức, viên chức",
        "order": 3,
        "type": 3,
        "group": 1,
      },
      {
        "image": `${environment.appUrl}/uploads/1-1@2x.png`,
        "name": "testimonial",
        "alt": "cảm nhận học viên ôn thi công chức, viên chức",
        "order": 1,
        "type": 3,
        "group": 2,
      },
      {
        "image": `${environment.appUrl}/uploads/15.png`,
        "name": "testimonial",
        "alt": "cảm nhận học viên ôn thi công chức, viên chức",
        "order": 2,
        "type": 3,
        "group": 2,
      },
      {
        "image": `${environment.appUrl}/uploads/5@3x.png`,
        "name": "testimonial",
        "alt": "cảm nhận học viên ôn thi công chức, viên chức",
        "order": 3,
        "type": 3,
        "group": 2,
      },
    ];

    const query = queryRunner.manager.createQueryBuilder()
      .insert()
      .into('slider')


    for (const item of items) {
      await query.values(item).execute();
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.clearTable('slider');
  }

}
