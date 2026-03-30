type FormatOptions = {
  withTime?: boolean;
  withSeconds?: boolean;
};

export function formatDate(options?: FormatOptions) {
  const hoje = new Date();
  const dia = String(hoje.getDate()).padStart(2, "0");
  const mes = String(hoje.getMonth() + 1).padStart(2, "0");
  const ano = hoje.getFullYear();

  let result = `${dia}_${mes}_${ano}`;

  if (options?.withTime) {
    const horas = String(hoje.getHours()).padStart(2, "0");
    const minutos = String(hoje.getMinutes()).padStart(2, "0");

    result += `_${horas}_${minutos}`;

    if (options?.withSeconds) {
      const segundos = String(hoje.getSeconds()).padStart(2, "0");
      result += `_${segundos}`;
    }
  }

  return result;
}
