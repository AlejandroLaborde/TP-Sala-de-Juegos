import { Juego } from './juego';

export class JuegoPiedraPapelTijera extends Juego {

    static opciones = ['Piedra','Papel','Tijera'];

    

    constructor( jugador: string){
        super('PPT',false,jugador);
        
    }



    public verificar(): boolean {
        throw new Error("Method not implemented.");
    }
}
