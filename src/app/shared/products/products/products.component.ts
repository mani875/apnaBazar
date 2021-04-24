import { Component, OnInit } from '@angular/core';
import { ActivatedRoute , Router} from '@angular/router';
import { Product } from 'src/app/core/models';
import { NgbModal , ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { ProductEntry } from 'src/app/core/models/productEntryModel';
import { Cart } from 'src/app/core/models/cartModel';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  product: Product;
  addToCartProduct:Product;
  cartProduct:Product[];
  cart:Cart;
  productEntries:ProductEntry;
  gridLayout=[1,2,3];
  num:any=[];
grid:any=[];
  constructor(private readonly route: ActivatedRoute,private modalService: NgbModal, private readonly router: Router) {
   if(!localStorage.getItem('cart')){
    this.cart={
      code: "",
     userName:"",
     address: "",
     productEntry:[]
    };
   }
   this.productEntries={
     product:null,
     quantity:0
   };
    
   }
 
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
  
 
    open(content) {
      this.modalService.open(content,
     {ariaLabelledBy: 'modal-basic-title'}).result.then((product) => {
        // this.closeResult = product;
        if(localStorage.getItem('cart')){
          this.cart=JSON.parse(localStorage.getItem('cart'));
        }
        this.productEntries.product=product;
        this.productEntries.quantity+=1;        
        this.cart.productEntry.push(this.productEntries);
        localStorage.setItem('cart',JSON.stringify(this.cart));
        this.router.navigateByUrl('/cart');
      }, (reason) => {
     console.log("hello");
      });
    }
    
    private getDismissReason(reason: any): string {
      if (reason === ModalDismissReasons.ESC) {
        return 'by pressing ESC';
      } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
        return 'by clicking on a backdrop';
      } else {
        return `with: ${reason}`;
      }
    }
    public _opened: boolean = false;

    public _toggleSidebar() {
      this._opened = !this._opened;}
}


