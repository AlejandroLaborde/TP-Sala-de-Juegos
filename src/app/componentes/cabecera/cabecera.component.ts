import { Component, OnInit } from '@angular/core';
import { JugadoresService } from '../../servicios/jugadores.service';

@Component({
  selector: 'app-cabecera',
  templateUrl: './cabecera.component.html',
  styleUrls: ['./cabecera.component.css']
})
export class CabeceraComponent implements OnInit {

  logueado=false;
  constructor(public jugadoresService:JugadoresService) { 

  }

  ngOnInit() {
    this.logueado=this.jugadoresService.logueado();
  }

  logOut(){
    this.jugadoresService.logOut() ;
 }

}
