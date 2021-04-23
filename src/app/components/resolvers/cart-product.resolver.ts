import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { ProductService } from 'src/app/core/services/product/product.service';
import { Product } from 'src/app/core/models';

@Injectable({
  providedIn: 'root'
})
export class CartProductResolver implements Resolve<Product> {
  constructor(private readonly productService: ProductService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Product> {
    const productId = route.paramMap.get('productCode');
    console.log("product hu"+productId);
    console.log(this.productService.getProduct(productId != null ? productId : ""));
    return this.productService.getProduct(productId != null ? productId : "");
  }
}
