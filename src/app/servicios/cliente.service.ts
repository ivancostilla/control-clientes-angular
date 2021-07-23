import { Injectable } from "@angular/core";
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from "@angular/fire/firestore";
import { Observable } from "rxjs";
import { Cliente } from "../modelo/cliente.model";
import { map } from 'rxjs/operators';

@Injectable()
export class ClienteServicio{
  clientesColeccion: AngularFirestoreCollection<Cliente>;
  clienteDoc: AngularFirestoreDocument<Cliente>;
  clientes: Observable<Cliente[]>;
  cliente: Observable<Cliente>;

  constructor(private db:AngularFirestore){
    //acá traemos la coleccion de clientes creada en firstore
    //el parametro ref es para ordenarlo,
    //en este caso por nombre y de manera ascendente.
    this.clientesColeccion =
     db.collection('clientes', ref => ref.orderBy('nombre','asc'));
  };

  //metodo para obtener los clientes
  getClientes(): Observable<Cliente[]>{
    //obtener clientes
    this.clientes = this.clientesColeccion.snapshotChanges().pipe(
      //acá iteramos cada uno de los objetos que hay en firestore
      //primero obtenemos todos los clientes y los mapeamos:
      map( cambios => {
        return cambios.map( accion => {
          //obtenemos todos los datos del cliente:
          const datos = accion.payload.doc.data() as Cliente;
          //obtenemos el id del cliente:
          datos.id = accion.payload.doc.id;
          return datos
        });
      })
    )
    return this.clientes;
  };

  agregarCliente(cliente: Cliente){
    this.clientesColeccion.add(cliente)
  };
  getCliente(id: string){
    this.clienteDoc = this.db.doc<Cliente>(`clientes/${id}`);
    this.cliente = this.clienteDoc.snapshotChanges().pipe(
      map( accion => {
        if(accion.payload.exists === false){
          return null;
        } else {
          const datos = accion.payload.data() as Cliente;
          datos.id = accion.payload.id;
          return datos as any;
        }
      })
    );
      return this.cliente;
  };
  modificarCliente(cliente: Cliente){
    this.clienteDoc = this.db.doc(`clientes/${cliente.id}`);
    this.clienteDoc.update(cliente);
  };
  eliminarCliente(cliente: Cliente){
    this.clienteDoc = this.db.doc(`clientes/${cliente.id}`);
    this.clienteDoc.delete();
  }

}
