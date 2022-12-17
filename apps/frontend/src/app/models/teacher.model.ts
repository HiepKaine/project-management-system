export class Teacher {
  id!: number;
  name!: string;
  teacherCode!: string;
  phoneNumber!: string;
  address!: string;
  sex!: number;
  level!: number;
  image!: string;
  email!: string;
  nationality!: string;
  divisionId!: number;
  facultyId!: number;
  deletedAt!: Date;
  createdAt!: Date;
  updatedAt!: Date;

  getLevelName() {
    switch (this.level) {
      case 1:
        return 'Thạc sĩ';
      case 2:
        return 'Tiễn sĩ';
      case 3:
        return 'Cử nhân';
      default:
        return 'Khác';
    }
  }
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
