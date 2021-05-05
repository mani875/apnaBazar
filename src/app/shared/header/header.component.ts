import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/core/models/userModel';
import { AuthenticationGuard } from 'src/app/components/authentication/authentication.guard';
import { UserService } from 'src/app/core/services/user/user.service';
import { LocalStorageService } from 'ngx-webstorage';
import { TranslateService } from '@ngx-translate/core';
import { Cart } from 'src/app/core/models/cartModel';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  userName: string;
  constructor(
    private userService: UserService,
    private localStorageService: LocalStorageService,
    private translateService: TranslateService
  ) {}
  userData: User;
  cart: Cart;
  cartLength = 0;

  ngOnInit(): void {
    if (this.localStorageService.retrieve('userHeader')) {
      this.userData = JSON.parse(
        this.localStorageService.retrieve('userHeader')
      );
      this.userName = this.userData.name;
    }
    if (this.localStorageService.retrieve('cart')) {
      this.cart = JSON.parse(this.localStorageService.retrieve('cart'));
      this.cartLength = this.cart.productEntry.length;
    }
    this.userService.isUserLoggedIn().subscribe((item) => {
      if (item) {
        this.userData = JSON.parse(item);
        if (this.userData) {
          this.userName = this.userData.name;
        }
      }
    });
    this.userService.userCurrentCart().subscribe((item) => {
      if (item) {
        this.cart = JSON.parse(item);
        this.cartLength = this.cart.productEntry.length;
      }
    });
    this.cart = JSON.parse(this.localStorageService.retrieve('userHeader'));
  }

  logout(): void {
    this.localStorageService.clear('userHeader');
    this.userName = '';
  }
  changeLanguage(lang: string): void {
    this.translateService.use(lang === 'en' || lang === 'hi' ? lang : 'en');
  }
}
