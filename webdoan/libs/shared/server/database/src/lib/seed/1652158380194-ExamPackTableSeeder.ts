import { environment } from './../../../../common/src/environments/environment';
import { MigrationInterface, QueryRunner } from "typeorm";

export class ExamPackTableSeeder1651893878819 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    const items = [
      {
        "name": "KTC TỔNG QUÁT - CÔNG CHỨC KHO BẠC 2021",
        "lecturer": "Thầy Tài Tân Tiến",
        "video": 'AMEI1XY8pH4',
        "price": 0,
        "originalprice": 0,
        "image": `${environment.appUrl}/uploads/kho-bac@2x.png`,
        "status": 1,
        "isFree": true,
        'rateCount': 15,
        'rateAverage': 4.5,
      },
      {
        "name": "KTC TỔNG QUÁT - CÔNG CHỨC QUẢN LÝ THỊ TRƯỜNG 2021",
        "lecturer": "Thầy Tài Tân Tiến",
        "video": 'AMEI1XY8pH4',
        "price": 0,
        "originalprice": 0,
        "image": `${environment.appUrl}/uploads/quan-ly-thi-truong@2x.png`,
        "status": 0,
        "isFree": true,
        'rateCount': 15,
        'rateAverage': 4.5,
      },
      {
        "name": "KTC TỔNG QUÁT - CÔNG CHỨC THUẾ 2021",
        "lecturer": "Thầy Tài Tân Tiến",
        "video": 'AMEI1XY8pH4',
        "price": 0,
        "originalprice": 0,
        "image": `${environment.appUrl}/uploads/thue@2x.png`,
        "status": 1,
        "isFree": true,
        'rateCount': 15,
        'rateAverage': 4.5,
      },
      {
        "name": "KTC TỔNG QUÁT - CÔNG CHỨC KHO BẠC 2022",
        "lecturer": "Thầy Tài Tân Tiến",
        "video": 'AMEI1XY8pH4',
        "price": 4590000,
        "originalprice": 4590000,
        "image": `${environment.appUrl}/uploads/kho-bac@2x.png`,
        "status": 1,
        "isFree": false,
        'rateCount': 15,
        'rateAverage': 4.5,
      },
      {
        "name": "KTC TỔNG QUÁT - CÔNG CHỨC QUẢN LÝ THỊ TRƯỜNG 2022",
        "lecturer": "Thầy Tài Tân Tiến",
        "video": 'AMEI1XY8pH4',
        "price": 4590000,
        "originalprice": 4590000,
        "image": `${environment.appUrl}/uploads/quan-ly-thi-truong@2x.png`,
        "status": 0,
        "isFree": false,
        'rateCount': 15,
        'rateAverage': 4.5,
      },
      {
        "name": "KTC TỔNG QUÁT - CÔNG CHỨC THUẾ 2022",
        "lecturer": "Thầy Tài Tân Tiến",
        "video": 'AMEI1XY8pH4',
        "price": 4590000,
        "originalprice": 4590000,
        "image": `${environment.appUrl}/uploads/thue@2x.png`,
        "status": 1,
        "isFree": false,
        'rateCount': 15,
        'rateAverage': 4.5,
      },
    ];

    const query = queryRunner.manager.createQueryBuilder()
      .insert()
      .into('examPack')


    for (const item of items) {
      await query.values(item).execute();
    }
  }

  public async down(

    queryRunner: QueryRunner): Promise<void> {
    await queryRunner.clearTable('examPack');
  }

}
