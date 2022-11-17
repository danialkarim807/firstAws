import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompletedQuestionnairListComponent } from './completed-questionnair-list.component';

describe('CompletedQuestionnairListComponent', () => {
  let component: CompletedQuestionnairListComponent;
  let fixture: ComponentFixture<CompletedQuestionnairListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompletedQuestionnairListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompletedQuestionnairListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
