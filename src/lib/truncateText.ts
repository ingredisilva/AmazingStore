
/**
 * Trunca o texto para um tamanho especificado e adiciona reticências se for maior que o limite
 * @param {string} text - O texto original
 * @param {number} maxLength - O tamanho máximo do texto
 * @returns {string} - O texto truncado com reticências (se precisar)
 */


export function truncateText(text: string, maxLength: number): string {
  if (text.length > maxLength) {
    return text.slice(0, maxLength) + '...';
  }
  return text;
}