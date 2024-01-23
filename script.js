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

// funcion para mostrar los personajes en el html
function mostrarEnElHtml (arrPersonajes) {
// Mostrar el total de personajes
    // cuento la cantidad de elementos del arrPersonajes
    let numeroPersonajes = arrPersonajes.length;
    // Aca se lo agrego al span 
    spanCantidadPersonajes.innerText= numeroPersonajes;

    // estamos limpiando lo que habia antes en el div
    divPersonajes.innerHTML='';
    // ahora le agregamos los personajes nuevos que queres mostrar
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


// Eventos
// 1- Nos traemos el elemento html que queremos agregarle el evento
// 2- Crear una funcion que se ejecute cuando se realice el evento
// 3- Creamos el evento, conectando todo

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
  let sinGenero = totalPersonajes.filter((itemPersonaje)=>{
        return itemPersonaje.gender==='Genderless'
  });
  mostrarEnElHtml(sinGenero);
}

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


botonPrimeraPagina.disabled=true;
botonAnteriorPagina.disabled=true;


// function controlPaginado (pagina){
// // agregar los controles de todas las situaciones posibles
// }

// Paginado
function siguientePagina () {
    paginaActual++;
    if(paginaActual===42){
        botonSiguientePagina.disabled=true
        botonUltimaPagina.disabled=true
    } else {
        botonAnteriorPagina.disabled=false;
        botonPrimeraPagina.disabled=false;
    }
    pedidoFetch(paginaActual);
    // console.log(paginaActual)
};

function anteriorPagina () {
    paginaActual--;
    pedidoFetch(paginaActual);
    // console.log(paginaActual)
};

function primeraPagina () {
    paginaActual=1;
    pedidoFetch(1)
    // console.log(paginaActual)
}

// 42 paginas
function ultimaPagina () {
    paginaActual=42;
    pedidoFetch(paginaActual);
    // console.log(paginaActual)
}



botonSiguientePagina.addEventListener('click',siguientePagina);
botonAnteriorPagina.addEventListener('click',anteriorPagina);
botonPrimeraPagina.addEventListener('click',primeraPagina);
botonUltimaPagina.addEventListener('click', ultimaPagina);


