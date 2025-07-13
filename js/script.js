function mostrarAlerta(mensaje, tipo) {
  const cont = document.getElementById("liveAlertPlaceholder");
  cont.innerHTML = `
          <div class="alert alert-${tipo} alert-dismissible fade show" role="alert">
            ${mensaje}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
          </div>
        `;
}

function validarCampo(id) {
  const field = document.getElementById(id);
  const value = field.value.trim();
  let valido = true;
  let msg = "";

  if (!value) {
    valido = false;
    msg = `Es obligatorio colocar un ${field.previousElementSibling.innerText}.`;
  } else if (id === "email") {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(value)) {
      valido = false;
      msg = "Este campo no cumple los requisitos de email.";
    }
  }

  if (valido) {
    field.classList.add("is-valid");
    field.classList.remove("is-invalid");
    mostrarAlerta(
      `${field.previousElementSibling.innerText} válido.`,
      "success"
    );
  } else {
    field.classList.add("is-invalid");
    field.classList.remove("is-valid");
    mostrarAlerta(msg, "danger");
  }
  return valido;
}

function validarCampos() {
  const ids = ["nombre", "email", "mensaje"];
  return ids.every((id) => validarCampo(id));
}

function validarFormulario(event) {
  event.preventDefault();
  if (validarCampos()) {
    mostrarAlerta("Formulario enviado correctamente.", "success");
    document.getElementById("formulario-contacto").reset();
    ["nombre", "email", "mensaje"].forEach((id) => {
      const f = document.getElementById(id);
      f.classList.remove("is-valid");
    });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("formulario-contacto");
  form.addEventListener("submit", validarFormulario);
  ["nombre", "email", "mensaje"].forEach((id) => {
    document
      .getElementById(id)
      .addEventListener("input", () => validarCampo(id));
  });
});
