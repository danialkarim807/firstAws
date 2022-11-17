import { Component, Input, OnInit } from '@angular/core';
import { PatientInfo } from '../models/patient-info.model';
import { ApiService } from '../services/api.service';

// interface Person {
//   name: string;
//   Id: string;
//   gender: string;
//   age: number;
//   height: number;
//   weight: number;
//   bmi: number;
// }

@Component({
  selector: 'app-personal-info',
  templateUrl: './personal-info.component.html',
  styleUrls: ['./personal-info.component.scss'],
})
export class PersonalInfoComponent implements OnInit {
  @Input() id: string;
  person: PatientInfo;
  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.person = {
      userInfo: {
        role: 'patient',
        userId: 'p-001',
        userImageUrl:
          'https://media-exp1.licdn.com/dms/image/C5603AQH1oCZ1hrb0Ug/profile-displayphoto-shrink_200_200/0/1517047111403?e=1666828800&v=beta&t=qsQ2_RekW8cRXxO3X6BJz0Lsakd5YmByAHbul-Gy3EE',
      },
      personalInfo: {
        age: 34,
        bmi: 25,
        weight: 65,
        height: 163,
        gender: 'Male',
        name: 'Lior Aviel',
        personalId: '301025029',
      },
    };
    // this.api.personalInfo(this.id).subscribe((res) => (this.person = res.data));
  }
}
