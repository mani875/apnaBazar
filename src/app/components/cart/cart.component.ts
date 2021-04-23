import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, ParamMap } from '@angular/router'
import { filter, map, mergeMap } from 'rxjs/operators'
import { Cart } from 'src/app/core/models/cartModel';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
productCode:string;
cart:Cart;
  constructor(private readonly router: Router,private route: ActivatedRoute) { 
    
      
  }

  ngOnInit(): void {
    
      console.log("product hhhhhhu");
      this.cart= JSON.parse(localStorage.getItem('cart'));
      console.log(this.cart.product.length);
      // this.route.paramMap.subscribe((params : ParamMap)=>{
      // this.productCode=  params.get('productCode'); 
      
      // this.route.data.subscribe(data => {
      //   console.log(data);
      // })
      // })
        
        
       
        
     
  
    
  }

}
