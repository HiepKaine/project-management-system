import * as slugify from 'slugify';
import {
  MigrationInterface,
  QueryRunner,
} from 'typeorm';

export class CategoryTableSeeder1651802868578 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    const items = [
      {
        "name": "Hiến pháp năm 2013"
      },
      {
        "name": "Luật cán bộ, công chức năm 2008 sửa đổi bổ sung năm 2019 "
      },
      {
        "name": "Luật cán bộ công chức"
      },
      {
        "name": "Luật phòng chống tham nhũng năm 2018"
      },
      {
        "name": "Luật tổ chức chính quyền địa phương năm 2015 sửa đổi bổ sung năm 2019"
      },
      {
        "name": "Luật Quản lý Thuế 2019"
      },
      {
        "name": "Ôn thi công chức Thuế"
      },
      {
        "name": "Ôn thi công chức Hải Quan"
      },
      {
        "name": "Ôn thi công chức Tổng cục Dự Trữ"
      },
      {
        "name": "Ôn thi công chức tỉnh/thành phố"
      },
      {
        "name": "Tiếng Anh ôn thi Thuế"
      },
      {
        "name": "Nghị định 30/2020/NĐ-CP của Chính phủ ngày 5/3/2020 về công tác văn thư"
      },
      {
        "name": "Nghị định số 112/2020/NĐ-CP về xử lý kỉ luật cán bộ, công chức, viên chức"
      },
      {
        "name": "Nghị định số 101/2020/NĐ-CP sửa đổi bổ sung số 123/2016/NĐ-CP quy định chức năng, nhiệm vụ, quyền hạn và cơ cấu tổ chức của Bộ, cơ quan ngang Bộ "
      },
      {
        "name": "Luật ban hành văn bản quy phạm pháp luật năm 2015 sửa đổi, bổ sung năm 2020"
      },
      {
        "name": "Luật tổ chức Chính phủ năm 2015 sửa đổi bổ sung năm 2019 "
      },
      {
        "name": "Nghị định số 90/2020/ NĐ-CP về đánh giá xếp loại, chất lương cán bộ, công chức, viên chức"
      },
      {
        "name": "Nghị quyết số 76/ NQ-CP ban hành, Chương trình tổng thể cải cách hành chính nhà nước giai đoạn 2021-2030 "
      }
    ];

    const query = queryRunner.manager.createQueryBuilder()
      .insert()
      .into('category')


    for (const item of items) {
      await query.values({ ...item, ...{ slug: slugify.default(item.name, { lower: true }) } }).execute();
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.clearTable('category');
  }

}
