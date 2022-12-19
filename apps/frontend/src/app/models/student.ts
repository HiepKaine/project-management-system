export class Student {
  id!: number;
  facultyId!: number;
  classId!: number;
  studentCode!: string;
  name!: string;
  image!: string;
  studentYear!: string;
  idCard!: string;
  phoneNumber!: string;
  sex!: number;
  date!: string;
  address!: string;
  ethnic!: string;
  religion!: string;
  fatherName!: string;
  fatherJob!: string;
  fatherPhoneNumber!: string;
  motherName!: string;
  motherJob!: string;
  motherPhoneNumber!: string;
  note!: string;
  deletedAt!: Date;
  updatedAt!: Date;
  createdAt!: Date;
}

export enum Sex {
  male = 1,
  female = 2,
  other = 3,
}
