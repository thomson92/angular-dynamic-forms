import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { BaseField } from '../../shared/field-model';
import { BaseFieldComponent } from '../base-field/base-field.component';

@Component({
  selector: 'app-text-area',
  templateUrl: './text-area.component.html',
  styleUrls: ['./text-area.component.scss']
})
export class TextAreaComponent extends BaseFieldComponent implements OnInit, OnDestroy {
  @Input() fieldData: BaseField;

  public ngOnInit(): void {
    super.ngOnInit();
  }

  public ngOnDestroy(): void {
    super.ngOnDestroy();
  }

  public checkStatus(): void {
    this.checkErrors();
  }
}
