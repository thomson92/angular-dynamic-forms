import { Component, OnInit } from '@angular/core';
import { BaseField } from '../BaseField';

@Component({
  selector: 'app-form-model',
  templateUrl: './form-model.component.html',
  styleUrls: ['./form-model.component.scss']
})
export class FormModelComponent implements OnInit {

  public metaFields: BaseField[];

  ngOnInit(): void {
    this.metaFields = new Array<BaseField>();
    this.metaFields.push(new BaseField());
  }

  public onFieldTemplateConfirmed(event): void {
    console.log('asd');
    this.metaFields.push(new BaseField());
  }
}
