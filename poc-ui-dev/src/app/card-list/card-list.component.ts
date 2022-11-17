import { Component, Input, OnInit } from '@angular/core';
import { delay, Observable, of } from 'rxjs';
import { Card } from '../models/card.model';
import { ApiService } from '../services/api.service';
import { QuestionnaireDataService } from '../services/questionnaire-data.service';

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.scss'],
})
export class CardListComponent implements OnInit {
  @Input() title;
  @Input() type: string;
  @Input() cards;
  constructor() {}

  ngOnInit() {}
}
