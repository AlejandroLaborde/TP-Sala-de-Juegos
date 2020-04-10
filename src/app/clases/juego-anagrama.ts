import { Juego } from '../clases/juego';

export class JuegoAnagrama extends Juego{

    private palabras: string[] = [ 'palabra', 'anagrama', 'programador', 'auto' , 'casa' ];
    palabraAOrdenar: string;
    private palabraSecreta: string;
    palabraIngresada: string;
    intentos:number;

    constructor ( intentos:number ){

        super('Anagrama', false);
        this.intentos = intentos;
        this.palabraAOrdenar = this.getPalabraAOrdenar();
    }

    public verificar(): boolean {
        if(this.intentos>0){
           
            if(this.palabraIngresada == this.palabraSecreta){
                
                this.gano=true;
            }else{
                this.gano=false;
                this.intentos--;
            }
        }
        return this.gano;
    }
    
    private getPalabraAOrdenar(): string{
        this.palabraSecreta=this.palabras[Math.floor(Math.random() * this.palabras.length)];
        return this.desordenaPalabra(this.palabraSecreta);
    }

    private desordenaPalabra( palabra: string ):string{
        let palabraArray = Array.from(palabra).sort(function(a,b) {return (Math.random() - 0.5)});
        return this.normalizaPalabra(palabraArray);
    }

    private normalizaPalabra( palabraArray:string[] ): string{
        let palabraNormalizada:string = "";
        for(let i= 0 ; i< palabraArray.length; i++){
            console.log(2);
            if((i+1)== palabraArray.length){
                palabraNormalizada+=palabraArray[i];
            }else{
                palabraNormalizada+=palabraArray[i] + "-";
            }
        }
        return palabraNormalizada;
    }

}
