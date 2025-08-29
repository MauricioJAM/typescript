function calculateAge(Birthday) {
    // Convertir el formato DD/MM/YYYY a un objeto Date
    var dateParts = Birthday.split("/");
    if (dateParts.length !== 3 || !dateParts[0] || !dateParts[1] || !dateParts[2]) {
        console.warn("Formato de fecha inválido. Use DD/MM/YYYY.");
        return null;
    }
    var day = parseInt(dateParts[0], 10);
    var month = parseInt(dateParts[1], 10) - 1; // Los meses en JavaScript son base 0
    var year = parseInt(dateParts[2], 10);
    var birth = new Date(year, month, day);
    var today = new Date();
    if (isNaN(birth.getTime()) || birth > today) {
        console.warn("Fecha inválida o en el futuro.");
        return null;
    }
    var edad = today.getFullYear() - birth.getFullYear();
    var mesActual = today.getMonth();
    var diaActual = today.getDate();
    var mesNacimiento = birth.getMonth();
    var diaNacimiento = birth.getDate();
    if (mesActual < mesNacimiento || (mesActual === mesNacimiento && diaActual < diaNacimiento)) {
        edad--;
    }
    return edad;
}
// Pruebas
console.log(calculateAge("29/02/2025"));
console.log(calculateAge("01/01/2026"));
