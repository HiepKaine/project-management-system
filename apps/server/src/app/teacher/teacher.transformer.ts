export class TeacherTransformer {
  id: number;
  name: string;
  teacherCode: string;
  phoneNumber: string;
  address: string;
  sex: number;
  level: number;
  email: string;
  image: string;
  nationality: string;
  divisionId: number;
  facultyId!: number;
  deletedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}
