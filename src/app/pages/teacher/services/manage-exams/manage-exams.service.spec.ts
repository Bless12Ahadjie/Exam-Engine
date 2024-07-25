import { TestBed } from '@angular/core/testing';

import { ManageExamsService } from './manage-exams.service';

describe('ManageExamsService', () => {
  let service: ManageExamsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ManageExamsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
