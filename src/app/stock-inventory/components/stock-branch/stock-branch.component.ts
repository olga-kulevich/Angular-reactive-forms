import {Component, Input} from "@angular/core";
import {FormGroup} from "@angular/forms";

@Component({
  selector: 'stock-branch',
  styleUrls: ['stock-branch.component.scss'],
  template: `
    <div [formGroup]="parent">
      <div formGroupName="store">
        <input
          type="text"
          placeholder="Branch ID"
          formControlName="branch">
        <div
          class="error"
          *ngIf="parent.get('store.branch').hasError('required') && parent.get('store.branch').touched">
          Branch ID is Required
        </div>
        
        <input
          type="text"
          placeholder="Manager ID"
          formControlName="code">
        <div 
          class="error" 
          *ngIf="parent.get('store.code').hasError('required') && parent.get('store.code').touched">
          Manager ID is Required
        </div>
        
      </div>
    </div>
  `
})

export class StockBranchComponent {
  @Input()
  parent: FormGroup;

  /*
  required(name: string) {
    return (
      this.parent.get(`store.${name}`).hasError('required') &&
      this.parent.get(`store.${name}`).touched
    )
  }*/

}
