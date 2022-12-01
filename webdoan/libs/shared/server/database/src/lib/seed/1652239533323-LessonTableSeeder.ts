import {MigrationInterface, QueryRunner} from "typeorm";

export class LessonTableSeeder1652239533323 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const items = [
            {
              "name": "Chế độ chính trị - Phần 1",
              "description": "Chế độ chính trị",
              "categoryId": 1,
              "link": "f97de1a13204977daf55808cec613671"
            },
            {
              "name": "Chế độ chính trị – Phần 2",
              "description": "Chế độ chính trị",
              "categoryId": 1,
              "link": "763094f5eb63846394e416bcd094031b"
            },
            {
              "name": "Chế độ chính trị – Phần 3",
              "description": "Chế độ chính trị",
              "categoryId": 1,
              "link": "ead58def8e2e42f68e97fa88aed37a92"
            },
            {
              "name": "Kinh tế, xã hội. văn hóa và bảo vệ Tổ quốc",
              "description": "Kinh tế, xã hội. văn hóa và bảo vệ Tổ quốc",
              "categoryId": 1,
              "link": "24fa6b3307de93b5bd4372ef044a10d6"
            },
            {
              "name": "Quyền con người, quyền và nghĩa vụ của công dân",
              "description": "Quyền con người, quyền và nghĩa vụ của công dân",
              "categoryId": 1,
              "link": "dbaed4548815f32c120e608f5a0839f1"
            },
            {
              "name": "Quốc Hội",
              "description": "Quốc Hội",
              "categoryId": 1,
              "link": "31e4eaabb47e9c58c5ca9fbf6b570223"
            },
            {
              "name": "Ủy ban thường vụ Quốc hội",
              "description": "Ủy ban thường vụ Quốc hội",
              "categoryId": 1,
              "link": "4bdf63b6491acb59cc639b95814e5b95"
            },
            {
              "name": "Chủ tịch nước",
              "description": "Chủ tịch nước",
              "categoryId": 1,
              "link": "130885686278fac3db615b5e6ca4dfc4"
            },
            {
              "name": "Chính Phủ",
              "description": "Chính Phủ",
              "categoryId": 1,
              "link": "944933ceae0597488faf85c655400fe2"
            },
            {
              "name": "TAND, VKSND và các vấn đề còn lại",
              "description": "TAND, VKSND và các vấn đề còn lại",
              "categoryId": 1,
              "link": "4630c8a339209d947c8fb415d4ede82a"
            },
            {
              "name": "Cán bộ, công chức là gì và các vấn đề liên quan",
              "description": "Cán bộ, công chức",
              "categoryId": 2,
              "link": "f668482fcefb5222956245eb04912e14"
            },
            {
              "name": "Nguyên tắc quản lý CBCC và các thuật ngữ phải nắm",
              "description": "Nguyên tắc quản lý CBCC",
              "categoryId": 2,
              "link": "ac3b84f8a7c815fa793755b4906c98d3"
            },
            {
              "name": "Nghĩa vụ của CBCC",
              "description": "Nghĩa vụ của CBCC",
              "categoryId": 2,
              "link": "46be1095032ae4ba71a0cb3ac46ac026"
            },
            {
              "name": "Quyền của Cán bộ, Công chức",
              "description": "Quyền của Cán bộ, Công chức",
              "categoryId": 2,
              "link": "d6c5ded64dc9306c71b78ae527d0440c"
            },
            {
              "name": "Đạo đức của CBCC và những việc không được làm",
              "description": "Đạo đức của CBCC và những việc không được làm",
              "categoryId": 2,
              "link": "9a6babd0c7354cdbe1ce4f6e2940716d"
            },
            {
              "name": "Chính sách đối với cán bộ",
              "description": "Chính sách đối với cán bộ",
              "categoryId": 2,
              "link": "9a6babd0c7354cdbe1ce4f6e2940716d"
            },
            {
              "name": "Tuyển dụng, chính sách đối với Công chức",
              "description": "Tuyển dụng, chính sách đối với Công chức",
              "categoryId": 2,
              "link": "aa9ab859414fa9a855161e8a60582799"
            },
            {
              "name": "Khen thưởng và xử lý vi phạm",
              "description": "Khen thưởng và xử lý vi phạm",
              "categoryId": 2,
              "link": "6b36690c6744663656201507ce285088"
            },
          ];

          const query = queryRunner.manager.createQueryBuilder()
            .insert()
            .into('lesson')


          for (const item of items) {
            await query.values(item).execute();
          }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.clearTable('lesson');
    }

}
