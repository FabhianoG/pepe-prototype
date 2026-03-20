export const normalizeText = (text: string): string => {
  return text
    .normalize("NFD") // quitar tildes
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[@]/g, "a")
    .replace(/[0]/g, "o")
    .replace(/[1]/g, "i")
    .replace(/(.)\1+/g, "$1") // holaaa -> hola
    .trim();
};
