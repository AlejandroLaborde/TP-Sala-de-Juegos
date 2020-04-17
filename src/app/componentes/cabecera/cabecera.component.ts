import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cabecera',
  templateUrl: './cabecera.component.html',
  styleUrls: ['./cabecera.component.css']
})
export class CabeceraComponent implements OnInit {

  logueado=false;
  constructor() { 

  }

  ngOnInit() {
    if(localStorage.getItem('usuario')=='admin'){
      this.logueado=true;
    }
  }

  logOut(){
    localStorage.removeItem('usuario');
  }

}
