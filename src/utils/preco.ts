// Só dígitos, com vírgula ou ponto opcional seguido de 1 ou 2 casas.
// Rejeita sinal, letras, espaços e mais de duas casas decimais.
const FORMATO_PRECO = /^\d+([.,]\d{1,2})?$/;

export function validarPreco(texto: string): string | null {
  if (texto === '') {
    return 'Informe o preço.';
  }
  if (!FORMATO_PRECO.test(texto)) {
    return 'Preço inválido. Use apenas números, com até duas casas decimais (ex.: 12,50).';
  }
  return null;
}

export function converterPreco(texto: string): number {
  return Number(texto.replace(',', '.'));
}

export function formatarPreco(valor: number): string {
  return `R$ ${valor.toFixed(2).replace('.', ',')}`;
}