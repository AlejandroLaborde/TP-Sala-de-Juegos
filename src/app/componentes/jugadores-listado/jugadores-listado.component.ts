import { Component, OnInit } from '@angular/core';
import { JugadoresService } from '../../servicios/jugadores.service';
@Component({
  selector: 'app-jugadores-listado',
  templateUrl: './jugadores-listado.component.html',
  styleUrls: ['./jugadores-listado.component.css']
})
export class JugadoresListadoComponent implements OnInit {

  listado:any
  miJugadoresServicio:JugadoresService
  
    constructor(private serviceJugadores:JugadoresService) {
      this.TraerTodos();
    }
    

  ngOnInit() {




    
  }


  TraerTodos(){
    this.serviceJugadores.getJugadores().subscribe(datos=>{
      this.listado=datos;
      console.log(datos);
    },errores=>{
      console.log(errores);
    })
  }

  TraerGanadores(){
    console.log("ganadores");
    this.serviceJugadores.getGanadores().subscribe(datos=>{
      this.listado=datos;
      console.log(datos);

    },errores=>{
      console.log(errores);
    })
  }

  TraerPerdedores(){
    this.serviceJugadores.getPerdedores().subscribe(datos=>{
      this.listado=datos;
      console.log(datos);
      console.log("volvio");
    },errores=>{
      console.log(errores);
    })
  }

}
