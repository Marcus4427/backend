const { calcularMediaAluno } = require('../src/calcularMediaAluno');
test("deve lançar erro quando a1 ou a2 estiverem indefinidos", () => {
    expect(() => calcularMediaAluno(undefined, 5)).toThrow("Notas a1 ou a2 não informadas");
    expect(() => calcularMediaAluno(5, undefined)).toThrow("Notas a1 ou a2 não informadas");
  });

  test("deve lançar erro quando a1 ou a2 forem negativos", () => {
    expect(() => calcularMediaAluno(-1, 5)).toThrow("Notas a1 ou a2 não podem ser negativas");
    expect(() => calcularMediaAluno(5, -1)).toThrow("Notas a1 ou a2 não podem ser negativas");
  });
  test("deve calcular média base quando a3 não é informada", () => {
    expect(calcularMediaAluno(8, 7)).toBeCloseTo(7.4);
  });
  test("deve lançar erro quando a3 for negativa", () => {
    expect(() => calcularMediaAluno(8, 7, -1)).toThrow("Nota a3 não pode ser negativa");
  });
  test("deve calcular média com a3 quando melhor combinação é a1 com a3", () => {
    expect(calcularMediaAluno(8, 5, 9)).toBeCloseTo(8.6);
  });
  test("deve calcular média com a3 quando melhor combinação é a3 com a2", () => {
    expect(calcularMediaAluno(5, 8, 9)).toBeCloseTo(8.6);
  });