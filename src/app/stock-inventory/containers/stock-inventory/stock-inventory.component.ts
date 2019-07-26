import { Component } from '@angular/core';
import { FormBuilder, FormArray, FormGroup } from '@angular/forms';
import { Product } from '../../models/product.interface'

@Component({
  selector: 'stock-inventory',
  styleUrls: ['stock-inventory.component.scss'],
  template: `
  <div class="stock-inventory">
    <form [formGroup]="form" (ngSubmit)="onSubmit">
      
      <stock-branch [parent]="form"></stock-branch>
      <stock-selector [parent]="form" [products]="products" (added)="addStock($event)"></stock-selector>
      <stock-products [parent]="form" (removed)="removeStock($event)"></stock-products>
      
      <div class="stock-inventory__buttons">
        <button 
          type="submit"
          [disabled]="form.invalid"
        >
          Order Stock
        </button>
      </div>
      
      <pre>
        {{form.value | json}}
      </pre>
      
    </form>
  </div>
  `
})

export class StockInventoryComponent {

  products: Product[] = [
    { "id": 1, "price": 2800, "name": "mac book pro"},
    { "id": 2, "price": 200, "name": "iPad"},
    { "id": 3, "price": 400, "name": "iPhone"},
    { "id": 4, "price": 2850, "name": "3mac book pro"},
    { "id": 5, "price": 300, "name": "7mac book pro"}
  ];

  form = this.fb.group({
    store: this.fb.group({
      branch: '',
      code: ''
    }),
    selector: this.createStock({}),
    stock: this.fb.array([
      this.createStock({product_id: 1, quantity: 10}),
      this.createStock({product_id: 3, quantity: 150})
    ])
  });

  constructor(
    private fb: FormBuilder
  ) {

  }

  createStock(stock) {
    return this.fb.group({
      product_id: (parseInt(stock.product_id, 10) || ''),
      quantity: (stock.quantity || 10)
    })
  }

  addStock(stock){
    const control = this.form.get('stock') as FormArray;
    console.log(stock);
    control.push(this.createStock(stock));
  }

  removeStock({group, index}: {group: FormGroup, index: number}) {
    console.log(group, index);
    const control = this.form.get('stock') as FormArray;
    control.removeAt(index);
  }

  onSubmit() {
    console.log('submit:', this.form.value);
  }
}
