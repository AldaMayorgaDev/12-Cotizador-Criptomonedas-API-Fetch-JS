const criptoMonedasSelect = document.querySelector('#criptomonedas');
const monedaSelect = document.querySelector('#moneda');
const formulario = document.querySelector('#formulario');


const objetoBusqueda = {
    moneda: '',
    criptomoneda: ''
};

//Crear un promise
const obtenerCriptomonedas = criptomonedas => new Promise( resolve => {
     resolve(criptomonedas);
});

/* Evento incial de carga de documento */
document.addEventListener('DOMContentLoaded', ()=>{
    consultarCriptoMonedas();

    formulario.addEventListener('submit', submitFormulario);
    criptoMonedasSelect.addEventListener('change', leerValor);
    monedaSelect.addEventListener('change', leerValor);
});


/* Funciones */
function consultarCriptoMonedas() {
    const url = `https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD`;

    fetch(url)
        .then(respuesta =>{
            //console.log('respuesta :>> ', respuesta);
            //console.log('Status: ',respuesta.status);
            return respuesta.json();
        })
        .then(resultado =>{
            //promise
              return  obtenerCriptomonedas(resultado.Data)
            //console.log('resultado', resultado.Data);
        })
        .then(criptomonedas =>
            selectCriptomonedas(criptomonedas))
        .catch(error => {
            console.log('error', error)
        })
    
}

function selectCriptomonedas(criptomonedas) {
    criptomonedas.forEach(cripto => {
        //console.log('cripto :>> ', cripto);

        const {FullName, Name} = cripto.CoinInfo;
        
        //Crear opciones para el select
        const option = document.createElement('OPTION');
        option.value = Name;
        option.textContent = FullName;
        criptoMonedasSelect.appendChild(option);

    });
};

function leerValor(e){
    objetoBusqueda[e.target.name] = e.target.value;
    console.log('objetoBusqueda :>> ', objetoBusqueda);
}
function submitFormulario(e) {
    e.preventDefault();

    //validar
    const {moneda, criptomoneda} = objetoBusqueda;

    if(moneda === ''|| criptomoneda === ''){
        mostrarAlerta('Ambos campos son obligatorios');
        return;
    }


    //Consultar la API con los resultados para obtner la cotizacion que los usuarios desean.
    consultarAPI();

}

function mostrarAlerta(mensaje) {
    const existeError = document.querySelector('.error');

    if (!existeError) {
        const divMensaje = document.createElement('DIV');
        divMensaje.classList.add('error');

        //Mensaje de error
        divMensaje.textContent = mensaje;
        formulario.appendChild(divMensaje);

        setTimeout(() => {
            divMensaje.remove();
        }, 2000);
        console.log('mensaje :>> ', mensaje);
    }
}

function consultarAPI() {
    const {moneda, criptomoneda} = objetoBusqueda;

    const url= `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`;

    fetch(url)
        .then(respuesta =>{
            console.log('respuesta :>> ', respuesta);
            return respuesta.json();
        })
        .then(cotizacion =>{
            //console.log(`Cotizacion de ${criptomoneda} a ${moneda}:`, cotizacion.DISPLAY[criptomoneda][moneda]);

            mostrarCotizacionHTML(cotizacion.DISPLAY[criptomoneda][moneda])
        })
}

function mostrarCotizacionHTML(cotizacion) {
    console.log('cotizacion', cotizacion)
}