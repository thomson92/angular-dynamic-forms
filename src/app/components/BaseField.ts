import { FormGroup, FormControl } from '@angular/forms';
import { FieldType } from '../constants/field-types';

export class BaseField {



    public fieldType: FieldType;
    public labeltext: string;

    // constructor(labelTxt: string, fieldType: FieldType) {
    //     this.labeltext = labelTxt;
    //     this.fieldType = fieldType;
    // }
}
