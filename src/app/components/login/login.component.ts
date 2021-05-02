import { Component, OnInit } from '@angular/core';
import { NgForm, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { UserService } from 'src/app/core/services/user/user.service';
import { User } from 'src/app/core/models/userModel';
import { Router } from '@angular/router';
import { HeaderComponent } from 'src/app/shared/header/header.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
userName:string='';
password:string='';
error:boolean;
users:User[];
userData:User;
  constructor(public fb: FormBuilder,private userService: UserService,private readonly router:Router,private header:HeaderComponent) { }
  userForm: FormGroup;
  ngOnInit(): void {
    this.userForm = this.fb.group({
      name: ["", [Validators.required]],
      password: ["", [Validators.required, Validators.minLength(5)]]
  });
  this.userData=JSON.parse(localStorage.getItem('userHeader'));
  }
  save(){
    this.userName=this.userForm.controls.name.value;
    this.password=this.userForm.controls.password.value;
    this.userService.getUsers().subscribe(data=>{
     data.forEach(child=>{
       if(child.userName=== this.userName && child.password===this.password){
         localStorage.setItem('userHeader',JSON.stringify(child));       
        this.router.navigateByUrl("products");
        this.error=false;
       }
       else{
         this.error=true;
       }
     })
    });
    
  }
}
