import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { map } from 'rxjs/operators';

@Injectable()
export class LoginService{

  constructor(
    private authService: AngularFireAuth,
  ){}

  login(email: string, password:string){
    return new Promise((resolve,reject) => {
      this.authService.signInWithEmailAndPassword(email,password)
      .then(
        datos => resolve(datos),
        error => reject(error)
      )
    });
  };

  //obtener el usuario que inició sesión
  getAuth(){
    return this.authService.authState.pipe(
      map( auth => auth)
    )
  };

  logout(){
    this.authService.signOut();
  }

}
