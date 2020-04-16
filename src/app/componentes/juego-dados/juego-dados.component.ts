import { Component, OnInit } from '@angular/core';
import { JuegoDados } from '../../clases/juego-dados';

@Component({
  selector: 'app-juego-dados',
  templateUrl: './juego-dados.component.html',
  styleUrls: ['./juego-dados.component.css']
})
export class JuegoDadosComponent implements OnInit {

  nuevoJuego: JuegoDados;
  
  //Variables de control de html
  deNuevo: Boolean;
  tirarDados: boolean;
  plantarse: boolean;

  estadoJugador: string;
  
  Mensajes: string;


  constructor(
              ){
    this.nuevoJuego = new JuegoDados();
    this.deNuevo = false
    this.tirarDados = true;    
  }

    

  Desarrollo(){
    
    
    this.nuevoJuego.TirarDadosUsuario();
    
    if(this.nuevoJuego.verificar() )
    {
        //Aca puede seguir tirando o se planta por decision.
        this.plantarse = true;
        console.log("puede seguir jugando");
    }
    else
        {
            switch(this.nuevoJuego.estadoUsuario)
            {
                    case "sinTiros":            
            //      -Aca debera llamar a jugar contra la IA.
                    this.tirarDados = false;
                    this.Resolucion();
                    
                    break;

                    case "perdio":
                    this.PerdioUsuario();      
                    break;
              } 
        }
    
    /*  
      -Pierde
          -Llama a la funcion que indica que el usuario pierde.   
    */
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
    this.nuevoJuego.gano=false;
    
    //console.log("Perdio el usuario");
    this.MostarMensaje("Perdiste", false);



    
    this.plantarse = false;
    this.tirarDados = false;
    this.deNuevo = true;
    
  }

  GanoUsuario(){
    
    //console.log("Gano el usuario");
    this.MostarMensaje("Ganaste",true);
    this.plantarse = false;
    this.tirarDados = false;
    this.deNuevo = true;
    this.nuevoJuego.gano=true;
    
 
  }


  ngOnInit() {
    
  }

  
  MostarMensaje(mensaje:string="este es el mensaje",ganador:boolean=false) {
   // this.tirarDados = false;
    this.Mensajes=mensaje;    
    var x = document.getElementById("snackbar");
    if(ganador)
      {
        x.className = "show Ganador";
      }else{
        x.className = "show Perdedor";
      }
    var modelo=this;
    setTimeout(function(){ 
      x.className = x.className.replace("show", "");
     // this.tirarDados = true;
      //this.deNuevo = false;
     }, 3000);
    //console.info("objeto",x);
  
  }  

}
