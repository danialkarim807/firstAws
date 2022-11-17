import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionnairTodoBtnComponent } from './questionnair-todo-btn.component';

describe('QuestionnairTodoBtnComponent', () => {
  let component: QuestionnairTodoBtnComponent;
  let fixture: ComponentFixture<QuestionnairTodoBtnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuestionnairTodoBtnComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionnairTodoBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
