import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-completed-questionnair-list',
  templateUrl: './completed-questionnair-list.component.html',
  styleUrls: ['./completed-questionnair-list.component.scss'],
})
export class CompletedQuestionnairListComponent implements OnInit {
  @Input() title;
  completedQuestionnairs;
  constructor() {}

  ngOnInit(): void {}
}
