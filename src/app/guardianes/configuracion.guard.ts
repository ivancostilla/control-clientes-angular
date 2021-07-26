import { ConfiguracionServicio } from 'src/app/servicios/configuracion.service';
import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ConfiguracionGuard implements CanActivate{
  constructor(
    private router: Router,
    private configuracionServicio: ConfiguracionServicio
  ){}

  canActivate(): Observable<boolean>{
    //si en configuracion ponemos "SI" entonces retorna true
    //y podemos ver el componente de registro
    //y si ponemos "NO" entonces nos redirige a la pantalla de login
    return this.configuracionServicio.getConfiguracion().pipe(
      map(configuracion => {
        if(configuracion.permitirRegistro){
          return true
        } else {
          this.router.navigate(['/login']);
          return false;
        }
      })
    )
  }
}
