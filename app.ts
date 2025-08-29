function calculateAge(Birthday: string): number | null {
  // Convertir el formato DD/MM/YYYY a un objeto Date
  const dateParts = Birthday.split("/");
  if (dateParts.length !== 3 || !dateParts[0] || !dateParts[1] || !dateParts[2]) {
    console.warn("Formato de fecha inválido. Use DD/MM/YYYY.");
    return null;
  }

  const day = parseInt(dateParts[0], 10);
  const month = parseInt(dateParts[1], 10) - 1; // Los meses en JavaScript son base 0
  const year = parseInt(dateParts[2], 10);

  const birth = new Date(year, month, day);
  const today = new Date();

  if (isNaN(birth.getTime()) || birth > today) {
    console.warn("Fecha inválida o en el futuro.");
    return null;
  }

  let edad = today.getFullYear() - birth.getFullYear();
  const mesActual = today.getMonth();
  const diaActual = today.getDate();
  const mesNacimiento = birth.getMonth();
  const diaNacimiento = birth.getDate();

  if (mesActual < mesNacimiento || (mesActual === mesNacimiento && diaActual < diaNacimiento)) {
    edad--;
  }

  return edad;
}

// Pruebas
console.log(calculateAge("29/02/2025")); 
console.log(calculateAge("01/01/2026"));