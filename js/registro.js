let estudianteIdActual = null;

function abrirModalAgregar() {
    document.getElementById('tituloModal').textContent = 'Agregar Estudiante';
    document.getElementById('formEstudiante').reset();
    document.getElementById('idEstudiante').value = '';
    
    const modal = document.getElementById('modalEstudiante');
    modal.style.display = 'flex';
}

function abrirModalEditar(id, nombres, correo, celular, idioma) {
    document.getElementById('tituloModal').textContent = 'Editar Estudiante';
    
    // llamar los valores 
    document.getElementById('idEstudiante').value = id;
    document.getElementById('nombres').value = nombres;
    document.getElementById('correo').value = correo;
    document.getElementById('celular').value = celular;
    
    // establecer elidioma
    const select = document.getElementById('idioma');
    Array.from(select.options).some((option, index) => {
        if (option.text.toLowerCase() === idioma.toLowerCase()) {
            select.selectedIndex = index;
            return true;
        }
    });
    document.getElementById('modalEstudiante').style.display = 'flex';
}

// Abrir modal de agregar idioma
function abrirModalIdioma() {
    document.getElementById('modalIdioma').style.display = 'flex';
    document.getElementById('nuevoIdioma').value = '';
}
function abrirModalEliminar(id) {
    estudianteIdActual = id;
    const modal = document.getElementById('modalEliminar');
    modal.style.display = 'flex';
}

// cerrar modal
function cerrarModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.style.display = 'none';
}
    document.querySelector('.btn-confirmar').addEventListener('click', function() {
        cerrarModal('modalEliminar');
    });

    window.addEventListener('click', function(event) {
        const modalEstudiante = document.getElementById('modalEstudiante');
        const modalEliminar = document.getElementById('modalEliminar');
        
        if (event.target === modalEstudiante) {
            cerrarModal('modalEstudiante');
        }
        
        if (event.target === modalEliminar) {
            cerrarModal('modalEliminar');
        }
    });
    
