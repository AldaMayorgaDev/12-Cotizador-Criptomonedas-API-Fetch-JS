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

}

function mostrarAlerta(mensaje) {
    console.log('mensaje :>> ', mensaje);
}