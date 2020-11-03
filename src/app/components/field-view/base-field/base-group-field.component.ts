import { Component, OnInit, OnDestroy, QueryList, ChangeDetectorRef } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { ViewRefProviderDirective } from 'src/app/directives/view-ref-provider.directive';
import { BaseField } from '../../shared/field-model';
import { BaseFieldComponent, IBaseFieldComponent } from './base-field.component';

export interface IGroupFieldComponent extends IBaseFieldComponent {
  nestedFields: BaseField[];
  fieldComponents: QueryList<ViewRefProviderDirective>;
  addNestedFields(nestedFields: BaseField[]): void;
  addNestedComponentRef(child: IBaseFieldComponent, index: number): void;
}

@Component({
  template: ''
})
export abstract class GroupBaseComponent extends BaseFieldComponent implements IGroupFieldComponent, OnInit, OnDestroy {

  public nestedFields: BaseField[];
  public nestedComponents: IBaseFieldComponent[] = [];
  public fieldComponents: QueryList<ViewRefProviderDirective>;

  public constructor(protected cdr: ChangeDetectorRef) {
    super();
  }

  public addNestedComponentRef(child: IBaseFieldComponent, index: number): void {
    this.nestedComponents.push(child);
    this.addNestedControl(child.getControlInstance(), index.toString());
  }

  public addNestedControl(child: AbstractControl, name: string): void {
    (this.fieldData.getFormControlRef() as FormGroup).addControl(name, child);
  }

  public setInitData(field: BaseField, onFormSubmit: Observable<boolean>): void {
    this.subscriptions = new Subscription();
    this.fieldData = field;

    this.fieldData.setFormControl(new FormGroup({}));
    field.setFormControl(this.fieldData.getFormControlRef());
    this.setSubscriptionToFormSubmit(onFormSubmit);
  }

  public addNestedFields(nestedFields: BaseField[]): void {
    this.nestedFields = nestedFields;
    this.cdr.detectChanges();
  }

  public ngOnInit(): void {
    super.ngOnInit();
  }

  public ngOnDestroy(): void {
    super.ngOnDestroy();
  }

}
