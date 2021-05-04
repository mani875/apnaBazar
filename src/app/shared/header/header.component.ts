import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/core/models/userModel';
import { AuthenticationGuard } from 'src/app/components/authentication/authentication.guard';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  userName: string;
  constructor(private authenticationService: AuthenticationGuard) {}
  userData: User;
  heelo: any;

  ngOnInit(): void {
    this.userData = JSON.parse(localStorage.getItem('userHeader'));
    if (this.userData) {
      this.userName = this.userData.name;
    }
    this.heelo = this.authenticationService.isLoggedIn;
  }

  logout(): void {
    localStorage.removeItem('userHeader');
    this.userName = '';
  }
}
