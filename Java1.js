// Obtén una referencia al botón y al formulario
const loginButton = document.getElementById('login-button');
const loginForm = document.getElementById('login-form');

// Función para cambiar el estado del botón y mostrar/ocultar el formulario
function toggleLogin() {
    const isFormVisible = loginForm.style.display === 'block';

    // Cambia el texto del botón
    loginButton.innerText = isFormVisible ? 'Log In' : 'Close';

    // Cambia el estilo para mostrar/ocultar el formulario
    loginForm.style.display = isFormVisible ? 'none' : 'block';
}

// Asigna la función al evento de clic del botón
loginButton.addEventListener('click', toggleLogin);

// Ejemplo de inicio de sesión
function iniciarSesion() {
    const usuario = document.getElementById('usuario').value;
    const correo = document.getElementById('correo').value;
    const contraseña = document.getElementById('contraseña').value;

    // Verificar que se hayan ingresado los datos
    if (!usuario || !correo || !contraseña) {
        alert('Por favor, complete todos los campos.');
        return;
    }

    // Simulación de envío de datos al backend para autenticación
    // Aquí deberías realizar una solicitud real al servidor
    // fetch('/login', {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({ usuario, correo, contraseña }),
    // })
    // .then(response => response.json())
    // .then(data => {
    //     console.log(data);
    //     alert(data.mensaje);
    // })
    // .catch(error => {
    //     console.error('Error:', error);
    //     alert('Hubo un error al intentar iniciar sesión.');
    // });

    // Simulación de respuesta del servidor (eliminar esto en tu aplicación real)
    const data = { mensaje: 'Inicio de sesión exitoso' };
    console.log(data);
    alert(data.mensaje);
}
