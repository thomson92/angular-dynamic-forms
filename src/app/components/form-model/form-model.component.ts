import { Component, OnInit } from '@angular/core';
import { BaseField } from '../shared/field-model';
import { FormModelProviderService } from '../../services/form-model-provider.service';
import { FieldType } from 'src/app/constants/field-types';

@Component({
  selector: 'app-form-model',
  templateUrl: './form-model.component.html'
})
export class FormModelComponent implements OnInit {

  private static defaultRootText = 'Dynamic form demo';
  public formModelRoot: BaseField;

  constructor(private formModelProvider: FormModelProviderService) {}

  ngOnInit(): void {
    this.formModelRoot = new BaseField(null, true);
    this.formModelRoot.setFieldType(FieldType.group);
    this.formModelRoot.labeltext = FormModelComponent.defaultRootText;
    this.onModelUpdate();
  }

  public onModelUpdate(): void {
    this.formModelProvider.newModelEvent(this.formModelRoot);
  }
}
