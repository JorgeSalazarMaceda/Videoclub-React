import React, { useEffect, useState } from 'react'
import { Editar } from './Editar';


// Componente - Listado para recoger todas las películas, será utilizado cuando hagamos una búsqueda, cuando aparezca la página ppal.
// Este componente va a tener mucha maquetación y funcionalidad

// ¿Qué necesitamos?
// 1º- Necesitamos un método que consiga la información del localStorage (la clave o key pelis)
// 2º- Poder reflejar la info por pantalla, osea recorrer con bucle el localStorage y mostrar
// 3º- Ese método no lleva asociado un evento como tal, por lo que usamos el hook useEffect ya que es el primer método que se ejecuta al cargar un componente (PON LOS HOOKS AL INICIO DEL SCRIPT)
// 4º. Creamos un estado para mostrarlo y que se vaya actualizando con el método que hemos creado de conseguirPeliculas (Este estado, al final, pertenecerá a App.js para que se actualice automáticamente sin tener que refrescar)
export const Listado = ({listadoState, setListadoState}) => {

    // Este es el paso 4, creamos un estado con useState como array vacio
    // const [listadoState, setListadoState] = useState([]); // Para que se actualice automáticamente (sin refrescar) lo copiamos en App.js y se lo ponemos a la llamada de cada componente pasándole las Prop y el método listado la recibirá desde App.js

    // ************ Estado para editar ************
    const [editar, setEditar] = useState(0);

    useEffect(() => {
        console.log("Componente del listado de pelis cargado!!");
        conseguirPeliculas();
    },[]);

    const conseguirPeliculas = () =>{
        let peliculas = JSON.parse(localStorage.getItem("pelis"));
        setListadoState(peliculas);

        return peliculas;
    }

    const borrarPeli = (id) => {
        // 1- Conseguir pelis almacenadas --> Llamamos al método conseguir peliculas y guardamos el resultado en una variable
            let pelis_almacenadas = conseguirPeliculas();

        // 2- Filtrar esas pelis para que elimine del array la que no quiero (con filter, (por ej) del array peli quiero que te quedes con las pelis cuyo id es distinto al id que me llega por parámetro y le hacemos parseInt para que no lo confunda con un string ) 
            let nuevo_array_pelis = pelis_almacenadas.filter(peli => peli.id !== parseInt(id));
        
            //console.log(pelis_almacenadas, nuevo_array_pelis); // Comprobación previa y comprobación después de borrar
        
        // 3- Actualizar los datos del estado en el listadoStage
            setListadoState(nuevo_array_pelis);

        // 4- Actualizar los datos de las películas almacenadas en el localStorage
            localStorage.setItem('pelis', JSON.stringify(nuevo_array_pelis));
    }

  return (
   <>
        {/* Aquí van las peliculas sus items, descripciones y web (ESTE COMPONENTE SE CARGARÁ EN APP.JS) */}
        {/* 1- Recorremos el listadoState con map para mostrar las pelis del almacenamiento local */}
        {/* 2- React necesita una key para que no aparezca warnings en consola y el elemento sea fácilmente identificable, en nuestro caso el id */}
        {/* 3- Tambien hacemos una condición ternaria por si el localStorage está vacío */}
        {/* 4- Para que se actualice automáticamente la información guardada (pelis creadas) hay varias formas, nosotros lo que hacemos es enviar información de un componente a otro, de crear a listado */}
        
        { listadoState != null ? 
            listadoState.map(peli => {
                return(
                    <article key={peli.id} className="peli-item">
                        <h3 className="title">{peli.titulo}</h3>
                        <p className="description">{peli.descripcion}</p>
                    
                        <button className="edit" onClick={() => {setEditar(peli.id)}}>Editar</button>
                        <button className="delete" onClick={()=> borrarPeli(peli.id)}>Borrar</button>
                    
                        {/* Aparece formulario de editar cada vez que el id de la peli coincida con la peli que esta recorriendo --> Para eso haremos otro componente */}
                        {editar === peli.id && (
                            // <h1>Formulario</h1>
                            
                            // Esto es la prop para pasar al componente editar (que luego lo recibe como parámetro al igual que el método conseguirPeliculas para editar) --> peli={peli}
                            <Editar peli={peli}
                                    conseguirPeliculas={conseguirPeliculas}
                                    setEditar={setEditar}
                                    setListadoState={setListadoState}/> 
                        
                        )}
                    </article>
                    );
        })
    : <h2>No hay películas para mostrar</h2>
    }  
   </>
  )
}
