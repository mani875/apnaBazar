import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../../models';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private readonly http: HttpClient) { }
  private CROUSEL_PRODUCTS = "/assets/api";

  public getCrouselProduct():Observable<Product[]>{
    const url = `${this.CROUSEL_PRODUCTS}/crouselProduct.json`;
    console.log("in service");
    console.log(url);
    console.log(this.http.get<Product[]>(url));
    return this.http.get<Product[]>(url);
  }
}

