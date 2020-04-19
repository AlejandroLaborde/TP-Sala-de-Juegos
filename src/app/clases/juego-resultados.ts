import { Juego } from './juego';

export  class JuegResultados extends Juego {
   
    public nombre = 'Sin Nombre';
    public jugador: string;
    public idJugador: string;
    public gano = false;
  
    constructor(nombre: string ,jugador:string, idJugador:string,gano?: boolean) {
      
        super(nombre,jugador,idJugador,gano);

      
    }
  
    public verificar(): boolean {
        throw new Error("Method not implemented.");
    }

  }
  