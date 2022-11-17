import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

import { Card } from '../models/card.model';

@Injectable({
  providedIn: 'root',
})
export class ApiService implements OnInit {
  isSimulationMode = true;
  ip = 'https://127.0.0.1';
  port = '3000';
  address = this.ip + ':' + this.port + '/';

  data: Card[];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    // this.data = [
    //   {
    //     sensor: 0,
    //     info: [
    //       {
    //         statistic: 'total',
    //         data: 15,
    //       },
    //       {
    //         statistic: 'mean',
    //         data: 7,
    //       },
    //       {
    //         statistic: 'min',
    //         data: 1,
    //       },
    //       {
    //         statistic: 'max',
    //         data: 12,
    //       },
    //     ],
    //   },
    //   {
    //     sensor: 1,
    //     info: [
    //       {
    //         statistic: 'total',
    //         data: 32,
    //       },
    //       {
    //         statistic: 'mean',
    //         data: 7,
    //       },
    //       {
    //         statistic: 'min',
    //         data: 1,
    //       },
    //       {
    //         statistic: 'max',
    //         data: 12,
    //       },
    //     ],
    //   },
    //   {
    //     sensor: 2,
    //     info: [
    //       {
    //         statistic: 'total',
    //         data: 15,
    //       },
    //       {
    //         statistic: 'mean',
    //         data: 7,
    //       },
    //       {
    //         statistic: 'min',
    //         data: 1,
    //       },
    //       {
    //         statistic: 'max',
    //         data: 12,
    //       },
    //     ],
    //   },
    //   {
    //     sensor: 3,
    //     info: [
    //       {
    //         statistic: 'total',
    //         data: 15,
    //       },
    //       {
    //         statistic: 'mean',
    //         data: 7,
    //       },
    //       {
    //         statistic: 'min',
    //         data: 1,
    //       },
    //       {
    //         statistic: 'max',
    //         data: 12,
    //       },
    //     ],
    //   },
    //   {
    //     sensor: 4,
    //     info: [
    //       {
    //         statistic: 'total',
    //         data: 15,
    //       },
    //       {
    //         statistic: 'mean',
    //         data: 7,
    //       },
    //       {
    //         statistic: 'min',
    //         data: 1,
    //       },
    //       {
    //         statistic: 'max',
    //         data: 12,
    //       },
    //     ],
    //   },
    //   {
    //     sensor: 5,
    //     info: [
    //       {
    //         statistic: 'total',
    //         data: 15,
    //       },
    //       {
    //         statistic: 'mean',
    //         data: 7,
    //       },
    //       {
    //         statistic: 'min',
    //         data: 1,
    //       },
    //       {
    //         statistic: 'max',
    //         data: 12,
    //       },
    //     ],
    //   },
    //   {
    //     sensor: 6,
    //     info: [
    //       {
    //         statistic: 'total',
    //         data: 15,
    //       },
    //       {
    //         statistic: 'mean',
    //         data: 7,
    //       },
    //       {
    //         statistic: 'min',
    //         data: 1,
    //       },
    //       {
    //         statistic: 'max',
    //         data: 12,
    //       },
    //     ],
    //   },
    //   {
    //     sensor: 7,
    //     info: [
    //       {
    //         statistic: 'total',
    //         data: 15,
    //       },
    //       {
    //         statistic: 'mean',
    //         data: 7,
    //       },
    //       {
    //         statistic: 'min',
    //         data: 1,
    //       },
    //       {
    //         statistic: 'max',
    //         data: 12,
    //       },
    //     ],
    //   },
    //   {
    //     sensor: 8,
    //     info: [
    //       {
    //         statistic: 'total',
    //         data: 15,
    //       },
    //       {
    //         statistic: 'mean',
    //         data: 7,
    //       },
    //       {
    //         statistic: 'min',
    //         data: 1,
    //       },
    //       {
    //         statistic: 'max',
    //         data: 12,
    //       },
    //     ],
    //   },
    // ];
  }

  getData(): Observable<any> {
    if (this.isSimulationMode) {
      //TODO: implement dely
      const demoResponse: Observable<Card[]> = of(this.data).pipe(delay(2000));
      return demoResponse;
    } else {
      return this.http.get(this.address + '/data');
    }
  }

  signup(body): Observable<any> {
    return this.http.post(this.address + '', body);
  }

  login(credentials): Observable<any> {
    return this.http.post(this.address + 'user/login', credentials);
  }

  logout(): Observable<any> {
    return this.http.delete(this.address + 'logout');
  }

  patientList(userId): Observable<any> {
    console.log(userId);

    return this.http.get(this.address + 'therapist/patients?userId=' + userId);
  }

  getDemoData(): Observable<any> {
    return of(this.data).pipe(delay(2000));
  }

  getTodoQuestionnairs(): Observable<any> {
    return this.http.get(this.address + 'todoQuestionnairs');
  }

  personalInfo(body): Observable<any> {
    return this.http.post(this.address + 'personalInfo', body);
  }

  allQuestionnaires(): Observable<any> {
    return this.http.get(this.address + 'questionnaire/all');
  }

  lastfilled(body): Observable<any> {
    return this.http.post(this.address + 'questionAnswer/last', body);
  }

  sendQuestionnaireAnswers(body): Observable<any> {
    return this.http.post(this.address + 'questionAnswer', body);
  }

  questionnaire(questionnaireId): Observable<any> {
    return this.http.get(
      this.address + 'questionnaire?questionnaireId=' + questionnaireId
    );
  }
}
