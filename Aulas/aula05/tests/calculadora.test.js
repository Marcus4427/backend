const calculadora = require('../src/calculadora.js');
test("2 + 2 = 4?", function(){
expect(2 + 2).toBe(4);
});

test("2 + 0 = 2?", function(){
    expect(2 + 0).toBe(2);
});

test("2 + 2 = 4?", function(){
    expect(calculadora.soma(2, 2)).toBe(4);
});

test("2 * 2 = 4?", function(){
    expect(calculadora.multiplicacao(2, 2)).toBe(4);
});

test("Multiplica inteiro com inteiro da inteiro?", function(){
    expect(calculadora.multiplicacao()).toBeDefined();
    expect(calculadora.multiplicacao(2, 2)).toBe(4);
    expect(calculadora.multiplicacao(2, 3)).toBe(6);
    expect(calculadora.multiplicacao(2, 5)).toBe(10);
});

test("Não pode dividir por zero", function(){
    expect(calculadora.divisao).toBeDefined();
    expect(() => calculadora.divisao(2, 0)).toThrow("Divisao por zero");
})


