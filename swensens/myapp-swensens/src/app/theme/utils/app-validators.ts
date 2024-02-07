import { UntypedFormGroup, UntypedFormControl } from '@angular/forms';

export function emailValidator(control: UntypedFormControl): {[key: string]: any} | null {
    var emailRegexp = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/;    
    if (control.value && !emailRegexp.test(control.value)) {
        return {invalidEmail: true};
    }
    return null;
}