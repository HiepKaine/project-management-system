export class Teacher {
  id!: number;
  name!: string;
  teacherCode!: string;
  phoneNumber!: string;
  address!: string;
  sex!: number;
  level!: number;
  email!: string;
  nationality!: string;
  divisionId!: number;
  facultyId!: number;
  deletedAt!: Date;
  createdAt!: Date;
  updatedAt!: Date;
}

export enum Sex {
  male = 1,
  female = 2,
  other = 3,
}

export enum Level {
  mastersDegree = 1,
  doctorsDegree = 2,
  bachelorsDegree = 3,
  other = 4,
}
