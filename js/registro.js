
let estudianteIdActual = null;

document.addEventListener('DOMContentLoaded', function() {
    cargarEstudiantes();
    inicializarMenuResponsive();
});

// carga datos de localstorage
function cargarEstudiantes() {
    const estudiantes = JSON.parse(localStorage.getItem('estudiantes')) || [];
    const tabla = document.querySelector('.tabla-estudiantes tbody');
    tabla.innerHTML = ''; // Limpiar tabla antes de cargar
    estudiantes.forEach(est => agregarFilaEstudiante(est));
}

function guardarEstudiantes(estudiantes) {
    localStorage.setItem('estudiantes', JSON.stringify(estudiantes));
}

function abrirModalAgregar() {
    document.getElementById('tituloModal').textContent = 'Agregar Estudiante';
    document.getElementById('formEstudiante').reset();
    document.getElementById('idEstudiante').value = '';
    document.getElementById('modalEstudiante').style.display = 'flex';
}

function abrirModalEditar(id, nombres, correo, celular, idioma) {
    document.getElementById('tituloModal').textContent = 'Editar Estudiante';
    document.getElementById('idEstudiante').value = id;
    document.getElementById('nombres').value = nombres;
    document.getElementById('correo').value = correo;
    document.getElementById('celular').value = celular;

    const select = document.getElementById('idioma');
    Array.from(select.options).some((option, index) => {
        if (option.text.toLowerCase() === idioma.toLowerCase()) {
            select.selectedIndex = index;
            return true;
        }
    });

    document.getElementById('modalEstudiante').style.display = 'flex';
}

function abrirModalIdioma() {
    document.getElementById('modalIdioma').style.display = 'flex';
    document.getElementById('nuevoIdioma').value = '';
}

function abrirModalEliminar(id) {
    estudianteIdActual = id;
    document.getElementById('modalEliminar').style.display = 'flex';
}

function cerrarModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}

function agregarFilaEstudiante({ id, nombres, correo, celular, idioma }) {
    const tabla = document.querySelector('.tabla-estudiantes tbody');
    const nuevaFila = document.createElement('tr');
    nuevaFila.innerHTML = `
        <td>${id}</td>
        <td>${nombres}</td>
        <td>${correo}</td>
        <td>${celular}</td>
        <td>${idioma}</td>
        <td>
            <button class="btn-accion btn-editar" onclick="abrirModalEditar(${id}, '${nombres}', '${correo}', '${celular}', '${idioma}')">
                <i class="fas fa-edit"></i> Editar
            </button>
            <button class="btn-accion btn-eliminar" onclick="abrirModalEliminar(${id})">
                <i class="fas fa-trash"></i> Eliminar
            </button>
        </td>
    `;
    tabla.appendChild(nuevaFila);
}

document.getElementById('formEstudiante').addEventListener('submit', function(event) {
    event.preventDefault();

    const id = document.getElementById('idEstudiante').value;
    const nombres = document.getElementById('nombres').value;
    const correo = document.getElementById('correo').value;
    const celular = document.getElementById('celular').value;
    const idioma = document.getElementById('idioma').options[document.getElementById('idioma').selectedIndex].text;

    let estudiantes = JSON.parse(localStorage.getItem('estudiantes')) || [];

    if (id) {
        // editar estudiante 
        estudiantes = estudiantes.map(est => 
            est.id == id ? { id, nombres, correo, celular, idioma } : est
        );
    } else {
        // Agregar nuevo 
        const nuevoId = estudiantes.length > 0 ? Math.max(...estudiantes.map(e => e.id)) + 1 : 1;
        estudiantes.push({ id: nuevoId, nombres, correo, celular, idioma });
        agregarFilaEstudiante({ id: nuevoId, nombres, correo, celular, idioma });
    }

    guardarEstudiantes(estudiantes);
    if (id) cargarEstudiantes(); 
    cerrarModal('modalEstudiante');
});

// Eliminar estudiante
document.querySelector('.btn-confirmar')?.addEventListener('click', function() {
    if (estudianteIdActual) {
        let estudiantes = JSON.parse(localStorage.getItem('estudiantes')) || [];
        estudiantes = estudiantes.filter(est => est.id != estudianteIdActual);
        guardarEstudiantes(estudiantes);
        cargarEstudiantes();
        cerrarModal('modalEliminar');
        estudianteIdActual = null;
    }
});

// Cerrar modal al hacer clic fuera
window.addEventListener('click', function(event) {
    const modalEstudiante = document.getElementById('modalEstudiante');
    const modalEliminar = document.getElementById('modalEliminar');
    const modalIdioma = document.getElementById('modalIdioma');

    if (event.target === modalEstudiante) cerrarModal('modalEstudiante');
    if (event.target === modalEliminar) cerrarModal('modalEliminar');
    if (event.target === modalIdioma) cerrarModal('modalIdioma');
});

