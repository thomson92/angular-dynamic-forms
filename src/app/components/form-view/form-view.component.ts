import { Component, ComponentFactoryResolver, OnInit, ViewContainerRef, ChangeDetectorRef, ViewChild, ComponentRef } from '@angular/core';
import { ViewRefProviderDirective } from 'src/app/directives/view-ref-provider.directive';
import { BaseField } from '../shared/field-model';
import { FormModelProviderService } from '../../services/form-model-provider.service';
import { FieldType } from 'src/app/constants/field-types';
import { Subject } from 'rxjs';
import { IBaseFieldComponent } from '../field-view/base-field/base-field.component';
import { IGroupFieldComponent } from '../field-view/base-field/base-group-field.component';

@Component({
  selector: 'app-form-view',
  templateUrl: './form-view.component.html',
  styleUrls: ['./form-view.component.scss']
})
export class FormViewComponent implements OnInit {

  @ViewChild(ViewRefProviderDirective) fieldComponents: ViewRefProviderDirective;

  public formModel: BaseField;
  private viewContainerRefs: ViewContainerRef[] = new Array<ViewContainerRef>();
  private onFormSubmit: Subject<boolean> = new Subject<boolean>();

  constructor(private componentFactoryResolver: ComponentFactoryResolver,
              private formModelProviderService: FormModelProviderService,
              private cdr: ChangeDetectorRef
  ) { }


  public ngOnInit(): void {
    this.formModelProviderService
      .listenToModelChanges()
      .subscribe(newModel => {
        this.formModel = newModel;
        this.cdr.detectChanges();
        this.updateFormView(newModel);
      });
  }

  public submitForm(): void {
    this.onFormSubmit.next(true);
  }

  private updateFormView(formModel: BaseField): void {
    this.clearViewReferences();
    this.runFieldFactory(formModel, this.fieldComponents);
  }

  private runFieldFactory(fieldData: BaseField, fieldComponents: ViewRefProviderDirective): IBaseFieldComponent {

    const componentRef = this.createFieldComponent(fieldData, fieldComponents);

    if (fieldData.fieldType === FieldType.group && fieldData.nestedField) {
      this.handleNestedComponents(fieldData, componentRef);
    }

    return componentRef.instance;
  }

  private clearViewReferences(): void {
    this.viewContainerRefs.forEach(ref => {
      ref.clear();
    });

    this.viewContainerRefs = [];
  }

  private createFieldComponent(fieldData: BaseField, fieldComponents: ViewRefProviderDirective): ComponentRef<IBaseFieldComponent> {
    const factory = this.componentFactoryResolver
      .resolveComponentFactory<IBaseFieldComponent>(BaseField.getFieldComponentType(fieldData.fieldType));

    const viewContainerRef = fieldComponents.viewContainerRef;
    this.viewContainerRefs.push(viewContainerRef);

    const componentRef = viewContainerRef.createComponent<IBaseFieldComponent>(factory);
    componentRef.instance.setInitData(fieldData, this.onFormSubmit);

    return componentRef;
  }

  private handleNestedComponents(fieldData: BaseField, componentRef: ComponentRef<IBaseFieldComponent>): void {
    const configuredNestedFields = fieldData.nestedField.filter(field => field.isConfigured);

    if (configuredNestedFields.length > 0) {
      const groupComponent = componentRef.instance as IGroupFieldComponent;
      groupComponent.addNestedFields(configuredNestedFields);

      const nestedComponentViewRef = groupComponent.fieldComponents.toArray();

      configuredNestedFields.forEach((field, index) => {
        const nestedComponentInstance = this.runFieldFactory(field, nestedComponentViewRef[index]);
        groupComponent.addNestedComponentRef(nestedComponentInstance, index);
      });
    }
  }
}
