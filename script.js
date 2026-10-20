
// H-02 H-03: modal de promocion con <dialog>
//se abre solo cuando la persona lo pide. showModal() deja el fondo inactivo
//mantiene el foco dentro, cierra con esc y devuelve el foco al boton de origen
document.addEventListener('DOMContentLoaded', function () {
    let modal = document.getElementById('promocion');
    let abrir = document.getElementById('abrir-promocion');
    let cerrar = document.getElementById('cerrar-promocion');
    if (!modal || !abrir) return;

    abrir.addEventListener('click', function () {
        modal.showModal();
    });
    cerrar.addEventListener('click', function () {
        modal.close();
    });
});



//logica form
//original: solo el borde de "email" se pintaba de rojo si estaba
let validacionesCampo = {
    //regex
    guest_nombre: function (valor) {
        return valor.trim().length >= 3 ? "" : "Ingresá tu nombre completo.";
    },
    guest_email: function (valor) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valor.trim()) ? "" : "Ingresá un correo electrónico válido.";
    },
    guest_telefono: function (valor) {
        return /^[0-9 ()+-]{6,20}$/.test(valor.trim()) ? "" : "Ingresá un teléfono válido.";
    },
    topico: function (valor) {
        return valor ? "" : "Seleccioná un tópico.";
    },
    descripcion: function (valor) {
        return valor.trim().length >= 10 ? "" : "Contanos tu consulta (mínimo 10 caracteres).";
    }
};

function validarCampo(campo) {
    let validar = validacionesCampo[campo.id];
    if (!validar) return true;
    let mensaje = validar(campo.value);
    let contenedor = campo.closest('.campo');
    let error = document.getElementById('error-' + campo.id);
    if (mensaje) {
        contenedor.classList.add('campo-invalido');

        // NUEVO: informa a lectores de pantalla que el campo es inválido
        campo.setAttribute('aria-invalid', 'true');

        error.textContent = mensaje;
    } else {
        contenedor.classList.remove('campo-invalido');

        // NUEVO: informa que el campo volvió a ser válido
        campo.setAttribute('aria-invalid', 'false');

        error.textContent = '';
    }
    return mensaje === "";
}

function enviarConsulta(evento) {
    evento.preventDefault();

    let form = document.getElementById('formulario-contacto');
    let estado = document.getElementById('estado-formulario');
    let valido = true;
    let primerCampoInvalido = null;

    Object.keys(validacionesCampo).forEach(function (id) {
        let campo = document.getElementById(id);
        if (!validarCampo(campo)) {
            valido = false;
            if (!primerCampoInvalido) primerCampoInvalido = campo;
        }
    });

    if (!valido) {
        estado.className = 'error';
        estado.textContent = 'Hay errores en el formulario. Revisá los campos marcados.';
        primerCampoInvalido.focus();
        return;
    }

    let data = new FormData(form);

    fetch('contacto.php', {
        method: 'POST',
        body: data
    })
    .then(response => response.text())
    .then(function () {
        estado.className = 'exito';
        estado.textContent = 'Consulta enviada. Te vamos a contactar a la brevedad.';
        estado.focus();
        form.reset();
    })
    .catch(function () {
        estado.className = 'error';
        estado.textContent = 'Error de conexión. Intentá nuevamente.';
        estado.focus();
    });
}

document.addEventListener('DOMContentLoaded', function () {
    let form = document.getElementById('formulario-contacto');
    if (form) form.addEventListener('submit', enviarConsulta);
});