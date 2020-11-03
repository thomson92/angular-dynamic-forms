import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { BaseField } from '../../shared/field-model';
import { BaseFieldComponent } from '../base-field/base-field.component';

@Component({
  selector: 'app-checkbox-field',
  templateUrl: './checkbox-field.component.html',
  styleUrls: ['./checkbox-field.component.scss']
})
export class CheckboxFieldComponent extends BaseFieldComponent implements OnInit, OnDestroy {
  @Input() fieldData: BaseField;

  public ngOnInit(): void {
    super.ngOnInit();
  }

  public ngOnDestroy(): void {
    super.ngOnDestroy();
  }
}
