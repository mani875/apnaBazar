import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { Product } from '@apnaBazar/core';
import { ProductService } from 'src/app/core/services/product/product.service';

@Injectable({
  providedIn: 'root'
})

export class ProductResolver implements Resolve<Product[]> {
  constructor(private productService: ProductService) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Product[]> {
    return this.productService.getProducts();
  }
}
