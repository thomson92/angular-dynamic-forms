import { TestBed } from '@angular/core/testing';

import { FormModelProviderService } from './form-model-provider.service';

describe('FormModelProviderService', () => {
  let service: FormModelProviderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormModelProviderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
