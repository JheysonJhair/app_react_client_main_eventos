export interface EventAttedance {
  event: {
    name: string;
    date: string;
  };
  listTeacherAttendance: TeacherAttendance[];
  listStudentAttendance: StudentAttendance[];
  listGuestAttendancee: GuestAttendance[];
}

export interface TeacherAttendance {
  idTeacher: string;
  firstName: string;
  lastName: string;
  mail: string;
}

export interface StudentAttendance {
  idStudent: string;
  firstName: string;
  lastName: string;
  mail: string;
}

export interface GuestAttendance {
  idGuest: string;
  firstName: string;
  lastName: string;
  mail: string;
}
