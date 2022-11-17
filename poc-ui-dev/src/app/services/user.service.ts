import { Injectable } from '@angular/core';
import { userInfo } from '../models/user.model';
import { Subject } from 'rxjs';
import { PatientInfo } from '../models/patient-info.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  userData: userInfo;
  patientData: PatientInfo;
  isLoggedIn = false;
  constructor() {
    this.userDataChanged.subscribe((val) => (this.userData = val));
  }

  userDataChanged: Subject<userInfo> = new Subject<userInfo>();

  setUser(userData) {
    this.userData = userData;
  }

  getUserData() {
    return this.userData;
  }

  setPatientData(data: PatientInfo) {
    console.log(data);

    this.patientData = data;
  }
  getPatientData(): PatientInfo {
    console.log(this.patientData);

    return this.patientData;
  }

  logIn() {
    this.isLoggedIn = true;
  }

  logOff() {
    this.isLoggedIn = false;
  }
}
