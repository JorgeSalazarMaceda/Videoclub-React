import React, { useState } from 'react'
import { GuardarEnStorage } from './helpers/GuardarEnStorage';

export const Crear = ({setListadoState}) => { //Recibe setListadoState de App.js

const tituloComponente = "Añadir película"; {/* Título del componente */}

//PASO 3 --> Creamos un estado de peli para que se actualice para usarlo y pasarle el objeto creado en el paso 2
const [ peliState , setPeliState ] = useState({
    titulo: '',
    descripcion: ''
});

const { titulo, descripcion} = peliState; // Objeto de película desestructurado

const conseguirDatosForm = e => {
    e.preventDefault(); {/* Evitamos el envio del form a otra página de manera automática */}
    
    //PASO 1 --> Conseguir los datos del formulario
    let target = e.target; {/* Para conseguir todo el evento como tal */}
    let titulo = target.titulo.value;
    let descripcion = target.descripcion.value;

    //PASO 2 --> Crear objeto JSON de la película a guardar
    let peli = {
        id: new Date().getTime(),  // Usamos como id la fecha para que siempre sea única 
        titulo,
        descripcion
    };

    // PASO 4 Usamos el estado y le pasamos el objeto de peli, entonces guardamos el estado
    setPeliState(peli);

    // console.log(peli);
    // console.log(peliState);

    // Paso 7 Actualizar el estado del listado ppal agregando al listado o elementos que ya existen el nuevo item
    setListadoState(elementos =>{
      return[...elementos, peli];
    })

    // PASO 6 Guardamos en el almacenamiento local (local storage) Así no requerimos un servidor --> En chrome vas a aplicación y a almacenamiento local
    // Localstorage solo permite guardar números o strings, por lo que si tienes un objeto, deberas coger un objeto JSON y hacerlo String con stringify (Si no... Solo veras object en vez del valor)
    GuardarEnStorage("pelis", peli);
}

  return (
    <div className="add">
    <h3 className="title"> { tituloComponente } </h3> {/* Añadimos la variable dinámica titulo quitando un texto estático */}
    
    {/* PASO 5 --> Mostramos la peli con la condicion de que exista titulo y descripción, si existen pues muéstrame título */}
    <strong>
    {(titulo && descripcion) && "Has creado la película: " + titulo}
    </strong>

    <form onSubmit={ conseguirDatosForm }> {/* Añadimos evento onsubmit, para recoger los valores y enviarlos con el formulario */}
        <input type="text" 
               id="titulo"
               name="titulo"
               placeholder="Titulo" />

        <textarea id="descripcion"
                  name="descripcion"
                  placeholder="Descripción"></textarea>

        <input type="submit"
               id="save" 
               value="Guardar" />
    </form>
</div>
  )
}
