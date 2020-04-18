import { Component, OnInit } from '@angular/core';
import { JuegoDados } from '../../clases/juego-dados';
import Swal from 'sweetalert2';
import { Jugador } from '../../clases/jugador';
import { JugadoresService } from '../../servicios/jugadores.service';

@Component({
  selector: 'app-juego-dados',
  templateUrl: './juego-dados.component.html',
  styleUrls: ['./juego-dados.component.css']
})
export class JuegoDadosComponent implements OnInit {

  nuevoJuego: JuegoDados;
  
  tirarDados: boolean;
  plantarse: boolean;
  visibilidadComenzar = true;
  estadoJugador: string;

  dado1="../../../assets/imagenes/1.png";
  dado2="../../../assets/imagenes/1.png";
  
  


  constructor( private jugadorServices:JugadoresService){
    this.nuevoJuego = new JuegoDados(this.jugadorServices.getUsuarioActual(),this.jugadorServices.getIdActual());
    this.tirarDados = true;    
  }

  
  Desarrollo(){
    this.nuevoJuego.TirarDadosUsuario();
    if(this.nuevoJuego.verificar() )
    {
        this.plantarse = true;
        console.log("puede seguir jugando");

    }
    else
        {
          switch(this.nuevoJuego.estadoUsuario)
          {
            case "sinTiros":            
            this.tirarDados = false;
            this.Resolucion();
            
            break;

            case "perdio":
            this.PerdioUsuario();      
            break;
          } 
        }
        this.cambiaImagenDadosUsuario();

  }

  Resolucion(){
    
    this.nuevoJuego.verificarIA();
   
    switch(this.nuevoJuego.estadoIA)
    {
      case "IA gano":
      this.PerdioUsuario();
      break;

      case "sinTiros":            
      this.GanoUsuario();
      break;

      case "IA perdio":
      this.GanoUsuario();      
      break;
    } 
  }

  PerdioUsuario(){
    
    Swal.fire({
      icon: "error",
      iconHtml:'<i class="fa fa-thumbs-down"></i>',
      title: 'Oops!! has perdido! La máquina tuvo mejor suerte',
      text: "No te desanimes! Seguí intentando!"

    }).then(()=>{
      this.jugadorServices.updateJugador(this.nuevoJuego.idJugador,this.nuevoJuego.gano);
      this.visibilidadComenzar=true;
      this.plantarse = false;
      this.tirarDados = false;
    })
    
  }

  GanoUsuario(){
    Swal.fire({
      icon:'success',
      iconHtml:'<i class="fa fa-thumbs-up"></i>',
      title: 'Ganaste!!! Bien hecho! ',

    }).then(()=>{
      this.jugadorServices.updateJugador(this.nuevoJuego.idJugador,this.nuevoJuego.gano);
      this.visibilidadComenzar=true;
      this.plantarse = false;
      this.tirarDados = false;
      
    })
  }


  ngOnInit() {
    
  }

  comenzar(){
    this.nuevoJuego = new JuegoDados(this.jugadorServices.getUsuarioActual(),this.jugadorServices.getIdActual());
    this.visibilidadComenzar = false
    this.tirarDados = true;    
  }

  

  cambiaImagenDadosUsuario(){

    this.dado1='../../../assets/imagenes/'+ this.nuevoJuego.primerDadoUsuario +'.png';
    this.dado2='../../../assets/imagenes/'+ this.nuevoJuego.segundoDadoUsuario +'.png';

  }

}
