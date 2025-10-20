function isValidDateFormat(dateStr: string): boolean {
  // Formato en YYYY-MM-DD
  const isoRegex = /^\d{4}-\d{2}-\d{2}$/;
  return isoRegex.test(dateStr);
}

function isRealDate(year: number, month: number, day: number): boolean {
  
  if (month < 1 || month > 12) return false;
  if (day < 1) return false;

  // Obtener último día del mes
  const daysInMonth = new Date(year, month, 0).getDate();
  return day <= daysInMonth;
}

function calculateAge(birthIso: string): number | string {
  if (!isValidDateFormat(birthIso)) {
    return `Formato de fecha inválido. Use YYYY-MM-DD.`;
  }

  const parts = birthIso.split("-");
  const yStr = parts[0];
  const mStr = parts[1];
  const dStr = parts[2];

  if (!yStr || !mStr || !dStr) {
    return `Fecha no contiene todos sus elementos.`;
  }

  const year = parseInt(yStr, 10);
  const month = parseInt(mStr, 10);
  const day = parseInt(dStr, 10);

  if (Number.isNaN(year) || Number.isNaN(month) || Number.isNaN(day)) {
    return `La fecha tiene valores no numéricos.`;
  }

  if (!isRealDate(year, month, day)) {
    return `Fecha inválida (día/mes fuera de rango o no existe).`;
  }

  const birth = new Date(year, month - 1, day);
  const today = new Date();

  if (birth > today) {
    return `Fecha en el futuro.`;
  }

  let edad = today.getFullYear() - birth.getFullYear();
  const mesActual = today.getMonth() + 1; 
  const diaActual = today.getDate();

  if (mesActual < month || (mesActual === month && diaActual < day)) {
    edad--; 
  }

  return edad;
}

// Ejemplos 
console.log('(2000-02-29) =>', calculateAge('2000-02-29'));
console.log('(29-02-2000) =>', calculateAge('29-02-2000'));
console.log('(2021-02-29) =>', calculateAge('2021-02-29'));
console.log('(3000-01-01) =>', calculateAge('3000-01-01'));
console.log('(2025-05-01) =>', calculateAge('2025-05-01'));