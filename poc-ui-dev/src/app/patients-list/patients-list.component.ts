import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PatientInfo } from '../models/patient-info.model';
import { ApiService } from '../services/api.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-patients-list',
  templateUrl: './patients-list.component.html',
  styleUrls: ['./patients-list.component.scss'],
})
export class PatientsListComponent implements OnInit {
  patients: [];
  constructor(
    private api: ApiService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const userData = this.userService.getUserData();

    console.log(userData);

    this.api.patientList(userData.userId).subscribe((res) => {
      // this.patients = res.sort((a, b) => (a['id'] > b['id'] ? 1 : -1));
      this.patients = res.sort();
    });
  }

  setPatientData(patientId: string) {
    console.log(patientId);

    const patientData: PatientInfo = {
      userInfo: { userId: patientId, role: 'patient' },
    };
    this.userService.setPatientData(patientData);
    this.navToDashboard(patientId);
  }

  navToDashboard(patient) {
    this.router.navigate(['dashboard', { id: patient }]);
  }
}
