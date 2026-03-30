// Máscara de placa com o padrão: (3 letras, 1 número, 1 letra, 2 números — formato LLLNLNN)
export function maskPlaca(value: string) {
  const regexMask = /([A-Z]{3})([0-9]{1})([A-Z]{1})([0-9]{2})/;
  return value
    .toUpperCase()
    .replace(/[^A-Z0-9]/g, "")
    .slice(0, 7)
    .replace(regexMask, "$1-$2$3$4");
}
