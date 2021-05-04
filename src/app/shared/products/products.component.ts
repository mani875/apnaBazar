import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Cart } from 'src/app/core/models/cartModel';
import { ProductEntry } from 'src/app/core/models/productEntryModel';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Product } from '@apnaBazar/core';
import { Content } from '@angular/compiler/src/render3/r3_ast';
import { LocalStorageService } from 'ngx-webstorage';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  product: Product[];
  searchProducts: Product[];
  addToCartProduct: Product;
  cartProduct: Product[];
  cart: Cart;
  productEntries: ProductEntry;
  gridLayout = [1, 2, 3];
  num: any = [];
  grid: any = [];
  existing: boolean;
  searchedString: string;
  userForm: FormGroup;
  searchForm: FormGroup;
  category: any = [];
  opened = true;

  constructor(
    public fb: FormBuilder,
    public filter: FormBuilder,
    private readonly route: ActivatedRoute,
    private modalService: NgbModal,
    private localStorageService: LocalStorageService,
    private readonly router: Router
  ) {
    if (!localStorage.getItem('cart')) {
      this.cart = {
        code: '',
        userName: '',
        address: '',
        productEntry: [],
      };
    }
    this.productEntries = {
      product: null,
      quantity: 0,
    };
  }

  ngOnInit(): void {
    this.userForm = this.fb.group({
      name: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(5)]],
    });
    this.searchForm = this.filter.group({
      priceRange: [''],
      categories: [''],
    });
    this.route.data.subscribe((data) => {
      this.product = data.productList;
      this.searchProducts = this.product;
    });

    this.searchProducts.forEach((x) => {
      this.category.push(
        this.product.filter((item) => item.category === this.category)
      );
    });
  }

  open(content): void {
    if (!this.localStorageService.retrieve('userHeader')) {
      this.router.navigateByUrl('/login');
    } else {
      this.modalService
        .open(content, { ariaLabelledBy: 'modal-basic-title' })
        .result.then(
          (product) => {
            // this.closeResult = product;

            if (localStorage.getItem('cart')) {
              this.cart = JSON.parse(localStorage.getItem('cart'));
            }
            this.productEntries.product = product;
            this.addToExisting(this.productEntries.product);
            if (!this.existing) {
              this.productEntries.quantity += 1;
              this.cart.productEntry.push(this.productEntries);
            }
            localStorage.setItem('cart', JSON.stringify(this.cart));
            this.router.navigateByUrl('/cart');
          },
          (reason) => {
            console.log('hello');
          }
        );
    }
  }

  private addToExisting(entry: Product): void {
    this.cart.productEntry.forEach((item) => {
      if (item.product.id === entry.id) {
        this.existing = true;
        item.quantity += 1;
      }
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

  public toggleSidebar(): void {
    this.opened = !this.opened;
  }

  updateFilter(searchString: string): Product[] {
    searchString = searchString.toLowerCase();
    return this.product.filter(
      (item) => item.name.toLowerCase().indexOf(searchString) !== -1
    );
  }

  public get searchString(): string {
    return this.searchedString;
  }
  public set searchString(value: string) {
    this.searchedString = value;
    this.searchProducts = this.searchString
      ? this.updateFilter(this.searchString)
      : this.product;
  }
  search(): void {
    if (
      this.searchForm.controls.priceRange.value &&
      this.searchForm.controls.categories.value
    ) {
      this.searchProducts = this.product
        .filter(
          (item) => item.category === this.searchForm.controls.categories.value
        )
        .filter((item) => {
          if (this.searchForm.controls.priceRange.value === 'less') {
            return item.price <= 500;
          } else if (this.searchForm.controls.priceRange.value === 'medium') {
            return item.price >= 500 && item.price <= 3000;
          } else {
            return item.price >= 3000;
          }
        });
    } else {
      if (this.searchForm.controls.priceRange.value) {
        this.searchProducts = this.product.filter((item) => {
          if (this.searchForm.controls.priceRange.value === 'less') {
            return item.price <= 500;
          } else if (this.searchForm.controls.priceRange.value === 'medium') {
            return item.price >= 500 && item.price <= 3000;
          } else {
            return item.price >= 3000;
          }
        });
      } else {
        this.searchProducts = this.product.filter(
          (item) => item.category === this.searchForm.controls.categories.value
        );
      }
    }
  }
}
