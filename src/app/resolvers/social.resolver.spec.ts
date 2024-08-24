import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { socialResolver } from './social.resolver';

describe('socialResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => socialResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
