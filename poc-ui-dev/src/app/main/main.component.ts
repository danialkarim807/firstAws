import { Component, OnInit } from '@angular/core';
import { Card } from '../models/card.model';
import { ApiService } from '../services/api.service';
import { QuestionnaireDataService } from '../services/questionnaire-data.service';
import { SidenavService } from '../services/sidenav.service';

const sensorMap = {
  0: {
    title: 'ECG',
    computed: false,
    description:
      'Records the pathway of electrical impulses through the heart muscle',
  },
  1: {
    title: 'GSR',
    computed: false,
    description: 'Allows to measure sweat gland activity',
  },
  2: {
    title: 'HRV',
    computed: false,
    description:
      'Detect any changes in your autonomic nervous system by calculating your heart rate, heart rate variability, and sleep quality, while also factoring in things like stress levels and environmental changes',
  },
  3: {
    title: 'Heart Rate',
    computed: false,
    description:
      'Measures pulse waves, which are changes in the volume of a blood vessel that occur when the heart pumps blood',
  },
  4: {
    title: 'Blood Preassure',
    computed: false,
    description:
      'Collects the reflected light from the red blood cells in the blood vessels in the skin under the sensor',
  },
  5: {
    title: 'SPO2',
    computed: false,
    normalValue: '98%',
    description:
      'Collects the reflected light from the red blood cells in the blood vessels in the skin under the sensor',
  },
  6: {
    title: 'Temperature',
    computed: false,
    normalValue: '36.5c',
    description:
      'Collects the reflected light from the red blood cells in the blood vessels in the skin under the sensor',
  },
  7: {
    title: 'Pedometer',
    computed: false,
    normalValue: 5000,
    description: 'Counts the number of steps you take',
  },
  8: {
    title: 'Stress Level',
    normalValue: '20%',
    computed: true,
    description:
      'Measured by combining the galvanic skin response (GSR), body temperature, and heart rate sensor readings',
  },
  9: {
    title: 'Sleep',
    computed: true,
    normalValue: '8h',
    description:
      'Collecting information from built-in sensors and interpreting the data through an algorithm',
  },
  10: {
    title: 'Wellness Score',
    normalValue: '98%',
    computed: true,
    desciption: '',
  },
};

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  cards: Card[];
  sensorCards: Card[];
  computedCards: Card[];
  questionnairesData;
  title = 'Equanimity-App';
  hasCompletedQuestionnaire;
  // hasCompletedQuestionnaire = false;
  // demo data
  questionnaires = {
    data: [
      { questionnaireId: '0001', name: 'A' },
      { questionnaireId: '0002', name: 'B' },
      { questionnaireId: '0003', name: 'BPI Scoring', type: 'Monthly' },
    ],
  };
  constructor(
    private api: ApiService,
    private qdService: QuestionnaireDataService,
    private sidenavService: SidenavService
  ) {
    this.cards = [
      {
        sensor: 0,
        info: [
          {
            statistic: 'PR',
            data: '120',
          },
          {
            statistic: 'QT',
            data: '320',
          },
          {
            statistic: 'QTc',
            data: '340',
          },
          {
            statistic: 'TR',
            data: '60',
          },
        ],
        unit: ['ms'],
        standardDescriptionWord: 'Abnormalities',
      },
      {
        sensor: 1,
        info: [
          {
            statistic: 'Max',
            data: '32',
          },
          {
            statistic: 'Min',
            data: '7',
          },
          {
            statistic: 'Avg',
            data: '1',
          },
          {
            statistic: 'Last',
            data: '12',
          },
        ],
        unit: ['µS'],
        standardDescriptionWord: 'Optimal',
      },
      {
        sensor: 2,
        info: [
          {
            statistic: 'Max',
            data: '110',
          },
          {
            statistic: 'Min',
            data: '54',
          },
          {
            statistic: 'Avg',
            data: '102',
          },
          {
            statistic: 'Last',
            data: '96',
          },
        ],
        unit: ['ms'],
        standardDescriptionWord: 'Optimal',
      },
      {
        sensor: 3,
        info: [
          {
            statistic: 'Max',
            data: '85',
          },
          {
            statistic: 'Min',
            data: '59',
          },
          {
            statistic: 'Avg',
            data: '65',
          },
          {
            statistic: 'Last',
            data: '61',
          },
        ],
        unit: ['bpm'],
        standardDescriptionWord: 'Optimal',
      },
      {
        sensor: 4,
        info: [
          {
            statistic: 'Max',
            data: '15',
          },
          {
            statistic: 'Min',
            data: '7',
          },
          {
            statistic: 'Avg',
            data: '1',
          },
          {
            statistic: 'Last',
            data: '12',
          },
        ],
        unit: ['mmHg'],
        standardDescriptionWord: 'Optimal',
      },
      {
        sensor: 5,
        info: [
          {
            statistic: 'Min',
            data: '95',
          },
          {
            statistic: 'Max',
            data: '98',
          },
          {
            statistic: 'Avg',
            data: '97',
          },
        ],
        unit: ['%'],
        standardDescriptionWord: 'Normal value',
      },
      {
        sensor: 6,
        info: [
          {
            statistic: 'Max',
            data: '37.1',
          },
          {
            statistic: 'Min',
            data: '35.3',
          },
          {
            statistic: 'Avg',
            data: '36.2',
          },
          {
            statistic: 'Last',
            data: '36.5',
          },
        ],
        unit: ['c'],
        standardDescriptionWord: 'Optimal',
      },
      {
        sensor: 7,
        info: [
          {
            statistic: 'Max',
            data: '8552',
          },
          {
            statistic: 'Min',
            data: '1500',
          },
          {
            statistic: 'Avg',
            data: '3255',
          },
          {
            statistic: 'Last',
            data: '5338',
          },
        ],
        unit: ['steps'],
        standardDescriptionWord: 'Goal',
      },
      {
        sensor: 8,
        info: [
          {
            statistic: 'Max',
            data: '72',
          },
          {
            statistic: 'Min',
            data: '31',
          },
          {
            statistic: 'Avg',
            data: '37',
          },
          {
            statistic: 'Last',
            data: '32',
          },
        ],
        unit: ['%'],
        standardDescriptionWord: 'Optimal',
      },
      {
        sensor: 9,
        info: [
          {
            statistic: 'Max',
            data: '10.2',
          },
          {
            statistic: 'Min',
            data: '6.4',
          },
          {
            statistic: 'Avg',
            data: '7.3',
          },
          {
            statistic: 'Last',
            data: '7.1',
          },
        ],
        unit: ['h', 'min'],
        standardDescriptionWord: 'Optimal',
      },
      {
        sensor: 10,
        info: [
          {
            statistic: 'Max',
            data: '95',
          },
          {
            statistic: 'Min',
            data: '15',
          },
          {
            statistic: 'Avg',
            data: '65',
          },
        ],
        unit: ['%'],
        standardDescriptionWord: 'Normal Value',
      },
    ];
  }

  ngOnInit(): void {
    this.sidenavService.close();
    this.hasCompletedQuestionnaire = this.qdService.hasCompleted();
    const data = this.qdService.getQuestionnaireData();
    // this.hasCompletedQuestionnaire = true;
    if (this.hasCompletedQuestionnaire) {
      7;
    }

    ///////////////////////////////////////////////////////
    //////////////     DEMO RESPONSE    ///////////////////
    //////////////        REMOVE        ///////////////////
    ///////////////////////////////////////////////////////

    // adding info to each card
    this.cards.forEach((c) => {
      const sensorMapObj = sensorMap[c.sensor];
      c.sensor = sensorMapObj.title;
      c.description = sensorMapObj.description;
      c.computed = sensorMapObj.computed;
      c.normalValue = sensorMapObj.normalValue || null;
    });

    // get only non-computed cards
    this.sensorCards = this.cards.filter((obj) => obj.computed == false);

    // getting the computed cards
    this.computedCards = this.cards.filter((obj) => obj.computed == true);

    // const demoResponse: Observable<Card[]> = of(this.cards).pipe(delay(2000));
    // demoResponse.subscribe((res) => {
    //   console.log(res);
    // });

    // this.questionnaires = this.qdService.getQuestionnaireData();
    this.questionnairesData = [[0, 1, 0, 1, '0%', 1, 0, 1, 0, 1, 0, 1]];
    ///////////////////////////////////////////////////////
  }
}
