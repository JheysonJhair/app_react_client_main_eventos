export interface Participant {
  idTeacher: number;
  idStudent: number;
  firstName: string;
  lastName: string;
  role: number;
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

export interface AuthContextType {
  user: ParticipantAttendance | null;
  setUser: (user: ParticipantAttendance | null) => void;
}
