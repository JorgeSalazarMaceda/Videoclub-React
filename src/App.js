import { useState } from "react";
import { Buscador } from "./components/Buscador";
import { Crear } from "./components/Crear";
import { Listado } from "./components/Listado";


function App() {

    const [listadoState, setListadoState] = useState([]);


  return (
    <div className="layout">
    {/*Cabecera*/}
    <header className="header">
        <div className="logo">
            <div className="play"></div>
        </div>
        
        <h1>MisPelis</h1>
    </header>

    {/*Barra de navegación, un NAV*/}
    <nav className="nav">
        <ul>
            <li><a href="/#">Inicio</a></li>
            <li><a href="/#">Peliculas</a></li>
            <li><a href="/#">Blog</a></li>
            <li><a href="/#">Contacto</a></li>
        </ul>
    </nav>

    {/*Contenido principal en una sección*/}
    <section id="content" className="content">

       {/* Aqui importamos el componente Listado.js que contiene las pelis */}
       {/* Aquí compartirán información del componente padre (App.js) a hijo (Listado.js) --> Le pasaremos dos propiedades con su valor*/}
        <Listado listadoState={listadoState} setListadoState={setListadoState}/>

    </section>

    {/*Barra lateral*/}
    <aside className="lateral">

        <Buscador listadoState={listadoState} setListadoState={setListadoState}/>

        {/* Aquí compartirán información del componente padre (App.js) a hijo (Crear.js) --> Le pasaremos 1 prop con su valor ya que aqui no queremos mostrar, solo guardar*/}
        <Crear setListadoState={setListadoState}/>

    </aside>

    {/*Pie de página*/}
    <footer className="footer">
        &copy; Videoclub (Fr de JS) - <a href="https://www.linkedin.com/in/jorge-salazar-maceda-91956a9a/">Linkedin de Jorge Salazar</a>
    </footer>

</div>

  );
}

export default App;
