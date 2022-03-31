import { TestBed } from '@angular/core/testing';

import { UserServiceGuard } from './user-service.guard';

describe('UserServiceGuard', () => {
  let guard: UserServiceGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(UserServiceGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
