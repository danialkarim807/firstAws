import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { SidenavService } from '../services/sidenav.service';

@Component({
  selector: 'app-available-questionnaires',
  templateUrl: './available-questionnaires.component.html',
  styleUrls: ['./available-questionnaires.component.scss'],
})
export class AvailableQuestionnairesComponent implements OnInit {
  questionnaireList;
  /////////////////////////////////////
  ////// FOR DEMO - REMOVE LATER //////
  /////////////////////////////////////
  // questionnaireList = [
  //   { questionnaireId: 'q_001', name: 'BPI Scoring', lastFilled: '23.01.22' },
  //   {
  //     questionnaireId: 'q_002',
  //     name: 'BW-Nijmegen Questionnaire',
  //     lastFilled: '08.06.21',
  //   },
  //   { questionnaireId: 'q_003', name: 'FIQR', lastFilled: '15.08.21' },
  //   { questionnaireId: 'q_004', name: 'PCS', lastFilled: '10.09.21' },
  //   { questionnaireId: 'q_005', name: 'PCL-5', lastFilled: '25.10.21' },
  //   {
  //     questionnaireId: 'q_006',
  //     name: 'Adult Hope Scale',
  //     lastFilled: '28.10.21',
  //   },
  // ];
  /////////////////////////////////////
  /////////////////////////////////////

  constructor(
    private sidenavService: SidenavService,
    private router: Router,
    private api: ApiService
  ) {}

  ngOnInit(): void {
    this.sidenavService.close();
    this.api.allQuestionnaires().subscribe((res) => {
      console.log(res);
      this.questionnaireList = res;
    });
  }

  navigateToQuestionnaire(qName, qId) {
    this.router.navigate(['/questionnaire', qName], { state: { id: qId } });
  }
}
