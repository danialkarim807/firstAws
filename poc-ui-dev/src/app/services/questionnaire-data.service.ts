import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class QuestionnaireDataService {
  private qData = [];
  private hasCompletedQuestionnaire;
  constructor() {}

  getQuestionnaireData(): any[] {
    return this.qData;
  }
  setQustionnaireData(data) {
    this.qData.push(data);
    this.hasCompletedQuestionnaire = true;
  }

  hasCompleted(): boolean {
    return this.hasCompletedQuestionnaire;
  }
}
