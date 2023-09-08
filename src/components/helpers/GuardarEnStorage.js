export const GuardarEnStorage = (clave, elemento) => {

    // 1- Conseguir los elementos que ya tenemos en el localStorage
    let elementos = JSON.parse(localStorage.getItem(clave)); // Codifica algo que ya esta dentro de un JSON.stringify del localStorage y sacamos el item, en este caso pelis
    console.log(elementos);

    // 2- Comprobar si es un array lo que hay en localStorage
    if(Array.isArray(elementos)){
        // Si es un array - Añadimos dentro del array un elemento nuevo con push
        elementos.push(elemento);
    }else{
        // Si no es un arral - Creamos un array con la nueva peli
        elementos = [elemento];
    }
    
    // 3- Guardar en el localStorage
    localStorage.setItem(clave, JSON.stringify(elementos));
    
    // 4- Devolver un objeto
    return elemento;
}

// Este método sería solo para pelis, pero sería mejor hacerlo dinámico, así sería un método reutilizable
// export const GuardarEnStorage = peli => { 

//     // 1- Conseguir los elementos que ya tenemos en el localStorage
//     let elementos = JSON.parse(localStorage.getItem("pelis")); // Codifica algo que ya esta dentro de un JSON.stringify del localStorage y sacamos el item, en este caso pelis
//     console.log(elementos);

//     // 2- Comprobar si es un array lo que hay en localStorage
//     if(Array.isArray(elementos)){
//         // Si es un array - Añadimos dentro del array un elemento nuevo con push
//         elementos.push(peli);
//     }else{
//         // Si no es un arral - Creamos un array con la nueva peli
//         elementos = [peli];
//     }
    
//     // 3- Guardar en el localStorage
//     localStorage.setItem("pelis", JSON.stringify(elementos));
    
//     // 4- Devolver un objeto
//     return peli;
// }