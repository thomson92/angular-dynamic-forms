import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FieldType } from '../../constants/field-types';
import { BaseField } from '../shared/field-model';
import { FieldDependenciesRegistryService } from 'src/app/services/field-dependencies-registry.service';
import { DependencyBase } from './field-dependencies/dependency-model/dependency-base';
import { ValueDependency } from './field-dependencies/dependency-model/dependency-value';

@Component({
  selector: 'app-field-meta',
  templateUrl: './field-meta.component.html',
  styleUrls: ['./field-meta.component.scss']
})
export class FieldMetaComponent {

  @Input() public fieldMeta: BaseField;
  @Input() public parentPath: number[];

  @Output() public newFieldAdded = new EventEmitter<boolean>();
  @Output() public fieldRemoved = new EventEmitter<BaseField>();
  @Output() public modelChanged = new EventEmitter<boolean>();

  public fieldTypes = FieldType;
  public isHovered = false;

  constructor(private fieldDependenciesRegistryService: FieldDependenciesRegistryService) { }

  public update(event: FieldType): void {
    this.fieldMeta.setFieldType(event);
    this.modelChanged.emit(true);
  }

  public addField(): void {
    if (!this.fieldMeta.nestedField) {
      this.fieldMeta.nestedField = new Array<BaseField>();
    }
    this.fieldMeta.addNestedField();
    this.modelChanged.emit(true);
  }

  public onDependencySelect(dependencyRef: DependencyBase): void {
    this.fieldMeta.onDependencyChange();
    this.modelChanged.emit(true);
  }

  public canFieldModelBeAdded(): boolean {
    const isFieldTypeSelected = this.fieldMeta.fieldType != null;
    return isFieldTypeSelected;
  }

  public onNestedFieldUpdate(): void {
    this.modelChanged.emit(true);
  }

  public dependencyRemove(dependency: DependencyBase): void {
    this.fieldMeta.dependencies =  this.fieldMeta.dependencies.filter(dep => dep !== dependency);
    this.fieldMeta.onDependencyChange();
    this.modelChanged.emit(true);
  }

  // When parent receive event about child removal call root about model changed
  public onFieldRemoveAction(fieldToRemove: BaseField): void {
    this.fieldMeta.nestedField = this.fieldMeta.nestedField.filter(field => field !== fieldToRemove);
    this.modelChanged.emit(true);
  }

  public removeField(): void {
    this.unregisterDependencies();
    this.fieldRemoved.emit(this.fieldMeta);
  }

  public canFieldOwnAddAction(): boolean {
    return this.fieldMeta.fieldType === FieldType.group;
  }

  public addDependencyRow(): void {
    this.fieldMeta.dependencies.push(new ValueDependency(this.fieldMeta, this.fieldDependenciesRegistryService));
  }

  private unregisterDependencies(): void {
    this.fieldMeta.dependencies.forEach(dep => {
      if (dep.hasDependingField()) {
        dep.removeDependency();
      }
    });
    this.fieldDependenciesRegistryService.removeAllDependentFields(this.fieldMeta);
  }
}
