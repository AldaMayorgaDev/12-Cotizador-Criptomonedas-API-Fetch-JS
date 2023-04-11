const criptoMonedasSelect = document.querySelector('#criptomonedas');

//Crear un promise
const obtenerCriptomonedas = criptomonedas => new Promise( resolve => {
     resolve(criptomonedas);
});

/* Evento incial de carga de documento */
document.addEventListener('DOMContentLoaded', ()=>{
    consultarCriptoMonedas();
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
}