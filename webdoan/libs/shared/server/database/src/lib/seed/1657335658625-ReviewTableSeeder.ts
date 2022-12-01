import {MigrationInterface, QueryRunner} from "typeorm";
import { environment } from './../../../../common/src/environments/environment';

export class ReviewTableSeeder1657335658625 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const items = [
            {
                "image": `${environment.appUrl}/uploads/hoangthuong.png`,
                "user": "Hoang Thuong",
                "review" : "Tuyệt vời",
                "rateCount": 4,
                "reviewableType": "course",
                "reviewableId": 1
            },
            {
                "image": `${environment.appUrl}/uploads/hoangthuong.png`,
                "user": "Hoang Thuong",
                "review" : "tuyệt vời quá",
                "rateCount": 4,
                "reviewableType": "course",
                "reviewableId": 1
            },
            {
                "image": `${environment.appUrl}/uploads/hoangthuong.png`,
                "user": "Hoang Thuong",
                "review" : "Tuyệt vời",
                "rateCount": 4,
                "reviewableType": "course",
                "reviewableId": 2
            },
            {
                "image": `${environment.appUrl}/uploads/hoangthuong.png`,
                "user": "Hoang Thuong",
                "review" : "Tuyệt vời",
                "rateCount": 4,
                "reviewableType": "exampack",
                "reviewableId": 1
            },  
            {
                "image": `${environment.appUrl}/uploads/hoangthuong.png`,
                "user": "Hoang Thuong",
                "review" : "Tuyệt vời",
                "rateCount": 4,
                "reviewableType": "exampack",
                "reviewableId": 2
            },
        ]

        const query = queryRunner.manager.createQueryBuilder()
            .insert()
            .into('review')

        for(const item of items) {
            await query.values(item).execute()
        }
    }


    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.clearTable('review')

    }

}
