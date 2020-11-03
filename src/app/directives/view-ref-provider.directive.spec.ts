import { ViewRefProviderDirective } from './view-ref-provider.directive';
import { ViewContainerRefMock } from './view-container-ref-mock';

describe('ViewRefProviderDirective', () => {
  it('should create an instance', () => {
    const directive = new ViewRefProviderDirective(new ViewContainerRefMock());
    expect(directive).toBeTruthy();
  });
});
