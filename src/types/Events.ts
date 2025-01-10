import { Attendance } from "./Attendance";
export interface Event {
  idEvent: number;
  name: string;
  date: string;
  startTime: string;
  endTime: string;
  location: string;
  isPrivate: boolean;
  description: string;
  duration: string;
  eventTypeId: number;
  attendances?: Attendance[];
}
