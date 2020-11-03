import { Injectable } from '@angular/core';
import { FormModelProviderService } from './form-model-provider.service';
import { BaseField } from '../components/shared/field-model';
import { DependencyBase } from '../components/field-meta/field-dependencies/dependency-model/dependency-base';

@Injectable({
  providedIn: 'root'
})
export class FieldDependenciesRegistryService {

  constructor(private formModelProviderService: FormModelProviderService) { }

  public register(dependencyModel: DependencyBase): BaseField {
    const model = this.formModelProviderService.getFlatFieldModel();

    const dependencyField = this.getDependencyField(model, dependencyModel);

    dependencyField
      .cacheDependent(
        this.getDependentField(model, dependencyModel)
      );

    return dependencyField;
  }

  public unRegister(dependencyModel: DependencyBase): void {
    const model = this.formModelProviderService.getFlatFieldModel();

    this
      .getDependencyField(model, dependencyModel)
      .removeDepending(
        this.getDependentField(model, dependencyModel)
      );
  }

  /**
   * Call when field which was dependency for other fields was removed.
   * It will remove references in fields which were dependent to removed one.
   */
  public removeAllDependentFields(dependency: BaseField): void {
    dependency.dependentFields.forEach(field => {
      field.removeDependency(dependency);
    });
  }

  private getDependencyField(model: readonly BaseField[], dependencyRef: DependencyBase): BaseField {
    return model.find(field => field.id === dependencyRef.getDependencyId());
  }

  private getDependentField(model: readonly BaseField[], dependencyRef: DependencyBase): BaseField {
    return model.find(field => field.id === dependencyRef.getOwnerId());
  }
}
