export class Review {
  id!: number;
  image!: string;
  user!: string;
  review!: string;
  rateCount!: number;
  reviewableType!: string;
  reviewableId!: number;
  deletedAt!: Date;
  createdAt!: Date;
  updatedAt!: Date;
}
