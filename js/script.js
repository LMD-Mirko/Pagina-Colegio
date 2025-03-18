        // JavaScript para el menú responsive
        document.querySelector('.menu-icono').onclick = () => {
            document.querySelector('.navegacion').classList.toggle('activo');
            
            // Cambiar el icono según el estado del menú
            const menuIcono = document.querySelector('.menu-icono');
            if (document.querySelector('.navegacion').classList.contains('activo')) {
                menuIcono.classList.remove('fa-bars');
                menuIcono.classList.add('fa-times');
            } else {
                menuIcono.classList.remove('fa-times');
                menuIcono.classList.add('fa-bars');
            }
        }