import { Type } from '@angular/core';
import { FieldType } from '../../constants/field-types';
import { v4 as uuidv4 } from 'uuid';
import { ValidationType } from '../../constants/validation-types';
import { AbstractControl } from '@angular/forms';
import { MetaDependencyStatus } from '../../constants/meta-dependency-status';
import { DependencyBase } from '../field-meta/field-dependencies/dependency-model/dependency-base';
import { IBaseFieldComponent } from '../field-view/base-field/base-field.component';
import { CheckboxFieldComponent } from '../field-view/checkbox-field/checkbox-field.component';
import { GroupFieldComponent } from '../field-view/group-field/group-field.component';
import { TextAreaComponent } from '../field-view/text-area/text-area.component';

export class BaseField {

  public labeltext: string;
  public nestedField: BaseField[];

  public fieldType: FieldType;
  public isConfigured = false;

  public dependencies: DependencyBase[] = new Array<DependencyBase>();
  public dependentFields: BaseField[] = new Array<BaseField>();

  public readonly path: number[];
  public readonly isLocked: boolean;
  public readonly id: number;

  private control: AbstractControl;


  public constructor(parentPath: number[], isRoot = false) {
    this.path = new Array<number>();


    if (parentPath) {
      parentPath.forEach(pathElement => {
        this.path.push(pathElement);
      });
    }

    this.id = uuidv4();
    this.path.push(this.id);

    this.isLocked = isRoot;
  }


  public static getFieldComponentType(fieldType: FieldType): Type<IBaseFieldComponent> {
    let fieldComponentType: Type<IBaseFieldComponent> = null;
    switch (fieldType) {
      case FieldType.textarea:
        fieldComponentType = TextAreaComponent;
        break;
      case FieldType.checkbox:
        fieldComponentType = CheckboxFieldComponent;
        break;
      case FieldType.group:
        fieldComponentType = GroupFieldComponent;
        break;
      default:
        console.error('wrong field type');
        break;
    }
    return fieldComponentType;
  }

  public getFormControlRef(): AbstractControl {
    return this.control;
  }

  public setFormControl(control: AbstractControl): void {
    this.control = control;
  }

  public setFieldType(fieldType: FieldType): void {
    this.fieldType = fieldType;
    this.isConfigured = true;
  }

  public addNestedField(): void {
    const newField = new BaseField(this.path);

    this.nestedField.push(newField);
  }

  public onDependencyChange(): void {
    this.statusCheck();
  }

  /** Remove field which value is dependency for this obj */
  public removeDependency(dependencyRef: BaseField): void {
    this.dependencies = this.dependencies.filter(dep => dep.getDependencyId() !== dependencyRef.id);
  }

  /** Chache field which oberves (depends) the changes on this obj. */
  public cacheDependent(dependingField: BaseField): void {
    this.dependentFields.push(dependingField);
  }

  /** Remove from cache the field which was depending on the changes to this obj. */
  public removeDepending(dependingField: BaseField): void {
    this.dependentFields = this.dependentFields.filter(field => field !== dependingField);
  }

  public hasValidation(validationType: ValidationType): boolean {
    const validationDependencies = this.dependencies
      .filter(dep => dep.validationType === validationType &&
        dep.getCurrentStatus() === MetaDependencyStatus.valid);

    const isAnyConditionMet = BaseField.isAnyDependencyConditionMet(validationDependencies);

    return isAnyConditionMet;
  }

  private static isAnyDependencyConditionMet(dependencies: DependencyBase[]): boolean {
    let isConditionMet = false;

    dependencies.forEach(dep => {
      isConditionMet = dep.isDependencyConditionMet();

      if (isConditionMet) {
        return isConditionMet;
      }
    });

    return isConditionMet;
  }

  private statusCheck(): void {

    this.dependencies.forEach(depToCheck => {

      let isDuplicated = false;

      this.dependencies
        .filter(dep => dep !== depToCheck)
        .forEach(depToCompare => {
          const hasSameDependency = depToCheck.getDependencyId() === depToCompare.getDependencyId();
          const hasSameType = depToCheck.validationType === depToCompare.validationType;

          if (hasSameDependency && hasSameType) {
            isDuplicated = true;
          }
        });

      if (isDuplicated) {
        depToCheck.markAsDuplicate();
      } else if (depToCheck.isSetupDone()) {
        depToCheck.markAsValid();
      }
    });
  }
}
