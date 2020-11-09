import { FieldType } from 'src/app/constants/field-types';
import { FormGroup, ValidatorFn, Validators, FormControl, ValidationErrors, AbstractControl } from '@angular/forms';

export class FieldUtils {
    public static getRequiredValidaton(fieldType: FieldType): ValidatorFn {

        let validator: ValidatorFn = Validators.nullValidator;

        switch (fieldType) {
            case FieldType.checkbox:
                validator = Validators.requiredTrue;
                break;

            case FieldType.group:
                validator = FieldUtils.groupRequiredValidator();
                break;

            default:
                validator = Validators.required;
                break;
        }

        return validator;
    }

    public static groupRequiredValidator(): ValidatorFn {
        return (group: FormGroup): ValidationErrors => {

            let error = null;
            const stopSearchingOnValueFound = true;

            const hasAnyValue = FieldUtils.searchDeepFormGroup(group, stopSearchingOnValueFound, (control): boolean => {
                const valueCheckResult = FieldUtils.controlValueCheck(control);
                return valueCheckResult;
            });

            if (!hasAnyValue) {
                error = { required: true };
            }

            return error;
        };
    }

    // no support for form array here
    public static searchDeepFormGroup(group: FormGroup, stopSearchingOnValueFound: boolean,
                                      comparisonFunc: (control: FormControl) => boolean): boolean {

        let result: boolean;

        Object.keys(group.controls).forEach(controlName => {

            if (result === stopSearchingOnValueFound) {
                return result;
            }

            const control = group.controls[controlName];
            if (control instanceof FormGroup) {
                result = FieldUtils.searchDeepFormGroup(control, stopSearchingOnValueFound, comparisonFunc);
            } else {
                result = comparisonFunc(control as FormControl);
            }
        });

        return result;
    }

    public static controlValueCheck(control: AbstractControl): boolean {
        if (control.value) {
            return true;
        } else {
            return false;
        }
    }
}
