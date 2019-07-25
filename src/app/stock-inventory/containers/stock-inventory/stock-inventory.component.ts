import { Component } from '@angular/core';
import { FormControl, FormGroup, FormArray } from '@angular/forms';
import { Product } from '../../models/product.interface'

@Component({
  selector: 'stock-inventory',
  styleUrls: ['stock-inventory.component.scss'],
  template: `
  <div class="stock-inventory">
    <form [formGroup]="form" (ngSubmit)="onSubmit">
      
      <stock-branch [parent]="form"></stock-branch>
      <stock-selector [parent]="form" [products]="products"></stock-selector>
      <stock-products [parent]="form"></stock-products>
      
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

  form = new FormGroup({
    store: new FormGroup({
      branch: new FormControl(''),
      code: new FormControl('')
    }),
    selector: this.createStock({}),
    stock: new FormArray([
      this.createStock({product_id: 1, quantity: 10}),
      this.createStock({product_id: 3, quantity: 150})
    ])
  });

  createStock(stock) {
    return new FormGroup({
      product_id: new FormControl(parseInt(stock.product_id, 10) || ''),
      quantity: new FormControl(stock.quantity || 10)
    })
  }

  onSubmit() {
    console.log('submit:', this.form.value);
  }
}
