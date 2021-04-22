import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/core/models';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  constructor(private readonly route: ActivatedRoute) { }
  product: Product;
  gridLayout=[1,2,3];
  num:any=[];
grid:any=[];
  ngOnInit(): void {
    this.route.data.subscribe(data => {
      this.product = data.productList;
      for(let i=1;i<=data.productList.length;i++){
        if(i%4 !=0){
        this.num.push(data.productList[i-1]);
        }
        else{
       this.grid.push(this.num);
        this.num = [];
        }
        }
    })
  }
  
  public _opened: boolean = false;

  public _toggleSidebar() {
    this._opened = !this._opened;}
}


