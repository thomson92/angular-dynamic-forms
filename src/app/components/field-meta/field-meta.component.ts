import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FieldType } from '../../constants/field-types';
import { BaseField } from '../BaseField';
import { v4 as uuidv4, NIL as NIL_UUID } from 'uuid';

@Component({
  selector: 'app-field-meta',
  templateUrl: './field-meta.component.html',
  styleUrls: ['./field-meta.component.scss']
})
export class FieldMetaComponent {

  @Input() public fieldIndex: number;
  @Input() public fieldMeta: BaseField;

  @Output() public newFieldAdded = new EventEmitter<boolean>();

  public fieldTypes = FieldType;
  public isConfirmed = false;
  public id = 123;
  // public id: number = NIL_UUID;

  public add(): void {
    this.isConfirmed = true;
    this.newFieldAdded.emit(true);
    this.id = 123;
    // this.id = uuidv4();
    // emitt event
    // add id
  }
}
