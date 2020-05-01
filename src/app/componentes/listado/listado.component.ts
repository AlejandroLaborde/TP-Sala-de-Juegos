import { Component, OnInit } from '@angular/core';
import { JuegoServiceService } from '../../servicios/juego-service.service';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.css']
})
export class ListadoComponent implements OnInit {


  public listadoJuegos: Array<any>;

  constructor(private juegoServices:JuegoServiceService ) {
    this.juegoServices.getJuegos().subscribe( resp=>{
      this.listadoJuegos=resp;
    })
  }
  
  ngOnInit() {
    
  }

  llamaService(){
  
  }

  llamaServicePromesa(){
    console.log("llamaServicePromesa");
    
  }
}
