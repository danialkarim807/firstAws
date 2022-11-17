import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoCardTooltipComponent } from './info-card-tooltip.component';

describe('InfoCardTooltipComponent', () => {
  let component: InfoCardTooltipComponent;
  let fixture: ComponentFixture<InfoCardTooltipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfoCardTooltipComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoCardTooltipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
