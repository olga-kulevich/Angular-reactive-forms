import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {map, catchError} from "rxjs/operators";
import { throwError, Observable } from 'rxjs';

import {Item, Product} from "../models/product.interface";

@Injectable()

export class StockInventoryService {
  constructor(
    private http: HttpClient
  ) {}

  getCartItems(): Observable<Item[]> {
    return this.http
      .get('http://localhost:3000/cart')
      .pipe(
        map((response: any) => response),
        catchError ((error: any) =>
          throwError(error)
        )
      )
  }

  getProducts(): Observable<Product[]> {
    return this.http
      .get('http://localhost:3000/products')
      .pipe(
        map((response: any) => response),
        catchError ((error: any) => {
          //console.log(error);
          return throwError(error);
        }
        )
      )
  }
}
