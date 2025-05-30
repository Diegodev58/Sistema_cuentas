const socket = io();


// Obtener el formulario de registro
const formularioRegistro = document.querySelector('#form-registro');

// Escuchar el evento 'registro' desde el servidor 
//mostramos los datos del cliente en la tabla
socket.on('registro', (clientes) => {
    
    const demo = document.getElementById('demo');
    demo.innerHTML = '';
    for(let datas of clientes){
        const tr = document.createElement('tr');
        const tdNombre = document.createElement('td');
        const tdTelefono = document.createElement('td');
        const tdReferencia = document.createElement('td');
        const tdFecha = document.createElement('td');
        const tdemail = document.createElement('td');

        tdNombre.textContent = datas.nombre;
        tdTelefono.textContent = datas.telefono;
        tdReferencia.textContent = datas.referencia;
        tdFecha.textContent = datas.fecha;
        tdemail.textContent = datas.email;

        tr.appendChild(tdNombre);
        tr.appendChild(tdTelefono);
        tr.appendChild(tdReferencia);
        tr.appendChild(tdFecha);
       
        tr.appendChild(tdemail)

        demo.appendChild(tr);
    }
});



// Escuchar el evento 'nuevoCliente' desde el servidor
// (El servidor emite este evento en: server.js)
formularioRegistro.addEventListener('submit', (event) => {
    event.preventDefault();

    // Obtener los datos del formulario
    const nombre = document.querySelector('#nombre').value;
    const referencia = document.querySelector('#Referencia').value;
    const telefono = document.querySelector('#telefono').value;
    const email = document.querySelector('#email').value;
    const dirreccion = document.querySelector('#direccion').value;

    const nuevoCliente = 
        {
            "nombre": nombre.toUpperCase(),
            "referencia": referencia.toUpperCase(),
            "telefono": telefono,
            "email": email.toUpperCase(),
            "dirreccion": dirreccion,
            "fecha": new Date().toLocaleDateString(), 
        }
    

    // Crear un objeto con los datos del cliente
    socket.emit('nuevoCliente', nuevoCliente);
    formularioRegistro.reset();

    // Mostrar mensaje de éxito
    socket.on('nuevoCliente', (estado) => {
        if (estado) {
            alert('Cliente agregado con éxito');
            window.location.reload()
        } else {
            alert('Error al agregar el cliente o el cliente ya existe');
        }
    });
});


const cerrarSesion = document.getElementById('demo5');
cerrarSesion.addEventListener('click', () => {
    document.cookie = 'jwt=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    window.location.href = '/login.html';
});
