import {AbstractControl} from "@angular/forms";

export class StockValidators {
  static checkBranch(control: AbstractControl) {
    const regexp = /^[a-z]\d{3}$/i;
    //A123
    const valid = regexp.test(control.value);
    return valid ? null : {invalidBranch: true};
  }
}
