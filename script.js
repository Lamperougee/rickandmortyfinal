// elementos del HTML
let divPersonajes = document.getElementById('personajes');
    // botones filtro
let botonFiltroTodo = document.getElementById('filtroTodo');
let botonFiltroMujer = document.getElementById('filtroMujer');
let botonFiltroHombre = document.getElementById('filtroHombre');
let botonFiltroDesconocido = document.getElementById('filtroDesconocido');
let botonFiltroSinGenero = document.getElementById('filtroSinGenero')
    // botones Paginado
let botonPrimeraPagina = document.getElementById('primeraPagina');
let botonAnteriorPagina = document.getElementById("anterior");
let botonSiguientePagina = document.getElementById("siguiente");
let botonUltimaPagina = document.getElementById('ultimaPagina'); 

let spanCantidadPersonajes = document.getElementById('cantidadPersonajes');

let totalPersonajes;
let paginaActual=1;


function mostrarEnElHtml (arrPersonajes) {

    let numeroPersonajes = arrPersonajes.length;
    spanCantidadPersonajes.innerText= numeroPersonajes;

    // estamos limpiando lo que habia antes en el div
    divPersonajes.innerHTML='';
    arrPersonajes.forEach((itemPersonaje)=>{
        divPersonajes.innerHTML+=` <div class="personaje">
        <img src=${itemPersonaje.image}>
        <div class="div">
        <h3>Nombre: ${itemPersonaje.name}</h3>
        <p>Genero: ${itemPersonaje.gender}</p>
        <p>Especie: ${itemPersonaje.species}</p>
        <p>Estado: ${itemPersonaje.status}</p>
        <p>Origen: ${itemPersonaje.origin.name}</p>
        <p>Locacion: ${itemPersonaje.location.name}</p>
        </div>
    </div>`
    })
}


// pedido de info con fetch
function pedidoFetch (pagina) {
    fetch('https://rickandmortyapi.com/api/character/?page='+pagina)
    .then((data)=>{
        return data.json();
    }).then((data)=>{
        totalPersonajes = data.results;
        // personajes es un array de objetos
        mostrarEnElHtml(totalPersonajes);
    })
};

pedidoFetch(paginaActual);



// Funciones para el filtro

function filtroMujer () {
    let mujeres = totalPersonajes.filter((itemPersonaje)=>{
        return itemPersonaje.gender==='Female';
    });
    mostrarEnElHtml(mujeres);
};

function filtroHombre () {
    let hombres = totalPersonajes.filter((itemPersonaje)=>{
        return itemPersonaje.gender==='Male'
    });
    mostrarEnElHtml(hombres);
}

function filtroSinGenero () {
    let sinGenero = totalPersonajes.filter((itemPersonaje) => {
      return itemPersonaje.gender === 'Genderless'
    });
    if (sinGenero.length === 0) {
      alert('No hay coincidencias')
      mostrarEnElHtml(totalPersonajes);
    }else{
       mostrarEnElHtml(sinGenero)
    };
  };
  

function filtroDesconocido () {
    let desconocido = totalPersonajes.filter((itemPersonaje)=>{
        return itemPersonaje.gender === 'unknown'
    });
    mostrarEnElHtml(desconocido)
}

function filtroTodo () {
    mostrarEnElHtml(totalPersonajes);
}

// Crear evento
// elementoHTML.addEventListener('tipo de evento', funcion que se ejecuta cuando se da el evento)
botonFiltroMujer.addEventListener('click',filtroMujer);
botonFiltroHombre.addEventListener('click',filtroHombre);
botonFiltroTodo.addEventListener('click',filtroTodo);
botonFiltroDesconocido.addEventListener('click', filtroDesconocido);
botonFiltroSinGenero.addEventListener('click', filtroSinGenero);

// Paginado - Falta optimizar el código
function siguientePagina () {
    paginaActual++;
    pedidoFetch(paginaActual);
    if(paginaActual===42){
        botonSiguientePagina.disabled=true;
        botonUltimaPagina.disabled=true;
        botonAnteriorPagina.disabled=false;
        botonPrimeraPagina.disabled=false;
    }else{
        botonSiguientePagina.disabled=false;
        botonUltimaPagina.disabled=false;
        botonAnteriorPagina.disabled=false;
        botonPrimeraPagina.disabled=false;
    };
    pedidoFetch(paginaActual);

};

function anteriorPagina () {
    paginaActual--;
    pedidoFetch(paginaActual);
    if(paginaActual===1){
        botonAnteriorPagina.disabled=true;
        botonPrimeraPagina.disabled=true;
        botonSiguientePagina.disabled=false;
        botonPrimeraPagina.disabled=false;
    }else{
        botonAnteriorPagina.disabled=false;
        botonPrimeraPagina.disabled=false;
        botonUltimaPagina.disabled=false;
        botonSiguientePagina.disabled=false;
    };
    pedidoFetch(paginaActual);
    
};

function primeraPagina () {
    paginaActual=1;
    pedidoFetch(paginaActual);
    if(paginaActual===1){
        botonAnteriorPagina.disabled=true;
        botonPrimeraPagina.disabled=true;
        botonSiguientePagina.disabled=false;
        botonUltimaPagina.disabled=false;
    }else{
        botonAnteriorPagina.disabled=false;
        botonSiguientePagina.disabled=false;
        botonPrimeraPagina.disabled=false;
        botonUltimaPagina.disabled=false;
    };
    pedidoFetch(paginaActual);
};

function ultimaPagina () {
    paginaActual=42;
    pedidoFetch(paginaActual);
    if(paginaActual===42){
        botonSiguientePagina.disabled=true;
        botonUltimaPagina.disabled=true;
        botonAnteriorPagina.disabled=false;
        botonPrimeraPagina.disabled=false;
    }else{
        botonAnteriorPagina.disabled=false;
        botonSiguientePagina.disabled=false;
        botonPrimeraPagina.disabled=false;
        botonUltimaPagina.disabled=false;
    };
    pedidoFetch(paginaActual);
   
};




botonSiguientePagina.addEventListener('click',siguientePagina);
botonAnteriorPagina.addEventListener('click',anteriorPagina);
botonPrimeraPagina.addEventListener('click',primeraPagina);
botonUltimaPagina.addEventListener('click', ultimaPagina)
