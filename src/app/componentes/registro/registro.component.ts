import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { LoginService } from 'src/app/servicios/login.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  email: string;
  password: string;

  constructor(
    private router: Router,
    private flashMessagesService: FlashMessagesService,
    private loginService: LoginService,
  ) { }

  ngOnInit(): void {
    //esto es para que una vez estemos logueados la pagina
    //de login ya no se muestre
    this.loginService.getAuth().subscribe(auth => {
      if(auth){
        this.router.navigate(['/'])
      }
    })
  };

  registro(){
    this.loginService.registrarse(this.email,this.password)
    .then( res => {
      this.router.navigate(['/'])
    })
    .catch(
      error => {
        this.flashMessagesService.show(error.message,{
          cssClass: 'alert-danger', timeout: 4000
        })
      }
    )
  }

}
