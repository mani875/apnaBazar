import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cart } from 'src/app/core/models/cartModel';
import { ProductEntry } from 'src/app/core/models/productEntryModel';
import { NgForm, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  productCode: string;
  cart: Cart;
  num: number;
  totalPrice: number;
  value: any;
  userForm: FormGroup;
  product: ProductEntry[];
  childEntry: ProductEntry;
  constructor(
    public fb: FormBuilder,
    private modalService: NgbModal,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.totalPrice = 0;
    this.cart = JSON.parse(localStorage.getItem('cart'));
    this.product = this.cart.productEntry;
    this.userForm = this.fb.group({
      name: ['', [Validators.required]],
      email: [
        '',
        [
          Validators.required,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
        ],
      ],
      address: ['', [Validators.required, Validators.minLength(10)]],
      postalCode: [
        '',
        [Validators.required, Validators.minLength(6), Validators.maxLength(6)],
      ],
      phone: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(10),
        ],
      ],
    });
    this.cart.productEntry.forEach((item) => {
      this.totalPrice += item.product.price * item.quantity;
    });
  }
  subtract(child, i): void {
    this.num = i;
    this.childEntry = child;
    this.childEntry.quantity -= 1;
    localStorage.setItem('cart', JSON.stringify(this.cart));
    this.totalPrice -= this.childEntry.product.price;
    if (this.childEntry.quantity === 0) {
      this.delete(child, this.num);
    }
  }
  add(child): void {
    this.childEntry = child;
    this.childEntry.quantity += 1;
    this.totalPrice =
      Number(this.childEntry.product.price) + Number(this.totalPrice);
    localStorage.setItem('cart', JSON.stringify(this.cart));
  }

  delete(child, i): void {
    this.childEntry = child;
    this.totalPrice =
      Number(this.totalPrice) -
      Number(this.childEntry.product.price * this.childEntry.quantity);
    this.product.splice(i, 1);
    localStorage.setItem('cart', JSON.stringify(this.cart));
  }
  save(userForm: NgForm): void {
    console.log(userForm.form);
    console.log(JSON.stringify(userForm.value));
  }
  checkout(): void {
    localStorage.removeItem('cart');
    this.router.navigateByUrl('/home');
  }

  open(content): void {
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (product) => {
          this.checkout();
        },
        (reason) => {
          this.checkout();
        }
      );
  }
}
