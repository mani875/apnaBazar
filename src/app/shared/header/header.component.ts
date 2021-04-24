import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/core/models/userModel';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor() { }
  userData:User;
  userName:string
  ngOnInit(): void {
    this.userData=JSON.parse(localStorage.getItem('userHeader'));
   this.userName= this.userData.name;
  }

  logout(){
    localStorage.removeItem('userHeader');
    this.userName="";
  }
}
