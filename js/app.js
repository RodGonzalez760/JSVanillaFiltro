import {
    marcaHtml,
    yearHtml,
    minimoHtml,
    maximoHtml,
    puertasHtml,
    transmisionHtml,
    colorHtml
} from './selectores.js';

const resultado = document.querySelector('#resultado');

const max = new Date().getFullYear();
const min = max - 10;

const datosBusqueda = {
    marca : '',
    year : '',
    minimo : '',
    maximo : '',
    puertas : '',
    transmision : '',
    color : ''
}


document.addEventListener( 'DOMContentLoaded', () => {

    mostrarAutos( autos );

    llenarSelect();
});

marcaHtml.addEventListener('change', e => { datosBusqueda.marca = e.target.value; filtrarAuto(); });
yearHtml.addEventListener('change', e => { datosBusqueda.year = parseInt(e.target.value); filtrarAuto(); });
minimoHtml.addEventListener('change', e => { datosBusqueda.minimo = e.target.value; filtrarAuto(); });
maximoHtml.addEventListener('change', e => { datosBusqueda.maximo = e.target.value; filtrarAuto(); });
puertasHtml.addEventListener('change', e => { datosBusqueda.puertas = parseInt(e.target.value); filtrarAuto(); });
transmisionHtml.addEventListener('change', e => { datosBusqueda.transmision = e.target.value; filtrarAuto(); });
colorHtml.addEventListener('change', e => { datosBusqueda.color = e.target.value; filtrarAuto(); });

function mostrarAutos( autos ){

    limpiarHtml();

    autos.forEach( auto => {

        const {marca, modelo, year, precio, puertas, color, transmision } = auto;
        const autoHtml = document.createElement('p');

        autoHtml.textContent = `
            ${marca} ${modelo} - ${year} - ${puertas} Puertas - Transmisión: ${transmision} - Precio: - ${precio} - Color: ${color} 
        `;

        resultado.appendChild(autoHtml);
    })
}


function limpiarHtml() {
    while ( resultado.firstChild ) {
        resultado.removeChild(resultado.firstChild);
    }
}



function llenarSelect() {
    
    for (let i = max; i >= min; i--) {
        const opcion = document.createElement('option');
        opcion.value = i;
        opcion.textContent = i;
        year.appendChild( opcion );      
    }

}

function filtrarAuto(){
    const resultadoFiltro = autos
        .filter( filtrarMarca )
        .filter( filtrarYear )
        .filter( filtrarMinimo )
        .filter( filtrarMaximo )
        .filter( filtrarPuertas )
        .filter( filtrartransmision )
        .filter( filtrarColor );

    if ( resultadoFiltro.length ) {
        mostrarAutos( resultadoFiltro );        
    }else{
        sinResultados();
    }
}

function filtrarMarca( auto ) {
    const { marca } = datosBusqueda;
    if ( marca ) {
        return auto.marca === marca;
    }

    return auto;
}

function filtrarYear( auto ) {
    const { year } = datosBusqueda;
    if ( year ) {
        return auto.year === year;
    }

    return auto;
}

function filtrarMinimo ( auto ) {
    const { minimo } = datosBusqueda;
    if ( minimo ) {
        return auto.precio >= minimo;
    }

    return auto;
}

function filtrarMaximo ( auto ) {
    const { maximo } = datosBusqueda;
    if ( maximo ) {
        return auto.precio <= maximo;
    }

    return auto;
}

function filtrarPuertas ( auto ) {
    const { puertas } = datosBusqueda;
    if ( puertas ) {
        return auto.puertas === puertas;
    }

    return auto;
}

function filtrartransmision( auto ) {
    const { transmision } = datosBusqueda;
    if ( transmision ) {
        return auto.transmision === transmision;
    }

    return auto;
}

function filtrarColor ( auto ) {
    const { color } = datosBusqueda;
    if ( color ) {
        return auto.color === color;
    }

    return auto;
}

function sinResultados() {
    
    limpiarHtml();
    
    const noResultado = document.createElement('div');
    noResultado.classList.add('alerta', 'error');
    noResultado.textContent = "No se encontraron resultados";
    resultado.appendChild( noResultado );
}