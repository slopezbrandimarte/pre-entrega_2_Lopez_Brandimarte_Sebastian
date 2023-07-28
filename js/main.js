

const tabla = document.querySelector('table');
const botonBuscar = document.getElementById('botonBuscar');
const inputBuscarTexto = document.querySelector('input[type="text"]');
const formulario = document.getElementById('formulario');

// almacenar las filas
const filasData = [];

// buscar coincidencias en la tabla
function buscarCoincidencias() {
    const textoBuscar = inputBuscarTexto.value.toLowerCase();
    const filas = tabla.querySelectorAll('.contenidoColumnado');
    filas.forEach((fila) => {
        const columnas = fila.querySelectorAll('td');
        let coincidenciaEncontrada = false;
        columnas.forEach((columna) => {
        const contenidoColumna = columna.textContent.toLowerCase();
        if (contenidoColumna.includes(textoBuscar)) {
            coincidenciaEncontrada = true;
        }
    });
    fila.style.display = coincidenciaEncontrada ? 'table-row' : 'none';
    });
}

// Evento para buscar al hacer clic en el botón de búsqueda
botonBuscar.addEventListener('click', () => {
    buscarCoincidencias();
});

// Evento para buscar al presionar la tecla "Enter" en el campo de búsqueda
inputBuscarTexto.addEventListener('keypress', (event) => {
    if (event.keyCode === 13) {
    buscarCoincidencias();
    event.preventDefault(); // Evitar que se envíe un formulario si hay uno en la página
    }
});


// Función para agregar una nueva fila
function agregarElemento() {
    const newRow = document.createElement('tr');
    newRow.classList.add('contenidoColumnado');


  // Obtenemos los valores de los inputs y select
    const fechaHoraPedido = obtenerFechaHoraActual();
    const selectAccion = document.querySelector('.selector');
    const accionSeleccionada = selectAccion.options[selectAccion.selectedIndex].text;
    const inputDestinacion = document.querySelector('.destinacion input').value;
    const inputBuque = document.querySelector('.buque input').value;
    const inputEmpresa = document.querySelector('.empresa input').value;
    const inputVencimiento = document.querySelector('.vencimiento input').value;
    const fechaFormateada = formatearFecha(inputVencimiento)


  // objeto para almacenar los datos de la fila
    const rowData = {
        fechaHoraPedido,
        accion: accionSeleccionada,
        destinacion: inputDestinacion,
        buque: inputBuque,
        empresa: inputEmpresa,
        vencimiento: fechaFormateada
    };


// formatear la fecha 
function formatearFecha(fecha) {
    const partes = fecha.split('-'); // Divide la fecha en partes
    if (partes.length !== 3) {
        return ''; 
    }
    return `${partes[2]}/${partes[1]}/${partes[0]}`; // entrega la fecha en formato dd/mm/aaaa
}

  // Añadir la fila al array
filasData.push(rowData);

  // Crear celdas de la nueva fila
for (const prop in rowData) {
const cell = document.createElement('td');
cell.textContent = rowData[prop];
newRow.appendChild(cell);
}

const entregado = document.createElement('td');
const inputEntregado = document.createElement('input');
inputEntregado.type = 'checkbox';
entregado.appendChild(inputEntregado);
newRow.appendChild(entregado);

tabla.appendChild(newRow);

  // Evento para borrar una fila al marcar el checkbox
inputEntregado.addEventListener('change', function() {
    if (inputEntregado.checked) {
        tabla.removeChild(newRow);
    }
});

  // Limpiar los campos después de agregar la fila
    document.querySelectorAll('.destinacion input, .buque input, .empresa input, .vencimiento input').forEach(input => input.value = '');
    selectAccion.selectedIndex = 0;
}

//fecha y hora actual en formato dd/mm/yyyy hh:mm
function obtenerFechaHoraActual() {
    const ahora = new Date();
    const fecha = `${ahora.getDate()}/${(ahora.getMonth() + 1).toString().padStart(2, '0')}/${ahora.getFullYear()}`;
    const horas = String(ahora.getHours()).padStart(2, '0');
    const minutos = String(ahora.getMinutes()).padStart(2, '0');
    return `${fecha} ${horas}:${minutos}`;
}

//  borrar el contenido de los inputs
const botonBorrar = document.querySelector('.botonBorrar');
botonBorrar.addEventListener('click', () => {
    document.querySelectorAll('.destinacion input, .buque input, .empresa input, .vencimiento input, .entregado input').forEach(input => input.value = '');
});a