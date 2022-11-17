import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompletedQuestionnaireComponent } from './completed-questionnair.component';

describe('CompletedQuestionnairComponent', () => {
  let component: CompletedQuestionnaireComponent;
  let fixture: ComponentFixture<CompletedQuestionnaireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CompletedQuestionnaireComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompletedQuestionnaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
