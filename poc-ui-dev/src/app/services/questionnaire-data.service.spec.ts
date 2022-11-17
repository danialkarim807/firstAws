import { TestBed } from '@angular/core/testing';

import { QuestionnaireDataService } from './questionnaire-data.service';

describe('QuestionnaireDataService', () => {
  let service: QuestionnaireDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuestionnaireDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
