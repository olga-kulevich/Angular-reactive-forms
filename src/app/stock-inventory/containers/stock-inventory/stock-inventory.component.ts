import {Component, OnInit} from '@angular/core';
import { FormBuilder, FormArray, FormGroup } from '@angular/forms';
import { Product, Item } from '../../models/product.interface';

import {forkJoin} from "rxjs";

import {StockInventoryService} from "../../services/stock-inventory.service";

@Component({
  selector: 'stock-inventory',
  styleUrls: ['stock-inventory.component.scss'],
  template: `
  <div class="stock-inventory">
    <form [formGroup]="form" (ngSubmit)="onSubmit">
      
      <stock-branch [parent]="form"></stock-branch>
      
      <stock-selector 
        [parent]="form" 
        [products]="products" 
        (added)="addStock($event)">
      </stock-selector>
      
      <stock-products 
        [parent]="form" 
        [map]="productMap"
        (removed)="removeStock($event)">
      </stock-products>
      
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

export class StockInventoryComponent implements OnInit{

  products: Product[];

  productMap: Map<number, Product>;
  // {1: Product}

  form = this.fb.group({
    store: this.fb.group({
      branch: '',
      code: ''
    }),
    selector: this.createStock({}),
    stock: this.fb.array([])
  });

  constructor(
    private fb: FormBuilder,
    private stockService: StockInventoryService
  ) {}

  ngOnInit() {
    const cart = this.stockService.getCartItems();
    const products = this.stockService.getProducts();

    forkJoin(cart, products).
    subscribe(([cart, products]: [Item[], Product[]]) => {
      const myMap = products
        .map<[number, Product]>(product => [product.id, product]);

        this.productMap = new Map<number, Product>(myMap);
        //{1: {}}

        this.products = products;

        cart.forEach(item => this.addStock(item));
    });
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
