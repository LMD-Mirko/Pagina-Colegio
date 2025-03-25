let estudianteIdActual = null;
const IDIOMAS_PREDETERMINADOS = ['Español', 'Inglés', 'Francés'];

// abrir modals
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

// funcion de gestion de los estudi...
function obtenerEstudiantes() {
    return JSON.parse(localStorage.getItem('estudiantes')) || [];
}

function guardarEstudiantes(estudiantes) {
    localStorage.setItem('estudiantes', JSON.stringify(estudiantes));
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

function inicializarEstudiantes() {
    const tabla = document.querySelector('.tabla-estudiantes tbody');
    let estudiantes = obtenerEstudiantes();

    const filasHTML = tabla.querySelectorAll('tr');
    const estudiantesHTML = Array.from(filasHTML).map(fila => {
        const celdas = fila.querySelectorAll('td');
        return {
            id: parseInt(celdas[0].textContent),
            nombres: celdas[1].textContent,
            correo: celdas[2].textContent,
            celular: celdas[3].textContent,
            idioma: celdas[4].textContent
        };
    });

    if (estudiantes.length === 0 && estudiantesHTML.length > 0) {
        estudiantes = estudiantesHTML;
        guardarEstudiantes(estudiantes);
    }

    tabla.innerHTML = '';
    estudiantes.forEach(est => agregarFilaEstudiante(est));
}

function registrarEstudiante(event) {
    event.preventDefault();

    const id = document.getElementById('idEstudiante').value;
    const nombres = document.getElementById('nombres').value;
    const correo = document.getElementById('correo').value;
    const celular = document.getElementById('celular').value;
    const idioma = document.getElementById('idioma').options[document.getElementById('idioma').selectedIndex].text;

    let estudiantes = obtenerEstudiantes();

    if (id) {
        estudiantes = estudiantes.map(est => 
            est.id == id ? { id: parseInt(id), nombres, correo, celular, idioma } : est
        );
    } else {
        const nuevoId = estudiantes.length > 0 ? Math.max(...estudiantes.map(e => e.id)) + 1 : 1;
        estudiantes.push({ id: nuevoId, nombres, correo, celular, idioma });
        agregarFilaEstudiante({ id: nuevoId, nombres, correo, celular, idioma });
    }

    guardarEstudiantes(estudiantes);
    if (id) inicializarEstudiantes(); 
    cerrarModal('modalEstudiante');
}

function eliminarEstudiante() {
    if (estudianteIdActual) {
        let estudiantes = obtenerEstudiantes();
        estudiantes = estudiantes.filter(est => est.id != estudianteIdActual);
        guardarEstudiantes(estudiantes);
        inicializarEstudiantes();
        cerrarModal('modalEliminar');
        estudianteIdActual = null;
    }
}

// funcion para gestionar los idiomas
function obtenerIdiomasPersonalizados() {
    return JSON.parse(localStorage.getItem('idiomasPersonalizados')) || [];
}

function inicializarIdiomas() {
    const selectIdioma = document.getElementById('idioma');
    
    selectIdioma.innerHTML = '';
    
    IDIOMAS_PREDETERMINADOS.forEach(idioma => {
        const option = document.createElement('option');
        option.value = idioma.toLowerCase();
        option.text = idioma;
        selectIdioma.appendChild(option);
    });

    const idiomasPersonalizados = obtenerIdiomasPersonalizados();
    
    idiomasPersonalizados.forEach(idioma => {
        if (!IDIOMAS_PREDETERMINADOS.some(pred => pred.toLowerCase() === idioma.toLowerCase())) {
            const option = document.createElement('option');
            option.value = idioma.toLowerCase();
            option.text = idioma;
            selectIdioma.appendChild(option);
        }
    });
}

function guardarIdioma(event) {
    event.preventDefault();
    const nuevoIdioma = document.getElementById('nuevoIdioma').value.trim();
    
    if (!nuevoIdioma) {
        alert('Por favor, ingrese un nombre de idioma válido.');
        return;
    }

    const idiomasPersonalizados = obtenerIdiomasPersonalizados();
    
    const idiomaDuplicado = idiomasPersonalizados.some(
        idioma => idioma.toLowerCase() === nuevoIdioma.toLowerCase()
    ) || IDIOMAS_PREDETERMINADOS.some(
        idioma => idioma.toLowerCase() === nuevoIdioma.toLowerCase()
    );

    if (idiomaDuplicado) {
        alert('Este idioma ya existe.');
        return;
    }

    idiomasPersonalizados.push(nuevoIdioma);
    localStorage.setItem('idiomasPersonalizados', JSON.stringify(idiomasPersonalizados));
    
    inicializarIdiomas();
    
    document.getElementById('nuevoIdioma').value = '';
    cerrarModal('modalIdioma');
}

document.addEventListener('DOMContentLoaded', function() {
    inicializarEstudiantes();
    inicializarIdiomas();
    
    document.getElementById('formEstudiante').addEventListener('submit', registrarEstudiante);
    document.getElementById('formIdioma').addEventListener('submit', guardarIdioma);
    document.querySelector('.btn-confirmar').addEventListener('click', eliminarEstudiante);

    window.addEventListener('click', function(event) {
        const modalEstudiante = document.getElementById('modalEstudiante');
        const modalEliminar = document.getElementById('modalEliminar');
        const modalIdioma = document.getElementById('modalIdioma');

        if (event.target === modalEstudiante) cerrarModal('modalEstudiante');
        if (event.target === modalEliminar) cerrarModal('modalEliminar');
        if (event.target === modalIdioma) cerrarModal('modalIdioma');
    });
});