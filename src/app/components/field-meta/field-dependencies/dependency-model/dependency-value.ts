import { DependencyBase } from './dependency-base';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { FieldUtils } from '../../../shared/field-utils';

export class ValueDependency extends DependencyBase {

    public isDependencyConditionMet(): boolean {
        const result = this.valueChecker(this.dependencyFieldRef.getFormControlRef());
        return result;
    }

    private valueChecker(control: AbstractControl): boolean {
        let result: boolean;

        if (control instanceof FormControl) {
            result = this.simpleControlValueChecker(control);
        } else {
            result = this.groupControlValueChecker(control as FormGroup);
        }

        return result;
    }

    private simpleControlValueChecker(control: FormControl): boolean {
        const resultValue: boolean = this.isNotNegation ? true : false;
        const result = control.value ? resultValue : !resultValue;
        return result;
    }

    private groupControlValueChecker(group: FormGroup): boolean {
        const resultValue: boolean = this.isNotNegation ? true : false;
        const stopSearchingOnValueFound = true;

        const controlValue = FieldUtils.searchDeepFormGroup(group, stopSearchingOnValueFound, (control): boolean => {
            return FieldUtils.controlValueCheck(control);
        });

        const result = controlValue ? resultValue : !resultValue;
        return result;
    }
}
