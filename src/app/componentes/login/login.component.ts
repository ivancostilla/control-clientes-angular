import { LoginService } from './../../servicios/login.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string;
  password: string;
  constructor(
    private router: Router,
    private flashMessagesService: FlashMessagesService,
    private loginService: LoginService,
  ) { }

  ngOnInit(): void {
  }

  login(){
    this.loginService.login(this.email,this.password)
    .then(res => {
      this.router.navigate(["/"])
    })
    .catch(error => {
      this.flashMessagesService.show(error.message,{
        cssClass: "alert-danger", timeout: 4000
      });
    });
  }

}
