// Lista oficial de códigos institucionales admitidos
const codigosValidos = [
  "descargar",
  "",
  "",
  ""
];

// Registro y redirección desde la página de ingreso
if (document.getElementById("registroForm")) {
  document.getElementById("registroForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const codigoIngresado = document.getElementById("codigo").value.trim().toUpperCase();
    const mensaje = document.getElementById("mensaje");

    if (codigosValidos.includes(codigoIngresado)) {
      mensaje.textContent = "✅ Código reconocido. Registro aceptado.";
      mensaje.style.color = "green";

      // Guarda el código en almacenamiento local para que el portal lo reconozca
      localStorage.setItem("codigoActivo", codigoIngresado);

      setTimeout(() => {
        window.location.href = "index.portal.html";
      }, 1500);
    } else {
      mensaje.textContent = "❌ Código no reconocido. Registro denegado por Dirección General de Recursos.";
      mensaje.style.color = "red";
    }
  });
}

// Activación de sesión en el portal académico
function activarSesion() {
  const codigo = localStorage.getItem("codigoActivo");

  if (codigosValidos.includes(codigo)) {
    alert("✅ Sesión activada. Bienvenido al entorno ceremonial.");
  } else {
    alert("❌ Código inválido. Acceso denegado.");
    window.location.href = "https://educationalclassrooms.com/acceso-denegado";
  }
}

// Validación en cada enlace del portal
function validarAcceso(enlace) {
  const codigoIngresado = prompt("Ingrese su código institucional para continuar:");
  const codigoActivo = localStorage.getItem("codigoActivo");

  if (codigoIngresado.trim().toUpperCase() === codigoActivo) {
    window.open(enlace, "_blank");
  } else {
    alert("⚠️ Código incorrecto. No se puede acceder al recurso.");
  }
}

// Eliminación de registro ceremonial
function eliminarRegistro() {
  localStorage.removeItem("codigoActivo");
  alert("🔓 Registro eliminado. Puede cerrar la página con seguridad.");
}

// Protección contra cierre sin eliminación
window.onbeforeunload = function () {
  if (localStorage.getItem("codigoActivo")) {
    return "⚠️ Debe eliminar su registro antes de cerrar la página.";
  }
};




