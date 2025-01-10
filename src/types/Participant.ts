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
  user: Participant | null;
  setUser: (user: Participant | null) => void;
}
