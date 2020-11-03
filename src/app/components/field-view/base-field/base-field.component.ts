import { OnInit, Component, OnDestroy } from '@angular/core';
import { BaseField } from '../../shared/field-model';
import { ValidationType } from '../../../constants/validation-types';
import { Validators, FormControl, AbstractControl } from '@angular/forms';
import { Subscription, Observable } from 'rxjs';
import { MetaDependencyStatus } from '../../../constants/meta-dependency-status';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { FieldUtils } from '../../shared/field-utils';

export interface IBaseFieldComponent {
  fieldData: BaseField;
  setInitData(field: BaseField, onFormSubmit: Observable<boolean>): void;
  isDisabled(): void;
  getControlInstance(): AbstractControl;
  setError(): void;
  checkErrors(): boolean;
}

@Component({
  template: ''
})
export abstract class BaseFieldComponent implements IBaseFieldComponent, OnInit, OnDestroy {

  public showError: boolean;
  public fieldData: BaseField;
  protected subscriptions: Subscription;

  public ngOnInit(): void {
    this.listenToDependenciesChanges();
    this.checkErrors();
    this.subscribeToControlValueChanges();
  }

  public ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  public isDisabled(): void {
    const isDisabled = this.fieldData.hasValidation(ValidationType.disabled);

    if (isDisabled) {
      this.fieldData.getFormControlRef().reset();
      this.fieldData.getFormControlRef().disable();
    } else {
      this.fieldData.getFormControlRef().enable();
    }
  }

  public setError(): void {
    this.showError = true;
  }

  public getControlInstance(): AbstractControl {
    return this.fieldData.getFormControlRef();
  }

  public setInitData(field: BaseField, onFormSubmit: Observable<boolean>): void {
    this.subscriptions = new Subscription();
    this.fieldData = field;

    this.fieldData.setFormControl(new FormControl());
    field.setFormControl(this.fieldData.getFormControlRef());
    this.setSubscriptionToFormSubmit(onFormSubmit);
  }

  public checkErrors(): boolean {
    this.checkIfValidationsExists();
    this.fieldData.getFormControlRef().updateValueAndValidity();
    this.showError = this.shouldShowError();

    return this.showError;
  }

  protected shouldShowError(): boolean {
    const control = this.fieldData.getFormControlRef();

    const isDirty = control.dirty;
    const hasErrors = control.errors !== null;
    const isTouched = control.touched;

    return (isDirty || isTouched) && hasErrors;
  }

  protected setSubscriptionToFormSubmit(onFormSubmit: Observable<boolean>): void {
    const subToSubmit = onFormSubmit.subscribe(e => {
      this.getControlInstance().markAsDirty();
      this.getControlInstance().markAsTouched();
      this.checkErrors();
    });

    this.subscriptions.add(subToSubmit);
  }

  private checkIfValidationsExists(): void {
    const hasRequiredVlidation = this.fieldData.hasValidation(ValidationType.requied);

    const requiredValidation = FieldUtils.getRequiredValidaton(this.fieldData.fieldType);

    this.fieldData.getFormControlRef().setValidators(
      [
        hasRequiredVlidation ? requiredValidation : Validators.nullValidator,
        // here goes the checking of other validators
      ]
    );
  }

  private listenToDependenciesChanges(): void {

    const validDependencies = this.fieldData.dependencies.filter(dep => dep.getCurrentStatus() === MetaDependencyStatus.valid);

    validDependencies.forEach(dep => {
      const sub = dep.getValueObservable()
        .pipe(distinctUntilChanged())
        .subscribe(e => {
          this.checkErrors();
          this.isDisabled();
        });

      this.subscriptions.add(sub);
    });
  }

  private subscribeToControlValueChanges(): void {
    const subToValueChange = this.fieldData.getFormControlRef().valueChanges
      .pipe(
        debounceTime(50),
        distinctUntilChanged()
      )
      .subscribe(e => {
        this.fieldData.getFormControlRef().updateValueAndValidity({ onlySelf: true });
        this.showError = this.shouldShowError();
      });

    this.subscriptions.add(subToValueChange);
  }

}

