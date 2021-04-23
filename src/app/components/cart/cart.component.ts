import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, ParamMap } from '@angular/router'
import { filter, map, mergeMap } from 'rxjs/operators'
import { Cart } from 'src/app/core/models/cartModel';
import { ProductEntry } from 'src/app/core/models/productEntryModel';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
productCode:string;
cart:Cart;
num:number;
price:number;

product:ProductEntry[];
childEntry:ProductEntry;
  constructor(private readonly router: Router,private route: ActivatedRoute) {     
  }

  ngOnInit(): void {

      this.cart= JSON.parse(localStorage.getItem('cart'));
       this.product=this.cart.productEntry;
       
  }
  subtract(child,i){
    this.num=i;
this.childEntry=child;
this.childEntry.quantity-=1;
if(this.childEntry.quantity===0){
  this.delete(this.num);
}
  }
  add(child){
    this.childEntry=child;
    this.childEntry.quantity+=1;
      }
delete(i){
  this.product.splice(i,1);
  localStorage.setItem('cart',JSON.stringify(this.cart));
}
}
