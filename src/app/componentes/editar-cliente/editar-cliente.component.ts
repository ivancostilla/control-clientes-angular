import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Cliente } from 'src/app/modelo/cliente.model';
import { ClienteServicio } from 'src/app/servicios/cliente.service';

@Component({
  selector: 'app-editar-cliente',
  templateUrl: './editar-cliente.component.html',
  styleUrls: ['./editar-cliente.component.css']
})
export class EditarClienteComponent implements OnInit {

  cliente: Cliente= {
    nombre:'',
    apellido:'',
    email: '',
    saldo: 0
  };
  id: string;

  constructor(
    private clientesServicio: ClienteServicio,
    private flashMessages: FlashMessagesService,
    private router: Router,
    private route: ActivatedRoute,

    ) {}


  ngOnInit(): void {
    //obtenemos el cliente segun id
    this.id= this.route.snapshot.params['id'];
    this.clientesServicio.getCliente(this.id).subscribe(cliente => {
      this.cliente = cliente;
    })
  };
  guardar(f: NgForm){
    if(!f.valid){
      this.flashMessages.show("Por favor llena el formulario correctamente.", {
        cssClass: "alert-danger", timeout: 4000
      })
    } else {
      f.value.id = this.id;
      //modificar cliente:
      this.clientesServicio.modificarCliente(f.value);
      this.router.navigate(["/"]);
    };
  };
  eliminar(){
    if(confirm("seguro que desea eliminar el cliente?")){
      this.clientesServicio.eliminarCliente(this.cliente);
      this.router.navigate(["/"]);
    }
  }
}
