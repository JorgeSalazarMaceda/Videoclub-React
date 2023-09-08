import React from 'react'

export const Editar = ({peli, conseguirPeliculas, setEditar, setListadoState}) => {

    const titulo_componente = "Editar pelicula";
// Con una prop, pasaremos la información del componente listado a este componente para que aparezca el titulo almacenado previamente.
// Esto se consigue pasando la información del objeto peli del listado al componente editar

    const guardarEdicion = (e, id) =>{
        e.preventDefault();
        
        // 1- Conseguir el target del evento
        let target = e.target;

        // 2- Buscar el índice con el objeto de la película a actualizar (hay que coger de listado, como prop el id peliculas)
        const pelis_almacenadas = conseguirPeliculas();
        const indice = pelis_almacenadas.findIndex(peli => peli.id === id); // Para buscar un objeto dentro de un array de obj --> Si peli.id es = al id que quiero modificar (Esta funcion de callback devuelve true o false y el indice)
            // console.log(indice);
        
        // 3- Creamos un objeto con el id de ese índice, con el título y descripción que me llega del formulario
        let peli_actualizada = {
            id,
            titulo: target.titulo.value,
            descripcion: target.descripcion.value
        };
        console.log(indice,peli);

        // 4- Actualizar el elemento con ese índice --> Queremos acceder a las pelis almacenadas, seleccionar el indice y lo que haya en ese índice lo sustituyes por la peli actualizada.
        pelis_almacenadas[indice] = peli_actualizada;

        //5- Guardar el nuevo array de objetos en el localStorage
        localStorage.setItem("pelis", JSON.stringify(pelis_almacenadas));

        //6- Actualizar estados
        setListadoState(pelis_almacenadas); // Actualizamos lo que hay dentro con el nuevo array de objetos 
        setEditar(0); // Actualizamos el estado de editar para cerrar el formulario
    }   

return (
    <div className='edit_form'>
        <h3 className='titulo'>{titulo_componente}</h3>
        <form onSubmit={ e => guardarEdicion(e,peli.id)}> {/* Recogemos evento, llamamos a guardarEdicion y le pasamos el evento de la peli indicada */}
            <input type='text'
                    name='titulo'
                    className='titule_editado'
                    defaultValue={peli.titulo} />

            <textarea 
                    name='descripcion'
                    defaultValue={peli.descripcion}
                    className='descripcion_editada' />

            <input type='submit' className='editar' value='Actualizar' />

        </form>
    </div>
  )
}
