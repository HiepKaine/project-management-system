import { environment } from "@server/env/environment";
import { MigrationInterface, QueryRunner } from "typeorm";

export class OptionTableSeeder1664598547369 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    const items = [
      {
        "key": "site-title",
        "label": "Tiêu đề trang web",
        "value": "Ôn thi công chức - viên chức",
        "type": "text"
      },
      {
        "key": "site-logo",
        "label": "Logo trang web",
        "value": `${environment.appUrl}/uploads/logoweb.png`,
        "type": "image"
      },
      {
        "key": "site-description",
        "label": "Mô tả trang web",
        "value": "Định vị là hệ thống ôn thi Công chức, viên chức hiệu quả, bài bản bậc nhất Việt Nam, với bề dày kinh nghiệm và những thành tích đã đạt được, chúng tôi cam kết sẽ mang đến những khóa học chất lượng, giúp bạn sớm chinh phục kỳ thi mà bạn hằng mong muốn",
        "type": "text"
      },
      {
        "key": "hotline",
        "label": "hotline",
        "value": "035.7807.035",
        "type": "text"
      },
      {
        "key": "email",
        "label": "email",
        "value": "tuvan@onthithaytai.vn",
        "type": "text"
      },
      {
        "key": "appstore-url",
        "label": "Ứng dụng trên IOS",
        "value": "https://www.apple.com",
        "type": "text"
      },
      {
        "key": "chplay-url",
        "label": "Ứng dụng trên Android",
        "value": "https://play.google.com",
        "type": "text"
      },
      {
        "key": "fb-group-url",
        "label": "Nhóm Facebook",
        "value": "https://www.facebook.com/groups/congchuc247",
        "type": "text"
      },
      {
        "key": "fb-fanpage-url",
        "label": "Fanpage Facebook",
        "value": "https://www.facebook.com/onthithaytaitantien",
        "type": "text"
      },
      {
        "key": "youtube-channel-url",
        "label": "Kênh Youtube",
        "value": "https://www.youtube.com/c/Th%E1%BA%A7yT%C3%A0iT%C3%A2nTi%E1%BA%BFn",
        "type": "text"
      },
      {
        "key": "tiktok-url",
        "label": "Kênh Tiktok",
        "value": "https://www.tiktok.com/@thaytaitantien_1102",
        "type": "text"
      },
      {
        "key": "copyright",
        "label": "Bản quyền",
        "value": "2022 Bản quyền thuộc về ",
        "type": "text"
      },
    ];

    const query = queryRunner.manager.createQueryBuilder()
      .insert()
      .into('option')

    for (const item of items) {
      await query.values(item).execute();
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.clearTable('option');
  }

}
