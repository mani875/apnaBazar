import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, ParamMap } from '@angular/router'
import { filter, map, mergeMap } from 'rxjs/operators'
import { Cart } from 'src/app/core/models/cartModel';
import { ProductEntry } from 'src/app/core/models/productEntryModel';
import { NgForm, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

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
value:any='';
userForm: FormGroup;

product:ProductEntry[];
childEntry:ProductEntry;
  constructor(public fb: FormBuilder,private modalService: NgbModal,private readonly router: Router) {     
  }

  ngOnInit(): void {

      this.cart= JSON.parse(localStorage.getItem('cart'));
       this.product=this.cart.productEntry;
       this.userForm = this.fb.group({
        name: ["", [Validators.required]],
        email: ["", [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
        address: ["", [Validators.required,Validators.minLength(10)]],
        postalCode: ["", [Validators.required,Validators.minLength(6),Validators.maxLength(6)]],
        phone: ["", [Validators.required,Validators.minLength(10),Validators.maxLength(10)]]
    });
  }
  subtract(child,i){
    this.num=i;
this.childEntry=child;
this.childEntry.quantity-=1;
localStorage.setItem('cart',JSON.stringify(this.cart));
if(this.childEntry.quantity===0){
  this.delete(this.num);
}
  }
  add(child){
    this.childEntry=child;
    this.childEntry.quantity+=1;
    localStorage.setItem('cart',JSON.stringify(this.cart));
      }
delete(i){
  this.product.splice(i,1);
  localStorage.setItem('cart',JSON.stringify(this.cart));
}
save(userForm:NgForm){
  console.log(userForm.form);
  console.log(JSON.stringify(userForm.value));
}
checkout(){
  localStorage.removeItem('cart');
  this.router.navigateByUrl('/home');
}


open(content) {
  this.modalService.open(content,
 {ariaLabelledBy: 'modal-basic-title'}).result.then((product) => {
    // this.closeResult = product;
    this.checkout();
  }, (reason) => {
 
  });
}
public _opened: boolean = false;
}
