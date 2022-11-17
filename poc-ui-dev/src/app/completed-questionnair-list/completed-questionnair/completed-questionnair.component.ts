import { Component, Input, OnInit } from '@angular/core';
import { Card } from 'src/app/models/card.model';

@Component({
  selector: 'app-completed-questionnaire',
  templateUrl: './completed-questionnair.component.html',
  styleUrls: ['./completed-questionnair.component.scss'],
})
export class CompletedQuestionnaireComponent implements OnInit {
  @Input() card: Card;

  constructor() {}

  ngOnInit(): void {}
}
