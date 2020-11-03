import { TestBed } from '@angular/core/testing';

import { FieldDependenciesRegistryService } from './field-dependencies-registry.service';

describe('FieldDependenciesRegistryService', () => {
  let service: FieldDependenciesRegistryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FieldDependenciesRegistryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
