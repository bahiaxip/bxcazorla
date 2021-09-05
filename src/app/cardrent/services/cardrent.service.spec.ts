import { TestBed } from '@angular/core/testing';

import { CardrentService } from './cardrent.service';

describe('CardrentService', () => {
  let service: CardrentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CardrentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
