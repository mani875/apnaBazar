import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../../models';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private readonly http: HttpClient) {}
  private PRODUCTS = '/assets/api';

  public getCrouselProduct(): Observable<Product[]> {
    const url = `${this.PRODUCTS}/crouselProduct.json`;
    return this.http.get<Product[]>(url);
  }

  public getProduct(id: string): Observable<Product> {
    const url = `${this.PRODUCTS}/crouselProduct.json`;

    return this.http.get<Product>(url);
  }

  public getProducts(): Observable<Product[]> {
    const url = `${this.PRODUCTS}/products.json`;
    return this.http.get<Product[]>(url);
  }
}
