import { TestBed } from '@angular/core/testing';

import { TodomanagerService } from './todomanager.service';

describe('TodomanagerService', () => {
  let service: TodomanagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TodomanagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
