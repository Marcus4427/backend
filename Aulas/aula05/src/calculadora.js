function soma(a, b){
return a+b;
}
module.exports = {soma};

function multiplicacao(a, b){
    return a*b;

}
module.exports = {soma, multiplicacao};
function divisao(a, b){
    if (b === 0) throw Error ("Deu ruim");
    return a / b;
}
module.exports = {soma, multiplicacao, divisao};