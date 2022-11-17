import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-questionnair-todo-btn',
  templateUrl: './questionnair-todo-btn.component.html',
  styleUrls: ['./questionnair-todo-btn.component.scss'],
})
export class QuestionnairTodoBtnComponent implements OnInit {
  @Input() name: string;
  @Input() type: string;

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {}

  openQuestionnaire() {
    console.log(this.route);

    this.router.navigate(['questionnaire']);
    // , {
    //   queryParams: { type: this.type, name: this.name },
    // });
  }
}
