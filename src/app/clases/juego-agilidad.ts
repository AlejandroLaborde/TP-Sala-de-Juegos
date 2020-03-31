export class JuegoAgilidad {

    primerNumero: number;
    segundoNumero: number;
    numeroIngresado: number;
    valorIngresado: number;
    operador: string;
    private resultado: number;
    gano: boolean;
    

    constructor(){
      
        this.seteaValoresJuego(this.getRandomOperator());
        
    }

    seteaValoresJuego( operador: string){

        this.gano=false;
        this.operador = operador;
        if(operador === "/"){
            do{
                this.segundoNumero = this.getRandomInt(0,10);
            }while(this.segundoNumero==0)
        }else{
            this.segundoNumero = this.getRandomInt(0,10);
        }
        this.primerNumero = this.getRandomInt(0,10);
        this.resultado = this.getResultadoOperacion(this.primerNumero,this.segundoNumero,operador);
    }

    getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }

    getRandomOperator() {
        const operators = ["+","-","*","/"];
        return operators[Math.floor(Math.random() * operators.length)];
    }

    getResultadoOperacion( a: number, b: number, operador: string ){

        switch(operador){
            case "+": 
                return a + b;
            case "-":
                return a - b;
            case "*":
                return a * b;
            case "/":
                return a / b;
        }
    }


    verificarSiGano(): boolean{

        if(this.valorIngresado == this.resultado){
            this.gano=true;
            return true;
        }else
        {
            this.gano=false;
            return false;
        }
    }

}
