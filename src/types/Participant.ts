export interface Participant {
  idTeacher: number;
  idStudent: number;
  firstName: string;
  lastName: string;
  role: number;
  idGuest?: number;
  isPresent?: boolean;
  date?: string;
}
export interface ParticipantAttendance {
  firstName: string;
  lastName: string;
  role: number;
  isPresent?: boolean;
  date?: string;
}

export interface Invitado {
  id?: number;
  firstName: string;
  lastName: string;
  mail: string;
  dni: string;
}
export interface AuthContextType {
  user: ParticipantAttendance | null;
  setUser: (user: ParticipantAttendance | null) => void;
}
