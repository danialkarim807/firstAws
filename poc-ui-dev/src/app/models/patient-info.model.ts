import { userInfo } from './user.model';
interface PersonalInfo {
  personalId: string;
  age: number;
  gender: string;
  height: number;
  weight: number;
  name: string;
  bmi: number;
}

export interface PatientInfo {
  userInfo: userInfo;
  personalInfo?: PersonalInfo;
}
