export interface Cliente{
  //acá declaramos los mismos datos que tiene la bbdd
  //el ? indica que soon datos opcionales
  id?:string;
  nombre?:string;
  apellido?:string;
  email?:string;
  saldo?:number;
}
