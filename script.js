const add(n1, n2){
return Math.round(n1 + n2);
}
const subtract(n1, n2){
return Math.round(n1 - n2);
}
const multiply(n1, n2){
return Math.round(n1 * n2);
}
const divide(n1, n2){
    if (n2 === 0){
        return "ERR";
    }
    else {
        return Math.round(n1 / n2);
    }
}


const operate(){
     let n1 = 0;
     let n2 = 0;
     let operator = 0;
     //manejarlo todo con pulsaciones de botones

     //guardar en memoria lo que se vaya pulsando
     //diferenciar el array de n1, con el operator, con el array de n2

     //un boton de CLEAR que resetee todas las memorias
     


     //cuando se pulsa "=" se llama a la operacion que toque y se genera resultado
}