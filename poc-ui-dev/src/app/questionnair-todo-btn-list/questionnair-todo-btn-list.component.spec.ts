import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionnairTodoBtnListComponent } from './questionnair-todo-btn-list.component';

describe('QuestionnairTodoBtnListComponent', () => {
  let component: QuestionnairTodoBtnListComponent;
  let fixture: ComponentFixture<QuestionnairTodoBtnListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuestionnairTodoBtnListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionnairTodoBtnListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
