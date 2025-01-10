import { Attendance } from "../../../../types/Attendance";

export interface AttendeesModalProps {
  show: boolean;
  onClose: () => void;
  attendees: Attendance[];
}