import React, { useState } from 'react'
// Lo que vamos a hacer es aplicar eventos al input para hacer una búsqueda

export const Buscador = ({listadoState, setListadoState}) => {

// 1- Creamos estado y actualizarlo para crear esa palabra (es lo que se asignará al value), el otro estado es en caso de que no haya pelis coincidentes
const [busqueda, setBusqueda] = useState('');
const [noEncontrado, setNoEncontrado] = useState(false);

    // Función que busca en el listado de películas guardadas en el localStorage, cualquier coincidencia entre el value metido en el form y lo que hay en el listado almacenado
    const buscarPeli = (e) => {
        
        setBusqueda(e.target.value); // Le asignamos el valor del target
        
        // 2- Necesitamos el listado completo de pelis (Lo puedes sacar del listado o del componente App con una prop)
            // Pasamos por parámetro listadoState (el array para sacar los datos del listado) y setListadoState para acb 
        
        // 3- Filtrar el array para buscar coincidencias (usamos filter del array pelis, lo recorremos y que nos devuelva los títulos en minúscula cuyo String coincida con la busqueda (esto se hace con includes))
            let pelis_encontradas = listadoState.filter(peli => {
                return peli.titulo.toLowerCase().includes(busqueda.toLocaleLowerCase());
            });
        
        // 4- Comprobar si hay resultado de coincidencias, si no hay, muestra todo el listado
            if(busqueda.length <= 1 || pelis_encontradas <= 0){
                pelis_encontradas = JSON.parse(localStorage.getItem("pelis")); // El localStorage es una cadena de texto, con JSON.parse lo convertimos los datos a obj javaScript para poder trabajar con ellos
                setNoEncontrado(true);
            }else{
                setNoEncontrado(false); // En caso de que no se encuentre, mostramos un <span> de no encontrado
            }

            // console.log(pelis_encontradas);

        // 5- Actualizar estado del listado principal con lo que he logrado filtrar
            setListadoState(pelis_encontradas);
    }

    return (
        <div className="search">
            <h3 className="title">Buscador: {busqueda}</h3>
            
            {(noEncontrado == true && busqueda.length > 1) && (
                <span className='no-encontrado'>No se ha encontrado ninguna película con ese título</span>
            )}
            
            <form>
                <input type="text"
                id="search_field" 
                name='busqueda'
                autoComplete='off' // Para que no autocomplete nada
                value={busqueda}
                onChange={ buscarPeli }
                />

                <button id="search">Buscar</button>
            </form>
        </div>
    )
}
